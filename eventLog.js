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
    chageIdCell.innerHTML = `<a href="#" class="change-link" onclick="openEditForm()">${data.changeId}</a>`;
    const userCell = document.createElement("td");
    userCell.textContent = data.user;
    const timeStampCell = document.createElement("td");
    timeStampCell.textContent = data.timestamp;

    newRow.appendChild(chageIdCell);
    newRow.appendChild(userCell);
    newRow.appendChild(timeStampCell);
    //console.log(newRow);

    dataTable.appendChild(newRow);
});



  const waitForElement = setInterval(function () {
    const changeToView = document.querySelectorAll(".change-link")
    console.log(changeToView);
    if(changeToView.length > 0 ){
      clearInterval(waitForElement);
      changeToView.forEach(function (change){
        change.addEventListener("click", (event) => {
          event.preventDefault();
          const eventId = event.currentTarget.textContent;
          console.log(eventId);
          populateEventLogData(eventId);
        });
      });
    }

  }, 100 );

const logTableBody = document.getElementById("form-eventChanges-body")

function populateEventLogData(eventId){
  const logDataToView = query(collection(db, 'eventLog'), where("changeId", "==", eventId));
  getDocs(logDataToView)
    .then((querySnapshot) => {
      if(!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();
        console.log("Data from firestore:" + JSON.stringify(data, null, 2));

        const changedBy = document.getElementById("changedBy");
        changedBy.textContent = "Changed By: " + data.user;

        generateNewRow("Account Name: ", data.oldData.accountName, data.newData.accountName);
        generateNewRow("Account Description: ", data.oldData.description, data.newData.description);
        generateNewRow("Account Category: ", data.oldData.accountCategory, data.newData.accountCategory);
        generateNewRow("Account Sub-Category: ", data.oldData.accountSubcategory, data.newData.accountSubcategory);
        generateNewRow("Normal Side : ", data.oldData.normalSide, data.newData.normalSide);
        generateNewRow("Account Iniaital Balance: ", data.oldData.initialBalance, data.newData.initialBalance);
        generateNewRow("Account Balance: ", data.oldData.balance, data.newData.balance);
        generateNewRow("Account Credit: ", data.oldData.credit, data.newData.credit);
        generateNewRow("Account Debit: ", data.oldData.debit, data.newData.debit);
        generateNewRow("Account Order: ", data.oldData.order, data.newData.order);
        generateNewRow("Account Statement: ", data.oldData.statement, data.newData.statement);
        generateNewRow("Account Comments: ", data.oldData.comment, data.newData.comment);


        
      }
    })

}

async function generateNewRow(name, oldData, newData){
  const newRow = document.createElement("tr");
  const labelCell = document.createElement("td");
  const oldDataCell = document.createElement("td");
  const newDataCell = document.createElement("td");

  labelCell.textContent = name;
  oldDataCell.textContent = oldData;
  newDataCell.textContent = newData;

  newRow.appendChild(labelCell);
  newRow.appendChild(oldDataCell);
  newRow.appendChild(newDataCell);

  logTableBody.appendChild(newRow);
}

