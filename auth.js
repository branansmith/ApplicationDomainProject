import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, connectDatabaseEmulator } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const db = getDatabase();
if (location.hostname === "localhost") {
  // Point to the RTDB emulator running on localhost.
  connectDatabaseEmulator(db, "127.0.0.1", 9000);
} 
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
  const auth = getAuth();

  function register() {
    

  }

  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
  }

  function validate_password(password) {
    if(password < 8) {
        return false
    } else {
        return true
    }
  }

  function validate_field(field) {
    if(field == null) {
        return false
    }
  }
document.getElementById('create-new-user-button').addEventListener("click", function(){
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const first_name = document.getElementById('signup-first-name').value
    const last_name = document.getElementById('signup-last-name').value
    const dob = document.getElementById('signup-date-of-birth').value

    if (validate_email(email) == false || validate_password(password == false)) {
        return
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(function() {
        var user = auth.currentUser

        var database_ref = database.ref()

        var user_data = {
            email : email,
            first_name : first_name,
            last_name : last_name,
            dob : dob
        }

        database_ref.child('users/' + user.uid).set(user_data)
    })
    .catch(function(error) {
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })
});