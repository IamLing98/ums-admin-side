import React, { useState, useEffect } from "react";
import { Result, Button, Modal, Form, DatePicker, Card } from "antd";
import { CheckOutlined, RollbackOutlined } from "@ant-design/icons";
const { RangePicker } = DatePicker;
const rangeConfig = {
  rules: [
    {
      type: "array",
      // required: true,
      message: "Vui lòng chọn các mốc thời gian!",
    },
  ],
};

const Setting = (props) => {
  const [form] = Form.useForm();

  return (
    <Modal
      title="Cài đặt"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            let tuitionFeeStartDate;
            let tuitionFeeEndDate;
            try {
              tuitionFeeStartDate = values["rangeTime"][0].format("YYYY-MM-DDTHH:mm:ss");
              tuitionFeeEndDate = values["rangeTime"][1].format("YYYY-MM-DDTHH:mm:ss");
            } catch (e) {console.log(e)}
            let term = {
              ...props.term,
              tuitionFeeStartDate: tuitionFeeStartDate,
              tuitionFeeEndDate: tuitionFeeEndDate,
            };
            props.handleSettingTerm(term);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        props.onCancel(false);
      }}
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
        <Form.Item name="rangeTime" label="Thời gian thu học phí" {...rangeConfig}>
          <RangePicker style={{ width: "100%" }} showTime />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default Setting;
