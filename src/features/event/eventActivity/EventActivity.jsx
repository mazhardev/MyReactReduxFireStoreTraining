import React from "react";
import { Header, Segment, Feed, Sticky } from "semantic-ui-react";
import EventActivityItem from "./EventActivityItem";
function EventActivity({ activities, contextRefs }) {
  return (
    <Sticky context={contextRefs} offset={100}>
      <Header attached="top" content="Recent Activity" />
      <Segment attached>
        <Feed>
          {activities &&
            activities.map(activity => (
              <EventActivityItem key={activity.id} activity={activity} />
            ))}
        </Feed>
      </Segment>
    </Sticky>
  );
}

export default EventActivity;
