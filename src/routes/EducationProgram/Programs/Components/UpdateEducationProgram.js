/**
 * Module Dashboard
 */

import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Button, Modal } from "antd";
import { CustomInput, Input, Form, FormGroup, Label } from "reactstrap";
import { connect } from "react-redux";

export const UpdateEducationProgram = (props) => {
  const [educationProgramId, setEducationProgramId] = useState("");

  const [educationProgramName, setEducationProgramName] = useState("");

  const [branchId, setBranchId] = useState("");

  const [educationProgramLevel, setEducationProgramLevel] = useState("0");

  const [educationProgramType, setEducationProgramType] = useState("0");

  const handleSubmitFormCreate = () => {
    let formData = new FormData();
    formData.append("educationProgramId", educationProgramId);
    formData.append("educationProgramName", educationProgramName);
    formData.append("branchId", branchId);
    formData.append("educationProgramLevel", educationProgramLevel);
    formData.append("educationProgramType", educationProgramType);
    formData.append("educationProgramStatus", "2");
    props.onOk(formData);
  };
  useEffect(() => {
    const { record } = props;
    setEducationProgramId(record.educationProgramId);
    setEducationProgramName(record.educationProgramName);
    setBranchId(record.branchId);
    setEducationProgramLevel(record.educationProgramLevel);
    setEducationProgramType(record.educationProgramType);
  }, [JSON.stringify(props.record)]);

  return (
    <Modal
      title="Chỉnh Sửa CTDT"
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
      width="40%"
      // confirmLoading={true}
    >
      <div className="form-group row  type-TEXT">
        <label
          htmlFor="educationProgramId"
          style={{ textAlign: "right" }}
          className="col-sm-3 col-12 col-md-3 col-form-label"
        >
          Mã CTĐT
        </label>
        <div className="col-12 col-sm-8">
          <input
            name="educationProgramsId"
            id="educationProgramsId"
            placeholder="Mã Chương Trình Đào Tạo"
            type="text"
            className="ant-input"
            onChange={(e) => setEducationProgramId(e.target.value)}
            value={educationProgramId}
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
          Tên CTĐT
        </label>
        <div className="col-12 col-sm-8">
          <input
            name="educationProgramName"
            id="educationProgramName"
            placeholder="Tên Chương Trình Đào Tạo"
            type="text"
            className="ant-input"
            onChange={(e) => setEducationProgramName(e.target.value)}
            value={educationProgramName}
          />
        </div>
      </div>
      <div className="form-group row  type-TEXT">
        <label
          htmlFor="educationProgramId"
          style={{ textAlign: "right" }}
          className="col-sm-3 col-12 col-md-3 col-form-label"
        >
          Ngành Đào Tạo
        </label>
        <div className="col-12 col-sm-8">
          <select
            className="ant-input"
            onChange={(e) => setBranchId(e.target.value)}
            value={branchId}
          >
            <option value="">Ngành Đào Tạo</option>
            {props.educationProgram.listBranch.map((item) => (
              <option key={item.branchId} value={item.branchId}>
                {item.branchName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-group row  type-TEXT">
        <label
          htmlFor="educationProgramId"
          style={{ textAlign: "right" }}
          className="col-sm-3 col-12 col-md-3 col-form-label"
        >
          Cấp Đào Tạo
        </label>
        <div className="col-12 col-sm-8">
          <select
            className="ant-input"
            onChange={(e) => setEducationProgramLevel(e.target.value)}
            value={educationProgramLevel}
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
      <div className="form-group row  type-TEXT">
        <label
          htmlFor="educationProgramId"
          style={{ textAlign: "right" }}
          className="col-sm-3 col-12 col-md-3 col-form-label"
        >
          Hình Thức Đào Tạo
        </label>
        <div className="col-12 col-sm-8">
          <select
            className="ant-input"
            onChange={(e) => setEducationProgramType(e.target.value)}
            value={educationProgramType}
          >
            <option value="0">Hình Thức Đào Tạo</option>
            <option value="1">Đại Học Chính Quy</option>
            <option value="2">Đại Học Vừa Học Vừa Làm</option>
            <option value="3">Văn Bằng 2</option>
            <option value="4">Liên Thông Cao Đẳng</option>
            <option value="5">Liên Thông Trung Cấp</option>
            <option value="6">Liên Kết Đào Tạo Quốc Tế</option>
            <option value="7">Đại Học Từ Xa</option>
          </select>
        </div>
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ educationProgram }) => {
  return { educationProgram };
};

export default connect(
  mapStateToProps,
  {}
)(UpdateEducationProgram);
