import React, { useState, useEffect } from "react";
import { Modal, Form, DatePicker } from "antd";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  CheckOutlined,
  RollbackOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";

const { confirm } = Modal;

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

  function showConfirm(values) {
    confirm({
      centered:true,
      title: "Mở đăng ký học phần?",
      icon: <ExclamationCircleOutlined />,
      content: "Không thể thêm lớp học phần cho đến khi quá trình này kết thúc",
      okText: "Đồng ý",
      cancelText: "Đóng",
      okButtonProps: {
        icon: <CheckOutlined />,
        disabled: false,
        style: { width: "108px" },
      },
      cancelButtonProps: {
        icon: <RollbackOutlined />,
        disabled: false,
        style: { width: "108px" },
      },
      onOk() {
        props.handleOpenSubjectClassRegistration(values);  
      },
      onCancel() {
        props.setToOpenSubjectClassReg(false);
      },
    });
  }
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
              showConfirm({ ...values, id: props.id }); 
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        onCancel={() => props.setToOpenSubjectClassReg(false)}
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
