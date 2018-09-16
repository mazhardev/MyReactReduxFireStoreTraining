import React from 'react'
import { Button,Menu,Image,Dropdown } from 'semantic-ui-react'

const SignedInMenu = () => {
  return (<div>
   
        <Menu.Item position="right">
          <Image avatar spaced="right" src='/assets/user.png' />
          <Dropdown pointing="top left" text="Username">
            <Dropdown.Menu>
              <Dropdown.Item text="Create Event" icon="plus" />
              <Dropdown.Item text="My Events" icon="calendar" />
              <Dropdown.Item text="My Network" icon="users" />
              <Dropdown.Item text="My Profile" icon="user" />
              <Dropdown.Item text="Settings" icon="settings" />
              <Dropdown.Item text="Sign Out" icon="power" />
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        </div>
  )
}

export default SignedInMenu
