import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import TermList from "./TermList";
import TermDetail from "./Components/index";
import { Col, Row } from "reactstrap";
import { PlusOutlined  } from "@ant-design/icons";
import { Button, Alert } from "antd";
import TermCreate from "./CreateTerm";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

export const ScheduleHome = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Học kỳ");

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [termList, setTermList] = useState([]);

  const [isShowDetail, setIsShowDetail] = useState(null);

  const [loading, setLoading] = useState(true);

  const [recordFoundNumber, setRecordFoundNumber] = useState(0);

  const getTermList = () => {
    api
      .get("/terms", true)
      .then((res) => {
        setTermList(res);
        setLoading(false);
        setRecordFoundNumber(res.length)
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

  if (loading) {
    return <RctPageLoader />;
  } else
    return (
      <div className="data-table-wrapper">
        <Helmet>
          <title>Giảng Dạy</title>
          <meta name="description" content="Danh Sách Giảng Viên" />
        </Helmet>
        <div className="rct-block ">
          {isShowDetail === null && (
            <div className="rct-block-title ">
              <div>
                <h4>
                  <span>Danh sách học kỳ</span>{" "}
                </h4>
                <div className="contextual-link" style={{ top: "15px" }}></div>
              </div>
            </div>
          )}
          <div className="collapse show">
            <div className="rct-full-block">
              <hr style={{ margin: "0px" }} />
              <div className="table-responsive">
                {isShowDetail === null ? (
                  <Row>
                    <Col md={12} sm={12} xs={12}>
                      <div
                        className="tableListOperator"
                        style={{ textAlign: "right", width: "100%" }}
                      >
                        <Button
                          style={{
                            background: "#448AE2",
                            borderColor: "#448AE2",
                            width: "180px",
                          }}
                          type="primary"
                          onClick={() => setShowModalCreate(true)}
                        >
                          <PlusOutlined></PlusOutlined>
                          <span>Tạo Mới </span>
                        </Button>
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
            </div>
          </div>
        </div>
      </div>
    );
};

export default ScheduleHome;
