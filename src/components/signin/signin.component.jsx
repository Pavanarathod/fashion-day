import React from "react";
import Button from "../button/Button";
import FormInput from "../Forminput/forminput.component";
import "./signin.scss";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ email: "", password: "" });
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
      </div>
    );
  }
}
export default SignIn;
