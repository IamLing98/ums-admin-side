import React, { useState, useEffect } from "react";
import { Drawer, Table, Button } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { RollbackOutlined } from "@ant-design/icons";

const SubjectDetails = (props) => {
  const [loading, setLoading] = useState(true);

  const [subject, setSubject] = useState(undefined);

  const data = [
    {
      title: "Mã học phần:",
      value: subject ? subject.subjectId : "",
    },
    {
      title: "Tên học phần:",
      value: subject ? subject.subjectName : "",
    },
    {
      title: "Số tín chỉ:",
      value: subject ? subject.eachSubject : "",
    },
    {
      title: "Số giờ lý thuyết:",
      value: subject ? subject.theoryNumber : "",
    },
    {
      title: "Số giờ bài tập:",
      value: subject ? subject.exerciseNumber : "",
    },
    {
      title: "Số giờ thảo luận:",
      value: subject ? subject.discussNumber : "",
    },
    {
      title: "Số giờ thực hành:",
      value: subject ? subject.practiceNumber : "",
    },
    {
      title: "Số giờ tự học:",
      value: subject ? subject.selfLearningNumber : "",
    },
    {
      title: "Học phần tiên quyết:",
    },
    {
      title: "Học phần tương đương:",
    },
    {
      title: "Khoa phụ trách:",
      value: subject ? subject.departmentName : "",
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

  useEffect(() => {
    if (props.visible) {
      setLoading(false);
      setSubject(props.visible);
    }
  }, [props.visible]);

  return (
    <Drawer
      title="Thông tin học phần"
      width={"30%"}
      onClose={() => props.cancelSelecting(props.visible)}
      visible={props.visible}
      bodyStyle={{ paddingBottom: 80 }}
      footer={
        <div
          style={{
            textAlign: "right",
          }}
        >
          <Button
            onClick={() => props.cancelSelecting(props.visible)}
            style={{ marginRight: 8 }}
          >
            <RollbackOutlined /> Quay lại
          </Button>
        </div>
      }
    >
      {loading === true ? (
        <RctPageLoader />
      ) : (
        <Table
          bordered
          columns={columns}
          dataSource={data}
          showHeader={false}
          pagination={false}
        ></Table>
      )}
    </Drawer>
  );
};

export default SubjectDetails;
