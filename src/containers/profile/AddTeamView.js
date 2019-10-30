import React, { useState, useEffect } from "react";
import { connect } from 'react-redux'
import TeamList from "./TeamList";
import { axiosWithAuth } from "../../utils/axiosAuth";
import { getTeamsDB } from "../../Redux/actions/index"

//CSS
import "../../App.css";

const DivisionListView = ({getTeamsDB, teams}) => {
    
  useEffect(() => {
    getTeamsDB()
  }, [])

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
      <div className="schedule-list-container">
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

const mapStateToProps = state => {  
  return {
    teams: state.teams
  }
}

export default connect(
  mapStateToProps,
   {getTeamsDB}
)(DivisionListView)
