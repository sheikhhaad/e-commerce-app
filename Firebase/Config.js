// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCUxy1l2WkL6PW1FHgYkHCVp96l2C1SZnk",
  authDomain: "e-commerce-c90fd.firebaseapp.com",
  projectId: "e-commerce-c90fd",
  storageBucket: "e-commerce-c90fd.firebasestorage.app",
  messagingSenderId: "795295667326",
  appId: "1:795295667326:web:2e65cd525d4e5fe50ff42f",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

