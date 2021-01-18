import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Space, Table, Tag, Badge } from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  DoubleLeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { api } from "Api";

const SubjectList = (props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const columns = [
    {
      title: "Mã Học Phần ",
      dataIndex: "subjectId",
      align: "center",
    },
    {
      title: "Tên Học Phần ",
      dataIndex: "subjectName",
      align: "center",
      width: "20%",
    },
    {
      title: "Số Tín Chỉ",
      align: "center",
      children: [
        {
          title: "Từng Môn Học",
          dataIndex: "eachSubject",
          align: "center",
        },
        {
          title: "Theo Hoạt Động Giờ Tín Chỉ",
          align: "center",
          children: [
            {
              title: "Lý Thuyết",
              dataIndex: "theoryNumber",
              align: "center",
            },
            {
              title: "Bài Tập (x2)",
              dataIndex: "exerciseNumber",
              align: "center",
            },
            {
              title: "Thảo Luận (x2)",
              dataIndex: "practiceNumber",
              align: "center",
            },
          ],
        },
        {
          title: "Thực Hành",
          align: "center",
          dataIndex: "exerciseNumber",
        },
        {
          title: "Tự Học",
          dataIndex: "selfLearningNumber",
          align: "center",
        },
      ],
    },
    {
      title: "Học Phần Tiên Quyết",
      align: "center",
      dataIndex: "preLearnSubjectList",
      render: (text, record) => {
        let { preLearnSubjectList } = record;
        return (
          <span>
            {preLearnSubjectList != null
              ? preLearnSubjectList.map((item, index) => {
                  return(<> <Badge key={"badge" + item.subjectName + index} color="#87d068" text={item.subjectName} /><br/></>);
                })
              : ""}
          </span>
        );
      },
    },
    {
      title: "Trình Độ Đào Tạo",
      dataIndex: "subjectForLevel",
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
      title: "Khoa phụ trách",
      align: "center",
      dataIndex: "departmentName",
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
              let preLearnList = record.preLearnSubjectList;
              let preLearnSubjectList = [];
              preLearnList.map((item, index)=>{
                preLearnSubjectList.push(item.subjectId);
              })
              record.preLearnSubjectList = preLearnSubjectList;
              props.setRecordUpdate(record);
            }}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => props.handleDeleteRecord([record.subjectId])}
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

  const handleChangeTable = (pagination) => {
    setPagination(pagination);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    props.setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: props.selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          props.setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          props.setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  return (
    <Table
      columns={columns}
      dataSource={props.data}
      rowKey="subjectId"
      bordered
      size="small"
      pagination={pagination}
      onChange={(paging) => handleChangeTable(paging)}
      showSizeChanger={true}
      rowSelection={rowSelection}
      locale={{
        emptyText: (
          <div className="ant-empty ant-empty-normal">
            <div className="ant-empty-image">
              <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
              <p className="ant-empty-description">Không có học phần nào</p>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default SubjectList;
