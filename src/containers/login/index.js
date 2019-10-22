// Render Prop
import React, { Component } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import { connect } from "react-redux";
import { login } from "../../Redux/actions/index";
import { Link } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.login(this.state.username, this.state.password);
  }

  render(props) {
    return (
      <div className="LoginForm">
        <Form
          error={this.props.loginError ? true : false}
          size="large"
          onSubmit={this.handleSubmit}
        >
          <FormGroup>
            <Label for="userName">userName</Label>
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
            New to us? <Link to="/register">Register</Link>
          </span>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginError: state.loginError
  };
};
export default connect(
  mapStateToProps,
  { login }
)(Login);
