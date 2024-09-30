// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyCcTV7UdjOBe3nKWfwC1FT1u8PySwKl4XQ",
//   authDomain: "documents-21f71.firebaseapp.com",
//   projectId: "documents-21f71",
//   storageBucket: "documents-21f71.appspot.com",
//   messagingSenderId: "600113804831",
//   appId: "1:600113804831:web:b1cd7cb589e0a0273a872a",
//   measurementId: "G-QWRQT2ZDB6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCcTV7UdjOBe3nKWfwC1FT1u8PySwKl4XQ",
  authDomain: "documents-21f71.firebaseapp.com",
  projectId: "documents-21f71",
  storageBucket: "documents-21f71.appspot.com",
  messagingSenderId: "600113804831",
  appId: "1:600113804831:web:b1cd7cb589e0a0273a872a",
//   measurementId: "G-QWRQT2ZDB6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firestore instance
const db = getFirestore(app);

// Storage instance
const storage = getStorage(app);

export { db, storage };
