import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
} from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";  
 

const StepOne = (props) => {
  const [form] = Form.useForm();
 

  const [submittingInfo, setSubmittingInfo] = useState([]);

  const getSubmittingInfo = (termId) => {
    api
      .get("/subjectsRegistration/" + termId)
      .then((res) => {
        res.forEach(function(element) {
          if (
            element.discussNumber ||
            element.exerciseNumber ||
            element.practiceNumber
          ) {
            if (element.theoryNumber) element.subjectType = "BOTH";
            else element.subjectType = "ONLYPRACTICE";
          } else element.subjectType = "ONLYTHEORY";
        });
        console.log(res);
        setSubmittingInfo(res);
      })
      .catch((err) => console.log(err));
  }; 
 
  useEffect(() => {
    getSubmittingInfo(props.term.id);
  }, []);

  const columnsInSubmittingOpen = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
    },
    {
      title: "Khoa phụ trách",
      dataIndex: "term",
      width: "20%",
    },
    {
      title: "Số lượng đăng ký",
      dataIndex: "totalSubmit",
      width: "40%",
      align: "center",
      render: (text, record) => {
        return (
          <Space>
            Dự đoán:
            <Badge
              count={record.predictSubmit}
              showZero={true}
              overflowCount={10000}
              title={"Số lượng dự đoán"}
            />
            Tổng số:
            <Badge
              count={record.totalSubmit}
              showZero={true}
              overflowCount={10000}
              title={"Tổng số đăng ký"}
            />
            Tự động:
            <Badge
              count={record.autoSubmit}
              style={{ backgroundColor: "#52c41a" }}
              showZero={true}
              overflowCount={10000}
              title={"Tự động đăng ký"}
            />
          </Space>
        );
      },
    },
  ];

  return (
    <>
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
            <Col md={4} style={{ display: "block", flexDirection: "column" }}>
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                //onClick={() => setShowModalCreate(true)}
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
              onClick={() => props.handleSubjectSubmittingClose()}
              danger
            >
              <CloseCircleOutlined />
              <span>Kết thúc đăng ký</span>
            </Button>
          </div>
        </Col>
      </Row>
      <Table
        columns={columnsInSubmittingOpen}
        dataSource={submittingInfo}
        rowKey="subjectId"
        bordered
        pagination={{ pageSize: 10 , size:"default"}}
        size="small"
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div className="ant-empty-image">
                <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                <p className="ant-empty-description">
                  Không có dữ liệu đăng ký học phần
                </p>
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};

export default StepOne;
