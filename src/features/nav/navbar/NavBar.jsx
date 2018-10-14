import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menu/SignedOutMenu";
import SignedInMenu from "../Menu/SignedInMenu";
import { connect } from "react-redux"
import { openModal } from '../../modals/modalActions'
import { logout } from '../../auth/AuthActions'

const actions={
  openModal,
  logout
}
const mapState=(state)=>({
   auth:state.auth
})
class NavBar extends Component {

  onHandleSignedIn = () => {
  this.props.openModal("LoginModal");
  };
  onHandleRegister=()=>{
    this.props.openModal("RegisterModal")
  }
  onHandleSignOut = () => {
   this.props.logout()
    this.props.History.push('/');
  };

  render() {
   const {auth}=this.props;
   const authenticated=auth.authenticated;
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={Link} to="/">
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/TestComponent" name="Test" />
          {authenticated &&
          <Menu.Item as={NavLink} to="/people" name="People" />
          }
         {authenticated && <Menu.Item>
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
            <SignedInMenu signOut={this.onHandleSignOut} currentUser={auth.currentUser}/>
          ) : (
            <SignedOutMenu signIn={this.onHandleSignedIn} register={this.onHandleRegister}/>
          )}
        </Container>
      </Menu>
    );
  }
}
export default withRouter(connect(mapState,actions)(NavBar));
