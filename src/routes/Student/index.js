/**
 * Users Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
     
    AsyncStudentComponent,
} from 'Components/AsyncComponent/AsyncComponent';

const Students = ({ match }) => {
    return (

        <div className="content-wrapper">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/students`} />
                <Route path={`${match.url}/students`} component={AsyncStudentComponent} /> 
            </Switch>
        </div>
    )
};

export default Students;
