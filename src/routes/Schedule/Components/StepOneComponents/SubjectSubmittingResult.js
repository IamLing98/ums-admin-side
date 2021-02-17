import React, { useState, useEffect, useRef } from "react";
import {
  Button,
  Table,
  Input,
  Badge,
  Space,
  Popconfirm,
  Alert,
  Select,
} from "antd";
import { api } from "Api"; 
import {
  SearchOutlined,
  BranchesOutlined,
  DeleteFilled,
  FolderOpenOutlined, 
  ClearOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import SubjectClassCreate from "./SubjectClassCreate";
import SubjectDetails from "./SubjectDetails";
import Highlighter from "react-highlight-words"; 

const SubjectSubmittingResult = (props) => {
  const [submittingInfo, setSubmittingInfo] = useState([]);

  const [showSubjectDetails, setShowSubjectDetails] = useState(null);

  const [recordFoundNumber, setRecordFoundNumber] = useState(0);

  const getSubmittingInfo = (termId) => {
    api
      .get("/subjectsRegistration/" + termId)
      .then((res) => {
        if (res) {
          for (var i = 0; i < res.length; i++) {
            res.isSelecting = false;
          }
          setSubmittingInfo(res);
          setRecordFoundNumber(res.length);
        }
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSubmittingInfo(props.term.id);
  }, []);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

  const [
    showSubjectClassCreateModal,
    setShowSubjectClassCreateModal,
  ] = useState(false);

  const [subjectToCreateClass, setSubjectToCreateClass] = useState(null);

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

  const setSelecting = (record) => {
    let newSubmittingInfo = [...submittingInfo];
    for (var i = 0; i < newSubmittingInfo.length; i++) {
      if (record.subjectId === newSubmittingInfo[i].subjectId) {
        newSubmittingInfo[i].isSelecting = true;
      }
    }
    setSubmittingInfo([...newSubmittingInfo]);
    setShowSubjectDetails(record);
  };

  const cancelSelecting = (record) => {
    let newSubmittingInfo = [...submittingInfo];
    for (var i = 0; i < newSubmittingInfo.length; i++) {
      if (record.subjectId === newSubmittingInfo[i].subjectId) {
        newSubmittingInfo[i].isSelecting = false;
      }
    }
    setSubmittingInfo([...newSubmittingInfo]);
    setShowSubjectDetails(undefined);
  };
  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "subjectId",
        columnName: "mã học phần",
      }), 
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
      render: (text, record) => {
        return (
          <a
            // className="ant-anchor-link-title ant-anchor-link-title-active"
            href="javascript:void(0)"
            onClick={() => {
              setSelecting(record);
            }}
          >
            <span> {text}</span>
          </a>
        );
      },
    },
    {
      title: "Khoa phụ trách",
      dataIndex: "departmentName",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "departmentName",
        columnName: "khoa phụ trách",
      }),
    },
    {
      title: "Loại học phần",
      dataIndex: "subjectType",
      align: "center",
      render: (text, record) => {
        if (record.subjectType == "1") {
          return <span>Lý thuyết</span>;
        } else if (record.subjectType == "2") {
          return <span>Lý thuyết/Thảo luận</span>;
        } else if (record.subjectType == "3") {
          return <span>Lý thuyết/Thực hành</span>;
        } else {
          return <>None</>;
        }
      },
    },
    {
      title: "Số lượng đăng ký",
      dataIndex: "totalSubmit",
      width: "30%",
      align: "center",
      render: (text, record) => {
        return (
          <Space>
            <Badge status="warning" />
            Dự đoán:{record.predictSubmit}
            <Badge status="processing" />
            Tổng số: {record.totalSubmit}
            <Badge status="success" />
            Tự động: <b>{record.autoSubmit}</b>
          </Space>
        );
      },
    },
    {
      title: "Số lớp đã mở",
      dataIndex: "totalSubjectClassOpened",
      align: "center",
      sorter: (a, b) => a.totalSubjectClassOpened - b.totalSubjectClassOpened,
      ...getColumnSearchProps({
        dataIndex: "totalSubjectClassOpened",
        columnName: "số lớp đã mở",
      }),
    },
    {
      title: "Thao tác",
      align: "center",
      dataIndex: "term",
      width: "15%",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              setShowSubjectClassCreateModal(true);
              setSubjectToCreateClass(record);
            }}
            disabled={props.term.progress === 13 ? false : true}
          >
            <BranchesOutlined />
          </Button>
          {/* <Button
            type=""
            onClick={() => {
              setRecordUpdate(record);
              setShowModalUpdate(true);
            }}
          >
            <LockOutlined />
          </Button> */}
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => handleDeleteRecord(record)}
            okText="Ok"
            cancelText="Không"
          >
            <Button
              type=""
              disabled={props.term.progress === 13 ? false : true}
            >
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row>
        <Col md={3} sm={12} xs={12}>
          <Alert
            message={
              <strong>
                Danh sách HP-KHDT. Tìm thấy{" "}
                {recordFoundNumber} bản ghi
              </strong>
            }
            type="info"
            style={{ maxHeight: "32px" }}
          />
        </Col>
        <Col md={9} sm={12} xs={12}>
          <div
            className="tableListOperator"
            style={{ textAlign: "right", width: "100%" }}
          >
            <Button
              type="primary"
              style={{ width: "180px" }}
              // onClick={() => setShowModalCreate(true)}
            >
              <FolderOpenOutlined />
              <span>Mở toàn bộ</span>
            </Button>
          </div>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={submittingInfo}
        rowKey="subjectId"
        bordered
        pagination={{ pageSize: 10, size: "default" }}
        size="small"
        rowSelection={onSelectChange}
        onRow={(record, index) => {
          if (record.isSelecting === true)
            return { style: { background: "#4DC2F7" } };
        }}
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div className="ant-empty-image">
                <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                <p className="ant-empty-description">
                  Không có dữ liệu đăng ký học phần
                </p>
              </div>
            </div>
          ),
        }}
      />
      {showSubjectClassCreateModal && (
        <SubjectClassCreate
          visible={showSubjectClassCreateModal}
          setVisible={setShowSubjectClassCreateModal}
          subject={subjectToCreateClass}
          term={props.term}
          getSubmittingInfo={getSubmittingInfo}
        />
      )}
      {showSubjectDetails !== null && (
        <SubjectDetails
          visible={showSubjectDetails}
          cancelSelecting={cancelSelecting}
        />
      )}
    </>
  );
};

export default SubjectSubmittingResult;
