import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCHXE96Te7gYyjoSAb94wXpYR2EjjiQsWY",
  authDomain: "lumenverse-c8a01.firebaseapp.com",
  projectId: "lumenverse-c8a01",
  storageBucket: "lumenverse-c8a01.firebasestorage.app",
  messagingSenderId: "917118818672",
  appId: "1:917118818672:web:f6e4b9a5d7bdf7ec1997b5",
  measurementId: "G-HW6959KCBH",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();