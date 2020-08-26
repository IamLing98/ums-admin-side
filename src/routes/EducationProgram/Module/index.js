/**
 * Module Dashboard
 */

import React, {useState,useEffect} from 'react'
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Table, Tag, Space } from 'antd';
import './style.scss';
import 'antd/dist/antd.css';
const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Tags',
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
      title: 'Action',
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
    useEffect(()=>{
        setId(id => id + 1)
        data.push({
            key: id,
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          });
          setData(data);
    },[])
    console.log("render")
    return (
        <div className="data-table-wrapper">
            <PageTitleBar title={<span>Học Phần</span>} match={props.match} />
            <RctCollapsibleCard
                heading={<span>Danh sách học phần</span>}
                collapsible
                fullBlock
            >
                <div className="table-responsive">

                <Table columns={columns} dataSource={data} pagination={false}/>
                </div >

            </RctCollapsibleCard>
        </div >
    )

}

export default ModuleHome;
