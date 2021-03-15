import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  VerticalAlignBottomOutlined,
  DiffOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { Button, Tabs } from "antd";
import DepartmentList from "./DepartmentList";
import OfficeList from "./OfficeList";

const { TabPane } = Tabs;

export const Departments = (props) => {
  const showErrNoti = (err) => {
    NotificationManager.err(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err("Did you forget something? Please activate your account");
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const [currentTitle, setCurrentTitle] = useState("Danh sách phòng ban");

  const [loading, setLoading] = useState(true);

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [isShowModalUpdate, setIsShowModalUpdate] = useState(false);

  const [recordUpdate, setRecordUpdate] = useState(null);

  const [educationProgramList, setEducationProgramList] = useState([]);

  const [isShowDetail, setIsShowDetail] = useState(null);

  const [branchList, setBranchList] = useState([]);

  const [departmentList, setDepartmentList] = useState([]);

  const [officeList, setOfficeList] = useState([]);

  const getDepartmentList = () => {
    api
      .get("/departments", true)
      .then((res) => {
        setDepartmentList(res);
        setLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const getOfficeList = () => {
    api
      .get("/offices", true)
      .then((res) => {
        setOfficeList(res);
        setLoading(false);
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

  const handleShowDetail = (record) => {
    setCurrentTitle(
      <span>
        <a
          href="javascript:void(0)"
          onClick={() => {
            setCurrentTitle(<span>Danh Mục Chương Trình Đào Tạo</span>);
            setIsShowDetail(null);
          }}
        >
          <DoubleLeftOutlined />
        </a>{" "}
        Thông Tin Chi Tiết Chương Trình Đào Tạo: {record.educationProgramName}
      </span>,
    );
    setIsShowDetail(record);
  };

  useEffect(() => {
    getDepartmentList();
    getOfficeList();
  }, []);

  if (loading === true) {
    return (
      <>
        <RctPageLoader />
      </>
    );
  } else
    return (
      <div className="data-table-wrapper">
        <Helmet>
          <title>Danh Sách Phòng Ban</title>
          <meta name="description" content="Danh Sách Phòng Ban" />
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
                {isShowDetail === null ? (
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
                          style={{
                            background: "#63B175",
                            borderColor: "#63B175",
                            width: "180px",
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
                            width: "180px",
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
                <Tabs defaultActiveKey="1" type="card" size={"small"}>
                  <TabPane tab="Đơn vị chức năng" key="1">
                    <OfficeList data={officeList} />
                  </TabPane>
                  <TabPane tab="Đơn vị đào tạo" key="2">
                    {" "}
                    <DepartmentList data={departmentList} />
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default Departments;
