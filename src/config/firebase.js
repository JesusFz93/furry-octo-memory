// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbkq9lBMA6nSSR2cuBfsy0uWXhBdzD07Y",
  authDomain: "crud-react-914ff.firebaseapp.com",
  projectId: "crud-react-914ff",
  storageBucket: "crud-react-914ff.appspot.com",
  messagingSenderId: "301361295723",
  appId: "1:301361295723:web:5a5cddc9f4313addf81c2e",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const dbConfig = getFirestore(app);
