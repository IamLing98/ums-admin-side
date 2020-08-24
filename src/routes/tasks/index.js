import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import {} from "Components/AsyncComponent/AsyncComponent";
import {AysncTasksApprovedComponent} from "Components/AsyncComponent/AsyncComponent";
import {AysncTasksPendingComponent} from "Components/AsyncComponent/AsyncComponent";
import {AysncTasksRejectedComponent} from "Components/AsyncComponent/AsyncComponent";
import {AysncCreateTaskComponent} from "Components/AsyncComponent/AsyncComponent";
import {AysncAssignTaskComponent} from "Components/AsyncComponent/AsyncComponent";
import {AysncCompletedTaskComponent} from "Components/AsyncComponent/AsyncComponent";
import {AsyncInProgressComponent} from "Components/AsyncComponent/AsyncComponent";
import {AysncClientTaskComponent} from "Components/AsyncComponent/AsyncComponent";


const Tasks = ({match}) =>(

    <div className="dashboard-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/approved`} />
            <Route path={`${match.url}/assign-task`} component={AysncAssignTaskComponent} />
            <Route path={`${match.url}/create-task`} component={AysncCreateTaskComponent} />
            <Route path={`${match.url}/approved`} component={AysncTasksApprovedComponent} />
            <Route path={`${match.url}/pending`} component={AysncTasksPendingComponent} />
            <Route path={`${match.url}/rejected`} component={AysncTasksRejectedComponent} />
            <Route path={`${match.url}/in-progress`} component={AsyncInProgressComponent} />
            <Route path={`${match.url}/completed`} component={AysncCompletedTaskComponent} />
            <Route path={`${match.url}/completed`} component={AysncCompletedTaskComponent} />
            <Route path={`${match.url}/client-tasks`} component={AysncClientTaskComponent} />
        </Switch>
    </div>
);
export default Tasks;
