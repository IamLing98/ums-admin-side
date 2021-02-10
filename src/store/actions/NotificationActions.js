import { notifiactionsTypes } from "./types";
import { api } from "Api";

export const getListNotifications = () => {
  return (dispatch) => {
    dispatch({ type: notifiactionsTypes.NOTIFICATIONS_GET_LIST });
    return api
      .get("/notifications")
      .then((res) => {
        return dispatch(
          notificationsFetchReceived(res.notifications, res.notRead)
        );
      })
      .catch((err) => {
        console.log(err);
        return (dispatch) => notificationsFetchFailed();
      });
  };
};

export const notificationsFetchReceived = (notifications, notRead) => ({
  type: notifiactionsTypes.NOTIFICATIONS_GET_LIST_SUCCESS,
  payload: { notifications, notRead },
});

export const notificationsFetchFailed = () => ({
  type: notifiactionsTypes.NOTIFICATIONS_GET_LIST_FAILED,
});

export const setReadNotifications = (ids) => {
  return (dispatch) => {
    dispatch({ type: notifiactionsTypes.NOTIFICATIONS_SET_READ });
    return api
      .put("/notifications", ids)
      .then((res) => {
        return dispatch(notificationsSetReadSuccess());
      })
      .catch((err) => {
        console.log(err);
        return (dispatch) => notificationsSetReadFailed();
      });
  };
};

export const notificationsSetReadSuccess = () => (dispatch) => {
  dispatch(getListNotifications());
  return { type: notifiactionsTypes.NOTIFICATIONS_SET_READ_SUCCESS };
};

export const notificationsSetReadFailed = () => ({
  type: notifiactionsTypes.NOTIFICATIONS_SET_READ_FAILED,
});
