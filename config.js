import  firebase from 'firebase'
require('@firebase/firestore')

  var firebaseConfig = {
    apiKey: "AIzaSyBOE9PgR-9lniJRkL-wfNN_7E0U9qfWQGQ",
    authDomain: "wily-4177d.firebaseapp.com",
    databaseURL: "https://wily-4177d.firebaseio.com",
    projectId: "wily-4177d",
    storageBucket: "wily-4177d.appspot.com",
    messagingSenderId: "620074356716",
    appId: "1:620074356716:web:8734909d69f226be813ac9"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();
