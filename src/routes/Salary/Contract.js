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
} from "@ant-design/icons";
import { Button, Tabs, Select, Spin, Modal } from "antd";
import ContractList from "./ContractComponents/ContractList.js";
import ContractCreate from "./ContractComponents/ContractCreate.js";

const Contract = (props) => {
  const [contractList, setContractList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [showContractCreate, setShowContractCreate] = useState(false);

  const [employeeList, setEmployeeList] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

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

  useEffect(() => {
    getEmployeeList();
    getDepartmentList();
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
                setShowContractCreate(true);
              }}
            >
              <ArrowRightOutlined />
              Tạo Hợp Đồng
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
      <ContractList
        data={contractList}
        onSelectRow={onSelectRow}
        onDeselectRow={onDeselectRow}
        setShowContractCreate={setShowContractCreate}
      />

      <ContractCreate
        visible={showContractCreate}
        setShowContractCreate={setShowContractCreate}
        employeeList={employeeList}
        departmentList={departmentList}
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

export default Contract;
