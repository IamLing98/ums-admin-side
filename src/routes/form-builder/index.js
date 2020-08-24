import {Helmet} from "react-helmet";
import {Redirect, Route, Switch} from "react-router-dom";

import React from "react";
import {AsyncFormBuilderComponent} from "Components/AsyncComponent/AsyncComponent";

const FormBuilder = ({ match }) => (
    <div className="content-wrapper">
        <Helmet>
            <title>Polucon | Form-Builder</title>
            <meta name="description" content="Reactify Maps" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/create-form`} />
            <Route path={`${match.url}/create-form`} component={AsyncFormBuilderComponent} />

        </Switch>
    </div>
);

export default FormBuilder;
