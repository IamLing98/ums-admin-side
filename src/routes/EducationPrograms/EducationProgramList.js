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

const EducationProgramList = (props) => {
  const columns = [
    {
      title: "Mã CTDT ",
      dataIndex: "educationProgramId",
      align: "center",
    },
    {
      title: "Tên Chương Trình ",
      dataIndex: "educationProgramName",
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
      title: "Trình Độ Đào Tạo",
      dataIndex: "educationProgramLevel",
      align: "center",
      render: (text) => {
        if (text === 1) {
          return <span>Cao học</span>;
        } else if (text === 2) {
          return <span>Đại học</span>;
        } else if (text === 3) {
          return <span>Cao đẳng</span>;
        } else {
          return <span></span>;
        }
      },
    },
    {
      title: "Khoa Phụ Trách",
      align: "center",
      dataIndex: "departmentName",
    },
    {
      title: "Ngành Đào Tạo",
      align: "center",
      dataIndex: "branchName",
    },

    {
      title: "Số Tín Chỉ",
      dataIndex: "branchName",
      align: "center",
    },
    {
      title: "Hình Thức Đào Tạo",
      dataIndex: "educationProgramType",
      align: "center",
      render: (text) => {
        if (text === 1) {
          return <span>Đại học chính quy</span>;
          // } else if (text === 2) {
          //   return <span>Đại học vừa làm vừa học </span>;
        } else if (text === 2) {
          return <span>Văn bằng 2</span>;
          // } else if (text === 4) {
          //   return <span>L.thông từ Cao đẳng lên Đại học</span>;
          // } else if (text === 5) {
          //   return <span>L.thông từ Trung cấp lên Đại học</span>;
          // } else if (text === 6) {
          //   return <span>Liên kết đào tạo quốc tế</span>;
          // } else if (text === 7) {
          //   return <span>Đại học từ xa</span>;
        }
      },
    },
    // {
    //   title: "Trạng Thái",
    //   dataIndex: "educationProgramStatus",
    //   render: (status) => {
    //     let color;
    //     let text = "";
    //     if (status === 1) {
    //       color = "geekblue";
    //       text = "Đang Triển Khai";
    //     } else if (status === 2) {
    //       color = "volcano";
    //       text = "Chờ Cập Nhật";
    //     } else if (status === 3) {
    //       color = "green";
    //       text = "Chờ Cập Nhật";
    //     }
    //     return (
    //       <Tag color={color} key={text}>
    //         {text.toUpperCase()}
    //       </Tag>
    //     );
    //   },
    // },
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
            onConfirm={() =>
              props.handleDeleteRecord(record.educationProgramId)
            }
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
      pagination={{ pageSize: 10,size:"default" }}
      size="small"
    />
  );
};

export default EducationProgramList;
