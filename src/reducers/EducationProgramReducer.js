/**
 * Education Programs Reducer
 */
//action types
import {
    UPDATE_LIST_BRANCH
 } from '../actions/EducationProgramActions'; 
 
 const INITIAL_STATE = {
    listBranch: [], 
 }
 
 export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
       // add product to cart 
       case UPDATE_LIST_BRANCH:
          return {
             ...state,
             listBranch: [...action.payload]
          }
       // default case	
       default:
          return { ...state }
    }
 }