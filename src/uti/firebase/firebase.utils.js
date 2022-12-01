import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";

//firstore

import {
  getFirestore /* instantiate our fore store instance */,
  doc /*doc - allows us to retrieve documents inside of our firestore db/ gets the document instance*/,
  getDoc /* getting the documents data/ so if you want to access the data in the doc us get or set */,
  setDoc /* setting the documents data*/,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDJfazB3hmI_XDO6usHD-mwtVMWNi-cNYg",
  authDomain: "crwn-clothing-db-3b5e7.firebaseapp.com",
  projectId: "crwn-clothing-db-3b5e7",
  storageBucket: "crwn-clothing-db-3b5e7.appspot.com",
  messagingSenderId: "1030924356056",
  appId: "1:1030924356056:web:6955e22110fa3be7b20aad",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//in order to use google auth, we need to initialize a provider
const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//points to the db // Initialize Cloud Firestore and get a reference to the service
//this is a singleton instance
export const db = getFirestore();

/* func- takes some data from auth, and store it inside of firestore*/
export const creatUserDocumentFromAuth = async (
  userAuth,
  additionInformation = {}
) => {
  if (!userAuth) return;

  /* check if there is a existing doc reference- this is a special type of object.
  doc takes a reference to a db, the name of the collection, and the the identifier of doc we are looking for
  To refer to this location in your code, you can create a reference to it.
*/ const userDocRef = doc(db, "users", userAuth.uid); //think of it like this is pointing to some point in db but not created yet

  console.log("this is userDocRef: ", userDocRef);

  //snap is data. checks if an instance exits in db and allows to access the data.
  const userSnapshot = await getDoc(userDocRef);
  console.log("checking if the user exists!: ", userSnapshot.exists());

  //if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists
  return userDocRef;
  //reutrn userDocRef
};

//async cause we are setting data into database

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
