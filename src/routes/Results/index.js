import { api } from "Api";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
// import StudentImport from './Import';
import { Col, Row } from "reactstrap";
import moment from "moment";
import {
  PlusOutlined,
  SearchOutlined,
  DeleteOutlined,
  DiffOutlined,
  VerticalAlignBottomOutlined,
  ExclamationCircleOutlined,
  RetweetOutlined,
} from "@ant-design/icons";
import { Button, Alert, Modal, Select } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { confirm } = Modal;

export const ResultsHome = (props) => {
  const [loading, setLoading] = useState(false);

  const [currentTitle, setCurrentTitle] = useState("Kết quả học tập");

  const [recordFoundNumber, setRecordFoundNumber] = useState(0);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [termList, setTermList] = useState([]);

  const [result, setResult] = useState([]);

  const [rank, setRank] = useState("0");

  const [termSelected, setTermSelected] = useState(null);

  const getTermList = () => {
    api
      .get(`/terms`)
      .then((result) => {
        let currentTerm = result.find((term) => term.status === 3);
        setTermList(result);
        setTermSelected(currentTerm.id);
        getResult(currentTerm.id, rank);
      })
      .catch((err) => console.error(err));
  };

  const getResult = (term, rank) => {
    api
      .get(`/results?${term ? "termId=" + term : ""}${rank ? "&&rank=" + rank : ""}`)
      .then((result) => setResult(result))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getTermList();
  }, []);

  if (loading) {
    return (
      <>
        <RctPageLoader />
      </>
    );
  } else
    return (
      <div className="data-table-wrapper">
        <Helmet>
          <title>Kết Qẩu Học Tập</title>
          <meta name="description" content="Danh Sách Giảng Viên" />
        </Helmet>
        <div className="rct-block ">
          <div className="rct-block-title ">
            <h4>
              <span>{currentTitle}</span>{" "}
            </h4>
            <div className="contextual-link" style={{ top: "15px" }}></div>
          </div>
          <div className="collapse show">
            <div className="rct-full-block">
              <hr style={{ margin: "0px" }} />
              <div className="table-responsive">
                <Row>
                  <Col md={12} sm={12} xs={12}>
                    <div
                      className="tableListOperator"
                      style={{ textAlign: "right", width: "100%" }}
                    >
                      <Select
                        allowClear
                        placeholder="Học kỳ..."
                        showSearch
                        style={{
                          width: "200px",
                          marginRight: "8px",
                          textAlign: "left",
                        }}
                        value={termSelected}
                        onChange={(value) => setTermSelected(value)}
                      >
                        {termList.map((term, index) => {
                          return (
                            <Select.Option value={term.id} key={`termOption:${index} `}>
                              Học kỳ: {term.term} năm {term.year}
                            </Select.Option>
                          );
                        })}
                      </Select>
                      <Select
                        allowClear
                        placeholder="Kết quả học tập..."
                        showSearch
                        style={{
                          width: "200px",
                          marginRight: "8px",
                          textAlign: "left",
                        }}
                        value={rank}
                        onChange={(value) => setRank(value)}
                      >
                        <Select.Option key={"filtereddd1"} value={1}>
                          Xuất sắc
                        </Select.Option>
                        <Select.Option key={"filtereddd2"} value={2}>
                          giỏi
                        </Select.Option>
                        <Select.Option key={"filtereddd3"} value={3}>
                          khá
                        </Select.Option>
                        <Select.Option key={"filtereddd4"} value={4}>
                          trung bình
                        </Select.Option>
                        <Select.Option key={"filtereddd5"} value={5}>
                          Yếu
                        </Select.Option>
                      </Select>
                      <Select
                        allowClear
                        placeholder="Rèn luyện..."
                        showSearch
                        style={{
                          width: "200px",
                          marginRight: "8px",
                          textAlign: "left",
                        }}
                      >
                        <Select.Option key={+"filteredddd1"} value={1}>
                          Khen thuởng
                        </Select.Option>
                        <Select.Option key={+"filteredddd2"} value={2}>
                          Kỷ luật
                        </Select.Option>
                      </Select>
                      <Button
                        type="primary"
                        style={
                          selectedRowKeys.length > 1
                            ? {
                                background: "#DEC544",
                                borderColor: "#DEC544",
                                color: "black",
                                width: "180px",
                              }
                            : {
                                width: "180px",
                              }
                        }
                        onClick={() => {
                          setShowModalPDF(true);
                        }}
                        disabled={selectedRowKeys.length > 1 ? false : true}
                      >
                        <DiffOutlined />
                        <span>PDF</span>
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default ResultsHome;
