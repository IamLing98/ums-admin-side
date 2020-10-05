/**
 * Module Dashboard
 */

import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Modal } from "antd";
import { CustomInput, Input, Form, FormGroup, Label } from "reactstrap";
import { connect } from "react-redux";
import { Row, Col } from "reactstrap";
import MultiSelect from "react-multi-select-component";

export const UpdateSubject = (props) => {
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
    const { record } = props;
    setSubjectId(record.subjectId);
    setSubjectName(record.subjectName);
    setEachSubject(record.eachSubject);
    setTheoryNumber(record.theoryNumber);
    setExerciseNumber(record.exerciseNumber);
    setDiscussNumber(record.discussNumber);
    setPracticeNumber(record.practiceNumber);
    setSelfLearningNumber(record.selfLearningNumber);
    setSubjectForLevel(record.subjectForLevel);
  }, [JSON.stringify(props.record)]);

  return (
    <Modal
      title="Tạo Mới Học Phần"
      visible={props.visible}
      onOk={() => handleSubmitFormCreate()}
      onCancel={props.onCancel}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Chỉnh Sửa"
      cancelText="Đóng"
      destroyOnClose={true}
      centered
      closable={false}
      width={"60%"}
      // confirmLoading={true}
    >
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
                disabled
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
                type="text"
                placeholder="Số Tín Chỉ..."
                value={eachSubject}
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
                type="text"
                placeholder="Số Giờ Lý Thuyết..."
                value={theoryNumber}
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
                type="text"
                placeholder="Số Giờ Bài Tập..."
                value={exerciseNumber}
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
                type="text"
                placeholder="Số Giờ Thảo Luận..."
                value={discussNumber}
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
                type="text"
                placeholder="Số Giờ Thực Hành..."
                value={practiceNumber}
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
                type="text"
                placeholder="Số Giờ Tự Học..."
                value={selfLearningNumber}
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
        >
          <div className="subject-column-header">Học Phần Tương Đương</div>
          <div className="update-subject-select">
            <MultiSelect
              options={props.options}
              value={selected}
              onChange={setSelected}
              labelledBy={"Học Phần Tương Đương..."}
              style={{ width: "100%" }}
              overrideStrings={{
                selectSomeItems: "Học Phần Tương Đương...",
                allItemsAreSelected: "Đã Chọn Tất Cả.",
                selectAll: "Chọn Hết",
                search: "Tìm Kiếm",
              }}
            />
          </div>
          <div className="update-subject-result">
            <ul className="MuiList-root MuiList-padding">
              {selected.map((item, index) => (
                <>
                  <li className="MuiListItem-container" key={"li" + item.value}>
                    <div
                      className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button MuiListItem-secondaryAction"
                      tabIndex={0}
                      role="button"
                      aria-disabled="false"
                    >
                      <div className="MuiListItemAvatar-root">
                        {/* <div className="MuiAvatar-root MuiAvatar-circle bg-primary MuiAvatar-colorDefault">
                                                        <i className="zmdi zmdi-star" />  
                                                    </div> */}
                        {`${"\t" + index + ". "}`}
                      </div>
                      <div className="MuiListItemText-root">
                        <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
                          {item.label}
                        </span>
                      </div>
                      <span className="MuiTouchRipple-root" />
                    </div>
                    <div
                      className="MuiListItemSecondaryAction-root"
                      key={"spannn" + item.value}
                    >
                      <button
                        className="MuiButtonBase-root MuiIconButton-root"
                        tabIndex={0}
                        type="button"
                        aria-label="Delete"
                      >
                        <span
                          className="MuiIconButton-label"
                          onClick={() => { 
                            const value = item.value;
                            var newSelected = selected.filter(function(
                              element
                            ) {
                              return element.value !== value;
                            });
                            setSelected(newSelected);
                          }}
                        >
                          <i className="zmdi zmdi-delete text-primary" />
                        </span>
                        <span className="MuiTouchRipple-root" />
                      </button>
                    </div>
                  </li>
                  <hr style={{ margin: "0" }} />
                </>
              ))}
            </ul>
          </div>
        </Col>
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
)(UpdateSubject);
