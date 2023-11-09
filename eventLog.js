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
// const eventLogCollection = collection(db, "eventLog");


const dataTable = document.getElementById("dataTableBody");
//const table = document.getElementById("dataTable");

const qELog = query(collection(db, "eventLog"));
const querySnapshot = await getDocs(qELog);

//Create and display the data from the database
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const newRow = document.createElement("tr");


    const chageIdCell = document.createElement("td");
    chageIdCell.innerHTML = `<a href="#" class="edit-account-link" onclick="openEditForm()">${data.changeId}</a>`;
    const userCell = document.createElement("td");
    userCell.textContent = data.user;
    const timeStampCell = document.createElement("td");
    timeStampCell.textContent = data.timestamp;
    const editCell = document.createElement("td");
    editCell.innerHTML = `<a href="#" class="edit-account-link" onclick="openEditForm()">${data.accountNumber}</a>`;

    newRow.appendChild(chageIdCell);
    newRow.appendChild(userCell);
    newRow.appendChild(timeStampCell);
    //console.log(newRow);

    dataTable.appendChild(newRow);
});

