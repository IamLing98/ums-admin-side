/**
 * Class Dashboard
 */

import { getDepartmentList } from "Actions/DepartmentActions";
// page title bar
import { Tabs } from "antd";
import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { Sticky, StickyContainer } from "react-sticky"; 
import YearClassList from "Routes/Class/Components/YearClassList";
const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);

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
