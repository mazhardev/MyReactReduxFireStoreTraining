import React, { Component } from "react";
import { Segment, Form, Button, Grid, Header } from "semantic-ui-react";
import { createEvent, updateEvent } from "../EventAction";
import cuid from "cuid";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import TextInput from "../../../app/common/form/TextInput";
import TextArea from "../../../app/common/form/TextArea";
import SelectInput from "../../../app/common/form/SelectInput";
import DateInput from "../../../app/common/form/DateInput";
import PlaceInput from "../../../app/common/form/PlacesInput";
import {
  isRequired,
  composeValidators,
  combineValidators,
  hasLengthGreaterThan
} from "revalidate";
import moment from "moment";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
/*global google*/
import Script from "react-load-script";

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;
  let event = {};
  if (eventId && state.events.length > 0) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    initialValues: event
  };
};
const actions = {
  createEvent,
  updateEvent
};
const category = [
  { key: "drinks", text: "Drinks", value: "drinks" },
  { key: "culture", text: "Culture", value: "culture" },
  { key: "film", text: "Film", value: "film" },
  { key: "food", text: "Food", value: "food" },
  { key: "music", text: "Music", value: "music" },
  { key: "travel", text: "Travel", value: "travel" }
];
const validate = combineValidators({
  title: isRequired({ message: "Title is required" }),
  category: isRequired({ message: "Category is required" }),
  description: composeValidators(
    isRequired({ message: "Description is required" }),
    hasLengthGreaterThan(4)({
      message: "Description at least needs to be 5 characters"
    })
  )(),
  city: isRequired({ message: "City" }),
  vanue: isRequired({ message: "Vanue" }),
  date: isRequired({ message: "Date" })
});
class EventForm extends Component {
  state = {
    cityLatLng: {},
    vanueLatLng: {},
    scriptLoaded: false
  };
  handleCitySelect = selectCity => {
    geocodeByAddress(selectCity)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          cityLatLng: latLng
        });
      })
      .then(() => {
        this.props.change("city", selectCity);
      });
  };
  handleVanueSelect = selectVanue => {
    geocodeByAddress(selectVanue)
      .then(results => getLatLng(results[0]))
      .then(latLng => {
        this.setState({
          vanueLatLng: latLng
        });
      })
      .then(() => {
        this.props.change("vanue", selectVanue);
      });
  };

  onFormSubmit = values => {
    values.date = moment(values.date).format();
    values.vanueLatLng=this.state.vanueLatLng;
    if (this.props.initialValues.id) {
      this.props.updateEvent(values);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...values,
        id: cuid(),
        hostPhotoURL: "/assets/user.png",
        hostedBy: "Mazhar"
      };
      this.props.createEvent(newEvent);
      this.props.history.push("/events");
    }
  };
  handleScriptLoaded = () => this.setState({ scriptLoaded: true });

  render() {
    const { invalid, submitting, pristine } = this.props;
    return (
      <Grid>
        <Script
          url="https://maps.googleapis.com/maps/api/js?key=AIzaSyAqe2Hx0D8PX6MdqaIXKQvxr_ysHwj-I04&libraries=places"
          onLoad={this.handleScriptLoaded}
        />
        <Grid.Column width={10}>
          <Segment>
            <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>
              <Header sub color="teal" content="Event Details" />
              <Field
                name="title"
                type="text"
                component={TextInput}
                placeholder="Give your event a name"
              />
              <Field
                name="category"
                type="text"
                options={category}
                component={SelectInput}
                placeholder="What is your event about"
              />
              <Field
                name="description"
                type="text"
                rows={3}
                component={TextArea}
                placeholder="Tell us about your event"
              />
              <Header sub color="teal" content="Event location details" />
              <Field
                name="city"
                type="text"
                component={PlaceInput}
                options={{ types: ["(cities)"] }}
                placeholder="Event city"
                onSelect={this.handleCitySelect}
              />
              {this.state.scriptLoaded && (
                <Field
                  name="vanue"
                  type="text"
                  component={PlaceInput}
                  options={{
                    location: new google.maps.LatLng(this.state.cityLatLng),
                    radius: 1000,
                    types: ["establishment"]
                  }}
                  placeholder="Event Vanue"
                  onSelect={this.handleVanueSelect}
                />
              )}
              <Field
                name="date"
                type="text"
                component={DateInput}
                dateFormat="YYYY-MM-DD HH:mm"
                timeFormat="HH:mm"
                showTimeSelect
                placeholder="Event Date"
              />

              <Button
                positive
                type="submit"
                disabled={invalid || submitting || pristine}
              >
                Submit
              </Button>
              <Button onClick={this.props.history.goBack} type="button">
                Cancel
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    );
  }
}
export default connect(
  mapState,
  actions
)(
  reduxForm({ form: "EventForm", enableReinitialize: true, validate })(
    EventForm
  )
);
