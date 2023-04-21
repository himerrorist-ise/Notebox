// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACrMZIQGy8dG4iHphlW6Z90Ss5xWv8tCQ",
  authDomain: "notebox-bing.firebaseapp.com",
  projectId: "notebox-bing",
  storageBucket: "notebox-bing.appspot.com",
  messagingSenderId: "1054826644660",
  appId: "1:1054826644660:web:5e23c659abaf0e4ff703e1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

export const auth =  getAuth(app);
export const db = getFirestore(app);
export default app;