import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Space, Table, Tag } from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { api } from "Api";

const TermList = (props) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      align: "center",
    },
    {
      title: "Học Kỳ - Niên Giám",
      dataIndex: "year",
      align: "center",
      render: (text, record) => {
        return (
          <a
            // className="ant-anchor-link-title ant-anchor-link-title-active"
            href="javascript:void(0)"
            onClick={() => {
              api
                .get("/terms/" + record.id, true)
                .then((res) => {
                  props.setIsShowDetail(res);
                })
                .catch();
              props.setCurrentTitle(
                <span>
                  <a
                    href="javascript:void(0)"
                    onClick={() => {
                      props.setCurrentTitle(<span>Học kỳ </span>);
                      props.setIsShowDetail(null);
                    }}
                  >
                    <DoubleLeftOutlined />
                  </a>{" "}
                  Thông tin học kỳ {record.term} năm {record.year}
                </span>
              );
            }}
          >
            <span>Học kỳ {record.term + " năm " + text}</span>
          </a>
        );
      },
    },
    {
      title: "Học Kỳ",
      dataIndex: "term",
      width: "20%",
      align: "center",
    },
    {
      title: "Năm",
      dataIndex: "year",
      width: "20%",
      align: "center",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      align: "center",
      render: (status) => {
        let color;
        let text = "";
        if (status === 2) {
          color = "geekblue";
          text = "Đang diên ra";
        } else if (status === 3) {
          color = "volcano";
          text = "Kết thúc";
        } else if (status === 1) {
          color = "green";
          text = "Sắp bắt đầu";
        }
        else {
          text = "None";
          color = "orange";
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Tiến trình",
      dataIndex: "progress",
      align: "center",
      render: (progress) => {
        let color;
        let text = "";
        if (progress === 12) {
          color = "green";
          text = "Đang mở đăng ký học phần";
        } else if (progress === 13) {
          color = "volcano";
          text = "Kết thúc đ.ký học phần";
        } else if (progress === 21) {
          color = "green";
          text = "Đang mở đ.ký lớp học phần";
        } else if (progress === 22) {
          color = "volcano";
          text = "Kết thúc đ.ký lớp học phần";
        } else if (progress === 31) {
          color = "green";
          text = "Đang mở đ.ký điều chỉnh";
        }else if (progress === 32) {
          color = "volcano";
          text = "Kết thúc đ.ký điều chỉnh";
        }
        else {
          text = "None";
          color = "orange";
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "Thao Tác",
      key: "action",
      align: "center",
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
            onConfirm={() => props.handleDeleteRecord(record.id)}
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
      dataSource={props.termList}
      rowKey="id"
      bordered
      pagination={{ pageSize: 10, size: "default" }}
      size="small"
    />
  );
};

export default TermList;
