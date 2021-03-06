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
import { Button, Alert, Modal, Select } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import StudentDetail from "./StudentDetail";
import StudentList from "./StudentList";
import ToPdf from "./ExportToPdf";
import ImportStudent from "./Import";

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

  const [recordFoundNumber, setRecordFoundNumber] = useState(0);

  const [loading, setLoading] = useState(true);

  const input = useRef(null);

  const onSearch = () => {};

  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err("Did you forget something? Please activate your account");
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
        setRecordFoundNumber(res.length);
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
      .delete(`/students?${values.map((value, index) => `ids=${value}`).join("&")}`, true)
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
      .delete(`/students?${values.map((value, index) => `ids=${value}`).join("&")}`, true)
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

  const handleUpload = (fileList) => {
    console.log(fileList);
    const formData = new FormData();
    formData.append("file", fileList); 
    api
      .post(`/uploadFile`, formData)
      .then((response) => { 
        let  data  = response;
        let fileDTO ={
          fileName:data.fileName
        }
        api
          .post(
            `/students/import`,
            fileDTO,
          )
          .then((res) => {
            NotificationManager.success("Tạo mới thành công: ", res);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((err) =>showErrNoti(err));
  };

  useEffect(() => {
    getStudentList();
    getDepartmentList();
    getEthnicList();
    getProvinceList("VNM");
    getEducationProgramList();
    getClassList();
    console.log(process.env.REACT_APP_MODE);
  }, []);

  if (loading) {
    return (
      <>
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
                  <Col md={12} sm={12} xs={12}>
                    <div
                      className="tableListOperator"
                      style={{ textAlign: "right", width: "100%" }}
                    >
                      <Button
                        type="primary"
                        style={{
                          background: "#448AE2",
                          borderColor: "#448AE2",
                          width: "180px",
                        }}
                        onClick={() => setShowModalCreate(true)}
                      >
                        <PlusOutlined></PlusOutlined>
                        <span>Tạo Mới </span>
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
                        <span>Xoá Nhiều</span>
                      </Button>
                      <Button
                        type="primary"
                        style={{
                          background: "#63B175",
                          borderColor: "#63B175",
                          width: "180px",
                        }}
                        onClick={() => setShowModalImport(true)}
                      >
                        <VerticalAlignBottomOutlined />
                        <span>Nhập </span>
                      </Button>
                      {/* <Button
                        style={
                          selectedRowKeys.length > 1
                            ? {
                                background: "#DEC544",
                                borderColor: "#DEC544",
                                color: "black",
                                width: "180px",
                              }
                            : {
                                width: "180px",
                              }
                        }
                        onClick={() => {}}
                        disabled={selectedRowKeys.length > 1 ? false : true}
                      >
                        <DiffOutlined />
                        <span>In Exel</span>
                      </Button> */}
                      <Button
                        type="primary"
                        style={
                          selectedRowKeys.length > 1
                            ? {
                                background: "#DEC544",
                                borderColor: "#DEC544",
                                color: "black",
                                width: "180px",
                              }
                            : {
                                width: "180px",
                              }
                        }
                        onClick={() => {
                          setShowModalPDF(true);
                        }}
                        disabled={selectedRowKeys.length > 1 ? false : true}
                      >
                        <DiffOutlined />
                        <span>Xuất</span>
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
                  setRecordFoundNumber={setRecordFoundNumber}
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
              <ImportStudent
                visible={showModalImport}
                setShowModalImport={setShowModalImport} 
                handleUpload={handleUpload}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default StudentHome;
