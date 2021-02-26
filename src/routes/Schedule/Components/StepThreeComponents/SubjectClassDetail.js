import React, { useState, useEffect } from "react";
import { Drawer, Button, Table, Divider } from "antd";
import { RollbackOutlined, PrinterFilled, ExportOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import StudentDetail from "./StudentDetail";
import TeacherDetail from "./TeacherDetail";

const SubjectClassDetail = (props) => {
  const [subjectClass, setSubjectClass] = useState(undefined);

  const [showTeacherDetail, setShowTeacherDetail] = useState(false);

  const [showStudentDetail, setShowStudentDetail] = useState(false); 
  
  useEffect(() => {
    if (props.visible) {
      console.log(props.visible);
      setSubjectClass(props.visible);
      let newA = [];
      for (var i = 0; i < 20; i++) {
        newA.push({
          studentId: "517100001",
          fullName: "Seymour Abneyy",
          departmentName: "Công nghệ thông tin ",
          yearClassId: "517100",
          yearClassName: "Công Nghệ Thông Tin",
        });
      }
      setStudentList([...newA]);
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
      title: "Lịch học",
      value: subjectClass ? subjectClass.departmentName : "",
    },
    {
      title: "Phòng học",
      value: subjectClass ? subjectClass.departmentName : "",
    },
    {
      title: "Khoa phụ trách",
      value: subjectClass ? subjectClass.departmentName : "",
    },
    {
      title: "Thời lượng:",
      value: subjectClass ? subjectClass.duration + " tiết" : "",
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

  const [studentList, setStudentList] = useState([
    {
      studentId: "517100001",
      fullName: "Seymour Abneyy",
      departmentName: "Công nghệ thông tin ",
      yearClassId: "517100",
      yearClassName: "Công Nghệ Thông Tin",
    },
  ]);

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
      dataIndex: "yearClassId",
      align: "center",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Trạng thái",
      dataIndex: "title",
      defaultSortOrder: "descend",
      align: "center",
      sorter: (a, b) => a.age - b.age,
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
              dataSource={studentList}
            ></Table>
          </Col>
        </Row>
        <TeacherDetail visible={showTeacherDetail} setShowTeacherDetail={setShowTeacherDetail} />
        <StudentDetail  visible={showStudentDetail} setShowStudentDetail={setShowStudentDetail} />
      </Drawer>
    </>
  );
};

export default SubjectClassDetail;
