/**
 * Module Dashboard
 */

import React, { useState, useEffect } from 'react'
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Table, Tag, Space } from 'antd';
import 'antd/dist/antd.css';


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

export const ModuleList = (props) => {
  useEffect(() => {
    
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
           
          <Table
            columns={columns}
            dataSource={datas}
            pagination={false}
            bordered
          />
        </div >

      </RctCollapsibleCard>
    </div >
  )

}

export default ModuleList;
