import React from 'react'
import { Button } from 'semantic-ui-react'

const SignedOutMenu = () => {
  return (
      <div>
    <Button basic inverted content="Login" />
    <Button
    basic
    inverted
    content="Sign Out"
    style={{ marginLeft: "0.5em" }}
  /></div>
  )
}

export default SignedOutMenu
