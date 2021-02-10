import { notifiactionsTypes } from "../actions/types";

const initState = {
  totalNumber: 0,
  notReadNumber: 0,
  notifications: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case notifiactionsTypes.NOTIFICATIONS_GET_LIST:
      return {
        ...state,
      };

    case notifiactionsTypes.NOTIFICATIONS_GET_LIST_SUCCESS:
      return {
        ...state,
        totalNumber: action.payload.notifications.length,
        notReadNumber: action.payload.notRead,
        notifications: action.payload.notifications,
      };

    case notifiactionsTypes.NOTIFICATIONS_GET_LIST_FAILED:
      return {
        ...state,
      };
    default:
      return state;
  }
};
