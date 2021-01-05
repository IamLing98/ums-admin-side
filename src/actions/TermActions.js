
export const ACTION_TYPES = {
     GET_TERM_DETAIL: "GET_TERM_DETAIL",
     SET_TERM_LIST:"SET_TERM_LIST"
}

 export const setTermDetail = (data) => ({
    type: ACTION_TYPES.GET_TERM_DETAIL,
    payload: data
 });

 
 export const setTermList = (termList) => ({
   type: ACTION_TYPES.SET_TERM_LIST,
   payload: termList
});
 