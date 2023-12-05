import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { onAuthStateChanged, getAuth, sendPasswordResetEmail, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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



//Validate the email passed
function validate_email(email) {
  const expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
      return true
  } else {
      return false
  }
}

//validate the password passed
function validate_password(password) {
  const validatePasswordRegex = /^[a-zA-Z](?=.*[!@#$%^&*()])(?=.*[0-9]).{8,}$/
  if (validatePasswordRegex.test(password) == true) {
      return true;
  } else {
      alert("Password must start with a letter, contain a special character ('!@#$%^&*()') and include at least one number");
      return false;
  }
}

//"index.html"
function redirect(url) {
  window.location = url;
}

//Add user to firestore
const addUser = async (users, username) => {
    const userRef = await setDoc(doc(db, 'users', username), users);
    console.log('Sent');
};

//need to make document start with username instead of name

//create user object to store user data
const createUser = (fname, lname, email, address, dob) => {
    var user = [];
    const currentDate = new Date();
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear() % 100;

    user.push({
        username: fname.charAt(0) + lname + month + year,
        first_name: fname,
        last_name: lname,
        email: email,
        address: address,
        date_of_birth: dob,
        role: "user"
        
    });
    console.log('Sent via CreateUser');
    return user;
};

/**
 * @param {user[]} userArr 
 * @returns {Promise[]} list of promises 
 */
const addUsers = async (userArr) => {
  let promises = [];
  for(var i =  0; i < userArr.length; i++){
    console.log(name);
    let promise = addUser(userArr[i], userArr[i].username);
    if(!promise) {
      console.debug('couldn\'t add the user');
      return Promise.reject();
    } else {
      promises.push(promise);
    }
  }
  await Promise.all(promises);
};

//Retieve the values entered by the user and parse any needed values
function createNewUserButton(){
  const fname = document.getElementById("signup-first-name").value;
  const lname = document.getElementById("signup-last-name").value;
  const email = document.getElementById("signup-email").value;
  const address = document.getElementById("signup-address").value;
  const password = document.getElementById("signup-password").value;
  const dob = document.getElementById('signup-date-of-birth').value;

  if(validate_email(email) && validate_password(password)){
    addUsers(createUser(fname, lname, email, address, dob));
    createUserWithEmailAndPassword(auth, email, password);
  }
  

}

onAuthStateChanged(auth, (user) => {
    if(user) {
        
  }
  })





//action event triggered when a user clicks the create account button 
const form = document.getElementById("create-new-user-button");
if(form) {
form.addEventListener("click", (e) => {
  e.preventDefault();
  try{
  createNewUserButton()
    
  } catch (error){
    console.error(error);
  }
});
}

function reload() {
  location.reload();
}

