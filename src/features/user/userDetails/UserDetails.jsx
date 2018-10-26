import React, { Component } from "react";
import {
  Button,
  Card,
  Grid,
  Header,
  Icon,
  Image,
  Item,
  List,
  Menu,
  Segment
  
} from "semantic-ui-react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Link } from "react-router-dom"


const mapState = state => ({
  profile: state.firebase.profile,
  auth: state.firebase.auth,
  photos: state.firestore.ordered.photos,
});
const query = ({ auth }) => {
  return [
    {
      collection: "users",
      doc: auth.uid,
      subcollections: [{ collection: "photos" }],
      storeAs: "photos"
    }
  ];
};

class UserDetailedPage extends Component {
  render() {
    const { profile,photos } = this.props;

    return (
      <Grid>
        <Grid.Column width={16}>
          <Segment>
            <Item.Group>
              <Item>
                <Item.Image avatar size="small" src={profile.photoURL || "/assets/user.png"} />
                <Item.Content verticalAlign="bottom">
                  <Header as="h1">{profile.displayName || "NA"}</Header>
                  <br />
                  <Header as="h3">{profile.occupation || "NA"}</Header>
                  <br />
                  <Header as="h3">27, Lives in {profile.city || "NA"}</Header>
                </Item.Content>
              </Item>
            </Item.Group>
          </Segment>
        </Grid.Column>
        <Grid.Column width={12}>
          <Segment>
            <Grid columns={2}>
              <Grid.Column width={10}>
                <Header icon="smile" content={profile.displayName || "NA"} />
                <p>
                  I am a: <strong>{profile.occupation || "NA"}</strong>
                </p>
                <p>
                  Originally from <strong>{profile.city || "NA"}</strong>
                </p>
                <p>
                  Member Since: <strong>{profile.createdAt || "NA"}</strong>
                </p>
                <p>{profile.about || "NA"}</p>
              </Grid.Column>
              <Grid.Column width={6}>
                <Header icon="heart outline" content="Interests" />
                {profile.interests ?
                <List>
                  {profile.interests  &&
                    profile.interests.map((interest,index) => (
                      <Item key={index}>
                        <Icon name="heart" />
                        <Item.Content>{interest}</Item.Content>
                      </Item>
                    ))} 
                </List> : <p>No interests</p>}
              </Grid.Column>
            </Grid>
          </Segment>
        </Grid.Column>
        <Grid.Column width={4}>
          <Segment>
            <Button as={Link} to="/settings/BasicPage" color="teal" fluid basic content="Edit Profile" />
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="image" content="Photos" />
            <Image.Group size="small">
            {photos && photos.length>0 &&
             photos.map((photo,index)=>
                <Image key={index} src={photo.url} />
            ) 
             } 
            </Image.Group>
          </Segment>
        </Grid.Column>

        <Grid.Column width={12}>
          <Segment attached>
            <Header icon="calendar" content="Events" />
            <Menu secondary pointing>
              <Menu.Item name="All Events" active />
              <Menu.Item name="Past Events" />
              <Menu.Item name="Future Events" />
              <Menu.Item name="Events Hosted" />
            </Menu>

            <Card.Group itemsPerRow={5}>
              <Card>
                <Image src={"/assets/categoryImages/drinks.jpg"} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>

              <Card>
                <Image src={"/assets/categoryImages/drinks.jpg"} />
                <Card.Content>
                  <Card.Header textAlign="center">Event Title</Card.Header>
                  <Card.Meta textAlign="center">
                    28th March 2018 at 10:00 PM
                  </Card.Meta>
                </Card.Content>
              </Card>
            </Card.Group>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}

export default compose(
  connect(
    mapState,
    null
  ),
  firestoreConnect(auth => query(auth))
)(UserDetailedPage);
