import React, { useEffect } from "react";
import getLogo from "../../utils/getLogo";
import { getTeamsDB } from "../../Redux/actions/index";
import { connect } from "react-redux";
import { postFavoriteTeam,
getFavoriteTeams } from "../../Redux/actions/index";
import { Link } from "react-router-dom";

const AddFavorite = props => {

  useEffect(() => {
    props.getTeamsDB();
  }, [props]);

  useEffect(() => {
    props.getFavoriteTeams(props.profile_id)
  }, [props.profile_id])  

  const submit = team => {
    const teams = {
      profile_id: props.profile_id,
      team_id: team.team_id,
      abbreviation: team.abbreviation,
      favorite: 1
    };
    props.favorite.map(fav => {
      if(fav.favorite === 1) {
        window.alert("If you already have a favorite team you'll have to delete before selecting a new one")
      }             
    })    
    props.postFavoriteTeam(teams);
  };

  return (
    <div style={{ paddingTop: 100, margin: "auto", maxWidth: 1000 }}>
      <h1 style={{ textAlign: "center" }}>
        Pick Your Favorite Teams To Follow
      </h1>
      <div style={{ textAlign: "center" }}>
        {props.teams.map(team => {
          return (
            <button
              onClick={() => submit(team)}
              style={{ margin: 20 }}
              key={team.abbreviation}
            >
              <Link to="/profile">
                <img src={getLogo(team.abbreviation)} width="100px" />
              </Link>
            </button>
          );
        })}
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    profile_id: state.profile_id,
    favorite: state.favoriteTeams,
    profile: state.profile,
    username: state.username,
    teams: state.teams
  };
};

export default connect(
  mapStateToProps,
  { postFavoriteTeam, getTeamsDB, getFavoriteTeams }
)(AddFavorite);
