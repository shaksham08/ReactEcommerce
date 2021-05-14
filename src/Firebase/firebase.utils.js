import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAOCWPXyPYgX7BgNHWTDKc5n21JupCCNcI",
  authDomain: "crown-backend-48ffb.firebaseapp.com",
  projectId: "crown-backend-48ffb",
  storageBucket: "crown-backend-48ffb.appspot.com",
  messagingSenderId: "854662632051",
  appId: "1:854662632051:web:a2b15474b0d160590a9006",
  measurementId: "G-B7F1259KZV",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
