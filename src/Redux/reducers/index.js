import {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FETCH_DATA_START,
  FETCH_DATA_SUCCESS,
  FETCH_DATA_FAILURE,
  REGISTER,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  CLEAR_ERRORS,
  LOGOUT,
  ALREADY_LOGGED_IN,
  PASSWORD_MISMATCH
} from "../actions";

const initialState = {
  error: "",
  fetchingData: false,
  loggingIn: false,
  gasPrices: [],
  profile_id: null
};

const reducer = (state = initialState, action) => {
  console.log("state", state);
  switch (action.type) {
    case PASSWORD_MISMATCH:
      return {
        ...state,
        passwordMismatchError: true
      };
    case ALREADY_LOGGED_IN:
      return {
        ...state,
        loggedIn: true
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        loginError: false,
        passwordMismatchError: false,
        usernameExistsError: false
      };
    case LOGOUT:
      return {
        ...state,
        loggedIn: false
      };
    case LOGIN_START:
      return {
        ...state,
        error: "",
        loggingIn: true
      };
    case LOGIN_SUCCESS:
      console.log("payload", action.payload);
      return {
        ...state,
        loggingIn: false,
        error: "",
        profile_id: action.payload
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        loggingIn: false,
        loginError: true
      };
    case REGISTER:
      return {
        ...state,
        registering: true,
        loginError: false,
        passwordMismatchError: false,
        usernameExistsError: false
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        loggedIn: true,
        registering: false,
        loginError: false,
        passwordMismatchError: false,
        usernameExistsError: false
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        registering: false,
        usernameExistsError: true
      };
    case FETCH_DATA_START:
      return {
        ...state,
        error: "",
        fetchingData: true
      };
    case FETCH_DATA_SUCCESS:
      return {
        ...state,
        fetchingData: false,
        gasPrices: action.payload
          .filter(price => price.type === "Gasoline - Regular")
          .filter(
            price =>
              price.location === "US" || price.location === "State of Hawaii"
          )
      };

    case FETCH_DATA_FAILURE:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
