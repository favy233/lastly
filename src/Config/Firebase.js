// firebase.js

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // 🔥 You missed this import

const firebaseConfig = {
  apiKey: "AIzaSyCduYSDjJ100eOM4HBJ3ZfNa5iEjemguME",
  authDomain: "inventory-management-1914d.firebaseapp.com",
  projectId: "inventory-management-1914d",
  storageBucket: "inventory-management-1914d.appspot.com",
  messagingSenderId: "849565521577",
  appId: "1:849565521577:web:2a021c63f7a8ff0388fbb8"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore and Auth
export const db = getFirestore(app);
export const auth = getAuth(app);

// Google provider
export const firebaseProvider = new GoogleAuthProvider(); // ✅ renamed to lowercase "f"
