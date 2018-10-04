import React, { Component } from "react";
import { Segment, Form, Button } from "semantic-ui-react";
import { connect } from 'react-redux'
const mapState=(state,ownProps)=>{
  const eventId=ownProps.match.params.id;
  let event={
    title: "",
    date: "",
    city: "",
    venue: "",
    hostedBy: ""
  }
  if(eventId && state.events.length >0){
    event=state.events.filter(event=>event.id===eventId)[0]
  }
  return {
    event
  }

}
class EventForm extends Component {
  state = {
    event: Object.assign({},this.props.event) 
  };
  onFormSubmit = evt => {
    evt.preventDefault();
    if (this.state.event.id) {
      this.props.onEventUpdate(this.state.event);
    } else {
      this.props.createEvent(this.state.event);
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
    const { HandlFormCancelBtn } = this.props;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input
              name="title"
              onChange={this.onChangeInput}
              value={this.state.event.title}
              placeholder="Tittle"
            />
          </Form.Field>
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
          <Button onClick={HandlFormCancelBtn} type="button">
            Cancel
          </Button>
        </Form>
      </Segment>
    );
  }
}
export default connect(mapState)(EventForm);
