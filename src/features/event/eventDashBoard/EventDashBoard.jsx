import React, { Component } from "react";
import { Grid, Loader } from "semantic-ui-react";
import EventList from "../eventList/EventList";
import { connect } from "react-redux";
import { getEventsForDashboard } from "../EventAction";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import EventActivity from "../eventActivity/EventActivity";
import { firestoreConnect } from "react-redux-firebase";

const query = [
  {
    collection: "activity",
    orderBy: ["timestamp", "desc"],
    limit: 5
  }
];

const mapState = state => ({
  events: state.events,
  loading: state.async.loading,
  activities: state.firestore.ordered.activity
});

const actions = {
  getEventsForDashboard
};

class EventDashBoard extends Component {
  state = {
    moreEvents: false,
    initialLoading: true,
    loadedEvents: []
  };
  async componentDidMount() {
    let next = await this.props.getEventsForDashboard();
    if (next && next.docs && next.docs.length > 1) {
      this.setState({
        moreEvents: true,
        initialLoading: false,
        contextRefs: {}
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.events !== nextProps.events) {
      this.setState({
        loadedEvents: [...this.state.loadedEvents, ...nextProps.events]
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
  handleContextRefs = contextRefs => this.setState({ contextRefs });

  render() {
    const { loading, activities } = this.props;
    const { moreEvents, loadedEvents } = this.state;
    if (this.state.initialLoading) return <LoadingComponent inverted={true} />;
    return (
      <Grid>
        <Grid.Column width={10}>
          <div ref={this.handleContextRefs}>
            <EventList
              loading={loading}
              moreEvents={moreEvents}
              events={loadedEvents}
              getNextEvents={this.getNextEvents}
            />
          </div>
          {/* <Button
            onClick={this.getNextEvents}
            disabled={!this.state.moreEvents}
            content="More"
            color="green"
            floated="right"
            loading={loading}
          /> */}
        </Grid.Column>
        <Grid.Column width={6}>
          <EventActivity
            activities={activities}
            contextRefs={this.state.contextRefs}
          />
        </Grid.Column>
        <Grid.Column width={10}>
          {loading ? <Loader active={loading} /> : "No More Events"}
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(firestoreConnect(query)(EventDashBoard));
