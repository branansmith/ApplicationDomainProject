import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import getAuth from 'firebase/auth';


const config = {
    apiKey: "AIzaSyAgjtR6Bh6eeLrcriQXAqyR6UYKNtn7RQ8",
    authDomain: "test-project-bf189.firebaseapp.com",
    projectId: "test-project-bf189",
    storageBucket: "test-project-bf189.appspot.com",
    messagingSenderId: "77549761669",
    appId: "1:77549761669:web:160e61463978ba1e3f65ec",
    measurementId: "G-S94ZDL330Q"
  };

  const firebaseApp = firebase.initializeApp(config);
  const database = firebase.getDatabase(firebaseApp);

