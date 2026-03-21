// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwVpHxgpfUJOOW3cd3Oof6E2hFGaiETbo",
  authDomain: "skillforge-acd65.firebaseapp.com",
  projectId: "skillforge-acd65",
  storageBucket: "skillforge-acd65.firebasestorage.app",
  messagingSenderId: "542174210841",
  appId: "1:542174210841:web:f76c63ba97fb2e43b87388"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);