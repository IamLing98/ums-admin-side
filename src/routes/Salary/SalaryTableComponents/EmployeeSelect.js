import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Upload, Table, Space, Button } from "antd";
import { NotificationManager } from "react-notifications";
import { RollbackOutlined, CheckOutlined, SearchOutlined } from "@ant-design/icons";
import { api } from "Api";
import moment from "moment";

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

export const EmployeeSelect = (props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    size: "default",
  });

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_INVERT,
      {
        key: "odd",
        text: "Select Odd Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          props.setSelectedRowKeys(newSelectedRowKeys);
        },
      },
      {
        key: "even",
        text: "Select Even Row",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return true;
            }
            return false;
          });
          props.setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

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

  const handleChangeTable = (values) => {
    console.log(values);
    setPagination(values);
  };

  console.log("Props datas: ", props.data)
  return (
    <Modal
      title="Chọn Giảng Viên"
      visible={props.visible}
      onOk={() => {
        console.log(selectedRowKeys);
        let newSelectedContractList = [];
        for (var i = 0; i < props.data.length; i++) {
          for (var j = 0; j < selectedRowKeys.length; j++) {
            if (props.data[i].id === selectedRowKeys[j])
              newSelectedContractList.push(props.data[i]);
          }
        }
        props.setSelectedContractList(newSelectedContractList);
        props.setIsSelectedContract(true);
        props.setShowEmployeeSelect(false);
      }}
      onCancel={() => {
        form.resetFields();
        props.setShowEmployeeSelect(false);
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
      okText="Đồng Ý"
      cancelText="Đóng"
      closable={false}
      width={"60%"}
      forceRender
    >
      <Row gutter={[16, 24]}>
        <Col span={24}>
          <Table
            columns={columns}
            dataSource={props.data}
            rowKey="id"
            bordered
            size="small"
            pagination={pagination}
            onChange={(values) => handleChangeTable(values)}
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
                    <p className="ant-empty-description">Không có kết quả nào</p>
                  </div>
                </div>
              ),
            }}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default EmployeeSelect;
