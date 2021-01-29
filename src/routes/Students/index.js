import { api } from "Api";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import StudentCreate from "./StudentCreate";
import StudentUpdate from "./StudentUpdate";
// import StudentImport from './Import';
import { Col, Row } from "reactstrap";
import moment from "moment";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  DiffOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Alert, Modal,Select  } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import StudentDetail from "./StudentDetail";
import StudentList from "./StudentList";
import ToPdf from "./ExportToPdf";
import ImportStudent from './Import';

const { confirm } = Modal;

export const StudentHome = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh Sách Sinh Viên");

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [showModalImport, setShowModalImport] = useState(false);

  const [showModalPDF, setShowModalPDF] = useState(false);

  const [showDetail, setShowDetail] = useState(null);

  const [studentList, setStudentList] = useState([]);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

  const [ethnicList, setEthnicList] = useState([]);

  const [provinceList, setProvinceList] = useState([]);

  const [educationProgramList, setEducationProgramList] = useState([]);

  const [classList, setClassList] = useState([]);

  const [loading, setLoading] = useState(true);

  const input = useRef(null);

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

  const getStudentList = () => {
    api
      .get("/students", true)
      .then((res) => {
        for (var i = 0; i < res.length; i++) {
          res[i].isSelecting = false;
        }
        setStudentList(res);
        setLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const setSelecting = (record) => {
    let newList = studentList;
    for (var i = 0; i < newList.length; i++) {
      if (record.studentId === newList[i].studentId) {
        newList[i].isSelecting = true;
      }
    }
    setStudentList(newList);
    setShowDetail(record);
  };

  const cancelShowDetail = (record) => {
    let newList = studentList;
    for (var i = 0; i < newList.length; i++) {
      if (record.studentId === newList[i].studentId) {
        newList[i].isSelecting = false;
      }
    }
    setStudentList(newList);
    setShowDetail(null);
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
    for (var i = 0; i < values.length; i++) {
      values.dateBirth = moment(values.dateBirth, "YYYY-MM-DD");
    }
    api
      .post("/students", values, true)
      .then((res) => {
        NotificationManager.success(`Tạo mới ${res} sinh viên.`);
        getStudentList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
    setShowModalCreate(false);
  };

  const handleSubmitUpdateForm = (values) => {
    for (var i = 0; i < values.length; i++) {
      values.dateBirth = moment(values.dateBirth, "YYYY-MM-DD");
    }
    api
      .put("/students", values, true)
      .then((res) => {
        NotificationManager.success(`Tạo mới ${res} sinh viên.`);
        getStudentList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
    setShowModalUpdate(false);
  };

  const handleDeleteRecord = (values) => {
    api
      .delete(
        `/students?${values.map((value, index) => `ids=${value}`).join("&")}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getStudentList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleDeleteMultipleRecord = (values) => {
    api
      .delete(
        `/students?${values.map((value, index) => `ids=${value}`).join("&")}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getStudentList();
        setSelectedRowKeys([]);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

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
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const getEthnicList = () => {
    api
      .get("/ethnics", true)
      .then((res) => {
        setEthnicList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getProvinceList = (id) => {
    api
      .get(`/provinceCities?countryId=${id}`, true)
      .then((res) => {
        setProvinceList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getEducationProgramList = () => {
    api
      .get(`/education-programs`, true)
      .then((res) => {
        setEducationProgramList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getClassList = () => {
    api
      .get(`/yearClasses`, true)
      .then((res) => {
        setClassList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  useEffect(() => {
    getStudentList();
    getDepartmentList();
    getEthnicList();
    getProvinceList("VNM");
    getEducationProgramList();
    getClassList();
  }, []);

  if (loading) {
    return (
      <>
        {" "}
        <RctPageLoader />
      </>
    );
  } else
    return (
      <div className="data-table-wrapper">
        <Helmet>
          <title>Hồ Sơ Sinh Viên</title>
          <meta name="description" content="Danh Sách Giảng Viên" />
        </Helmet>
        <div className="rct-block ">
          <div className="rct-block-title ">
            <h4>
              <span>{currentTitle}</span>{" "}
            </h4>
            <div className="contextual-link" style={{ top: "15px" }}></div>
          </div>
          <div className="collapse show">
            <div className="rct-full-block">
              <hr style={{ margin: "0px" }} />
              <div className="table-responsive">
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Row>
                      <Col md={4}>
                        <Select
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Học lực..."
                          showSearch
                        >
                          <Option key={ + "filtereddd1"} value={1}>
                            Xếp loại xuất sắc
                          </Option>
                          <Option key={ + "filtereddd2"} value={2}>
                            Xếp loại giỏi
                          </Option>
                          <Option key={ + "filtereddd3"} value={3}>
                            Xếp loại khá
                          </Option>
                          <Option key={ + "filtereddd4"} value={4}>
                            Xếp loại trung bình
                          </Option>
                          <Option key={ + "filtereddd5"} value={5}>
                            Xếp loại yếu
                          </Option>
                        </Select>
                      </Col>
                      <Col md={4}>
                      <Select
                          allowClear
                          style={{ width: "100%" }}
                          placeholder="Khen thưởng..."
                          showSearch
                        >
                          <Option key={ + "filteredddd1"} value={1}>
                            Khen thuởng
                          </Option>
                          <Option key={ + "filteredddd2"} value={2}>
                            Kỷ luật
                          </Option> 
                        </Select>
                      </Col>
                      <Col
                        md={4}
                        style={{ display: "block", flexDirection: "column" }}
                      >
                        <button
                          type="button"
                          className="ant-btn ant-btn-primary"
                          onClick={() => onSearch()}
                        >
                          <SearchOutlined />
                          <span>Tìm Kiếm</span>
                        </button>
                      </Col>
                      {/* <Col md="12">
                        
                      <Alert message={`${studentList.length}`} type="info" showIcon style={{height:"32px"}} />
                      </Col> */}
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
                        onClick={() => setShowModalCreate(true)}
                      >
                        <PlusOutlined></PlusOutlined>
                        <span>Tạo Mới </span>
                      </Button>
                      <Button
                        type="primary"
                        style={{
                          background: "#63B175",
                          borderColor: "#63B175",
                          width: "122px",
                        }}
                        onClick={() => setShowModalImport(true)}
                      >
                        <VerticalAlignBottomOutlined />
                        <span>Import </span>
                      </Button>
                      <Button
                        type="primary"
                        style={
                          selectedRowKeys.length > 1
                            ? {
                                background: "#DC0000",
                                borderColor: "#DC0000",
                                color: "wheat",
                                width: "122px",
                              }
                            : {}
                        }
                        disabled={selectedRowKeys.length > 1 ? false : true}
                        onClick={() => showDeleteConfirm(selectedRowKeys)}
                      >
                        <DeleteOutlined />
                        <span>Xoá Nhiều</span>
                      </Button>
                      <Button
                        style={
                          selectedRowKeys.length > 1
                            ? {
                                background: "#DEC544",
                                borderColor: "#DEC544",
                                color: "black",
                                width: "122px",
                              }
                            : {
                                width: "122px",
                              }
                        }
                        onClick={() => {}}
                        disabled={selectedRowKeys.length > 1 ? false : true}
                      >
                        <DiffOutlined />
                        <span>In Exel</span>
                      </Button>
                      <Button
                        type="primary"
                        style={
                          selectedRowKeys.length > 1
                            ? {
                                background: "#DEC544",
                                borderColor: "#DEC544",
                                color: "black",
                                width: "122px",
                              }
                            : {
                                width: "122px",
                              }
                        }
                        onClick={() => {
                          setShowModalPDF(true);
                        }}
                        disabled={selectedRowKeys.length > 1 ? false : true}
                      >
                        <DiffOutlined />
                        <span>PDF</span>
                      </Button>
                      <ToPdf
                        selectedRowKeys={selectedRowKeys}
                        visible={showModalPDF}
                        setShowModalPDF={setShowModalPDF}
                        studentList={studentList}
                      />
                    </div>
                  </Col>
                </Row>
                <StudentList
                  setCurrentTitle={setCurrentTitle}
                  handleDeleteRecord={handleDeleteRecord}
                  data={studentList}
                  setShowModalUpdate={setShowModalUpdate}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                  setShowDetail={setShowDetail}
                  setSelecting={setSelecting}
                />
              </div>
              {showDetail !== null && (
                <StudentDetail
                  visible={showDetail !== null ? true : false}
                  record={showDetail}
                  setShowDetail={setShowDetail}
                  cancelShowDetail={cancelShowDetail}
                />
              )}

              <StudentCreate
                visible={showModalCreate}
                setShowModalCreate={setShowModalCreate}
                getStudentList={getStudentList}
                departmentList={departmentList}
                studentList={studentList}
                handleSubmitForm={handleSubmitForm}
                ethnicList={ethnicList}
                provinceList={provinceList}
                educationProgramList={educationProgramList}
                classList={classList}
                // options={prerequisitesStudent}
              />
              <StudentUpdate
                visible={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                getStudentList={getStudentList}
                departmentList={departmentList}
                studentList={studentList}
                handleSubmitUpdateForm={handleSubmitUpdateForm}
                ethnicList={ethnicList}
                provinceList={provinceList}
                educationProgramList={educationProgramList}
                classList={classList}
                // options={prerequisitesStudent}
              />
              {/* 
              <StudentImport
                visible={showModalImport}
                setShowModalImport={setShowModalImport}
                setRecordUpdate={setRecordUpdate}
                record={recordUpdate}
                studentList={studentList}
                departmentList={departmentList}
                getStudentList={getStudentList}
                // options={prerequisitesStudent}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default StudentHome;
