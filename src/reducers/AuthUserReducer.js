/**
 * Auth User Reducers
 */
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT_USER,
  USER_FETCH_SUCCESS,
  USER_FETCH_REQUEST,
  USER_FETCH_ERROR,
} from "Actions/types";

/**
 * initial auth user
 */
const username = localStorage.getItem("username");
const token = localStorage.getItem("jwtToken");
const INIT_STATE = {
  username: username,
  loading: false,
  token: token,
  userData: null,
  isAuthenticated: token !== null && username !== null,
  //isAuthenticated:true
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loading: true };

    case LOGIN_USER_SUCCESS:
      localStorage.setItem("jwtToken", action.token);
      localStorage.setItem("username", action.user.username);
      return {
        ...state,
        loading: false,
        userData: action.user,
        token: action.token,
        isAuthenticated: true,
        username: action.user.username,
      };
    case LOGIN_USER_FAILURE:
      return { ...state, loading: false };
    case LOGOUT_USER:
      return { ...state, username: null, token: null, isAuthenticated: false };
    case USER_FETCH_REQUEST:
      console.log("fetch user request");
      return { ...state, loading: true };
    case USER_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.userData,
        username: action.username,
      };
    case USER_FETCH_ERROR:
      return {
        ...state,
        username: null,
        token: null,
        isAuthenticated: false,
      };
    default:
      return { ...state };
  }
};
