// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
//import {getFirestore} from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDKls5OzmfIyvH6l2ODpPZ1iRQ6LqjT9j4",
  authDomain: "virtual-bookstore-35845.firebaseapp.com",
  databaseURL: "https://virtual-bookstore-35845-default-rtdb.firebaseio.com",
  projectId: "virtual-bookstore-35845",
  storageBucket: "virtual-bookstore-35845.appspot.com",
  messagingSenderId: "503718835718",
  appId: "1:503718835718:web:db58ad366d71613fceb587"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export const db = getFirestore(app);