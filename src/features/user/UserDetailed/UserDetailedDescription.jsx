import React from 'react';
import { Grid, Header, Icon, Item, List, Segment } from 'semantic-ui-react';
import format from 'date-fns/format';

const UserDetailedDescription = ({ profile }) => {
  let createdAt;
  if (profile.createdAt) {
    createdAt = format(profile.createdAt.toDate(), 'D MMM YYYY');
  }
  return (
    <Grid.Column mobile={16} tablet={16} computer={12}>
      <Segment>
        <Grid mobile={16} tablet={16} computer={2}>
          <Grid.Column mobile={16} tablet={16} computer={10}>
            <Header icon="smile" content="About Display Name" />
            <p>
              I am a: <strong>{profile.occupation || 'tbn'}</strong>
            </p>
            <p>
              Originally from <strong>{profile.origin || 'tbn'}</strong>
            </p>
            <p>
              Member Since: <strong>{createdAt}</strong>
            </p>
            <p>{profile.description}</p>
          </Grid.Column>
          <Grid.Column mobile={16} tablet={16} computer={6}>
            <Header icon="heart outline" content="Interests" />
            {profile.interests ?
            <List>
              {profile.interests &&
                profile.interests.map((interest, index) => (
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
  );
};

export default UserDetailedDescription;
