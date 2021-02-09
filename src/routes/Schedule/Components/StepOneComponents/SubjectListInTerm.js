import React, { useState, useEffect } from "react";
import { Button, Table, Input, Form, Badge, Space, Spin } from "antd";
import { api } from "Api";
import { SearchOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";

const SubjectListInTerm = (props) => {
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
      align: "center",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
    },
    {
      title: "Khoa phụ trách",
      dataIndex: "departmentName",
      width: "20%",
      align: "center",
    },
    {
      title: "Số lượng đăng ký",
      dataIndex: "totalSubmit",
      width: "40%",
      align: "center",
      render: (text, record) => {
        return (
          <Space>
            <Badge status="warning" />
            Dự đoán:{record.predictSubmit}
            <Badge status="processing" />
            Tổng số: {record.totalSubmit}
            <Badge status="success" />
            Tự động: <b>{record.autoSubmit}</b>
          </Space>
        );
      },
    },
  ];

  return (
    <Spin spin={true}>
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
              style={{ width: "180px" }}
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
        pagination={{ pageSize: 10, size: "default" }}
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
    </Spin>
  );
};

export default SubjectListInTerm;
