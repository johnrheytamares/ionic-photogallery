// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD95kuyOhTudTq0GBSuaapfaooJLj4PTso",
  authDomain: "ionic-photo-gallery-e4fda.firebaseapp.com",
  databaseURL: "https://ionic-photo-gallery-e4fda-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "ionic-photo-gallery-e4fda",
  storageBucket: "ionic-photo-gallery-e4fda.firebasestorage.app",
  messagingSenderId: "524082105567",
  appId: "1:524082105567:web:38cfd385371cc45012ed6a",
  measurementId: "G-ZWSLDKJHD4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const database = getDatabase(app);