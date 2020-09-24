/**
 * Module Dashboard
 */

import { InboxOutlined } from "@ant-design/icons";
import { Modal, Select, Upload, Input } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { OutTable, ExcelRenderer } from "react-excel-renderer";
import { HotTable } from "@handsontable/react";
import Handsontable from "handsontable";

const { Dragger } = Upload;

const { Option } = Select;

export const ImportStudent = (props) => {
  const [educationProgramId, setEducationProgramId] = useState(null);

  const [educationProgramName, setEducationProgramName] = useState(null);

  const [branchId, setBranchId] = useState(null);

  const [educationProgramLevel, setEducationProgramLevel] = useState(null);

  const [educationProgramType, setEducationProgramType] = useState(null);

  const [modalWidth, setModalWidth] = useState("40%");

  const [rows, setRows] = useState([[]]);

  const [cols, setCols] = useState([]);

  const fileHandler2 = (file) => {
    let fileObj = file; 

    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) { 
      } else { 
        setRows(resp.rows);
        setCols(resp.cols);
      }
    });
  };

  const propss = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {  
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
      setModalWidth("90%");
      fileHandler2(info.file.originFileObj);
    },
  };

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
  }, [JSON.stringify(props.visible)]);

  const columns = [
    {
      title: "Số Báo Danh",
      dataIndex: "enrollId",
    },
    {
      title: "Họ Và Tên",
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
      title: "Địa Chỉ ",
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
  ];

  return (
    <Modal
      title="Import Danh Sách Sinh Viên"
      visible={props.visible}
      // onOk={() => handleSubmitFormCreate()}
      onOk={() => setModalWidth("60%")}
      onCancel={props.onCancel}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      destroyOnClose={true}
      closable={true}
      width={modalWidth}
      //   style={{maxHeight:"800px"}}

      // confirmLoading={true}
    >
      {/* <div className="form-group row  type-TEXT">
                <label htmlFor="educationProgramId" style={{ textAlign: "right" }} className="col-sm-3 col-12 col-md-3 col-form-label" >
                    Ngành Đào Tạo
                </label>
                <div className="col-12 col-sm-8"  >
                    <select className="ant-input" onChange={e => setBranchId(e.target.value)} value={branchId}>
                        <Option value="">Ngành Đào Tạo</Option>
                        {
                            props.educationProgram.listBranch.map(
                                item => <Option key={item.branchId} value={item.branchId}>{item.branchName}</Option>
                            )
                        }
                    </select>
                </div>
            </div> */}
      <div className="row">
        <div
          className={rows.length <= 1 ? "col-12" : "col-5"}
          style={{ display: "flex", flexDirection: "column" }}
        >
          <div className="form-group row  type-TEXT">
            <label
              htmlFor="educationProgramId"
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Khoa:
            </label>
            <div className="col-12 col-sm-8">
              <Select
                onChange={(e) => setEducationProgramType(e.target.value)}
                value={educationProgramType}
                placeholder="Khoa..."
              >
                {props.departmentReducer.departmentList.map(item=>{
                  return  <Option value={item.departmentId} key={item.departmentId}>{item.departmentName}</Option>;
                })} 
                 
              </Select>
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              htmlFor="educationProgramId"
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Ngành:
            </label>
            <div className="col-12 col-sm-8">
              <Select
                onChange={(e) => setEducationProgramType(e.target.value)}
                value={educationProgramType}
                placeholder="Ngành..."
              >
                <Option value="1">Đại Học Chính Quy</Option>
                <Option value="2">Đại Học Vừa Học Vừa Làm</Option>
                <Option value="3">Văn Bằng 2</Option>
                <Option value="4">Liên Thông Cao Đẳng</Option>
                <Option value="5">Liên Thông Trung Cấp</Option>
                <Option value="6">Liên Kết Đào Tạo Quốc Tế</Option>
                <Option value="7">Đại Học Từ Xa</Option>
              </Select>
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              htmlFor="educationProgramId"
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Cấp Đào Tạo:
            </label>
            <div className="col-12 col-sm-8">
              <Select
                placeholder="Cấp Đào Tạo..."
                onChange={(e) => setEducationProgramLevel(e.target.value)}
                value={educationProgramLevel}
              >
                <Option value="1">Tiến Sỹ</Option>
                <Option value="2">Thạc Sỹ</Option>
                <Option value="3">Đại Học</Option>
                <Option value="4">Cao Đẳng</Option>
                <Option value="5">Trung Cấp</Option>
              </Select>
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              htmlFor="educationProgramId"
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Hình Thức Đào Tạo:
            </label>
            <div className="col-12 col-sm-8">
              <Select
                placeholder="Hình Thức Đào Tạo..."
                onChange={(e) => setEducationProgramType(e.target.value)}
                value={educationProgramType}
              >
                <Option value="1">Đại Học Chính Quy</Option>
                <Option value="2">Đại Học Vừa Học Vừa Làm</Option>
                <Option value="3">Văn Bằng 2</Option>
                <Option value="4">Liên Thông Cao Đẳng</Option>
                <Option value="5">Liên Thông Trung Cấp</Option>
                <Option value="6">Liên Kết Đào Tạo Quốc Tế</Option>
                <Option value="7">Đại Học Từ Xa</Option>
              </Select>
            </div>
          </div>
          <div className="form-group row  type-TEXT">
            <label
              htmlFor="educationProgramId"
              style={{ textAlign: "right" }}
              className="col-sm-3 col-12 col-md-3 col-form-label"
            >
              Năm Tuyển Sinh:
            </label>
            <div className="col-12 col-sm-8">
              <Input type="number" placeholder="Năm tuyển sinh..." />
            </div>
          </div>
          <Dragger {...propss}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click hoặc kéo file tại đây để upload
            </p>
            <p className="ant-upload-hint">
              Chỉ hỗ trợ file có định dạng .xlsx
            </p>
          </Dragger>
        </div>
        {rows.length > 1 ? (
          <div className="col" style={{ maxWidth: "calc(58% - 20px)" }}>
            <HotTable
              id="hot"
              data={rows}
              licenseKey="non-commercial-and-evaluation"
              colHeaders={true}
              rowHeaders={true}
              width="auto"
            />
          </div>
        ) : (
          ""
        )}
      </div>
    </Modal>
  );
};

const mapStateToProps = ({ departmentReducer }) => {
  return { departmentReducer };
};

export default connect(mapStateToProps, {})(ImportStudent);
