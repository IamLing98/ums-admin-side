import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
  Divider,
} from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
  FolderOpenOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import CreateSubjectClass from "../StepTwoComponents/CreateSubjectClass";

const Progress13 = (props) => {
  const [submittingInfo, setSubmittingInfo] = useState([]);

  const getSubmittingInfo = (termId) => {
    api
      .get("/subjectsRegistration/" + termId)
      .then((res) => { 
        setSubmittingInfo(res);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSubmittingInfo(props.term.id);
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const [
    showSubjectClassCreateModal,
    setShowSubjectClassCreateModal,
  ] = useState(false);

  const [subjectToCreateClass, setSubjectToCreateClass] = useState(null);

  const rowSelection = {
    selectedRowKeys,
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
          setSelectedRowKeys(newSelectedRowKeys);
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
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
      align: "center",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
    },
    {
      title: "Khoa phụ trách",
      dataIndex: "departmentName",
      align: "center",
    },
    {
      title: "Loại học phần",
      dataIndex: "subjectType",
      align: "center",
      render: (text, record) => {
        if (record.subjectType == "1") {
          return <span>Lý thuyết</span>;
        } else if (record.subjectType == "2") {
          return <span>Lý thuyết/Thảo luận</span>;
        } else if (record.subjectType == "3") {
          return <span>Lý thuyết/Thực hành</span>;
        } else {
          return <>cc</>;
        }
      },
    },
    {
      title: "Số lượng đăng ký",
      dataIndex: "totalSubmit",
      width: "30%",
      align: "center",
      render: (text, record) => {
        return (
          <Space>
            <Badge status="warning" />
            Dự đoán:{record.predictSubmit}
            <Badge status="processing" />
            Tổng số: {record.totalSubmit}
            <Badge status="success" />
            Tự động: <b>{record.autoSubmit}</b>
          </Space>
        );
      },
    },
    {
      title: "Số lớp đã mở",
      dataIndex: "totalSubjectClassOpened",
      align: "center",
    },
    {
      title: "Thao tác",
      align: "center",
      dataIndex: "term",
      width: "15%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              setShowSubjectClassCreateModal(true);
              setSubjectToCreateClass(record);
            }}
          >
            <BranchesOutlined />
          </Button>
          <Button
            type=""
            onClick={() => {
              setRecordUpdate(record);
              setShowModalUpdate(true);
            }}
          >
            <LockOutlined />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => handleDeleteRecord(record)}
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
    <>
      <Row>
        <Col
          md={6}
          sm={12}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <Row>
            <Col md={4}>
              <Input placeholder="Mã học phần..." size="middle" />
            </Col>
            <Col md={4}>
              <Input placeholder="Tên học phần..." size="middle" />
            </Col>
            <Col md={4} style={{ display: "block", flexDirection: "column" }}>
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                //onClick={() => setShowModalCreate(true)}
              >
                <SearchOutlined />
                <span>Tìm Kiếm</span>
              </button>
            </Col>
          </Row>
        </Col>
        <Col md={6} sm={12} xs={12}>
          <div
            className="tableListOperator"
            style={{ textAlign: "right", width: "100%" }}
          >
            <button
              type="button"
              className="ant-btn ant-btn-primary"
              // onClick={() => setShowModalCreate(true)}
            >
              <FolderOpenOutlined />
              <span>Mở tự động </span>
            </button>{" "}
          </div>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={submittingInfo}
        rowKey="subjectId"
        bordered
        pagination={{ pageSize: 10, size: "default" }}
        size="small" 
        rowSelection={rowSelection}
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div className="ant-empty-image">
                <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                <p className="ant-empty-description">
                  Không có dữ liệu đăng ký học phần
                </p>
              </div>
            </div>
          ),
        }}
      />
      {showSubjectClassCreateModal && (
        <CreateSubjectClass
          visible={showSubjectClassCreateModal}
          setVisible={setShowSubjectClassCreateModal}
          subject={subjectToCreateClass}
          term={props.term}
          getSubmittingInfo={getSubmittingInfo}
        />
      )}
    </>
  );
};

export default Progress13;
