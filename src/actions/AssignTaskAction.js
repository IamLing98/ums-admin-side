import {api} from "Api/index";
import {
    ASSIGN_TASK_GET_DEPT_FAILURE,
    ASSIGN_TASK_GET_DEPT_REQUEST,
    ASSIGN_TASK_GET_DEPT_SUCCESS,
    ASSIGN_TASK_GET_SURV_FAILURE,
    ASSIGN_TASK_GET_SURV_REQUEST,
    ASSIGN_TASK_GET_SURV_SUCCESS,
    ASSIGN_TASK_GET_TASK_FAILURE,
    ASSIGN_TASK_GET_TASK_REQUEST,
    ASSIGN_TASK_GET_TASK_SUCCESS,
    ASSIGN_TASK_REMOVE_DEPT,
    ASSIGN_TASK_REMOVE_SURVY,
    ASSIGN_TASK_REMOVE_TASK,
    ASSIGN_TASK_SET_DEPT,
    ASSIGN_TASK_SET_DEPT_REQUEST,
    ASSIGN_TASK_SET_SURVY,
    ASSIGN_TASK_SET_TASK, ASSIGN_TASK_SET_TASK_FAILURE,
    ASSIGN_TASK_SET_TASK_REQUEST,
    ASSIGN_TASK_SET_TASK_SUCCESS
} from "Actions/types";
import {NotificationManager} from "react-notifications";


export const getTaskToAssign = (url) => (dispatch) => {
  dispatch({type:ASSIGN_TASK_GET_TASK_REQUEST});
    return api.get(url,true).then(response =>{
      dispatch({type: ASSIGN_TASK_GET_TASK_SUCCESS,data:response['hydra:member']})
  }).catch(error =>{
    dispatch({type:ASSIGN_TASK_GET_TASK_FAILURE});
        if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            window.location.reload();
        }
  });
};

export const getSurveyorsData = (url) =>(dispatch) =>{
    dispatch({type:ASSIGN_TASK_GET_SURV_REQUEST});
    return api.get(url,true).then(response =>{
        let valueList = [];
        response['hydra:member'].map(sur => {
            valueList.push({id:sur.id,URI:sur['@id'],value:`${sur.username}: ${sur.firstName} ${sur.lastName}`});
        });
        dispatch({type:ASSIGN_TASK_GET_SURV_SUCCESS,data:valueList});
    }).catch(error =>{
        dispatch({type:ASSIGN_TASK_GET_SURV_FAILURE});
        if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            window.location.reload();
        }
    });
};

export const getDepartmentNames = (url) => (dispatch) =>{
    dispatch({type:ASSIGN_TASK_GET_DEPT_REQUEST});
  return api.get(url).then(response =>{
            dispatch({type:ASSIGN_TASK_GET_DEPT_SUCCESS,data:response['hydra:member']})
  }).catch(error =>{
      dispatch({type:ASSIGN_TASK_GET_DEPT_FAILURE});
      if (error.message === 'Unauthorized'){
          NotificationManager.error("Session Timed out");
          window.location.reload();
      }
  });
};
export const assignSurveyor = (value,id) => (dispatch) =>{
    dispatch({type:ASSIGN_TASK_SET_TASK_REQUEST});
    return api.put(`/tasks/${id}`,value).then(response =>{
        dispatch(getTaskToAssign('/tasks?status=Pending'));
        dispatch({type:ASSIGN_TASK_SET_TASK_SUCCESS});
        NotificationManager.success('Task Assigned')
    }).catch(error =>{
        dispatch({type:ASSIGN_TASK_SET_TASK_FAILURE});
        NotificationManager.error('Task Assign Failed');
        if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            window.location.reload();
        }
    });
};


export const setSelected = (value) => (dispatch) =>{
  dispatch({type:ASSIGN_TASK_SET_DEPT,data:value})
};
export const removeSelected = () => (dispatch) =>{
    dispatch({type:ASSIGN_TASK_REMOVE_DEPT})
};

export const setSelectedTask = (value) => (dispatch) =>{
    dispatch({type:ASSIGN_TASK_SET_TASK,data:value})
};
export const removeSelectedTask = () => (dispatch) =>{
    dispatch({type:ASSIGN_TASK_REMOVE_TASK})
};
