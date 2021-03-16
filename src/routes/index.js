import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";

// async components
import {
  AsyncSubjectsComponent,
  AsyncEducationProgramsComponent,
  AsyncStudentComponent,
  AsyncYearClassComponent,
  AsyncScheduleComponent,
  AsyncTeachersComponent,
  AsyncResultComponent,
} from "Components/AsyncComponent/AsyncComponent";

//config routes
import { AsyncRoomConfigComponent } from "Components/AsyncComponent/AsyncComponent";

//finace routes
import {
  AsyncFeeCategoriesComponent,
  AsyncTuiTionFeeComponent,
  AsyncAdminEmployeeComponent,
  AsyncDepartmentComponent,
  AsyncSalaryComponent,
} from "Components/AsyncComponent/AsyncComponent";

export const FinanceRoutes = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/finance`} />
        <Route path={`${match.url}/tuitionfee`} component={AsyncTuiTionFeeComponent} />
        <Route
          path={`${match.url}/feecategories`}
          component={AsyncFeeCategoriesComponent}
        />
        <Route path={`${match.url}/salary`} component={AsyncSalaryComponent} /> 
        <Route path={`${match.url}/time`} component={AsyncYearClassComponent} />
        <Route path={`${match.url}/employees`} component={AsyncAdminEmployeeComponent} />
      </Switch>
    </div>
  );
};

export const ConfigRoutes = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/branchs`} />
        <Route path={`${match.url}/branchs`} component={AsyncYearClassComponent} />
        <Route path={`${match.url}/rooms`} component={AsyncRoomConfigComponent} />
        <Route path={`${match.url}/time`} component={AsyncYearClassComponent} />
      </Switch>
    </div>
  );
};

export const DashboardRoutes = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
      </Switch>
    </div>
  );
};
export const EducationRoutes = ({ match }) => {
  return (
    <div className="content-wrapper">
      <Switch>
        <Redirect exact from={`${match.url}/`} to={`${match.url}/education-programs`} />
        <Route
          path={`${match.url}/education-programs`}
          component={AsyncEducationProgramsComponent}
        />
        <Route path={`${match.url}/subjects`} component={AsyncSubjectsComponent} />
        <Route path={`${match.url}/students`} component={AsyncStudentComponent} />
        <Route path={`${match.url}/teachers`} component={AsyncTeachersComponent} />
        <Route path={`${match.url}/yearclasses`} component={AsyncYearClassComponent} />
        <Route path={`${match.url}/results`} component={AsyncResultComponent} />
        <Route path={`${match.url}/schedule`} component={AsyncScheduleComponent} />
      </Switch>
    </div>
  );
};

export default { EducationRoutes, ConfigRoutes };
