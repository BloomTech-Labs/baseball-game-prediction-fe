import {
    LOGGING_IN,
    LOGIN_SUCCESS,
    LOGIN_FAILURE,
    REGISTERING,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    LOGOUT,
    ALREADY_LOGGED_IN,
    PASSWORD_MISMATCH
  } from "../actions/index";
  
  const initialState = {
    registering: false,
    loggingIn: false,
    loggedIn: false,
    loginError: false,
    passwordMismatchError: false,
    usernameExistsError: false,
    error: null
  };
  
  const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case PASSWORD_MISMATCH:
        return {
          ...state,
          passwordMismatchError: true
        }
      case ALREADY_LOGGED_IN:
        return {
          ...state,
          loggedIn: true
        }
      
      case LOGOUT:
        return {
          ...state,
          loggedIn: false
        }
      case LOGGING_IN:
        return {
          ...state,
          loggingIn: true,
          loginError: false,
          passwordMismatchError: false,
          usernameExistsError: false
        }
      case LOGIN_SUCCESS:
        return {
          ...state,
          loggedIn: true,
          loggingIn: false,
          loginError: false,
          passwordMismatchError: false,
          usernameExistsError: false
        }
        case LOGIN_FAILURE:
        return {
          ...state,
          loggingIn: false,
          loginError: true
        }
        case REGISTERING:
        return {
          ...state,
          registering: true,
          loginError: false,
          passwordMismatchError: false,
          usernameExistsError: false
        }
      case REGISTER_SUCCESS:
        return {
          ...state,
          loggedIn: true,
          registering: false,
          loginError: false,
          passwordMismatchError: false,
          usernameExistsError: false
        }
        case REGISTER_FAILURE:
        return {
          ...state,
          registering: false,
          usernameExistsError: true
        }
      default:
        return state;
    }
  };
  
  export default rootReducer;