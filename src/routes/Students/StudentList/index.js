/**
 * Student Dashboard
 */

import React, { useState, useEffect } from 'react'
// page title bar
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { api } from 'Api'; 
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { getDepartmentList } from "Actions/DepartmentActions";
import { NotificationManager } from 'react-notifications';

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (

  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);



export const StudentHome = (props) => {

  const [tabChange, setChangeTab] = useState(false);

  useEffect(() => {

    // get list branch
    api.get("/department/getAll", true).then(
      res => {
        props.getDepartmentList(res)
      }
    ).catch(
      err => {
        console.log(err);
        if (error.message === 'Forbidden') {
          NotificationManager.error("Did you forget something? Please activate your account");
        }
        else if (error.message === 'Unauthorized') {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      }
    )
  }, [])

  return (
    <div className="data-table-wrapper">
      <Helmet>
        <title>Danh Sách Sinh Viên</title>
        <meta name="description" content="User Profile" />
      </Helmet>
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar} onChange = {()=> setChangeTab(value => value = !value)}>
          <TabPane tab="Lớp Niên Khoá" key="1"  >
            {/* < EducationProgramList /> */}
          </TabPane>
          <TabPane tab="Lớp Học Phần" key="2"    >
            {/* < SubjectList tabIsChange = {tabChange} /> */}
          </TabPane>
        </Tabs>
      </StickyContainer>
    </div>
  )

}

const mapStateToProps = ({ departmentReducer }) => {
  return { departmentReducer };
};

export default connect(mapStateToProps, {
    getDepartmentList

})(StudentHome); 
