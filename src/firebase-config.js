import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'
// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZK-Qu1z3K30C_nsiufl-GE58VtPiU4hc",
  authDomain: "otpdemo-f2bc8.firebaseapp.com",
  projectId: "otpdemo-f2bc8",
  storageBucket: "otpdemo-f2bc8.appspot.com",
  messagingSenderId: "501389192134",
  appId: "1:501389192134:web:ca28c639b864455cf760c7",
  measurementId: "G-D5F3GV22WB"
};

const app = initializeApp(firebaseConfig);
export const autentication = getAuth(app)