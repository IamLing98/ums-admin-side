import { api } from "Api";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
// import StudentImport from './Import';
import { Col, Row } from "reactstrap";
import moment from "moment";
import { ExportOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Tabs, Select, Spin } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import InFeeStudentList from "./StudentFeeComponents/InFeeStudentList";
import InFeeReceiptsCreate from "./StudentFeeComponents/InFeeReceiptsCreate";
import OutFeeReceiptsCreate from "./StudentFeeComponents/OutFeeReceiptsCreate";
import BillListBadge from "../../components/BillList/BillListBadge";
import BillList from "./StudentFeeComponents/BillList";

const { TabPane } = Tabs;

const StudentsFee = (props) => {
  const [studentList, setStudentList] = useState([]);

  const [showInFeeReceiptsCreate, setShowInFeeReceiptsCreate] = useState(false);

  const [showOutFeeReceiptsCreate, setShowOutFeeReceiptsCreate] = useState(false);

  const [recordFoundNumber, setRecordFoundNumber] = useState(0);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [loading, setLoading] = useState(true);

  const [feeCategoryList, setFeeCategoryList] = useState([]);

  const [termList, setTermList] = useState([]);

  const [selectedTerm, setSelectedTerm] = useState(undefined);

  const getTermList = () => {
    api
      .get("/terms")
      .then((res) => {
        setTermList(res);
        for (var i = 0; i < res.length; i++) {
          if (res[i].status === 3) {
            setSelectedTerm(res[i].id);
          }
        }
      })
      .catch((err) => showNoti(err));
  };

  const getFeeCategoryList = () => {
    api
      .get("/feeCategories")
      .then((res) => {
        setFeeCategoryList(res);
      })
      .catch((err) => showNoti(err));
  };

  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err("Did you forget something? Please activate your account");
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const getStudentList = () => {
    api
      .get("/students", true)
      .then((res) => {
        for (var i = 0; i < res.length; i++) {
          res[i].isSelecting = false;
        }
        setStudentList(res);
        setRecordFoundNumber(res.length);
        setLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  useEffect(() => {
    getTermList();
    getFeeCategoryList();
    getStudentList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col md={3} sm={12} style={{ display: "flex", flexDirection: "column" }}>
          {/* <Alert
                      message={<strong>Tìm thấy {recordFoundNumber} bản ghi</strong>}
                      type="info"
                      style={{ maxHeight: "32px" }}
                    /> */}
        </Col>
        <Col md={9} sm={12} xs={12}>
          <div className="tableListOperator" style={{ textAlign: "right", width: "100%" }}>
            <Select
              allowClear
              placeholder="Kỳ học..."
              showSearch
              style={{
                width: "200px",
                marginRight: "8px",
                textAlign: "left",
              }}
              value={selectedTerm}
            >
              {termList.map((item, index) => {
                return (
                  <Select.Option value={item.id} key={"termOpts" + index}>
                    Học kỳ {item.term} năm {item.year}
                  </Select.Option>
                );
              })}
            </Select>
            <Button
              style={{
                background: "#448AE2",
                borderColor: "#448AE2",
                width: "180px",
              }}
              type="primary"
              onClick={() => {
                setShowInFeeReceiptsCreate(true);
              }}
            >
              <ExportOutlined />
              Tạo Phiếu Thu
            </Button>
            <Button
              style={{
                background: "#448AE2",
                borderColor: "#448AE2",
                width: "180px",
              }}
              type="primary"
              onClick={() => {
                setShowOutFeeReceiptsCreate(true);
              }}
            >
              <ExportOutlined />
              Tạo Phiếu Chi
            </Button>
            <Button
              style={{
                background: "#448AE2",
                borderColor: "#448AE2",
                width: "180px",
              }}
              type="primary"
              onClick={() => setShowModalCreate(true)}
            >
              <PlusOutlined></PlusOutlined>
              <span>Lập Danh Sách</span>
            </Button>
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "15px" }}>
        <Col md={4}>
          <BillListBadge style={{ background: "#ff7f2c" }} number={0} text="Tổng thu đầu kỳ đến hiện tại" />
        </Col>
        <Col md={4}>
          <BillListBadge style={{ background: "#00a9f2" }} number={0} text="Tổng chi đầu kỳ đến hiện tại" />
        </Col>
        <Col md={4}>
          <BillListBadge style={{ background: "#74cb2f" }} number={0} text="Tồn quỹ hiện tại" />
        </Col>
      </Row>
      <Tabs type="card">
        <TabPane tab="Tất cả" key="1">
          <BillList
            data={studentList}
            feeCategoryList={feeCategoryList}
            setShowInFeeReceiptsCreate={setShowInFeeReceiptsCreate}
          />
        </TabPane>
        <TabPane tab="Phiếu thu" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Phiếu chi" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>

      <InFeeReceiptsCreate
        studentList={studentList}
        onCancel={setShowInFeeReceiptsCreate}
        visible={showInFeeReceiptsCreate}
        selectedTerm={selectedTerm}
      />
      <OutFeeReceiptsCreate
        onCancel={setShowOutFeeReceiptsCreate}
        visible={showOutFeeReceiptsCreate}
        selectedTerm={selectedTerm}
      />
    </Spin>
  );
};

export default StudentsFee;
