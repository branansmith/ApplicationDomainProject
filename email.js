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

  
// Example function to send a message
function sendMessage(sender, recipient, message) {
    database.ref('messages').push({
      sender: sender,
      recipient: recipient,
      message: message,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
  }
  
  // Example function to receive messages
  function listenForMessages(userId) {
    database.ref('messages').orderByChild('recipient').equalTo(userId).on('child_added', (snapshot) => {
      const message = snapshot.val();
      // Process the received message
    });
  }
  // Example function to get all messages for a user
function getInboxMessages(userId) {
    database.ref('messages').orderByChild('recipient').equalTo(userId).on('value', (snapshot) => {
      const messages = snapshot.val();
      // Process the inbox messages
    });
  }
  
  // Example function to get all sent messages for a user
  function getSentMessages(userId) {
    database.ref('messages').orderByChild('sender').equalTo(userId).on('value', (snapshot) => {
      const messages = snapshot.val();
      // Process the sent messages
    });
  }
  