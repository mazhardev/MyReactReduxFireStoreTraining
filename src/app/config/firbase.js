import firebase from "firebase";
import "firebase/firestore";
const firebaseconfig = {
  apiKey: "AIzaSyA9hXjyVQ36g_FnbV5XNTCZqDfkf2LUhwE",
  authDomain: "just-duality-219119.firebaseapp.com",
  databaseURL: "https://just-duality-219119.firebaseio.com",
  projectId: "just-duality-219119",
  storageBucket: "",
  messagingSenderId: "621927613306"
};
firebase.initializeApp(firebaseconfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
};
firestore.settings(settings);
export default firebase;