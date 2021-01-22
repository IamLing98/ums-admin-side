import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Select, Input } from "antd";
import { NotificationManager } from "react-notifications";
import { RollbackOutlined, CheckOutlined } from "@ant-design/icons";
import { api } from "Api";

const { Option } = Select;

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
    departmentName: undefined,
    discussNumber: undefined,
    eachSubject: undefined,
    exerciseNumber: undefined,
    practiceNumber: undefined,
    preLearnSubjectList: [],
    selfLearningNumber: undefined,
    subjectForLevel: undefined,
    subjectId: undefined,
    subjectName: undefined,
    theoryNumber: undefined,
  },
};

const formFiels = [
  {
    name: "subjectId",
    label: "Mã Học Phần",
    type: "text",
    message: "Vui lòng nhập mã học phần...",
    required: true,
    placeholder: "Mã học phần...",
  },
  {
    name: "subjectName",
    label: "Tên Học Phần",
    type: "text",
    message: "Vui lòng nhập tên học phần...",
    required: true,
    placeholder: "Tên học phần...",
  },
  {
    name: "eachSubject",
    label: "Số Tín Chỉ",
    type: "number",
    message: "Vui lòng nhập số tín chỉ...",
    required: true,
    placeholder: "Số tín chỉ...",
  },
  {
    name: "theoryNumber",
    label: "Số Giờ Lý Thuyết",
    type: "number",
    message: "Vui lòng nhập số giờ lý thuyết...",
    required: true,
    placeholder: "Số giờ lý thuyết...",
  },
  {
    name: "exerciseNumber",
    label: "Số Giờ Bài Tập",
    type: "number",
    message: "Vui lòng nhập số giờ bài tập...",
    required: true,
    placeholder: "Số giờ bài tập...",
  },
  {
    name: "discussNumber",
    label: "Số Giờ Thảo Luận",
    type: "number",
    message: "Vui lòng nhập số giờ thảo luận...",
    required: true,
    placeholder: "Số giờ thảo luận...",
  },
  {
    name: "practiceNumber",
    label: "Số Giờ Thực Hành",
    type: "number",
    message: "Vui lòng nhập số giờ thực hành...",
    required: true,
    placeholder: "Số giờ thực hành...",
  },
  {
    name: "selfLearningNumber",
    label: "Số Giờ Tự Học",
    type: "number",
    message: "Vui lòng nhập số giờ tự học...",
    required: true,
    placeholder: "Số giờ tự học...",
  },
];

export const SubjectCreate = (props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Tạo Mới Học Phần"
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
      okButtonProps={{ icon:<CheckOutlined/>,disabled: false, style:{width:"108px"} }}
      cancelButtonProps={{ icon: <RollbackOutlined />,   disabled: false, style:{width:"108px"} }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      centered
      closable={false}
      width={"60%"}
      forceRender
    >
      <Form
        form={form}
        {...formItemLayout}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      >
        <Row gutter={[16, 24]}>
          <Col span={12}>
            {formFiels.map((item, index) => (
              <Form.Item
                key={"formF" + index}
                name={item.name}
                label={item.label}
                hasFeedback
                rules={[{ required: item.required, message: item.message }]}
              >
                <Input type={item.type} placeholder={item.placeholder} />
              </Form.Item>
            ))}
          </Col>
          <Col span={12}>
            {" "}
            <Form.Item
              name="subjectForLevel"
              label="Các Cấp Đào Tạo"
              hasFeedback
              rules={[
                { required: false, message: "Vui lòng chọn cấp đào tạo!!!" },
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn cấp đào tạo..."
              >
                <Option key={"lver" + 1} value={1}>
                  Cao học
                </Option>
                <Option key={"lver" + 2} value={2}>
                  Đại học chính quy
                </Option>
                <Option key={"lver" + 3} value={3}>
                  Cao đẳng
                </Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="departmentId"
              label="Khoa Phụ Trách"
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng chọn khoa phụ trách!!!" },
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn khoa phụ trách..."
              >
                {props.departmentList.map((item) => (
                  <Option key={item.departmentId} value={item.departmentId}>
                    {item.departmentName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="preLearnSubjectList"
              label="Môn Học Tiên Quyết"
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn môn học tiên quyết!!!",
                },
              ]}
            >
              <Select
                mode="multiple"
                style={{ width: "100%" }}
                placeholder="Môn học tiên quyết..."
              >
                {props.subjectList.map((item) => (
                  <Option key={"opts" + item.subjectId} value={item.subjectId}>
                    {item.subjectName + " - " + item.subjectId}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SubjectCreate;
