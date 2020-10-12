/**
 * Class Routes
 */
/* eslint-disable */
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import { AsyncTeachersComponent } from "Components/AsyncComponent/AsyncComponent";
// import './style.scss';

const TeachersRouter = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/schedule`} />
        <Route
          path={`${match.url}/schedule`}
          component={AsyncTeachersComponent}
        />
      </Switch>
    </div>
  );
};

export default TeachersRouter;