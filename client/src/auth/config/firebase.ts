import firebase from 'firebase/app';
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCNKgsy6gIQrGGaQH2xgCTwq5jMJzqwAdU",
    authDomain: "battleship-2fc19.firebaseapp.com",
    projectId: "battleship-2fc19",
    storageBucket: "battleship-2fc19.appspot.com",
    messagingSenderId: "115091017921",
    appId: "1:115091017921:web:8d5b8f9cbc91e379d38440",
    measurementId: "G-9VV80PVP2F"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();