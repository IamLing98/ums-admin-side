/**
 * Subject Home
 */

import {
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { Col, Row } from "reactstrap";
import CreateSubject from "Routes/EducationProgram/Subject/CreateSubject";
import UpdateSubject from "Routes/EducationProgram/Subject/UpdateSubject";

const defaultRecord = {
  discussNumber: "",
  eachSubject: "",
  exerciseNumber: "",
  practiceNumber: "",
  selfLearningNumber: "",
  subjectForLevel: "",
  subjectId: "",
  subjectName: "",
  theoryNumber: "",
};
export const SubjectList = (props) => {
  const [loading, setLoading] = useState(true);

  const [subjectList, setSubjectList] = useState([]);

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [prerequisitesSubject, setPrerequisitesSubject] = useState([]);

  const [recordUpdate, setRecordUpdate] = useState(defaultRecord);

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

  const handleSubmitFormCreate = (values) => { 
    setShowModalCreate(false);
    api
      .post("/subject/create", values, true)
      .then((response) => {
        NotificationManager.success("Tạo mới thành công");
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

  const handleSubmitFormUpdate = (values) => {
    setShowModalUpdate(false);
    api
      .post("/subject/update", values, true)
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
      .post("/subject/delete", object, true)
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
      object.push({ subjectId: item });
    });
    api
      .post("/subject/delete", object, true)
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

  useEffect(() => {
    api
      .get("/subjects", true)
      .then((response) => {
        setSubjectList(response);
        var options = [];
        response.map((item) => {
          var option = {
            value: item.subjectId,
            label: item.subjectName,
          };
          options.push(option);
        });
        setPrerequisitesSubject(options);
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
  }, [render]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => { 
      setLoading(true);
    };
  }, [props.tabIsChange]);

  const columns = [
    {
      title: "Mã Học Phần ",
      dataIndex: "subjectId",
    },
    {
      title: "Tên Học Phần ",
      dataIndex: "subjectName",
      width: "20%",
    },
    {
      title: "Số Tín Chỉ",
      children: [
        {
          title: "Từng Môn Học",
          dataIndex: "eachSubject",
        },
        {
          title: "Theo Hoạt Động Giờ Tín Chỉ",
          children: [
            {
              title: "Lý Thuyết",
              dataIndex: "theoryNumber",
            },
            {
              title: "Bài Tập (x2)",
              dataIndex: "exerciseNumber",
            },
            {
              title: "Thảo Luận (x2)",
              dataIndex: "practiceNumber",
            },
          ],
        },
        {
          title: "Thực Hành",
          dataIndex: "exerciseNumber",
        },
        {
          title: "Tự Học",
          dataIndex: "selfLearningNumber",
        },
      ],
    },
    {
      title: "Môn Học Tiên Quyết",
      dataIndex: "tags",
    },
    {
      title: "Trình Độ Đào Tạo",
      dataIndex: "subjectForLevel",
      render: (text) => {
        if (text === "1") {
          return <span>Đào Tạo Tiến Sỹ</span>;
        } else if (text === "2") {
          return <span>Đào Tạo Thạc Sỹ</span>;
        } else if (text === "3") {
          return <span>Đại học</span>;
        } else {
          return <span></span>;
        }
      },
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
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
  }
  return (
    <>
      <div className="rct-block ">
        <div className="rct-block-title ">
          <h4>
            <span>Danh Mục Học Phần</span>{" "}
          </h4>
          <div className="contextual-link" style={{ top: "15px" }}>
            {/* <a href="javascript:void(0)">
            <i className="ti-minus" />
          </a>
          <a href="javascript:void(0)">
            <i className="ti-close" />
          </a> */}
          </div>
        </div>
        <div className="collapse show">
          <div className="rct-full-block">
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
                      <Input placeholder="Mã Học Phần..." size="middle" />
                    </Col>
                    <Col md={4}>
                      <Input placeholder="Tên Học Phần..." size="middle" />
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
                <Col md={6} sm={12} xs={12}>
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
                      <span>Tạo Mới </span>
                    </button>
                    <button
                      type="button"
                      className="ant-btn ant-btn-danger"
                      disabled={selectedRowKeys.length > 0 ? false : true}
                      onClick={() =>
                        handleDeleteMultipleRecord(selectedRowKeys)
                      }
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
              <Table
                columns={columns}
                dataSource={subjectList}
                rowKey="subjectId"
                bordered 
                pagination={{ pageSize: 10 }}
                size="small"
                rowSelection={true}
                rowSelection={rowSelection}
              />
            </div>

            <CreateSubject
              visible={showModalCreate}
              onOk={(values) => handleSubmitFormCreate(values)}
              onCancel={() => setShowModalCreate(false)}
              options={prerequisitesSubject}
            />

            <UpdateSubject
              visible={showModalUpdate}
              onOk={(values) => handleSubmitFormUpdate(values)}
              onCancel={() => {
                setShowModalUpdate(false);
                setRecordUpdate(defaultRecord);
              }}
              record={recordUpdate}
              options={prerequisitesSubject}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default SubjectList;
