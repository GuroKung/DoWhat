import * as firebase from 'firebase';

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDSK5WPzBn1heWf1uqjFRCEjeOOMmXAEDI",
  authDomain: "do-what-d2ecc.firebaseapp.com",
  databaseURL: "https://do-what-d2ecc.firebaseio.com",
  projectId: "do-what-d2ecc",
  storageBucket: "do-what-d2ecc.appspot.com",
  messagingSenderId: "85794173339"
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

export default firebaseApp;