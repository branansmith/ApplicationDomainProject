import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";
import { getFirestore, getDocs, collection, setDoc, doc, query, where} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

//Initialize Firebase
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

const tableBody = document.getElementById("journalBody");

const urlParams = new URLSearchParams(window.location.search);
const accountId = urlParams.get('accountId');
console.log(accountId);
const id = "accountId";


//Display Journal entry
// Query the 'journals' collection for all journal entries and dynamically display
const q = query(collection(db, "journals"));

getDocs(q)
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const data = doc.data();
                const newRow = document.createElement("tr");
                const dateCell = document.createElement("td");
                dateCell.textContent = data.dateCreated || "N/A";
                const accountCell = document.createElement("td");
                accountCell.textContent = data.account || "N/A";
                const debitCell = document.createElement("td");
                debitCell.textContent = data.debit || "N/A";
                const creditCell = document.createElement("td");
                creditCell.textContent = data.credit || "N/A";
                const statusCell = document.createElement("td");
                statusCell.textContent = data.status || "N/A";

                newRow.appendChild(dateCell);
                newRow.appendChild(accountCell);
                newRow.appendChild(debitCell);
                newRow.appendChild(creditCell);
                newRow.appendChild(statusCell);

                tableBody.appendChild(newRow);
        });
    })
    .catch((error) => {
        console.error('Error getting documents:', error);
    });

