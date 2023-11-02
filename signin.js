import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, doc, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
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


//get user role
async function isManager(user) {
    const museums = query(collection(db, 'users'), where('email', '==', user.email), where('role', '==', 'manager'));
const querySnapshot = await getDocs(museums);
if(querySnapshot.size) {
    window.location = 'EmployeeLanding.html';
} 
}

async function isUser(user) {
    const museums = query(collection(db, 'users'), where('email', '==', user.email), where('role', '==', 'user'));
const querySnapshot = await getDocs(museums);
if(querySnapshot.size) {
    window.location = 'LandingManagerial.html';
} 

}

async function isAdmin(user) {
    const museums = query(collection(db, 'users'), where('email', '==', user.email), where('role', '==', 'admin'));
const querySnapshot = await getDocs(museums);
if(querySnapshot.size) {
    window.location = 'landingAdmin.html';
} 
}





//search for user email
//then get the role
onAuthStateChanged(auth, (user) => {
    if(user) {
        window.location = "EmployeeLanding.html";
}
})
