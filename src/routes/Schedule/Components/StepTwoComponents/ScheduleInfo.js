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
  RollbackOutlined ,
  CheckOutlined,
} from "@ant-design/icons";
const ScheduleInfo = (props) => {
  const [loading, setLoading] = useState(true);

  const [scheduleInfo, setScheduleInfo] = useState(null);

  const getScheduleInfo = (scheduleId) => {
    api
      .get(`/schedules/${scheduleId}`)
      .then((res) => {
        setScheduleInfo(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getScheduleInfo(props.visible.id);
  }, []);

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
      title: "Số Lượng Max",
      dataIndex: "numberOfSeats",
      align: "center",
      render: (text, record) => (
        <span>
          <span>{text}</span>
        </span>
      ),
    },
    // {
    //   title: "Loại Lớp",
    //   dataIndex: "numberOfSeats",
    //   align: "center",
    //   render: (text, record) => (
    //     <span>
    //       <span>{text}</span>
    //     </span>
    //   ),
    // },
    // {
    //   title: "Thao tác",
    //   dataIndex: "numberOfSeats",
    //   align: "center",
    //   render: (text, record) => {
    //    return <Space size="middle">
    //    <Button
    //      type=""
    //      onClick={() => {
    //        props.setPageStatus(3);
    //        props.setRecordUpdate(record);
    //      }}
    //    >
    //      <EditFilled />
    //    </Button>
    //       <Button
    //         type=""
    //         // onClick={() => {
    //         //   setRecordUpdate(record);
    //         //   setShowModalUpdate(true);
    //         // }}
    //       >
    //         <LockOutlined />
    //       </Button>
    //       <Popconfirm
    //         placement="left"
    //         title={"Chắc chắn xoá?"}
    //         onConfirm={() => props.handleDeleteSubjectClass(record)}
    //         okText="Ok"
    //         cancelText="Không"
    //       >
    //         <Button type="">
    //           <DeleteFilled />
    //         </Button>
    //       </Popconfirm>
    //     </Space>;
    //   },
    // },
  ];

  return (
    <>
      <Drawer
        title={`Thời khoá biểu học kỳ ${props.term.term} năm ${props.term.year}`}
        width={"80%"}
        onClose={() => props.setSchedule(null)}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => props.setSchedule(null)}
              style={{ marginRight: 8 }}
            >
              {" "}
              <RollbackOutlined />
              Quay lại
            </Button>
            <Button onClick={() => props.handleOpenSubjectClassRegistration(props.visible.id)} type="primary">
              <CheckOutlined />
              Mở ĐKLHP
            </Button>
          </div>
        }
      >
        {loading && !scheduleInfo ? (
          <RctPageLoader />
        ) : (
          <>
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
                      <SearchOutlined
                        style={{ fontSize: "16px", color: "#08c" }}
                      />
                      <p className="ant-empty-description">
                        Không có dữ liệu thời khoá biểu
                      </p>
                    </div>
                  </div>
                ),
              }}
            />
          </>
        )}
      </Drawer>
    </>
  );
};

export default ScheduleInfo;
