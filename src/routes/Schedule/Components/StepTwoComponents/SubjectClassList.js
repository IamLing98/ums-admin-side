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
  Alert,
  Drawer,
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
  EditFilled,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";

const SubjectClassList = (props) => {
  const columns = [
    {
      title: "Mã lớp học phần",
      dataIndex: "subjectClassId",
      align: "center",
    },
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
      align: "center",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
      render: (text, record) => (
        <a
          // className="ant-anchor-link-title ant-anchor-link-title-active"
          href="javascript:void(0)"
          onClick={() => {
            props.setShowSubjectClassDetail(record);
          }}
        >
          <span>{text}</span>
        </a>
      ),
    },
    {
      title: "Phòng máy",
      dataIndex: "isRequireLab",
      align: "center",
      render: (text, record) => {
        if (text === 1) return <span>Có</span>;
        else return <span>Không</span>;
      },
    },
    {
      title: "Sĩ số",
      dataIndex: "numberOfSeats",
      align: "center",
    },
    {
      title: "Giảng viên",
      dataIndex: "employeeId",
      align: "center",
      render: (text, record) => {
        if (record.employeeId) {
          return <span>{record.employeeFullName}</span>;
        }
        return <Alert message="Chưa assigment" type="warning" />;
      },
    },
    {
      title: "Thao tác",
      dataIndex: "numberOfSeats",
      align: "center",
      render: (text, record) => {
        return (
          <Space size="middle">
            <Button
              type=""
              onClick={() => {
                props.setRecordUpdate(record);
              }}
            >
              <EditFilled />
            </Button>
            <Button
              type=""
              // onClick={() => {
              //   setRecordUpdate(record);
              //   setShowModalUpdate(true);
              // }}
            >
              <LockOutlined />
            </Button>
            <Popconfirm
              placement="left"
              title={"Chắc chắn xoá?"}
              onConfirm={() => props.handleDeleteSubjectClass(record)}
              okText="Ok"
              cancelText="Không"
            >
              <Button type="">
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="subjectClassId"
        bordered
        pagination={{ pageSize: 15, size: "default" }}
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

export default SubjectClassList;
