import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyB3lKn75kX95mhTYkT87UkZXWWFV1GzYVY",
    authDomain: "leads-validator.firebaseapp.com",
    projectId: "leads-validator",
    storageBucket: "leads-validator.appspot.com",
    messagingSenderId: "507916941390",
    appId: "1:507916941390:web:ec5a8c0dcc111f09c9eb1f",
    measurementId: "G-DTBEFMYNPQ"
  };

// Initialize firebase and return
const app = initializeApp(firebaseConfig);

export default app;
