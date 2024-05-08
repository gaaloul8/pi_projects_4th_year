importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.7.0/firebase-messaging.js');
firebase.initializeApp({
    apiKey: "AIzaSyCSl6sAMnxMpozEolm-JbR5Zxs8Emkdf18",
    authDomain: "notifangular.firebaseapp.com",
    projectId: "notifangular",
    storageBucket: "notifangular.appspot.com",
    messagingSenderId: "158120982613",
    appId: "1:158120982613:web:cf0bc51d5576b4970c3cdc",
    measurementId: "G-1S0N54ZVTS"
});
const messaging = firebase.messaging();