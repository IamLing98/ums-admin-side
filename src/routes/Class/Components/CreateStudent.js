/**
 * Module Dashboard
 */

import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Modal } from "antd";
import { CustomInput, Input, Form, FormGroup, Label } from "reactstrap";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import MultiSelect from "react-multi-select-component";

export const CreateStudent = (props) => {
  const [subjectId, setSubjectId] = useState("");

  const [subjectName, setSubjectName] = useState("");

  const [eachSubject, setEachSubject] = useState("");

  const [theoryNumber, setTheoryNumber] = useState("");

  const [exerciseNumber, setExerciseNumber] = useState("");

  const [discussNumber, setDiscussNumber] = useState("");

  const [practiceNumber, setPracticeNumber] = useState("");

  const [selfLearningNumber, setSelfLearningNumber] = useState([]);

  const [subjectForLevel, setSubjectForLevel] = useState("");

  const [educationProgramType, setEducationProgramType] = useState("0");

  const [selected, setSelected] = useState([]);

  const handleSubmitFormCreate = () => {
    let formData = new FormData();
    formData.append("subjectId", subjectId);
    formData.append("subjectName", subjectName);
    formData.append("eachSubject", eachSubject);
    formData.append("theoryNumber", theoryNumber);
    formData.append("exerciseNumber", exerciseNumber);
    formData.append("discussNumber", discussNumber);
    formData.append("practiceNumber", practiceNumber);
    formData.append("selfLearningNumber", selfLearningNumber);
    formData.append("subjectForLevel", subjectForLevel);
    props.onOk(formData);
  };
  useEffect(() => {
    // console.log(props.educationProgram.listBranch)
  }, [JSON.stringify(props.visible)]);

  return (
    <Modal
      title="Tạo Mới Sinh Viên"
      visible={props.visible}
      onOk={() => handleSubmitFormCreate()}
      onCancel={props.onCancel}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      destroyOnClose={true}
      centered
      closable={false}
      width={"75%"}
      // confirmLoading={true}
    >
      <div className="ant-row ant-form-item" style={{ margin: "0rem 0rem" }}>
        <div className="ant-col ant-col-8">
          <div className="ant-row">
            <div
              className="ant-col ant-col-8 ant-form-item-label"
              style={{ flex: "none" }}
            >
              <label title="Kỳ học: " style={{ fontWeight: "500" }}>
                Khoa:{" "}
              </label>
            </div>
            <div className="ant-col ant-col-16 ant-form-item-control">
              <select className="ant-input">
                <option>Kỳ 1</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <Row style={{ display: "flex", flexDirection: "row" }}>
        <Col md={8} style={{ display: "flex", flexDirection: "column" }}>
          <div className="form-group row  type-TEXT">
            <label
              htmlFor="educationProgramId"
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Mã Học Phần
            </label>

            <div className="col-12 col-sm-8">
              <input
                className="ant-input"
                placeholder="Mã Học Phần"
                type="text"
                onChange={(e) => setSubjectId(e.target.value)}
                value={subjectId}
              />
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              htmlFor="educationProgramId"
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Tên Học Phần
            </label>
            <div className="col-12 col-sm-8">
              <input
                placeholder="Tên Học Phần"
                type="text"
                className="ant-input"
                onChange={(e) => setSubjectName(e.target.value)}
                value={subjectName}
              />
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Số Tín Chỉ
            </label>
            <div className="col-12 col-sm-8">
              <input
                className="ant-input"
                value={eachSubject}
                type="text"
                placeholder="Số Tín Chỉ..."
                onChange={(e) => setEachSubject(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Số Giờ Lý Thuyết
            </label>
            <div className="col-12 col-sm-8">
              <input
                className="ant-input"
                value={theoryNumber}
                type="text"
                placeholder="Số Giờ Lý Thuyết..."
                onChange={(e) => setTheoryNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Số Giờ Bài Tập
            </label>
            <div className="col-12 col-sm-8">
              <input
                className="ant-input"
                value={exerciseNumber}
                type="text"
                placeholder="Số Giờ Bài Tập..."
                onChange={(e) => setExerciseNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Số Giờ Thảo Luận
            </label>
            <div className="col-12 col-sm-8">
              <input
                className="ant-input"
                value={discussNumber}
                type="text"
                placeholder="Số Giờ Thảo Luận..."
                onChange={(e) => setDiscussNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Số Giờ Thực Hành
            </label>
            <div className="col-12 col-sm-8">
              <input
                className="ant-input"
                value={practiceNumber}
                type="text"
                placeholder="Số Giờ Thực Hành..."
                onChange={(e) => setPracticeNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Số Giờ Tự Học
            </label>
            <div className="col-12 col-sm-8">
              <input
                className="ant-input"
                value={selfLearningNumber}
                type="text"
                placeholder="Số Giờ Tự Học..."
                onChange={(e) => setSelfLearningNumber(e.target.value)}
              />
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Các Cấp Đào Tạo
            </label>
            <div className="col-12 col-sm-8">
              <select
                className="ant-input"
                onChange={(e) => setSubjectForLevel(e.target.value)}
                value={subjectForLevel}
              >
                <option value="0">Các Cấp Đào Tạo</option>
                <option value="1">Tiến Sỹ</option>
                <option value="2">Thạc Sỹ</option>
                <option value="3">Đại Học</option>
                <option value="4">Cao Đẳng</option>
                <option value="5">Trung Cấp</option>
              </select>
            </div>
          </div>
        </Col>
        <Col
          style={{
            borderLeft: "1px solid #F7F7F7",
            display: "flex",
            flexDirection: "column",
          }}
          className="update-subject-divide-col-4"
        ></Col>
      </Row>
    </Modal>
  );
};

const mapStateToProps = ({ educationProgram }) => {
  return { educationProgram };
};

export default connect(
  mapStateToProps,
  {}
)(CreateStudent);
