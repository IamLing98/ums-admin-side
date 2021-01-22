import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import YearClassList from "./YearClassList";
import YearClassCreate from "./YearClassCreate";
import YearClassUpdate from "./YearClassUpdate";
// import SubjectImport from './Import';
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  DiffOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Modal } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { confirm } = Modal;

export const YearClassHome = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh sách Lớp niên khoá");

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalImport, setShowModalImport] = useState(false);

  const [showModalUpdate, setShowModalUpdate] = useState(false);
 
  const [yearClassList, setYearClassList] = useState([]); 

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

  const [brachList, setBranchList] = useState([]);

  const [loading, setLoading] = useState(true);

  const onSearch = () => { };

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

  const getYearClassList = () => {
    api
      .get("/yearClasses", true)
      .then((res) => {
        setYearClassList(res);
        setLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
      });
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

  const getTeacherList = () => {
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
    let object = {};
    object.departmentId = values.departmentId;
    object.startYear = moment(values.rangeTime[0]).year();
    object.endYear = moment(values.rangeTime[1]).year();
    object.educationProgramLevel = values.educationProgramLevel;
    console.log(object)
    api
      .post("/yearClasses", object, true)
      .then((res) => {
        NotificationManager.success(`Tạo mới ${res} học phần.`);
        getYearClassList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
    setShowModalCreate(false);
  };

  const handleDeleteRecord = (id) => {
    api
      .delete(
        `/yearClasses/${id}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getYearClassList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleDeleteMultipleRecord = (values) => {
    api
      .delete(
        `/subjects?${values.map((value, index) => `ids=${value}`).join("&")}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getYearClassList();
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

  useEffect(() => {
    getYearClassList();
    getDepartmentList();
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
          <title>Học Phần</title>
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
                        <Input placeholder="Mã lớp..." size="middle" />
                      </Col>
                      <Col md={4}>
                        <Input placeholder="Tên lớp..." size="middle" />
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
                      {/* <Button
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
                      </Button>  */}
                      {/* <Button
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
                      </Button> */}
                    </div>
                  </Col>
                </Row>
                <YearClassList
                  setCurrentTitle={setCurrentTitle}
                  handleDeleteRecord={handleDeleteRecord}
                  data={yearClassList}
                  setShowModalUpdate={setShowModalUpdate}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                />
              </div>

              <YearClassCreate
                visible={showModalCreate}
                setShowModalCreate={setShowModalCreate}
                getYearClassList={getYearClassList}
                departmentList={departmentList}
                handleSubmitForm={handleSubmitForm}
              // options={prerequisitesSubject}
              />
              <YearClassUpdate
                visible={showModalUpdate}
                setShowModalUpdate={setShowModalUpdate} 
                yearClassList={yearClassList}
                departmentList={departmentList}
                getYearClassList={getYearClassList} 
              // options={prerequisitesSubject}
              />
              {/*
              <SubjectImport
                visible={showModalImport}
                setShowModalImport={setShowModalImport}
                setRecordUpdate={setRecordUpdate}
                record={recordUpdate}
                yearClassList={yearClassList}
                departmentList={departmentList}
                getYearClassList={getYearClassList}
                // options={prerequisitesSubject}
              /> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default YearClassHome;
