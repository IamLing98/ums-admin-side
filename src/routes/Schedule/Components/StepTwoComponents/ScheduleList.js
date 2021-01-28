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

const ScheduleList = (props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
      render: (text, record) => {
        if (record.id === props.term.activeSchedule) {
          return (
            <a
              href="javascript:void(0)"
              onClick={() => {
                props.setSchedule(record);
              }}
            >
              <Alert message={`Thời khoá biểu ` + text} style={{width:"100%"}} type="success" />
            </a>
          );
        }else return             <a
        href="javascript:void(0)"
        onClick={() => {
          props.setSchedule(record);
        }}
      >
        {text}
      </a>
      },
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      align: "center",
      render: (text, record) => (
        <a href="javascript:void(0)" onClick={() => {}}>
          <span>{text}</span>
        </a>
      ),
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
                props.setPageStatus(3);
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
        rowKey="id"
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
    </>
  );
};

export default ScheduleList;
