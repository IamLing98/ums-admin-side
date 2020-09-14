/**
 * Department   Reducer
 */
//action types
import {
    GET_DEPARTMENT_LIST
 } from '../actions/DepartmentActions'; 
 
 const INITIAL_STATE = {
    departmentList: [],

 }
 
 export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
       // add product to cart 
       case GET_DEPARTMENT_LIST:
          return {
             ...state,
             departmentList: [...action.payload]
          }
       // default case	
       default:
          return { ...state }
    }
 }