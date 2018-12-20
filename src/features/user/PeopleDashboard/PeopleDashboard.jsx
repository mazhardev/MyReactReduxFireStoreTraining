import React from "react";
import { Grid, Segment, Header, Card } from "semantic-ui-react";
import PersonCard from "./PersonCard";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { queryGetFollowersAndFollowing } from "../userQueries";

const mapState = state => {
  return {
    followings: state.firestore.ordered.following,
    followers: state.firestore.ordered.followers,
    auth: state.firebase.auth
  };
};

const PeopleDashboard = ({ followers, followings }) => {
  console.log("v1");
  console.log(followings);
  console.log(followers);
  return (
    <Grid>
      <Grid.Column width={16}>
        <Segment>
          <Header dividing content="People following me" />
          <Card.Group itemsPerRow={8} stackable>
            {followers &&
              followers.map(user => <PersonCard key={user.id} user={user} />)}
          </Card.Group>
        </Segment>
        <Segment>
          <Header dividing content="People I'm following" />
          <Card.Group itemsPerRow={8} stackable>
            {followings &&
              followings.map(user => <PersonCard key={user.id} user={user} />)}
          </Card.Group>
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default compose(
  connect(
    mapState,
    null
  ),
  firestoreConnect(auth => queryGetFollowersAndFollowing(auth))
)(PeopleDashboard);
