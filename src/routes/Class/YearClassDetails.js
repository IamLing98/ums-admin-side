import React, { useState, useEffect } from "react";
import { Drawer, Button, Table, Divider, Tag, Popover } from "antd";
import { RollbackOutlined, PrinterFilled, ExportOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import { api } from "Api";
import StudentDetail from "./Components/StudentDetail";
import TeacherDetail from "./Components/TeacherDetail";
import { daysOfWeek } from "../../util/dataUltil";
import moment from "moment";
import FileSaver from "file-saver";

const YearClassDetail = (props) => {
  const [subjectClass, setSubjectClass] = useState(undefined);

  const [showTeacherDetail, setShowTeacherDetail] = useState(false);

  const [showStudentDetail, setShowStudentDetail] = useState(false);

  useEffect(() => {
    if (props.visible) {
      api
        .get(`/yearClasses/${props.visible.classId}`)
        .then((result) => setSubjectClass(result))
        .catch((err) => console.log(err));
    }
  }, [props.visible]);

  const saveFile = (fileName) => {
    FileSaver.saveAs(
        `http://localhost:8080/downloadFile/${fileName}`,
      `${fileName}`,
    );
  };

  const handleCreateSubjectClassListExcel = (values) => {
    console.log(values);
    let excelData = {
      map: {
        yearClassId: values.classId,
        yearClassName: values.className,
        teacherName: values.teacherFullName,
      },
      list: values.studentDTOList.map((student, index) => {
        return {
          id: index,
          ...student,
          sex: student.sex === 1 ? "Nam" : "Nữ",
        };
      }),
    };
    console.log("excelData: ", excelData);
    api
      .post(`/documents/excel?id=5`, excelData)
      .then((response) => {
        console.log(response);
        saveFile(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const data = [
    {
      title: "Mã lớp:",
      value: subjectClass ? subjectClass.classId : "",
    },
    {
      title: "Tên lớp:",
      value: subjectClass ? subjectClass.className : "",
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
          <span>{subjectClass.teacherFullName}</span>
        </a>
      ) : (
        ""
      ),
    },
    {
      title: "Khoa",
      value: subjectClass ? subjectClass.departmentName : "",
    },
    {
      title: "Khoá",
      value: subjectClass ? subjectClass.courseNumber : "",
    },
    {
      title: "Sỹ số",
      value: subjectClass ? subjectClass.totalMember : "",
    },
  ];

  const columns = [
    {
      title: "Danh mục",
      dataIndex: "title",
      defaultSortOrder: "descend",
      width: "50%",
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
      title: "Giới tính",
      align: "center",
      dataIndex: "sex",
      render: (text) => {
        if (text === 0) {
          return <span>Nam</span>;
        } else return <span>Nữ</span>;
      },
    },
    {
      title: "Ngày sinh",
      dataIndex: "dateBirth",
      align: "center",
      render: (text) => moment(text).format("DD.MM.YYYY"),
    },
  ];

  return (
    <>
      <Drawer
        title="Thông tin chi tiết lớp niên khoá"
        width={1400}
        onClose={() => props.deSelecting()}
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
              onClick={() => props.deSelecting(props.visible)}
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
              onClick={() => handleCreateSubjectClassListExcel(subjectClass)}
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
              dataSource={subjectClass ? subjectClass.studentDTOList : []}
            ></Table>
          </Col>
        </Row>
        <TeacherDetail
          visible={showTeacherDetail}
          setShowTeacherDetail={setShowTeacherDetail}
        />
        <StudentDetail
          visible={showStudentDetail}
          setShowStudentDetail={setShowStudentDetail}
        />
      </Drawer>
    </>
  );
};

export default YearClassDetail;
