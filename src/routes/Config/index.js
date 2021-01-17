import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import {
  AsyncYearClassComponent,
  AsyncRoomConfigComponent,
} from "Components/AsyncComponent/AsyncComponent";

const ConfigRouter = ({ match }) => {
  console.log("match", match.url);
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/branchs/`} />
        <Route
          path={`${match.url}/branchs`}
          component={AsyncYearClassComponent}
        />
        <Route
          path={`${match.url}/rooms`}
          component={AsyncRoomConfigComponent}
        />

        <Route path={`${match.url}/time`} component={AsyncYearClassComponent} />
      </Switch>
    </div>
  );
};

export default ConfigRouter;
