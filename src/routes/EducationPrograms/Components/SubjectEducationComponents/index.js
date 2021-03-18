import { api } from "Api";
import React, { useEffect, useState } from "react";
import { NotificationManager } from "react-notifications";
import { Col, Row } from "reactstrap";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  VerticalAlignBottomOutlined ,
  DiffOutlined 
} from "@ant-design/icons";
import { Button, Input, Modal } from "antd";
import SubjectList from "./SubjectList";
import AddSubjectModal from "./AddSubject";
import SubjectSwap from "./SubjectSwap";

const { confirm } = Modal;

export const SubjectEducationHome = (props) => {
  const [subjectOptsList, setSubjectOptsList] = useState([]);

  const [subjectList, setSubjectList] = useState([]);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showChangeModal, setShowModalChange] = useState(false);

  const [recordChange, setRecordChange] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSearch = () => {};

  const showErrNoti = (err) => {
    NotificationManager.err(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err(
        "Did you forget something? Please activate your account"
      );
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };

  const getListSubjectOpts = () => {
    api
      .get(
        `/education-program-subject?educationProgramId=${props.educationProgram.educationProgramId}&in=false`,
        true
      )
      .then((res) => {
        setSubjectOptsList(res);
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };

  const getSubjectList = () => {
    api
      .get(
        `/education-program-subject?educationProgramId=${props.educationProgram.educationProgramId}&in=true`,
        true
      )
      .then((res) => {
        setSubjectList(res);
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };

  const handleSubmitForm = (values) => {
    console.log(values);
    let listEducationSubject = [];
    values.subjectList.map((item) => {
      let obj = {};
      obj.subjectId = item;
      obj.term = values.term;
      obj.educationProgramId = props.educationProgram.educationProgramId;
      listEducationSubject.push(obj);
    });
    api
      .post("/education-program-subject", listEducationSubject, true)
      .then((res) => {
        NotificationManager.success(`Tạo mới ${res} học phần.`);
        getListSubjectOpts();
        getSubjectList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
    setShowAddModal(false);
  };

  const showDeleteConfirm = (selectedRowKeys) => {
    confirm({
      centered: true,
      title: "Chắc chắn?",
      icon: <ExclamationCircleOutlined />,
      content: "Vui lòng xác nhận",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        handleDeleteRecords(selectedRowKeys);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const handleDeleteRecords = (values) => {
    api
      .delete(
        `/education-program-subject/${
          props.educationProgram.educationProgramId
        }?${values.map((value, index) => `ids=${value}`).join("&")}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getListSubjectOpts();
        getSubjectList();
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  useEffect(() => {
    getSubjectList();
    getListSubjectOpts();
  }, [props.tab]);

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
              <Input placeholder="Mã Học Phần..." size="middle" />
            </Col>
            <Col md={4}>
              <Input placeholder="Tên Học Phần..." size="middle" />
            </Col>
            <Col md={4} style={{ display: "block", flexDirection: "column" }}>
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
        <Col md={6} sm={12} xs={12}>
          <div
            className="tableListOperator"
            style={{ textAlign: "right", width: "100%" }}
          >
            <Button
              type="primary"
              style={{
                background: "#448AE2",
                borderColor: "#448AE2",
                width: "122px",
              }}
              onClick={() => setShowAddModal(true)}
            >
              <PlusOutlined></PlusOutlined>
              <span>Thêm </span>
            </Button>
            <Button
              type="primary"
              style={
                selectedRowKeys.length > 1
                  ? {
                      background: "#DC0000",
                      borderColor: "#DC0000",
                      color: "wheat",
                      width: "122px",
                    }
                  : {}
              }
              disabled={selectedRowKeys.length > 1 ? false : true}
              onClick={() => showDeleteConfirm(selectedRowKeys)}
            >
              <DeleteOutlined />
              <span>Xoá Nhiều</span>
            </Button>
          </div>
        </Col>
      </Row>
      <SubjectList
        data={subjectList}
        educationProgram={props.educationProgram}
        handleDeleteRecords={handleDeleteRecords}
        setRecordChange={setRecordChange}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
        setShowModalChange={setShowModalChange}
      />

      <AddSubjectModal
        visible={showAddModal}
        subjectOptsList={subjectOptsList}
        setShowAddModal={setShowAddModal}
        handleSubmitForm={handleSubmitForm}
        educationProgram={props.educationProgram}
        // options={prerequisitesSubject}
      />

      <SubjectSwap
        visible={showChangeModal}
        subjectList={subjectList}
        recordChange={recordChange}
        getSubjectList={getSubjectList}
        setShowModalChange={setShowModalChange}
        setRecordChange={setRecordChange}
        // options={prerequisitesSubject}
      />

      {/* <SubjectImport
          visible={showModalImport}
          setShowModalImport={setShowModalImport}
          setRecordUpdate={setRecordUpdate}
          record={recordUpdate}
          subjectList={subjectList}
          departmentList={departmentList}
          getSubjectList={getSubjectList}
          // options={prerequisitesSubject}
        />   */}
    </>
  );
};

export default SubjectEducationHome;
