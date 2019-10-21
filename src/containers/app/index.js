import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import About from "../about";
import Nav from "../nav/index";
import DateSelector from "../dateSelector";

const App = () => (
  <div>
    <Nav />
    <header></header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/schedule" component={DateSelector} />
    </main>
  </div>
);

export default App;
