/**
 * Class Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import { AsyncYearClassComponent } from "Components/AsyncComponent/AsyncComponent";
import './style.scss';

const ClassRouter = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/class-list`} />
        <Route
          path={`${match.url}/class-list`}
          component={AsyncYearClassComponent}
        />
        <Route
          path={`${match.url}/admission`}
          component={AsyncYearClassComponent}
        />
      </Switch>
    </div>
  );
};

export default ClassRouter;
