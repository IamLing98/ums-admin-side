import { api } from "../../../api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import EducationProgramList from "./EducationProgramList";
import EducationProgramDetail from "./DetailComponents/index";
import EducationProgramCreate from "./CreateEducationProgram";
import EducationProgramUpdate from "./UpdateEducationProgram";
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  SearchOutlined,
  VerticalAlignBottomOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { Button, Input, Popconfirm, Space, Table } from "antd";

export const EducationProgramsComponent = (props) => {
  const [currentTitle, setCurrentTitle] = useState(
    "Danh sách chương trình đào tạo"
  );

  const [loading, setLoading] = useState(true);

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [educationProgramList, setEducationProgramList] = useState([]);

  const [isShowDetail, setIsShowDetail] = useState(null);

  const [branchList, setBranchList] = useState([]);

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

  const getEducationProgramList = () => {
    api
      .get("/education-programs", true)
      .then((res) => {
        setEducationProgramList(res);
        setLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getBranchList = () => {
    api
      .get("/branches", true)
      .then((res) => {
        setBranchList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleDeleteRecord = (id) => {
    api
      .delete(`/education-program/${id}`, true)
      .then((res) => {
        NotificationManager.success("Đã xoá");
        getEducationProgramList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  useEffect(() => {
    getEducationProgramList();
    getBranchList();
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
                          style={{
                            background: "#DEC544",
                            borderColor: "#DEC544",
                            color: "black",
                            width: "122px",
                          }}
                          onClick={() => handleDeleteMultipleRecord()}
                        >
                          <DiffOutlined />
                          <span>In Exel</span>
                        </Button>
                      </div>
                    </Col>
                  </Row>
                ) : (
                  ""
                )}
                {isShowDetail === null ? (
                  <EducationProgramList
                    setCurrentTitle={setCurrentTitle}
                    handleDeleteRecord={handleDeleteRecord}
                    data={educationProgramList}
                    setIsShowDetail={setIsShowDetail}
                    setIsShowModalUpdate={setIsShowModalUpdate}
                    setRecordUpdate={setRecordUpdate}
                    handleDeleteRecord={handleDeleteRecord}
                  />
                ) : (
                  <EducationProgramDetail
                    term={isShowDetail}
                    setIsShowDetail={setIsShowDetail}
                  />
                )}
              </div>

              <EducationProgramCreate
                branchList={branchList}
                visible={showModalCreate}
                onCancel={() => setShowModalCreate(false)}
                getEducationProgramList={getEducationProgramList}
                // options={prerequisitesSubject}
              />
              <EducationProgramUpdate
                visible={isShowModalUpdate}
                record={recordUpdate}
                getEducationProgramList={getEducationProgramList}
                branchList={branchList}
                setIsShowModalUpdate={setIsShowModalUpdate}
                setRecordUpdate={setRecordUpdate}
                // options={prerequisitesSubject}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

export default EducationProgramsComponent;
