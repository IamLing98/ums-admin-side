/**
 * Class Dashboard
 */

import { getDepartmentList } from "Actions/DepartmentActions";
// page title bar
import { Tabs } from "antd";
import { api } from "Api";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { Sticky, StickyContainer } from "react-sticky"; 
import TermList from "./TermList";
import { Col, Row } from "reactstrap"; 
import {
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import TeachersList from "Routes/Teachers/Components/TeachersList";

const { TabPane } = Tabs;

const renderTabBar = (props, DefaultTabBar) => (
  <Sticky bottomOffset={80}>
    {({ style }) => (
      <DefaultTabBar
        {...props}
        className="site-custom-tab-bar"
        style={{ ...style }}
      />
    )}
  </Sticky>
);

export const ScheduleHome = (props) => {
  const [tabChange, setChangeTab] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);



  useEffect(() => {
    // get list branch
    api
      .get("/department/getAll", true)
      .then((res) => {
        props.getDepartmentList(res);
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
            <span>Học Kỳ</span>{" "}
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
            <div className="table-responsive">
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
                      <Input placeholder="Tên Học Phần..." size="middle" />
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
              <TermList/>
            </div>

            {/* <CreateSubject
              visible={showModalCreate}
              onOk={(values) => handleSubmitFormCreate(values)}
              onCancel={() => setShowModalCreate(false)}
              options={prerequisitesSubject}
            />

            <UpdateSubject
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

const mapStateToProps = ({}) => {
  return {};
};

export default connect(
  mapStateToProps,
  {
    getDepartmentList,
  }
)(ScheduleHome);
