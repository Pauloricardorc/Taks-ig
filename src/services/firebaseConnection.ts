import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCr65Gm7a2R0YpnutHY1G0QQD9G0bZWzC4",
  authDomain: "boardapp-24f99.firebaseapp.com",
  projectId: "boardapp-24f99",
  storageBucket: "boardapp-24f99.appspot.com",
  messagingSenderId: "743851808730",
  appId: "1:743851808730:web:eef5956f9bb55aed6852e3",
  measurementId: "G-TTKDVNPTDF"
};

// Initialize Firebase
if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig);
}

export default firebase