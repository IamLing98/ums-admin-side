/**
 * Module Dashboard
 */

import React, { useState, useEffect } from "react";
// page title bar
import { Tabs } from "antd";
import { StickyContainer, Sticky } from "react-sticky";
import { api } from "Api";
import EducationProgramList from "Routes/EducationProgram/Programs/Components/EducationProgramList";
import SubjectList from "Routes/EducationProgram/Programs/Components/SubjectList";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import { setListBranch } from "Actions/EducationProgramActions";
import { NotificationManager } from "react-notifications";

const { TabPane } = Tabs;

export const ProgramsHome = (props) => {
  const [tabChange, setChangeTab] = useState(false);

  useEffect(() => {
    // get list branch
    api
      .get("/branches", true)
      .then((res) => {
        props.setListBranch(res);
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
        <title>Chương Trình Đào Tạo</title>
        <meta name="description" content="User Profile" />
      </Helmet>
 
      <Tabs
          onChange={() => {}}
          type="card"
          animated={{ inkBar: true, tabPane: false }}
          onChange={() => setChangeTab((value) => (value = !value))}
        >
          <TabPane tab="Ngành/Chuyên Ngành" key="1">
            <EducationProgramList />
          </TabPane>
          <TabPane tab="Học Phần" key="2">
            <SubjectList tabIsChange={tabChange} />
          </TabPane> 
        </Tabs>
    </div>
  );
};

const mapStateToProps = ({ educationProgram }) => {
  return { educationProgram };
};

export default connect(
  mapStateToProps,
  {
    setListBranch,
  }
)(ProgramsHome);
