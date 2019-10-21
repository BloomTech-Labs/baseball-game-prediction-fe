import React from "react";
import { Route, Link } from "react-router-dom";
import Home from "../home";
import About from "../about";
import Nav from "../nav/index";
import Schedules from '../schedules';

const App = () => (
  <div>
    <Nav />
    <header>
      <Link to="/">Home</Link>
      <Link to="/about-us">About</Link>
      <Link to="/schedules">Schedules</Link>
    </header>

    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/schedules" component={Schedules}/>
    </main>
  </div>
);

export default App;
