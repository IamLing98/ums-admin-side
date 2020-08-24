/* eslint-disable */
import React, {Component, createRef} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";
import {connect} from 'react-redux';
import {
    assignSurveyor,
    getDepartmentNames,
    getSurveyorsData,
    getTaskToAssign,
    removeSelected, removeSelectedTask,
    setSelected, setSelectedTask
} from "Actions/AssignTaskAction";
import {Alert} from "reactstrap";
import Button from "@material-ui/core/Button";
import { withRouter } from 'react-router-dom';
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {Scrollbars} from "react-custom-scrollbars";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import TextField from "@material-ui/core/es/TextField";
import Chip from "@material-ui/core/es/Chip";
import Link from "react-router-dom/es/Link";
import Form from "reactstrap/es/Form";
import {reduxForm,Field} from "redux-form";
import {renderField} from "../../../forms/ComonForm";
const mapStateToProps = state =>({
...state.assignTask
});

const mapDispatchToProps = {
    getTaskToAssign,
    getDepartmentNames,
    setSelected,
    removeSelected,
    getSurveyorsData,
    setSelectedTask,
    removeSelectedTask,
    assignSurveyor
};

class AssignTask extends Component{
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }
    state ={
        dropdownOpen: false,
    };
    componentDidMount(){
        this.props.getTaskToAssign('/tasks?status=Pending');
        this.props.getDepartmentNames('/departments');
    }

    componentDidUpdate(prevProps){
        if (prevProps.selectedDept !== this.props.selectedDept){
            const {selectedDept} = this.props;
            if (selectedDept){
                this.props.getSurveyorsData(`/users/all-users?roles=ROLE_SURVEYOR&surveyorUID.department.DepartmentName=${selectedDept.DepartmentName}`);
                this.props.getTaskToAssign(`/tasks?status=Pending&department.DepartmentName=${selectedDept.DepartmentName}`);
            }
        }

    }
    componentWillUnmount(){
        this.props.removeSelectedTask();
        this.props.removeSelected();
    }
    reloadDept(){
        this.props.removeSelectedTask();
        this.props.removeSelected();
        this.props.getTaskToAssign('/tasks?status=Pending');
        return this.props.getDepartmentNames('/departments');
    }
    onSelectDept(dept){
        return this.props.setSelected(dept);
    }

    onRemoveSelect(){
        this.props.removeSelectedTask();
        return this.props.removeSelected();
    }

    search_dept = createRef();
    onSearchDept(){
        return this.props.getDepartmentNames(`/departments?DepartmentName=${this.search_dept.current.value}`)
    }
    search_task = createRef();

    onSearchTasks(){
        const {selectedDept} = this.props;
        return this.props.getTaskToAssign(`/tasks?status=Pending&Title=${this.search_task.current.value}&department.DepartmentName=${selectedDept.DepartmentName}`);
    }
    onSelectTask(value){
        return this.props.setSelectedTask(value);
    }
    onRemoveSelectTask(){
        return this.props.removeSelectedTask();
    }
    onSubmitSur(value){
        value.status = 'Assigned';
        return this.props.assignSurveyor(value,this.props.selectedTask.id);
    }
    render(){
        const{match,tasksData,loading,departmentData,deptLoading,surveyorData,selectedDept,selectedTask,handleSubmit} = this.props;

        return(
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Polucon | Assign Task</title>
                    <meta name="description" content="Assign Tasks" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.assignTask" />} match={match} />
                <RctCollapsibleCard
                    heading={<IntlMessages id="assignment.assignTask" />}
                    collapsible
                    reloadable
                    fullBlock>
                    <div className="d-flex justify-content-center">
                        <a href="javascript:void(0)" onClick={() => this.reloadDept()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                    </div>
                    <br/>
                    {tasksData && (tasksData.length !== 0)
                        ?
                        <div className="container">
                            {
                                departmentData &&
                                (departmentData.length !== 0) ? selectedDept ?
                                    <div>
                                        <div className="d-flex justify-content-center">
                                            <h6>Selected Department</h6>
                                        </div>
                                        <div className="d-flex justify-content-center">

                                            <Chip className="bg-info text-white mr-10 mb-10"
                                                  label={selectedDept.DepartmentName}
                                                  onDelete={() => this.onRemoveSelect()} />
                                        </div>
                                        <br/>
                                        <Divider/>
                                        <br/>
                                        {surveyorData && (surveyorData.length !== 0) ?
                                            selectedTask ?
                                                <div>
                                                    <div className="d-flex justify-content-center">
                                                        <h6>Selected Task</h6>
                                                    </div>

                                                    <div className="d-flex justify-content-center">
                                                        <Chip className="bg-info text-white mr-10 mb-10"
                                                              label={selectedTask.Title}
                                                              onDelete={() => this.onRemoveSelectTask()} />
                                                    </div>
                                                    <br/>
                                                    <Divider/>
                                                    <br/>
                                                    <h5 className="text-muted">Surveyors</h5>
                                                    <br/>
                                                    <Form onSubmit={handleSubmit(this.onSubmitSur.bind(this))}>
                                                        <Field name="Users" label="Select Surveyors" type="select_multiple" selectItems={(surveyorData) && surveyorData} component={renderField}/>
                                                        <br/>
                                                        <Button type="submit">Assign</Button>
                                                    </Form>
                                                </div>
                                                :
                                              <div>
                                                  <br/>
                                                  <div className="d-flex justify-content-center">
                                                      <h4>Select Tasks</h4>
                                                  </div>
                                                  <br/>
                                                  <div className="search-bar">
                                                      <TextField
                                                          id="standard-with-placeholder"
                                                          inputRef={this.search_task}
                                                          placeholder="Search Tasks"
                                                      />
                                                      {' '}
                                                      <Button variant="contained" color="primary" className="mx-sm-15" onClick={() => this.onSearchTasks()}>
                                                          Search
                                                      </Button>
                                                  </div>
                                                  <br/>
                                                  <h5 className="text-muted">Tasks</h5>
                                                  <Scrollbars className="rct-scroll" autoHeight>
                                                      <List className="p-0">
                                                          {tasksData.map(task=>(
                                                              <div key={task.id}>
                                                                  <ListItem button onClick={() => this.onSelectTask(task)}>
                                                                      <ListItemText primary={task.Title} secondary={task.description} />
                                                                  </ListItem>
                                                                  <Divider variant="inset" />
                                                              </div>
                                                          )) }
                                                      </List>
                                                  </Scrollbars>
                                              </div>

                                        :
                                        <div>
                                            <Alert color="warning">
                                                Sorry no surveyors found to assign for this department: {selectedDept.DepartmentName}
                                            </Alert>
                                            <Button component={Link} to="/app/users/user-management/create-user" variant="contained" color="primary" className="mx-sm-15 text-white">Add Here</Button>
                                        </div>}
                                        <br/>
                                    </div>
                                    :
                                    <div>
                                        <h4 className="text-yellow">Select Department to continue</h4>
                                        <br/>
                                        <div className="search-bar">
                                            <TextField
                                                id="standard-with-placeholder"
                                                inputRef={this.search_dept}
                                                placeholder="Search Department"
                                            />
                                            {' '}
                                            <Button variant="contained" color="primary" className="mx-sm-15" onClick={() => this.onSearchDept()}>
                                                Search
                                            </Button>
                                        </div>
                                        <br/>
                                        <h5 className="text-muted">Departments</h5>
                                        <Scrollbars className="rct-scroll" autoHeight>
                                            <List className="p-0">
                                                {departmentData.map(dept=>(
                                                    <div key={dept.id}>
                                                        <ListItem button onClick={() => this.onSelectDept(dept)}>
                                                            <ListItemText primary={dept.DepartmentName} secondary="Select Department" />
                                                        </ListItem>
                                                        <Divider variant="inset" />
                                                    </div>
                                                )) }
                                            </List>
                                        </Scrollbars>
                                        <br/>
                                    </div>
                                    :
                                    <div className="container">
                                        <br/>
                                        <div className="search-bar">
                                            <TextField
                                                id="standard-with-placeholder"
                                                inputRef={this.search_dept}
                                                placeholder="Search Department"
                                            />
                                            {' '}
                                            <Button variant="contained" color="primary" className="mx-sm-15" onClick={() => this.onSearchDept()}>
                                                Search
                                            </Button>
                                        </div>
                                        <br/>
                                        <Alert color="warning">
                                            Sorry no department found for {this.search_dept.current && `${this.search_dept.current.value}`}
                                        </Alert>
                                        <br/>
                                    </div>

                            }
                        </div>
                        :
                        <div>
                            <div className="container">
                                <br/>
                                <Alert color="warning">
                                    No Tasks found. Refresh or Add task by clicking below
                                </Alert>
                                <div className="d-flex justify-content-center">
                                    <Button onClick={() => this.props.history.push('/app/tasks/create-task')} color="primary">ADD HERE</Button>
                                </div>
                               <br/>
                            </div>

                        </div>
                    }
                    {loading && <RctSectionLoader/>}
                    {deptLoading && <RctSectionLoader/>}
                </RctCollapsibleCard>
            </div>
        );
    }
}
export default reduxForm({form:'assignSurveyorForm'})(withRouter(connect(mapStateToProps,mapDispatchToProps)(AssignTask)));


