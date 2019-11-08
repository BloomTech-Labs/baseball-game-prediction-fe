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
  PASSWORD_MISMATCH,
  GET_FAVORITE_TEAMS_START,
  GET_FAVORITE_TEAMS_SUCCESS,
  GET_FAVORITE_TEAMS_FAILURE,
  GET_TEAMSDB_START,
  GET_TEAMSDB_SUCCESS,
  GET_TEAMSDB_FAIL,
  GET_PROFILE_START,
  GET_PROFILE_SUCCESS,
  GET_PROFILE_FAIL,
  DELETE_FAVORITE_START,
  DELETE_FAVORITE_SUCCESS,
  POST_FAVORITE_START,
  GET_LINEUP_START,
  GET_LINEUP_SUCCESS,
  GET_LINEUP_FAIL,
  GET_PREDICTION_START,
  GET_PREDICTION_SUCCESS,
  GET_PREDICTION_FAIL
 
} from "../actions";

const initialState = {
  error: "",
  fetchingData: false,
  loggingIn: false,
  gasPrices: [],
  profile_id: null,
  favoriteTeams: [],
  teams: [],
  profile: [],
  username: "",
  lineup: {},
  prediction: {}
};

const reducer = (state = initialState, action) => {
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
    case GET_FAVORITE_TEAMS_SUCCESS:
      return {
        ...state,
        favoriteTeams: action.payload
      };

    case GET_TEAMSDB_FAIL: 
      return {
        ...state,
        fetchingData: false,
        error: action.payload      
    }
    case GET_TEAMSDB_START: 
      return {
        ...state,
        fetchingData: true
      }
    case GET_TEAMSDB_SUCCESS:
      return {
        ...state,
        teams: action.payload
      }
    case GET_PROFILE_START:
      return {
        ...state,
        fetchingData: true
      }
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.payload,
        username: action.payload,        
      }
    case GET_PROFILE_FAIL:
      return {
        ...state,
        fetchingData: false,
        error: action.payload
      }
    case DELETE_FAVORITE_SUCCESS:
      return {
        ...state
      }
    case POST_FAVORITE_START: 
      return {
        ...state,
         
      }
      case GET_LINEUP_START:
        return {
          ...state,
          fetchingData: true
        }
      case GET_LINEUP_SUCCESS:
        return {
          ...state,
          fetchingData: false,
          lineup: action.payload,       
        }
      case GET_LINEUP_FAIL:
        return {
          ...state,
          fetchingData: false,
          error: action.payload
        }
      case GET_PREDICTION_START:
        return {
          ...state,
          fetchingData: true
        }
      case GET_PREDICTION_SUCCESS:
        return {
          ...state,
          fetchingData: false,
          prediction: action.payload,       
        }
      case GET_PREDICTION_FAIL:
        return {
          ...state,
          fetchingData: false,
          error: action.payload
        }

    default:
      return state;
  }  
};

    

export default reducer;
