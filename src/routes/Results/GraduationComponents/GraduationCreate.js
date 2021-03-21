import React, { useState, useEffect, useRef } from "react";
import { NotificationManager } from "react-notifications";
import { api } from "Api";
import moment from "moment";
import { Table, Modal, Form, Select, Input, Button, Space } from "antd";
import { SearchOutlined, RollbackOutlined, CheckOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";

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
    classId: undefined,
    courseNumber: undefined,
    departmentId: undefined,
    educationProgramLevel: undefined,
    endYear: undefined,
    startYear: undefined,
    teacherId: undefined,
    rangeTime: [],
  },
};

export const GraduationCreate = (props) => {
  const [form] = Form.useForm();

  const [departmentList, setDepartmentList] = useState([]);

  const [yearClassList, setYearClassList] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [studentList, setStudentList] = useState([]);

  useEffect(() => {
    setDepartmentList(props.departmentList);
  }, [props.departmentList]);

  return (
    <Modal
      title="Tạo Mới Đợt Xét Tốt Nghiệp"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            console.log(selectedRowKeys);
            props.handleSubmitForm(selectedRowKeys);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        props.setShowModalCreate(false);
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
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
      >
        <Form.Item
          name="schoolYearId"
          label="Năm học"
          hasFeedback
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Select
            style={{ width: "100%" }}
            showSearch
            allowClear
            placeholder="Năm học..."
            onChange={(value) => {
              console.log(value);
              form.setFieldsValue({
                ...form.getFieldsValue(),
                departmentId: value,
                yearClassId: undefined,
              });
              let newClassList = [];
              if (value) {
                newClassList = props.yearClassList.filter(
                  (item) => item.departmentId === value,
                );
              }
              setYearClassList(newClassList);
            }}
          >
            {props.schoolYears.map((item) => {
              return (
                <Select.Option key={item.schoolYearId} value={item.schoolYearId}>
                  {item.start + " - " + item.end}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default GraduationCreate;
