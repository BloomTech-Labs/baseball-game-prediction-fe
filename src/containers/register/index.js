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

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillUnmount() {
    this.props.clearErrors();
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value });

  handlePasswordMismatch = () => {
    this.props.passwordMismatch();
  };

  handleSubmit = () => {
    this.props.clearErrors();
    if (this.state.password === this.state.confirm) {
      this.props.register(this.state.username, this.state.password);
    } else {
      // this.props.clearErrors()
      this.handlePasswordMismatch();
    }
  };

  render(props) {
    return (
      <div className="RegisterForm">
        <Form onSubmit={this.handleSubmit}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="text"
              name="email"
              id="email"
              placeholder="User E-mail"
              onChange={this.handleChange}
              value={this.state.email}
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
              value={this.state.username}
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
              value={this.state.password}
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
