// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/messaging";
// import { getMessaging } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArNOjdBBUqfj73qSMN60yyEDFsrk4gcfQ",
  authDomain: "learning-enhancement-app.firebaseapp.com",
  projectId: "learning-enhancement-app",
  storageBucket: "learning-enhancement-app.appspot.com",
  messagingSenderId: "684318946736",
  appId: "1:684318946736:web:6af3587b55e52eaa079275",
  measurementId: "G-VLHYESKNN2"
};
// let app = firebase(firebaseConfig);

// const messaging = getMessaging(app);
// const vapidKey = {
//   vapidKey:
//     "684318946736",
// };

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// const app = initializeApp(firebaseConfig);

export default firebase;

