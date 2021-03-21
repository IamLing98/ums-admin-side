import React, { useState, useEffect,useRef  } from "react";
import { NotificationManager } from "react-notifications";
import { api } from "Api";
import moment from "moment";
import { Table, Modal, Form, Select,Input,Button,Space  } from "antd";
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

export const SystemAccountList = (props) => {
  const [form] = Form.useForm();

  const [departmentList, setDepartmentList] = useState([]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [teacherList, setTeacherList] = useState([]);

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
          let newSelectedRowKeys = teacherList.map((item) => item.employeeId);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm theo ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });

  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Mã giảng viên",
      dataIndex: "employeeId",
      align: "center",
      ...getColumnSearchProps("employeeId")
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
              });
              let newClassList = [];
              if (value) {
                newClassList = props.teacherList.filter(
                  (item) => item.departmentId === value,
                );
              }
              setTeacherList(newClassList);
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
      </Form>
      <Table
        columns={columns}
        dataSource={teacherList}
        rowKey="employeeId"
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
                <p className="ant-empty-description">Không có giảng viên nào</p>
              </div>
            </div>
          ),
        }}
      />
    </Modal>
  );
};

export default SystemAccountList;
