import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import EventForm from "../eventForm/EventForm";
import cuid from "cuid";
const eventsDashboard = [
  {
    id: "1",
    title: "RaoBilal Trip to Tower of London",
    date: "2018-03-27",
    category: "culture",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Tower of London, St Katharine's & Wapping, London",
    hostedBy: "Bob",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/20.jpg",
    attendees: [
      {
        id: "a",
        name: "RaoBilal",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      },
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      }
    ]
  },
  {
    id: "2",
    title: "Trip to Punch and Judy Pub",
    date: "2018-03-28",
    category: "drinks",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sollicitudin ligula eu leo tincidunt, quis scelerisque magna dapibus. Sed eget ipsum vel arcu vehicula ullamcorper.",
    city: "London, UK",
    venue: "Punch & Judy, Henrietta Street, London, UK",
    hostedBy: "Tom",
    hostPhotoURL: "https://randomuser.me/api/portraits/men/22.jpg",
    attendees: [
      {
        id: "b",
        name: "Tom",
        photoURL: "https://randomuser.me/api/portraits/men/22.jpg"
      },
      {
        id: "a",
        name: "Bob",
        photoURL: "https://randomuser.me/api/portraits/men/20.jpg"
      }
    ]
  }
];

class EventDashBoard extends Component {
  state = {
    events: eventsDashboard,
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
  handleDeleteEvent = eventId =>()=> {
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
            events={this.state.events}
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
export default EventDashBoard;
