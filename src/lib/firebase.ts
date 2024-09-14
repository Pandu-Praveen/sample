// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCkDYWzYrw1d24O67ANWA0mSM9FImbt_qY",
  authDomain: "indo-tech.firebaseapp.com",
  databaseURL:
    "https://indo-tech-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "indo-tech",
  storageBucket: "indo-tech.appspot.com",
  messagingSenderId: "736531233573",
  appId: "1:736531233573:web:513b553571425512f238cc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);