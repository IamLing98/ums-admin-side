import {api} from "Api/index";
import {USER_UPDATE_FAILURE, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS} from "Actions/types";
import {NotificationManager} from "react-notifications";
import {SubmissionError} from "redux-form";
import {parseApiErrors} from "Util/apiUtils";

export const UpdateProfilePassword = (values,id) => (dispatch) =>{
    dispatch({type:USER_UPDATE_REQUEST});
    return api.put(`/users/${id}/reset-password`,values,true).then(response => {
        localStorage.setItem('jwtToken',response.token);
        dispatch({type:USER_UPDATE_SUCCESS});
        NotificationManager.success('Profile Updated Successfully!');
    }).catch(error =>{
        dispatch({type:USER_UPDATE_FAILURE});
        NotificationManager.error('Something went wrong');
        if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            window.location.reload();
        }
        throw new SubmissionError(parseApiErrors(error));
    });
};
export const UpdateProfile = (values,id) => (dispatch) =>{
    dispatch({type:USER_UPDATE_REQUEST});
    return api.put(`/users/${id}`,values,true).then(response => {
        dispatch({type:USER_UPDATE_SUCCESS});
        NotificationManager.success('Profile Updated Successfully!');
    }).catch(error =>{
        dispatch({type:USER_UPDATE_FAILURE});
        NotificationManager.error('Something went wrong');
        if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            window.location.reload();
        }
        throw new SubmissionError(parseApiErrors(error));
    });
};