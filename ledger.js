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


const urlParams = new URLSearchParams(window.location.search);
const accountId = urlParams.get('accountId');
console.log(accountId);

const accRef = query(doc(db, "accounts"), where ("accountNumber", "==", accountId));

const accountName = accRef.accountName;
//Create Entry button - links to create journal 
const createEntryButton = document.getElementById("createEntry");

// createEntryButton.addEventListener('click', (e) =>{
//     e.preventDefault();
//     try{

//     }catch(error){
//         console.error(error);
//     }
// })

//Populate ledger data on page
const ledgerDataTable = document.getElementById(ledgerDataTableBody);
const q = query(collection(db, "journals"), where ("accountId", "==", accountId));
const querySnapshot = await getDocs(q);

querySnapshot.forEach((doc) => {
    const data = doc.data();
    const newRow = document.createElement("tr");

    const idCell = document.createElement("td");
    idCell.textContext = data.id;
    const dateCreatedCell = document.createElement("td");
    dateCreatedCell.textContent = data.dateCreated;
    const descCell = document.createElement("td");
    descCell.textContent = data.description;
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
    const postReferenceCell = document.createElement("td");
    postReferenceCell.innerHTML = `<a href="#" class="open-journal">${data.name}</a>`;

    newRow.appendChild(idCell);
    newRow.appendChild(dateCreatedCell);
    newRow.appendChild(descCell);
    newRow.appendChild(debitCell);
    newRow.appendChild(creditCell);
    newRow.appendChild(balanceCell);
    newRow.appendChild(postReferenceCell);

    ledgerDataTable.appendChild(newRow);
    });




