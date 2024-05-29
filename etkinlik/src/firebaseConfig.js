// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-lI4_lgTDlSTULCmRnXT0ILK5-rtpEXk",
  authDomain: "etkinlik-97cc7.firebaseapp.com",
  projectId: "etkinlik-97cc7",
  storageBucket: "etkinlik-97cc7.appspot.com",
  messagingSenderId: "359651530728",
  appId: "1:359651530728:web:7d0c2c65144159ceb4765d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
