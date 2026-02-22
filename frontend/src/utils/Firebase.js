// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "magicart-d0f47.firebaseapp.com",
  projectId: "magicart-d0f47",
  storageBucket: "magicart-d0f47.firebasestorage.app",
  messagingSenderId: "552434261160",
  appId: "1:552434261160:web:f69ea8658e405445f3369d",
  measurementId: "G-WZL8RHR1DZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export {auth,provider};