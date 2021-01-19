import { api } from "Api";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  DiffOutlined,
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import SubjectList from "./SubjectList";
import AddSubjectModal from './AddSubject';

export const SubjectEducationHome = (props) => { 

  const [showAddModal, setShowAddModal] = useState(false);

  const [showChangeModal, setShowModalChange] = useState(false); 

  const [recordChange, setRecordChange] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSearch = () => {};

  const showErrNoti = (err) => {
    NotificationManager.err(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err(
        "Did you forget something? Please activate your account"
      );
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  }; 

  const getDepartmentList = () => {
    api
      .get("/departments", true)
      .then((res) => {
        setDepartmentList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleSubmitForm = (values) => {
    api
      .post("/subjects", values, true)
      .then((res) => {
        NotificationManager.success(`Tạo mới ${res} học phần.`);
        getSubjectList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
    setShowModalCreate(false);
  };

  const handleDeleteRecord = (values) => {
    api
      .delete(
        `/subjects?${values.map((value, index) => `ids=${value}`).join("&")}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getSubjectList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleDeleteMultipleRecord = (values) => {
    api
      .delete(
        `/subjects?${values.map((value, index) => `ids=${value}`).join("&")}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getSubjectList();
        setSelectedRowKeys([]);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  useEffect(() => {}, []);

  return (
    <>
      <Row>
        <Col
          md={6}
          sm={12}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Row>
            <Col md={4}>
              <Input placeholder="Mã Học Phần..." size="middle" />
            </Col>
            <Col md={4}>
              <Input placeholder="Tên Học Phần..." size="middle" />
            </Col>
            <Col md={4} style={{ display: "block", flexDirection: "column" }}>
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                onClick={() => onSearch()}
              >
                <SearchOutlined />
                <span>Tìm Kiếm</span>
              </button>
            </Col>
          </Row>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <div
            className="tableListOperator"
            style={{ textAlign: "right", width: "100%" }}
          >
          <Button
            type="primary"
            style={{
              background: "#448AE2",
              borderColor: "#448AE2",
              width: "122px",
            }}
            onClick={() => setShowAddModal(true)}
          >
            <PlusOutlined></PlusOutlined>
            <span>Thêm </span>
          </Button>
            <Button
              type="primary"
              style={
                selectedRowKeys.length > 0
                  ? {
                      background: "#DC0000",
                      borderColor: "#DC0000",
                      color: "wheat",
                      width: "122px",
                    }
                  : {}
              }
              disabled={selectedRowKeys.length > 0 ? false : true}
              onClick={() => handleDeleteMultipleRecord(selectedRowKeys)}
            >
              <DeleteOutlined />
              <span>Xoá Nhiều</span>
            </Button>
          </div>
        </Col>
      </Row>
      <SubjectList
        handleDeleteRecord={handleDeleteRecord}
        data={props.educationProgram.subjectList}
        setRecordChange={setRecordChange}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />
      {/* 
        <SubjectCreate
          visible={showModalCreate}
          setShowModalCreate={setShowModalCreate}
          getSubjectList={getSubjectList}
          departmentList={departmentList}
          subjectList={subjectList}
          handleSubmitForm={handleSubmitForm}
          // options={prerequisitesSubject}
        />

        <SubjecUpdate
          visible={recordUpdate}
          setRecordUpdate={setRecordUpdate}
          record={recordUpdate}
          subjectList={subjectList}
          departmentList={departmentList}
          getSubjectList={getSubjectList}
          // options={prerequisitesSubject}
        />
        <SubjectImport
          visible={showModalImport}
          setShowModalImport={setShowModalImport}
          setRecordUpdate={setRecordUpdate}
          record={recordUpdate}
          subjectList={subjectList}
          departmentList={departmentList}
          getSubjectList={getSubjectList}
          // options={prerequisitesSubject}
        /> */}
    </>
  );
};

export default SubjectEducationHome;
