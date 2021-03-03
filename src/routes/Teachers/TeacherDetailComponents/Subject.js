import { Table, Divider } from "antd";
import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";

const SubjectList = (props) => {
  const [record, setRecord] = useState(undefined);

  useEffect(() => {
    if (props.record) {
      setRecord(props.record);
    }
  }, [props.record]);

  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
      align: "center",
      render: (text, record) => {
        return (
          <span>
            {record.startDate} - {record.endDate ? record.endDate : "nay"}{" "}
          </span>
        );
      },
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
      align: "center",
    },
  ];

  if (record) {
    return (
      <div className="student-description-wrapper">
        <Row>
          <Col md={12}>
            <Divider orientation="left">Khoa {record.department.departmentName} </Divider>
            <Table
              bordered
              rowKey="subjectId"
              pagination={false}
              columns={columns}
              dataSource={record.subjectList}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default SubjectList;
