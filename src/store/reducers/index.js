/**
 * App Reducers
 */
import { combineReducers } from "redux";
import settings from "./settings";
import chatAppReducer from "./ChatAppReducer";
import emailAppReducer from "./EmailAppReducer";
import sidebarReducer from "./SidebarReducer";
import authUserReducer from "./AuthUserReducer";
import { reducer as formReducer } from "redux-form";
import { routerReducer } from "react-router-redux";

import {
  ADD_DEPARTMENT_SUCCESS_ADD,
  ADD_USER_SUCCESS,
  LOGIN_USER_FAILURE,
} from "../actions/types.js";

const reducers = combineReducers({
  settings,
  chatAppReducer,
  emailApp: emailAppReducer,
  sidebar: sidebarReducer,
  auth: authUserReducer,
  form: formReducer.plugin({
    addUserForm: (state, action) => {
      switch (action.type) {
        case ADD_USER_SUCCESS:
          return undefined;
        default:
          return state;
      }
    },
    addDeptFrom: (state, action) => {
      switch (action.type) {
        case ADD_DEPARTMENT_SUCCESS_ADD:
          return undefined;
        default:
          return state;
      }
    },
    adminLoginForm: (state, action) => {
      switch (action.type) {
        case LOGIN_USER_FAILURE:
          return undefined;
        default:
          return state;
      }
    },
  }),
  router: routerReducer,
});

export default reducers;
