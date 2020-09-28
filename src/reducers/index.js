/**
 * App Reducers
 */
import { combineReducers } from 'redux';
import settings from './settings';
import chatAppReducer from './ChatAppReducer';
import emailAppReducer from './EmailAppReducer';
import sidebarReducer from './SidebarReducer';
import authUserReducer from './AuthUserReducer';
import addUserReducer from './AddUserReducer';
import feedbacksReducer from './FeedbacksReducer';
import {reducer as formReducer} from 'redux-form'
import {routerReducer} from 'react-router-redux'
import UpdateUserReducer from './UpdateUserReducer';
import EducationProgramReducer from './EducationProgramReducer';
import DepartmentReducer from './DepartmentReducer';


import {
  ADD_DEPARTMENT_SUCCESS_ADD,
  ADD_USER_SUCCESS,
  CREATE_TASK_CATEGORY_SUCCESS,
  CREATE_TASK_SUCCESS,
  LOGIN_USER_FAILURE
} from "Actions/types";

const reducers = combineReducers({
  settings,
  chatAppReducer,
  emailApp: emailAppReducer,
  sidebar: sidebarReducer,
  feedback: feedbacksReducer,
  auth: authUserReducer,
  addUser: addUserReducer,
  updateUserRed:UpdateUserReducer,
  educationProgram:EducationProgramReducer,
  departmentReducer: DepartmentReducer,
  form: formReducer.plugin({
    addUserForm: (state,action)=>{
      switch (action.type) {
        case ADD_USER_SUCCESS:
          return undefined;
        default:
          return state;
      }
    },
    addDeptFrom:(state,action) =>{
      switch (action.type) {
        case ADD_DEPARTMENT_SUCCESS_ADD:
          return undefined;
        default:
          return state;
      }
    },
    adminLoginForm: (state,action) =>{
      switch (action.type) {
        case LOGIN_USER_FAILURE:
          return undefined;
        default:
          return state;
      }
    },
  }),
  router: routerReducer
});

export default reducers;
