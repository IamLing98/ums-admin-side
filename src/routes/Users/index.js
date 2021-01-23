/**
 * Users Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
    AsyncUsersListComponent,
    AsyncUserProfile1Component,
    AsyncUserProfileComponent,
    AsyncUserManagementCreateUserComponent, AsyncClientListComponent, AsyncSurveyorListComponent,
} from 'Components/AsyncComponent/AsyncComponent';

const Forms = ({ match }) => {
    return (

        <div className="content-wrapper">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/user-profile-1`} />
                <Route path={`${match.url}/client-list`} component={AsyncClientListComponent} />
                <Route path={`${match.url}/surveyor-list`} component={AsyncSurveyorListComponent} />
                <Route path={`${match.url}/user-profile-1`} component={AsyncUserProfile1Component} />
                <Route path={`${match.url}/user-profile`} component={AsyncUserProfileComponent} />
                <Route path={`${match.url}/user-management/create-user`} component={AsyncUserManagementCreateUserComponent} />
            </Switch>
        </div>
    )
};

export default Forms;
