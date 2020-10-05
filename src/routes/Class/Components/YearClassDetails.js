import React, { useEffect, useState } from "react";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import { Tabs } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import StudentList from "Routes/Class/Components/YearClassDetailsComponents/StudentList";
import SubjectList from "Routes/Class/Components/YearClassDetailsComponents/SubjectList";

const { TabPane } = Tabs;

const YearClassDetails = (props) => {
  const [details, setDetails] = useState(null);

  const [render, setRerender] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/yearClasses/details?classId=" + props.record.classId, true)
      .then((response) => {
        setDetails(response);
        setLoading(false);
      })
      .catch((error) => {
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
 
  }, []);

 
  if (loading === true ) {
    return <RctPageLoader />;
  } else
    return (
      <>
        <hr style={{ margin: "0px" }} />
        <div className="table-responsive">
          <Tabs onChange={() => {}} type="card"  animated={{inkBar: true, tabPane: false}}>
            <TabPane tab="Danh Sách Sinh Viên" key="1" >
              <StudentList details={details} />
            </TabPane>
            <TabPane tab="Chương Trình Đào Tạo" key="2" >
              <SubjectList detail={details.educationProgram} />
            </TabPane>
            <TabPane tab="Giáo Viên Chủ Nhiệm" key="3">
              Content of Tab Pane 3
            </TabPane>
            <TabPane tab="Cán Bộ Lớp" key="4">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </>
    );
};

export default YearClassDetails;
