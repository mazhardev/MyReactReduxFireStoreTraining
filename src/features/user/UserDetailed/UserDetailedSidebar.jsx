import React from "react";
import { Button, Grid, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

const UserDetailedSidebar = ({
  isCurrentUser,
  profile,
  follow,
  following,
  unfollow
}) => {
  return (
    <Grid.Column width={4}>
      <Segment>
        {isCurrentUser && (
          <Button
            as={Link}
            to="/settings"
            color="teal"
            fluid
            basic
            content="Edit Profile"
          />
        )}

        {!isCurrentUser && !following && (
          <Button
            onClick={() => follow(profile)}
            color="teal"
            fluid
            basic
            content="Follow user"
          />
        )}
        {!isCurrentUser && following && (
          <Button
            onClick={() => unfollow(profile)}
            color="teal"
            fluid
            basic
            content="Unfollow user"
          />
        )}
      </Segment>
    </Grid.Column>
  );
};

export default UserDetailedSidebar;
