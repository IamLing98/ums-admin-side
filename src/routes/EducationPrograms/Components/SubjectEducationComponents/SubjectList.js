import React, { useEffect, useState } from "react";
import { Button, Popconfirm, Space, Table,  Badge } from "antd";
import {
  DeleteFilled, 
  SearchOutlined, 
  RetweetOutlined,
} from "@ant-design/icons";
import { api } from "Api";

const SubjectList = (props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    size:"default"
  });

  const columns = [
    {
      title: "Mã Học Phần ",
      align: "center",
      dataIndex: "subjectId",
      key: "subjectId",
    },
    {
      title: "Tên Học Phần ",
      dataIndex: "subjectName",
      align: "center",
      width: "20%",
      key: "subjectName",
    },
    {
      title: "Số Tín Chỉ",
      align: "center",
      children: [
        {
          title: "Từng Môn Học",
          align: "center",
          dataIndex: "eachSubject",
          key: "eachSubject",
        },
        {
          title: "Theo Hoạt Động Giờ Tín Chỉ",
          align: "center",
          key: "numberNumber",
          children: [
            {
              title: "Lý Thuyết",
              align: "center",
              dataIndex: "theoryNumber",
              key: "theoryNumber",
            },
            {
              title: "Bài Tập (x2)",
              align: "center",
              dataIndex: "exerciseNumber",
              key: "exerciseNumber",
            },
            {
              title: "Thảo Luận (x2)",
              align: "center",
              dataIndex: "discussNumber",
              key: "discussNumber",
            },
          ],
        },
        {
          title: "Thực Hành",
          align: "center",
          dataIndex: "exerciseNumber",
          key: "exerciseNumber",
        },
        {
          title: "Tự Học",
          dataIndex: "selfLearningNumber",
          align: "center",
          key: "selfLearningNumber",
        },
      ],
    },
    {
      title: "Học Phần Tiên Quyết",
      align: "center",
      key: "preLearnSubjectList",
      dataIndex: "preLearnSubjectList",
      render: (text, record) => {
        let { preLearnSubjectList } = record;
        return (
          <span>
            {preLearnSubjectList != null
              ? preLearnSubjectList.map((item, index) => {
                  return (
                    <>
                      {" "}
                      <Badge
                        key={"badge" + item.subjectName + index}
                        color="#87d068"
                        text={item.subjectName}
                      />
                      <br />
                    </>
                  );
                })
              : ""}
          </span>
        );
      },
    },
    {
      title: "Khoa Phụ Trách",
      align: "center",
      key: "departmentId",
      dataIndex: "departmentName",
    },
    {
      title: "Học Kỳ Dự Kiến",
      align: "center",
      dataIndex: "term",
      key: "term",
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
              props.setRecordChange(record);
              props.setShowModalChange(true);
            }}
          >
            <RetweetOutlined />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => props.handleDeleteRecords([record.id])}
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
      rowKey="id"
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
