import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import SubjectListComponents from "./SubjectEducationComponents/index";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { TabPane } = Tabs;

const EducationProgramDetail = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 300);
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
          <SubjectListComponents educationProgram={props.educationProgram} />
        </TabPane>
        <TabPane tab="Kế Hoạch Đào tạo" key="2">
          {/* <Planning detail={detail}/> */}
        </TabPane>
      </Tabs>
    </>
  );
};

export default EducationProgramDetail;
