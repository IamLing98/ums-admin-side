import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  DoubleLeftOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { api } from "Api";

const DepartmentList = (props) => {
  const columns = [
    {
      title: "Mã Đơn Vị ",
      dataIndex: "departmentId",
      align: "center",
    },
    {
      title: "Tên Đơn Vị ",
      dataIndex: "departmentName",
      align: "center",
      render: (text, record) => (
        <a
          // className="ant-anchor-link-title ant-anchor-link-title-active"
          href="javascript:void(0)"
          onClick={() => {
            props.handleShowDetail(record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Thao Tác",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              props.setRecordUpdate(record);
              props.setIsShowModalUpdate(true);
            }}
          >
            <EditFilled />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={props.data}
      rowKey="educationProgramId"
      bordered
      pagination={{ pageSize: 10, size: "default" }}
      size="small"
    />
  );
};

export default DepartmentList;
