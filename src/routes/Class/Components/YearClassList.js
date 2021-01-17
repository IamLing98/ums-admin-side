import {
  DeleteFilled,
  DeleteOutlined,
  DoubleLeftOutlined,
  EditFilled,
  PlusOutlined,
  RetweetOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { api } from "Api";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { Col, Row } from "reactstrap";
import CreateYearClass from "Routes/Class/Components/CreateYearClass";
import YearClassDetails from "Routes/Class/Components/YearClassDetails";
import ExportCSV from "Routes/EducationProgram/Programs/ExportCSV";
import UpdateEducationProgram from "Routes/EducationProgram/Programs/UpdateEducationProgram";
const defaultRecord = {
  classId: "",
  className: "",
  totalMember: "",
  startYear: "3",
  endYear: "",
  courseNumber: "",
  branchId: "",
  adviserId: "",
};

export const YearClassList = (props) => {
  const [currentTitle, setCurrentTitle] = useState("Danh Sách Lớp Niên Khoá");

  const [classList, setClassList] = useState([]);

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [showDetails, setShowDetails] = useState(false);

  const [recordUpdate, setRecordUpdate] = useState(defaultRecord);

  const [recordShowDetails, setRecordShowDetails] = useState(defaultRecord);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
  });

  const [rerender, setRerender] = useState(false);

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

  const handleSubmitFormCreate = (values) => {
    setShowModalCreate(false);
    api
      .post("/education-program/create", values, true)
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
    api
      .get("/yearClasses", true)
      .then((response) => {
        setClassList(response.content);
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

  const columns = [
    {
      title: "Mã Lớp ",
      dataIndex: "classId",
      align:"center",
    },
    {
      title: "Tên Lớp ",
      dataIndex: "className",
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
                    setCurrentTitle(<span>Danh Sách Lớp Niên Khoá</span>);
                    setShowDetails(false);
                  }}
                >
                  <DoubleLeftOutlined />
                </a>{" "}
                Thông Tin Chi Tiết Lớp:{" "}
                {record.classId +
                  " | " +
                  record.className +
                  " - " +
                  "K" +
                  record.courseNumber}
              </span>
            );
          }}
        >
          {record.className + " - " + "K" + record.courseNumber}
        </a>
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
      title: "Trình Độ Đào Tạo",
      dataIndex: "educationProgramLevel",
      align:"center",
      render: (text) => {
        if (text === 1) {
          return <span>Đào Tạo Tiến Sỹ</span>;
        } else if (text === 2) {
          return <span>Đào Tạo Thạc Sỹ</span>;
        } else if (text === 3) {
          return <span>Đại học</span>;
        } else {
          return <span></span>;
        }
      },
    },
    {
      title: "Hình Thức Đào Tạo",
      dataIndex: "educationProgramType",
      align:"center",
      render: (text) => {
        if (text === 1) {
          return <span>Đại học chính quy</span>;
        } else if (text === 2) {
          return <span>Đại học vừa làm vừa học </span>;
        } else if (text === 3) {
          return <span>Văn bằng 2</span>;
        } else if (text === 4) {
          return <span>L.thông từ Cao đẳng lên Đại học</span>;
        } else if (text === 5) {
          return <span>L.thông từ Trung cấp lên Đại học</span>;
        } else if (text === 6) {
          return <span>Liên kết đào tạo quốc tế</span>;
        } else if (text === 7) {
          return <span>Đại học từ xa</span>;
        }
      },
    },
    {
      title: "Niên Khoá",
      align:"center",
      render: (text, record) => {
        return <>{record.startYear + " - " + record.endYear}</>;
      },
    },
    {
      title: "GVCN",
      dataIndex: "branchName",
      align:"center",
    },
    {
      title: "Tình Trạng",
      dataIndex: "branchName",
      align:"center",
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
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Row>
                      <Col md={4}>
                        <Input placeholder="Mã lớp..." size="middle" />
                      </Col>
                      <Col md={4}>
                        <Input placeholder="Tên lớp..." size="middle" />
                      </Col>
                      <Col
                        md={4}
                        style={{ display: "block", flexDirection: "column" }}
                      >
                        <button
                          type="button"
                          className="ant-btn ant-btn-primary"
                          onClick={() => setShowModalCreate(true)}
                        >
                          <SearchOutlined />
                          <span>Tìm Kiếm</span>
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={6}
                    sm={12}
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
                        <PlusOutlined></PlusOutlined>
                        <span>Tạo Mới</span>
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
                        csvData={classList}
                        fileName={"educationList"}
                      />
                    </div>
                  </Col>
                </Row>
                <Table 
                  columns={columns}
                  dataSource={classList}
                  bordered
                  rowKey="classId"
                  size="small"
                  rowSelection={true}
                  pagination={pagination}
                  onChange={(paging) => handleChangeTable(paging)}
                  showSizeChanger={true}
                  rowSelection={rowSelection}
                />
              </div>
            ) : (
              <YearClassDetails
                record={recordShowDetails}
                back={() => {
                  setCurrentTitle("Danh Mục Chương Trình Đào Tạo");
                  setShowDetails(false);
                  setRecordShowDetails(defaultRecord);
                }}
              />
            )}
            <CreateYearClass
              visible={showModalCreate}
              onOk={(values) => handleSubmitFormCreate(values)}
              onCancel={() => setShowModalCreate(false)}
            />

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

export default YearClassList;
