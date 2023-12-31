

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getAuth, sendPasswordResetEmail, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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


//Add user to firestore
const addAccount = async (account, name) => {
    const userRef = await setDoc(doc(db, 'accounts', accountName), account);
    console.log('Sent');
}

//create user object to store user data
const createNewAccount = (accountName, accountNumber, description, normalSide, accountCategory,accountSubcategory,normalSide,initialBalance,accountOrder, comment) => {
  var account = [];


  account.push({
    accountName: accountName, 
    accountNumber: accountNumber,
    description: description,
    normalSide: normalSide,
    accountCategory: accountCategory,
    accountSubcategory:  accountSubcategory,
    normalSide: normalSide,
    initialBalance: initialBalance,
    accountOrder: accountOrder,
    comment: comment,
      owner: auth.getAuth,
  });
  console.log('Sent via CreateUser');
  return user;
};

/**
 * @param {account[]} accountArr 
 * @returns {Promise[]} list of promises 
 */
const addAccounts = async (accountArr) => {
  let promises = [];
  for(var i =  0; i < accountArr.length; i++){
    let accountName = accountArr[i].accountName;
    console.log(accountName);
    let promise = addAccount(AccountArr[i], accountName);
    if(!promise) {
      console.debug('couldn\'t add the account');
      return Promise.reject();
    } else {
      promises.push(promise);
    }
  }
  await Promise.all(promises);
  console.log("You did it");
};

function createNewAccount(){
  const accountName = document.getElementById("accountName").value;
  const accountNumber = document.getElementById("accountNumber").value;
  const description = document.getElementById("description").value;
  const normalSide = document.getElementById("normalSide").value;
  const accountCategory = document.getElementById("accountCategory").value;
  const accountSubcategory = document.getElementById("accountSubcategory").value;
  const initialBalance = document.getElementById("initialBalance").value;
  const accountOrder = document.getElementById("accountOrder").value;
  const comment = document.getElementById("comment").value;
  
  if(validate_email(email) || validate_password(password)){
    addAccounts(createNewAccount(accountName, accountNumber, description, normalSide, accountCategory,accountSubcategory,normalSide,initialBalance,accountOrder, comment));
  }

}

const form2 = document.getElementById("form-createAccount");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  try{
    console.log('tesing something');
    createNewAccount();
  }catch (error){
    console.error(error);
  }
  redirect("")
});