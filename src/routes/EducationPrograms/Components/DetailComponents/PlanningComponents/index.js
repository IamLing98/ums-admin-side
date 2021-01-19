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
  VerticalAlignBottomOutlined,
} from "@ant-design/icons";
import { Table, Space, Button, Popconfirm, Input } from "antd";
import { Row, Col } from "reactstrap";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import SubjectList from "./SubjectList";

const EducationProgramDetail = (props) => {
  const [subjectList, setSubjectList] = useState([]);

  const [toUpdateSubject, setToUpdateSubject] = useState(false);

  const [totalCredit, setTotalCredit] = useState(0);

  const [selected1, setSelected1] = useState([]);

  const [selected2, setSelected2] = useState([]);

  const [selected3, setSelected3] = useState([]);

  const [selected4, setSelected4] = useState([]);

  const [recordUpdateSubject, setRecordUpdateSubject] = useState(null);

  const [optionsToUpdateSubject, setOptionsToUpdateSubject] = useState([]);

  const [render, setRerender] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [loading, setLoading] = useState(true);

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
    setTimeout(() => {
      setLoading(false);
    }, 3);
  }, []);

  if (loading === true) {
    return <RctPageLoader />;
  } else
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
                <Input placeholder="Năm học..." size="middle" />
              </Col>
              <Col md={4}>
                <Input placeholder="Học kỳ..." size="middle" />
              </Col>
              <Col md={4} style={{ display: "block", flexDirection: "column" }}>
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
              <Button
                type="primary"
                style={
                  selectedRowKeys.length > 0
                    ? {
                        background: "#DC0000",
                        borderColor: "#DC0000",
                        color: "wheat",
                        width: "122px",
                      }
                    : {}
                }
                disabled={selectedRowKeys.length > 0 ? false : true}
                onClick={() => handleDeleteMultipleRecord(selectedRowKeys)}
              >
                <DeleteOutlined />
                <span>Xoá Nhiều</span>
              </Button>
            </div>
          </Col>
        </Row>
        <SubjectList data={props.educationProgram.subjectList} />
      </>
    );
};

export default EducationProgramDetail;
