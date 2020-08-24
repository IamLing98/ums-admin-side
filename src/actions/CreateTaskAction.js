import {api} from "Api/index";
import {
    CREATE_TASK_CATEGORY_FAILURE,
    CREATE_TASK_CATEGORY_REQUEST,
    CREATE_TASK_CATEGORY_SUCCESS,
    CREATE_TASK_CLIENT_ASSIGN,
    CREATE_TASK_CLIENT_GET_FAILURE,
    CREATE_TASK_CLIENT_GET_REQUEST,
    CREATE_TASK_CLIENT_GET_SUCCESS,
    CREATE_TASK_CLIENT_REMOVE,
    CREATE_TASK_FAILURE,
    CREATE_TASK_FORM_FAILURE,
    CREATE_TASK_FORM_REQUEST,
    CREATE_TASK_FORM_SUCCESS,
    CREATE_TASK_REQUEST,
    CREATE_TASK_SUCCESS,
    FETCH_TASK_REQUEST
} from "Actions/types";
import {NotificationManager} from "react-notifications";
import {reset, SubmissionError} from "redux-form";
import {parseApiErrors} from "Util/apiUtils";

export const getFormData = (url) =>{
  return(dispatch)=>{
      dispatch({type:CREATE_TASK_FORM_REQUEST});
      return api.get(url).then(response =>{
          let valueList = [];
          response['hydra:member'].map(form => {
              valueList.push({id:form.id,URI:form.id,value:form.name});
          });

            dispatch(successFormData(response['hydra:member'],valueList))
      }).catch(error =>{
          if (error.message === 'Unauthorized'){
              NotificationManager.error("Session Timed out");
          }
          dispatch({type:CREATE_TASK_FORM_FAILURE})
      });
  }
};
export const getCategoryData = (url) =>{
    return(dispatch)=>{
        dispatch({type:CREATE_TASK_CATEGORY_REQUEST});
        return api.get(url).then(response =>{
            let valueList = [];
            response['hydra:member'].map(category => {
                valueList.push({id:category.id,URI:category['@id'],value:category.catagoryName});
            });
            dispatch(successCategoryData(response['hydra:member'],valueList))
        }).catch(error =>{
            if (error.message === 'Unauthorized'){
                NotificationManager.error("Session Timed out");
            }
            dispatch({type:CREATE_TASK_CATEGORY_FAILURE})
        });
    }
};

export const addCategory = (data) =>{
    return(dispatch) =>{
        dispatch({type:CREATE_TASK_CATEGORY_REQUEST});
        return api.post('/task_categories',data,true).then(response =>{
            NotificationManager.success("Category Added");

            dispatch(getCategoryData('/task_categories'));

        }).catch(error =>{
            dispatch({type:CREATE_TASK_CATEGORY_FAILURE});

            if (error.message === 'Unauthorized'){
                NotificationManager.error("Session Timed out");
            }

            NotificationManager.error("Something is not right! Please check your form");
            throw new SubmissionError(parseApiErrors(error));
        })
    }
};

export const addTask = (data) =>{
    return(dispatch) =>{
        dispatch({type:CREATE_TASK_REQUEST});
        let formId = data.form;

        delete data.form;
        return api.post('/tasks',data,true).then(response => {
            formId.map(key => {
                api.post(`/tasks/${response.id}/add-form/${key}`,{},true).then(res=>{
                    dispatch(getTaskData());
                    NotificationManager.success("Task Added");
                }).catch(err =>{
                    dispatch({type:CREATE_TASK_FAILURE});
                    if (err.message === 'Unauthorized'){
                        NotificationManager.error("Session Timed out");
                    }
                })
            })
        }).catch(error =>{
            dispatch({type:CREATE_TASK_FAILURE});
            if (error.message === 'Unauthorized'){
                NotificationManager.error("Session Timed out");
            }
            NotificationManager.error("Something is not right! Please check your form");
            throw new SubmissionError(parseApiErrors(error));

        })


    }
};

export const getTaskData = () =>{
    return(dispatch) =>{
        dispatch({type:FETCH_TASK_REQUEST});
        return api.get('/tasks').then(response =>{

            dispatch(successTasksData(response['hydra:member']));

        }).catch(error =>{
            dispatch({type:CREATE_TASK_FAILURE});
            if (error.message === 'Unauthorized'){
                NotificationManager.error("Session Timed out");
            }
        })
    }
};

export const clientCreateTask = (value) =>{
    return(dispatch) =>{
        dispatch({type:CREATE_TASK_CLIENT_ASSIGN,data:value});
    }
};

export const clientRemoveTask = () =>{
    return(dispatch) =>{
        dispatch({type:CREATE_TASK_CLIENT_REMOVE});
    }
};
export const getClientList = (url) =>{
    return(dispatch) =>{
        dispatch({type:CREATE_TASK_CLIENT_GET_REQUEST});
        return api.get(url,true).then(response =>{
            dispatch({type:CREATE_TASK_CLIENT_GET_SUCCESS,data:response['hydra:member']});
        }).catch(error =>{
            dispatch({type:CREATE_TASK_CLIENT_GET_FAILURE});
            if (error.message === 'Unauthorized'){
                NotificationManager.error("Session Timed out");
            }
        })
    }
}
export const successTasksData = (taskData) =>({
    type:CREATE_TASK_SUCCESS,
    data:taskData
});
export const successFormData = (formData,selectD) =>({
    type: CREATE_TASK_FORM_SUCCESS,
    data:formData,
    selectData: selectD

});
export const successCategoryData = (catData,selectD) =>({
    type: CREATE_TASK_CATEGORY_SUCCESS,
    data:catData,
    selectData: selectD
});