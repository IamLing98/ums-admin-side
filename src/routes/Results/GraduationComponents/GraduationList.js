import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import {
  DeleteFilled,
  EditFilled,
  SearchOutlined,
  RetweetOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { api } from "Api";
import Highlighter from "react-highlight-words";
import moment from "moment";

const GraduationList = (props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    size: "default",
  });

  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput.current = node;
          }}
          placeholder={`Tìm kiếm ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Xoá
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Mã Đợt Xét",
      dataIndex: "id",
      align: "center",
      ...getColumnSearchProps("studentId"),
      render: (text, record) => (
        <a
          // className="ant-anchor-link-title ant-anchor-link-title-active"
          href="javascript:void(0)"
          onClick={() => {
            console.log(record);
            props.setSelecting(record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Năm Học",
      dataIndex: ["student", "fullName"],
      align: "center",
    },
    {
      title: "Lần Xét",
      dataIndex: ["student", "sex"],
      align: "center",
      render: (text, record) => {
        if (text == 1) {
          return <span>Nam</span>;
        } else return <span>Nữ</span>;
      },
    },
    {
      title: "Thời Gian ",
      align: "center",
      dataIndex: ["yearClass", "className"],
      render: (text, record) => {
        return (
          <span>{record.yearClass.classId + " - " + record.yearClass.className}</span>
        );
      },
    },
    {
      title: "Thao Tác",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              console.log("cc");
              console.log(record);
              props.setShowModalUpdate(record);
            }}
          >
            <EditFilled />
          </Button>
        </Space>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }
  return (
    <Table
      columns={columns}
      dataSource={props.data}
      rowKey="studentId"
      bordered
      size="small"
      pagination={pagination}
      onChange={onChange}
      showSizeChanger={true}
      onRow={(record, index) => {
        if (record.isSelecting === true)
          return { style: { background: "#4DC2F7", fontWeight: "bolder" } };
      }}
      locale={{
        emptyText: (
          <div className="ant-empty ant-empty-normal">
            <div className="ant-empty-image">
              <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
              <p className="ant-empty-description">Chưa có kết quả học tập</p>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default GraduationList;
