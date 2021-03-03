import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Popconfirm, Space, Table, Tag, Alert } from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  DoubleLeftOutlined,
  EditOutlined,
  RetweetOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { api } from "Api";
import Highlighter from "react-highlight-words";
import moment from "moment";

const StudentList = (props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    size: "default",
  });

  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const getColumnSearchProps = (values) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm theo ${values.columnName}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, values.dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, values.dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }} icon={<ClearOutlined />}>
            Xoá
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
    onFilter: (value, record) =>
      record[values.dataIndex]
        ? record[values.dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === values.dataIndex ? (
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
      title: "Mã Giảng Viên ",
      dataIndex: "employeeId",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "employeeId",
        columnName: "mã giảng viên",
      }),
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
      title: "Họ Và Tên",
      dataIndex: "fullName",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "fullName",
        columnName: "tên sinh viên",
      }),
    },
    {
      title: "Giới Tính",
      dataIndex: "sex",
      align: "center",
      render: (text, record) => <span>{text === 1 ? "Nam" : "Nữ"}</span>,
    },
    {
      title: "Ngày Sinh",
      dataIndex: "dateBirth",
      align: "center",
      render: (text, record) => <span>{moment(text).format("DD.MM.YYYY")}</span>,
    }, 
    {
      title: "Học hàm",
      dataIndex: "degree",
      align: "center",
      render: (text, record) => {
        switch (text) {
          case 2:
            return <span>Tiến sỹ</span>;
          default:
            return <span>Thạc sỹ</span>;
        }
      },
    },
    {
      title: "Học Vị",
      dataIndex: "scientific_titles",
      align: "center",
      render: (text, record) => {
        switch (text) {
          case 2:
            return <span>GS</span>;
          default:
            return <span>PGS</span>;
        }
      },
    },
    {
      title: "Khoa Đào Tạo",
      dataIndex: ["department", "departmentName"],
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "departmentName",
        columnName: "khoa đào tạo",
      }),
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
              console.log("cc");
              console.log(record);
              props.setShowModalUpdate(record);
            }}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => props.handleDeleteRecord([record.studentId])}
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
    console.log(pagination);
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
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="employeeId"
        bordered
        size="small"
        pagination={pagination}
        onChange={(paging) => handleChangeTable(paging)}
        showSizeChanger={true}
        rowSelection={rowSelection}
        onRow={(record, index) => {
          if (record.isSelecting === true) return { style: { background: "#4DC2F7", fontWeight: "bolder" } };
        }}
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div className="ant-empty-image">
                <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                <p className="ant-empty-description">Không có kết quả nào</p>
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};

export default StudentList;
