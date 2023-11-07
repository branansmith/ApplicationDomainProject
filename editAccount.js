import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, getDocs, doc, QuerySnapshot, query, where, updateDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
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
var id;
var oldData;



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
                id = accountId;
                console.log(id);
                });
            });
        }
    }, 100);
});

const saveButton = document.getElementById("update-account-button");
saveButton.addEventListener("click", function (event) {

    const a = auth.currentUser;
    const user = a.email;
    event.preventDefault();
    // console.log("click");
    const newAccountName = document.getElementById("accountNameCurrent").value;
    const newData = getNewData();
    const updateName = "Account Update: ";
    const name = updateName.toString();
    oldData.accountName
    console.log(name);
        updateFirestoreDocument(newAccountName, newData);
    const newEvent = addAccountEvent(oldData, newData, user);
        addEvent(newEvent, user);
});

const addEvent = async (entry, name) => {
    const eventRef = await setDoc(doc(db, 'eventLog', name), entry);
    console.log('Sent to event Log');
}

function addAccountEvent(oldData, newData, user){
    var currentDate = new Date();
    var date = currentDate.toLocaleDateString();
    var time = currentDate.toLocaleTimeString();

    const newEntry = {
        oldData: oldData,
        newData: newData,
        user: user,
        timestamp: date + " " + time
    }
    return newEntry;
}

function getNewData(){
    const newAccountName = document.getElementById("accountNameCurrent").value;
    const newAccountDesc = document.getElementById("descriptionCurrent").value;
    const newNormalSide = document.getElementById("normalSideCurrent").value;
    const newCategory = document.getElementById("accountCategoryCurrent").value;
    const newSubCategory = document.getElementById("accountSubcategoryCurrent").value;
    const newInitialBalance = document.getElementById("initialBalanceCurent").value;
    const newDebit = document.getElementById("debitCurrent").value;
    const newCredit = document.getElementById("creditCurrent").value;
    const newBalance = document.getElementById("balanceCurrent").value;
    const newOrder = document.getElementById("accountOrdercurrent").value;
    const newStatment = document.getElementById("statementcurrent").value;
    const newComment = document.getElementById("commentCurrent").value;

    const newData = {
        accountName: newAccountName,
        description: newAccountDesc,
        normalSide: newNormalSide,
        accountCategory: newCategory,
        accountSubcategory: newSubCategory,
        initialBalance: newInitialBalance,
        debit: newDebit,
        credit: newCredit,
        balance: newBalance,
        order: newOrder,
        statement: newStatment,
        comment: newComment
    };
    return newData;
}



function PopulateEditForm(accountNumber){
    const accountToEdit = query(collection(db, "accounts"), where("accountNumber", "==", accountNumber));
    getDocs(accountToEdit)
        .then((querySnapshot) => {
            if(!querySnapshot.empty) {
                const doc = querySnapshot.docs[0];
                const data = doc.data();
                console.log("Data from firestore:" + JSON.stringify(data, null, 2));
                oldData = data;

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


  function updateFirestoreDocument(docName, newData){
    const docRef = doc(db, "accounts", docName);
        updateDoc(docRef, newData)
            .then(() => {
                console.log("Document Saved Successfully.");
            })
            .catch((error) => {
                console.error("Error updating document.");
            });
}  



  