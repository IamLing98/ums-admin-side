import {
  USER_UPDATE_FAILURE,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
} from "Actions/types";

export default (
  state = {
    loadingUpdate: false,
  },
  action
) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { ...state, loadingUpdate: true };
    case USER_UPDATE_SUCCESS:
      return { ...state, loadingUpdate: false };
    case USER_UPDATE_FAILURE:
      return { ...state, loadingUpdate: false };
    default:
      return { ...state };
  }
};
