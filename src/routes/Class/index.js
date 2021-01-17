import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import { AsyncYearClassComponent } from "Components/AsyncComponent/AsyncComponent";
import './style.scss';
 
const ClassRouter = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/yearclass`} />
        <Route
          path={`${match.url}/yearclass`}
          component={AsyncYearClassComponent}
        /> 
      </Switch>
 
    </div>
  );
};

export default ClassRouter;
