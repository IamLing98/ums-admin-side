/**
 * Class Dashboard
 */

import { getDepartmentList } from "Actions/DepartmentActions"; 
import { Tabs } from "antd";
import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux"; 
import YearClassList from "Routes/Class/Components/YearClassList";
const { TabPane } = Tabs;

export const ClassHome = (props) => {
  const [tabChange, setChangeTab] = useState(false);

  useEffect(() => {
    // get list branch
    api
      .get("/department/getAll", true)
      .then((res) => {
        props.getDepartmentList(res);
      })
      .catch((err) => {
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  }, []);

  return (
    <div className="data-table-wrapper">
      <Helmet>
        <title>Danh Sách Lớp</title>
        <meta name="description" content="User Profile" />
      </Helmet> 
      <YearClassList />
    </div>
  );
};

const mapStateToProps = ({}) => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    getDepartmentList,
  }
)(ClassHome);
