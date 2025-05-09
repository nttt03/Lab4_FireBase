// config/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCaEQkWLY7g1E3NuHlrdZpFujstcPHkqbo",
  authDomain: "lab4firebase-35006.firebaseapp.com",
  projectId: "lab4firebase-35006",
  storageBucket: "lab4firebase-35006.firebasestorage.app",
  messagingSenderId: "588529508257",
  appId: "1:588529508257:web:e8e1d1808ea998b51f35e0"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
