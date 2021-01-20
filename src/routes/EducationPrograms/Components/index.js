import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import SubjectListComponents from "./SubjectEducationComponents/index";
import PlanningComponents from "./PlanningComponents/index";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { api } from "Api";

const { TabPane } = Tabs;

const EducationProgramDetail = (props) => {
  const [loading, setLoading] = useState(true);

  const [educationProgram, setEducationProgram] = useState(null);

  const [tab, setTab] = useState("1");

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
      <Tabs type="card" onChange={(value) => setTab(value)} animated={{ inkBar: true, tabPane: false }}>
        <TabPane tab="Danh Sách Học Phần" key="1">
          <SubjectListComponents educationProgram={educationProgram} tab={tab} />
        </TabPane>
        <TabPane tab="Kế Hoạch Đào tạo" key="2"> 
          <PlanningComponents educationProgram={educationProgram} tab={tab} />
        </TabPane> 
      </Tabs>
    </>
  );
};

export default EducationProgramDetail;
