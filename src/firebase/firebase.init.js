// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_apiKey,
  authDomain: import.meta.env.VITE_authDomain,
  projectId: import.meta.env.VITE_projectId,
  storageBucket: import.meta.env.VITE_storageBucket,
  messagingSenderId: import.meta.env.VITE_messagingSenderId,
  appId: import.meta.env.VITE_appId

  // apiKey: "AIzaSyAimTDc6eJooCOy9ePPa_JspwNwCrMOBRk",
  // authDomain: "universeitinstitute-7e0ff.firebaseapp.com",
  // projectId: "universeitinstitute-7e0ff",
  // storageBucket: "universeitinstitute-7e0ff.appspot.com",
  // messagingSenderId: "502622279332",
  // appId: "1:502622279332:web:e01ac6a2be3a6a7a667831"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth; 


// import { initializeApp } from "firebase/app";
// import { getAuth } from "firebase/auth";
 

// const firebaseConfig = {
    // apiKey: import.meta.env.VITE_apiKey,
    // authDomain: import.meta.env.VITE_authDomain,
    // projectId: import.meta.env.VITE_projectId,
    // storageBucket: import.meta.env.VITE_storageBucket,
    // messagingSenderId: import.meta.env.VITE_messagingSenderId,
    // appId: import.meta.env.VITE_appId
//   };
  
//   const app = initializeApp(firebaseConfig);
//   const auth = getAuth(app);
 
 
//  export default auth; 