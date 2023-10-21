import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAgjtR6Bh6eeLrcriQXAqyR6UYKNtn7RQ8",
    authDomain: "test-project-bf189.firebaseapp.com",
    databaseURL: "https://test-project-bf189-default-rtdb.firebaseio.com",
    projectId: "test-project-bf189",
    storageBucket: "test-project-bf189.appspot.com",
    messagingSenderId: "77549761669",
    appId: "1:77549761669:web:160e61463978ba1e3f65ec",
    measurementId: "G-S94ZDL330Q"
  };


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);

const logOutButton = document.getElementById('logout-button');
if(logOutButton) {
logOutButton.addEventListener("click", (e) => {
    auth.signOut()
    window.location.href = 'index.html';
})
}

onAuthStateChanged(auth, (user) => {
  if (user == null) {
      window.location = 'index.html';
  } 
  
})
