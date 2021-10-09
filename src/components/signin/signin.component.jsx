import React from "react";
import Button from "../button/Button";
import FormInput from "../Forminput/forminput.component";
import "./signin.scss";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import { auth, provider } from "../../database/firebase";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(
        auth,
        this.state.email,
        this.state.password
      ).then((userCredentials) => {
        const user = userCredentials.user;
        console.log(user);
      });
    } catch (error) {
      alert(error.message);
    }

    this.setState({ email: "", password: "" });
  };

  signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider).then((userCredentials) => {
        const credentials =
          GoogleAuthProvider.credentialFromResult(userCredentials);
        const token = credentials.accessToken;
        const user = userCredentials.user;

        console.log(user);
        console.log(token);
      });
    } catch (error) {
      alert(error.message);
    }
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="Email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />

          <Button onClick={this.handleSubmit}>Signin</Button>
        </form>
        <Button onClick={this.signInWithGoogle}>Sign In with Google</Button>
      </div>
    );
  }
}
export default SignIn;
