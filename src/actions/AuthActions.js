import { api } from "Api";
import { SubmissionError } from 'redux-form'
import {
    LOGIN_USER,
    LOGIN_USER_FAILURE,
    LOGIN_USER_SUCCESS,
    LOGOUT_USER, USER_FETCH_ERROR,
    USER_FETCH_REQUEST, USER_FETCH_SUCCESS
} from "Actions/types";
import { NotificationManager } from "react-notifications";
import { configureStore } from "../store";

export const userLoginAttempt = (username, password) => {
    return (dispatch) => {
        dispatch({ type: LOGIN_USER });
        var formData = new FormData();
        formData.append("username", username);
        formData.append("password", password);
        return api.post('/authenticate', formData, false).then(
            response => {
                let store = configureStore();
                store.dispatch(userLoginSuccess(response.token, response.user));
                dispatch(userLoginSuccess(response.token, response.user));
            }).catch(error => {
                dispatch({ type: LOGIN_USER_FAILURE });
                console.log(error.message);
                if (error.message === 'Forbidden') {
                    NotificationManager.error("Did you forget something? Please activate your account");
                }
                else if (error.message === 'Unauthorized') {
                    throw new SubmissionError({ _error: "Username or Password Invalid" });
                }
            });
    }

};

export const userLoginSuccess = (token, user) => {
    return {
        type: LOGIN_USER_SUCCESS,
        token,
        user
    }
};

export const userLogoutAction = () => ({
    type: LOGOUT_USER
});

export const fetchUserRequest = () => ({
    type: USER_FETCH_REQUEST
});

export const userFetchReceived = (userId, userData) => ({
    type: USER_FETCH_SUCCESS,
    userId,
    userData
});

export const fetchUserDetails = (username) => {
    return (dispatch) => {
        dispatch(fetchUserRequest);
        return api.get(`/users/getDetails?username= + ${username}`, true).then(response => {
            let store = configureStore();
            store.dispatch(userLoginSuccess(localStorage.getItem('jwtToken'), localStorage.getItem('user_id')));
            dispatch(userFetchReceived(response.userId, response));
        }).catch(error => {
            if (error.message === 'Unauthorized') {
                NotificationManager.error("Session Timed out")
            }
            dispatch(fetchUserError());
        })
    }
};

export const fetchUserError = () => ({
    type: USER_FETCH_ERROR
});