import firebase from 'firebase';

var firebaseConfig = {
  apiKey: 'AIzaSyD5ko9MPxMYyOCPl12IM98HxP4aMpZ-snU',
  authDomain: 'vue-notebook-a9d25.firebaseapp.com',
  projectId: 'vue-notebook-a9d25',
  storageBucket: 'vue-notebook-a9d25.appspot.com',
  messagingSenderId: '987423279198',
  appId: '1:987423279198:web:55a16d0320d10304c00ccf',
};
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export default db;
