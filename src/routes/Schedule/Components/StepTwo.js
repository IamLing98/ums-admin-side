import React, { useState, useEffect } from "react";
import { Button, Alert, Modal, Spin, Select } from "antd";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {
  ScheduleOutlined,
  PlusSquareOutlined,
  ExclamationCircleOutlined,
  CheckOutlined,
  RollbackOutlined,
  DeleteOutlined,
  ApartmentOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import SubjectClassList from "./StepTwoComponents/SubjectClassList";
import SubjectClassDetail from "./StepTwoComponents/SubjectClassDetail";
import SubjectClassUpdate from "./StepTwoComponents/SubjectClassUpdate";
import SubjectClassCreate from "./StepTwoComponents/SubjectClassCreate";
import OpenSubjectClassReg from "./StepTwoComponents/OpenSubjectClassReg";
import SubjectClassListAfterSubmitting from "./StepTwoComponents/SubjectClassListAfterSubmitting";
import OpenSubjectClassEditReg from "./StepTwoComponents/OpenSubjectClassEditReg";
import { getListNotifications } from "../../../store/actions/NotificationActions";

const { confirm } = Modal;

import fileSaver from "file-saver";

const StepTwo = (props) => {
  const dispatch = useDispatch();

  const [subjectClassList, setSubjectClassList] = useState([]);

  const [showSubjectClassDetail, setShowSubjectClassDetail] = useState(null);

  const [toSubjectClassCreate, setToShowSubjectClassCreate] = useState(false);

  const [toOpenSubjectClassReg, setToOpenSubjectClassReg] = useState(false);

  const [toOpenSubjectClassEditReg, setToOpenSubjectClassEditReg] = useState(false);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [loading, setLoading] = useState(true);

  const [showSpin, setShowSpin] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
  };
  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err("Did you forget something? Please activate your account");
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
      onCancel() {},
    });
  }

  const showDeleteConfirm = (selectedRowKeys) => {
    confirm({
      centered: true,
      title: "Chắc chắn?",
      icon: <ExclamationCircleOutlined />,
      content: "Vui lòng xác nhận",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        handleDeleteMultipleRecord(selectedRowKeys);
      },
      onCancel() {},
    });
  };

  const handleDeleteMultipleRecord = (selectedRowKeys) => {
    let newList = [];
    for (var i = 0; i < subjectClassList.length; i++) {
      for (var j = 0; j < selectedRowKeys.length; j++) {
        if (selectedRowKeys[j] === subjectClassList[i].subjectClassId) {
          newList.push(subjectClassList[i]);
        }
      }
    }
    handleCloseSubjectClass(newList);
  };

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

  //delete subject class
  const handleDeleteSubjectClass = (ids) => {
    api
      .delete(`/subjectClasses/?${ids.map((value, index) => `ids=${value}`).join("&")}`)
      .then((response) => {
        getSubjectClassList();
        NotificationManager.success("Xoá lớp học thành công");
      })
      .catch((err) => showErrNoti(err));
  };

  //change status of subject class to 0
  const handleCloseSubjectClass = (values) => {
    api.put(`/subjectClasses?actionType=OFF `, values).then((res) => {
      getSubjectClassList();
      NotificationManager.success("Đã đóng lớp học phần thành công");
    });
  };

  const saveFile = () => {
    fileSaver.saveAs(process.env.REACT_APP_CLIENT_URL + "/resources/cv.pdf", "MyCV.pdf");
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
    let subjectClassSubmittingStartDate = values["rangeTime"][0].format(
      "YYYY-MM-DDTHH:mm:ss",
    );
    let subjectCLassSubmittingEndDate = values["rangeTime"][1].format(
      "YYYY-MM-DDTHH:mm:ss",
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
        v;
        setShowSpin(false);
        props.getTermDetail(props.term.id);
        dispatch(getListNotifications());
      })
      .catch((err) => {
        setShowSpin(false);
        showErrNoti(err);
      });
  };

  const handleOpenSubjectClassEditRegistration = (values) => {
    setShowSpin(true);
    let editSubmittingStartDate = values["rangeTime"][0].format("YYYY-MM-DDTHH:mm:ss");
    let editSubmittingEndDate = values["rangeTime"][1].format("YYYY-MM-DDTHH:mm:ss");
    let termObj = { ...props.term };
    termObj.id = props.term.id;
    termObj.progress = 21;
    termObj.actionType = "SCREON";
    termObj.activeSchedule = values.id;
    termObj.editSubmittingStartDate = editSubmittingStartDate;
    termObj.editSubmittingEndDate = editSubmittingEndDate;
    api
      .put(`/terms/${props.term.id}`, termObj)
      .then((res) => {
        NotificationManager.success("Mở đăng ký điều chỉnh thành công!!!");
        setShowSpin(false);
        props.getTermDetail(props.term.id);
        setToOpenSubjectClassEditReg(false);
        dispatch(getListNotifications());
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

  const extractCorrectTip = (progress) => {
    let initProps = {
      tip: "",
      spinning: true,
    };
    if (progress < 13) {
      initProps.tip = "Chưa mở đăng ký lớp học phần";
      initProps.spinning = true;
    } else if (progress === 21) {
      initProps.tip = "Đang trong quá trình đăng ký học phần";
      initProps.spinning = true;
    } else if (progress === 31) {
      initProps.tip = "Đang trong quá trình đăng ký điều chỉnh";
      initProps.spinning = true;
    } else {
      initProps.spinning = showSpin;
    }
    return initProps;
  };
  if (loading) {
    return <RctPageLoader />;
  } else {
    return (
      <Spin size="large" {...extractCorrectTip(props.term.progress)}>
        <Row>
          <Col md={3} sm={12} style={{ display: "flex", flexDirection: "column" }}>
            <Alert
              message={
                <strong>
                  Danh sách lớp học phần - Tìm thấy {subjectClassList.length} bản ghi
                </strong>
              }
              type="info"
              style={{ maxHeight: "32px" }}
            />
          </Col>
          <Col md={9} sm={12} xs={12}>
            <div
              className="tableListOperator"
              style={{ textAlign: "right", width: "100%" }}
            >
              {props.term.progress >= 22 && (
                <Select
                  allowClear
                  placeholder="Tình trạng..."
                  showSearch
                  style={{
                    width: "200px",
                    marginRight: "8px",
                    textAlign: "left",
                  }}
                >
                  <Select.Option key={+"filtereddd1"} value={1}>
                    Đạt tiêu chuẩn
                  </Select.Option>
                  <Select.Option key={+"filtereddd2"} value={2}>
                    Không đạt tiêu chuẩn
                  </Select.Option>
                </Select>
              )}
              <Button
                type="primary"
                onClick={() => {
                  console.log("as");
                  setToShowSubjectClassCreate(true);
                }}
                style={{
                  width: "180px",
                }}
              >
                <PlusSquareOutlined />
                <span>Tạo lớp học phần</span>
              </Button>
              <Button
                type="primary"
                style={
                  selectedRowKeys.length > 1
                    ? {
                        background: "#DC0000",
                        borderColor: "#DC0000",
                        color: "wheat",
                        width: "180px",
                      }
                    : {
                        width: "180px",
                      }
                }
                disabled={selectedRowKeys.length > 1 ? false : true}
                onClick={() => showDeleteConfirm(selectedRowKeys)}
              >
                <DeleteOutlined />
                <span>Đóng Nhiều lớp</span>
              </Button>
              {props.term.progress === 13 && (
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
              )}
              {props.term.progress === 13 && (
                <Button
                  type="primary"
                  onClick={() => setToOpenSubjectClassReg(true)}
                  style={{
                    width: "180px",
                  }}
                >
                  <ApartmentOutlined />
                  <span>Mở ĐKLHP</span>
                </Button>
              )}
              {props.term.progress === 22 && (
                <Button
                  type="primary"
                  onClick={() => setToOpenSubjectClassEditReg(true)}
                  style={{
                    width: "180px",
                    background: "#63B175",
                    borderColor: "#63B175",
                  }}
                >
                  <ApartmentOutlined />
                  <span>Mở ĐKĐC</span>
                </Button>
              )}
            </div>
          </Col>
        </Row>
        <OpenSubjectClassReg
          visible={toOpenSubjectClassReg}
          handleOpenSubjectClassRegistration={handleOpenSubjectClassRegistration}
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
        {props.term.progress >= 22 ? (
          <SubjectClassListAfterSubmitting
            data={subjectClassList}
            setSelecting={setSelecting}
            term={props.term}
            setRecordUpdate={setRecordUpdate}
            handleDeleteSubjectClass={handleDeleteSubjectClass}
            handleCloseSubjectClass={handleCloseSubjectClass}
            rowSelection={rowSelection}
            selectedRowKeys={selectedRowKeys}
          />
        ) : (
          <SubjectClassList
            rowSelection={rowSelection}
            selectedRowKeys={selectedRowKeys}
            data={subjectClassList}
            setSelecting={setSelecting}
            term={props.term}
            setRecordUpdate={setRecordUpdate}
            handleDeleteSubjectClass={handleDeleteSubjectClass}
          />
        )}
        {recordUpdate && (
          <SubjectClassUpdate
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
        <OpenSubjectClassEditReg
          visible={toOpenSubjectClassEditReg}
          handleOpenSubjectClassEditRegistration={handleOpenSubjectClassEditRegistration}
          setToOpenSubjectClassEditReg={setToOpenSubjectClassEditReg}
          term={props.term}
        />
      </Spin>
    );
  }
};

export default StepTwo;
