import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import {
  login,
  register,
  logout,
  ensureLoggedIn
} from "../../Redux/actions/index";

import Nav from "../nav/index";

console.log(process.env.ENVIRONMENT);
console.log("TEST");

class App extends Component {
  render() {
    return (
      <div>
        <Nav loggedIn={this.props.loggedIn} logout={this.props.logout} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loggingIn: state.loggingIn,
    loggedIn: state.loggedIn,
    error: state.error
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    { login, register, logout, ensureLoggedIn }
  )(App)
);
