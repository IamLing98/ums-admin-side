import React, { useState, useEffect } from "react";
import { Button, Input, Popconfirm, Space, Table } from "antd";
import { Helmet } from "react-helmet";
import { Col, Row } from "reactstrap";
import {
    DeleteFilled,
    DeleteOutlined,
    DoubleLeftOutlined,
    EditFilled,
    PlusOutlined,
    RetweetOutlined,
    SearchOutlined,
  } from "@ant-design/icons";

const RoomList = (props) => {
  return (
    <div className="data-table-wrapper">
      <Helmet>
        <title>Danh Sách Giảng Đường</title>
        <meta name="description" content="User Profile" />
      </Helmet>
      <div>
      <div className="rct-block ">
        <div className="rct-block-title ">
          <h4>Danh Sách Giảng Đường</h4>
          <div className="contextual-link" style={{ top: "15px" }}></div> 
        </div>
        <div className="collapse show">
          <div className="rct-full-block">
          <hr style={{ margin: "0px" }} />
              <div className="table-responsive">
                <Row>
                  <Col
                    md={6}
                    sm={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <Row>
                      <Col md={4}>
                        <Input placeholder="Mã giảng đường..." size="middle" />
                      </Col>
                      <Col md={4}>
                        
                      </Col>
                      <Col
                        md={4}
                        style={{ display: "block", flexDirection: "column" }}
                      >
                        <button
                          type="button"
                          className="ant-btn ant-btn-primary"
                          onClick={() => props.setPageStatus(true)}
                        >
                          <SearchOutlined />
                          <span>Tìm Kiếm</span>
                        </button>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={6}
                    sm={12}
                    xs={12}
                    style={{ display: "flex", flexDirection: "column" }}
                  >
                    <div
                      className="tableListOperator"
                      style={{ textAlign: "right", width: "100%" }}
                    >
                      <button
                        type="button"
                        className="ant-btn ant-btn-primary"
                        onClick={() => props.setPageStatus(2)}
                      >
                        <PlusOutlined></PlusOutlined>
                        <span>Tạo Mới</span>
                      </button>  
                    </div>
                  </Col>
                </Row>
                <Table
                  columns={props.columns}
                  dataSource={props.roomList}
                  bordered
                  rowKey="roomId"
                  size="small"  
                  showSizeChanger={true} 
                />
              </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RoomList;
