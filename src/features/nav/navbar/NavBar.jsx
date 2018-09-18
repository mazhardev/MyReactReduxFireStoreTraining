import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { NavLink, Link, withRouter } from "react-router-dom";
import SignedOutMenu from "../Menu/SignedOutMenu";
import SignedInMenu from "../Menu/SignedInMenu";

class NavBar extends Component {
  state = {
    authenticated: false
  };
  onHandleSignedIn = () => {
    this.setState({
      authenticated: true
    });
  };
  onHandleSignOut = () => {
    this.setState({
      authenticated: false

    });
    this.props.History.push('/');
  };
  render() {
    return (
      <Menu inverted fixed="top">
        <Container>
          <Menu.Item header as={Link} to="/">
            <img src="/assets/logo.png" alt="logo" />
            Re-vents
          </Menu.Item>
          <Menu.Item as={NavLink} to="/events" name="Events" />
          <Menu.Item as={NavLink} to="/TestComponent" name="Test" />
          {this.state.authenticated &&
          <Menu.Item as={NavLink} to="/people" name="People" />
          }
         {this.state.authenticated && <Menu.Item>
            <Button
              as={Link}
              to="/createEvent"
              floated="right"
              positive
              inverted
              content="Create Event"
            />
          </Menu.Item>}
          {this.state.authenticated ? (
            <SignedInMenu signOut={this.onHandleSignOut} />
          ) : (
            <SignedOutMenu signIn={this.onHandleSignedIn} />
          )}
        </Container>
      </Menu>
    );
  }
}
export default withRouter(NavBar);
