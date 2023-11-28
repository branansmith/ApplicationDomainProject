import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, getDocs, collection, setDoc, doc } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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


var newDebitDateId = 1;
var newDebitEntryId = 1;
var newDescriptionDebitId = 1;
var dropdownDebitAccountsId = 1;

var newCreditDateId = 1;
var newCreditEntryId = 1;
var newDescriptionCreditId = 1;

var debits = ["newDebitEntry0"];
var credits = ["newCreditEntry0"];
var debitDates = [];
var creditDates = [];
var debitDescriptions = [];
var creditDescriptions = [];




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



var debitAccountLabel = document.getElementById('debit-account-label');

const formGroup = document.createElement("div");
formGroup.classList.add('form-group');
const dropdownDebitAccounts = document.createElement('select');
const debitLabel = document.createElement('label');
debitLabel.classList.add('input-group-text');
dropdownDebitAccounts.classList.add('custom-select');
dropdownDebitAccounts.id = "dropdownAccount";

for (let i = 0; i < arrayOfAccounts.length; i++) {
    var options = document.createElement('option');

    options.innerHTML = arrayOfAccounts[i];

    dropdownDebitAccounts.appendChild(options);

}


formGroup.appendChild(dropdownDebitAccounts);

debitAccountLabel.appendChild(formGroup);




//add another debit to form
addDebitButton.addEventListener("click", (e) => {
    const formBreak = document.createElement('br');

    //Debit Account Title
    const formGroup = document.createElement("div");
    formGroup.classList.add('form-group');
    const dropdownDebitAccounts = document.createElement('select');
    const debitLabel = document.createElement('label');
    debitLabel.classList.add('input-group-text');
    debitLabel.innerHTML = "Add New Debit";
    dropdownDebitAccounts.classList.add('custom-select');
    dropdownDebitAccounts.id = "dropdownDebitAccounts" + dropdownDebitAccountsId;

    for (let i = 0; i < arrayOfAccounts.length; i++) {
        var options = document.createElement('option');

        options.innerHTML = arrayOfAccounts[i];

        dropdownDebitAccounts.appendChild(options);

    }
    formGroup.appendChild(debitLabel);


    debitEntry.appendChild(formGroup);





    //Debit
    const formGroup2 = document.createElement("div");
    formGroup.classList.add('form-group');
    const newDebitEntry = document.createElement('input');
    newDebitEntry.classList.add('form-control');
    //id
    newDebitEntry.id = "newDebitEntry" + newDebitEntryId;
    debits.push(newDebitEntry.id);
    newDebitEntryId++;
    newDebitEntry.placeholder = "Amount";
    formGroup2.appendChild(newDebitEntry);
    debitEntry.appendChild(formGroup2);

})





addCreditButton.addEventListener("click", (e) => {
    const formBreak = document.createElement('br');

    //Credit Account Title
    const formGroup = document.createElement("div");
    formGroup.classList.add('form-group');
    const dropdownCreditAccounts = document.createElement('select');
    const creditLabel = document.createElement('label');
    creditLabel.classList.add('input-group-text');
    creditLabel.innerHTML = "Add New Credit";



    formGroup.appendChild(creditLabel);
    formGroup.appendChild(formBreak);
    creditEntry.appendChild(formGroup);

 





    //Debit
    const formGroup2 = document.createElement("div");
    formGroup.classList.add('form-group');
    const newCreditEntry = document.createElement('input');
    newCreditEntry.classList.add('form-control');
    newCreditEntry.placeholder = "Amount";
    //id
    newCreditEntry.id = "newCreditEntry" + newCreditEntryId;
    credits.push(newCreditEntry.id);
    newCreditEntryId++;
    formGroup2.appendChild(newCreditEntry);
    creditEntry.appendChild(formGroup2);



})









var transactionNumber = "1";

async function writeJournalEntry(account, debitDate, debitAmount, creditAmount, creditDescription, debitDescription) {
// Add a new document in collection "cities"
await setDoc(doc(db, "journals", account), {
    account: account,
    balance: 0,
    dateCreated: debitDate,
    debit: debitAmount,
    credit: creditAmount,
    creditDescription: creditDescription,
    debitDescription: debitDescription,
    id: 1
  });
}


//can only create journal entries if error messages are cleared
//need to get id of credit and debit accounts as well
createNewJournalEntryButton.addEventListener("click", (e) => {
    var totalCredits = getTotalCredits();
    var totalDebits = getTotalDebits();
    if(isNaN(totalDebits) || isNaN(totalCredits)) {
        alert("Please fill out all fields");
    }
    else if(totalDebits != totalCredits) {
        alert("Debits must equal credits");
    } else {
        writeJournalEntry(document.getElementById('dropdownAccount').value, document.getElementById('newDebitDateId0').value, totalDebits, totalCredits, document.getElementById('newDescriptionDebit0').value, document.getElementById('newDescriptionCredit0').value);
    }
})

function getTotalCredits() {
    var totalCredits = 0;
    for (let i = 0; i < credits.length; ++i) {
        let parse = parseInt(document.getElementById(credits[i]).value)
        totalCredits += parse;
    }
    return totalCredits;
}

function getTotalDebits() {
    var totalDebits = 0;
    for (let i = 0; i < debits.length; ++i) {
        let parse = parseInt(document.getElementById(debits[i]).value)
        totalDebits += parse;
    }
    return totalDebits;
}

const logOutButton = document.getElementById('logout-button');
if (logOutButton) {
    logOutButton.addEventListener("click", (e) => {
        auth.signOut()
        window.location.href = 'index.html';
    })
}


