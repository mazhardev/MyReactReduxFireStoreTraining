import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { createEvent, updateEvent } from "../EventAction";
import cuid from "cuid";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  };
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    event
  };
};
const actions = {
  createEvent,
  updateEvent
};
class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  };
  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL: "/assets/user.png"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };
  onChangeInput = evt => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  };

  render() {
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
         <Field name='title' type='text' component='input' placeholder='Please enter Event a name' />
          <Form.Field>
            <label>Event Date</label>
            <input
              name="date"
              onChange={this.onChangeInput}
              value={this.state.event.date}
              placeholder="Event Date"
              type="date"
            />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input
              name="city"
              onChange={this.onChangeInput}
              value={this.state.event.city}
              placeholder="City event is taking place"
            />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input
              name="venue"
              onChange={this.onChangeInput}
              value={this.state.event.venue}
              placeholder="Enter the Venue of the event"
            />
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input
              name="hostedBy"
              onChange={this.onChangeInput}
              value={this.state.event.hostedBy}
              placeholder="Enter the name of person hosting"
            />
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default connect(
  mapState,
  actions
)(reduxForm({ form: "eventForm" })(EventForm));
