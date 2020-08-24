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
    USER_CREATE_DELETE_REQUEST,
    USER_CREATE_DELETE_SUCCESS,
    USER_FETCH_ERROR_CREATE,
    USER_FETCH_REQUEST_CREATE,
    USER_FETCH_SUCCESS_CREATE,
    USER_PAGINATION,
    USER_PAGINATION_RESET
} from "Actions/types";

export default (state = {
    addUserLoader: false,
    profilePicUploaded:false,
    profilePicImage: null,
    users: null,
    loading:false,
    paginationHydra:null,
    HydraPageCount:null,
    CurrentPage:null,
    deptLoading:false,
    department:null,
    countries:null
                },
action) =>{
    switch (action.type) {
        case ADD_USER_UPDATE_SUCCESS:
            return {...state,addUserLoader:false};
        case ADD_USER_REQUEST:
            return {...state, addUserLoader: true};
        case ADD_USER_SUCCESS:
            return {...state,addUserLoader:false,profilePicImage:null,profilePicUploaded:false};
        case ADD_USER_FAILURE:
            return {...state,addUserLoader:false,profilePicImage:(state.profilePicImage)?state.profilePicImage:null};
        case PROFILE_PIC_REQUEST:
            return { ...state,addUserLoader: true};
        case PROFILE_PIC_UPLOADED:
            return{...state,addUserLoader:false,profilePicImage: action.profilePicImage,profilePicUploaded: true};
        case PROFILE_PIC_ERROR:
            return{...state,addUserLoader:false,profilePicImage:null,profilePicUploaded: false};
        case PROFILE_PIC_DELETE_REQUEST:
            return{...state,addUserLoader:true};
        case PROFILE_PIC_DELETE:
            return{...state,addUserLoader:false,profilePicImage:null,profilePicUploaded: false};
        case USER_FETCH_REQUEST_CREATE:
            return {...state,loading: true,users: null};
        case USER_FETCH_SUCCESS_CREATE:
            return {...state,loading: false,users: action.data};
        case USER_FETCH_ERROR_CREATE:
            return {...state,loading: false,users: null};
        case USER_PAGINATION:
            return {...state,paginationHydra:action.paginationData,HydraPageCount:action.pageCount,CurrentPage:action.currentPage};
        case USER_PAGINATION_RESET:
            return {...state,paginationHydra: null,HydraPageCount: null,CurrentPage: null};
        case USER_CREATE_DELETE_REQUEST:
            return {...state,loading: true};
        case USER_CREATE_DELETE_SUCCESS:
            return {...state,loading: false};
        case USER_CREATE_DELETE_FAILURE:
            return {...state,loading: false};
        case ADD_USER_PROP:
            return {...state,users: action.data};
        case ADD_DEPARTMENT_REQUEST:
            return {...state,deptLoading: true};
        case ADD_DEPARTMENT_SUCCESS:
            return {...state,deptLoading: false,department: action.data};
        case ADD_DEPARTMENT_FAILURE:
            return {...state,deptLoading: false,department: null};
        case ADD_DEPARTMENT_REQUEST_ADD:
            return {...state,deptLoading: true};
        case ADD_DEPARTMENT_SUCCESS_ADD:
            return {...state,deptLoading: false};
        case ADD_DEPARTMENT_FAILURE_ADD:
            return {...state,deptLoading: false};
        case FETCH_COUNTRIES_USERS_REQUEST:
            return {...state,loading: true};
        case FETCH_COUNTRIES_USERS_SUCCESS:
            return {...state,loading: false,countries:action.data};
        case  FETCH_COUNTRIES_USERS_FAILURE:
            return {...state,loading: false,countries: null};
        default:
            return{...state}
    }
}