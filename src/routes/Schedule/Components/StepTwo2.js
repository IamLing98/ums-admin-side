import React, { useState, useEffect } from "react";
import { Button, Card, Empty, Alert, Result, Modal, Spin } from "antd";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {
  CloseCircleOutlined,
  FolderAddOutlined,
  ScheduleOutlined,
  DesktopOutlined,
  PlusSquareOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import SubjectClassList from "./StepTwoComponents/SubjectClassList";
import SubjectClassDetail from "./StepTwoComponents/SubjectClassDetail";
import UpdateSubjectClass from "./StepTwoComponents/UpdateSubjectClass"; 
import SubjectClassCreate from "./StepTwoComponents/SubjectClassCreate";
import OpenSubjectClassReg from "./StepTwoComponents/OpenSubjectClassReg";

const { confirm } = Modal;

import fileSaver from "file-saver";

const StepTwo = (props) => {
  const [subjectClassList, setSubjectClassList] = useState([]);

  const [showSubjectClassDetail, setShowSubjectClassDetail] = useState(null);

  const [toSubjectClassCreate, setToShowSubjectClassCreate] = useState(false);

  const [toOpenSubjectClassReg, setToOpenSubjectClassReg] = useState(false);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showSpin, setShowSpin] = useState(false);

  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err(
        "Did you forget something? Please activate your account"
      );
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  function showCreateScheduleConfirm() {
    confirm({
      title: "Tạo mới thời khoá biểu?",
      icon: <ExclamationCircleOutlined />,
      content: "Thời gian lớp học sẽ bị thay đổi",
      okText: "Đồng ý",
      cancelText: "Đóng",
      okButtonProps: {
        icon: <CheckOutlined />,
        disabled: false,
        style: { width: "108px" },
      },
      cancelButtonProps: {
        icon: <RollbackOutlined />,
        disabled: false,
        style: { width: "108px" },
      },
      onOk() {
        handleCreateSchedule();
      },
      onCancel() {
        console.log("Đóng");
      },
    });
  }

  const setSelecting = (record) => {
    let newSubjectClassList = [...subjectClassList];
    for (var i = 0; i < newSubjectClassList.length; i++) {
      if (record.subjectClassId === newSubjectClassList[i].subjectClassId) {
        newSubjectClassList[i].isSelecting = true;
      }
    }
    setSubjectClassList([...newSubjectClassList]);
    setShowSubjectClassDetail(record);
  };

  const cancelSelecting = (record) => {
    let newSubjectClassList = [...subjectClassList];
    for (var i = 0; i < newSubjectClassList.length; i++) {
      if (record.subjectClassId === newSubjectClassList[i].subjectClassId) {
        newSubjectClassList[i].isSelecting = false;
      }
    }
    setSubjectClassList([...newSubjectClassList]);
    setShowSubjectClassDetail(null);
  };
  const getSubjectClassList = () => {
    api
      .get(`/subjectClasses/${props.term.id}`)
      .then((response) => {
        if (response) {
          for (var i = 0; i < response.length; i++) {
            response[i].isSelecting = false;
          }
          setSubjectClassList(response);
          setLoading(false);
        }
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

  const handleCreateSchedule = () => {
    setShowSpin(true);
    api
      .post("/schedules", props.term.id)
      .then((res) => {
        NotificationManager.success("Tạo thời khoá biểu thành công");
        getSubjectClassList();
        setShowSpin(false);
      })
      .catch((err) => {
        setShowSpin(false);
        showErrNoti(err);
      });
  };

  const handleOpenSubjectClassRegistration = (values) => {
    setShowSpin(true);
    setToOpenSubjectClassReg(false);
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
        NotificationManager.success("Mở đăng ký lớp học phần thành công!!!");

        setShowSpin(false);
        props.getTermDetail(props.term.id);
      })
      .catch((err) => {
        setShowSpin(false);
        showErrNoti(err);
      });
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
  }, []);

  if (loading) {
    return <RctPageLoader />;
  } else {
    return (
      <Spin spinning={props.term.progress === 21 ? true : showSpin}>
        <Row>
          <Col
            md={6}
            sm={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Alert
              message={
                <strong>Danh sách lớp học phần - Tìm thấy {0} bản ghi</strong>
              }
              type="info"
              style={{ maxHeight: "32px" }}
            />
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className="tableListOperator"
              style={{ textAlign: "right", width: "100%" }}
            >
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
                  onClick={() => showCreateScheduleConfirm()}
                  style={{
                    background: "#63B175",
                    borderColor: "#63B175",
                    width: "180px",
                  }}
                >
                  <ScheduleOutlined />
                  <span>Tạo thời khoá biểu</span>
                </Button>
                <Button
                  type="primary"
                  onClick={() => setToOpenSubjectClassReg(true)}
                  style={{
                    width: "180px",
                  }}
                >
                  <PlusSquareOutlined />
                  <span>Mở ĐKLHP</span>
                </Button>
              </>
            </div>
          </Col>
        </Row>
        <OpenSubjectClassReg
          visible={toOpenSubjectClassReg}
          handleOpenSubjectClassRegistration={
            handleOpenSubjectClassRegistration
          }
          setToOpenSubjectClassReg={setToOpenSubjectClassReg}
          term={props.term}
        />
        <SubjectClassDetail
          visible={showSubjectClassDetail}
          cancelSelecting={cancelSelecting}
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
          <SubjectClassList
            data={subjectClassList}
            setSelecting={setSelecting}
            term={props.term}
            setRecordUpdate={setRecordUpdate}
            handleDeleteSubjectClass={handleDeleteSubjectClass}
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
      </Spin>
    );
  }
};

export default StepTwo;
