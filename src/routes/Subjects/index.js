import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import SubjectList from "./SubjectList";
import SubjectCreate from "./SubjectCreate";
import SubjecUpdate from "./SubjectUpdate";
// import TermDetail from "./TermComponents/index";
import { Col, Row } from "reactstrap";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

export const SubjectHome = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh sách học phần");

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [subjectList, setSubjectList] = useState([]);

  const [recordUpdate, setRecordUpdate] = useState(null);

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
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  const handleDeleteRecord = (termId) => {
    api
      .delete(`/terms/${termId}`, true)
      .then((res) => {
        NotificationManager.success("Đã xoá");
        getTermList();
      })
      .catch((error) => {
        console.log(error.response);
        NotificationManager.error(error.response.data.message);
        if (error.response.status === 403) {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.response.status === "Lỗi xác thực") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  useEffect(() => {
    getSubjectList();
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
                        <Input placeholder="Mã học phần..." size="middle" />
                      </Col>
                      <Col md={4}>
                        <Input placeholder="Tên học phần..." size="middle" />
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
                      <button
                        type="button"
                        className="ant-btn ant-btn-primary"
                        onClick={() => setShowModalCreate(true)}
                      >
                        <PlusOutlined></PlusOutlined>
                        <span>Tạo Mới </span>
                      </button>
                    </div>
                  </Col>
                </Row>
                <SubjectList
                  setCurrentTitle={setCurrentTitle}
                  handleDeleteRecord={handleDeleteRecord}
                  data={subjectList}
                  setRecordUpdate={setRecordUpdate}
                />
              </div>

              <SubjectCreate
                visible={showModalCreate} 
                setShowModalCreate={setShowModalCreate}
                getSubjectList={getSubjectList}
                // options={prerequisitesSubject}
              />

              {/*} <UpdateSubject
              visible={showModalUpdate}
              onOk={(values) => handleSubmitFormUpdate(values)}
              onCancel={() => {
                setShowModalUpdate(false);
                setRecordUpdate(defaultRecord);
              }}
              record={recordUpdate}
              options={prerequisitesSubject}
            /> */}
            </div>
          </div>
        </div>
      </div>
    );
};

export default SubjectHome;
