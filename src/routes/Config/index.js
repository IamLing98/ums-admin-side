/**
 * Class Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import { AsyncYearClassComponent } from "Components/AsyncComponent/AsyncComponent"; 
const ConfigRouter = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/config/branch`} />
        <Route
          path={`${match.url}/config/branch`}
          component={AsyncYearClassComponent}
        />
        <Route path={`${match.url}/config/branch`} component={AsyncYearClassComponent} />
      </Switch>
    </div>
  );
};

export default ConfigRouter;
