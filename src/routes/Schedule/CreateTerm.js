
import React, { useState, useEffect } from "react";
import { Modal, Form, Select } from "antd";
import { connect } from "react-redux";
import { NotificationManager } from "react-notifications";
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
  },
};

export const CreateSubject = (props) => {

  const [year, setYear] = useState(new Date().getFullYear());

  const [form] = Form.useForm();

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
      title="Tạo Mới Học Kỳ"
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
        props.onCancel();
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
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      >
        <Form.Item
          name="term"
          label="Kỳ"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Chọn học kỳ"
          >
            <Option value={1}>Học kỳ 1</Option>
            <Option value={2}>Học kỳ 2</Option>
            <Option value={3}>Học kỳ hè</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

const mapStateToProps = ({ educationProgram }) => {
  return { educationProgram };
};

export default connect(
  mapStateToProps,
  {}
)(CreateSubject);
