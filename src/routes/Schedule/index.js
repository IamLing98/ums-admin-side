import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import { AsyncScheduleComponent } from "Components/AsyncComponent/AsyncComponent"; 

const ScheduleRouter = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/schedule`} />
        <Route
          path={`${match.url}/schedule`}
          component={AsyncScheduleComponent}
        />
      </Switch>
    </div>
  );
};

export default ScheduleRouter;
