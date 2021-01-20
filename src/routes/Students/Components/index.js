/**
 * Year Class Dashboard
 */

import {
  DeleteFilled,
  DeleteOutlined,
  DoubleLeftOutlined,
  DownloadOutlined,
  DownOutlined,
  EditFilled,
  RetweetOutlined,
  SearchOutlined,
  UpOutlined,
} from "@ant-design/icons";
import {
  Alert,
  Button,
  Input,
  Popconfirm,
  Select,
  Space,
  Table,
  DatePicker, 
} from "antd";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { connect } from "react-redux";
import { Col, Row } from "reactstrap";
import ImportStudent from "Routes/Student/Components/ImportStudent";
import StudentDetails from "Routes/Student/Components/StudentDetails"; 

const defaultRecord = {
  admissionType: null,
  avatar: null,
  bankNumber: null,
  branchId: null,
  branchName: "",
  contactAddress: null,
  courseNumber: 24,
  cpstartDate: null,
  cyustartDate: null,
  dateBirth: null,
  departmentId: null,
  departmentName: "",
  email: null,
  endYear: 2021,
  enrollmentArea: null,
  ethnic: null,
  familyElement: null,
  fatherDateBirth: null,
  fatherName: null,
  fatherWork: null,
  fullName: "",
  homeTown: null,
  id: null,
  identificationNumber: null,
  identityCreatedDate: null,
  identityCreatedPlace: null,
  identityNumber: null,
  incentivesType: null,
  isSize: false,
  keySearch1: null,
  keySearch2: null,
  keySearch3: null,
  keySearch4: null,
  keySearch5: null,
  keySearchAction: null,
  motherDateBirth: null,
  motherName: null,
  motherWork: null,
  nickName: null,
  note: null,
  page: 0,
  pageSize: 999999,
  pathFile: null,
  permanentResidence: null,
  phoneNumber: null,
  priorityType: null,
  religion: null,
  sex: null,
  startYear: 2017,
  status: null,
  studentId: "",
  text: null,
  totalRecord: null,
  yearClassId: "",
  yearClassName: "",
};

