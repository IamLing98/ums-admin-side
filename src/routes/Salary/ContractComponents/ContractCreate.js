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

export const ContractCreate = (props) => {
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
      title="Tạo Mới Hợp Đồng"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.handleCreateContract(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        props.setShowContractCreate(false);
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
              name="employeeId"
              label="Nhân Viên"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn nhân viên!!!" }]}
            >
              <Select allowClear allowSearch>
                {props.employeeList.map((employee, index) => {
                  return (
                    <Select.Option
                      value={employee.employeeId}
                      key={"EmployeeOptions" + index}
                    >
                      {employee.employeeId + " - " + employee.fullName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item
              name="departmentId"
              label="Phòng Ban"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn phòng ban!!!" }]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Phòng Ban..."
                onChange={(value) => {
                  if (value) {
                    let department = props.departmentList.find(
                      (department) => department.departmentId === value,
                    );
                    console.log(department);
                    form.setFieldsValue({
                      ...form.getFieldsValue,
                      departmentId: department.departmentId,
                    });
                    if (department.departmentType === 0) {
                      setEmployeeLevelOpts(officeEmployeeLevel);
                    } else if (department.departmentType === 1) {
                      setEmployeeLevelOpts(departmentEmployeeLevel);
                    }
                    setShowEmployeeLevelOpts(true);
                  } else {
                    form.setFieldsValue({
                      ...form.getFieldsValue,
                      departmentId: value,
                    });
                    setShowEmployeeLevelOpts(false);
                  }
                }}
              >
                {props.departmentList.map((department, index) => {
                  return (
                    <Select.Option
                      value={department.departmentId}
                      key={"DepartmentOption" + index}
                    >
                      {department.departmentName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            {showEmployeeLevelOpts && (
              <Form.Item
                name="employeeLevelId"
                label="Chức Vụ"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng chọn chức vụ!!!" }]}
              >
                <Select
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Chức vụ..."
                  onChange={(value) => {
                    form.setFieldsValue({
                      ...form.getFieldsValue,
                      employeeLevelId: value,
                    });
                    getEmployeeCoefficientLevelList(value);
                  }}
                >
                  {employeeLevelOpts.map((employeeLevel, index) => {
                    return (
                      <Select.Option
                        value={employeeLevel.employeeLevelId}
                        key={"employeeLevelOpts" + index}
                      >
                        {employeeLevel.employeeLevelName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              name="salaryStructType"
              label="Loại Lương"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chon cấu trúc lương!!!" }]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Loại lương..."
                onChange={(value) => {
                  form.setFieldsValue({ ...form.getFieldsValue, salaryStructId: value });
                  if (value) {
                    if (value === 2) {
                      setShowCoefficient(true);
                      setShowPerHourPrice(false);
                    } else if (value === 1) {
                      setShowCoefficient(false);
                      setShowPerHourPrice(true);
                    }
                  } else {
                    setShowCoefficient(false);
                    setShowPerHourPrice(false);
                  }
                }}
              >
                {salaryStructList.map((salaryStruct, index) => {
                  return (
                    <Select.Option
                      value={salaryStruct.salaryStructId}
                      key={"employeeLevelOpts" + index}
                    >
                      {salaryStruct.salaryStructName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            {showPerHourPrice && (
              <Form.Item
                name="perHourPrice"
                label="Lương/giờ"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng nhập lương!!!" }]}
              >
                <Input placeholder="Lương theo giờ..." type="number" />
              </Form.Item>
            )}
            {showCoefficient && (
              <Form.Item
                name="employeeCoefficientLevelId"
                label="Bậc lương"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng chọn hệ số lương!!!" }]}
              >
                <Select allowClear style={{ width: "100%" }} placeholder="Hệ số lương...">
                  {employeeCoefficientLevelList.map((employeeCoefficientLevel, index) => {
                    return (
                      <Select.Option
                        value={employeeCoefficientLevel.id}
                        key={"employeeCoefficientLevelOpts" + index}
                      >
                        {employeeCoefficientLevel.employeeCoefficientLevelName}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Form.Item>
            )}
            <Form.Item
              name="paymentPlanId"
              label="Kế Hoạch Thanh Toán"
              hasFeedback
              rules={[
                { required: true, message: "Vui lòng chọn kế hoạch thanh toán!!!" },
              ]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Kế hoạch thanh toán..."
              >
                {salaryPlanList.map((salaryPlan, index) => {
                  return (
                    <Select.Option
                      value={salaryPlan.salaryPlanId}
                      key={"employeeLevelOpts" + index}
                    >
                      {salaryPlan.salaryPlanName}
                    </Select.Option>
                  );
                })}
              </Select>
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

export default ContractCreate;
