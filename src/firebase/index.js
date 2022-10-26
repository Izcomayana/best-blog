import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore" ;
 
const firebaseConfig = {
  apiKey: "AIzaSyD-74-l-D1Z7bMzJIBASWgZ7ocRcEXH2Eg",
  authDomain: "fir-todo-bdec1.firebaseapp.com",
  projectId: "fir-todo-bdec1",
  storageBucket: "fir-todo-bdec1.appspot.com",
  messagingSenderId: "720163163502",
  appId: "1:720163163502:web:7c1fb1abf1dc56550ec57f"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db
}