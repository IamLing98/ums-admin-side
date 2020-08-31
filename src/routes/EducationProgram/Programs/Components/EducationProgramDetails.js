import React, { useEffect, useState } from 'react';
import { api } from 'Api';
import { NotificationManager } from 'react-notifications';
import {
    DeleteFilled,
    EditFilled,
    RetweetOutlined,
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
    DiffOutlined
} from '@ant-design/icons';
import { Table, Tag, Space, Button, Popconfirm } from 'antd';
import { Row, Col } from 'reactstrap';

const EducationProgramDetail = (props) => {

    const [subjectList, setSubjectList] = useState([]);

    useEffect(() => {
        console.log(props.record);
        api.post('/education-program/getDetails', props.record, true).then(
            response => {

                setSubjectList(response.subjectList);
            }).catch(error => {

                if (error.message === 'Forbidden') {
                    NotificationManager.error("Did you forget something? Please activate your account");
                }
                else if (error.message === 'Unauthorized') {
                    throw new SubmissionError({ _error: "Username or Password Invalid" });
                }
            });
    }, [])

    const columns = [
        {
            title: 'Mã Học Phần ',
            dataIndex: 'subjectId',
            render: text => <a>{text}</a>,
        },
        {
            title: 'Tên Học Phần ',
            dataIndex: 'subjectName',
        },
        {
            title: 'Số Tín Chỉ',
            dataIndex: "eachSubject",
        },
        {
            title: 'Môn Học Tiên Quyết',
            dataIndex: 'tags',
            render: tags => (
                <>

                </>
            ),
        },
        {
            title: 'Trình Độ Đào Tạo',
            dataIndex: 'subjectForLevel',
            render: text => {
                if (text === "1") {
                    return <span>Đào Tạo Tiến Sỹ</span>
                }
                else if (text === "2") {
                    return <span>Đào Tạo Thạc Sỹ</span>
                }
                else if (text === "3") {
                    return <span>Đại học</span>
                }
                else {
                    return <span></span>
                }
            },
        },
        {
            title: 'Thao Tác',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    {/* <Button type=""
                        onClick={
                            () => {
                                console.log(record)
                                setRecordUpdate(record);
                                setShowModalUpdate(true);
                            }
                        }>
                        <EditFilled
                        />
                    </Button> */}
                    <Popconfirm placement="left" title={"Chắc chắn xoá?"} onConfirm={() => handleDeleteRecord(record)} okText="Ok" cancelText="Không">

                        <Button
                            type=""
                        >
                            <DeleteFilled />
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        }
    ]


    return (
        <>
            <div className="table-responsive">
                <Row><Col md={6}>

                </Col>
                    <Col md={6}>
                        <div className="tableListOperator" style={{textAlign:"right"}}>
                            <button type="button" className="ant-btn">
                                <EditOutlined />
                                <span>Chỉnh Sửa</span>
                            </button>
                            <button type="button" className="ant-btn ant-btn-primary">
                                <PlusOutlined></PlusOutlined>
                                <span>Thêm </span>
                            </button>
                            <button type="button" className="ant-btn ant-btn-danger">
                                <DeleteOutlined />
                                <span>Xoá Nhiều</span>
                            </button>
                            <a
                                href="https://demo.doublechaintech.com/freshchain/platformManager/exportExcelFromList/P000001/productList/"
                                className="ant-btn"
                            >
                                <DiffOutlined />
                                <span>In Exel</span>
                            </a>
                        </div>
                    </Col>
                    </Row>


                <Table
                    columns={columns}
                    dataSource={subjectList}
                    rowKey="subjectId"
                    bordered
                    scroll={{
                        y: "400px"
                    }}
                    pagination={{ pageSize: 5 }}
                    size="small"
                    rowSelection={true}
                />
            </div >
            <Row style={{ padding: " 0.9375rem 1.25rem ", margin: "0" }}>
                <Space size="middle">
                    <Button type="" onClick={() => props.back()}>Quay Lại</Button>
                    {" "}
                    {/* <Button
                        type="primary"
                        onClick={() => handleOkOnClick()}
                    >
                        Cập Nhật
                         </Button> */}
                </Space>
            </Row>
        </>

    )
}

export default EducationProgramDetail;