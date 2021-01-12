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
  Slider,
  Switch,
  Statistic,
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
    numberOfSeats: undefined,
  },
};

const OpenSubjectClass = (props) => {
  const [form] = Form.useForm();

  const [totalNumberOfSeats, setTotalNumberOfSeats ] = useState(0);
  const handleSubmitForm = (values) => {
    api
      .post("/terms", values, true)
      .then((res) => {
        NotificationManager.success("Tạo mới kỳ học thành công.");
        props.getTermList();
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
      title="Tạo mới lớp học phần"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            console.log(values);
            handleSubmitForm({ year: year, term: values.term });
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.validateFields();
        props.setVisible(false);
      }}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      destroyOnClose={true}
      centered
      closable={false}
      width={"40%"}
    >
      <Form
        form={form}
        {...formItemLayout}
        onFieldsChange={(changedFields, allFields) => {  }}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {
          if(allValues.numberOfSeats && allValues.numberOfGroup){
            setTotalNumberOfSeats(allValues.numberOfSeats * allValues.numberOfGroup)
          }
        }}
      >
        <Form.Item
          name="numberOfSeats"
          label="Sĩ số"
          // hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn sĩ số!" }]}
        >
          <Slider min={1} max={20} />
        </Form.Item>
        <Form.Item
          name="numberOfGroup"
          label="Số nhóm" 
          hasFeedback
          rules={[{ required: true, message: "Vui lòng điền số nhóm!" }]}
        >
          <Input type="number" />
        </Form.Item>
        <Form.Item
          name="isRequireLab"
          label="Yêu cầu phòng máy"
          // hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn !" }]}
        >
          <Switch />
        </Form.Item>
      </Form>

      <Row gutter={16}>
        <Col span={12}>
          <Statistic
            title="Số lượng dự đoán"
            value={props.subject.predictSubmit}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Số lượng đăng ký"
            value={props.subject.totalSubmit}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Số lượng theo lớp học phần"
            value={totalNumberOfSeats}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default OpenSubjectClass;
