import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  // apiKey: "AIzaSyDTz7PhEojER4iyERzBNm32nz0pwKM3qDA",
  // authDomain: "revents-1077d.firebaseapp.com",
  // databaseURL: "https://revents-1077d.firebaseio.com",
  // projectId: "revents-1077d",
  // storageBucket: "revents-1077d.appspot.com",
  // messagingSenderId: "631636745857"
  apiKey: "AIzaSyCk3n0P9Gvgmwjou8RGB758X9hUbMCOgn4",
  authDomain: "socialevents-315e9.firebaseapp.com",
  projectId: "socialevents-315e9",
  storageBucket: "socialevents-315e9.appspot.com",
  messagingSenderId: "236251507917",
  appId: "1:236251507917:web:50a13f8ba21b97a9d70d84",
  measurementId: "G-Y4LSP4CMN9",
  databaseURL: "https://socialevents-315e9-default-rtdb.firebaseio.com",
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
  timestampsInSnapshots: true
}
firestore.settings(settings)
export default firebase;