import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import SubjectListComponents from "./SubjectEducationComponents/index";
import PlanningComponents from './PlanningComponents/index';
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { api } from "Api";

const { TabPane } = Tabs;

const EducationProgramDetail = (props) => {
  
  const [loading, setLoading] = useState(true);

  const [educationProgram, setEducationProgram] = useState(null);

  useEffect(() => {
    api
      .get(
        `/education-programs/${props.educationProgram.educationProgramId}`,
        true
      )
      .then((res) => {
        setEducationProgram(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (loading) {
    return (
      <>
        <RctPageLoader />
      </>
    );
  }

  return (
    <>
      <Tabs type="card" animated={{ inkBar: true, tabPane: false }}>
        <TabPane tab="Danh Sách Học Phần" key="1">
          <SubjectListComponents educationProgram={educationProgram} />
        </TabPane>
        <TabPane tab="Kế Hoạch Đào tạo" key="2">
          <PlanningComponents  educationProgram={educationProgram}/>
        </TabPane>
      </Tabs>
    </>
  );
};

export default EducationProgramDetail;
