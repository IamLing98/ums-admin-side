import React, { useState, useEffect } from "react";
import { Drawer, Button, Table, Badge, Tag, Popover } from "antd";
import {
  RollbackOutlined,
  PrinterFilled,
  ExportOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import { api } from "Api";

const SalaryTableDetail = (props) => {
  useEffect(() => {}, [props.visible]);

  function format(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
      n,
    );
  }
  const salaryTableContractCols = [
    {
      title: "Mã PL",
      dataIndex: "id",
      defaultSortOrder: "descend",
      align: "center",
      sorter: (a, b) => a.id - b.id,
      render: (text, record) => (
        <a
          href="javascript:void(0)"
          onClick={() => {
            // setShowStudentDetail(record);
          }}
        >
          <span>{text}</span>
        </a>
      ),
    },
    {
      title: "Mã Nhân Viên",
      dataIndex: ["contractDTO", "employee", "employeeId"],
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: ["contractDTO", "employee", "fullName"],
      align: "center",
    },
    {
      title: "Chức Vụ",
      dataIndex: ["contractDTO", "employeeLevel", "employeeLevelName"],
      align: "center",
    },
    {
      title: "Cấp Bậc",
      dataIndex: [
        "contractDTO",
        "employeeCoefficientLevel",
        "employeeCoefficientLevelName",
      ],
      align: "center",
    },
    {
      title: "Hệ Số Lương",
      dataIndex: ["contractDTO", "employeeCoefficientLevel", "value"],
      align: "center",
    },
    {
      title: "Lương Cơ Bản",
      dataIndex: "basicSalary",
      align: "center",
      render: (text) => {
        return <span>{format(text)}</span>;
      },
    },
    {
      title: "Thực Lĩnh",
      dataIndex: "willPaymentSalary",
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.willPaymentSalary - b.willPaymentSalary,
      render: (text) => {
        return <span>{format(text)}</span>;
      },
    },
    {
      title: "Chi Tiết",
      dataIndex: "description",
      align: "center",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
      render: (text, record) => {
        if (text === 0) {
          return <Badge status="warning" text="Chờ TT" />;
        } else if (text === 1) {
          return <Badge status="success" text="Đã Thanh Toán" />;
        }
      },
    },
    {
      title: "Thao Tác",
      dataIndex: "status",
      defaultSortOrder: "descend",
      align: "center",
      render: (text, record) => {
        return (
          <Popover content={record.rejectReason} title="Thanh toán">
            <Button>
              <BankOutlined />
            </Button>
          </Popover>
        );
      },
    },
  ];

  return (
    <>
      <Drawer
        title="Thông tin chi tiết bảng lương"
        width={1400}
        onClose={() => props.setIsShowDetail(false)}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              style={{ width: "108px" }}
              onClick={() => props.cancelSelecting(subjectClass)}
              style={{ marginRight: 8 }}
            >
              <RollbackOutlined />
              Đóng
            </Button>{" "}
            <Button
              style={{ width: "108px" }}
              onClick={() => props.cancelSelecting(subjectClass)}
              style={{ marginRight: 8 }}
            >
              <PrinterFilled />
              PDF
            </Button>{" "}
            <Button
              style={{ width: "108px" }}
              onClick={() => props.cancelSelecting(subjectClass)}
              style={{ marginRight: 8 }}
            >
              <ExportOutlined />
              Exel
            </Button>
          </div>
        }
      >
        <Row>
          <Col md={12} style={{ display: "block" }}>
            <Table
              rowKey="title"
              bordered
              columns={salaryTableContractCols}
              dataSource={props.visible ? props.visible.salaryTableContractDTOS : []}
            ></Table>
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default SalaryTableDetail;
