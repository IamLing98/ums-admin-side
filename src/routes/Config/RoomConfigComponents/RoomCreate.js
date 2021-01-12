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
    roomId: null,
    numberOfSeats: undefined,
    isLab: undefined,
  },
};

const RoomCreate = (props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Tạo mới giảng đường"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            props.handleCreateNewRoom(values);
            form.resetFields(); 
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        props.setPageStatus(1);
      }}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo mới"
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
        {" "}
        <Form.Item
          name="roomId"
          label="Mã phòng"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng nhập mã phòng!" }]}
        >
          <Input allowClear placeholder="Mã phòng..."></Input>
        </Form.Item>
        <Form.Item
          name="numberOfSeats"
          label="Sức chứa"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng nhập sức chứa!" }]}
        >
          <Input allowClear placeholder="Sức chứa..."></Input>
        </Form.Item>
        <Form.Item
          name="isLab"
          label="Loại giảng đường"
          hasFeedback
          rules={[
            { required: true, message: "Vui lòng chọn loại giảng đường!" },
          ]}
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Chọn loại giảng đường..."
          >
            <Option value={0}>Thường</Option>
            <Option value={1}>Phòng máy</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomCreate;
