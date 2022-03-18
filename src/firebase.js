import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCDTazF6gwXForicdkEjDLB91mOnZndTSA",
    authDomain: "intern-project-8ae08.firebaseapp.com",
    projectId: "intern-project-8ae08",
    storageBucket: "intern-project-8ae08.appspot.com",
    messagingSenderId: "124932501820",
    appId: "1:124932501820:web:45201e99173fdd665e2e39"
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };

