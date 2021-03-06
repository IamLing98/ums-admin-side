import { api } from "Api";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import TeacherCreate from "./TeacherCreate";
import TeacherUpdate from "./TeacherUpdate";
// import StudentImport from './Import';
import { Col, Row } from "reactstrap";
import moment from "moment";
import {
  DiffOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Alert, Modal } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import TeacherDetails from "./TeacherDetails";
import TeacherList from "./TeacherList";

const { confirm } = Modal;

export const TeacherHome = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh Sách Giảng Viên");

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [showModalImport, setShowModalImport] = useState(false);

  const [showDetail, setShowDetail] = useState(null);

  const [teacherList, setTeacherList] = useState([]);

  const [subjectList, setSubjectList] = useState([]);

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
      NotificationManager.err("Did you forget something? Please activate your account");
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const getTeacherList = () => {
    api
      .get("/employee?type=1", true)
      .then((res) => {
        for (var i = 0; i < res.length; i++) {
          res[i].isSelecting = false;
        }
        setTeacherList(res);
        setLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const setSelecting = (record) => {
    let newList = teacherList;
    for (var i = 0; i < newList.length; i++) {
      if (record.employeeId === newList[i].employeeId) {
        newList[i].isSelecting = true;
      } else {
        newList[i].isSelecting = false;
      }
    }
    setTeacherList(newList);
    setShowDetail(record);
  };

  const cancelShowDetail = (record) => {
    let newList = teacherList;
    for (var i = 0; i < newList.length; i++) {
      newList[i].isSelecting = false;
    }
    setTeacherList(newList);
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

  const getSubjectList = () => {
    api
      .get(`/subjects`)
      .then((res) => {
        setSubjectList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmitForm = (values) => {
    values.dateBirth = moment(values.dateBirth).format("YYYY-MM-DD");
    let newValues = { ...values };

    newValues.subjectList = [];
    if (values.subjectList !== null && values.subjectList !== undefined) {
      values.subjectList.forEach((element) => {
        newValues.subjectList.push({ subjectId: element });
      });
    }

    newValues.teacherEducationTimeLineList = [];
    if (values.teacherEducationTimeLineList !== null && values.teacherEducationTimeLineList !== undefined) {
      values.teacherEducationTimeLineList.forEach((item) => {
        newValues.teacherEducationTimeLineList.push({
          graduationYear: item.graduationYear,
          educationLevel: item.educationLevel,
          branchName: item.branchName,
          educationPlace: item.educationPlace,
        });
      });
    }

    newValues.teacherWorkTimeLineList = [];
    if (values.teacherWorkTimeLineList !== null && values.teacherWorkTimeLineList !== undefined) {
      values.teacherWorkTimeLineList.forEach((item) => {
        newValues.teacherWorkTimeLineList.push({
          startDate: item.startDate,
          endDate: item.endDate,
          job: item.job,
          workUnit: item.workUnit,
        });
      });
    }

    console.log("newValues: ", newValues);
    api
      .post("/employee", newValues, true)
      .then((res) => {
        NotificationManager.success(`Tạo mới ${res} giảng viên.`);
        getTeacherList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
    setShowModalCreate(false);
  };

  const handleSubmitUpdateForm = (values) => {
    values.dateBirth = moment(values.dateBirth).format("YYYY-MM-DD");
    let newValues = { ...values };
    console.log(newValues);

    newValues.subjectList = [];
    if (values.subjectList !== null && values.subjectList !== undefined) {
      values.subjectList.forEach((element) => {
        newValues.subjectList.push({ subjectId: element });
      });
    }

    newValues.teacherEducationTimeLineList = [];
    if (values.teacherEducationTimeLineList !== null && values.teacherEducationTimeLineList !== undefined) {
      values.teacherEducationTimeLineList.forEach((item) => {
        newValues.teacherEducationTimeLineList.push({
          graduationYear: item.graduationYear,
          educationLevel: item.educationLevel,
          branchName: item.branchName,
          educationPlace: item.educationPlace,
        });
      });
    }

    newValues.teacherWorkTimeLineList = [];
    if (values.teacherWorkTimeLineList !== null && values.teacherWorkTimeLineList !== undefined) {
      values.teacherWorkTimeLineList.forEach((item) => {
        newValues.teacherWorkTimeLineList.push({
          startDate: item.startDate,
          endDate: item.endDate,
          job: item.job,
          workUnit: item.workUnit,
        });
      });
    }

    console.log("newValues: ", newValues);
    api
      .put(`/employee/${newValues.employeeId}`, newValues, true)
      .then((res) => {
        NotificationManager.success(`Cập nhật thành công ${res} giảng viên.`);
        getTeacherList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
    setShowModalUpdate(false);
  };

  const handleDeleteRecord = (id) => {
    api
      .delete(`/employee/${id}`)
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getTeacherList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleDeleteMultipleRecord = (values) => {
    api
      .delete(`/employee?${values.map((value, index) => `ids=${value}`).join("&")}`, true)
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getTeacherList();
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
    getTeacherList();
    getDepartmentList();
    getSubjectList();
    getEthnicList();
    getProvinceList("VNM");
    getEducationProgramList();
    getClassList();
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
          <title>Hồ Sơ Giảng Viên</title>
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
                    <div className="tableListOperator" style={{ textAlign: "right", width: "100%" }}>  
                      <Button
                        type="primary"
                        style={{
                          background: "#DEC544",
                          borderColor: "#DEC544",
                          color: "black",
                          width: "122px",
                        }}
                        onClick={() => {}}
                      >
                        <DiffOutlined />
                        <span>In Exel</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
                <TeacherList
                  setCurrentTitle={setCurrentTitle}
                  handleDeleteRecord={handleDeleteRecord}
                  data={teacherList}
                  setShowModalUpdate={setShowModalUpdate}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                  setShowDetail={setShowDetail}
                  setSelecting={setSelecting}
                />
              </div>
              {showDetail !== null && (
                <TeacherDetails
                  visible={showDetail !== null ? true : false}
                  record={showDetail}
                  setShowDetail={setShowDetail}
                  cancelShowDetail={cancelShowDetail}
                />
              )}
              <TeacherCreate
                visible={showModalCreate}
                setShowModalCreate={setShowModalCreate}
                getTeacherList={getTeacherList}
                departmentList={departmentList}
                teacherList={teacherList}
                handleSubmitForm={handleSubmitForm}
                ethnicList={ethnicList}
                provinceList={provinceList}
                educationProgramList={educationProgramList}
                classList={classList}
                subjectList={subjectList}
                // options={prerequisitesStudent}
              />

              <TeacherUpdate
                visible={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate}
                getTeacherList={getTeacherList}
                departmentList={departmentList}
                teacherList={teacherList}
                handleSubmitForm={handleSubmitUpdateForm}
                ethnicList={ethnicList}
                provinceList={provinceList}
                educationProgramList={educationProgramList}
                classList={classList}
                subjectList={subjectList}
                // options={prerequisitesStudent}
              />
              {/* 
              <StudentImport
                visible={showModalImport}
                setShowModalImport={setShowModalImport}
                setRecordUpdate={setRecordUpdate}
                record={recordUpdate}
                teacherList={teacherList}
                departmentList={departmentList}
                getTeacherList={getTeacherList}
                // options={prerequisitesStudent}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default TeacherHome;
