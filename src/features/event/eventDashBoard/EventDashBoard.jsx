import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import EventForm from "../eventForm/EventForm";
import cuid from "cuid";
import { connect } from "react-redux";

const mapState = state => ({
  events: state.events
});

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
    const updatedEvent = [...this.state.events, newEvent];
    this.setState({
      events: updatedEvent,
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
    this.setState({
      events: this.state.events.map(event => {
        if (event.id === updatedEvent.id) {
          return Object.assign({}, updatedEvent);
        } else {
          return event;
        }
      }),
      isOpen: false,
      selectedEvent: null
    });
  };
  handleDeleteEvent = eventId => () => {
    const updatedEvents = this.state.events.filter(e => e.id !== eventId);
    this.setState({
      events: updatedEvents
    });
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
export default connect(mapState)(EventDashBoard);
