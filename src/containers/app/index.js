import React, { Component } from "react";
import { connect } from "react-redux";
import {
  login,
  register,
  logout,
  ensureLoggedIn
} from "../../Redux/actions/index";
import { withRouter } from "react-router-dom";
import Nav from "../nav/index";
import Schedules from "../schedules";
import Home from "../home";
import About from "../about";

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
