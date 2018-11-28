import {FETCH_EVENTS } from "./EventConstant";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import { toastr } from "react-redux-toastr";
import { createNewEvent } from "../../app/common/util/helpers";
import moment from "moment";
import firebase  from '../../app/config/firbase'
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

export const cancelToggle = (cancelled, eventId) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const message = cancelled
    ? "Are you sure you want to cancel the event ?"
    : "This will reactivate the event -are you sure?";
  try {
    const firestore = getFirestore();
    toastr.confirm(message, {
      onOk: () =>
        firestore.update(`events/${eventId}`, {
          cancelled: cancelled
        })
    });
  } catch (error) {
    toastr.error("sorry", error);
  }
};

export const getEventsForDashboard=()=>async(
  dispatch,getState
)=>{
 const today=new Date(Date.now());
 const firestore=firebase.firestore();
 const eventsQuery=firestore.collection('events').where('date','>=',today);
 try{
  dispatch(asyncActionStart())
   const querySnap=await eventsQuery.get();
  let events=[];
  for(let i=0;i<querySnap.docs.length;i++){
    let evt={...querySnap.docs[i].data(),id:querySnap.docs[i].id}
    events.push(evt)
  }
  dispatch({type:FETCH_EVENTS,payload:{events}})
  dispatch(asyncActionFinish())
 }catch(error){
   console.log(error)
   dispatch(asyncActionError())
 }
}