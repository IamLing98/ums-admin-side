import {api} from "Api";
import {parseApiErrors} from "Util/apiUtils";
import {SubmissionError} from "redux-form";
import {
  ADD_DEPARTMENT_FAILURE,
  ADD_DEPARTMENT_FAILURE_ADD,
  ADD_DEPARTMENT_REQUEST,
  ADD_DEPARTMENT_REQUEST_ADD,
  ADD_DEPARTMENT_SUCCESS,
  ADD_DEPARTMENT_SUCCESS_ADD,
  ADD_USER_FAILURE,
  ADD_USER_PROP,
  ADD_USER_REQUEST,
  ADD_USER_SUCCESS,
  ADD_USER_UPDATE_SUCCESS,
  FETCH_COUNTRIES_USERS_FAILURE,
  FETCH_COUNTRIES_USERS_REQUEST,
  FETCH_COUNTRIES_USERS_SUCCESS,
  PROFILE_PIC_DELETE,
  PROFILE_PIC_DELETE_REQUEST,
  PROFILE_PIC_ERROR,
  PROFILE_PIC_REQUEST,
  PROFILE_PIC_UPLOADED,
  USER_CREATE_DELETE_FAILURE,
  USER_FETCH_ERROR,
  USER_FETCH_ERROR_CREATE,
  USER_FETCH_REQUEST,
  USER_FETCH_REQUEST_CREATE,
  USER_FETCH_SUCCESS,
  USER_FETCH_SUCCESS_CREATE,
  USER_PAGINATION,
  USER_PAGINATION_RESET
} from "Actions/types";
import {NotificationManager} from "react-notifications";

export const AddUserRequest = (values,prop) =>{
  return (dispatch) =>{
    dispatch({type:ADD_USER_REQUEST});
    return api.post('/users',values,true).then(response =>{
      dispatch({type:ADD_USER_SUCCESS});
      dispatch(getUsersManage('/users/all-users'));
      NotificationManager.success("User Added");
    }).catch(error =>{
      if (error.message === 'Unauthorized'){
        NotificationManager.error("Session Timed out");
        dispatch(prop.fetchUserError);
      }
      dispatch({type:ADD_USER_FAILURE});
      NotificationManager.error("Something is not right! Please check your form");

      throw new SubmissionError(parseApiErrors(error));

    });
  }
};

export const profilePicUploaded  = (data)=>{
  return{
    type:PROFILE_PIC_UPLOADED,
    profilePicImage: data
  }
};

export const profilePicUploadError = () => {
  return{
    type:PROFILE_PIC_ERROR
  }
};

export const profilePicUploadRequest = () =>{
  return{
    type:PROFILE_PIC_REQUEST
  }
};


export const profilePicUpload = (file,prop) =>{
  return (dispatch) =>{
      dispatch(profilePicUploadRequest());
      return api.upload('/images/user',file).then(response => dispatch(profilePicUploaded(response)))
          .catch(error => {
            if (error.message === 'Unauthorized'){
              NotificationManager.error("Session Timed out");
              dispatch(prop.fetchUserError);
            }
            dispatch(profilePicUploadError())})
  }
};
export const profilePicDeelteRequest = () =>{
  return{
    type:PROFILE_PIC_DELETE_REQUEST
  }
};

export const profilePicDelete = (url) =>{
  return(dispatch) =>{
    dispatch(profilePicDeelteRequest());
    return api.delete(url).then(response =>{
      return dispatch({type:PROFILE_PIC_DELETE})
    }).catch(error =>{
      if (error.message === 'Unauthorized'){

        NotificationManager.error("Session Timed out");

      }
    })

  }
};
let deParam = function (querystring) {
  // remove any preceding url and split
  querystring = querystring.substring(querystring.indexOf('?')+1).split('&');
  var params = {}, pair, d = decodeURIComponent;
  // march and parse
  for (var i = querystring.length - 1; i >= 0; i--) {
    pair = querystring[i].split('=');
    params[d(pair[0])] = d(pair[1] || '');
  }

  return params;
};
export const getUsersManage = (url) => {
  return(dispatch) =>{
    dispatch({type:USER_FETCH_REQUEST_CREATE});
    return api.get(url,true)
        .then(response => {
          dispatch({type:USER_FETCH_SUCCESS_CREATE,data:response['hydra:member']});
          if(response['hydra:view']){
            const page = deParam(response['hydra:view']['@id']);
            if (page['page']){
              dispatch(paginationData(response['hydra:view'],response['hydra:totalItems'],page['page']))
            }else {
              dispatch({type:USER_PAGINATION_RESET});
            }
          }

        })
        .catch(error => {
          dispatch({type:USER_FETCH_ERROR_CREATE});
          if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");

          }
        });
  }
};

export const updateUser = (values,user) =>{
  return(dispatch) =>{
    dispatch({type:ADD_USER_REQUEST});
    return api.put(`/users/${user.id}`,values,true).then(response =>{
      NotificationManager.success("Updated");
              dispatch({type:ADD_USER_UPDATE_SUCCESS});
              dispatch(getUsersManage('/users/all-users'));
    }).catch(error =>{
      dispatch({type:ADD_USER_UPDATE_SUCCESS});
      if (error.message === 'Unauthorized'){
        NotificationManager.error("Session Timed out");
      }
      NotificationManager.error("Something is not right! Please check your form");

      throw new SubmissionError(parseApiErrors(error));
    })
  }
};

export const setUserProp = (data) =>{
  return(dispatch) =>{
    dispatch({
      type:ADD_USER_PROP,
      data:data
    })
  }
};
export const paginationData = (paginationData,pageCount,currentPage) =>({
  type:USER_PAGINATION,
  paginationData:paginationData,
  pageCount:pageCount,
  currentPage:currentPage
});
//department
export const getDept = () =>{
  return(dispatch) =>{
    dispatch({type:ADD_DEPARTMENT_REQUEST});
    return   api.get('/departments',true)
        .then(response => {
          const valueList = [];
          response['hydra:member'].map(department => {
            valueList.push({id:department.id,URI:department.id,value:department.DepartmentName});
          });
          dispatch({type:ADD_DEPARTMENT_SUCCESS,data:valueList});
        })
        .catch(error => {
          dispatch({type:ADD_DEPARTMENT_FAILURE});
          if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
          }
        });
  }
};

export const addDept = (values) =>{
  return(dispatch) =>{
    dispatch({type:ADD_DEPARTMENT_REQUEST_ADD});
    return api.post('/departments',values,true).then(response =>{
      dispatch({type:ADD_DEPARTMENT_SUCCESS_ADD});
      dispatch(getDept());
      NotificationManager.success('Department Added')
    }).catch(error =>{
      dispatch({type:ADD_DEPARTMENT_FAILURE_ADD});
      if (error.message === 'Unauthorized'){
        NotificationManager.error("Session Timed out");
      }
      NotificationManager.error("Opps!");

      throw new SubmissionError(parseApiErrors(error));
    });
  }
};

export const getCountries = () => {
  return(dispatch) =>{
    dispatch({type:FETCH_COUNTRIES_USERS_REQUEST});
    return   api.get('/user_countries',true)
        .then(response => {
          const valueList = [];
          response['hydra:member'].map(country => {
            valueList.push({id:country.id,URI:country['@id'],value:country.countryName});
            dispatch({type:FETCH_COUNTRIES_USERS_SUCCESS ,data:valueList})
          });
        })
        .catch(error => {
          dispatch({type:FETCH_COUNTRIES_USERS_FAILURE});
          if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            this.props.dispatch(this.props.fetchUserError);
          }
        });
  }
}