/**
 * Module Dashboard
 */

import React, { useState, useEffect } from 'react'
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Table, Tag, Space } from 'antd';
import './style.scss';
import 'antd/dist/antd.css';

const style = {
  table_body: {
    marginTop: '16px'
  },
  table_size: {
    background: 'none',
    border: 'none',
    padding: 0
  },
  table_size_dropdown: {
    width: '70px',
    flex: 'none',
    margin: '0px 10px',
    display: 'inline-block',
    float: 'none'
  },
  table_filter: {
    display: 'inline-block',
    verticalAlign: 'top',
    marginRight: '5px',
    width: '250px'
  },
  table_tool: {
    display: 'inline-block',
    verticalAlign: 'top'
  },
  table_tool_btn: {
    marginRight: '5px'
  },
};

const columns = [
  {
    title: 'Mã Học Phần ',
    dataIndex: 'name',
    key: 'name',
    render: text => <a>{text}</a>,
  },
  {
    title: 'Tên Học Phần ',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Số Tín Chỉ',
    dataIndex: 'address',
    children: [
      {

        title: "Từng Môn Học",

      },
      {
        title: "Theo Hoạt Động Giờ Tín Chỉ",
        dataIndex: "",
        children: [
          {
            title: "Lý Thuyết",
            dataIndex: ""
          },
          {
            title: "Bài Tập (x2)",
            dataIndex: ""
          },
          {
            title: "Thảo Luận (x2)",
            dataIndex: ""
          }
        ]
      },
      {
        title: "Thực Hành",
        dataIndex: ""
      },
      {
        title: "Tự Học",
        dataIndex: ""
      }

    ]
  },
  {
    title: 'Môn Học Tiên Quyết',
    key: 'tags',
    dataIndex: 'tags',
    render: tags => (
      <>
        {tags.map(tag => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: 'Thao Tác',
    key: 'action',
    render: (text, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const datas = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

export const ModuleHome = (props) => {
  // for (var i = 3; i < 50; i++) {
  //     rows.push(
  //         { id: i, title: `${'row' + i} `, count: 60 }
  //     )
  // }
  const [data, setData] = useState(datas);
  const [id, setId] = useState(4);
  useEffect(() => {
    // setId(id => id + 1)
    // data.push({
    //   key: id,
    //   name: 'Joe Black',
    //   age: 32,
    //   address: 'Sidney No. 1 Lake Park',
    //   tags: ['cool', 'teacher'],
    // });
    // setData(data);
  }, [])
  const lengthOptions = []
  return (
    <div className="data-table-wrapper">
      <RctCollapsibleCard
        heading={<span>Danh sách học phần</span>}
        collapsible
        fullBlock
      >
        <div className="table-responsive">
          <div className="table-head asrt-table-head"  >
            <div className="col-md-6">
              <div className="input-group asrt-page-length">
                <div className="input-group-addon input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ background: "none", border: "none", padding: "0px" }}
                  >
                    Show{" "}
                  </span>
                </div>
                <select
                  type="text"
                  className="form-control"
                  style={{
                    width: "70px",
                    flex: "0 0 auto",
                    margin: "0px 10px",
                    display: "inline-block",
                    float: "none",
                  }}
                >
                  <option>10</option>
                  <option>20</option>
                  <option>50</option>
                  <option value={2548}>All</option>
                </select>
                <div className="input-group-addon input-group-prepend">
                  <span
                    className="input-group-text"
                    style={{ background: "none", border: "none", padding: "0px" }}
                  >
                    {" "}
      result per page
    </span>
                </div>
              </div>
             </div>
          </div>
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
            bordered
          />
        </div >

      </RctCollapsibleCard>
    </div >
  )

}

export default ModuleHome;
