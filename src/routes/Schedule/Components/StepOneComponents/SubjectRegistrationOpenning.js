import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal, 
  Form, 
  DatePicker, 
  Card,
} from "antd";
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

const SubjectRegistrationOpenning = (props) => {
  const [form] = Form.useForm();

  const [subjectSubmitFormVisible, setSubjectSubmitFormVisible] = useState(
    false
  );
 
  return (
    <div>
      <Card bordered={true}>
        <Result
          icon={<SmileOutlined />}
          title="Mở đăng ký học phần"
          extra={
            <Button
              type="primary"
              onClick={() => setSubjectSubmitFormVisible(true)}
              style={{ width: "180px" }}
            >
              <ArrowRightOutlined />
              Mở
            </Button>
          }
        />
        <Modal
          title="Mở Đăng Ký Học Phần"
          visible={subjectSubmitFormVisible}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                props.handleSubjectSubmittingOpen(
                  values,
                  setSubjectSubmitFormVisible
                );
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
          onCancel={() => setSubjectSubmitFormVisible(false)}
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
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      </Card>
    </div>
  );
};

export default SubjectRegistrationOpenning;
