import React from "react";
import { Route, Link } from "react-router-dom";
import Profile from "../profile/index.js"
import Nav from "../nav/index";
import Schedules from "../schedules/DivisionListView";
import TeamSchedule from "../schedules/TeamScheduleView";
import Home from "../home";
import About from "../about";

const App = () => (
  <div>
    <Nav />
    <main>
      <Route exact path="/" component={Home} />
      <Route exact path="/about-us" component={About} />
      <Route exact path="/schedules" component={Schedules} />
      <Route exact path="/schedules/:team_id" component={TeamSchedule} />
      <Route exact path="/profile" component={Profile} />
    </main>
  </div>
);

export default App;
