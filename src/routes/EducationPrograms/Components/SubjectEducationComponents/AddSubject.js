import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Input, Slider } from "antd";
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
    term: undefined,
    subjectList: [],
  },
};

export const AddSubjectModal = (props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Thêm Mới Học Phần"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.handleSubmitForm(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        props.setShowAddModal(false);
      }}
      okButtonProps={{ icon:<CheckOutlined/>,disabled: false, style:{width:"108px"} }}
      cancelButtonProps={{ icon: <RollbackOutlined />,   disabled: false, style:{width:"108px"} }}
      maskClosable={false}
      okText="Thêm"
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
          name="subjectList"
          label="Học Phần"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng chọn môn học!!!",
            },
          ]}
        >
          <Select
            showSearch
            mode="multiple"
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            style={{ width: "100%" }}
            placeholder="Học phần..."
          >
            {props.subjectOptsList.map((item) => (
              <Option key={"opts" + item.subjectId} value={item.subjectId}>
                {item.subjectName + " - " + item.subjectId}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="term"
          label="Kỳ Học"
          hasFeedback
          rules={[
            {
              required: true,
              message: "Vui lòng chọn kỳ học dự kiến!!!",
            },
          ]}
        >
          <Input type="number" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddSubjectModal;
