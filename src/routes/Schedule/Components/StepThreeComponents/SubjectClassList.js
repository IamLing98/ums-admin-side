import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
  Alert,
  Drawer,
} from "antd";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
  CalendarOutlined,
  FolderViewOutlined,
  ClearOutlined,
  RollbackOutlined,
  CheckOutlined,
  EditFilled,
  LockOutlined,
  CloseSquareOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import { NotificationManager } from "react-notifications";
import OpenSubjectClassEditReg from "../StepThreeComponents/OpenSubjectClassEditReg";

const { confirm } = Modal;

const SubjectClassList = (props) => {
  const [loading, setLoading] = useState(true);

  const [scheduleInfo, setScheduleInfo] = useState(null);

  const [selectFilterValue, setSelectFilterValue] = useState(undefined);

  const [visible, setVisible] = useState(false);

  const getScheduleInfo = (scheduleId) => {
    api
      .get(`/schedules/${scheduleId}`)
      .then((res) => {
        setScheduleInfo(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const showErrNoti = (err) => {
    NotificationManager.err(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err(
        "Did you forget something? Please activate your account"
      );
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };
  useEffect(() => {
    if (props.term) {
      getScheduleInfo(props.term.activeSchedule);
    }
  }, [props.term]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: selectedRowKeys,
    onChange: onSelectChange,
    selections: [
      {
        key: "odd",
        text: "Lớp không đủ tiêu chuẩn",
        onSelect: (changableRowKeys) => {
          let newSelectedRowKeys = [];
          newSelectedRowKeys = changableRowKeys.filter((key, index) => {
            if (index % 2 !== 0) {
              return false;
            }
            return true;
          });
          setSelectedRowKeys(newSelectedRowKeys);
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
          console.log(newSelectedRowKeys);
          setSelectedRowKeys(newSelectedRowKeys);
        },
      },
    ],
  };

  const handleCloseSubjectClass = (values) => {
    api
      .delete(
        `/schedules/${props.term.id}/${props.term.activeSchedule}/?${values
          .map((value, index) => `ids=${value}`)
          .join("&")}`,
        true
      )
      .then((res) => {
        NotificationManager.success("Đã xoá" + res + " bản ghi");
        getScheduleInfo(props.term.activeSchedule);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  const handleOpenSubjectClassRegEdit = (values) => {
    let editSubmittingStartDate = values["rangeTime"][0].format("YYYY-MM-DD");
    let editSubmittingEndDate = values["rangeTime"][1].format("YYYY-MM-DD");
    let termObj = {};
    termObj.id = props.term.id;
    termObj.progress = 31;
    termObj.actionType = "SCREON";
    termObj.editSubmittingStartDate = editSubmittingStartDate;
    termObj.editSubmittingEndDate = editSubmittingEndDate;
    api
      .put(`/terms/${props.term.id}`, termObj)
      .then((res) => {
        setSchedule(null);
        setPageStatus(3);
        NotificationManager.success("Mở đăng ký điều chỉnh học phần!!!");
        props.getTermDetail(props.term.id);
      })
      .catch((err) => showErrNoti(err));
  };

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

  const daysOfWeek = ["", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu"];

  const columns = [
    {
      title: "Mã lớp",
      dataIndex: "subjectClassId",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "subjectClassId",
        columnName: "mã lớp học phần",
      }),
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Mã Học phần",
      dataIndex: "subjectId",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "subjectId",
        columnName: "mã học phần",
      }),
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Tên Học Phần",
      dataIndex: "subjectName",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Loại Lớp",
      dataIndex: "subjectType",
      align: "center",
      render: (text, record) => {
        if (text === 1) {
          return <span>Lý thuyết</span>;
        }
        if (text === 2) {
          return <span>Lý thuyết/Thảo luận</span>;
        }
        if (text === 3) {
          return <span>Lý thuyết/Thực hành</span>;
        }
      },
    },
    {
      title: "Số Tín",
      dataIndex: "eachSubject",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Khoa",
      dataIndex: "departmentName",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Kíp",
      dataIndex: "createdDate",
      align: "center",
      render: (text, record) => {
        if (record.hourOfDay > 5) {
          return <span>Buổi chiều</span>;
        } else return <span>Buổi sáng</span>;
      },
    },
    {
      title: "Ngày Trong Tuần",
      dataIndex: "dayOfWeek",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{daysOfWeek[text]}</span>
        </span>
      ),
    },
    {
      title: "Bắt Đầu",
      dataIndex: "hourOfDay",
      align: "center",
      render: (text, record) => (
        <span>
          <span>Tiết {text}</span>
        </span>
      ),
    },
    {
      title: "Kết Thúc",
      dataIndex: "createdDate",
      align: "center",
      render: (text, record) => {
        return <span>Tiết {record.duration + record.hourOfDay - 1}</span>;
      },
    },
    {
      title: "Thời Gian",
      dataIndex: "createdDate",
      align: "center",
      render: (text, record) => (
        <span>
          <span>
            {timeTable[record.hourOfDay - 1].start +
              " - " +
              timeTable[record.hourOfDay + record.duration - 2].end}
          </span>
        </span>
      ),
    },
    {
      title: "Phòng",
      dataIndex: "roomId",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Giảng Viên",
      dataIndex: "fullName",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "Max",
      dataIndex: "numberOfSeats",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    {
      title: "ĐK",
      dataIndex: "currentOfSubmittingNumber",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
  ];

  const onSearch = (values) => {
    if (values === 1) {
      let newSelectItems = [];
      for (var i = 0; i < scheduleInfo.length; i++) {
        let item = scheduleInfo[i];
        if (item.subjectType === 1) {
          if (item.currentOfSubmittingNumber < 30) {
            newSelectItems.push(item.subjectClassId);
          }
        } else if (item.subjectType === 2) {
          if (item.currentOfSubmittingNumber < 15) {
            newSelectItems.push(item.subjectClassId);
          }
        } else if (item.subjectType === 3) {
          if (item.currentOfSubmittingNumber < 15) {
            newSelectItems.push(item.subjectClassId);
          }
        }
      }
      setSelectedRowKeys(newSelectItems);
    } else if (values === 0) {
      let newSelectItems = [];
      for (var i = 0; i < scheduleInfo.length; i++) {
        let item = scheduleInfo[i];
        newSelectItems.push(item.subjectClassId);
      }
      setSelectedRowKeys(newSelectItems);
    } else {
      setSelectedRowKeys([]);
    }
  };
  const showDeleteConfirm = (selectedRowKeys) => {
    confirm({
      centered: true,
      title: "Chắc chắn?",
      icon: <ExclamationCircleOutlined />,
      content: "Vui lòng xác nhận",
      okText: "Đồng ý",
      okType: "danger",
      cancelText: "Huỷ",
      onOk() {
        handleCloseSubjectClass(selectedRowKeys);
      },
      onCancel() {
        console.log("D");
      },
    });
  };
  return (
    <>
      <Row>
        <Col
          md={6}
          sm={12}
          style={{ display: "flex", flexDirection: "column" }}
        ></Col>
        <Col md={6} sm={12} xs={12}>
          <div
            className="tableListOperator"
            style={{ textAlign: "right", width: "100%" }}
          >
            <Button
              type="primary"
              style={{
                background: "#DC0000",
                borderColor: "#DC0000",
                color: "wheat",
              }}
              onClick={() => props.handleCloseSubmittingEdit()}
            >
              <DeleteOutlined />
              <span>Kết thúc ĐKĐC</span>
            </Button>
          </div>
        </Col>
      </Row>
      <Table
        columns={columns}
        dataSource={scheduleInfo}
        rowKey="subjectClassId"
        bordered
        pagination={{ pageSize: 25, size: "default" }}
        size="small"
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div className="ant-empty-image">
                <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                <p className="ant-empty-description">
                  Không có dữ liệu thời khoá biểu
                </p>
              </div>
            </div>
          ),
        }}
      />
      <OpenSubjectClassEditReg
        visible={visible}
        handleOpenSubjectClassRegEdit={handleOpenSubjectClassRegEdit}
        setVisible={setVisible}
        term={props.term}
      />
    </>
  );
};

const timeTable = [
  {
    start: "07h00'",
    end: "07h50'",
  },
  {
    start: "07h55'",
    end: "08h45'",
  },
  {
    start: "08h55'",
    end: "09h45'",
  },
  {
    start: "09h50'",
    end: "10h40'",
  },
  {
    start: "10h50'",
    end: "11h40'",
  },
  {
    start: "12h30'",
    end: "13h20'",
  },
  {
    start: "13h25'",
    end: "14h15'",
  },
  {
    start: "14h25'",
    end: "15h15'",
  },
  {
    start: "15h20'",
    end: "16h20'",
  },
  {
    start: "16h30'",
    end: "17h20'",
  },
];

export default SubjectClassList;
