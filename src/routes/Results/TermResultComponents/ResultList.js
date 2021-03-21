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

const ResultList = (props) => {
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
      title: "Mã Sinh Viên ",
      dataIndex: "studentId",
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
      title: "Họ Và Tên",
      dataIndex: ["student", "fullName"],
      align: "center",
    },
    {
      title: "Giới Tính",
      dataIndex: ["student", "sex"],
      align: "center",
      render: (text, record) => {
        if (text == 1) {
          return <span>Nam</span>;
        } else return <span>Nữ</span>;
      },
    },
    {
      title: "Ngày Sinh",
      dataIndex: ["student", "dateBirth"],
      align: "center",
      render: (text, record) => <span>{moment(text).format("DD.MM.YYYY")}</span>,
    },
    {
      title: "Lớp ",
      align: "center",
      dataIndex: ["yearClass", "className"],
      render: (text, record) => {
        return (
          <span>{record.yearClass.classId + " - " + record.yearClass.className}</span>
        );
      },
    },
    {
      title: "Khoa Đào Tạo",
      dataIndex: ["department", "departmentName"],
      align: "center",
      filters: props.departmentList.map((item, index) => {
        return { text: item.departmentName, value: item.departmentId };
      }),
      onFilter: (value, record) => record.department.departmentId === value,
    },
    {
      title: "GPA",
      align: "center",
      dataIndex: "gpa",
      sorter: (a, b) => a.gpa - b.gpa,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Điểm rèn luyện",
      dataIndex: "diemRenLuyen",
      align: "center",
    },
    {
      title: "Xếp loại",
      align: "center",
      dataIndex: "rank",
      filters: [
        {
          text: "Xuất săsc",
          value: 1,
        },
        {
          text: "Giỏi",
          value: 2,
        },
        {
          text: "Khá",
          value: 3,
        },
        {
          text: "Trung bình",
          value: 4,
        },
        {
          text: "Yếu",
          value: 5,
        },
      ],
      onFilter: (value, record) => record.rank === value,
      render: (text, record) => {
        switch (text) {
          case 1:
            return <span>Xuất sắc</span>;
          case 2:
            return <span>Giỏi</span>;
          case 3:
            return <span>Khá</span>;
          case 4:
            return <span>Trung bình</span>;
          case 5:
            return <span>Kém</span>;
          default:
            return <span></span>;
        }
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
              <p className="ant-empty-description">Chưa có kết quả học tập</p>
            </div>
          </div>
        ),
      }}
    />
  );
};

export default ResultList;
