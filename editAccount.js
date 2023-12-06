import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, getDocs, doc, QuerySnapshot, query, where, updateDoc, deleteDoc} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
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

async function generateID(){
    try{
        const q = query(collection(db, "eventLog"));
        const querySnapshot = await getDocs(q);

        const add = querySnapshot.size;
        var id = 1000 + add;
        id = id.toString();
        console.log(id);
        return id;

    }catch(error) {
        console.error("Error");
    }
     
}


//Wait for the page to load and populate edit account pop-up
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

//Delete the specified account
//Check that balance is not > 0 before deletion
const deleteButton = document.getElementById("delete-account-button");
deleteButton.addEventListener("click", function (event) {
    event.preventDefault();
    const a = auth.currentUser;
       if (a!=null){
        if(oldData.balance <= 0){
                console.log(oldData.balance);
                deleteFirestoreDocument(oldData.accountName);
        }else 
        console.log("Balance is greater than zero");
        }else 
        console.log("User not signed in");
       });



//Event listener for Update Account button
//Recognizes when an account has been updated and posts to the event log
const saveButton = document.getElementById("update-account-button");
saveButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const a = auth.currentUser;
    const user = a.email;

    try{
        const eventId = await generateID();

        const newAccountName = document.getElementById("accountNameCurrent").value;
        const newData = getNewData();
        updateFirestoreDocument(newAccountName, newData);
        
        const newEvent = addAccountEvent(oldData, newData, user, eventId);
        addEvent(newEvent, eventId);
    }catch(error) {
        console.error("nope.");
    }

        

});

//Add event to event log data storage
const addEvent = async (entry, id) => {
    console.log(id);
    const eventRef = await setDoc(doc(db, 'eventLog', id), entry);
    console.log('Sent to event Log');
}

//Create the object that stores the new and old data
function addAccountEvent(oldData, newData, user, id){
    var currentDate = new Date();
    var date = currentDate.toLocaleDateString();
    var time = currentDate.toLocaleTimeString();
    const newEntry = {
        changeId: id,
        oldData: oldData,
        newData: newData,
        user: user,
        timestamp: date + " " + time
    }
    return newEntry;
}

//Store the new data in an object
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


//Populate the edit pop-up with the data related to the specified account
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

//Update the firestore accounts collection with the new data
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


//Remove the speified account from the database
function deleteFirestoreDocument(docName){
    const docRef = doc(db, "accounts", docName);
        deleteDoc(docRef)
            .then(() => {
                console.log(docName + " Deleted");
            })
            .catch((error) => {
                console.error("Error deleting document: " + docName);
            });
    }




  