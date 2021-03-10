import React, { useState, useEffect } from "react";
import { Button, Alert, Modal, Spin, Select } from "antd";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {
  ScheduleOutlined,
  DeleteOutlined,
  ApartmentOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import { useDispatch } from "react-redux";
import SubjectClassList from "./StepThreeComponents/SubjectClassList";
import SubjectClassDetail from "./StepThreeComponents/SubjectClassDetail";
import OpenInputGrade from "./StepThreeComponents/OpenInputGrade";

import fileSaver from "file-saver";

const { confirm } = Modal;

const StepThree = (props) => {
  const dispatch = useDispatch();

  const [subjectClassList, setSubjectClassList] = useState([]);

  const [showSubjectClassDetail, setShowSubjectClassDetail] = useState(null);

  const [toOpenSubjectClassReg, setToOpenSubjectClassReg] = useState(false);

  const [toOpenSubjectClassEditReg, setToOpenSubjectClassEditReg] = useState(false);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [showOpenInputGrade, setShowOpenInputGrade] = useState(false);

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

  const handleOpenInputGrade = (values) => {
    let inputGradeStartDate = values["rangeTime"][0].format("YYYY-MM-DDTHH:mm:ss");
    let inputGradeEndDate = values["rangeTime"][1].format("YYYY-MM-DDTHH:mm:ss");
    console.log("start time:", values["rangeTime"][0]);
    let termObj = { ...props.term };
    termObj.inputGradeStartDate = inputGradeStartDate;
    termObj.inputGradeEndDate = inputGradeEndDate;
    termObj.actionType = "STGGR";
    api
      .put(`/terms/${termObj.id}`, termObj, true)
      .then((res) => {
        NotificationManager.success("Mở nhập điểm thành công");
        props.getTermDetail(props.term.id);
        setShowOpenInputGrade(false);
        dispatch(getListNotifications());
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };

  const showGetResultConfirm = () => {
    confirm({
      centered: true,
      title: "Khởi tạo kết quả học tập theo kỳ",
      icon: <ExclamationCircleOutlined />,
      content: "Chắc chắn?",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        handleGetReulst();
      },
      onCancel() {},
    });
  };

  const handleGetReulst = () => {
    let termObj = { ...props.term };
    termObj.actionType = "GETRESULT";
    api
      .put(`/terms/${termObj.id}`, termObj, true)
      .then((res) => {
        NotificationManager.success("Khởi tạo kết quả thành công");
        props.getTermDetail(props.term.id);
        dispatch(getListNotifications());
      })
      .catch((error) => {
        showErrNoti(error);
      });
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
                disabled={props.term.progress === 34 ? false : true}
                onClick={() => setShowOpenInputGrade(true)}
              >
                <DeleteOutlined />
                <span>Mở Nhập Điểm</span>
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
                disabled={props.term.progress === 36 ? false : true}
                onClick={() => showGetResultConfirm()}
              >
                <DeleteOutlined />
                <span>Tổng hợp kết quả</span>
              </Button>
              {props.term.progress === 13 && (
                <Button
                  type="primary"
                  onClick={() => setShowOpenInputGrade(true)}
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
        <SubjectClassDetail
          visible={showSubjectClassDetail}
          cancelSelecting={cancelSelecting}
          term={props.term}
        />
        <SubjectClassList
          rowSelection={rowSelection}
          selectedRowKeys={selectedRowKeys}
          data={subjectClassList}
          setSelecting={setSelecting}
          term={props.term}
          setRecordUpdate={setRecordUpdate}
          handleDeleteSubjectClass={handleDeleteSubjectClass}
        />
        <OpenInputGrade
          visible={showOpenInputGrade}
          setShowOpenInputGrade={setShowOpenInputGrade}
          handleOpenInputGrade={handleOpenInputGrade}
        />
      </Spin>
    );
  }
};

export default StepThree;
