import { scheduleActionTypes } from "./types";
import { api } from "Api";

export const getTermDetails = () => {
  return (dispatch) => {
    dispatch({ type: scheduleActionTypes.TERM_GET_TERM_DETAILS });
    return api
      .get(`/terms/${id}`)
      .then((res) => {
        dispatch({ type: scheduleActionTypes.TERM_GET_TERM_DETAILS_SUCCESS, payload: res });
      })
      .catch((err) => {
        dispatch({ type: scheduleActionTypes.TERM_GET_TERM_DETAILS_FAILED, payload: res });
        console.log(err);
      });
  };
};
