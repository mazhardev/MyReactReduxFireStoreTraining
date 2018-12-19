import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailedSidebar = ({ isCurrentUser,userUid,follow }) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && isCurrentUser ? (
          <Button
            as={Link}
            to="/settings"
            color="teal"
            fluid
            basic
            content="Edit Profile"
          />
        ) : (
          <Button onClick={()=>follow(userUid)} color="teal" fluid basic content="Follow user" />
        )}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;
