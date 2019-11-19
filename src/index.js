import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import App from "./containers/app";
import reducer from "./Redux/reducers/index";
// import 'bootstrap/dist/css/bootstrap.min.css';

import "sanitize.css/sanitize.css";
import "./index.css";

import dotenv from 'dotenv';
import './App.css'


import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
import { green, blueGrey, blue } from "@material-ui/core/colors";


dotenv.config();

const target = document.querySelector("#root");
const myStore = createStore(reducer);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: green[900]
    },
    secondary: {
      main: blue[700]
    }
    // type: "dark"
  }
});

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>

      <div className="main-container">
        <MuiThemeProvider theme={theme}>
          <App />
        </MuiThemeProvider>

      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
console.log(store);
if (window.Cypress) {
  window.store = myStore;
}
console.log(myStore);
