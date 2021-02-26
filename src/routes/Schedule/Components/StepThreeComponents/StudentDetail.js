import React, { useEffect, useState } from "react";
import { Drawer, Table, Divider, Badge  } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { Row, Col } from "reactstrap";
import moment from "moment";

const StudentDetail = (props) => {
  const [loading, setLoading] = useState(true);

  const [studentDetail, setStudentDetail] = useState(null);

  const extractStatus = (status) => {
    if (status === 1 || status === 2)
      return (
        <div>
          <Badge status="success" /> Đang theo học
        </div>
      );
    else
      return (
        <div>
          <Badge status="error" /> Đã huỷ
        </div>
      );
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
      values: studentDetail ? moment(studentDetail.dateBirth).format("MM/DD/YYYY") : "",
    },
    {
      title: "Giới tính:",
      values: studentDetail ? (studentDetail.sex === 1 ? "Nam" : "Nữ") : "",
    },
    {
      title: "Lớp niên khoá:",
      values: studentDetail ? studentDetail.className : "",
    },
    {
      title: "Khoa:",
      values: studentDetail ? studentDetail.departmentName : "",
    },
    {
      title: "Trạng thái:",
      values: studentDetail ? <div>{extractStatus(studentDetail.status)}</div> : "",
    },
  ];

  const studentTitle = [
    {
      title: "Danh mục",
      dataIndex: "title",
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
      console.log(props.visible);
      setStudentDetail(props.visible);
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
              dataSource={studentData ? studentData : []}
            />
          </Col>
        </Row>
        <Row>
          <Col md={12} style={{ display: "block" }}>
            <Divider orientation="left">Kết quả học tập</Divider>
            <Table
              bordered
              rowKey="title"
              pagination={false}
              columns={gradeColumns}
              dataSource={studentDetail ? [studentDetail] : []}
            />
          </Col>
        </Row>
      </Drawer>
    </>
  );
};

export default StudentDetail;
