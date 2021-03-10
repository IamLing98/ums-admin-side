import React, { useState, useEffect } from "react";
import { Result, Button, Modal, Form, DatePicker, Card } from "antd";
import { ArrowRightOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import { CheckOutlined, RollbackOutlined } from "@ant-design/icons";
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

const OpenInputGrade = (props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Mở Nhập Điểm"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.handleOpenInputGrade(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => props.setShowOpenInputGrade(false)}
      maskClosable={false}
      okText="Đồng ý"
      cancelText="Đóng"
      destroyOnClose={true}
      closable={false}
      centered
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
    >
      <Form
        form={form}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      >
        <Form.Item name="rangeTime" label="Thời gian" {...rangeConfig}>
          <RangePicker style={{ width: "100%" }} showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default OpenInputGrade;
