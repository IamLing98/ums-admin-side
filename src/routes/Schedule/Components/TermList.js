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
import {api} from "Api";
import { useSelector, useDispatch } from "react-redux";
import { setTermDetail } from "../../../actions/TermActions";


const TermList = (props) => {

  const dispatch = useDispatch();

  const termReducer = useSelector((state) => state.termReducer);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Niên Giám",
      dataIndex: "year",
      render: (text, record) => {
        return (
          <a
            // className="ant-anchor-link-title ant-anchor-link-title-active"
            href="javascript:void(0)"
            onClick={() => {
              api.get("/terms/" + record.id, true)
              .then(
                res =>{
                  dispatch(setTermDetail(res));
                }
              )
              .catch()
              props.setCurrentTitle(
                <span>
                  <a
                    href="javascript:void(0)"
                    onClick={() => {
                      props.setCurrentTitle(<span>Học kỳ</span>); 
                      dispatch(setTermDetail(null));
                    }}
                  >
                    <DoubleLeftOutlined />
                  </a>{" "}
                  Thông tin học kỳ
                </span>
              );
            }}
          >
            {text}
          </a>
        );
      },
    },
    {
      title: "Học Kỳ",
      dataIndex: "term",
      width: "20%",
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (status) => {
        let color;
        let text = "";
        if (status === 2) {
          color = "geekblue";
          text = "Đang Diễn Ra";
        } else if (status === 1) {
          color = "volcano";
          text = "Kết thúc";
        } else if (status === 3) {
          color = "green";
          text = "Sắp Diễn Ra";
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
      pagination={{ pageSize: 10 }}
      size="small"
    />
  );
};

export default TermList;
