import React from "react";
import { Helmet } from "react-helmet";
import { Redirect, Route, Switch } from "react-router-dom";
import { AsyncModuleComponent, AsyncProgramsComponent } from "Components/AsyncComponent/AsyncComponent";

const EducationProgram = ({ match }) => (
    <div className="content-wrapper">
        <Helmet>
            <title>Chương Trình Đào Tạo</title>
            <meta name="description" content="Danh Mục Học Phần" />
        </Helmet>
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/module`} />
            <Route path={`${match.url}/module`} component={AsyncModuleComponent} />
            <Route path={`${match.url}/programs`} component={AsyncProgramsComponent} />
        </Switch>
    </div>
);

export default EducationProgram;
