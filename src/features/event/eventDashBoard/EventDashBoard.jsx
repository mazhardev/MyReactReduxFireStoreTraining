import React, { Component } from "react";
import { Grid } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { connect } from "react-redux";
import { deleteEvent } from '../EventAction';

const mapState = state => ({
  events: state.events
});

const actions={
 
  deleteEvent
}

class EventDashBoard extends Component {
 
  handleDeleteEvent = eventId => () => {
   this.props.deleteEvent(eventId);
  };
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>

          <EventList
             events={this.props.events}
            onEventDelete={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
         
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(mapState,actions)(EventDashBoard);
