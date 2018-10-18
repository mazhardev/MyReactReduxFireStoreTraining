import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { connect } from "react-redux";
import { deleteEvent } from "../EventAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../eventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({
  events: state.firestore.ordered.events,
  loading: state.async.loading
});

const actions = {
  deleteEvent
};

class EventDashBoard extends Component {
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };
  render() {
    const { loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={this.props.events}
            onEventDelete={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity />
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect([{ collection: "events" }])(EventDashBoard));
