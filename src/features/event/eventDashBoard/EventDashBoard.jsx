import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { connect } from "react-redux";
import { getEventsForDashboard } from "../EventAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../eventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({
  events: state.events,
  loading:state.async.loading
});

const actions = {
  getEventsForDashboard
};

class EventDashBoard extends Component {
 
  componentDidMount(){
    this.props.getEventsForDashboard();
  }
 
  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };
  render() {
    
    const { events,loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
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
