// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRK2izk5LvUkWh5aq-m-300AtEZZpElEI",
  authDomain: "eekhgames.firebaseapp.com",
  projectId: "eekhgames",
  storageBucket: "eekhgames.appspot.com",
  messagingSenderId: "1046928875257",
  appId: "1:1046928875257:web:0a1f2a00f09541bb514c28",
  measurementId: "G-YK4V9GVGTJ"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
export {app}
export{auth}
export { db };
