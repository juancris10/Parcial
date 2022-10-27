// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAP1hCpOxI5AgHCrmOf6QJVRqU1EBqz43U",
  authDomain: "parcial-poo-5451a.firebaseapp.com",
  projectId: "parcial-poo-5451a",
  storageBucket: "parcial-poo-5451a.appspot.com",
  messagingSenderId: "367500218802",
  appId: "1:367500218802:web:e05dfceea6d219abd714ab",
  measurementId: "G-5JHZM90ZGL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)