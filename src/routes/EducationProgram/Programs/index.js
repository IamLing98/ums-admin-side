/**
 * Module Dashboard
 */

import React, { useState, useEffect } from 'react'
// page title bar
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import { api } from 'Api';
import EducationProgramList from 'Routes/EducationProgram/Programs/Components/EducationProgramList';
import ModuleList from 'Routes/EducationProgram/Programs/Components/ModuleList';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import { setListBranch } from "Actions/EducationProgramActions";
import { NotificationManager } from 'react-notifications';

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
    )}
  </Sticky>
);



export const ProgramsHome = (props) => {


  useEffect(() => {

    // get list branch
    api.get("/branch/getAllBranch", true).then(
      res => {
        props.setListBranch(res)
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
        <title>Chương Trình Đào Tạo</title>
        <meta name="description" content="User Profile" />
      </Helmet>
      <StickyContainer>
        <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}>
          <TabPane tab="Ngành/Chuyên Ngành" key="1"  >
            < EducationProgramList  />
          </TabPane>
          <TabPane tab="Học Phần" key="2">
            < ModuleList />
          </TabPane>
        </Tabs>
      </StickyContainer>
    </div>
  )

}

const mapStateToProps = ({ educationProgram }) => {
  return { educationProgram };
};

export default connect(mapStateToProps, {
  setListBranch

})(ProgramsHome); 
