/**
 * Module Dashboard
 */

import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Select } from "antd";
import { NotificationManager } from "react-notifications";
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
    term: undefined,
  },
};

export const SubjectCreate = (props) => {
  const [form] = Form.useForm();

  const handleSubmitForm = (values) => {
    api
      .post("/subjects", values, true)
      .then((res) => {
        NotificationManager.success("Tạo mới kỳ học thành công.");
        props.getSubjectList();
      })
      .catch((error) => {
        console.log(error.response);
        NotificationManager.error(error.response.data.message);
        if (error.response.status === 403) {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.response.status === "Lỗi xác thực") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
    props.onCancel();
  };

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
            handleSubmitForm(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        props.setShowModalCreate(false);
      }}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      centered
      closable={false}
      width={"40%"}
    >
      <Form
        form={form}
        {...formItemLayout}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      >
        <Row gutter={[24, 24]}>
          <Col span={12}>
            {" "}
            <Form.Item
              name="term"
              label="Kỳ"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn học kỳ"
              >
                <Option value={1}>Học kỳ 1</Option>
                <Option value={2}>Học kỳ 2</Option>
                <Option value={3}>Học kỳ hè</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            {" "}
            <Form.Item
              name="term"
              label="Kỳ"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn học kỳ"
              >
                <Option value={1}>Học kỳ 1</Option>
                <Option value={2}>Học kỳ 2</Option>
                <Option value={3}>Học kỳ hè</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name="term"
          label="Kỳ"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Chọn học kỳ"
          >
            <Option value={1}>Học kỳ 1</Option>
            <Option value={2}>Học kỳ 2</Option>
            <Option value={3}>Học kỳ hè</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubjectCreate;
