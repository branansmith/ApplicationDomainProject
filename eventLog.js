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

// Initialize Cloud Firestore and get a reference to the service

//this is pointer to the collection of event logs
const eventLogCollection = collection(db, "eventLog");


const dataTable = document.getElementById("dataTableBody");
const table = document.getElementById("dataTable");

const headers = Array.from(table.querySelectorAll('th'));

//sort filter on click
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

const q = query(collection(db, "accounts"));
const querySnapshot = await getDocs(q);

//Create and display the data from the database
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const newRow = document.createElement("tr");
    const accountNumberCell = document.createElement("td");
    accountNumberCell.innerHTML = `<a href="#" class="edit-account-link" onclick="openledger()">${data.accountNumber}</a>`;
    const accountNameCell = document.createElement("td");
    accountNameCell.textContent = data.accountName;
    const accountDescCell = document.createElement("td");
    accountDescCell.textContent = data.description;
    const normalSideCell = document.createElement("td");
    normalSideCell.textContent = data.normalSide;
    const accountCategoryCell = document.createElement("td");
    accountCategoryCell.textContent = data.accountCategory;
    const accountSubCategoryCell = document.createElement("td");
    accountSubCategoryCell.textContent = data.accountSubcategory;
    const initialBalanceCell = document.createElement("td");
    initialBalanceCell.textContent = Number(data.initialBalance).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const debitCell = document.createElement("td");
    debitCell.textContent = Number(data.debit).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const creditCell = document.createElement("td");
    creditCell.textContent = Number(data.credit).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const balanceCell = document.createElement("td");
    balanceCell.textContent = Number(data.balance).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    const dateCreatedCell = document.createElement("td");
    dateCreatedCell.textContent = data.creationDate;
    const userIdCell = document.createElement("td");
    userIdCell.textContent = data.owner;
    const orderCell = document.createElement("td");
    orderCell.textContent = data.accountOrder;
    const statementCell = document.createElement("td");
    statementCell.textContent = data.statement;
    const commentsCell = document.createElement("td");
    commentsCell.textContent = data.comment;
    const editCell = document.createElement("td");
    editCell.innerHTML = `<a href="#" class="edit-account-link" onclick="openEditForm()">${data.accountNumber}</a>`;

    newRow.appendChild(changeID);
    newRow.appendChild(user);
    newRow.appendChild(changes);
    newRow.appendChild(timeStamp);
    newRow.appendChild(Comments);
    

    dataTable.appendChild(newRow);
});

