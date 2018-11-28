import React, { Component } from "react";
import { Grid, Button } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { connect } from "react-redux";
import { getEventsForDashboard } from "../EventAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../eventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const mapState = state => ({
  events: state.events,
  loading: state.async.loading
});

const actions = {
  getEventsForDashboard
};

class EventDashBoard extends Component {
  state = {
    moreEvents: false
  };
  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true
      });
    }
  }
  getNextEvents = async () => {
    const { events } = this.props;
    let lastEvent = events && events[events.length - 1];
    console.log(lastEvent);
    let next = await this.props.getEventsForDashboard(lastEvent);
    console.log(next);
    if (next && next.docs && next.docs.length <= 1) {
      this.setState({
        moreEvents: false
      });
    }
  };

  handleDeleteEvent = eventId => () => {
    this.props.deleteEvent(eventId);
  };
  render() {
    const { events, loading } = this.props;
    if (loading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} onEventDelete={this.handleDeleteEvent} />
          <Button
            onClick={this.getNextEvents}
            disabled={!this.state.moreEvents}
            content="More"
            color="green"
            floated="right"
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
