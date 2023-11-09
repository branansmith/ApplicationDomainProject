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

const qELog = query(collection(db, "eventLog"));
const querySnapshot = await getDocs(qELog);

//Create and display the data from the database
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const newRow = document.createElement("tr");


    const chageIdCell = document.createElement("td");
    chageIdCell.innerHTML = `<a href="#" class="edit-account-link" onclick="openledger()">${data.ChangeID}</a>`;
    const userCell = document.createElement("td");
    userCell.textContent = data.user;
    const changesMadeCell = document.createElement("td");
    changesMadeCell.textContent = data.changes;
    const timeStampCell = document.createElement("td");
    timeStampCell.textContent = data.timeStamp;
    const commentsCell = document.createElement("td");
    commentsCell.textContent = data.comments;
    newRow.appendChild(changeID);
    newRow.appendChild(user);
    newRow.appendChild(changes);
    newRow.appendChild(timeStamp);
    newRow.appendChild(Comments);
    

    dataTable.appendChild(newRow);
});

