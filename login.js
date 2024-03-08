// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8Ix1W8_5Cc9R9lFhFiU07srhwbR7YReM",
  authDomain: "commerce-97fc4.firebaseapp.com",
  projectId: "commerce-97fc4",
  storageBucket: "commerce-97fc4.appspot.com",
  messagingSenderId: "1022901013360",
  appId: "1:1022901013360:web:5bc2b1808dafaebdb0ddb5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export default auth;

import {
 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";

const email = document.querySelector("#email");
const password = document.querySelector("#password");
const login = document.querySelector("#Login");

// login.addEventListener("click", (e) => {
//   e.preventDefault();
//   const userdetails = {
//     Email: email.value,
//     password: password.value,
//   };
//   console.log(userdetails);
//   const auth = getAuth();

//   createUserWithEmailAndPassword(auth, email.value, password.value)
//     .then((userCredential) => {
//       // Signed up
//       const user = userCredential.user;
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // ..
//     });
// });

login.addEventListener("click", (e) => {
  e.preventDefault();
  if (email.value && password.value) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user.uid);
        alert("User loggedin successfully");
        window.location.href = `./commerce.html`;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }
});
