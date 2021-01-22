import React, { useEffect, useState } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  Tabs,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import StudentProfile from "./StudentDetailComponents/StudentProfile";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { Option } = Select;

const { TabPane } = Tabs;

const StudentDetail = (props) => {
  const [loading, setLoading] = useState(true);

  const [studentDetail, setStudentDetail] = useState(null);

  const getStudentDetail = (studentId) => {
    api
      .get(`/students/${studentId}`)
      .then((res) => {
        setStudentDetail(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.record) {
      getStudentDetail(props.record.studentId);
    }
  }, [props.record]);

  return (
    <>
      <Drawer
        title="Thông tin sinh viên"
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
            <Button
              onClick={() => props.cancelShowDetail(props.record)}
              style={{ marginRight: 8 }}
            >
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
                    src="http://ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    className="avatar img-circle img-thumbnail"
                    alt="avatar"
                  />
                </div>
                <br />
                <ul className="list-group">
                  <li className="list-group-item text-muted">
                    <strong>Thông tin sinh viên</strong>{" "}
                    <i className="fa fa-dashboard fa-1x" />
                  </li>
                  <li className="list-group-item text-right">
                    <span className="pull-left">
                      <strong>Mã sinh viên:</strong>
                    </span>{" "}
                    125
                  </li>
                  <li className="list-group-item text-right">
                    <span className="pull-left">
                      <strong>Lớp:</strong>
                    </span>{" "}
                    13
                  </li>
                  <li className="list-group-item text-right">
                    <span className="pull-left">
                      <strong>CTĐT:</strong>
                    </span>{" "}
                    37
                  </li>
                </ul>
              </Col>
              <Col span={20}>
                <Tabs defaultActiveKey="1" type="card" size="small">
                  <TabPane tab="Sơ Yếu Lý Lịch" key="1">
                    <StudentProfile record={props.record} />
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
          </Form>
        )}
      </Drawer>
    </>
  );
};

export default StudentDetail;
