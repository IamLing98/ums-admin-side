import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Select, Input, DatePicker, AutoComplete, Upload, message } from "antd";
import { NotificationManager } from "react-notifications";
import { RollbackOutlined, CheckOutlined, InboxOutlined } from "@ant-design/icons";
import { api } from "Api";
import { data } from "./data";

const { Option } = Select;

const { Dragger } = Upload;

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
    ...data,
  },
};

export const TeacherCreate = (props) => {
  const [form] = Form.useForm();

  const [classList, setCLassList] = useState([]);

  return (
    <Modal
      title="Tạo Mới Giảng Viên"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log(values);
            props.handleSubmitForm([values]);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        props.setShowModalCreate(false);
      }}
      okButtonProps={{ icon: <CheckOutlined />, disabled: false, style: { width: "108px" } }}
      cancelButtonProps={{ icon: <RollbackOutlined />, disabled: false, style: { width: "108px" } }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      centered
      closable={false}
      width={"70%"}
      forceRender
    >
      <Form
        form={form}
        {...formItemLayout}
        onFieldsChange={(changedFields, allFields) => {
          console.log(changedFields);
        }}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      >
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Form.Item
              name="fullName"
              label="Họ Và Tên"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn cấp đào tạo!!!" }]}
            >
              <Input placeholder="Họ và tên sinh viên..." />
            </Form.Item>
            <Form.Item
              name="sex"
              label="Giới Tính"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn giới tính!!!" }]}
            >
              <Select allowClear style={{ width: "100%" }} placeholder="Giới tính...">
                <Option value={0}>Nam</Option>
                <Option value={1}>Nữ</Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="dateBirth"
              label="Ngày Sinh"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn ngày sinh!!!" }]}
            >
              <DatePicker allowClear style={{ width: "100%" }} placeholder="Ngày sinh..."></DatePicker>
            </Form.Item>
            <Form.Item
              name="ethnic"
              label="Dân Tộc"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn dân tộc!!!" }]}
            >
              <Select allowClear style={{ width: "100%" }} placeholder="Dân tộc...">
                {props.ethnicList.map((item, index) => {
                  return (
                    <Option key={index + `ethnicOpts`} value={item.label}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="identityNumber"
              label="CMND/Căn Cước"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng nhập CMND/Căn cước!!!" }]}
            >
              <Input placeholder="Số CMND/Căn cước..." />
            </Form.Item>
            <Form.Item
              name="homeTown"
              label="Quê Quán"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng nhập quê quán!!!" }]}
            >
              <Select allowClear style={{ width: "100%" }} placeholder="Quê quán...">
                {props.provinceList.map((item, index) => {
                  return (
                    <Option key={index + `provinceOpts`} value={item.label}>
                      {item.label}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="contactAddress"
              label="Địa Chỉ Thường Trú"
              hasFeedback
              rules={[{ required: false, message: "Vui lòng nhập địa chỉ thường trú!!!" }]}
            >
              <Input placeholder="Địa chỉ thường trú..." />
            </Form.Item>
            <Form.Item
              name="phoneNumber"
              label="Số Điện Thoại"
              hasFeedback
              rules={[{ required: false, message: "Vui lòng nhập số điện thoại!!!" }]}
            >
              <Input placeholder="Số điện thoại..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="fatherName"
              label="Họ Và Tên Bố"
              hasFeedback
              rules={[{ required: false, message: "Vui lòng nhập họ và tên bố!!!" }]}
            >
              <Input placeholder="Họ và tên bố..." />
            </Form.Item>
            <Form.Item
              name="fatherDateBirth"
              label="Năm sinh bố"
              hasFeedback
              rules={[{ required: false, message: "Vui lòng nhập năm sinh của bố!!!" }]}
            >
              <Input type="number" placeholder="Năm sinh của bố..." />
            </Form.Item>
            <Form.Item
              name="motherName"
              label="Họ Và Tên Mẹ"
              hasFeedback
              rules={[{ required: false, message: "Vui lòng nhập họ và tên mẹ!!!" }]}
            >
              <Input placeholder="Họ và tên mẹ..." />
            </Form.Item>
            <Form.Item
              name="motherDateBirth"
              label="Năm sinh mẹ"
              hasFeedback
              rules={[{ required: false, message: "Vui lòng nhập năm sinh của mẹ!!!" }]}
            >
              <Input type="number" placeholder="Năm sinh của mẹ..." />
            </Form.Item>
            <Form.Item
              name="priorityType"
              label="Chính Sách Ưu Tiên"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn chính sách ưu tiên!!!" }]}
              disabled
            >
              <Select allowClear style={{ width: "100%" }} placeholder="Chính sách ưu tiên...">
                <Option key={"priorityType0"} value={0}>
                  {" "}
                  Không{" "}
                </Option>
                <Option key={1 + "priorityType"} value={1}>
                  {" "}
                  Đối tượng 1{" "}
                </Option>
                <Option key={2 + "priorityType"} value={2}>
                  {" "}
                  Đối tượng 2{" "}
                </Option>
                <Option key={3 + "priorityType"} value={3}>
                  {" "}
                  Đối tượng 3{" "}
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="educationProgramId"
              label="Chương Trình Đào Tạo"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn chương trình đào tạo!!!" }]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Chương trình đào tạo..."
                showSearch
                onChange={(value) => {
                  let edu = props.educationProgramList.filter((item) => item.educationProgramId == value);
                  if (edu.length) {
                    const value = form.getFieldValue("departmentId");
                    console.log("edu", edu[0].departmentId);
                    form.setFieldsValue({ departmentId: edu[0].departmentId });
                    let classList = props.classList.filter((item) => item.departmentId == edu[0].departmentId);
                    if (classList.length) {
                      console.log("classList", classList);
                      setCLassList(classList);
                    } else {
                      setCLassList([]);
                    }
                  } else {
                    form.setFieldsValue({ departmentId: undefined });
                  }
                }}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {props.educationProgramList.map((item, index) => {
                  return (
                    <Option key={index + "eduOpts" + item.educationProgramId} value={item.educationProgramId}>
                      {" "}
                      {item.educationProgramName}{" "}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="departmentId"
              label="Khoa "
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn khoa!!!" }]}
            >
              <Select allowClear style={{ width: "100%" }} placeholder="Khoa..." showSearch disabled>
                {props.departmentList.map((item, index) => {
                  return (
                    <Option key={index + "depOpts" + item.departmentId} value={item.departmentId}>
                      {" "}
                      {item.departmentName}{" "}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="courseNumber"
              label="Khoá "
              hasFeedback
              rules={[{ required: false, message: "Vui lòng chọn khoa!!!" }]}
            >
              <Select allowClear style={{ width: "100%" }} placeholder="Khoá..." showSearch disabled>
                {props.departmentList.map((item, index) => {
                  return (
                    <Option key={index + "depOpts" + item.departmentId} value={item.departmentId}>
                      {" "}
                      {item.departmentName}{" "}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="yearClassId"
              label="Lớp Niên Khoá"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn lớp niên khoá!!!" }]}
            >
              <Select allowClear style={{ width: "100%" }} placeholder="Lớp niên khoá..." showSearch>
                {classList.map((item, index) => {
                  return (
                    <Option key={index + "ClassOpts" + item.classId} value={item.classId}>
                      {" "}
                      {item.className + item.classId}{" "}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Dragger {...propss}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Kéo file ảnh sinh viên</p>
        </Dragger>
      </Form>
    </Modal>
  );
};

const propss = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default TeacherCreate;
