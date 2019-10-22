import React from "react";
import { Route, Link } from "react-router-dom";

import Nav from "../nav/index";
import Schedules from "../schedules";
import Home from "../home";
import About from "../about";

const App = () => (
  <div>
    <Nav />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/schedules" component={Schedules} />
    </main>
  </div>
);

export default App;
