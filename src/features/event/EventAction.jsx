import {CREATE_EVENT,DELETE_EVENT,UPDATE_EVENT,FETCH_EVENTS} from "./EventConstant";
import {asyncActionStart,asyncActionFinish,asyncActionError} from "../async/asyncActions";
import { fetchSampleData } from "../../app/data/mockApi";

export const fetchEvents = events => {
  return {
    type: FETCH_EVENTS,
    payload: events
  };
};
export const createEvent = event => {
  return {
    type: CREATE_EVENT,
    payload: { event }
  };
};

export const deleteEvent = eventid => {
  return {
    type: DELETE_EVENT,
    payload: { eventid }
  };
};
export const updateEvent = event => {
  return {
    type: UPDATE_EVENT,
    payload: { event }
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
