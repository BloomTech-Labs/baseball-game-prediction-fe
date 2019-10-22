import axios from 'axios'
import axiosWithAuth from '../axiosAuth'

export const ALREADY_LOGGED_IN = 'ALREADY_LOGGED_IN'
export const SEARCH_SUCCESS = 'LOGGING_IN'
export const CLEAR_ERRORS = 'CLEAR_ERRORS'
export const LOGGING_IN = 'LOGGING_IN'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILURE = 'LOGIN_FAILURE'
export const REGISTERING = 'REGISTERING'
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILURE = 'REGISTER_FAILURE'
export const PASSWORD_MISMATCH = 'PASSWORD_MISMATCH'
export const LOGOUT = 'LOGOUT'

  export const passwordMismatch = () => dispatch => {
    dispatch({
      type: PASSWORD_MISMATCH
    })
  }

export const ensureLoggedIn = () => dispatch => {
  dispatch({
    type: ALREADY_LOGGED_IN
  })
}

export const clearErrors = () => dispatch => {
  dispatch({
    type: CLEAR_ERRORS
  })
}

export const logout = () => dispatch => {
  dispatch({
    type: LOGOUT
  })
}

export const login = (user, pass) => dispatch => {
  dispatch({
    type: LOGGING_IN
  })
  axios.post('https://bw-spotify-backend.herokuapp.com/api/login', {username: user, password: pass})
  .then(res => {
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    })
  })
  .catch(err => {
    console.log('error', err)
    dispatch({
      type: LOGIN_FAILURE,
      payload: err
    })
  })
}

export const register = (user, pass) => dispatch => {
  dispatch({
    type: REGISTERING
  })
  axios.post('https://bw-spotify-backend.herokuapp.com/api/register', {username: user, password: pass})
  .then(res => {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  })
  .catch(err => {
    console.log('err', err)
    dispatch({
      type: REGISTER_FAILURE,
      payload: err
    })
  })
}



