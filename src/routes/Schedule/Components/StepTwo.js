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
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
  CalendarOutlined,
  FolderViewOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import SubjectClassList from "./StepTwoComponents/SubjectClassList";
import SubjectClassDetail from "./StepTwoComponents/SubjectClassDetail";
import UpdateSubjectClass from "./StepTwoComponents/UpdateSubjectClass";
import ScheduleList from "./StepTwoComponents/ScheduleList";
import ScheduleInfo from "./StepTwoComponents/ScheduleInfo";

import fileSaver from "file-saver";

const StepTwo = (props) => {
  const [subjectClassList, setSubjectClassList] = useState([]);

  const [scheduleList, setScheduleList] = useState([]);

  const [showSubjectClassDetail, setShowSubjectClassDetail] = useState(null);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [toShowListSchedule, setToShowListSchedule] = useState(false);

  const [schedule, setSchedule] = useState(null);

  const [pageStatus, setPageStatus] = useState(1);

  const [loading, setLoading] = useState(true);

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

  const getSubjectClassList = () => {
    api
      .get(`/subjectClasses/${props.term.id}`)
      .then((response) => {
        setSubjectClassList(response);
        setLoading(false);
      })
      .catch((err) => showErrNoti(err));
  };

  const handleDeleteSubjectClass = (values) => {
    api
      .delete(`/subjectClasses/${values.subjectClassId}`)
      .then((response) => {
        getSubjectClassList();
        NotificationManager.success("Xoá lớp học thành công");
      })
      .catch((err) =>  showErrNoti(err));
  };

  const saveFile = () => {
    fileSaver.saveAs(
      process.env.REACT_APP_CLIENT_URL + "/resources/cv.pdf",
      "MyCV.pdf"
    );
  };

  const getListSchedule = () => {
    api
      .get("/schedules?termId=" + props.term.id)
      .then((res) => {
        setScheduleList(res);
        setLoading(false);
      })
      .catch((err) =>  showErrNoti(err));
  };

  const handleCreateSchedule = () => {
    api
      .post("/schedules", props.term.id)
      .then((res) => {
        NotificationManager.success("Tạo thời khoá biểu thành công");
        getListSchedule();
      })
      .catch((err) =>  showErrNoti(err));
  };

  useEffect(() => {
    getSubjectClassList();
    getListSchedule();
  }, []);

  if (loading) {
    return <RctPageLoader />;
  } else {
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

              {scheduleList.length > 0 && pageStatus === 1 && (
                <Button type="primary" onClick={() => setPageStatus(2)}>
                  <FolderViewOutlined />
                  <span>Thời khoá biểu</span>
                </Button>
              )}
              {pageStatus === 2 && (
                <Button type="primary" onClick={() => setPageStatus(1)}>
                  <FolderViewOutlined />
                  <span>Lớp học phần</span>
                </Button>
              )}
              {pageStatus === 1 && (
                <Button type="primary" onClick={() => handleCreateSchedule()}>
                  <CalendarOutlined />
                  <span>Tạo thời khoá biểu</span>
                </Button>
              )}
            </div>
          </Col>
        </Row>
        {pageStatus === 1 ? (
          <>
            <SubjectClassList
              data={subjectClassList}
              setShowSubjectClassDetail={setShowSubjectClassDetail}
              term={props.term}
              setRecordUpdate={setRecordUpdate}
              handleDeleteSubjectClass={handleDeleteSubjectClass}
            />
            <SubjectClassDetail
              visible={showSubjectClassDetail}
              setShowSubjectClassDetail={setShowSubjectClassDetail}
              term={props.term}
            />
            {recordUpdate && (
              <UpdateSubjectClass
                visible={recordUpdate}
                term={props.term}
                recordUpdate={recordUpdate}
                setRecordUpdate={setRecordUpdate}
                getSubjectClassList={getSubjectClassList}
                onCancel={() => {
                  setRecordUpdate(null);
                }}
              />
            )}
          </>
        ) : (
          <>
            <ScheduleList
              data={scheduleList}
              term={props.term}
              setRecordUpdate={setRecordUpdate}
              handleDeleteSubjectClass={handleDeleteSubjectClass}
              setSchedule={setSchedule}
            />
            {schedule && (
              <ScheduleInfo
                term={props.term}
                visible={schedule}
                setSchedule={setSchedule}
              />
            )}
          </>
        )}
      </>
    );
  }
};

export default StepTwo;
