import {
  CREATE_EVENT,
  DELETE_EVENT,
  UPDATE_EVENT,
  FETCH_EVENTS
} from "./EventConstant";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";
import { toastr } from "react-redux-toastr"
export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};
export const createEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: CREATE_EVENT,
        payload: { event }
      });
      toastr.success("Success!","Event has been created")
    } catch (error) {
      toastr.success("Oops","Something went wrong")
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
      toastr.success("Success!","Event has been Deleted")
    } catch (error) {
      toastr.success("Oops","Something went wrong")
    }
  };
};
export const updateEvent = event => {
  return async dispatch => {
    try {
      dispatch({
        type: UPDATE_EVENT,
        payload: { event }
      });
      toastr.success("Success!","Event has been updated")
    } catch (error) {
      toastr.success("Oops","Something went wrong")
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
