import React, { useState, useEffect } from "react";
import { Button, Card, Empty, Result } from "antd";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {
  CloseCircleOutlined,
  FolderAddOutlined,
  ScheduleOutlined,
  DesktopOutlined,
  PlusSquareOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import SubjectClassList from "./StepTwoComponents/SubjectClassList";
import SubjectClassDetail from "./StepTwoComponents/SubjectClassDetail";
import UpdateSubjectClass from "./StepTwoComponents/UpdateSubjectClass";
import ScheduleList from "./StepTwoComponents/ScheduleList";
import ScheduleInfo from "./StepTwoComponents/ScheduleInfo";
import SubjectClassRegistration from "./StepTwoComponents/SubjectClassRegistrationInfo";
import SubjectClassCreate from "./StepTwoComponents/SubjectClassCreate";

import fileSaver from "file-saver";

const StepTwo = (props) => {
  const [subjectClassList, setSubjectClassList] = useState([]);

  const [scheduleList, setScheduleList] = useState([]);

  const [showSubjectClassDetail, setShowSubjectClassDetail] = useState(null);

  const [toSubjectClassCreate, setToShowSubjectClassCreate] = useState(false);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [schedule, setSchedule] = useState(null);

  const [pageStatus, setPageStatus] = useState(1);

  const [loading, setLoading] = useState(true);

  const showErrNoti = (err) => {
    NotificationManager.err(err.message);
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

  const handleOpenSubjectClassRegistration = (values) => {
    console.log(values);
    let subjectClassSubmittingStartDate = values["rangeTime"][0].format(
      "YYYY-MM-DD"
    );
    let subjectCLassSubmittingEndDate = values["rangeTime"][1].format(
      "YYYY-MM-DD"
    );
    let termObj = { ...props.term };
    termObj.id = props.term.id;
    termObj.progress = 21;
    termObj.actionType = "SCRON";
    termObj.activeSchedule = values.id;
    termObj.subjectClassSubmittingStartDate = subjectClassSubmittingStartDate;
    termObj.subjectCLassSubmittingEndDate = subjectCLassSubmittingEndDate;
    api
      .put(`/terms/${props.term.id}`, termObj)
      .then((res) => {
        setSchedule(null);
        setPageStatus(1);
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
        NotificationManager.success("Kết thúc đăng ký học phần!!!");
        props.getTermDetail(props.term.id);
      })
      .catch((err) => showErrNoti(err));
  };

  useEffect(() => {
    getSubjectClassList();
    getListSchedule();
    console.log(pageStatus);
  }, []);

  if (loading) {
    return <RctPageLoader />;
  } else {
    return (
      <>
        {props.term.progress === 13 ||
        props.term.progress === 21 ||
        props.term.progress === 22 ? (
          <>
            {props.term.progress === 22 ? (
              ""
            ) : (
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
                    {pageStatus === 1 && props.term.progress < 22 && (
                      <>
                        <Button
                          type="primary"
                          onClick={() => setToShowSubjectClassCreate(true)}
                          style={{
                            width: "180px",
                          }}
                        >
                          <PlusSquareOutlined />
                          <span>Tạo lớp học phần</span>
                        </Button>
                        <Button
                          type="primary"
                          style={{
                            background: "#63B175",
                            borderColor: "#63B175",
                            width: "180px",
                          }}
                          onClick={() => setPageStatus(2)}
                        >
                          <ScheduleOutlined />
                          <span>Thời khoá biểu</span>
                        </Button>
                      </>
                    )}
                    {pageStatus === 2 && (
                      <>
                        {" "}
                        <Button
                          type="primary"
                          onClick={() => handleCreateSchedule()}
                          style={{
                            background: "#63B175",
                            borderColor: "#63B175",
                            width: "180px",
                          }}
                        >
                          <FolderAddOutlined />
                          <span>Tạo thời khoá biểu</span>
                        </Button>
                        <Button
                          style={{
                            width: "180px",
                          }}
                          type="primary"
                          onClick={() => setPageStatus(1)}
                        >
                          <DesktopOutlined />
                          <span>Lớp học phần</span>
                        </Button>
                      </>
                    )}
                  </div>
                </Col>
              </Row>
            )}
            {pageStatus === 1 ? (
              <>
                {props.term.progress === 13 && (
                  <SubjectClassList
                    data={subjectClassList}
                    setShowSubjectClassDetail={setShowSubjectClassDetail}
                    term={props.term}
                    setRecordUpdate={setRecordUpdate}
                    handleDeleteSubjectClass={handleDeleteSubjectClass}
                  />
                )}{" "}
                {props.term.progress === 22 && (
                  <SubjectClassRegistration {...props} />
                )}
                {props.term.progress == 21 && (
                  <Card bordered={true}>
                    <Empty
                      image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                      imageStyle={{
                        height: 60,
                      }}
                      description={
                        <span>
                          Chưa có dữ liệu đăng ký lớp học phần. Dữ liệu sẽ được
                          cập nhật sau khi quá trình đăng ký kết thúc.{" "}
                        </span>
                      }
                    >
                      <Button
                        type="primary"
                        onClick={() => handleCloseSubjectClassRegistration()}
                        danger
                      >
                        <CloseCircleOutlined />
                        <span>Kết Thúc ĐK</span>
                      </Button>
                    </Empty>
                  </Card>
                )}
                <SubjectClassDetail
                  visible={showSubjectClassDetail}
                  setShowSubjectClassDetail={setShowSubjectClassDetail}
                  term={props.term}
                />
                {toSubjectClassCreate && (
                  <SubjectClassCreate
                    visible={toSubjectClassCreate}
                    setVisible={setToShowSubjectClassCreate}
                    term={props.term}
                    getSubjectClassList={getSubjectClassList}
                  ></SubjectClassCreate>
                )}
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
                  handleCreateSchedule={handleCreateSchedule}
                  data={scheduleList}
                  term={props.term}
                  setRecordUpdate={setRecordUpdate}
                  setSchedule={setSchedule}
                  getListSchedule={getListSchedule}
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
        ) : (
          <Result
            title="Đăng ký lớp học phần đã đóng, xem thông tin chi tiết"
            extra={
              <Button
                type="primary"
                key="console"
                onClick={() => props.setCurrent("setting:3")}
              >
                Xem chi tiết
              </Button>
            }
          />
        )}
      </>
    );
  }
};

export default StepTwo;
