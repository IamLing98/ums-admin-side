import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Tabs } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import TeacherProfile from "./TeacherDetailComponents/TeacherProfile";
import EducationLevel from "./TeacherDetailComponents/EducationLevel";
import WorkTimeline from "./TeacherDetailComponents/WorkTimeline";
import Subject from "./TeacherDetailComponents/Subject";

const { Option } = Select;

const { TabPane } = Tabs;

const TeacherDetail = (props) => {
  const [loading, setLoading] = useState(false);

  const [teacherDetail, setTeacherDetail] = useState(null);

  const getTeacherDetail = (teacherId) => {
    api
      .get(`/employee/${teacherId} `)
      .then((res) => {
        setTeacherDetail(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.record) {
      getTeacherDetail(props.record.employeeId);
    }
  }, [props.record]);

  return (
    <>
      <Drawer
        title="Thông tin giảng viên"
        width={"73%"}
        onClose={() => props.cancelShowDetail(props.record)}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button onClick={() => props.cancelShowDetail(props.record)} style={{ marginRight: 8 }}>
              Quay lại
            </Button>
            <Button onClick={props.onClose} type="primary">
              Đồng ý
            </Button>
          </div>
        }
      >
        {loading === true ? (
          <RctPageLoader />
        ) : (
          <Form layout="vertical" hideRequiredMark>
            <Row gutter={16}>
              <Col span={4}>
                <div className="text-center">
                  <img
                    src={
                      teacherDetail
                        ? teacherDetail.avatar
                          ? teacherDetail.avatar
                          : "data:image/png;base64,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"
                        : "data:image/png;base64,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"
                    }
                    className="avatar img-circle img-thumbnail"
                    alt="avatar"
                  />
                </div>
                <br />
                <ul className="list-group">
                  <li className="list-group-item text-muted">
                    <strong>Thông tin giảng viên</strong> <i className="fa fa-dashboard fa-1x" />
                  </li>
                  <li className="list-group-item text-right">
                    <span className="pull-left">
                      <strong>Mã giảng viên:</strong>
                    </span>{" "}
                    {teacherDetail ? teacherDetail.employeeId : ""}
                  </li>
                </ul>
              </Col>
              <Col span={20}>
                <Tabs defaultActiveKey="1" type="card" size="small">
                  <TabPane tab="Thông tin cá nhân" key="1">
                    <TeacherProfile record={teacherDetail} />
                  </TabPane>
                  <TabPane tab=" Trình độ học vấn" key="2">
                    <EducationLevel record={teacherDetail} />
                  </TabPane>
                  <TabPane tab="Đơn vị công tác" key="3">
                    <WorkTimeline record={teacherDetail} />
                  </TabPane>
                  <TabPane tab="Giảng dạy" key="6">
                    <Subject record={teacherDetail} />
                  </TabPane>
                  <TabPane tab="Khen thưởng" key="4">
                    Content of card tab 3
                  </TabPane>
                  <TabPane tab="Kỷ luật" key="5">
                    Content of card tab 3
                  </TabPane>
                </Tabs>
              </Col>
            </Row>
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default TeacherDetail;
