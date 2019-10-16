import * as firebase from 'firebase';

// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="https://www.gstatic.com/firebasejs/7.2.0/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#available-libraries -->
// <script src="https://www.gstatic.com/firebasejs/7.2.0/firebase-analytics.js"></script>

// <script>
//   // Your web app's Firebase configuration

  var firebaseConfig = {
    apiKey: "AIzaSyBzcmNlBeWRbBXUsTKx-rutL0huEE-WoWQ",
    authDomain: "baseball-game-predictor.firebaseapp.com",
    databaseURL: "https://baseball-game-predictor.firebaseio.com",
    projectId: "baseball-game-predictor",
    storageBucket: "baseball-game-predictor.appspot.com",
    messagingSenderId: "567971916278",
    appId: "1:567971916278:web:6ab6bb0bf981b7a10dbfd7",
    measurementId: "G-EZRXDM3DST"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  
// </script>