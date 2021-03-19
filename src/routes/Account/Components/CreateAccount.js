import React, { useState, useEffect } from "react";
import { NotificationManager } from "react-notifications";
import { api } from "Api";
import moment from "moment";
import { Table, Modal, Form, Select } from "antd";
import { SearchOutlined, RollbackOutlined, CheckOutlined } from "@ant-design/icons";

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

export const AccountCreate = (props) => {
  const [form] = Form.useForm();

  const [departmentList, setDepartmentList] = useState([]);

  const [yearClassList, setYearClassList] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [studentList, setStudentList] = useState([]);

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    size: "default",
  });
  const handleChangeTable = (pagination) => {
    setPagination(pagination);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      {
        key: "selectAll",
        text: "Chọn hết",
        onSelect: (changableRowKeys) => {
          console.log(changableRowKeys);
          let newSelectedRowKeys = studentList.map((item) => item.studentId);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const columns = [
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
      align: "center",
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      align: "center",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateBirth",
      align: "center",
      render: (text) => moment(text).format("DD.MM.YYYY HH:mm:ss"),
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      align: "center",
      render: (text) => {
        if (text === 0) {
          return <span>Nam</span>;
        } else return <span>Nữ</span>;
      },
    },
  ];

  useEffect(() => {
    setDepartmentList(props.departmentList);
  }, [props.departmentList]);

  return (
    <Modal
      title="Tạo Mới Tài Khoản"
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
        props.setShowAccountCreate(false);
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
      width={"60%"}
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
          name="departmentId"
          label="Khoa"
          hasFeedback
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Select
            style={{ width: "50%" }}
            showSearch
            allowClear
            placeholder="Khoa..."
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
            {departmentList
              .filter((item) => item.departmentType === 1)
              .map((item) => {
                return (
                  <Select.Option key={item.departmentId} value={item.departmentId}>
                    {item.departmentName}
                  </Select.Option>
                );
              })}
          </Select>
        </Form.Item>
        <Form.Item
          name="yearClassId"
          label="Lớp niên khoá"
          hasFeedback
          rules={[{ required: true, message: "Không được để trống" }]}
        >
          <Select
            showSearch
            allowClear
            placeholder="Lớp niên khoá..."
            style={{ width: "50%" }}
            onChange={(value) => {
              console.log(value);
              form.setFieldsValue({
                ...form.getFieldsValue(),
                yearClassId: value,
              });
              let newClassList = [];
              if (value) {
                newClassList = props.studentList.filter(
                  (item) => item.yearClassId === value,
                );
              }
              setStudentList(newClassList);
            }}
          >
            {yearClassList.map((item) => {
              return (
                <Select.Option key={item.classId} value={item.classId}>
                  {item.classId + " - " + item.className}
                </Select.Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
      <Table
        columns={columns}
        dataSource={studentList}
        rowKey="studentId"
        bordered
        size="small"
        pagination={pagination}
        onChange={(paging) => handleChangeTable(paging)}
        showSizeChanger={true}
        rowSelection={rowSelection}
        onRow={(record, index) => {
          if (record.isSelecting === true)
            return { style: { background: "#4DC2F7", fontWeight: "bolder" } };
        }}
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div className="ant-empty-image">
                <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                <p className="ant-empty-description">Không có học phần nào</p>
              </div>
            </div>
          ),
        }}
      />
    </Modal>
  );
};

export default AccountCreate;
