import React, { useEffect, useState } from "react";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  DeleteFilled,
  EditFilled,
  RetweetOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DiffOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Table,
  Tag,
  Tabs,
  Space,
  Button,
  Popconfirm,
  Alert,
  Input,
  Descriptions,
} from "antd";
import StudentProfile from "Routes/Class/Components/StudentDetailsComponents/StudentProfile";
import { Row, Col } from "antd";
const { TabPane } = Tabs;

const defaultRecord = {
  branchId: "",
  branchName: "",
  educationProgramId: "",
  educationProgramLevel: "3",
  educationProgramName: "",
  educationProgramStatus: "",
  educationProgramType: "",
};

const StudentDetails = (props) => {
  const size = "small";
  return (
    <>
      <hr style={{ margin: "0px" }} />
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
              <TabPane  tab="Hồ Sơ Lý Lịch" key="1">
                <StudentProfile record = {props.record} />
              </TabPane>
              <TabPane tab="Thông Tin Gia Đình" key="2">
                Content of card tab 2
              </TabPane>
              <TabPane tab="Kết Quả Học Tập" key="3">
                Content of card tab 3
              </TabPane>
              <TabPane tab="Khen Thưởng" key="4">
                Content of card tab 3
              </TabPane>
              <TabPane tab="Kỷ Luật" key="5">
                Content of card tab 3
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default StudentDetails;
