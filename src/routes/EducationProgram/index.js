import React from "react";
import { Helmet } from "react-helmet";
import { Redirect, Route, Switch } from "react-router-dom";
import {
  AsyncEducationProgramComponent,
  AsyncEducationProgramDetailComponent,
} from "Components/AsyncComponent/AsyncComponent";

const EducationProgram = ({ match }) => (
  <div className="content-wrapper" style={{ minHeight: "860px" }}>
    <Helmet>
      <title>Chương Trình Đào Tạo</title>
      <meta name="description" content="Danh Mục Học Phần" />
    </Helmet>
    <Switch>
      <Redirect exact from={`${match.url}/`} to={`${match.url}/programs`} />
      <Route
        path={`${match.url}/programs/details/:id`}
        component={AsyncEducationProgramDetailComponent}
      />
      <Route
        path={`${match.url}/programs`}
        component={AsyncEducationProgramComponent}
      />
    </Switch>
  </div>
);

export default EducationProgram;
