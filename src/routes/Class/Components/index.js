/**
 * Class Dashboard
 */

import React, { useState, useEffect } from "react";
// page title bar
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import { api } from "Api";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { getDepartmentList } from "Actions/DepartmentActions";
import { NotificationManager } from "react-notifications";
import YearClassList from "Routes/Class/Components/YearClassList";
import StudentList from "Routes/Class/Components/StudentList";

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
        console.log(err);
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
      <StickyContainer>
        <Tabs
          defaultActiveKey="2"
          renderTabBar={renderTabBar}
          onChange={() => setChangeTab((value) => (value = !value))}
        >
          <TabPane tab="Danh Sách Tổng Hợp" key="2">
            <StudentList tabIsChange={tabChange} />
          </TabPane>
          <TabPane tab="Danh Sách Lớp Sinh Viên" key="1">
            <YearClassList />
          </TabPane>
        </Tabs>
      </StickyContainer>
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
