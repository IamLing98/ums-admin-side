/**
 * Users Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
     
     AsyncStudentListComponent,
} from 'Components/AsyncComponent/AsyncComponent';

const Students = ({ match }) => {
    return (

        <div className="content-wrapper">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/students-list`} />
                <Route path={`${match.url}/student-list`} component={AsyncStudentListComponent} />
                <Route path={`${match.url}/admission`} component={AsyncStudentListComponent} />
            </Switch>
        </div>
    )
};

export default Students;
