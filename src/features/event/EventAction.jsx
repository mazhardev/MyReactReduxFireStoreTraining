import { DELETE_EVENT, FETCH_EVENTS } from "./EventConstant";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/common/util/helpers";
import moment from "moment";
export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};
export const createEvent = event => {
  return async (dispatch, getState, { getFirestore, getFirebase }) => {
    try {
      const firestore = getFirestore();
      const user = firestore.auth().currentUser;
      const photoURL = getState().firebase.profile.photoURL;
      const newEvent = createNewEvent(user, photoURL, event);
      let createdEvent = await firestore.add(`events`, newEvent);
      await firestore.set(`event_attendee/${createdEvent.id}_${user.uid}`, {
        eventId: createdEvent.id,
        userUid: user.uid,
        eventDate: event.date,
        host: true
      });

      toastr.success("Success!", "Event has been created");
    } catch (error) {
      console.log(error);
      toastr.error("Oops", error.message);
    }
  };
};

export const deleteEvent = eventid => {
  return async dispatch => {
    try {
      dispatch({
        type: DELETE_EVENT,
        payload: { eventid }
      });
      toastr.success("Success!", "Event has been Deleted");
    } catch (error) {
      toastr.success("Oops", "Something went wrong");
    }
  };
};
export const updateEvent = event => {
  return async (dispatch, getState, { getFirebase, getFirestore }) => {
    try {
      const firestore = getFirestore();
      if (event.date !== getState().firestore.ordered.events[0].date) {
        event.date = moment(event.date.toDate());
      }
      await firestore.update(`events/${event.id}`, event);
      toastr.success("Success!", "Event has been updated");
    } catch (error) {
      toastr.success("Oops", "Something went wrong");
    }
  };
};
export const loadEvents = () => {
  return async dispatch => {
    try {
      dispatch(asyncActionStart());
      let events = await fetchSampleData();
      dispatch(fetchEvents(events));
      dispatch(asyncActionFinish());
    } catch (error) {
      console.log(error);
      dispatch(asyncActionError());
    }
  };
};
