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
  Divider,
  Card,
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

const Progress11 = (props) => {
  const [form] = Form.useForm();

  const [subjectSubmitFormVisible, setSubjectSubmitFormVisible] = useState(
    false
  );

  return (
    <div>
      <Card bordered={true}>
        <Result
          icon={<SmileOutlined />}
          title="Bắt đầu Tên học phần mới bằng việc mở đăng ký học phần!"
          extra={
            <Button
              type="primary"
              onClick={() => setSubjectSubmitFormVisible(true)}
            >
              Mở DKHP
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
          okText="Mở đăng ký"
          cancelText="Đóng"
          destroyOnClose={true}
          closable={false}
          centered
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

export default Progress11;
