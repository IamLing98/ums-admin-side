import React, { useState, useEffect } from "react";
import { Drawer, Button, Table, Divider, Tag, Popover } from "antd";
import { RollbackOutlined, PrinterFilled, ExportOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import { api } from "Api";
import StudentDetail from "./StudentDetail";
import TeacherDetail from "./TeacherDetail";
import { daysOfWeek } from "../../../../util/dataUltil";

const SubjectClassDetail = (props) => {
  const [subjectClass, setSubjectClass] = useState(undefined);

  const [showTeacherDetail, setShowTeacherDetail] = useState(false);

  const [showStudentDetail, setShowStudentDetail] = useState(false);

  useEffect(() => {
    if (props.visible) {
      api
        .get(`/subjectClasses/getDetail/${props.visible.subjectClassId}`)
        .then((result) => setSubjectClass(result))
        .catch((err) => console.log(err));
    }
  }, [props.visible]);
  const data = [
    {
      title: "Mã lớp học phần:",
      value: subjectClass ? subjectClass.subjectClassId : "",
    },
    {
      title: "Mã học phần:",
      value: subjectClass ? subjectClass.subjectId : "",
    },
    {
      title: "Tên học phần:",
      value: subjectClass ? subjectClass.subjectName : "",
    },
    {
      title: "Giảng viên:",
      value: subjectClass ? (
        <a
          href="javascript:void(0)"
          onClick={() => {
            setShowTeacherDetail(true);
          }}
        >
          <span>{subjectClass.teacherId + " - " + subjectClass.fullName}</span>
        </a>
      ) : (
        ""
      ),
    },
    {
      title: "Thời lượng:",
      value: subjectClass ? subjectClass.duration + " tiết" : "",
    },
    {
      title: "Lịch học",
      value: subjectClass
        ? daysOfWeek[subjectClass.dayOfWeek] +
          ". Tiết: " +
          subjectClass.hourOfDay +
          " - " +
          (subjectClass.duration + subjectClass.hourOfDay - 1)
        : "",
    },
    {
      title: "Phòng học",
      value: subjectClass ? subjectClass.roomId : "",
    },
    {
      title: "Khoa phụ trách",
      value: subjectClass ? subjectClass.departmentName : "",
    },
    {
      title: "Yêu cầu phòng máy:",
      value: subjectClass ? (subjectClass.isRequireLab === true ? "Có" : "Không") : "",
    },
    {
      title: "Số tín chỉ:",
      value: subjectClass ? subjectClass.eachSubject : "",
    },
    {
      title: "Số giờ lý thuyết:",
      value: subjectClass ? subjectClass.theoryNumber : "",
    },
    {
      title: "Số giờ bài tập:",
      value: subjectClass ? subjectClass.exerciseNumber : "",
    },
    {
      title: "Số giờ thảo luận:",
      value: subjectClass ? subjectClass.discussNumber : "",
    },
    {
      title: "Số giờ thực hành:",
      value: subjectClass ? subjectClass.practiceNumber : "",
    },
    {
      title: "Số giờ tự học:",
      value: subjectClass ? subjectClass.selfLearningNumber : "",
    },
  ];

  const columns = [
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
      dataIndex: "value",
    },
  ];

  const studentListColumns = [
    {
      title: "Mã sinh viên",
      dataIndex: "studentId",
      defaultSortOrder: "descend",
      align: "center",
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => (
        <a
          href="javascript:void(0)"
          onClick={() => {
            setShowStudentDetail(record);
          }}
        >
          <span>{text}</span>
        </a>
      ),
    },
    {
      title: "Họ và tên",
      dataIndex: "fullName",
      defaultSortOrder: "descend",
      align: "center",
    },
    {
      title: "Khoa",
      align: "center",
      dataIndex: "departmentName",
    },
    {
      title: "Lớp niên khoá",
      dataIndex: "className",
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      defaultSortOrder: "descend",
      align: "center",
      render: (text, record) => {
        if (text === 0) {
          return (
            <Popover content={record.rejectReason} title="Lý do huỷ">
              <Tag color="#f50">Đã huỷ</Tag>
            </Popover>
          );
        } else if (text === 1) {
          return <Tag color="#2db7f5">Đang theo học</Tag>;
        }
      },
    },
  ];

  return (
    <>
      <Drawer
        title="Thông tin chi tiết lớp học phần"
        width={1400}
        onClose={() => props.cancelSelecting(subjectClass)}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              style={{ width: "108px" }}
              onClick={() => props.cancelSelecting(subjectClass)}
              style={{ marginRight: 8 }}
            >
              <RollbackOutlined />
              Đóng
            </Button>{" "}
            <Button
              style={{ width: "108px" }}
              onClick={() => props.cancelSelecting(subjectClass)}
              style={{ marginRight: 8 }}
            >
              <PrinterFilled />
              PDF
            </Button>{" "}
            <Button
              style={{ width: "108px" }}
              onClick={() => props.cancelSelecting(subjectClass)}
              style={{ marginRight: 8 }}
            >
              <ExportOutlined />
              Exel
            </Button>
          </div>
        }
      >
        <Row>
          <Col md={4} style={{ display: "block" }}>
            <Divider orientation="left">Thông tin lớp</Divider>
            <Table
              rowKey="title"
              bordered
              columns={columns}
              dataSource={data}
              showHeader={false}
              pagination={false}
            ></Table>
          </Col>
          <Col md={8} style={{ display: "block" }}>
            <Divider orientation="left">Danh sách sinh viên</Divider>
            <Table
              pagination={{ pageSize: 12 }}
              rowKey="title"
              bordered
              columns={studentListColumns}
              dataSource={subjectClass ? subjectClass.studentList : []}
            ></Table>
          </Col>
        </Row>
        <TeacherDetail visible={showTeacherDetail} setShowTeacherDetail={setShowTeacherDetail} />
        <StudentDetail visible={showStudentDetail} setShowStudentDetail={setShowStudentDetail} />
      </Drawer>
    </>
  );
};

export default SubjectClassDetail;
