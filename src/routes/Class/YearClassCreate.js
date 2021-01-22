import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Select, Input, DatePicker } from "antd";
import { NotificationManager } from "react-notifications";
import { RollbackOutlined, CheckOutlined } from "@ant-design/icons";
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
    classId: undefined,
    courseNumber: undefined,
    departmentId: undefined,
    educationProgramLevel: undefined,
    endYear: undefined,
    startYear: undefined,
    teacherId: undefined,
    rangeTime:[]
  },
};

 
export const YearClassCreate = (props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Tạo Mới Lớp Niên Khoá"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log(values);
            props.handleSubmitForm(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        props.setShowModalCreate(false);
      }}
      okButtonProps={{
        icon: <CheckOutlined />,
        disabled: false,
        style: { width: "108px" },
      }}
      cancelButtonProps={{
        icon: <RollbackOutlined />,
        disabled: false,
        style: { width: "108px" },
      }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      centered
      closable={false}
      width={"40%"}
      forceRender
    >
      <Form
        form={form}
        {...formItemLayout}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      > 
        <Form.Item
          name="departmentId"
          label="Khoa"
          hasFeedback
          rules={[{ required: true, message: "Không được để trống khoa" }]}
        >
          <Select allowClear placeholder="Khoa...">
            {props.departmentList.map((item) => {
              return (
                <Option key={item.departmentId} value={item.departmentId}>
                  {item.departmentName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          name="educationProgramLevel"
          label="Trình độ đào tạo"
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng chọn trình độ đào tạo!" },
          ]}
        >
          <Select allowClear placeholder="Trình độ đào tạo...">
            <Option value={1}>Cao học</Option>
            <Option value={2}>Đại học</Option>
            <Option value={3}>Cao đẳng</Option>
          </Select>
        </Form.Item>
        <Form.Item name="rangeTime" label="Niên khoá">
          <RangePicker style={{ width: "100%" }} picker="year" format="YYYY-MM-DD" />
        </Form.Item>
        <Form.Item
          name="teacherId"
          label="Giảng viên chủ nhiệm"
          hasFeedback
          rules={[{ required: false, message: "Please select your country!" }]}
        >
          <Select allowClear placeholder="Giảng viên chủ nhiệm..."></Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default YearClassCreate;
