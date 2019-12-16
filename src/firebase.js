import firebase from "firebase/app";
import analytics from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const config = {
  apiKey: "AIzaSyC6GcwOsHXfkaQse7k48zTfI6W-SXfFseE",
  authDomain: "funfunpictures.firebaseapp.com",
  databaseURL: "https://funfunpictures.firebaseio.com",
  projectId: "funfunpictures",
  storageBucket: "funfunpictures.appspot.com",
  messagingSenderId: "126599095380",
  appId: "1:126599095380:web:bbb7a28f5434ff1d6a39c1",
  measurementId: "G-RSF5D6FM5E"
};

firebase.initializeApp(config);
analytics.analytics();

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const storage = firebase.storage();

export const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

window.firebase = firebase; //remove later

export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  console.log("user", user);
  const userRef = firestore.doc(`users/${user.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("error creating user", error);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    return firestore.collection("users").doc(uid);
  } catch (error) {
    console.error("error fetching user", error.message);
  }
};

export default firebase;
