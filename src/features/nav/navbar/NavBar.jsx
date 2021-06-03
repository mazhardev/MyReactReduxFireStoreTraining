import React, { Component } from 'react';
import AppMedia from '../../../app/common/util/appMedia'
import DesktopMenu from '../Menus/desktop/DesktopMenu'
import NavBarMobile from '../Menus/mobile/NavBarMobile'

const { Media } = AppMedia;

class NavBar extends Component {

  render() {
    const { children } = this.props;

    return (
      <React.Fragment>
        <Media greaterThan="mobile">
          <DesktopMenu
            children={children}
          />
        </Media>

        <Media at="mobile">
          <NavBarMobile
            children={children}
          />
        </Media>
      </React.Fragment>
    );
  }
}

export default NavBar;
