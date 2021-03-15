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
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Tên Đơn Vị ",
      dataIndex: "officeName",
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
          {record.educationProgramStatus === "2" ? (
            <Button type="" onClick={() => {}}>
              <RetweetOutlined />
            </Button>
          ) : (
            <Button type="" disabled>
              <RetweetOutlined />
            </Button>
          )}
          <Button
            type=""
            onClick={() => {
              props.setRecordUpdate(record);
              props.setIsShowModalUpdate(true);
            }}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => props.handleDeleteRecord(record.educationProgramId)}
            okText="Ok"
            cancelText="Không"
          >
            <Button type="">
              <DeleteFilled />
            </Button>
          </Popconfirm>
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
