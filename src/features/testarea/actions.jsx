import {
  INCREMENT_COUNTER,
  DECREMENT_COUNTER,
  COUNTER_ACTION_STARTED,
  COUNTER_ACTION_FINISHED
} from "./testContans";
import firebase from '../../app/config/firbase'

export const incrementCounter = () => {
  return {
    type: INCREMENT_COUNTER
  };
};

export const decrementCounter = () => {
  return {
    type: DECREMENT_COUNTER
  };
};
export const startedCounterAction = () => {
  return {
    type: COUNTER_ACTION_STARTED
  };
};
export const finishCounterAction = () => {
  return {
    type: COUNTER_ACTION_FINISHED
  };
};
const delay = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};
export const incrementAsync = () => {
  return async dispatch => {
    dispatch(startedCounterAction());
    await delay(1000);
    dispatch({ type: INCREMENT_COUNTER });
    dispatch(finishCounterAction());
  };
};
export const decrementAsync = () => {
  return async dispatch => {
    dispatch(startedCounterAction());
    await delay(1000);
    dispatch({ type: DECREMENT_COUNTER });
    dispatch(finishCounterAction());
  };
};
export const permissionTest = () => async (dispatch, getState) => {
  const firestore=firebase.firestore();
  try {
   
  let eventRef=await firestore.collection("users").doc("os0nnZZfXYa0Kp11vrY0pjo1geC3");
  await eventRef.update({
    displayName:"testing1"
  }) 
  } catch (error) {
    console.log(error);
  }
};
