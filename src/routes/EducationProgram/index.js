/**
 * Education Program Routes
 */
/* eslint-disable */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// async components
import {
     AsyncClientListComponent,
      AsyncSurveyorListComponent,
} from 'Components/AsyncComponent/AsyncComponent';

const EducationProgram = ({ match }) => {
    return (

        <div className="content-wrapper">
            <Switch>
                <Redirect exact from={`${match.url}/`} to={`${match.url}/module`} />
                <Route path={`${match.url}/module`} component={AsyncClientListComponent} />
            </Switch>
        </div>
    )
};

export default EducationProgram;
