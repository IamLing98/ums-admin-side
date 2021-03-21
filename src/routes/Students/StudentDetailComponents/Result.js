import React, { useEffect, useState } from "react";
import { Divider, Select, Table, Tag, Modal } from "antd";
import { api } from "Api";
import { Row, Col } from "reactstrap";

const Result = (props) => {
  const [selectedItem, setSelectedItem] = useState(null);

  const [result, setResult] = useState();

  const [loading, setLoading] = useState(true);

  const [subjectList, setSubjectList] = useState([]);

  const [studentSubjectList, setStudentSubjectList] = useState([]);

  const [CPA, setCPA] = useState();

  const [selectedTerm, setSelectedTerm] = useState(null);

  const [educationProgram, setEducationProgram] = useState(null);

  const getResult = (studentId) => {
    api
      .get(`/results/details/${studentId}`)
      .then((res) => {
        let data = res;
        setResult(res);
        setEducationProgram(res.educationProgramDTO);
        setStudentSubjectList(res.educationProgramDTO.studentSubjects);
        let CPA = 0.0;
        for (var i = 0; i < data.resultDTOs.length; i++) {
          let term = data.resultDTOs[i];
          CPA += term.GPA;
        }
        CPA = CPA / data.resultDTOs.length;
        setCPA(CPA);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getResult(props.record.studentId);
  }, []);

  const educationData = [
    {
      title: "Mã CTDT:",
      values: educationProgram ? educationProgram.educationProgramId : "",
    },
    {
      title: "Tên CTDT:",
      values: educationProgram ? educationProgram.educationProgramName : "",
    },
    {
      title: "Tổng số tín chỉ:",
      values: educationProgram ? educationProgram.totalEachSubject : "",
    },
    {
      title: "Số học kỳ:",
      values: educationProgram ? educationProgram.totalTerm : "",
    },
    {
      title: "CPA:",
      values: CPA ? CPA : "",
    },
  ];

  const educationColumn = [
    {
      title: "Danh mục",
      dataIndex: "title",
      render: (text, record) => {
        return <strong style={{ fontWeight: "700" }}>{text}</strong>;
      },
      width: "40%",
    },
    {
      title: "Giá trị",
      dataIndex: "values",
    },
  ];

  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
      align: "center",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
      render: (text, record) => {
        if (selectedTerm) {
          return (
            <a
              // className="ant-anchor-link-title ant-anchor-link-title-active"
              href="javascript:void(0)"
              onClick={() => {
                console.log(record);
                if (selectedTerm) {
                  info(record);
                }
              }}
            >
              {text}
            </a>
          );
        } else return <span> {text}</span>;
      },
    },
    {
      title: "Loại học phần",
      dataIndex: "eachSubject",
      align: "center",
    },
    {
      title: "Số tín chỉ",
      dataIndex: "eachSubject",
      align: "center",
    },
    {
      title: "Điểm hệ 10",
      dataIndex: "diemTrungBinh",
      align: "center",
    },
    {
      title: "Điểm hệ 4",
      dataIndex: "diemThangBon",
      align: "center",
    },
    {
      title: "Điểm chữ",
      dataIndex: "diemChu",
      align: "center",
    },
  ];
  function info(record) {
    Modal.info({
      title: "Chi tiết học phần",
      content: (
        <div>
          <p>
            Tên học phần:{" "}
            <strong>
              {props.selectedTerm ? record.subjectName : record.subject.subjectName}
            </strong>
          </p>
          <p>
            Số tín chỉ: <strong>{record.eachSubject}</strong>
          </p>
          <p>
            Điểm chuyên cần: <strong>{record.diemChuyenCan}</strong>{" "}
          </p>
          <p>
            Điểm bài tập: <strong>{record.diemBaiTap}</strong>{" "}
          </p>
          <p>
            Điểm kiểm tra: <strong>{record.diemKiemTra}</strong>{" "}
          </p>
          <p>
            Điểm thi: <strong>{record.diemThi}</strong>{" "}
          </p>
          <p>
            Điểm thi lần 2: <strong>{record.diemThiLai}</strong>{" "}
          </p>
        </div>
      ),
      centered: true,
      okText: "Đóng",
      onOk() {},
    });
  }
  if (props.record && !loading) {
    return (
      <div className="student-description-wrapper">
        <Row>
          <Col md={4} style={{ display: "block" }}>
            <Divider>Chương trình đào tạo</Divider>
            <Table
              bordered
              rowKey="title"
              showHeader={false}
              size="small"
              pagination={false}
              columns={educationColumn}
              dataSource={educationData}
            ></Table>
          </Col>
          <Col>
            <Divider>Kết quả học tập</Divider>
            <Row style={{ display: "block" }}>
              <Col md={12} style={{ display: "block" }}>
                <Select
                  style={{ width: "100%" }}
                  placeholder="Học kỳ..."
                  value={selectedItem}
                  onChange={(value) => {
                    if (value) {
                      let term = result.resultDTOs.find((item) => item.term.id === value);
                      setSubjectList(term.subjectClassRegistrationList);
                      setSelectedTerm(term);
                    } else {
                      setSubjectList(studentSubjectList);

                      setSelectedTerm(null);
                    }
                    setSelectedItem(value);
                  }}
                >
                  <Select.Option value={null} key={"termOptsSchedulenull"}>
                    Xem toàn bộ chương trình
                  </Select.Option>
                  {result.resultDTOs.map((term, index) => {
                    return (
                      <Select.Option
                        value={term.term.id}
                        key={"termOptsSchedule" + index}
                      >
                        {"Học kỳ " + term.term.term + " năm " + term.term.year}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <div style={{ marginTop: "15px" }}>
              {selectedItem && (
                <Tag
                  style={{
                    lineHeight: "32px",
                    marginBottom: "15px",
                    fontSize: "15px",
                    fontWeight: "bold",
                    maxWidth: "50%",
                  }}
                >
                  GPA:{selectedTerm ? selectedTerm.gpa : ""}
                </Tag>
              )}
              <Table
                bordered
                rowKey="subjectId"
                size="small"
                pagination={{ pageSize: 15 }}
                columns={columns}
                dataSource={subjectList}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  } else return <></>;
};

export default Result;
