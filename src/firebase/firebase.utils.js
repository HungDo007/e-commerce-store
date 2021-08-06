import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAPIcTZVGtr8Gc7fKeYsV9nBJW6_bFGtuQ",
  authDomain: "e-commerce-shop-f29f3.firebaseapp.com",
  projectId: "e-commerce-shop-f29f3",
  storageBucket: "e-commerce-shop-f29f3.appspot.com",
  messagingSenderId: "989866253801",
  appId: "1:989866253801:web:4e274363fb6e75010c3f78",
  measurementId: "G-C5F0T2K8EM",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
