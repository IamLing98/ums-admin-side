import React, { useState, useEffect } from "react";
import {
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
  Alert,
  Result,
  Card,
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
  SelectOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import SubjectClassList from "./StepTwoComponents/SubjectClassList";
import SubjectClassDetail from "./StepTwoComponents/SubjectClassDetail";
import UpdateSubjectClass from "./StepTwoComponents/UpdateSubjectClass";
import ScheduleList from "./StepTwoComponents/ScheduleList";
import ScheduleInfo from "./StepTwoComponents/ScheduleInfo";
import SubjectClassRegistration from "./StepTwoComponents/SubjectClassRegistrationInfo";

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
      .catch((err) => showErrNoti(err));
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
      .catch((err) => showErrNoti(err));
  };

  const handleCreateSchedule = () => {
    api
      .post("/schedules", props.term.id)
      .then((res) => {
        NotificationManager.success("Tạo thời khoá biểu thành công");
        getListSchedule();
      })
      .catch((err) => showErrNoti(err));
  };

  const handleOpenSubjectClassRegistration = (scheduleId) => {
    let termObj = {};
    termObj.id = props.term.id;
    termObj.progress = 21;
    termObj.actionType = "SCRON";
    termObj.activeSchedule = scheduleId;
    api
      .put(`/terms/${props.term.id}`, termObj)
      .then((res) => {
        setSchedule(null);
        setPageStatus(3);
        NotificationManager.success("Mở đăng ký lớp học phần thành công!!!");
        props.getTermDetail(props.term.id);
      })
      .catch((err) => showErrNoti(err));
  };

  const handleCloseSubjectClassRegistration = () => {
    let termObj = {};
    termObj.id = props.term.id;
    termObj.progress = 22;
    termObj.actionType = "SCROFF"; 
    api
      .put(`/terms/${props.term.id}`, termObj)
      .then((res) => {
        setSchedule(null);
        setPageStatus(3);
        NotificationManager.success("Kết thúc đăng ký học phần!!!");
        props.getTermDetail(props.term.id);
      })
      .catch((err) => showErrNoti(err));
  };

  useEffect(() => {
    getSubjectClassList();
    getListSchedule();
  }, []);

  if (loading) {
    return <RctPageLoader />;
  } else if (props.term.progress === 22) {
    return (
      <>
        <SubjectClassRegistration {...props} />
      </>
    );
  } else {
    return (
      <>
        <Row>
          <Col
            md={6}
            sm={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Row></Row>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className="tableListOperator"
              style={{ textAlign: "right", width: "100%" }}
            >
              {scheduleList.length > 0 && pageStatus === 1 && (
                <Button
                  type="primary"
                  style={
                    props.term.activeSchedule
                      ? {
                          background: "#63B175",
                          borderColor: "#63B175",
                        }
                      : {}
                  }
                  onClick={() => setPageStatus(2)}
                >
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
              {pageStatus === 1 && props.term.progress == 13 && (
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
            {props.term.progress === 13 ? (
              <SubjectClassList
                data={subjectClassList}
                setShowSubjectClassDetail={setShowSubjectClassDetail}
                term={props.term}
                setRecordUpdate={setRecordUpdate}
                handleDeleteSubjectClass={handleDeleteSubjectClass}
              />
            ) : (
              <Card bordered={true}>
                <Result
                  status="warning"
                  title="Chưa có dữ liệu đăng ký lớp học phần. Dữ liệu sẽ được cập nhật sau khi quá trình đăng ký kết thúc."
                  extra={
                    <Button
                      type="primary"
                      onClick={() => handleCloseSubjectClassRegistration()}
                      danger
                    >
                      <CloseCircleOutlined />
                      <span>Kết Thúc</span>
                    </Button>
                  }
                />
              </Card>
            )}
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
        ) : pageStatus === 2 ? (
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
                handleOpenSubjectClassRegistration={
                  handleOpenSubjectClassRegistration
                }
              />
            )}
          </>
        ) : (
          ""
        )}
      </>
    );
  }
};

export default StepTwo;
