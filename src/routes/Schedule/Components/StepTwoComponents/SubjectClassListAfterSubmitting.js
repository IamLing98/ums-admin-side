import React, { useState, useRef } from "react";
import { Button, Table, Space, Popconfirm, Input, Tag } from "antd";
import { SearchOutlined, DeleteFilled, EditFilled, ClearOutlined, CloseSquareOutlined } from "@ant-design/icons";
import Highlighter from "react-highlight-words";
import { timeTable, daysOfWeek } from "../../../../util/dataUltil";

const SubjectClassListAfterSubmitting = (props) => {
  const [filteredInfo, setFilteredInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setFilteredInfo(filters);
  };

  const [searchText, setSearchText] = useState("");

  const [searchedColumn, setSearchedColumn] = useState("");

  const searchInput = useRef(null);

  const getColumnSearchProps = (values) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Tìm theo ${values.columnName}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, values.dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, values.dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Tìm
          </Button>
          <Popconfirm
            placement="left"
            title={"Chắc chắn xoá?"}
            onConfirm={() => props.handleDeleteRecord(record.id)}
            okText="Ok"
            cancelText="Không"
          >
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
              icon={<ClearOutlined />}
            >
              Xoá
            </Button>
          </Popconfirm>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />,
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

  const columnsAfterSubmitting = [
    {
      title: "Mã LHP",
      dataIndex: "subjectClassId",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "subjectClassId",
        columnName: "mã lớp học phần",
      }),
      filteredValue: filteredInfo.subjectClassId || null,
      onFilter: (value, record) =>
        record["subjectClassId"]
          ? record["subjectClassId"]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
    },
    {
      title: "Mã HP",
      dataIndex: "subjectId",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "subjectId",
        columnName: "mã học phần",
      }),
      filteredValue: filteredInfo.subjectId || null,
      onFilter: (value, record) =>
        record["subjectId"]
          ? record["subjectId"]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
    },
    {
      title: "Tên HP",
      dataIndex: "subjectName",
      align: "center",
      render: (text, record) => (
        <a
          href="javascript:void(0)"
          onClick={() => {
            props.setSelecting(record);
          }}
        >
          <span>{text}</span>
        </a>
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
      title: "Giảng viên",
      dataIndex: "teacherId",
      align: "center",
      render: (text, record) => {
        if (record.teacherId) {
          return <span>{record.fullName}</span>;
        }
        return <Tag color="volcano">None</Tag>;
      },
    },
    {
      title: "P.M",
      dataIndex: "isRequireLab",
      align: "center",
      filters: [{ key: "1", text: "Có", value: 1 }, { key: "0", text: "Không", value: 0 }],
      filteredValue: filteredInfo.isRequireLab || null,
      onFilter: (value, record) => record.isRequireLab === value,
      render: (text, record) => {
        if (text === 1) return <span>Có</span>;
        else return <span>Không</span>;
      },
    },
    {
      title: "Kíp",
      dataIndex: "createdDate",
      align: "center",
      render: (text, record) => {
        if (record.hourOfDay) {
          if (record.hourOfDay > 5) {
            return <span>Buổi chiều</span>;
          } else return <span>Buổi chiều</span>;
        } else return <Tag color="volcano">None</Tag>;
      },
    },
    {
      title: "Ngày",
      dataIndex: "dayOfWeek",
      align: "center",
      render: (text, record) => {
        if (text) {
          return <span>{daysOfWeek[text]}</span>;
        } else {
          return <Tag color="volcano">None</Tag>;
        }
      },
    },
    {
      title: "Bắt Đầu",
      dataIndex: "hourOfDay",
      align: "center",
      render: (text, record) => {
        if (text) return <span>Tiết {text}</span>;
        else return <Tag color="volcano">None</Tag>;
      },
    },
    {
      title: "Kết Thúc",
      dataIndex: "hourOfDay",
      align: "center",
      render: (text, record) => {
        if (text) return <span>Tiết {record.duration + record.hourOfDay - 1}</span>;
        else return <Tag color="volcano">None</Tag>;
      },
    },
    {
      title: "Thời Gian",
      dataIndex: "hourOfDay",
      align: "center",
      render: (text, record) => {
        if (text)
          return (
            <span>
              {timeTable[record.hourOfDay - 1].start + " - " + timeTable[record.hourOfDay + record.duration - 2].end}
            </span>
          );
        else return <Tag color="volcano">None</Tag>;
      },
    },
    {
      title: "Phòng",
      dataIndex: "roomId",
      align: "center",
      render: (text, record) => {
        if (text) return <span>{text}</span>;
        else return <Tag color="volcano">None</Tag>;
      },
    },
    {
      title: "MAX",
      dataIndex: "numberOfSeats",
      align: "center",
    },
    {
      title: "ĐK",
      dataIndex: "currentOfSubmittingNumber",
      align: "center",
    },
    {
      title: "Status",
      dataIndex: "status",
      align: "center",
      render: (text) => {
        if (text === 1) {
          return <Tag color="green">Đang mở</Tag>;
        } else return <Tag color="volcano">Đã đóng</Tag>;
      },
    },
    {
      title: "Thao Tác",
      dataIndex: "numberOfSeats",
      align: "center",
      render: (text, record) => {
        if (record.status === 1) {
          return (
            <Space size="middle">
              <Button
                type=""
                onClick={() => {
                  props.setRecordUpdate(record);
                }}
              >
                <EditFilled />
              </Button>
              <Popconfirm
                placement="left"
                title={"Đóng lớp?"}
                onConfirm={() => props.handleCloseSubjectClass([record])}
                okText="Đồng ý"
                cancelText="Không"
              >
                <Button type="">
                  <CloseSquareOutlined />
                </Button>
              </Popconfirm>
            </Space>
          );
        } else if (record.status === 0) {
          return (
            <div style={{ textAlign: "left" }}>
              <Popconfirm
                placement="left"
                title={"Xoá lớp?"}
                onConfirm={() => props.handleDeleteSubjectClass([record.subjectClassId])}
                okText="Đồng ý"
                cancelText="Không"
              >
                <Button type="">
                  <DeleteFilled />
                </Button>
              </Popconfirm>
            </div>
          );
        }
      },
    },
  ];

  return (
    <>
      <Table
        columns={columnsAfterSubmitting}
        dataSource={props.data}
        rowKey="subjectClassId"
        bordered
        pagination={{ pageSize: 15, size: "default" }}
        selectedRowKeys={props.selectedRowKeys}
        rowSelection={props.rowSelection}
        size="small"
        onChange={handleChange}
        onRow={(record, index) => {
          if (record.isSelecting === true) return { style: { background: "#4DC2F7" } };
        }}
        locale={{
          emptyText: (
            <div className="ant-empty ant-empty-normal">
              <div className="ant-empty-image">
                <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                <p className="ant-empty-description">Không có dữ liệu lớp học phần</p>
              </div>
            </div>
          ),
        }}
      />
    </>
  );
};
export default SubjectClassListAfterSubmitting;
