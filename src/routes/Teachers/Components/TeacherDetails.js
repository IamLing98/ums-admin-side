import { Col, Row, Tabs } from "antd";
import { api } from "Api";
import TeacherProfile from 'Routes/Teachers/Components/TeacherProfileTab'
import React, { useEffect, useState } from "react"; 

const { TabPane } = Tabs;

const TeacherDetails = (props) => {
  const [record, setRecord] = useState(null);

  useEffect(() => {
    api
      .get("/students/details?studentId=" + props.record.studentId, true)
      .then((response) => {
        setRecord(response);
      });
  }, []);
  const size = "small";
  return (
    <> 
      <div className="wrapper-student" style={{ marginTop: "15px" }}>
        <Row style={{ padding: " 0.3rem 1.25rem" }}>
          <Col span={4}>
            <div className="text-center">
              <img
                src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                className="avatar img-circle img-thumbnail"
                alt="avatar"
              />
            </div>
            <br />

            <ul className="list-group">
              <li className="list-group-item text-muted">
                Activity <i className="fa fa-dashboard fa-1x" />
              </li>
              <li className="list-group-item text-right">
                <span className="pull-left">
                  <strong>Shares</strong>
                </span>{" "}
                125
              </li>
              <li className="list-group-item text-right">
                <span className="pull-left">
                  <strong>Likes</strong>
                </span>{" "}
                13
              </li>
              <li className="list-group-item text-right">
                <span className="pull-left">
                  <strong>Posts</strong>
                </span>{" "}
                37
              </li>
              <li className="list-group-item text-right">
                <span className="pull-left">
                  <strong>Followers</strong>
                </span>{" "}
                78
              </li>
            </ul>
          </Col>
          <Col span={20}>
            <Tabs defaultActiveKey="1" type="card" size={size}>
              <TabPane tab="Sơ Yếu Lý Lịch" key="1">
                <TeacherProfile  record={record} />
              </TabPane>
              <TabPane tab="Trình độ học vấn" key="2">
                Content of card tab 2
              </TabPane>
              <TabPane tab="Quá Trình Công Tác" key="3">
                Content of card tab 3
              </TabPane>
              <TabPane tab="Nghiên Cứu Khoa Học" key="4">
                Content of card tab 3
              </TabPane> 
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default TeacherDetails;
