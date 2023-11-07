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


//Add account to firestore
const addAccount = async (account, accountName) => {
    const accRef = await setDoc(doc(db, 'accounts', accountName), account);
    console.log('Sent');
}

const accountsCollection = collection(db, "accounts");

const dataTable = document.getElementById("dataTableBody");
const table = document.getElementById("dataTable");

const headers = Array.from(table.querySelectorAll('th'));

//Filter feature
table.querySelectorAll('th').forEach(header => {
  header.addEventListener('click', () => {
    const column = headers.indexOf(header);
    const colOrder = header.getAttribute('data-sort');

    const rows = Array.from(dataTable.rows);
    rows.sort((a, b) => {
      const aCell = a.cells[column];
      const bCell = b.cells[column];
      

      if (aCell === undefined || bCell === undefined) {
        console.log("Cells undefined");
        return 0; // You can decide how to handle this case, e.g., by returning 0
      }

      const aValue = aCell.textContent;
      const bValue = bCell.textContent;
      console.log(aValue);
      console.log(bValue);

      if (colOrder === 'text'){
        return aValue.localeCompare(bValue);
      }else if (colOrder === 'numeric') {
        return parseFloat(aValue) - parseFloat(bValue);
      }
    });

    while(dataTable.firstChild){
      dataTable.removeChild(dataTable.firstChild);
    }

    rows.forEach(row => {
      dataTable.appendChild(row);
    });

  });
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

    newRow.appendChild(accountNumberCell);
    newRow.appendChild(accountNameCell);
    newRow.appendChild(accountDescCell);
    newRow.appendChild(normalSideCell);
    newRow.appendChild(accountCategoryCell);
    newRow.appendChild(accountSubCategoryCell);
    newRow.appendChild(initialBalanceCell);
    newRow.appendChild(debitCell);
    newRow.appendChild(creditCell);
    newRow.appendChild(balanceCell);
    newRow.appendChild(dateCreatedCell);
    newRow.appendChild(userIdCell);
    newRow.appendChild(orderCell);
    newRow.appendChild(statementCell);
    newRow.appendChild(commentsCell);
    newRow.appendChild(editCell);

    dataTable.appendChild(newRow);
});

  
//Click listener for Editing accounts

//Douplicate Check for account numbers
  async function accountNumberDouplicateCheck(accountNumber){
    try {

    const querySnapshot = await accountsCollection.where('accountNumber', '==', accountNumber).get();

    if(!querySnapshot.empty) {
      return true;
    } else return false;
  }catch(error) {
    console.error('Douplicate Account Number');
  }

  }


//create user object to store user data
const createNewAccount = (accountName, accountNumber, description, normalSide, accountCategory, accountSubcategory, initialBalance, debit, credit, balance, statement, order, comment, a) => {
  var account = [];
  var currentDate = new Date();
  var date = currentDate.toLocaleDateString();
  var time = currentDate.toLocaleTimeString();

  if(initialBalance == null){
    initialBalance = 0;
  }
  if(debit == null){
    debit = 0;
  }
  if(credit == null){
    credit = 0;
  }
  if(balance == null){
    balance = 0;
  }


  account.push({
    accountName: accountName, 
    accountNumber: accountNumber,
    description: description,
    normalSide: normalSide,
    accountCategory: accountCategory,
    accountSubcategory:  accountSubcategory,
    normalSide: normalSide,
    initialBalance: initialBalance,
    debit: debit,
    credit: credit,
    balance: balance,
    creationDate: date + " " + time,
    statement: statement,
    accountOrder: order,
    comment: comment,
    owner: a.email
  });
  console.log('Sent via CreateNewAccount');
  return account;
}

/**
 * @param {account[]} accountArr 
 * @returns {Promise[]} list of promises 
 */
const addAccounts = async (accountArr) => {
  let promises = [];
  for(var i =  0; i < accountArr.length; i++){
    let accountName = accountArr[i].accountName;
    console.log(accountName);
    let promise = addAccount(accountArr[i], accountName);
    if(!promise) {
      console.debug('couldn\'t add the account');
      return Promise.reject();
    } else {
      promises.push(promise);
    }
  }
  await Promise.all(promises);
  console.log("You did it");
};

function createNewAccountButton(){
  const name = document.getElementById("accountName").value;
  const number = document.getElementById("accountNumber").value;
  const desc = document.getElementById("description").value;
  const nSide = document.getElementById("normalSide").value;
  const catagory = document.getElementById("accountCategory").value;
  const subcategory = document.getElementById("accountSubcategory").value;
  const initialBalance = document.getElementById("initialBalance").value;
  const debit = document.getElementById("debit").value;
  const credit = document.getElementById("credit").value;
  const balance = document.getElementById("balance").value;
  const order = document.getElementById("accountOrder").value;
  const statement = document.getElementById("statement").value;
  const comment = document.getElementById("comment").value;
  const a = auth.currentUser;
  if(a != null){
    addAccounts(createNewAccount(name, number, desc, nSide, catagory, subcategory, initialBalance, debit, credit, balance, statement, order, comment, a));
  }else 
    console.log("User not logged in.");

}

const form = document.getElementById("form-createAccount");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  try{
    console.log('tesing something');
    createNewAccountButton();
  }catch (error){
    console.error(error);
  }
});





