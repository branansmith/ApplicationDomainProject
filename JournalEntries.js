import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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
  const db = getFirestore(app);


 




var addDebitButton = document.getElementById('add-debit-button');
var debitEntry = document.getElementById('debit-form');

var addCreditButton = document.getElementById('add-credit-button');
var creditEntry = document.getElementById('credit-form');

var journalEntryForm = document.getElementById('journal-entry-modal');

var createNewJournalEntryButton = document.getElementById('create-new-je-button');

var resetButton = document.getElementById('reset-button');

var debitAccountDropdown = document.getElementById('debit-account-dropdown');

var arrayOfAccounts = [];

const querySnapshot = await getDocs(collection(db, "accounts"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  arrayOfAccounts.push(doc.id);
});

var creditAccountLabel = document.getElementById('credit-account-label');

const formGroup2 = document.createElement("div");
formGroup2.classList.add('form-group');
const dropdownCreditAccounts = document.createElement('select');
const creditLabel = document.createElement('label');
creditLabel.classList.add('input-group-text');
dropdownCreditAccounts.classList.add('custom-select');

for(let i = 0; i < arrayOfAccounts.length; i++) {
var options = document.createElement('option');

options.innerHTML = arrayOfAccounts[i];

dropdownCreditAccounts.appendChild(options);

}


formGroup2.appendChild(dropdownCreditAccounts);

   creditAccountLabel.appendChild(formGroup2);

var debitAccountLabel = document.getElementById('debit-account-label');

const formGroup = document.createElement("div");
formGroup.classList.add('form-group');
const dropdownDebitAccounts = document.createElement('select');
const debitLabel = document.createElement('label');
debitLabel.classList.add('input-group-text');
dropdownDebitAccounts.classList.add('custom-select');

for(let i = 0; i < arrayOfAccounts.length; i++) {
var options = document.createElement('option');

options.innerHTML = arrayOfAccounts[i];

dropdownDebitAccounts.appendChild(options);

}


formGroup.appendChild(dropdownDebitAccounts);

   debitAccountLabel.appendChild(formGroup);




//add another debit to form
addDebitButton.addEventListener("click", (e) => {
    //Date
    const formBreak = document.createElement('br');
    const dateForm = document.createElement("div");
dateForm.classList.add('form-group');
const newDate = document.createElement("input");
newDate.classList.add('form-control');
newDate.type = "date";
dateForm.appendChild(newDate);
debitEntry.appendChild(formBreak);
   debitEntry.appendChild(dateForm);



    //Debit Account Title
    const formGroup = document.createElement("div");
formGroup.classList.add('form-group');
const dropdownDebitAccounts = document.createElement('select');
const debitLabel = document.createElement('label');
debitLabel.classList.add('input-group-text');
debitLabel.innerHTML = "Debit Account";
dropdownDebitAccounts.classList.add('custom-select');

for(let i = 0; i < arrayOfAccounts.length; i++) {
var options = document.createElement('option');

options.innerHTML = arrayOfAccounts[i];

dropdownDebitAccounts.appendChild(options);

}
formGroup.appendChild(debitLabel);
formGroup.appendChild(formBreak);
formGroup.appendChild(dropdownDebitAccounts);
   debitEntry.appendChild(formGroup);


   //Debit
   const formGroup2 = document.createElement("div");
   formGroup.classList.add('form-group');
   const newDebitEntry = document.createElement('input');
   newDebitEntry.classList.add('form-control');
   newDebitEntry.placeholder = "Amount";
   formGroup2.appendChild(newDebitEntry);
   debitEntry.appendChild(formGroup2);
})

addCreditButton.addEventListener("click", (e) => {
    //Date
    const formBreak = document.createElement('br');
    const dateForm = document.createElement("div");
dateForm.classList.add('form-group');
const newDate = document.createElement("input");
newDate.classList.add('form-control');
newDate.type = "date";
dateForm.appendChild(newDate);
creditEntry.appendChild(formBreak);
   creditEntry.appendChild(dateForm);



    //Credit Account Title
    const formGroup = document.createElement("div");
formGroup.classList.add('form-group');
const dropdownDebitAccounts = document.createElement('select');
const debitLabel = document.createElement('label');
debitLabel.classList.add('input-group-text');
debitLabel.innerHTML = "Credit Account";
dropdownDebitAccounts.classList.add('custom-select');

for(let i = 0; i < arrayOfAccounts.length; i++) {
var options = document.createElement('option');

options.innerHTML = arrayOfAccounts[i];

dropdownDebitAccounts.appendChild(options);

}
formGroup.appendChild(debitLabel);
formGroup.appendChild(formBreak);
formGroup.appendChild(dropdownDebitAccounts);
   creditEntry.appendChild(formGroup);

   //Debit
   const formGroup2 = document.createElement("div");
   formGroup.classList.add('form-group');
   const newDebitEntry = document.createElement('input');
   newDebitEntry.classList.add('form-control');
   newDebitEntry.placeholder = "Amount";
   formGroup2.appendChild(newDebitEntry);
   creditEntry.appendChild(formGroup2);
})




createNewJournalEntryButton.addEventListener("click", (e) => {
    var creditDateEntry = document.getElementById('credit-date-entry').value;
var creditAccountEntry = document.getElementById('credit-account-entry').value;
var creditAmount = document.getElementById('credit-amount').value;

var debitDateEntry = document.getElementById('debit-date-entry').value;
var debitAccountEntry = document.getElementById('debit-account-entry').value;
var debitAmount = document.getElementById('debit-amount').value;
    alert(debitAmount);
})


var totalCredit = 0;
var totalDebit = 0;


