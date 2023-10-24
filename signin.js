import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged, sendPasswordResetEmail, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgjtR6Bh6eeLrcriQXAqyR6UYKNtn7RQ8",
  authDomain: "test-project-bf189.firebaseapp.com",
  databaseURL: "https://test-project-bf189-default-rtdb.firebaseio.com",
  projectId: "test-project-bf189",
  storageBucket: "test-project-bf189.appspot.com",
  messagingSenderId: "77549761669",
  appId: "1:77549761669:web:645823a2111143903f65ec",
  measurementId: "G-ETP35BL2ZK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const signInButton = document.getElementById('signin-button');

if(signInButton) {
signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value
    signIn(username, password)
})
}
function signIn(username, password) {
    signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage + " " + errorCode);
    });
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("user logged in: ", user);
        window.location = 'EmployeeLanding.html';
    }
})