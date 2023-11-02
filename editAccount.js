import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, getDocs, doc, QuerySnapshot, query, where} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getAuth, sendPasswordResetEmail, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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
const auth = getAuth(app);
const db = getFirestore(app);


document.addEventListener("DOMContentLoaded", function () {
    const accountLink = document.querySelector(".edit-account-link");

    accountLink.addEventListener("click", (event) => {
        event.preventDefault();
        const accountId = accountLink.textContent;
        console.log(accountId);
        PopulateEditForm(accountId);
    });
});



function PopulateEditForm(AccountNumber){
    
    const editForm = document.getElementById("form-editAccount");
    const cAccountName = document.getElementById("accountNameCurrent");
    cAccountName.textContent = data.accountName;
    const cAccountNumber = document.getElementById("accountNumberCurrent");
    cAccountNumber.textContent = data.accountNumber;
    const cDesc = document.getElementById("descriptionCurrent");
    cDesc.textContent = data.description;
    const cNormalSide = document.getElementById("normalSideCurrent");
    cNormalSide.textContent = data.normalSide;
    const cCategory = document.getElementById("accountCategoryCurrent");
    cCategory.textContent = data.accountCategory;
    const cSubCategory = document.getElementById("accountSubcategoryCurrent");
    cSubCategory.textContent = data.accountSubcategory;
    const cInitialBalance = document.getElementById("initialBalanceCurent");
    cInitialBalance.textContent = data.initialBalance;
    const cDebit = document.getElementById("debitCurrent");
    cDebit.textContent = data.debit;
    const cCredit = document.getElementById("creditCurrent");
    cCredit.textContent = data.credit;
    const cBalance = document.getElementById("balanceCurrent");
    cBalance.textContent = data.balance;
    const cOrder = document.getElementById("accountOrdercurrent");
    cOrder.textContent = data.accountOrder;
    const cStatement = document.getElementById("statementcurrent");
    cStatement.textContent = data.statement;
    const cComment = document.getElementById("commentCurrent");
    cComment.textContent = data.comment;
  
  
  }