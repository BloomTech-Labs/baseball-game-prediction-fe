import React, { useState, useEffect } from "react";
import axios from "axios";
import TeamList from "../components/TeamList";
import { getTeamsDB } from "../../../Redux/actions/index"
import { connect } from 'react-redux'
import getLogo from "../../../utils/getLogo";

//CSS
import "../../../App.css";

const DivisionListView = ({getTeamsDB, teams}) => {
  useEffect(() => {
    getTeamsDB()
  }, [])
  



  // Divisional filters

  const newLogo = () =>{
    return <img src={getLogo(teamImg)} width="25px" />
  }

  const teamImg = () => {
    return teams.filter(team => {
      return team.abbreviation === getLogo.team ;
     
    });
    
  };
  

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
        <TeamList division={nlWTeams( <img src={teamImg()} width="25px" />)}  />
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
