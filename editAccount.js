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

    //wait for element to be created
    const waitForElement = setInterval(function () {
        const accountLinks = document.querySelectorAll(".edit-account-link");
        console.log(accountLinks);
        if(accountLinks.length > 0) {
            clearInterval(waitForElement);
            accountLinks.forEach(function (accountLink) {
                accountLink.addEventListener("click", (event) => {
                event.preventDefault();
                const accountId = event.currentTarget.textContent;
                console.log(accountId);
                PopulateEditForm(accountId);
                });
            });
        }
    }, 100);
});



function PopulateEditForm(accountNumber){
    
    const q = query(collection(db, "accounts"), where("accountNumber", "==", accountNumber));
    getDocs(q)
        .then((querySnapshot) => {
            if(!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data = doc.data();
                console.log("Data from firestore:" + JSON.stringify(data, null, 2));

                const cAccountName = document.getElementById("accountNameCurrent");
                cAccountName.value = data.accountName;
                const cAccountNumber = document.getElementById("accountNumberCurrent");
                cAccountNumber.value = data.accountNumber;
                const cDesc = document.getElementById("descriptionCurrent");
                cDesc.value = data.description;
                const cNormalSide = document.getElementById("normalSideCurrent");
                cNormalSide.value = data.normalSide;
                const cCategory = document.getElementById("accountCategoryCurrent");
                cCategory.value = data.accountCategory;
                const cSubCategory = document.getElementById("accountSubcategoryCurrent");
                cSubCategory.value = data.accountSubcategory;
                const cInitialBalance = document.getElementById("initialBalanceCurent");
                cInitialBalance.value = data.initialBalance;
                const cDebit = document.getElementById("debitCurrent");
                cDebit.value = data.debit;
                const cCredit = document.getElementById("creditCurrent");
                cCredit.value = data.credit;
                const cBalance = document.getElementById("balanceCurrent");
                cBalance.value = data.balance;
                const cOrder = document.getElementById("accountOrdercurrent");
                cOrder.value = data.accountOrder;
                const cStatement = document.getElementById("statementcurrent");
                cStatement.value = data.statement;
                const cComment = document.getElementById("commentCurrent");
                cComment.value = data.comment;
            }
        });
  }