import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";


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

  function writeUserData(first_name, last_name, email, address, date_of_birth) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + first_name + " " + last_name);
  
    set(reference, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      address: address,
      date_of_birth: date_of_birth
    });
    }
  
document.getElementById('create-new-user-button').addEventListener("click", function(){
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const first_name = document.getElementById('signup-first-name').value
    const last_name = document.getElementById('signup-last-name').value
    const date_of_birth = document.getElementById('signup-date-of-birth').value
    const address = document.getElementById('signup-address').value

    

        

    if (validate_email(email) == false || validate_password(password == false)) {
        alert("Please enter a correct email or a password with at least 8 characters in length")
    }

    createUserWithEmailAndPassword(auth, email, password)
    .then(function() {
        var user = auth.currentUser
        
    })
    .catch(function(error) {
        var error_code = error.code
        var error_message = error.message

        alert(error_message)
    })
});
