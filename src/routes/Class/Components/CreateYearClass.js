/**
 * Module Dashboard
 */

import React, { useState, useEffect } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Modal,
  Select,
  Input,
  Form,
  DatePicker,
} from "antd";
import { connect } from "react-redux";
import { api } from "Api";

const { Option } = Select;
const { RangePicker } = DatePicker;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
  initialValues: {
    departmentId: undefined,
    branchId: undefined,
    educationProgramId: undefined,
    educationProgramType: undefined,
    educationProgramLevel: undefined,
    yearClassName: null,
    rangeTime: [],
  },
};

export const CreateYearClass = (props) => {
  const [departmentId, setDepartmentId] = useState(undefined);

  const [branchId, setBranchId] = useState(undefined);

  const [branchList, setBranchList] = useState([]);

  const [yearClassName, setYearClassName] = useState(null);

  const [startYear, setStartYear] = useState(undefined);

  const [educationProgramList, setEducationProgramList] = useState([]);

  const [educationProgramId, setEducationProgramId] = useState(undefined);

  const [educationProgramLevel, setEducationProgramLevel] = useState(undefined);

  const [educationProgramType, setEducationProgramType] = useState(undefined);

  const [educationProgramTypeList, setEducationProgramTypeList] = useState([]);

  const [form] = Form.useForm();

  const handleSubmitFormCreate = () => {
    let formData = new FormData();
    formData.append("educationProgramId", educationProgramId);
    formData.append("branchId", branchId);
    formData.append("educationProgramLevel", educationProgramLevel);
    formData.append("educationProgramType", educationProgramType);
    formData.append("educationProgramStatus", "2");
    props.onOk(formData);
  };
  useEffect(() => {}, [JSON.stringify(props.visible)]);

  const onFieldsChange = (changedFields, allFields) => {};

  return (
    <Modal
      title="Tạo Mới Lớp Niên Khoá"
      visible={props.visible}
      onOk={() => handleSubmitFormCreate()}
      onCancel={props.onCancel}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      destroyOnClose={true}
      closable={false}
      width="40%"
      // confirmLoading={true}
    >
      <Form
        form={form}
        {...formItemLayout}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      >
        <Form.Item
          name="educationProgramLevel"
          label="Trình độ đào tạo"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select
            allowClear
            placeholder="Trình độ đào tạo..."
            // onClear={() => onSearch()}
            // onPressEnter={() => onSearch()}
            onChange={(e) => {
              setEducationProgramLevel(e);
              if (e === null || e === undefined)
                setEducationProgramTypeList([]);
              if (e === "1")
                setEducationProgramTypeList([
                  { value: "2", label: "Đại Học Vừa Học Vừa Làm" },
                ]);
              if (e === "2")
                setEducationProgramTypeList([
                  { value: "2", label: "Đại Học Vừa Học Vừa Làm" },
                  { value: "3", label: "Văn Bằng 2" },
                ]);
              if (e === "3")
                setEducationProgramTypeList([
                  { value: "1", label: "Đại Học Chính Quy" },
                  { value: "2", label: "Đại Học Vừa Học Vừa Làm" },
                  { value: "4", label: "Liên Thông Cao Đẳng" },
                  { value: "7", label: "Đại Học Từ Xa" },
                ]);
            }}
            value={educationProgramLevel}
          >
            <Option value="1">Tiến Sỹ</Option>
            <Option value="2">Thạc Sỹ</Option>
            <Option value="3">Đại Học</Option>
          </Select>
        </Form.Item>
        {educationProgramLevel !== null && educationProgramLevel !== undefined && (
          <Form.Item
            name="educationProgramType"
            label="Hình thức đào tạo"
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Select
              allowClear
              placeholder="Hình thức đào tạo..."
              // onClear={() => onSearch()}
              // onPressEnter={() => onSearch()}
              onChange={(e) => setEducationProgramType(e)}
              value={educationProgramType}
            >
              {educationProgramTypeList.map((item, index) => {
                return (
                  <Option value={item.value} key={"ypeList" + index}>
                    {item.label}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          name="departmentId"
          label="Khoa"
          hasFeedback
          rules={[{ required: true, message: "Không được để trống khoa" }]}
        >
          <Select
            allowClear
            placeholder="Khoa..."
            onChange={(e) => {
              form.setFieldsValue({
                branchId: undefined,
                educationProgramId: undefined,
              });
              if (e === null || e == undefined) {
                setBranchList([]);
              } else {
                form.validateFields(["branchId"]);
                api
                  .get("/branches?departmentId=" + e, true)
                  .then((response) => {
                    setBranchList(response);
                  })
                  .catch((error) => {
                    if (error.message === "Forbidden") {
                      NotificationManager.error(
                        "Did you forget something? Please activate your account"
                      );
                    } else if (error.message === "Unauthorized") {
                      throw new SubmissionError({
                        _error: "Username or Password Invalid",
                      });
                    }
                  });
              }
            }}
          >
            {props.departmentReducer.departmentList.map((item) => {
              return (
                <Option key={item.departmentId} value={item.departmentId}>
                  {item.departmentName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {form.getFieldValue("departmentId") !== undefined &&
        form.getFieldValue("departmentId") !== null ? (
          <Form.Item
            name="branchId"
            label="Ngành đào tạo"
            hasFeedback
            rules={[
              { required: true, message: "Không được để trống ngành đào tạo!" },
            ]}
          >
            <Select
              allowClear
              placeholder="Ngành đào tạo..." 
              onChange={(e) => {
                form.setFieldsValue({ educationProgramId: undefined });
                if (e === undefined || e === null) {
                  setEducationProgramList([]);
                } else {
                  api
                    .get("/education-programs?branchId=" + e, true)
                    .then((response) => {
                      setEducationProgramList(response);
                    })
                    .catch((error) => {
                      if (error.message === "Forbidden") {
                        NotificationManager.error(
                          "Did you forget something? Please activate your account"
                        );
                      } else if (error.message === "Unauthorized") {
                        throw new SubmissionError({
                          _error: "Username or Password Invalid",
                        });
                      }
                    });
                }
              }}
            >
              {branchList.map((item) => {
                return (
                  <Option key={item.branchId} value={item.branchId}>
                    {item.branchName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : (
          ""
        )}
        <Form.Item name="rangeTime" label="Niên khoá">
          <RangePicker style={{ width: "100%" }} picker="year" />
        </Form.Item>

        {form.getFieldValue("rangeTime") != undefined && (
          <Form.Item
            name="yearClassName"
            label="Tên lớp"
            hasFeedback
            rules={[{ required: true, message: "Please select your country!" }]}
          >
            <Input
              allowClear
              placeholder="Tên lớp..."
              // onClear={() => onSearch()}
              // onPressEnter={() => onSearch()}
              onChange={(e) => setYearClassName(e.target.value)}
              value={yearClassName}
            ></Input>
          </Form.Item>
        )}
        <Form.Item
          name="Giảng viên chủ nhiệm"
          label="Giảng viên chủ nhiệm"
          hasFeedback
          rules={[{ required: true, message: "Please select your country!" }]}
        >
          <Select
            allowClear
            placeholder="Giảng viên chủ nhiệm..."
            // onClear={() => onSearch()}
            // onPressEnter={() => onSearch()}
            onChange={(e) => setEducationProgramId(e)}
            value={educationProgramId}
          >
            {educationProgramList.map((item) => {
              return (
                <Option
                  key={item.educationProgramId}
                  value={item.educationProgramId}
                >
                  {item.educationProgramName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({ educationProgram, departmentReducer }) => {
  return { educationProgram, departmentReducer };
};

export default connect(
  mapStateToProps,
  {}
)(CreateYearClass);