export const StudentList = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh Sách Sinh Viên");

  const [loading, setLoading] = useState(true);

  const [studentList, setStudentList] = useState([]);

  const [options, setOptions] = useState([]);

  const [showMoreSearch, setShowMoreSearch] = useState(false);

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [recordShowDetails, setRecordShowDetails] = useState(defaultRecord);

  const [recordUpdate, setRecordUpdate] = useState(defaultRecord);

  const [pageSize, setPageSize] = useState(10);

  const [page, setPage] = useState(1);

  const [studentId, setStudentId] = useState(null);

  const [departmentId, setDepartmentId] = useState(null);

  const [startYear, setStartYear] = useState(null);

  const [classId, setClassId] = useState(null);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [rerender, setRerender] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [totalElements, setTotalElements] = useState(0);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const onSelect = (data) => {};

  const onChange = (data) => {
    setValue(data);
  };
  const onSearch = () => {
    const params = new URLSearchParams();
    if (studentId !== null) {
      params.append("studentId", studentId);
    }
    if (departmentId !== null && departmentId !== undefined) {
      params.append("departmentId", departmentId);
    }
    if (startYear !== null) {
      params.append("startYear", startYear);
    }
    api
      .get("/students?" + params.toString(), true)
      .then((response) => {
        setStudentList(response.content);
        setTotalElements(response.totalElements);
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

  const handleSubmitFormCreate = (values) => {
    setShowModalCreate(false);
    api
      .post("/education-programs", values, true)
      .then((response) => {
        NotificationManager.success("Tạo mới thành công");
        setRerender((value) => (value = !value));
      })
      .catch(function(err) {
        if (err.response.body.message === "Đã tồn tại") {
          NotificationManager.error("Đã Tồn Tại !!!");
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  const handleSubmitFormUpdate = (values) => {
    setShowModalUpdate(false);
    api
      .post("/education-program/update", values, true)
      .then((response) => {
        NotificationManager.success("Chỉnh sửa thành công");
        setRerender((value) => (value = !value));
      })
      .catch((error) => {
        NotificationManager.error("Không thành công");
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
    setRecordUpdate(defaultRecord);
  };

  const handleDeleteRecord = (values) => {
    var object = [];
    object.push(values);
    api
      .delete(`/education-programs/${id}`, object, true)
      .then((response) => {
        NotificationManager.success("Xoá thành công");
        setRerender((value) => (value = !value));
      })
      .catch((error) => {
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

  const handleDeleteMultipleRecord = (values) => {
    var object = [];
    values.map((item) => {
      object.push({ educationProgramId: item });
    });
    api
      .post("/education-program/delete", object, true)
      .then((response) => {
        NotificationManager.success("Xoá thành công");
        setRerender((value) => (value = !value));
      })
      .catch((error) => {
        NotificationManager.error("Không thành công");
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
    setSelectedRowKeys([]);
  };

  const handleChangeTable = (pagination) => {
    setPagination(pagination);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (studentId !== null) {
      params.append("studentId", studentId);
    }
    if (departmentId !== null) {
      params.append("departmentId", departmentId);
    }
    if (startYear !== null) {
      params.append("startYear", startYear);
    }
    api
      .get("/students?" + params.toString(), true)
      .then((response) => {
        setStudentList(response.content);
        setTotalElements(response.totalElements);
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
  }, [rerender]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => {
      setLoading(true);
    };
  }, [props.tabIsChange, JSON.stringify(props.departmentReducer)]);

  const columns = [
    {
      title: "Mã Sinh Viên ",
      dataIndex: "studentId",
      align:"center",
    },
    {
      title: "Họ Và Tên ",
      dataIndex: "fullName",
      align:"center",
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
                    setCurrentTitle(<span>Danh Sách Sinh Viên</span>);
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
      align:"center",
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
      align:"center",
    },
    {
      title: "Ngành Đào Tạo",
      dataIndex: "branchName",
      align:"center",
    },
    {
      title: "Niên Khoá",
      align:"center",
      render: (text, record) => (
        <span>{record.startYear + " - " + record.endYear}</span>
      ),
    },
    {
      title: "Thao Tác",
      align:"center",
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

  if (loading === true) {
    return <RctPageLoader />;
  } else
    return (
      <div>
        <div className="rct-block ">
          <div className="rct-block-title ">
            <h4>{currentTitle}</h4>
            <div className="contextual-link" style={{ top: "15px" }}></div>
          </div>
          <div className="collapse show">
            <div className="rct-full-block">
              <hr style={{ margin: "0px" }} />
              {showDetails === false ? (
                <div className="table-responsive">
                  {showMoreSearch === true ? (
                    <Row style={{ marginBottom: "15px" }}>
                      <Col
                        md={7}
                        sm={12}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <Row>
                          <Col md={4}>
                            <Select
                              allowClear
                              placeholder="Khoa..."
                              onClear={() => onSearch()}
                              onPressEnter={() => onSearch()}
                              onChange={(e) => setDepartmentId(e)}
                              // value={educationProgramLevel}
                            >
                              {props.departmentReducer.departmentList.map(
                                (item) => {
                                  return (
                                    <Option
                                      key={item.departmentId}
                                      value={item.departmentId}
                                    >
                                      {item.departmentName}
                                    </Option>
                                  );
                                }
                              )}
                            </Select>
                          </Col>
                          <Col md={4}>
                            <Select
                              style={{ width: "100%" }}
                              placeholder="Lớp..."
                              allowClear
                              onClear={() => onSearch()}
                              onChange={(e) => setClassId(e)}
                            >
                              {props.departmentReducer.departmentList.map(
                                (item) => {
                                  <Option
                                    key={item.departmentId}
                                    value={item.departmentId}
                                  >
                                    {item.departmentName}
                                  </Option>;
                                }
                              )}
                            </Select>
                          </Col>
                          <Col
                            md={4}
                            style={{
                              display: "block",
                              flexDirection: "column",
                            }}
                          ></Col>
                        </Row>
                      </Col>
                      <Col
                        md={4}
                        sm={12}
                        xs={12}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <div
                          className="tableListOperator"
                          style={{ textAlign: "right", width: "100%" }}
                        ></div>
                      </Col>
                    </Row>
                  ) : (
                    ""
                  )}
                  <Row>
                    <Col
                      md={7}
                      sm={6}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <Row>
                        <Col md={4}>
                          <Input
                            placeholder="Mã sinh viên..."
                            size="middle"
                            value={studentId}
                            onPressEnter={() => onSearch()}
                            allowClear
                            onChange={(e) => {
                              setStudentId(e.target.value);
                            }}
                          />
                        </Col>
                        <Col md={4}>
                          <DatePicker
                            onChange={(date, dateString) => {
                              setStartYear(dateString);
                            }}
                            picker="year"
                            placeholder="Niên khoá..."
                          />
                        </Col>
                        <Col
                          md={4}
                          style={{ display: "block", flexDirection: "column" }}
                        >
                          <button
                            type="button"
                            className="ant-btn "
                            onClick={() =>
                              setShowMoreSearch((value) => (value = !value))
                            }
                            style={{ marginRight: "15px" }}
                          >
                            {showMoreSearch === true ? (
                              <UpOutlined />
                            ) : (
                              <DownOutlined />
                            )}
                          </button>
                          <button
                            type="button"
                            className="ant-btn ant-btn-primary"
                            onClick={() => onSearch()}
                          >
                            <SearchOutlined />
                            <span>Tìm Kiếm</span>
                          </button>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      md={5}
                      sm={6}
                      xs={12}
                      style={{ display: "flex", flexDirection: "column" }}
                    >
                      <div
                        className="tableListOperator"
                        style={{ textAlign: "right", width: "100%" }}
                      >
                        <button
                          type="button"
                          className="ant-btn ant-btn-primary"
                          onClick={() => setShowModalCreate(true)}
                        >
                          <DownloadOutlined />
                          <span>Import</span>
                        </button>
                        <button
                          type="button"
                          className="ant-btn ant-btn-danger"
                          disabled={selectedRowKeys.length !== 0 ? false : true}
                          onClick={() =>
                            handleDeleteMultipleRecord(selectedRowKeys)
                          }
                        >
                          <DeleteOutlined />
                          <span>Xoá Nhiều</span>
                        </button>
                        <ExportCSV
                          csvData={studentList}
                          fileName={"educationList"}
                        />
                      </div>
                    </Col>
                  </Row>
                  <Alert
                    message={
                      <span>
                        Tìm thấy: <b>{totalElements}</b> sinh viên .{" "}
                      </span>
                    }
                    type="info"
                    showIcon
                    style={{ marginBottom: "15px" }}
                  />
                  <Table
                    columns={columns}
                    dataSource={studentList}
                    bordered
                    rowKey="studentId"
                    size="small"
                    rowSelection={true}
                    pagination={pagination}
                    onChange={(paging) => handleChangeTable(paging)}
                    showSizeChanger={true}
                    rowSelection={rowSelection}
                    locale={{
                      emptyText: (
                        <div className="ant-empty ant-empty-normal">
                          <div className="ant-empty-image">
                            <SearchOutlined style={{ fontSize: '16px', color: '#08c' }}/>
                          <p className="ant-empty-description">Không có sinh viên nào</p>
                          </div>
                        </div>
                      ),
                    }}
                  />
                </div>
              ) : (
                <StudentDetails record={recordShowDetails} />
              )}
              {showModalCreate === true ? (
                <ImportStudent
                  visible={showModalCreate}
                  onOk={(values) => handleSubmitFormCreate(values)}
                  onCancel={() => setShowModalCreate(false)}
                />
              ) : (
                ""
              )}

              <UpdateEducationProgram
                visible={showModalUpdate}
                onOk={(values) => handleSubmitFormUpdate(values)}
                onCancel={() => {
                  setShowModalUpdate(false);
                  setRecordUpdate(defaultRecord);
                }}
                record={recordUpdate}
              />
            </div>
          </div>
        </div>
      </div>
    );
};

const mapStateToProps = ({ departmentReducer }) => {
  return { departmentReducer };
};

export default connect(
  mapStateToProps,
  {}
)(StudentList);
