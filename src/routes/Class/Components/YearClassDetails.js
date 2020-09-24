import React, { useEffect, useState } from "react";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  DeleteFilled,
  EditFilled,
  RetweetOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DiffOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { Table, Tag, Space, Button, Popconfirm, Alert, Input } from "antd";
import { Row, Col } from "reactstrap";
import UpdateEducationProgramSubject from "Routes/EducationProgram/Programs/Components/UpdateEducationProgramSubject";

const defaultRecord = {
  branchId: "",
  branchName: "",
  educationProgramId: "",
  educationProgramLevel: "3",
  educationProgramName: "",
  educationProgramStatus: "",
  educationProgramType: "",
};

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

const YearClassDetails = (props) => {
  const [details, setDetails] = useState(null);

  const [subjectList, setSubjectList] = useState([]);

  const [toUpdateSubject, setToUpdateSubject] = useState(false);

  const [totalCredit, setTotalCredit] = useState(0);

  const [selected1, setSelected1] = useState([]);

  const [selected2, setSelected2] = useState([]);

  const [selected3, setSelected3] = useState([]);

  const [selected4, setSelected4] = useState([]);

  const [recordUpdateSubject, setRecordUpdateSubject] = useState(defaultRecord);

  const [optionsToUpdateSubject, setOptionsToUpdateSubject] = useState([]);

  const [render, setRerender] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

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

  const handleSubmitUpdateEducationProgramSubject = (values) => {
    api
      .post("/education-program/updateSubject", values, true)
      .then((response) => {
        NotificationManager.success("Cập nhật thành công");
        setToUpdateSubject(false);
        setRecordUpdateSubject(defaultRecord);
        setRerender((value) => (value = !value));
      })
      .catch((error) => {
        setToUpdateSubject(false);
        setRecordUpdateSubject(defaultRecord);
        NotificationManager.error("Không thành công");
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  useEffect(() => {
    api
      .get("/yearClasses/details?classId=" + props.record.classId, true)
      .then((response) => {
        setDetails(response);
      })
      .catch((error) => {
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  }, []);

  const columns = [
    {
      title: "Mã Sinh Viên ",
      dataIndex: "studentId",
    },
    {
      title: "Họ Và Tên ",
      dataIndex: "fullName",
      render: (text, record) => (
        <a
          // className="ant-anchor-link-title ant-anchor-link-title-active"
          href="javascript:void(0)"
          onClick={() => {
            setShowDetails(true);
            setRecordShowDetails(record);
            setCurrentTitle(
              <span>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    setCurrentTitle(<span>Danh Sách Tổng Hợp</span>);
                    setShowDetails(false);
                    setRecordShowDetails(defaultRecord);
                  }}
                >
                  <DoubleLeftOutlined />
                </a>{" "}
                Thông Tin Chi Tiết Sinh Viên
              </span>
            );
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Lớp ",
      render: (text, record) => (
        <>
          {record.yearClassId +
            " - " +
            record.yearClassName +
            " K" +
            record.courseNumber}
        </>
      ),
    },
    {
      title: "Khoa Đào Tạo",
      dataIndex: "departmentName",
    },
    {
      title: "Ngành Đào Tạo",
      dataIndex: "branchName",
    },
    {
      title: "Niên Khoá",
      render: (text, record) => (
        <span>{record.startYear + " - " + record.endYear}</span>
      ),
    },
    {
      title: "Thao Tác",
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
              setRecordUpdate(record);
              setShowModalUpdate(true);
            }}
          >
            <EditFilled />
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

  if (details === null || details === undefined) {
    return <></>;
  } else
    return (
      <>
        <hr style={{ margin: "0px" }} />
        <div className="table-responsive">
          <Row>
            <Col
              md={6}
              sm={12}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <Row>
                <Col md={4}>
                  <Input placeholder="Mã sinh viên..." size="middle" />
                </Col>
                <Col md={4}>
                  <Input placeholder="Tên sinh viên..." size="middle" />
                </Col>
                <Col
                  md={4}
                  style={{ display: "block", flexDirection: "column" }}
                >
                  <button
                    type="button"
                    className="ant-btn ant-btn-primary"
                    onClick={() => {}}
                  >
                    <SearchOutlined />
                    <span>Tìm Kiếm</span>
                  </button>
                </Col>
              </Row>
            </Col>
            <Col md={6}>
              <div className="tableListOperator" style={{ textAlign: "right" }}>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary"
                  // onClick={() => setShowModalCreate(true)}
                >
                  <DownloadOutlined />
                  <span>Import</span>
                </button>
                <button
                  type="button"
                  className="ant-btn"
                  onClick={() => {
                    setToUpdateSubject(true);
                    setRecordUpdateSubject(props.record);
                  }}
                >
                  <EditFilled />
                  <span>Cập Nhật</span>
                </button>
                <button
                  type="button"
                  className="ant-btn ant-btn-danger"
                  disabled={selectedRowKeys.length !== 0 ? false : true}
                >
                  <DeleteOutlined />
                  <span>Xoá Nhiều</span>
                </button>
                <a
                  href="https://demo.doublechaintech.com/freshchain/platformManager/exportExcelFromList/P000001/productList/"
                  className="ant-btn"
                >
                  <DiffOutlined />
                  <span>In Exel</span>
                </a>
              </div>
            </Col>
          </Row>

          <div className="ant-row">
            <div className="ant-col ant-col-8  " >
              <Alert
                message={
                  <span>
                    Chương Trình Đạo Tạo: {props.record.educationProgramName}.{" "}
                    <a href="javascript:void(0)">Xem chi tiết</a>
                  </span>
                }
                type="info"
                showIcon
                style={{ marginBottom: "15px" }}
              />
            </div>
            <div className="ant-col ant-col-8  " >
              <Alert
                message={
                  <span>
                    Giáo Viên Chủ Nhiệm: {props.record.teacherFullName}.{" "}
                    <a href="javascript:void(0)">Xem chi tiết</a>
                  </span>
                }
                type="success"
                showIcon
                style={{ marginBottom: "15px" }}
              />
            </div >
            <div className="ant-col ant-col-8  " >
              <Alert
                message={
                  <span>
                    Tổng Số Sinh Viên: {props.record.teacherFullName}.{" "}
                    <a href="javascript:void(0)">Xem chi tiết</a>
                  </span>
                }
                type="success"
                showIcon
                style={{ marginBottom: "15px" }}
              />
            </div >
          </div>
          <Table
            columns={columns}
            dataSource={details.studentList}
            rowKey="studentId"
            bordered
            size="small"
            rowSelection={true}
            rowSelection={rowSelection}
          />
        </div>
        <UpdateEducationProgramSubject
          visible={toUpdateSubject}
          record={recordUpdateSubject}
          options={optionsToUpdateSubject}
          selectedSubjectList={subjectList}
          back={() => {
            setToUpdateSubject(false);
            setRecordUpdateSubject(defaultRecord);
          }}
          onOk={(values) => handleSubmitUpdateEducationProgramSubject(values)}
        />
      </>
    );
};

export default YearClassDetails;
