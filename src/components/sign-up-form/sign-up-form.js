import React from "react";
import { useState } from "react";
import FormInput from "../form-input/form-input";
import Button from "../button/button";
import {
  createAuthUserWithEmailAndPassword,
  creatUserDocumentFromAuth,
} from "../../uti/firebase/firebase.utils";
import "./sign-up-form.styles.scss";
//object used to hold the data from form
const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const SignUpForm = () => {
  //pass the object as default useState so now formField is defaultFormFields
  const [formFields, setFormFields] = useState(defaultFormFields);
  //deStrusct formFields
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("password do not match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log("this is user::", user);
      await creatUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("cannot cretae user, email already in use");
      } else {
        console.log("user creation encounteded an error: ", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    /* Whenever you have to use a var value as a key in Object, you have to use it in []*/
    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Display Name"
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />

        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />

        <FormInput
          label="Confirm Password"
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;
