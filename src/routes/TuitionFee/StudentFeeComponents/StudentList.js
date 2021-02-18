import React, { useEffect, useState, useRef } from "react";
import { Button, Input, Select, Popconfirm, Space, Table } from "antd";
import { DeleteFilled, EyeOutlined, SearchOutlined, RetweetOutlined, ClearOutlined } from "@ant-design/icons";
import { api } from "Api";
import Highlighter from "react-highlight-words";

const StudentList = (props) => {
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 15,
    size: "default",
  });

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
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }} icon={<ClearOutlined />}>
            Xoá
          </Button>
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

  const columns = [
    {
      title: "Mã Sinh Viên ",
      dataIndex: "studentId",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "studentId",
        columnName: "mã sinh viên",
      }),
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
      title: "Lớp ",
      align: "center",
      dataIndex: "yearClassId",
      ...getColumnSearchProps({
        dataIndex: "yearClassId",
        columnName: "lớp niên khoá",
      }),
      render: (text, record) => <>{record.yearClassId + " - " + record.yearClassName + " K" + record.courseNumber}</>,
    },
    {
      title: "Khoa Đào Tạo",
      dataIndex: "departmentName",
      align: "center",
      ...getColumnSearchProps({
        dataIndex: "departmentName",
        columnName: "khoa đào tạo",
      }),
    },
    {
      title: "Niên Khoá",
      align: "center",
      render: (text, record) => <span>{record.startYear + " - " + record.endYear}</span>,
    },
    {
      title: "Khoản thu",
      align: "center",
      width: "20%",
      render: (text, record) => {
        return (
          <Select style={{ width: "100%" }} placeholder="Khoản thu...">
            {props.feeCategoryList
              ? props.feeCategoryList.map((item, index) => {
                  if(item.categoryType === 1){
                    return (
                      <Select.Option value={item.id} key={"FeeCategoryOpts" + index}>
                        {item.feeCategoryName}
                      </Select.Option>
                    );
                  }
                })
              : ""}
          </Select>
        );
      },
    },
    {
      title: "Tình trạng",
      align: "center",
      render: (text, record) => {
        return <span></span>;
      },
    },
    {
      title: "Thao Tác",
      align: "center",
      render: (text, record) => (
        <Button
          type=""
          onClick={() => {
            console.log("cc");
            console.log(record);
            props.setShowModalUpdate(record);
          }}
        >
          <EyeOutlined />
        </Button>
      ),
    },
  ];

  const handleChangeTable = (pagination) => {
    console.log(pagination);
    setPagination(pagination);
  };

  const onSelectChange = (selectedRowKeys) => {
    console.log(selectedRowKeys);
    props.setSelectedRowKeys(selectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys: props.selectedRowKeys,
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

  return (
    <>
      <Table
        columns={columns}
        dataSource={props.data}
        rowKey="studentId"
        bordered
        size="small"
        pagination={pagination}
        onChange={(paging) => handleChangeTable(paging)}
        showSizeChanger={true}
        rowSelection={rowSelection}
        onRow={(record, index) => {
          if (record.isSelecting === true) return { style: { background: "#4DC2F7", fontWeight: "bolder" } };
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
    </>
  );
};

export default StudentList;
