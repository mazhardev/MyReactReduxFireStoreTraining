import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import EventForm from "../eventForm/EventForm";
import cuid from "cuid";
import { connect } from "react-redux";
import { deleteEvent,updateEvent,createEvent } from '../EventAction';

const mapState = state => ({
  events: state.events
});

const actions={
  createEvent,
  updateEvent,
  deleteEvent
}

class EventDashBoard extends Component {
  state = {
    isOpen: false,
    selectedEvent: null
  };

  handlFormCancelBtn = () => {
    this.setState({ isOpen: false });
  };
  handlFormOpen = () => {
    this.setState({
      selectedEvent: null,
      isOpen: true
    });
  };
  handNewEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = "../assets/user.png";
    this.props.createEvent(newEvent);
    this.setState({
      isOpen: false
    });
  };
  handleOpenEvent = upadatedEvent => () => {
    this.setState({
      selectedEvent: upadatedEvent,
      isOpen: true
    });
  };
  handleEventUpdate = updatedEvent => {
    this.props.updateEvent(updatedEvent);
    this.setState({
      isOpen: false,
      selectedEvent: null
    });
  };
  handleDeleteEvent = eventId => () => {
   this.props.deleteEvent(eventId);
  };
  render() {
    return (
      <Grid>
        <Grid.Column width={10}>

          <EventList
            onEventOpen={this.handleOpenEvent}
            events={this.props.events}
            onEventDelete={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            onClick={this.handlFormOpen}
            positive
            content="Create Event"
          />

          {this.state.isOpen && (
            <EventForm
              createEvent={this.handNewEvent}
              HandlFormCancelBtn={this.handlFormCancelBtn}
              selectedEvent={this.state.selectedEvent}
              onEventUpdate={this.handleEventUpdate}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(mapState,actions)(EventDashBoard);
