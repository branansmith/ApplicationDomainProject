import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
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
        alert("Password must be at least 8 characters")
        return false
    } 
    const letter = 'abcdefghijklmnopqrstuvwxyz';
    if(!letter.includes(password.toLowerCase().charAt(0))) {
        alert("Password must start with a letter")
        return false
    }
    const special_character = '!@#$%^&*()'
    if(!special_character.includes(password)) {
        alert("Password must include a special character ('!@#$%^&*()')")
        return false
    }
  }

  function validate_field(field) {
    if(field == null) {
        return false
    }
  }

  function writeUserData(first_name, last_name, address, date_of_birth, email, role) {
    const db = getDatabase();
    const reference = ref(db, 'users/' + first_name + " " + last_name);
  
    set(reference, {
      first_name: first_name,
      last_name: last_name,
      email: email,
      address: address,
      date_of_birth: date_of_birth,
      role: role
    });
}

function authenticate(email, password) {
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
}

function redirect() {
    window.location = "index.html";
}
const createNewUserButton = document.getElementById('create-new-user-button');

if(createNewUserButton) {
createNewUserButton.addEventListener("click", (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value
    const password = document.getElementById('signup-password').value
    const first_name = document.getElementById('signup-first-name').value
    const last_name = document.getElementById('signup-last-name').value
    const date_of_birth = document.getElementById('signup-date-of-birth').value
    const address = document.getElementById('signup-address').value
    if(validate_password(password)) {
        writeUserData(first_name, last_name, address, date_of_birth, email, "User");
    authenticate(email, password);
    document.getElementById("signup-form").reset();
    alert("Success! Your account is now awaiting approval from an administrator.");
    } 
});
} 


const signInButton = document.getElementById('signin-button');

if(signInButton) {
signInButton.addEventListener("click", (e) => {
    const username = document.getElementById('login-username').value
    const password = document.getElementById('login-password').value
    signIn(username, password)
})
}
function signIn(username, password) {
    const signInAuth = getAuth();
    signInAuth.signInWithEmailAndPassword(auth, username, password)
    .then((userCredential) => {
        alert("Success!");
        const user = userCredential.user;
        console.log(user.uid);
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage + " " + errorCode);
    });
}



/* auth.onAuthStateChanged(user => {
    if(user) {
       window.location = 'CreateNewUserScreen.html';
    } 
}); */



const logOutButton = document.getElementById('logout-button');
if(logOutButton) {
logOutButton.addEventListener("click", (e) => {
    e.preventDefault();
    alert("test");
})
}

var recipient = document.getElementById('forgot-password-email');
const subject = 'Test';
const body = 'You have been approved! Login here: https://www.google.com'

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
