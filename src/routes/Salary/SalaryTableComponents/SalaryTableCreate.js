import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Input, DatePicker, Table, Button } from "antd";
import { NotificationManager } from "react-notifications";
import { RollbackOutlined, CheckOutlined, SearchOutlined } from "@ant-design/icons";
import { api } from "Api";
import EmployeeSelect from "./EmployeeSelect";
import moment from "moment";

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

const coefficientList = [
  { coefficientId: 1, coefficientName: "asdsad", coefficientValue: 1.5 },
];

export const SalaryCreate = (props) => {
  const [form] = Form.useForm();

  const [showEmployeeSelect, setShowEmployeeSelect] = useState(false);

  const [selectedContractList, setSelectedContractList] = useState([]);

  const [isSelectedContract, setIsSelectedContract] = useState(false);

  const columns = [
    {
      title: "Mã CB/GV ",
      dataIndex: "employeeId",
      align: "center",
      render: (text, record) => (
        <a
          // className="ant-anchor-link-title ant-anchor-link-title-active"
          href="javascript:void(0)"
          onClick={() => {
            console.log(record);
            props.setSelecting(record);
          }}
        >
          {text}
        </a>
      ),
    },
    {
      title: "Họ Và Tên",
      dataIndex: ["employee", "fullName"],
      align: "center",
    },
    {
      title: "Giới Tính",
      dataIndex: ["employee", "sex"],
      align: "center",
      render: (text, record) => <span>{text === 1 ? "Nam" : "Nữ"}</span>,
    },
    {
      title: "Ngày Sinh",
      dataIndex: ["employee", "dateBirth"],
      align: "center",
      render: (text, record) => <span>{moment(text).format("DD.MM.YYYY")}</span>,
    },
    {
      title: "Phòng Ban",
      dataIndex: ["department", "departmentName"],
      align: "center",
    },
    {
      title: "Chức Vụ",
      dataIndex: ["employeeLevel", "employeeLevelName"],
      align: "center",
    },
  ];
  return (
    <Modal
      title="Tạo Mới Bảng Lương"
      visible={props.visible}
      onOk={() => {
        if (isSelectedContract) {
          form
            .validateFields()
            .then((values) => {
              let newValues = values;
              console.log("selectedContractList: ",selectedContractList )
              newValues.contractDTOList = selectedContractList;
              props.handleCreateSalaryTable(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        } else {
          form
            .validateFields()
            .then((values) => {
              setShowEmployeeSelect(true);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }
      }}
      onCancel={() => {
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
      okText={isSelectedContract ? "Tạo Mới" : "Tiếp"}
      cancelText="Đóng"
      centered
      closable={false}
      width={isSelectedContract ? "60%" : "40%"}
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
              <DatePicker placeholder="Ngày bắt đầu..." style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item
              name="endDate"
              label="Ngày Kết Thúc"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng nhập ngày kết thúc!!!" }]}
            >
              <DatePicker placeholder="Ngày kết thúc..." style={{ width: "50%" }} />
            </Form.Item>
          </Col>
          <Col span={12}></Col>
        </Row>
      </Form>
      <EmployeeSelect
        visible={showEmployeeSelect}
        setShowEmployeeSelect={setShowEmployeeSelect}
        data={props.contractList}
        setSelectedContractList={setSelectedContractList}
        setIsSelectedContract={setIsSelectedContract}
      />
      {selectedContractList.length > 0 && (
        <Table
          columns={columns}
          dataSource={selectedContractList}
          rowKey="employeeId"
          bordered
          size="small"
          onRow={(record, index) => {
            if (record.isSelecting === true)
              return { style: { background: "#4DC2F7", fontWeight: "bolder" } };
          }}
          locale={{
            emptyText: (
              <div className="ant-empty ant-empty-normal">
                <div className="ant-empty-image">
                  <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                  <p className="ant-empty-description">Không có kết quả nào</p>
                </div>
              </div>
            ),
          }}
        />
      )}
    </Modal>
  );
};

export default SalaryCreate;
