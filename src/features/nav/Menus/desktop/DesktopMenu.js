import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withFirebase } from 'react-redux-firebase'
import { Menu, Button } from 'semantic-ui-react';
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

class NavMenu extends Component {

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
    const { auth, profile, children } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty
    return (
      <React.Fragment>
        <Menu fixed="top" inverted>
          <Menu.Item as={Link} to="/" header>
            {/* <img src="/assets/logo2.png" alt="logo" /> */}
            Social Events
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          {authenticated &&
            <Menu.Item as={NavLink} to="/people" name="People" />}

          {authenticated &&
            <Menu.Item>
              <Button
                as={Link}
                to="/createEvent"
                floated="right"
                positive
                inverted
                content="Create Event"
              />
            </Menu.Item>}
          {authenticated ? (
            <SignedInMenu auth={auth} profile={profile} signOut={this.handleSignOut} />
          ) : (
            <SignedOutMenu register={this.handleRegister} signIn={this.handleSignIn} />
          )}
        </Menu>
        {children}
      </React.Fragment>
    );
  }
}

export default withRouter(withFirebase(connect(mapState, actions)(NavMenu)));
