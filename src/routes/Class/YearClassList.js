import React, { useEffect, useState, useRef } from "react";
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
import Highlighter from "react-highlight-words";
const YearClassList = (props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    size: "default",
  });

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm theo ${dataIndex}`}
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
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
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

  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

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
      title: "Mã Lớp ",
      dataIndex: "classId",
      align: "center",
    },
    {
      title: "Tên Lớp ",
      dataIndex: "className",
      align: "center",
      render: (text, record) => (
        <a
          href="javascript:void(0)"
          onClick={() => {
            props.setSelecting(record);
          }}
        >
          <span>{record.className + " - " + "K" + record.courseNumber}</span>
        </a>
      ),
    },
    {
      title: "Khoa Đào Tạo",
      dataIndex: "departmentName",
      align: "center",
    },
    {
      title: "Trình Độ Đào Tạo",
      dataIndex: "educationProgramLevel",
      align: "center",
      render: (text) => {
        if (text === 1) {
          return <span>Cao học</span>;
        } else if (text === 2) {
          return <span>Đào học</span>;
        } else if (text === 3) {
          return <span>Cao đẳng</span>;
        } else {
          return <span></span>;
        }
      },
    },
    {
      title: "Niên Khoá",
      align: "center",
      render: (text, record) => {
        return <>{record.startYear + " - " + record.endYear}</>;
      },
    },
    {
      title: "GVCN",
      dataIndex: "teacherFullName",
      align: "center",
    },
    {
      title: "Sỹ Số",
      dataIndex: "totalMember",
      align: "center",
    },
    {
      title: "Thao Tác",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              props.setShowModalUpdate(record);
            }}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => props.handleDeleteRecord(record.classId)}
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
      rowKey="classId"
      bordered
      size="small"
      pagination={pagination}
      onChange={(paging) => handleChangeTable(paging)}
      showSizeChanger={true}
      rowSelection={rowSelection}
      onRow={(record, index) => {
        if (record.isSelecting === true)
          return { style: { background: "#4DC2F7", fontWeight: "bolder" } };
      }}
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

export default YearClassList;
