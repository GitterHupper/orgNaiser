// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaB52kWmkKY6N6O6dVW8PXQp0E6U0bfmQ",
  authDomain: "orgnaiser.firebaseapp.com",
  databaseURL: "https://orgnaiser-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "orgnaiser",
  storageBucket: "orgnaiser.appspot.com",
  messagingSenderId: "1083864724267",
  appId: "1:1083864724267:web:86eeabde43ac2a3082cb6e",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const projectStorage = getStorage(app);
const projectFirestore = getFirestore(app);
const timestamp = serverTimestamp();
const auth = getAuth(app);

export { auth };
export { app, projectStorage };
export { projectFirestore, timestamp };
