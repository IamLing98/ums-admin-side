/**
 * Department   Reducer
 */
//action types
 import {ACTION_TYPES} from '../actions/TermActions';

 const INITIAL_STATE = {
    isLoading: false,
    recordDetail : null,

 }
 
 export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
       case ACTION_TYPES.GET_TERM_DETAIL :  
          return { 
            ...state,
            recordDetail : action.payload, 
          }
       // default case	
       default:
          return { ...state }
    }
 }