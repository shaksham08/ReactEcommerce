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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

export const convertCollectionsSnapshopToMaps = (collections) => {
  const transformedCollections = collections.docs.map((doc) => {
    const { items, title } = doc.data();
    return {
      title,
      items,
      id: doc.id,
      routeName: encodeURI(title.toLowerCase()),
    };
  });

  return transformedCollections.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export const addCollectionsAndDocuments = async (
  collectionKey,
  ObjectToAdd
) => {
  const collectionRef = firestore.collection(collectionKey);
  const batch = firestore.batch();
  ObjectToAdd.forEach((obj) => {
    const docRef = collectionRef.doc(); //automatically generate unique id
    batch.set(docRef, obj);
  });
  return await batch.commit();
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
