import React from "react";
import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopup,
  creatUserDocumentFromAuth,
  signInWithGoogleRedirect,
} from "../../uti/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form";

const SignIn = () => {
  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    const userDocRef = await creatUserDocumentFromAuth(user);
    console.log(user);
  };

  return (
    <div>
      <div>sign-in</div>
      <button onClick={logGoogleUser}>Sign in with google popup</button>
      <SignUpForm />
    </div>
  );
};

export default SignIn;
