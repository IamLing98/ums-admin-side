import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
} from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
  CalendarOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import SubjectClassList from "./StepTwoComponents/SubjectClassList";
import SubjectClassDetail from "./StepTwoComponents/SubjectClassDetail";
import UpdateSubjectClass from "./StepTwoComponents/UpdateSubjectClass";
import  fileSaver  from 'file-saver';

const StepTwo = (props) => {
  const [subjectClassList, setSubjectClassList] = useState([]);

  const [pageStatus, setPageStatus] = useState(1);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const getSubjectClassList = () => {
    api
      .get(`/subjectClasses/${props.term.id}`)
      .then((response) => {
        setSubjectClassList(response);
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteSubjectClass = (values) => {
    api
      .delete(`/subjectClasses/${values.subjectClassId}`)
      .then((response) => {
        getSubjectClassList();
        NotificationManager.success("Xoá lớp học thành công");
      })
      .catch((err) => console.log(err));
  };

  const saveFile = () => {
    fileSaver.saveAs(
      process.env.REACT_APP_CLIENT_URL + "/resources/cv.pdf",
      "MyCV.pdf"
    );
  }

  const handleCreateSchedule = () => {
    api
      .get("/schedules")
      .then((res) => {
        
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getSubjectClassList();
  }, []);

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
              <Input placeholder="Mã học phần..." size="middle" />
            </Col>
            <Col md={4}>
              <Input placeholder="Tên học phần..." size="middle" />
            </Col>
            <Col md={4} style={{ display: "block", flexDirection: "column" }}>
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                //onClick={() => setShowModalCreate(true)}
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
            {/* <button
                type="button"
                className="ant-btn ant-btn-primary"
                // onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Mở nhiều lớp </span>
              </button>
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                // onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Đăng ký khoá mới </span>
              </button> */}
            <Button type="primary" onClick={() => handleCreateSchedule()}>
              <CalendarOutlined />
              <span>Tạo thời khoá biểu</span>
            </Button>
          </div>
        </Col>
      </Row>
      <SubjectClassList
        data={subjectClassList}
        setPageStatus={setPageStatus}
        term={props.term}
        setRecordUpdate={setRecordUpdate}
        handleDeleteSubjectClass={handleDeleteSubjectClass}
      />
      <SubjectClassDetail
        visible={pageStatus === 2}
        setPageStatus={setPageStatus}
        term={props.term}
      />
      {pageStatus === 3 && (
        <UpdateSubjectClass
          visible={pageStatus === 3}
          setPageStatus={setPageStatus}
          term={props.term}
          recordUpdate={recordUpdate}
          setRecordUpdate={setRecordUpdate}
          getSubjectClassList={getSubjectClassList}
          onCancel={() => {
            setRecordUpdate(null);
            setPageStatus(1);
          }}
        />
      )}
    </>
  );
};

export default StepTwo;
