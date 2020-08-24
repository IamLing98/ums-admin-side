import {Helmet} from "react-helmet";
import {Redirect, Route, Switch} from "react-router-dom";

import React from "react";
import {AsyncInvoicesCreateComponent} from "Components/AsyncComponent/AsyncComponent";

const InvoicesCreate = ({ match }) => (
    <div className="content-wrapper">
        <Helmet>
            <title>Polucon | Invoices</title>
            <meta name="description" content="Reactify Maps" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/create-invoices`} />
            <Route path={`${match.url}/create-invoices`} component={AsyncInvoicesCreateComponent} />
        </Switch>
    </div>
);

export default InvoicesCreate;
