import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import {
  AsyncSubjectsComponent,
  AsyncEducationProgramsComponent,
  AsyncStudentComponent,
} from "Components/AsyncComponent/AsyncComponent";

export const EducationRoutes = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect
          exact
          from={`${match.url}/`}
          to={`${match.url}/education-programs`}
        />
        <Route
          path={`${match.url}/education-programs`}
          component={AsyncEducationProgramsComponent}
        />
        <Route
          path={`${match.url}/subjects`}
          component={AsyncSubjectsComponent}
        />
        <Route
          path={`${match.url}/students`}
          component={AsyncStudentComponent}
        />
      </Switch>
    </div>
  );
};

export default EducationRoutes;
