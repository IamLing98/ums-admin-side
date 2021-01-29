import React, { useState, useEffect, useRef } from "react";
import {
  Drawer,
  Form,
  Button,
  Col,
  Row,
  Input,
  Select,
  DatePicker,
  List,
  Avatar,
  Tabs,
  Table,
  Space,
  Popconfirm,
} from "antd";
import {
  PlusOutlined,
  RollbackOutlined,
  CheckOutlined,
  SearchOutlined,
  ClearOutlined,
  RetweetOutlined,
  EditFilled,
  DeleteFilled,
} from "@ant-design/icons";
import { api } from "Api";
const { Option } = Select;

const { TabPane } = Tabs;

const SubjectClassDetail = (props) => {
  const [loading, setLoading] = useState(true);

  const [detail, setDetail] = useState({ studentList: [] });

  const getSubjectClassDetail = (id) => {
    api
      .get(`/subjectClasses/getDetail/${id}`)
      .then((res) => {
        setDetail(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    if (props.record) {
      getSubjectClassDetail(props.record.subjectClassId);
    }
  }, [props.record]);
  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const getColumnSearchProps = (values) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm theo ${values.columnName}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() =>
            handleSearch(selectedKeys, confirm, values.dataIndex)
          }
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() =>
              handleSearch(selectedKeys, confirm, values.dataIndex)
            }
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
            icon={<ClearOutlined />}
          >
            Xoá
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[values.dataIndex]
        ? record[values.dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === values.dataIndex ? (
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
      title: "Mã Sinh Viên ",
      dataIndex: "studentId",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "studentId",
        columnName: "mã sinh viên",
      }),
      render: (text, record) => {
        if (record.isSelecting === true) {
          return <Alert message={text} type="success" />;
        } else return <span>{text}</span>;
      },
    },
    {
      title: "Họ Và Tên ",
      dataIndex: "fullName",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "fullName",
        columnName: "tên sinh viên",
      }),
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
      title: "Điểm Bài Tập ",
      align: "center",
      dataIndex: "diemBaiTap",
      render: (text, record) => {
        if (!text) return <span></span>;
        else return <span>{text}</span>;
      },
    },
    {
      title: "Điểm Chuyên Cần",
      dataIndex: "diemChuyenCan",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "departmentName",
        columnName: "khoa đào tạo",
      }),
    },
    {
      title: "Điểm Kiểm Tra",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "departmentName",
        columnName: "điểm thi lại",
      }),
      dataIndex: "diemKiemTra",
      render: (text, record) => {
        if (!text) return <span></span>;
        else return <span>{text}</span>;
      },
    },
    {
      title: "Điểm Thi",
      align: "center",
      dataIndex: "diemThi",
      render: (text, record) => {
        if (!text) return <span></span>;
        else return <span>{text}</span>;
      },
    },
    {
      title: "Điểm Thi Lại",
      align: "center",
      dataIndex: "diemThiLai",
      render: (text, record) => {
        if (!text) return <span></span>;
        else return <span>{text}</span>;
      },
    },
    {
      title: "Điểm Trung Bình",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "departmentName",
        columnName: "điểm trung bình",
      }),
      dataIndex: "diemTrungBinh",
      render: (text, record) => {
        if (!text) return <span></span>;
        else return <span>{text}</span>;
      },
    },
    {
      title: "Thao Tác",
      align: "center",
      render: (text, record) => (
        <Space size="middle">
          {record.educationProgramStatus === "2" ? (
            <Button type="" onClick={() => {}}>
              <RetweetOutlined />
            </Button>
          ) : (
            <Button type="" disabled>
              <RetweetOutlined />
            </Button>
          )}
          <Button
            type=""
            onClick={() => {
              console.log("cc");
              console.log(record);
              props.setShowModalUpdate(record);
            }}
          >
            <EditFilled />
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => props.handleDeleteRecord([record.studentId])}
            okText="Ok"
            cancelText="Không"
          >
            <Button type="">
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Drawer
        title={`Thông tin chi tiết lớp học phần: ${
          props.record !== null && props.record !== undefined
            ? props.record.subjectClassId + " - " + props.record.subjectName
            : ""
        }`}
        width={"70%"}
        onClose={() => props.setShowSubjectClassDetail(null)}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => props.setShowSubjectClassDetail(null)}
              style={{ marginRight: 8 }}
            >
              <RollbackOutlined />
              Đóng
            </Button>
            <Button
              onClick={() => props.setShowSubjectClassDetail(null)}
              type="primary"
            >
              <CheckOutlined />
              Đóng
            </Button>
          </div>
        }
      >
        <Tabs defaultActiveKey="1" type="card" size={"small"}>
          <TabPane tab="Danh sách sinh viên" key="1">
            <Table
              columns={columns}
              dataSource={detail.studentList}
              rowKey="studentId"
              bordered
              size="small"
              pagination={{ pageSize: 15, size: "default" }}
              onChange={(paging) => handleChangeTable(paging)}
              showSizeChanger={true}
              // rowSelection={rowSelection}
              locale={{
                emptyText: (
                  <div className="ant-empty ant-empty-normal">
                    <div className="ant-empty-image">
                      <SearchOutlined
                        style={{ fontSize: "16px", color: "#08c" }}
                      />
                      <p className="ant-empty-description">
                        Không có kết quả nào
                      </p>
                    </div>
                  </div>
                ),
              }}
            />
          </TabPane>
          <TabPane tab="Giảng Viên" key="2">
            <List
              itemLayout="horizontal"
              dataSource={[{ title: "" }]}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<b>Giảng viên:</b>}
                    description={"Họ và tên: " + props.record.fullName}
                  />
                </List.Item>
              )}
            />
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default SubjectClassDetail;
