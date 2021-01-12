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
const RoomUpdate = (props) => {

  useEffect(()=>{
    console.log("render")
  },[])
  const [form] = Form.useForm();

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
    initialValues: { ...props.recordUpdate },
  };

  return (
    <Modal
      title="Cập nhật giảng đường"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            props.handleUpdateRoom({
              roomId: props.recordUpdate.roomId,
              numberOfSeats: values.numberOfSeats,
              isLab: values.isLab,
            });
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
      okText="Cập nhật"
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

export default RoomUpdate;
