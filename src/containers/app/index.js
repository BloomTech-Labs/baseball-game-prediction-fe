import React from "react";
// import { Route, Link } from "react-router-dom";

import Nav from "../nav/index";
import Schedules from '../schedules';


const App = () => (
  <div>
    <Nav />
<<<<<<< HEAD
=======
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
>>>>>>> 5560859a2c95a0327b1e9c8351f9be97fa182ae8
  </div>
);

export default App;
