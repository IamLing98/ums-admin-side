import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Input, Slider } from "antd";
import { NotificationManager } from "react-notifications";
import { api } from "Api";
import { RollbackOutlined, CheckOutlined } from "@ant-design/icons";
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
    branchId: undefined,
    branchName: undefined,
    educationProgramId: undefined,
    educationProgramLevel: undefined,
    educationProgramName: undefined,
    educationProgramStatus: undefined,
    educationProgramType: undefined,
    subjectList: [],
    totalTerm: undefined,
  },
};

export const EducationProgramCreate = (props) => {
  const [form] = Form.useForm();

  const [correctBranchList, setCorrectBranchList] = useState([]);

  const [isAllowBranchField, setIsAllowBranchField] = useState(false);

  const handleSubmitForm = (values) => {
    console.log(values);
    api
      .post("/education-programs", values, true)
      .then((res) => {
        NotificationManager.success("Tạo mới kỳ học thành công.");
        props.getEducationProgramList();
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

  function formatter(value) {
    return `${value} kỳ`;
  }

  return (
    <Modal
      title="Tạo Mới Chương Trình Đào Tạo"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleSubmitForm(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        props.onCancel();
      }}
      okButtonProps={{ icon:<CheckOutlined/>,disabled: false, style:{width:"108px"} }}
      cancelButtonProps={{ icon: <RollbackOutlined />,   disabled: false, style:{width:"108px"} }}
      maskClosable={false}
      okText="Tạo Mới"
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
        onValuesChange={(changedValues, allValues) => {
          if (changedValues["departmentId"]) {
            setIsAllowBranchField(true);
          } else {
            setIsAllowBranchField(false);
          }
        }}
      >
        <Form.Item
          name="educationProgramId"
          label="Mã CTĐT"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
        >
          <Input placeholder="Mã chương trình đào tạo..." />
        </Form.Item>
        <Form.Item
          name="educationProgramName"
          label="Tên CTĐT"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
        >
          <Input placeholder="Tên chương trình đào tạo..." />
        </Form.Item>
        <Form.Item
          name="departmentId"
          label="Khoa Phụ Trách"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Khoa phụ trách..."
          >
            {props.departmentList.map((item) => (
              <Option key={item.departmentId} value={item.departmentId}>
                {item.departmentName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="branchId"
          label="Ngành Đào Tạo"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Ngành đào tạo..."
            disabled={!isAllowBranchField}
          >
            {props.branchList.map((item) => (
              <Option key={item.branchId} value={item.branchId}>
                {item.branchName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="educationProgramLevel"
          label="Cấp Đào Tạo"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Cấp đào tạo..."
          >
            <Option key={"as" + 1} value={1}>
              Cao học
            </Option>
            <Option key={"as" + 2} value={2}>
              Đại Học
            </Option>
            <Option key={"as" + 3} value={3}>
              Cao Đẳng
            </Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="educationProgramType"
          label="Hình Thức Đào Tạo"
          hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
        >
          <Select
            allowClear
            style={{ width: "100%" }}
            placeholder="Hình thức đào tạo..."
          >
            <Option value={1}>Đại Học Chính Quy</Option>
            <Option value={2}>Văn Bằng 2</Option>
            {/* <Option value="4">Liên Thông Cao Đẳng</Option>
          <Option value="5">Liên Thông Trung Cấp</Option>
          <Option value="6">Liên Kết Đào Tạo Quốc Tế</Option>
          <Option value="7">Đại Học Từ Xa</Option> */}
          </Select>
        </Form.Item>
        <Form.Item
          name="totalTerm"
          label="Thời Gian"
          // hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn sĩ số!" }]}
        >
          <Slider min={6} max={10} tipFormatter={formatter} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default EducationProgramCreate;