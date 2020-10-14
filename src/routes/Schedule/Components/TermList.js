import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";

const TermList = (props) => {
  const columns = [
    {
      title: "Niên Giám",
      dataIndex: "subjectId",
    },
    {
      title: "Học Kỳ",
      dataIndex: "subjectName",
      width: "20%",
    },
    {
      title: "Thời Gian Bắt Đầu",
      dataIndex: "selfLearningNumber",
    },
    {
      title: "Thời Gian Kết Thúc",
      dataIndex: "tags",
    }, 
    {
      title: "Thao Tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              props.setRecordUpdate(record);
              props.setShowModalUpdate(true);
            }}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => props.handleDeleteRecord(record)}
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
      dataSource={[]}
      rowKey="subjectId"
      bordered
      pagination={{ pageSize: 10 }}
      size="small"
      rowSelection={true}
      // rowSelection={rowSelection}
    />
  );
};

export default TermList;
