import { api } from "Api";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import moment from "moment";

// import SubjectImport from './Import';
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  DoubleLeftOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Modal, Popconfirm } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import TeacherAccountList from "./Components/AccountList";
import Highlighter from "react-highlight-words";

const { confirm } = Modal;

export const TeacherAccount = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh sách tài khoản sinh viên");

  const [studentAccountList, setStudentAccountList] = useState([]);

  const [loading, setLoading] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const getStudentAccountList = () => {
    api
      .get(`/users?role=SV`)
      .then((res) => setStudentAccountList(res))
      .catch((err) => console.log(err));
  };

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
      title: "Mã sinh viên",
      dataIndex: "username",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      align: "center",
      render: (text) => moment(text).format("DD.MM.YYYY HH:mm:ss"),
    },
    {
      title: "Thao Tác",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            placement="left"
            title={"Khôi phục mật khẩu?"}
            onConfirm={() => props.handleDeleteRecord(record.classId)}
            okText="Ok"
            cancelText="Không"
          >
            <Button
              type=""
              onClick={() => {
                props.setShowModalUpdate(record);
              }}
            >
              <EditFilled />
            </Button>
          </Popconfirm>
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

  useEffect(() => {
    getStudentAccountList();
  }, []);

  if (loading) {
    return (
      <>
        <RctPageLoader />
      </>
    );
  } else
    return (
      <div className="table-responsive">
        <Row>
          <Col md={12} sm={12} xs={12}>
            <div
              className="tableListOperator"
              style={{ textAlign: "right", width: "100%" }}
            >
              <Button
                type="primary"
                style={{
                  background: "#448AE2",
                  borderColor: "#448AE2",
                  width: "180px",
                }}
                onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Tạo Mới </span>
              </Button>
            </div>
          </Col>
        </Row>
        <TeacherAccountList
          columns={columns}
          data={studentAccountList}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />
      </div>
    );
};

export default TeacherAccount;
