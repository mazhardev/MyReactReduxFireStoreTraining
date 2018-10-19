import { SIGN_OUT_USER } from "./AuthConstants";
import { closeModal } from "../modals/modalActions";
import { SubmissionError } from "redux-form";

export const login = creds => {
  return async (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    try {
      await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
      dispatch(closeModal());
    } catch (error) {
      console.log(error);
      throw new SubmissionError({
        _error: "Login failed"
      });
    }
  };
};

export const logout = () => {
  return {
    type: SIGN_OUT_USER
  };
};
export const registerUser = user => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = getFirebase();
  const firestore = getFirestore();
  try {
    //create user in auth
    let createUser = await firebase
      .auth()
      .createUserWithEmailAndPassword(user.email, user.password);
    console.log(createUser);
    //update the auth profile
    await createUser.updateProfile({
      displayName: user.displayName
    });
    //create a new profie in firestore
    let newUser = {
      displayName: user.displayName,
      createdAt: firestore.FieldValue.serverTimestamp()
    };
    await firestore.set(`users/${createUser.uid}`, { ...newUser });
    dispatch(closeModal());
  } catch (error) {
    console.log(error);
    throw new SubmissionError({
      _error: "Registration failed"
    });
  }
};
