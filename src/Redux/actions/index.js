import axios from "axios";
import { Redirect } from "react-router-dom";
import { axiosWithAuth } from "../../utils/axiosAuth";
import { axiosWithAuthMSF } from "../../utils/axiosWithAuthMSF";
import { BottomNavigationAction } from "@material-ui/core";
import moment from "moment";

export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const PASSWORD_MISMATCH = "PASSWORD_MISMATCH";
export const ALREADY_LOGGED_IN = "ALREADY_LOGGED_IN";
export const LOGOUT = "LOGOUT";



export const passwordMismatch = () => dispatch => {
  dispatch({
    type: PASSWORD_MISMATCH
  });
};

export const ensureLoggedIn = () => dispatch => {
  dispatch({
    type: ALREADY_LOGGED_IN
  });
};

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  });
};

export const logout = () => dispatch => {
  localStorage.removeItem("token");
  window.location.href = "/";
  dispatch({
    type: LOGOUT
  });
};

export const LOGIN_START = "LOGIN_START";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAILURE = "LOGIN_FAILURE";

export const login = (creds, redirect) => dispatch => {
  dispatch({ type: LOGIN_START });
  axiosWithAuth()
    .post("/api/profiles/login", creds)
    .then(res => {
      localStorage.setItem("token", res.data.token);
      redirect();
      dispatch({ type: LOGIN_SUCCESS, payload: res.data.id });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: LOGIN_FAILURE,
        payload: err
      });
    });
};

export const REGISTER = "REGISTER";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAILURE = "REGISTER_FAILURE";

export const register = (creds, redirect) => dispatch => {
  dispatch({ type: REGISTER });
  return axiosWithAuth()
    .post("/api/profiles/create", creds)
    .then(res => {
      redirect();
      window.alert("Registration Successful! Please Login");
      dispatch({ type: REGISTER_SUCCESS });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: REGISTER_FAILURE,
        payload: err
      });
    });
};

export const FETCH_DATA_START = "FETCH_DATA_START";
export const FETCH_DATA_SUCCESS = "FETCH_DATA_SUCCESS";
export const FETCH_DATA_FAILURE = "FETCH_DATA_FAILURE";
export const getData = () => dispatch => {
  dispatch({ type: FETCH_DATA_START });
  axiosWithAuth()
    .get("/data")
    .then(res => {
      dispatch({ type: FETCH_DATA_SUCCESS, payload: res.data.data });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({ type: FETCH_DATA_FAILURE, payload: err });
    });
};

export const GET_FAVORITE_TEAMS_START = "GET_FAVORITE_TEAMS_START";
export const GET_FAVORITE_TEAMS_SUCCESS = "GET_FAVORITE_TEAMS_SUCCESS";
export const GET_FAVORITE_TEAMS_FAIL = "GET_FAVORITE_TEAMS_FAIL";
export const getFavoriteTeams = id => dispatch => {
  dispatch({ type: GET_FAVORITE_TEAMS_START });
  axiosWithAuth()
    .get(`/api/favoriteTeams/${id}`)
    .then(res => {
      dispatch({ type: GET_FAVORITE_TEAMS_SUCCESS, payload: res.data });
    })
    .catch(error => {
      dispatch({ type: GET_FAVORITE_TEAMS_FAIL, payload: error });
    });
};

export const GET_TEAMSDB_START = "GET_TEAMSDB_START";
export const GET_TEAMSDB_SUCCESS = "GET_TEAMSDB_SUCCESS";
export const GET_TEAMSDB_FAIL = "GET_TEAMSDB_FAIL";

export const getTeamsDB = () => dispatch => {
  dispatch({type: GET_TEAMSDB_START})
  axiosWithAuth()
    .get(`/api/teams`)
    .then(res => {
      dispatch({type: GET_TEAMSDB_SUCCESS, payload: res.data})
    })
    .catch(error => {
      dispatch({type: GET_TEAMSDB_FAIL, payload: error})
    })
}

export const GET_PROFILE_START = "GET_PROFILE_START";
export const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
export const GET_PROFILE_FAIL = "GET_PROFILE_FAIL"

