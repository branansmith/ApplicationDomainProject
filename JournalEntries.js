import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, getDoc, collection, setDoc, doc, getDocs, query, where} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";


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

//modal labels to retrieve data the user types in
var newDebitEntryId = 1;
var dropdownDebitAccountsId = 1;

var newCreditEntryId = 1;

var debits = ["newDebitEntry0"];
var credits = ["newCreditEntry0"];



var addDebitButton = document.getElementById('add-debit-button');
var debitEntry = document.getElementById('debit-form');

var addCreditButton = document.getElementById('add-credit-button');
var creditEntry = document.getElementById('credit-form');


var createNewJournalEntryButton = document.getElementById('create-new-je-button');

var resetButton = document.getElementById('reset-button');


var arrayOfAccounts = [];

const querySnapshot = await getDocs(collection(db, "accounts"));
querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    arrayOfAccounts.push(doc.id);
});



var debitAccountLabel = document.getElementById('debit-account-label');

//dynamically adds a dropdown with the current accounts in database
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

    //Debit Account Title element
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

    //Debit amount element
    const formGroup2 = document.createElement("div");
    formGroup2.classList.add('form-group');
    const newDebitEntry = document.createElement('input');
    newDebitEntry.classList.add('form-control');
    //Keeps track of newly added debit amounts
    newDebitEntry.id = "newDebitEntry" + newDebitEntryId;
    debits.push(newDebitEntry.id);
    newDebitEntryId++;
    newDebitEntry.placeholder = "Amount";
    formGroup2.appendChild(newDebitEntry);
    debitEntry.appendChild(formGroup2);

})

addCreditButton.addEventListener("click", (e) => {
    const formBreak = document.createElement('br');

    //Credit Account Title elememt
    const formGroup = document.createElement("div");
    formGroup.classList.add('form-group');
    const creditLabel = document.createElement('label');
    creditLabel.classList.add('input-group-text');
    creditLabel.innerHTML = "Add New Credit";

    formGroup.appendChild(creditLabel);
    formGroup.appendChild(formBreak);
    creditEntry.appendChild(formGroup);

    //Credit Amount element
    const formGroup2 = document.createElement("div");
    formGroup2.classList.add('form-group');
    const newCreditEntry = document.createElement('input');
    newCreditEntry.classList.add('form-control');
    newCreditEntry.placeholder = "Amount";
    //Keep track of newly added credit amounts
    newCreditEntry.id = "newCreditEntry" + newCreditEntryId;
    credits.push(newCreditEntry.id);
    newCreditEntryId++;
    formGroup2.appendChild(newCreditEntry);
    creditEntry.appendChild(formGroup2);
})
//writes a new journal entry to the Firestore database
async function writeJournalEntry(account, debitDate, debitAmount, creditAmount, description) {
// Add a new document in collection "journals"
await setDoc(doc(db, "journals", account), {
    account: account,
    balance: 0,
    dateCreated: debitDate,
    debit: debitAmount,
    credit: creditAmount,
    description: description,
    id: 1,
    status: "pending"
  });
}


//add error message to end of modal (bottom)
async function getErrorMessage(errorName) {
    const docRef = doc(db, "Error Messages", errorName);
    const docSnap = await getDoc(docRef);
    var errorMessage = document.getElementById('error-message');
    
    if (docSnap.exists()) {
        var docData = docSnap.get("Message");
        errorMessage.textContent = docData;
        
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
}

//can only create journal entries if error messages are cleared
createNewJournalEntryButton.addEventListener("click", (e) => {
    var dropdownAccount = document.getElementById('dropdownAccount').value;
    var debitDate = document.getElementById('newDebitDateId0').value;
    var desc = document.getElementById('newDescriptionDebit0').value;
    var totalCredits = getTotalCredits();
    var totalDebits = getTotalDebits();
    if (desc == null || desc == "") {
        getErrorMessage("InvalidForm");
    } else if(!debitDate) {
        getErrorMessage("InvalidForm");
    }else if(isNaN(totalDebits) || isNaN(totalCredits)) {
        getErrorMessage("NotANumber");
    }
    else if(totalDebits != totalCredits) {
        getErrorMessage("UnequalDebitsAndCredits");
    }  else {
        writeJournalEntry(dropdownAccount, debitDate, totalDebits, totalCredits, desc);
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

//logout user and return to signin screen
const logOutButton = document.getElementById('logout-button');
if (logOutButton) {
    logOutButton.addEventListener("click", (e) => {
        auth.signOut()
        window.location.href = 'index.html';
    })
}




