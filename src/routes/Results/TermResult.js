import { api } from "Api";
import React, { useEffect, useState, useRef } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
// import StudentImport from './Import';
import { Col, Row } from "reactstrap";
import moment from "moment";
import {
  DiffOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
  OrderedListOutlined,
} from "@ant-design/icons";
import { Button, TreeSelect, Modal, Select, Spin } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import ResultList from "./TermResultComponents/ResultList";
import FileSaver from "file-saver";

const { confirm } = Modal;

const treeData = [
  {
    title: "Học bổng",
    value: "HB",
    children: [
      {
        title: "Xuất sắc",
        value: "HB1",
      },
      {
        title: "Giỏi",
        value: "HB2",
      },
      {
        title: "Khá",
        value: "HB3",
      },
    ],
  },
  {
    title: "Kỷ luật",
    value: "KL",
  },
];

export const ResultsHome = (props) => {
  const [loading, setLoading] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [termList, setTermList] = useState([]);

  const [resultList, setResultList] = useState([]);

  const [currentData, setCurrentData] = useState([]);

  const [rank, setRank] = useState(null);

  const [termSelected, setTermSelected] = useState(null);

  const [term, setTerm] = useState(null);

  const [departmentList, setDepartmentList] = useState([]);

  const [spinLoading, setSpinLoading] = useState(false);

  const buttonType = {
    text: "In Danh Sách",
    action: "TOPDF",
    disabled: true,
  };

  const [buttonActionType, setButtonActionType] = useState(buttonType);

  const getTermList = () => {
    api
      .get(`/terms`)
      .then((result) => {
        let currentTerm = result.find((term) => term.status === 3);
        setTermList(result);
        setTerm(currentTerm);
        setTermSelected(currentTerm.id);
        getResult(currentTerm.id, rank);
      })
      .catch((err) => console.error(err));
  };

  const getResult = (term, rank) => {
    api
      .get(`/results?${term ? "termId=" + term : ""}${rank ? "&&rank=" + rank : ""}`)
      .then((result) => {
        setCurrentData(result);
        setResultList(result);
      })
      .catch((err) => console.log(err));
  };
  const saveFile = (fileName) => {
    FileSaver.saveAs(
      "http://localhost:8080" + `/downloadFile/${fileName}`,
      `${fileName}`,
    );
  };

  const createHBExportFile = () => {
    console.log(term);
    let scholarship = resultList
      .filter((item) => item.gpa >= 2.75 && item.diemRenLuyen >= 80)
      .map((item, index) => {
        let studentInfo = {
          id: index,
          studentId: item.student.studentId,
          fullName: item.student.fullName,
          yearClass: item.yearClass.classId + " " + item.yearClass.className,
          departmentName: item.department.departmentName,
          diemRenLuyen: item.diemRenLuyen,
          GPA: item.gpa,
          hbType: "",
          hbTypeName: "",
          hbValue: "",
        };
        if (item.gpa >= 3.6) {
          studentInfo.hbType = 1;
          studentInfo.hbValue = 2750000;
          studentInfo.hbTypeName = "Học bổng xuất sắc";
        } else if (item.gpa >= 3.2 && item.gpa < 3.6) {
          studentInfo.hbType = 2;
          studentInfo.hbValue = 2500000;
          studentInfo.hbTypeName = "Học bổng giỏi";
        } else if (item.gpa >= 2.75 && item.gpa < 3.2) {
          studentInfo.hbType = 3;
          studentInfo.hbValue = 2000000;
          studentInfo.hbTypeName = "Học bổng khá";
        }
        return studentInfo;
      });
    console.log("scholarship: ", scholarship);
    let values = {
      map: {
        term: term.term,
        preYear: term.year - 1,
        year: term.year,
        totalStudent: scholarship.length,
      },
      list: [...scholarship],
    };
    console.log("map:", values);

    api
      .post(`/documents/excel?id=3`, values)
      .then((res) => {
        saveFile(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  function handleExportHBFile() {
    Modal.confirm({
      title: "In danh sách học bổng",
      icon: <ExclamationCircleOutlined />,
      content: "Chắc chắn??? ...",
      okText: "Đồng ý",
      cancelText: "Huỷ",
      onOk() {
        return createHBExportFile();
      },
    });
  }

  const getDepartmentList = () => {
    api
      .get(`/departments`)
      .then((response) => setDepartmentList(response))
      .catch((error) => console.log(error));
  };

  const handleCreateGraduationList = () => {
    console.log(termList);
    if (termSelected) {
      let term = termList.find((item) => item.id === termSelected);
      term.actionType = "GETPREDICTGRADUATION";
      console.log("term: ", term);
      setSpinLoading(true);
      api
        .put(`/terms/${term.id}`, term, true)
        .then((res) => {
          NotificationManager.success("Tạo danh sách xét tốt nghiệp dự kiến thành công");
          setSpinLoading(false);
        })
        .catch((error) => {
          showErrNoti(error);
          setSpinLoading(false);
        });
    }
  };

  function showConfirm() {
    confirm({
      title: "Tạo danh sách xét tốt nghiệp dự kiến",
      icon: <ExclamationCircleOutlined />,
      content: "Chắc chắn?",
      okText: "Đồng ý",
      cancelText: "Huỷ",
      onOk() {
        handleCreateGraduationList();
      },
      onCancel() {
        console.log("Huỷ");
      },
    });
  }

  useEffect(() => {
    getTermList();
    getDepartmentList();
  }, []);

  useEffect(() => {
    getResult(termSelected, rank);
  }, [termSelected]);

  if (loading) {
    return (
      <>
        <RctPageLoader />
      </>
    );
  } else
    return (
      <Spin spinning={spinLoading}>
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
                onChange={(value) => {
                  let term = termList.find((item) => item.id === value);
                  setTerm(term);
                  setTermSelected(value);
                }}
              >
                {termList.map((term, index) => {
                  return (
                    <Select.Option value={term.id} key={`termOption:${index} `}>
                      Học kỳ: {term.term} năm {term.year}
                    </Select.Option>
                  );
                })}
              </Select>
              <TreeSelect
                style={{
                  width: "200px",
                  marginRight: "8px",
                  textAlign: "left",
                }}
                value={rank}
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                treeData={treeData}
                placeholder="Học bổng..."
                treeDefaultExpandAll
                allowClear
                onChange={(value) => {
                  if (value === "HB") {
                    let newData = resultList.filter(
                      (item) => item.gpa >= 2.75 && item.diemRenLuyen >= 80,
                    );
                    setCurrentData([...newData]);
                    setButtonActionType({
                      text: "In danh sách HB",
                      disabled: false,
                    });
                  } else if (value === "HB1") {
                    let newData = resultList.filter(
                      (item) => item.gpa >= 3.6 && item.diemRenLuyen >= 80,
                    );
                    setButtonActionType({
                      text: "In danh sách HB",
                      disabled: false,
                    });
                    setCurrentData([...newData]);
                  } else if (value === "HB2") {
                    let newData = resultList.filter(
                      (item) =>
                        item.gpa < 3.6 && item.gpa >= 3.2 && item.diemRenLuyen >= 80,
                    );
                    setButtonActionType({
                      text: "In danh sách HB",
                      disabled: false,
                    });
                    setCurrentData([...newData]);
                  } else if (value === "HB3") {
                    let newData = resultList.filter(
                      (item) =>
                        item.gpa >= 2.75 && item.gpa < 3.2 && item.diemRenLuyen >= 80,
                    );
                    setButtonActionType({
                      text: "In danh sách HB",
                      disabled: false,
                    });
                    setCurrentData([...newData]);
                  } else if (value === "KL") {
                    setButtonActionType({
                      text: "In danh sách KL",
                      disabled: false,
                    });
                    setCurrentData(resultList);
                  } else {
                    setButtonActionType({
                      text: "In danh sách ",
                      disabled: true,
                    });
                    setCurrentData(resultList);
                  }
                  setRank(value);
                }}
              />
              <Button
                type="primary"
                style={
                  selectedRowKeys.length > 1
                    ? {
                        background: "#2962FF",
                        borderColor: "#2962FF",
                        color: "black",
                        width: "180px",
                      }
                    : {
                        width: "180px",
                      }
                }
                onClick={() => {
                  handleExportHBFile();
                }}
                disabled={buttonActionType.disabled}
              >
                <DiffOutlined />
                <span>{buttonActionType.text}</span>
              </Button>
              <Button
                type="primary"
                style={ term ? term.progress === 37 ?{
                  background: "#448AE2",
                  borderColor: "#448AE2",
                  width: "180px",
                } :{} : {}}
                disabled={term ? (term.progress === 37 ? false : true) : true}
                onClick={() => showConfirm()}
              >
                <PlusOutlined></PlusOutlined>
                <span>Tạo mới đợt xét TN</span>
              </Button>
            </div>
          </Col>
        </Row>
        <ResultList data={currentData} departmentList={departmentList} />
      </Spin>
    );
};

export default ResultsHome;
