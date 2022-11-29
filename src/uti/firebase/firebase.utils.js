import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";

//firstore
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
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
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//points to the db // Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore();

export const creatUserDocumentFromAuth = async (userAuth) => {
  //check if there is a existing doc ref
  const userDocRef = doc(db, "users", userAuth.uid);

  console.log(userDocRef);

  //snap is data. checks if an instance exits in db and allows to access the data.
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists());

  //if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }

  //if user data exists
  return userDocRef;
  //reutrn userDocRef
};
