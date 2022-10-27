import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyCBA63QAwg-HeqIORvApu1Lo34Y2mDrYOY",
  authDomain: "parcial-f5e5c.firebaseapp.com",
  projectId: "parcial-f5e5c",
  storageBucket: "parcial-f5e5c.appspot.com",
  messagingSenderId: "42449086003",
  appId: "1:42449086003:web:0a732ffd8fc546dbc72546",
  measurementId: "G-BES2N8667J"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const fs = getFirestore(app);