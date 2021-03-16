import { api } from "Api";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
// import StudentImport from './Import';
import { Col, Row } from "reactstrap";
import moment from "moment";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  SettingOutlined,
  ExclamationCircleOutlined,
  ImportOutlined,
  ExportOutlined,
  PlusOutlined
} from "@ant-design/icons";
import { Button, Tabs, Select, Spin, Modal } from "antd";
import SalaryTableList from "./SalaryTableComponents/SalaryTableList.js";
import SalaryTableCreate from "./SalaryTableComponents/SalaryTableCreate";

const SalaryTable = (props) => {
  const [loading, setLoading] = useState(false);

  const [showSalaryTableCreate, setShowSalaryTableCreate] = useState(false);

  const [contractList, setSalaryTableList] = useState([]);

  const [employeeList, setEmployeeList] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

  const showErrNoti = (err) => {
    NotificationManager.err(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err("Did you forget something? Please activate your account");
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const onSelectRow = (record) => {
    let newArr = [];
    studentInvoiceList.map((item) => {
      if (item.invoiceNo === record.invoiceNo) {
        newArr.push({ ...item, isSelecting: true });
      } else {
        newArr.push({ ...item, isSelecting: false });
      }
    });
    setStudentInvoicesList([...newArr]);
    setShowInvoiceDetail(record);
  };

  const onDeselectRow = (record) => {
    let newArr = [];
    studentInvoiceList.map((item) => {
      newArr.push({ ...item, isSelecting: false });
    });
    setStudentInvoicesList([...newArr]);
    setShowInvoiceDetail(null);
  };

  const getEmployeeList = () => {
    api
      .get("/employee?type=1", true)
      .then((res) => {
        setEmployeeList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getDepartmentList = () => {
    api
      .get(`/departments`)
      .then((res) => {
        setDepartmentList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getSalaryTableList = () => {
    api
      .get(`/contracts`)
      .then((res) => {
        setSalaryTableList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleCreateSalaryTable = (values) => {
    api
      .post(`/contracts`, values)
      .then((res) => {
        setShowSalaryTableCreate(false);
        NotificationManager.success("Tạo mới hợp đồng thành công");
        getSalaryTableList();
      })
      .catch((err) => showErrNoti(err));
  };

  useEffect(() => {
    getEmployeeList();
    getDepartmentList();
    getSalaryTableList();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row>
        <Col md={12} sm={12} xs={12}>
          <div
            className="tableListOperator"
            style={{ textAlign: "right", width: "100%" }}
          >
            <Button
              style={{
                background: "#448AE2",
                borderColor: "#448AE2",
                width: "180px",
              }}
              type="primary"
              onClick={() => {
                setShowSalaryTableCreate(true);
              }}
            >
              <PlusOutlined />
              Tạo Bảng Lương
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
          </div>
        </Col>
      </Row>
      <SalaryTableList
        data={contractList}
        onSelectRow={onSelectRow}
        onDeselectRow={onDeselectRow}
        setShowSalaryTableCreate={setShowSalaryTableCreate}
      />

      <SalaryTableCreate
        visible={showSalaryTableCreate}
        setShowSalaryTableCreate={setShowSalaryTableCreate}
        employeeList={employeeList}
        departmentList={departmentList}
        handleCreateSalaryTable={handleCreateSalaryTable}
      />
      {/*
      <OutFeeReceiptsCreate
        onCancel={setShowOutFeeReceiptsCreate}
        visible={showOutFeeReceiptsCreate}
        selectedTerm={selectedTerm}
      />

      <InvoiceDetail
        visible={showInvoiceDetail}
        onDeselectRow={onDeselectRow}
        handlePrintStudentInvoice={handlePrintStudentInvoice}
      />

      {showInvoicePrint && (
        <InvoicePrint
          visible={showInvoicePrint}
          filePrintName={filePrintName}
          onCancel={setShowInvoicePrint}
        />
      )} */}
    </Spin>
  );
};

export default SalaryTable;
