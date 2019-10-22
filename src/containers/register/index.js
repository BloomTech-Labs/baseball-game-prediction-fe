// Render Prop
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import {
  register,
  clearErrors,
  passwordMismatch
} from "../../Redux/actions/index";
import { Link } from "react-router-dom";
import "../formstyle/index.css";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      username: "",
      password: "",
      confirm: ""
    };
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange = e => this.setState({ value: e.target.value });

  handlePasswordMismatch = () => {
    this.props.passwordMismatch();
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.clearErrors();
    if (this.state.password === this.state.confirm) {
      const user = {
        username: this.state.username,
        password: this.state.password
      };
      this.props.register(user);
    } else {
      // this.props.clearErrors()
      this.handlePasswordMismatch();
    }
  };

  render(props) {
    return (
      <div className="RegisterForm">
        <Form onSubmit={e => this.handleSubmit(e)}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="User E-mail"
              onChange={this.handleChange}
              value={this.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userName">Username</Label>
            <Input
              type="text"
              name="username"
              id="username"
              placeholder="User Name"
              onChange={this.handleChange}
              value={this.username}
            />
          </FormGroup>
          <FormGroup>
            <Label for="userPassword">Password</Label>
            <Input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              onChange={this.handleChange}
              value={this.password}
            />
          </FormGroup>
          <FormGroup>
            <Label for="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              name="confirm"
              id="confirm"
              placeholder="Confirm Password"
              onChange={this.handleChange}
              value={this.confirm}
            />
          </FormGroup>
          <Button value="submit">Submit</Button>
          <br />

          <span>
            Already have a account? <Link to="/login">Login</Link>
          </span>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    usernameExistsError: state.usernameExistsError,
    passwordMismatchError: state.passwordMismatchError
  };
};

export default connect(
  mapStateToProps,
  { register, clearErrors, passwordMismatch }
)(Register);
