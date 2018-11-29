import moment from "moment";
import { toastr } from "react-redux-toastr";
import cuid from "cuid";
import {
  asyncActionStart,
  asyncActionFinish,
  asyncActionError
} from "../async/asyncActions";
import firebase from "../../app/config/firbase";
import { FETCH_EVENTS } from '../event/EventConstant'

export const updateProfile = user => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  const { isLoaded, isEmpty, ...updatedUser } = user;
  if (updatedUser.dateOfBirth !== getState().firebase.profile.dateOfBirth) {
    updatedUser.dateOfBirth = moment(updatedUser.dateOfBirth).toDate();
  }

  try {
    await firebase.updateProfile(updatedUser);
    toastr.success("Success", "Profile updated");
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImage = (file, fileName) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const imageName = cuid();
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  const path = `${user.uid}/user_images`;
  const options = {
    name: imageName
  };
  try {
    dispatch(asyncActionStart());
    //upload the file to firebase storage
    let uploadedFile = await firebase.uploadFile(path, file, null, options);
    //get URL of image
    let downloadURL = await uploadedFile.uploadTaskSnapshot.downloadURL;
    //get user doc
    let userDoc = await firestore.get(`users/${user.uid}`);
    //check if user has photo, if not update profile with new image
    if (!userDoc.data().photoURL) {
      await firebase.updateProfile({
        photoURL: downloadURL
      });
      await user.updateProfile({
        photoURL: downloadURL
      });
    }
    //add the new photo to photos collection
    await firestore.add(
      {
        collection: "users",
        doc: user.uid,
        subcollections: [{ collection: "photos" }]
      },
      {
        name: imageName,
        url: downloadURL
      }
    );
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
    throw new Error("Problem uploading image");
  }
};
export const deletePhoto = photo => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  const user = firebase.auth().currentUser;
  try {
    await firebase.deleteFile(`${user.uid}/user_images/${photo.name}`);
    await firestore.delete({
      collection: "users",
      doc: user.uid,
      subcollections: [{ collection: "photos", doc: photo.id }]
    });
  } catch (error) {
    console.log(error);
    throw new Error("Problem deleting the photo");
  }
};

export const setMainPhoto = photo => async (
  dispatch,
  setState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  try {
    await firebase.updateProfile({
      photoURL: photo.url
    });
  } catch (error) {
    throw new Error("Problem stting main page");
  }
};

export const goingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  const photoURL = getState().firebase.profile.photoURL;
  const attendee = {
    going: true,
    joinDate: Date.now(),
    photoURL: photoURL || "/assets/user.png",
    displayName: user.displayName,
    host: false
  };
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: attendee
    });
    await firestore.set(`event_attendee/${event.id}_${user.uid}`, {
      eventId: event.id,
      userUid: user.uid,
      eventDate: event.date,
      host: false
    });
    toastr.success("Success", "You have successfuly signed up to the event");
  } catch (error) {
    console.log(error);
    toastr.error("Error", "Problem with signed up event!");
  }
};
export const cancelGoingToEvent = event => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const user = firestore.auth().currentUser;
  try {
    await firestore.update(`events/${event.id}`, {
      [`attendees.${user.uid}`]: firestore.FieldValue.delete()
    });
    await firestore.delete(`event_attendee/${event.id}_${user.uid}`);
    toastr.success("Success", "You have removed youreself from the event");
  } catch (error) {
    console.log(error);
    toastr.error("Error", "Sorry problem with cancel event");
  }
};
export const getUserEvents = (userUid, activeTabe) => async (
  dispatch,
  getState
) => {
  dispatch(asyncActionStart());
  const today = new Date(Date.now());
  const firestore = firebase.firestore();
  const eventsRef = firestore.collection("event_attendee");
  let query;
  switch (activeTabe) {
    case 1: //past events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", "<=", today)
        .orderBy("eventDate", "desc");
      break;
    case 2: //future Events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("eventDate", ">", today)
        .orderBy("eventDate");
      break;
    case 3: //hosted events
      query = eventsRef
        .where("userUid", "==", userUid)
        .where("host", "==", true)
        .orderBy("eventDate", "desc");
      break;
    default:
      query = eventsRef
        .where("userUid", "==", userUid)
        .orderBy("eventDate", "desc");
  }
  try {
    let querySnap = await query.get();
    let events = [];
    for (let i = 0; i < querySnap.docs.length; i++) {
      let evt = await firestore
        .collection("events")
        .doc(querySnap.docs[i].data().eventId)
        .get();
      events.push({ ...evt.data(), id: evt.id });
    }
    dispatch({type:FETCH_EVENTS,payload:{events}})
    dispatch(asyncActionFinish());
  } catch (error) {
    console.log(error);
    dispatch(asyncActionError());
  }
};
