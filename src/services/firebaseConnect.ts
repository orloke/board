import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


let firebaseConfig = {
  apiKey: "AIzaSyB_A6mdBlUbSrRhalu_bc8bsooUL0UMTy8",
  authDomain: "board-1a8d0.firebaseapp.com",
  projectId: "board-1a8d0",
  storageBucket: "board-1a8d0.appspot.com",
  messagingSenderId: "274257761251",
  appId: "1:274257761251:web:8a42cf03e01cbff4ec46d6",
};


const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export default db;
