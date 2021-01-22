import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import TermList from "./TermList";
import TermDetail from "./TermComponents/index";
import { Col, Row } from "reactstrap";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import TermCreate from "./CreateTerm";

export const ScheduleHome = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Học kỳ");

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [termList, setTermList] = useState([]);

  const [isShowDetail, setIsShowDetail] = useState(null);

  const getTermList = () => {
    api
      .get("/terms", true)
      .then((res) => {
        setTermList(res);
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
    getTermList();
  }, []);

  return (
    <div className="data-table-wrapper">
      <Helmet>
        <title>Giảng Dạy</title>
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
              {isShowDetail === null ? (
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Row>
                      <Col md={4}>
                        <Input placeholder="Năm học..." size="middle" />
                      </Col>
                      <Col md={4}>
                        <Input placeholder="Học kỳ..." size="middle" />
                      </Col>
                      <Col
                        md={4}
                        style={{ display: "block", flexDirection: "column" }}
                      >
                        <button
                          type="button"
                          className="ant-btn ant-btn-primary"
                          onClick={() => setShowModalCreate(true)}
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
              ) : (
                ""
              )}
              {isShowDetail === null ? (
                <TermList
                  setCurrentTitle={setCurrentTitle}
                  handleDeleteRecord={handleDeleteRecord}
                  termList={termList}
                  setIsShowDetail={setIsShowDetail}
                />
              ) : (
                <TermDetail
                  term={isShowDetail}
                  setIsShowDetail={setIsShowDetail}
                />
              )}
            </div>

            <TermCreate
              visible={showModalCreate}
              onOk={(values) => handleSubmitFormCreate(values)}
              onCancel={() => setShowModalCreate(false)}
              getTermList={getTermList}
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

export default ScheduleHome;
