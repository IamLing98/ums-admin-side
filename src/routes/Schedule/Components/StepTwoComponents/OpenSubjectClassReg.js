import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
} from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
  CheckOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Vui lòng chọn các mốc thời gian!",
    },
  ],
};

const OpenSubjectClassReg = (props) => {
  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        title="Mở Đăng Ký Lớp Phần"
        visible={props.visible}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              props.handleOpenSubjectClassRegistration(
                {...values, id:props.id}
              );
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={() => props.setVisible(false)}
        maskClosable={false}
        okText="Xác Nhận"
        cancelText="Đóng"
        destroyOnClose={true}
        closable={false}
        centered
        okButtonProps={{
          icon: <CheckOutlined />,
          disabled: false, 
        }}
        cancelButtonProps={{
          icon: <RollbackOutlined />,
          disabled: false, 
        }}
      >
        <Form
          form={form}
          onFieldsChange={(changedFields, allFields) => {}}
          preserve={false}
          onValuesChange={(changedValues, allValues) => {}}
        >
          <Form.Item name="rangeTime" label="Thời gian" {...rangeConfig}>
            <RangePicker style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default OpenSubjectClassReg;
