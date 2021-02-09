import {
  LOGIN_USER_SUCCESS,
  LOGOUT_USER,
  USER_FETCH_ERROR,
} from "Actions/types";
import { api } from "Api";

export const tokenMiddleWare = (store) => (next) => (action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      window.localStorage.setItem("jwtToken", action.token);
      window.localStorage.setItem("user_id", action.user_id);
      api.setToken(action.token);
      break;
    case LOGOUT_USER:
      window.localStorage.removeItem("jwtToken");
      window.localStorage.removeItem("user_id");
      api.setToken(null);
      break;
    case USER_FETCH_ERROR:
      window.localStorage.removeItem("jwtToken");
      window.localStorage.removeItem("user_id");
      api.setToken(null);
    default:
  }
  next(action);
};
