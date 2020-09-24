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
  DownloadOutlined
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

const EducationProgramDetail = (props) => {
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
      .get("/subject/getAll", true)
      .then((response) => {
        var options = [];
        response.map((item) => {
          var option = {
            value: item.subjectId,
            label: item.subjectName,
          };
          options.push(option);
        });
        setOptionsToUpdateSubject(options);
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

  useEffect(() => {
    props.record !== null
      ? (props.record.subjectList = props.record.subjectList)
      : (props.record.subjectList = []); 
    api
      .post("/education-program/getDetails", props.record, true)
      .then((response) => { 
        var total = 0;
        response.subjectList.map((item) => {
          let eachCredit = roughScale(item.subject.eachSubject, "10");
          total += eachCredit;
        });
        setTotalCredit(total);
        setSubjectList(response.subjectList);
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

  const columns = [
    {
      title: "Mã Học Phần ",
      render: (text, record) => <a>{record.subject.subjectId}</a>,
    },
    {
      title: "Tên Học Phần ",
      render: (text, record) => <a>{record.subject.subjectName}</a>,
      width: "20%",
    },
    {
      title: "Số Tín Chỉ",
      render: (text, record) => <a>{record.subject.eachSubject}</a>,
    },
    {
      title: "Tự Chọn",
      dataIndex: "eachSubject",
    },
    {
      title: "Môn Học Tiên Quyết",
      dataIndex: "tags",
      render: (tags) => <></>,
    },
    {
      title: "Học Phần Học Trước",
      render: (text, record) => <a>{record.subject.subjectId}</a>,
    },
    {
      title: "Song Hành Với Học Phần",
      render: (text, record) => <a>{record.subject.subjectId}</a>,
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              setCurrentTitle("Cập Nhật Chương Trình Đào Tạo");
              setRecordUpdateSubject(record);
              setToUpdateSubject(true);
            }}
          >
            <RetweetOutlined />
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
              <Col md={4} style={{ display: "block", flexDirection: "column" }}>
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

        <Alert
          message={`Chương Trình Đạo Tạo: ${props.record.educationProgramName}. Tổng số học phần: ${subjectList.length}. Tổng số tín chỉ: ${totalCredit} `}
          type="info"
          showIcon
          style={{ marginBottom: "15px" }}
        />
        <Table
          columns={columns}
          dataSource={subjectList}
          rowKey="id"
          bordered
          scroll={{
            y: "400px",
          }}
          pagination={{ pageSize: 10 }}
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

export default EducationProgramDetail;
