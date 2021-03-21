import React, { useEffect, useState } from "react";
import { Table } from "antd";
import { NotificationManager } from "react-notifications";
import { SearchOutlined } from "@ant-design/icons";
const YearClassList = (props) => {
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
    <Table
      columns={props.columns}
      dataSource={props.data}
      rowKey="username"
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
  );
};

export default YearClassList;
