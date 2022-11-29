import React from "react";
import {
  signInWithGooglePopup,
  creatUserDocumentFromAuth,
} from "../../uti/firebase/firebase.utils";

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
    </div>
  );
};

export default SignIn;
