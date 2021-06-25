import React, { Component } from 'react';

import { Menu, Icon, Image, Sidebar } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { NavLink, Link, withRouter } from 'react-router-dom';
import SignedOutMenu from './SignedOutMenu';
import SignedInMenu from './SignedInMenu';
import { openModal } from '../../../modals/modalActions'

const actions = {
  openModal
}

const mapState = (state) => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
})
class NavBarMobile extends Component {
  state = {
    visible: false
  };

  handlePusher = () => {
    const { visible } = this.state;
    if (visible) this.setState({ visible: false });
  };

  handleToggle = () => this.setState({ visible: !this.state.visible });

  handleSignIn = () => {
    this.props.openModal('LoginModal')
  };

  handleRegister = () => {
    this.props.openModal('RegisterModal')
  }

  handleSignOut = () => {
    this.props.firebase.logout();
    this.props.history.push('/')
  };

  render() {
    const { visible } = this.state;
    const { auth, profile, children, Media } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
      <Media at="mobile">
        <Sidebar.Pushable  >
          <Sidebar fixed="top" inverted
            as={Menu}
            animation="overlay"
            icon="labeled"
            vertical
            visible={visible}
          >
            <Menu.Item >
              <Image avatar spaced="right" src={profile.photoURL || "/assets/user.png"} />
              {profile.displayName}
            </Menu.Item>
            <Menu.Item as={Link} to="/events" onClick={this.handleToggle}>
              <Icon name='home' />
              Home
            </Menu.Item>
            {authenticated &&
              <Menu.Item as={NavLink} to="/people" onClick={this.handleToggle}>
                <Icon name='users' />My Network
              </Menu.Item>}
            {authenticated &&
              <Menu.Item as={NavLink} to="/createEvent" onClick={this.handleToggle}>
                <Icon name='plus' />Create Event
              </Menu.Item>}
            {authenticated ? (
              <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} handleToggle={this.handleToggle} />
            ) : (
              <SignedOutMenu register={this.handleRegister} signIn={this.handleSignIn} />
            )}

          </Sidebar>

          <Sidebar.Pusher
            dimmed={visible}
            onClick={this.handlePusher}
            style={{ minHeight: "100vh" }}
          >
            <Menu fixed="top" inverted >
              <Menu.Item onClick={this.handleToggle}>
                <Icon name="sidebar" />
              </Menu.Item>
              <Menu.Item as={Link} to="/" header>
                {/* <img src="/assets/logo2.png" alt="logo" /> */}
                Social Events
              </Menu.Item>
              <Menu.Item as={NavLink} to="/events" name="Events" />
            </Menu>

            {children}

          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Media>
    );
  }
};
export default withRouter(withFirebase(connect(mapState, actions)(NavBarMobile)));