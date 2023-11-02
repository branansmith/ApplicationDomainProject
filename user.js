import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth(app);

const logOutButton = document.getElementById('logout-button');
if(logOutButton) {
logOutButton.addEventListener("click", (e) => {
    auth.signOut()
    window.location.href = 'index.html';
})
}



//onAuthStateChanged(auth, (user) => {
//  if(user) {
//      console.log(user.uid);
//}
//})




async function loadUserData() {
const users = query(collection(db, 'users'));
const querySnapshot = await getDocs(users);
var usersArray = [];
querySnapshot.forEach((doc) => {
  const data = doc.data();
  const name = data.first_name + " " + data.last_name;
  addToTable(data.username, name, data.email, data.role, data.address, data.date_of_birth);
  
})

}

var tbody = document.getElementById('tbody1');
function addToTable(username, name, email, role, address, dob) {
  var trow = document.createElement('tr');
  var td1 = document.createElement('td');
  var td2 = document.createElement('td');
  var td3 = document.createElement('td');
  var td4 = document.createElement('td');
  var td5 = document.createElement('td');
  var td6 = document.createElement('td');
  var tdBtn = document.createElement('button');
  

  td1.innerHTML = username;
  td2.innerHTML = name;
  td3.innerHTML = email;
  td4.innerHTML = role;
  td5.innerHTML = address;
  td6.innerHTML = dob;
  tdBtn.innerHTML = "Edit User";

  trow.appendChild(td1);
  trow.appendChild(td2);
  trow.appendChild(td3);
  trow.appendChild(td4);
  trow.appendChild(td5);
  trow.appendChild(td6);
  trow.appendChild(tdBtn);

  tdBtn.addEventListener("click", (e) => {

    var myTextBox1 = document.createElement("input");
    myTextBox1.value = td1.innerHTML;
    td1.parentNode.replaceChild(myTextBox1, td1);

    var myTextBox2 = document.createElement("input");
    myTextBox2.value = td2.innerHTML;
    td2.parentNode.replaceChild(myTextBox2, td2);
    
  })

  tbody.appendChild(trow);

}

const createNewUserButton = document.getElementById('create-new-user-button');
createNewUserButton.addEventListener("click", (e) => {
  
})

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".btn-open");
const closeModalBtn = document.querySelector(".btn-close");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

openModalBtn.addEventListener("click", openModal);

async function isManager(user) {
  const museums = query(collection(db, 'users'), where('email', '==', user.email), where('role', '==', 'manager'));
const querySnapshot = await getDocs(museums);
if(querySnapshot.size) {
  return true;
} else {
  return false;
}
}

async function isUser(user) {
  const museums = query(collection(db, 'users'), where('email', '==', user.email), where('role', '==', 'user'));
const querySnapshot = await getDocs(museums);
if(querySnapshot.size) {
  return true;
} else {
  return false;
}
}




async function isAdmin(user) {
  const museums = query(collection(db, 'users'), where('email', '==', user.email), where('role', '==', 'admin'));
const querySnapshot = await getDocs(museums);
if(querySnapshot.size) {
  return true;
} else {
  return false;
}
}



onAuthStateChanged(auth, (user) => {
  if (user) {
    if(isUser(user)) {
      console.log("is a user");
    }
    else if(isManager(user)) {
      console.log("is a manager");
    } else if(isAdmin(user)) {
      console.log("is an admin");
    } else {
      console.log("error getting role");
    }
  } else {
    console.log(user, "not logged in");
  }
})

window.onload = loadUserData();

