import axios from "axios";
import { Redirect } from "react-router-dom";

import { axiosWithAuth } from "../../utils/axiosAuth";
import { BottomNavigationAction } from "@material-ui/core";

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
      dispatch({ type: FETCH_DATA_FAILURE, payload: err.response.data.error });
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
      dispatch({ type: GET_FAVORITE_TEAMS_FAIL, payload: error.response });
    });
};
