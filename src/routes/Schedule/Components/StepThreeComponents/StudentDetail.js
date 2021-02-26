import React, { useEffect, useState } from "react";
import { Drawer, Table, Divider } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { Row, Col } from "reactstrap";

const StudentDetail = (props) => {
  const [loading, setLoading] = useState(true);

  const [studentDetail, setStudentDetail] = useState(null);

  const [gradeData, setGradeData] = useState([]);

  const getStudentDetail = (studentId) => {
    api
      .get(`/students/${studentId}`)
      .then((res) => {
        setStudentDetail(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
  const studentData = [
    {
      title: "Mã sinh viên:",
      values: studentDetail ? studentDetail.studentId : "",
    },
    {
      title: "Họ và tên:",
      values: studentDetail ? studentDetail.fullName : "",
    },
    {
      title: "Ngày sinh:",
      values: studentDetail ? studentDetail.dateBirth : "",
    },
    {
      title: "Giới tính:",
      values: studentDetail ? studentDetail.nationalityName : "",
    },
    {
      title: "Lớp niên khoá:",
      values: studentDetail ? studentDetail.religion : "",
    },
    {
      title: "Khoa:",
      values: studentDetail ? studentDetail.permanentResidence : "",
    },
  ];

  const studentTitle = [
    {
      title: "Danh mục",
      dataIndex: "title",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => {
        return <strong style={{ fontWeight: "700" }}>{text}</strong>;
      },
    },
    {
      title: "Giá trị",
      dataIndex: "values",
    },
  ];

  const gradeColumns = [
    {
      title: "Điểm C.cần",
      dataIndex: "diemChuyenCan",
      align: "center",
    },
    {
      title: "Điểm B.tập",
      dataIndex: "diemBaiTap",
      align: "center",
    },
    {
      title: "Điểm K.tra",
      dataIndex: "diemKiemTra",
      align: "center",
    },
    {
      title: "Điểm thi",
      dataIndex: "diemThi",
      align: "center",
    },
    {
      title: "Điểm thi lần 2",
      dataIndex: "diemThiLai",
      align: "center",
    },
    {
      title: "Điểm T.bình",
      dataIndex: "diemTrungBinh",
      align: "center",
    },
    {
      title: "Điểm thang bốn",
      dataIndex: "diemThangBon",
      align: "center",
    },
  ];

  useEffect(() => {
    if (props.visible) {
      getStudentDetail(props.visible.studentId);
    }
  }, [JSON.stringify(props.visible)]);

  return (
    <>
      <Drawer
        title="Thông tin sinh viên"
        width={840}
        closable={false}
        onClose={() => {
          props.setShowStudentDetail(false);
        }}
        visible={props.visible}
      >
        <Row>
          <Col md={12} style={{ display: "block" }}>
            <Divider orientation="left">Thông tin sinh viên</Divider>
            <Table
              bordered
              rowKey="title"
              showHeader={false}
              pagination={false}
              columns={studentTitle}
              dataSource={studentData}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ display: "block" }}>
            <Divider orientation="left">Kết quả học tập</Divider>
            <Table bordered rowKey="title" pagination={false} columns={gradeColumns} dataSource={gradeData} />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default StudentDetail;
