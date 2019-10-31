import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamList from "../components/TeamList";

//CSS
import "../../../App.css";

export default function DivisionListView() {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    axios
      .get("https://bgp-be-staging.herokuapp.com/api/teams")
      .then(teaminfo => {
        setTeams(teaminfo.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  // Divisional filters

  const nlWTeams = () => {
    return teams.filter(team => {
      return team.league === "NL" && team.division === "West";
    });
  };

  const nlETeams = () => {
    return teams.filter(team => {
      return team.league === "NL" && team.division === "East";
    });
  };

  const nlCTeams = () => {
    return teams.filter(team => {
      return team.league === "NL" && team.division === "Central";
    });
  };

  const alWTeams = () => {
    return teams.filter(team => {
      return team.league === "AL" && team.division === "West";
    });
  };

  const alETeams = () => {
    return teams.filter(team => {
      return team.league === "AL" && team.division === "East";
    });
  };

  const alCTeams = () => {
    return teams.filter(team => {
      return team.league === "AL" && team.division === "Central";
    });
  };

  if (teams.length > 1) {
    return (
      <div className="schedule-list-container" style={{marginTop: "75px"}}>
        <TeamList division={nlWTeams()} />
        <TeamList division={nlETeams()} />
        <TeamList division={nlCTeams()} />
        <TeamList division={alWTeams()} />
        <TeamList division={alETeams()} />
        <TeamList division={alCTeams()} />
      </div>
    );
  } else {
    return <div />;
  }
}
