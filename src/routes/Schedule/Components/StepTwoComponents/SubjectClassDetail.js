import React, { useState, useEffect } from "react";
import { Drawer, Button, Table, Avatar } from "antd";
import { RollbackOutlined, CheckOutlined } from "@ant-design/icons";

const SubjectClassDetail = (props) => {
  const [subjectClass, setSubjectClass] = useState(undefined);

  useEffect(() => {
    if (props.visible) {
      console.log(props.visible);
      setSubjectClass(props.visible);
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
      value: subjectClass ? subjectClass.employeeFullName : "",
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
      value: subjectClass
        ? subjectClass.isRequireLab === true
          ? "Có"
          : "Không"
        : "",
    },
    {
      title: "Số tín chỉ:",
      value: subjectClass ? subjectClass.eachsubject  : "",
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

  return (
    <>
      <Drawer
        title="Thông tin chi tiết lớp học phần"
        width={720}
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
              onClick={() => props.cancelSelecting(subjectClass)}
              style={{ marginRight: 8 }}
            >
              <RollbackOutlined />
              Đóng
            </Button>
          </div>
        }
      >
        <Table
          rowKey="title"
          bordered
          columns={columns}
          dataSource={data}
          showHeader={false}
          pagination={false}
        ></Table>
      </Drawer>
    </>
  );
};

export default SubjectClassDetail;
