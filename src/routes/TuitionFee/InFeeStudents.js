import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
// import StudentImport from './Import';
import { Col, Row } from "reactstrap";
import moment from "moment";
import { ArrowLeftOutlined, ArrowRightOutlined, SettingOutlined } from "@ant-design/icons";
import { Button, Tabs, Select, Spin } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import InFeeStudentList from "./StudentFeeComponents/InFeeStudentList";
import InFeeReceiptsCreate from "./StudentFeeComponents/InFeeReceiptsCreate";
import OutFeeReceiptsCreate from "./StudentFeeComponents/OutFeeReceiptsCreate";
import BillListBadge from "../../components/BillList/BillListBadge";
import BillList from "./StudentFeeComponents/BillList";
import Setting from "./StudentFeeComponents/Setting";

const { TabPane } = Tabs;

const StudentsFee = (props) => {
  const [studentInvoiceList, setStudentInvoicesList] = useState([]);

  const [studentList, setStudentList] = useState([]);

  const [showInFeeReceiptsCreate, setShowInFeeReceiptsCreate] = useState(false);

  const [showOutFeeReceiptsCreate, setShowOutFeeReceiptsCreate] = useState(false);

  const [showSettingModal, setShowSettingModal] = useState(false);

  const [recordFoundNumber, setRecordFoundNumber] = useState(0);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [loading, setLoading] = useState(true);

  const [feeCategoryList, setFeeCategoryList] = useState([]);

  const [termList, setTermList] = useState([]);

  const [selectedTerm, setSelectedTerm] = useState(undefined);

  const [term, setTerm] = useState(undefined);

  const [studentInvoiceType, setStudentInvoiceType] = useState(null);

  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err("Did you forget something? Please activate your account");
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const handleSettingTerm = (values) => {
    values.actionType = "STFT";
    api.put(`/terms`, values).then((response) => {
      NotificationManager.success("Cài đặt thành công!!!").catch((err) => {
        showErrNoti(err);
      });
    });
    setShowSettingModal(false);
  };

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

  const getStudentInvoiceList = (termId, type) => {
    api
      .get(`/studentInvoices/${termId}${type !== null ? "?type=" + type : ""}`)
      .then((response) => {
        setStudentInvoicesList(response);
        setLoading(false);
      })
      .catch((error) => {console.log(error);});
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
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getTermDetail = (id) => {
    api
      .get(`/terms/${id}`)
      .then((res) => {
        setTerm(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getTermList();
    getFeeCategoryList();
    getStudentList();
  }, []);

  useEffect(() => {
    if (selectedTerm) {
      getTermDetail(selectedTerm);
    }
  }, [selectedTerm]);

  useEffect(() => {
    if (selectedTerm) {
      getStudentInvoiceList(selectedTerm, studentInvoiceType);
    }
  }, [selectedTerm, studentInvoiceType]);
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
              onSelect={(value) => {
                console.log(value);
                setSelectedTerm(value);
              }}
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
              <ArrowRightOutlined />
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
              <ArrowLeftOutlined />
              Tạo Phiếu Chi
            </Button>
            <Button
              style={{
                background: "#448AE2",
                borderColor: "#448AE2",
                width: "180px",
              }}
              type="primary"
              onClick={() => setShowSettingModal(true)}
            >
              <SettingOutlined />
              <span>Cài đặt</span>
            </Button>
            <Setting
              visible={showSettingModal}
              term={term}
              handleSettingTerm={handleSettingTerm}
              onCancel={() => setShowSettingModal(false)}
            />
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "15px" }}>
        <Col md={4}>
          <BillListBadge
            style={{ background: "#ff7f2c" }}
            number={term ? term.inFeeTotalValue : 0}
            text="Tổng thu đầu kỳ đến hiện tại"
          />
        </Col>
        <Col md={4}>
          <BillListBadge
            style={{ background: "#00a9f2" }}
            number={term ? term.outFeeTotalValue : 0}
            text="Tổng chi đầu kỳ đến hiện tại"
          />
        </Col>
        <Col md={4}>
          <BillListBadge
            style={{ background: "#74cb2f" }}
            number={term ? term.inFeeTotalValue - term.outFeeTotalValue : 0}
            text="Tồn quỹ hiện tại"
          />
        </Col>
      </Row>
      <Tabs
        type="card"
        onChange={(value) => {
          if (value === "1") {
            setStudentInvoiceType(null);
          } else {
            setStudentInvoiceType(parseInt(value) - 2);
          }
        }}
      >
        <TabPane tab="Tất cả" key="1">
          <BillList
            data={studentInvoiceList}
            feeCategoryList={feeCategoryList}
            setShowInFeeReceiptsCreate={setShowInFeeReceiptsCreate}
          />
        </TabPane>
        <TabPane tab="Phiếu thu" key="2">
          <BillList
            data={studentInvoiceList}
            feeCategoryList={feeCategoryList}
            setShowInFeeReceiptsCreate={setShowInFeeReceiptsCreate}
          />
        </TabPane>
        <TabPane tab="Phiếu chi" key="3">
          <BillList
            data={studentInvoiceList}
            feeCategoryList={feeCategoryList}
            setShowInFeeReceiptsCreate={setShowInFeeReceiptsCreate}
          />
        </TabPane>
      </Tabs>

      <InFeeReceiptsCreate
        studentList={studentList}
        onCancel={setShowInFeeReceiptsCreate}
        visible={showInFeeReceiptsCreate}
        selectedTerm={selectedTerm}
        getStudentInvoiceList={getStudentInvoiceList}
        getTermDetail={getTermDetail}
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
