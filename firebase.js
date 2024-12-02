// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8RH2Cu_i3ZFHT02BI4s8rWuqWEwZaNew",
  authDomain: "learnenglishapp-ccb4d.firebaseapp.com",
  databaseURL: "https://learnenglishapp-ccb4d-default-rtdb.firebaseio.com",
  projectId: "learnenglishapp-ccb4d",
  storageBucket: "learnenglishapp-ccb4d.firebasestorage.app",
  messagingSenderId: "679262443380",
  appId: "1:679262443380:web:8a1a711bc25f4e4daf3e21",
  measurementId: "G-3ENHVWEE55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore=getFirestore(app);
export {firestore};
// const analytics = getAnalytics(app);










// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//   authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
//   projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.REACT_APP_FIREBASE_APP_ID,
//   measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// export default app;