import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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
  

//ensures user is typing in an email
  function validate_email(email) {
    const expression = /^[^@]+@\w+(\.\w+)+\w$/
    if (expression.test(email) == true) {
        return true
    } else {
        return false
    }
  }

//ensures password meets requirements
  function validate_password(password) {
    const validatePasswordRegex = /^[a-zA-Z](?=.*[!@#$%^&*()])(?=.*[0-9]).{8,}$/
    if (validatePasswordRegex.test(password) == true) {
        return true;
    } else {
        alert("Password must start with a letter, contain a special character ('!@#$%^&*()') and include at least one number");
        return false;
    }
  }
  
//authenticates user email
function authenticate(email, password) {
    if (validate_email(email) == false || validate_password(password == false)) {
        alert("Invalid credentials")
    } 

    
}

 const createNewUserButton = document.getElementById('create-new-user-button');

//if there is a create user button, adds an event listener and created a new user
 if(createNewUserButton) {
 createNewUserButton.addEventListener("click", (e) => {
     e.preventDefault();
     var email = document.getElementById('signup-email').value
     var password = document.getElementById('signup-password').value
     var first_name = document.getElementById('signup-first-name').value
     var last_name = document.getElementById('signup-last-name').value
     var date_of_birth = document.getElementById('signup-date-of-birth').value
     var address = document.getElementById('signup-address').value
     var today = new Date();
     var mm = String(today.getMonth() + 1).padStart(2, '0');
     var yy = String(today.getFullYear());
     var year = yy.slice(2,4);
     const username = first_name.charAt(0).toLowerCase() + last_name.toLowerCase() + mm + year;
     if(validate_password(password)) {
        //potentially wait to use this function until approved by admin
        //send admin email here then use this function if approved
        createUserWithEmailAndPassword(auth, email, password)
        .then(function() {
            var user = auth.currentUser
            
            
            
        })
        .catch(function(error) {
            var error_code = error.code
            var error_message = error.message
    
            alert(error_message)
        })
         writeUserData(first_name, last_name, address, date_of_birth, email, "User", username);
     document.getElementById("signup-form").reset();
     alert("Success! Your account is now awaiting approval from an administrator.");
     
     }
 });
 }

const signInButton = document.getElementById('signin-button');
//if a sign in button is present, adds an event listener which signs in authenticated users
if(signInButton) {
signInButton.addEventListener("click", (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value
    signIn(username, password)
})
}

//signs in valid users
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


var recipient = document.getElementById('forgot-password-email');

//add event listener when user submits forgot password email
const forgotPasswordSubmit = document.getElementById('forgot-password-submit');
if(forgotPasswordSubmit) {
    forgotPasswordSubmit.addEventListener("click", (e) => {
        e.preventDefault();
        sendPasswordResetEmail(auth, recipient.value)
        .then(() => {
            alert("An email has been sent to you");
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage);
        });
    })
    
}

const accountantLogoutButton = document.getElementById('accountant-logout-button');
if(accountantLogoutButton) {
    accountantLogoutButton.addEventListener("click", (e) => {
        auth.signOut();
        window.location = 'index.html';
    })
}
