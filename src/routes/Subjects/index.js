import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import SubjectList from "./SubjectList";
import SubjectCreate from "./SubjectCreate";
import SubjecUpdate from "./SubjectUpdate";
// import TermDetail from "./TermComponents/index";
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

export const SubjectHome = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh sách học phần");

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [subjectList, setSubjectList] = useState([]);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

  const [loading, setLoading] = useState(true);

  const onSearch = () => {};

  const getSubjectList = () => {
    api
      .get("/subjects", true)
      .then((res) => {
        setSubjectList(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if (err.message === "Forbidden") {
          NotificationManager.err(
            "Did you forget something? Please activate your account"
          );
        } else if (err.message === "Unauthorized") {
          throw new SubmissionError({ _err: "Username or Password Invalid" });
        }
      });
  };

  const getDepartmentList = () => {
    api
      .get("/departments", true)
      .then((res) => {
        setDepartmentList(res);
      })
      .catch((err) => {
        if (err.message === "Forbidden") {
          NotificationManager.err(
            "Did you forget something? Please activate your account"
          );
        } else if (err.message === "Unauthorized") {
          throw new SubmissionError({ _err: "Username or Password Invalid" });
        }
      });
  };

  const handleSubmitForm = (values) => {
    api
      .post("/subjects", values, true)
      .then((res) => {
        NotificationManager.success(`Tạo mới ${res} học phần.`);
        getSubjectList();
      })
      .catch((err) => {
        console.log(err.response);
        NotificationManager.err(err.response.data.message);
        if (err.response.status === 403) {
          NotificationManager.err(
            "Did you forget something? Please activate your account"
          );
        } else if (err.response.status === "Lỗi xác thực") {
          throw new SubmissionError({ _err: "Username or Password Invalid" });
        }
      });
    setShowModalCreate(false);
  };

  const handleDeleteRecord = (values) => {
    api
      .delete(
        `/subjects?${values.map((value, index) => `ids=${value}`).join("&")}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getSubjectList();
      })
      .catch((err) => {
        console.log(err.response);
        NotificationManager.err(err.response.data.message);
        if (err.response.status === 403) {
          NotificationManager.err(
            "Did you forget something? Please activate your account"
          );
        } else if (err.response.status === "Lỗi xác thực") {
          throw new SubmissionError({ _err: "Username or Password Invalid" });
        }
      });
  };

  useEffect(() => {
    getSubjectList();
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
            <div className="contextual-link" style={{ top: "15px" }}>
              {/* <a href="javascript:void(0)">
            <i className="ti-minus" />
          </a>
          <a href="javascript:void(0)">
            <i className="ti-close" />
          </a> */}
            </div>
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
                        <Input placeholder="Mã Học Phần..." size="middle" />
                      </Col>
                      <Col md={4}>
                        <Input placeholder="Tên Học Phần..." size="middle" />
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
                        onClick={() => setShowModalCreate(true)}
                      >
                        <PlusOutlined></PlusOutlined>
                        <span>Tạo Mới </span>
                      </Button>
                      <Button
                        type="button"
                        className="ant-btn ant-btn-primary"
                        onClick={() => setShowModalCreate(true)}
                      >
                        <PlusOutlined></PlusOutlined>
                        <span>Import </span>
                      </Button>
                      <Button
                        type="dashed"
                        disabled={selectedRowKeys.length > 0 ? false : true}
                        onClick={() =>
                          handleDeleteMultipleRecord(selectedRowKeys)
                        }
                      >
                        <DeleteOutlined />
                        <span>Xoá Nhiều</span>
                      </Button>
                      <a
                        href="https://demo.doublechaintech.com/freshchain/platformManager/exportExcelFromList/P000001/productList/"
                        className="ant-btn"
                      >
                        <DiffOutlined />
                        <span>In Exel</span>
                      </a>
                    </div>
                  </Col>
                </Row>
                <SubjectList
                  setCurrentTitle={setCurrentTitle}
                  handleDeleteRecord={handleDeleteRecord}
                  data={subjectList}
                  setRecordUpdate={setRecordUpdate}
                  selectedRowKeys={selectedRowKeys}
                  setSelectedRowKeys={setSelectedRowKeys}
                />
              </div>

              <SubjectCreate
                visible={showModalCreate}
                setShowModalCreate={setShowModalCreate}
                getSubjectList={getSubjectList}
                departmentList={departmentList}
                subjectList={subjectList}
                handleSubmitForm={handleSubmitForm}
                // options={prerequisitesSubject}
              />

              <SubjecUpdate
                visible={recordUpdate}
                setRecordUpdate={setRecordUpdate}
                record={recordUpdate}
                subjectList={subjectList}
                departmentList={departmentList}
                getSubjectList={getSubjectList}
                // options={prerequisitesSubject}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default SubjectHome;
