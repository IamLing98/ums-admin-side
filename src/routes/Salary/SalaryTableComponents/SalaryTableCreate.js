import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Row,
  Col,
  Select,
  Input,
  DatePicker,
  Divider,
  Upload,
  message,
} from "antd";
import { NotificationManager } from "react-notifications";
import { RollbackOutlined, CheckOutlined, InboxOutlined } from "@ant-design/icons";
import { api } from "Api";

const { Dragger } = Upload;

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
};

const departmentEmployeeLevel = [
  { employeeLevelId: 1, employeeLevelName: "Trưởng Khoa" },
  { employeeLevelId: 2, employeeLevelName: "Phó Khoa" },
  { employeeLevelId: 3, employeeLevelName: "Trưởng Bộ Môn" },
  { employeeLevelId: 4, employeeLevelName: "Giáo Vụ" },
  { employeeLevelId: 5, employeeLevelName: "Giảng Viên" },
];

const officeEmployeeLevel = [
  { employeeLevelId: 6, employeeLevelName: "Trưởng Phòng" },
  { employeeLevelId: 7, employeeLevelName: "Phó Phòng" },
  { employeeLevelId: 8, employeeLevelName: "Nhân Viên" },
];

const salaryStructList = [
  { salaryStructId: 1, salaryStructName: "Lương theo giờ" },
  { salaryStructId: 2, salaryStructName: "Lương cố định hàng tháng" },
];

const salaryPlanList = [
  { salaryPlanId: 4, salaryPlanName: "Hàng tuần" },
  { salaryPlanId: 1, salaryPlanName: "Hàng tháng" },
  { salaryPlanId: 2, salaryPlanName: "Hàng quý" },
  { salaryPlanId: 5, salaryPlanName: "Hai tuần một lần" },
  { salaryPlanId: 6, salaryPlanName: "Hai tháng một lần" },
  { salaryPlanId: 3, salaryPlanName: "Nửa năm một" },
];

const coefficientList = [
  { coefficientId: 1, coefficientName: "asdsad", coefficientValue: 1.5 },
];

export const SalaryCreate = (props) => {
  const [form] = Form.useForm();

  const [showEmployeeLevelOpts, setShowEmployeeLevelOpts] = useState(false);

  const [employeeLevelOpts, setEmployeeLevelOpts] = useState([]);

  const [showCoefficient, setShowCoefficient] = useState(false);

  const [showPerHourPrice, setShowPerHourPrice] = useState(false);

  const [employeeCoefficientLevelList, setEmployeeCoefficientLevelList] = useState([]);

  const getEmployeeCoefficientLevelList = (employeeLevelId) => {
    api
      .get(`/employeeCoefficientLevel?employeeLevelId=${employeeLevelId}`)
      .then((response) => setEmployeeCoefficientLevelList(response))
      .catch((err) => console.log(err));
  };

  return (
    <Modal
      title="Tạo Mới Bảng Lương"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.handleCreateSalaryTableList(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        props.setShowSalaryTableCreate(false);
      }}
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
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      centered
      closable={false}
      width={"40%"}
      forceRender
    >
      <Form
        form={form}
        {...formItemLayout}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      >
        <Row gutter={[16, 24]}>
          <Col span={24}>
            <Form.Item
              name="salaryTableName"
              label="Tên Bảng Lương"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng nhập tên bảng lương!!!" }]}
            >
              <Input placeholder="Tên bảng lương..." />
            </Form.Item>
            <Form.Item
              name="startedDate"
              label="Ngày Bắt Đầu"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn ngày bắt đầu!!!" }]}
            >
              <DatePicker placeholder="Ngày bắt đầu..." />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="Ngày Kết Thúc"
              hasFeedback
              rules={[{ required: false, message: "Vui lòng nhập ngày kết thúc!!!" }]}
            >
              <DatePicker placeholder="Ngày kết thúc..." />
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default SalaryCreate;
