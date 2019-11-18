import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore } from 'redux'
import { ConnectedRouter } from "connected-react-router";
import store, { history } from "./store";
import App from "./containers/app";
import reducer from './Redux/reducers/index'
// import 'bootstrap/dist/css/bootstrap.min.css';

import "sanitize.css/sanitize.css";
import "./index.css";
import dotenv from 'dotenv';
import './App.css'

dotenv.config();

const target = document.querySelector("#root");
const myStore = createStore(reducer)

render(
  <Provider store={store}>
    
    <ConnectedRouter history={history}>
      <div className="main-container">
        <App />
      </div>
    </ConnectedRouter>
  </Provider>,
  target
);
console.log(store)
if (window.Cypress) {
  window.store = myStore

}
console.log(myStore)

