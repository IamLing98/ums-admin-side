import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import { AsyncSubjectsComponent,AsyncEducationProgramsComponent } from "Components/AsyncComponent/AsyncComponent"; 

const EducationProgramsHome = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/education-programs`} />
        <Route
          path={`${match.url}/education-programs`}
          component={AsyncEducationProgramsComponent}
        />
                <Route
          path={`${match.url}/subjects`}
          component={AsyncSubjectsComponent}
        />
      </Switch>
    </div>
  );
};

export default EducationProgramsHome;
