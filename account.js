import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.0/firebase-app.js";
import { getFirestore, collection, addDoc, setDoc, getDocs, doc, QuerySnapshot, query} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-firestore.js";
import { getAuth, sendPasswordResetEmail, updatePassword, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.5.0/firebase-auth.js";

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
const auth = getAuth();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

//Add user to firestore
const addAccount = async (account, accountName) => {
    const accRef = await setDoc(doc(db, 'accounts', accountName), account);
    console.log('Sent');
}
const dataTable = document.getElementById("dataTableBody");

const q = query(collection(db, "accounts"));
const querySnapshot = await getDocs(q);

// accountRef.get().then((QuerySnapshot) => {
//   QuerySnapshot.forEach((doc ) =>{
  querySnapshot.forEach((doc) => {
    const data = doc.data();
    const newRow = document.createElement("tr");

    const accountNameCell = document.createElement("td");
    accountNameCell.textContent = data.accountName;
    const accountNumberCell = document.createElement("td");
    accountNumberCell.textContent = data.accountNumber;
    const accountDescCell = document.createElement("td");
    accountDescCell.textContent = data.description;
    const accountCategoryCell = document.createElement("td");
    accountCategoryCell.textContent = data.accountCategory;
    const accountSubCategoryCell = document.createElement("td");
    accountSubCategoryCell.textContent = data.accountSubcategory;
    const balanceCell = document.createElement("td");
    balanceCell.textContent = data.initialBalance;
    const commentsCell = document.createElement("td");
    commentsCell.textContent = data.comment;

    newRow.appendChild(accountNameCell);
    newRow.appendChild(accountNumberCell);
    newRow.appendChild(accountDescCell);
    newRow.appendChild(accountCategoryCell);
    newRow.appendChild(accountSubCategoryCell);
    newRow.appendChild(balanceCell);
    newRow.appendChild(commentsCell);

    dataTable.appendChild(newRow);

}).catch((error) =>{
    console.error("Error getting documents: " + error)
  });


//create user object to store user data
const createNewAccount = (accountName, accountNumber, description, normalSide, accountCategory,accountSubcategory, initialBalance, accountOrder, comment, a) => {
  var account = [];


  account.push({
    accountName: accountName, 
    accountNumber: accountNumber,
    description: description,
    accountCategory: accountCategory,
    accountSubcategory:  accountSubcategory,
    normalSide: normalSide,
    initialBalance: initialBalance,
    accountOrder: accountOrder,
    comment: comment,
    owner: a
  });
  console.log('Sent via CreateNewAccount');
  return account;
};

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
  const balance = document.getElementById("initialBalance").value;
  const order = document.getElementById("accountOrder").value;
  const comment = document.getElementById("comment").value;
  const a = auth.currentUser;
  
  if(a != null){
    addAccounts(createNewAccount(name, number, desc, nSide, catagory, subcategory, balance, order, comment, a));
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