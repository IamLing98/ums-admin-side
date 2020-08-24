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
    ASSIGN_TASK_REMOVE_DEPT_REQUEST,
    ASSIGN_TASK_REMOVE_SURVY,
    ASSIGN_TASK_REMOVE_TASK,
    ASSIGN_TASK_SET_DEPT,
    ASSIGN_TASK_SET_DEPT_REQUEST,
    ASSIGN_TASK_SET_SURVY,
    ASSIGN_TASK_SET_TASK, ASSIGN_TASK_SET_TASK_FAILURE,
    ASSIGN_TASK_SET_TASK_REQUEST,
    ASSIGN_TASK_SET_TASK_SUCCESS
} from "Actions/types";

export default (state ={
    tasksData:null,
    loading:false,
    departmentData:null,
    selectedDept:null,
    deptLoading:false,
    surveyorData:null,
    selectedTask:null
},action) =>{
    switch (action.type) {
        case ASSIGN_TASK_GET_TASK_REQUEST:
            return {...state,loading: true};
        case ASSIGN_TASK_GET_TASK_SUCCESS:
            return {...state,loading: false,tasksData: action.data};
        case ASSIGN_TASK_GET_TASK_FAILURE:
            return {...state,loading: false,tasksData: null};
        case ASSIGN_TASK_GET_DEPT_REQUEST:
            return {...state,deptLoading: true};
        case ASSIGN_TASK_GET_DEPT_SUCCESS:
            return {...state,deptLoading: false,departmentData: action.data };
        case ASSIGN_TASK_GET_DEPT_FAILURE:
            return {...state,deptLoading: false,departmentData: null};
        case ASSIGN_TASK_GET_SURV_REQUEST:
            return {...state,loading: true};
        case ASSIGN_TASK_GET_SURV_SUCCESS:
            return {...state,loading: false,surveyorData: action.data};
        case ASSIGN_TASK_GET_SURV_FAILURE:
            return {...state,loading: false,surveyorData: null};
        case ASSIGN_TASK_SET_DEPT:
            return {...state,selectedDept: action.data};
        case ASSIGN_TASK_REMOVE_DEPT:
            return {...state,selectedDept: null};
        case ASSIGN_TASK_SET_TASK:
            return {...state,selectedTask: action.data};
        case ASSIGN_TASK_REMOVE_TASK:
            return {...state,selectedTask: null};
        case ASSIGN_TASK_SET_TASK_REQUEST:
            return {...state,loading: true};
        case ASSIGN_TASK_SET_TASK_SUCCESS:
            return {...state,loading: false,selectedTask:null,selectedDept:null};
        case ASSIGN_TASK_SET_TASK_FAILURE:
            return {...state,loading: false,selectedTask: null,selectedDept:null};
        default:
            return{...state}

    }
}