import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
    apiKey: "AIzaSyBj2_2ygB8w_DwQR-PDfDPCkuUSDLqleQg",
    authDomain: "app-12cf3.firebaseapp.com",
    projectId: "app-12cf3",
    storageBucket: "app-12cf3.appspot.com",
    messagingSenderId: "941236515263",
    appId: "1:941236515263:web:a91fff30fd76ace651f10a"
};

firebase.initializeApp(firebaseConfig)

export const authentication = firebase.auth();