export const getProfile = profile_id => dispatch => {  
  dispatch({type: GET_PROFILE_START})
  axiosWithAuth()  
  .get(`/api/profiles/${profile_id}`)
        .then(res => {      
      dispatch({type: GET_PROFILE_SUCCESS, payload: res.data[0].username})
    })
    .catch(error => {
      dispatch({type: GET_PROFILE_FAIL, payload: error})
    })
}

export const DELETE_FAVORITE_START = "DELETE_FAVORITE_START";
export const DELETE_FAVORITE_SUCCESS = "DELETE_FAVORITE_SUCCESS";


export const deleteFavorite = favorite_id => dispatch => {
  dispatch({type: DELETE_FAVORITE_START})
  axiosWithAuth()
    .delete(`/api/favoriteTeams/${favorite_id}`)    
}

export const deleteProfile = (profile_id, redirect) => {
  var yes = window.confirm('Are you sure you want to delete your profile?')
    if(yes === true) {
  axiosWithAuth()     
    .delete(`/api/profiles/${profile_id}`)
    .then(res => {
      redirect()
    })
  }
}
export const POST_FAVORITE_START = "POST_FAVORITE_START"

export const postFavoriteTeam = (team) => dispatch => {
  dispatch({type: POST_FAVORITE_START})
    axiosWithAuth()
    .post(`/api/favoriteTeams`, team)   
}

export const GET_LINEUP_START = "GET_LINEUP_START"
export const GET_LINEUP_SUCCESS = "GET_LINEUP_SUCCESS"
export const GET_LINEUP_FAIL = "GET_LINEUP_FAIL"

export const getLineup = (date, away, home) => async dispatch => {
  dispatch({type: GET_LINEUP_START})
  const gameLineup = await axiosWithAuthMSF().get(
    `https://api.mysportsfeeds.com/v2.1/pull/mlb/2019-regular/games/${date}-${away}-${home}/lineup.json`
  );
  if (gameLineup.data) {
    const team1 = axiosWithAuth().post(`/api/teams/abbr`, {
      abbreviation: away
    });
    const team2 = axiosWithAuth().post(`/api/teams/abbr`, {
      abbreviation: home
    });

    const teamArray = await Promise.all([team1, team2]);

    const gameInfo = {
      ...gameLineup.data,
      teams: teamArray
    };

    dispatch({type: GET_LINEUP_SUCCESS, payload: gameInfo});
  } else {
    dispatch({type: GET_LINEUP_FAIL, payload: "Error retrieving lineup."});
  }
}

export const GET_PREDICTION_START = "GET_PREDICTION_START"
export const GET_PREDICTION_SUCCESS = "GET_PREDICTION_SUCCESS"
export const GET_PREDICTION_FAIL = "GET_PREDICTION_FAIL"

export const getPrediction = res => async dispatch => {
  dispatch({type: GET_PREDICTION_START})
  if (res.game && res.teams) {
    // Sorting out/formatting variables
    const gametime = moment(res.game.startTime).format("HH");
    const dayNight = () => {
      const hour = parseInt(gametime);
      if (hour >= 17) {
        return "N";
      } else {
        return "D";
      }
    };
    const gamedate = res.game.startTime;
    const date = moment(gamedate).format("YYYYMMDD");
    const dayofweek = moment(gamedate).format("ddd");

    const gamedata = {
      date: date,
      day_of_week: dayofweek,
      visiting_team: res.game.awayTeam.abbreviation,
      visiting_team_league: `${res.teams[0].data[0].league}`,
      home_team: res.game.homeTeam.abbreviation,
      home_team_league: `${res.teams[1].data[0].league}`,
      day_night: dayNight(),
      park_id: res.game.venue.id,
      visiting_manager_name: `${res.teams[0].data[0].manager}`,
      home_manager_name: `${res.teams[1].data[0].manager}`
    };

    const prediction = await axios.post(
      "https://baseball-game-predictor.herokuapp.com/",
      gamedata
    );

    dispatch({type: GET_PREDICTION_SUCCESS, payload: prediction});
  } else {
    dispatch({type: GET_PREDICTION_FAIL, payload: "Error retrieving prediction."});
  }
}