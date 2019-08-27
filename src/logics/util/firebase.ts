import * as firebase from 'firebase/app';
import "firebase/firestore";


const firebaseConfig = {
    apiKey: "AIzaSyBrji3Fa1wF4WPQDC0idoXTtD88JVg_5t8",
    authDomain: "magicsquare-cb1cf.firebaseapp.com",
    databaseURL: "https://magicsquare-cb1cf.firebaseio.com",
    projectId: "magicsquare-cb1cf",
    storageBucket: "",
    messagingSenderId: "86021422730",
    appId: "1:86021422730:web:f2b6a3e8fe162731"
};

firebase.initializeApp(firebaseConfig);

export const fireStore = firebase.firestore();