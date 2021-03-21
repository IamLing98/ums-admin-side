import { api } from "Api";
import React, { useEffect, useState, useRef } from "react";
import { NotificationManager } from "react-notifications";
import moment from "moment";

// import SubjectImport from './Import';
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteFilled,
  UndoOutlined,
} from "@ant-design/icons";
import { Button, Input, Space, Modal, Popconfirm, Spin } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import StudentAccountList from "./Components/AccountList";
import Highlighter from "react-highlight-words";
import AccountCreate from "./Components/TeacherAccountCreate";

export const TeacherAccount = (props) => {
  const [teacherAccountList, setTeacherAccountList] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [showAccountCreate, setShowAccountCreate] = useState(false);

  const [teacherList, setTeacherList] = useState([]);

  const [spinLoading, setSpinLoading] = useState(false);

  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.error("Did you forget something? Please activate your account");
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const getStudentAccountList = () => {
    setLoading(true);
    api
      .get(`/users?role=GV`)
      .then((res) => {
        setTeacherAccountList(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const getStudentList = () => {
    api
      .get("/users/teachers")
      .then((res) => {
        setTeacherList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleSubmitForm = (values) => {
    console.log(values);
    let userList = values.map((id) => {
      let user = {
        username: id,
      };
      return user;
    });
    setShowAccountCreate(false);
    setSpinLoading(true);
    api
      .post(`/users/create?role=GV`, userList)
      .then((res) => {
        NotificationManager.success("Tạo mới thành công");
        setSpinLoading(false);
        getStudentAccountList();
        getStudentList();
      })
      .catch((err) => {
        showErrNoti(err);
        setSpinLoading(false);
      });
  };

  const handleRestorePassword = (values) => {
    setSpinLoading(true);
    api
      .put(`/users?actionType=RESTORE`, values)
      .then((res) => {
        NotificationManager.success("Khôi phục mật khẩu thành công");
        getStudentAccountList();
        setSpinLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
        setSpinLoading(false);
      });
  };

  const handleDeleteUser = (values) => {
    setSpinLoading(true);
    api
      .delete(`/users/${values.username}`)
      .then((res) => {
        NotificationManager.success("Xoá thành công");
        getStudentAccountList();
        setSpinLoading(false);
      })
      .catch((err) => {
        showErrNoti(err);
        setSpinLoading(false);
      });
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
      title: "Username",
      dataIndex: "username",
      align: "center",
      width: "15%",
      ...getColumnSearchProps("username"),
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      width: "40%",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdDate",
      align: "center",
      width: "15%",
      render: (text) => moment(text).format("DD.MM.YYYY HH:mm:ss"),
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      align: "center",
      width: "15%",
      render: (text) => (text ? moment(text).format("DD.MM.YYYY HH:mm:ss") : ""),
    },
    {
      title: "Thao Tác",
      align: "center",
      width: "15%",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            placement="left"
            title={"Khôi phục mật khẩu?"}
            onConfirm={() => handleRestorePassword(record)}
            okText="Ok"
            cancelText="Không"
          >
            <Button type="">
              <UndoOutlined />
            </Button>
          </Popconfirm>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => handleDeleteUser(record)}
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
    getStudentList();
  }, []);

  if (loading) {
    return (
      <>
        <RctPageLoader />
      </>
    );
  } else
    return (
      <Spin spinning={spinLoading}>
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
                onClick={() => setShowAccountCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Tạo Mới </span>
              </Button>
            </div>
          </Col>
        </Row>
        <StudentAccountList
          columns={columns}
          data={teacherAccountList}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
        />

        <AccountCreate
          visible={showAccountCreate}
          setShowAccountCreate={setShowAccountCreate}
          teacherList={teacherList}
          handleSubmitForm={handleSubmitForm}
          departmentList={props.departmentList}
          yearClassList={props.yearClassList}
        />
      </Spin>
    );
};

export default TeacherAccount;
