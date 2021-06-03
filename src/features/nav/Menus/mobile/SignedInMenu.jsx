import React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const SignedInMenu = ({ signOut, profile, auth,handleToggle }) => {
  return (
    <React.Fragment>
      <Menu.Item as={Link} to={`/profile/${auth.uid}`} onClick={()=>handleToggle()}>
        <Icon name='user' />
        My Profile
            </Menu.Item>
      <Menu.Item as={Link} to='/settings' onClick={()=>handleToggle()}>
        <Icon name='settings' />
        Settings
            </Menu.Item>
      <Menu.Item onClick={signOut} >
        <Icon name='power' />
        Sign Out
            </Menu.Item>
    </React.Fragment>
  );
};

export default SignedInMenu;
