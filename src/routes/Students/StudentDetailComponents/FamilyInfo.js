import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { Table } from "antd";
import moment from "moment";

const FamilyInfo = (props) => {
  const [record, setRecord] = useState(undefined);

  useEffect(() => {
    if (props.record) {
      setRecord(props.record);
    }
  }, [props.record]);

  const dataLeft = [
    {
      title: "Họ và tên bố:",
      values: record ? record.fatherName : "",
    },
    {
      title: "Năm sinh bố:",
      values: record ? record.fatherDateBirth : "",
    },
    {
      title: "Nghề nghiệp bố:",
      values: record ? record.fatherWork : "",
    },
  ];
  const columnsLeft = [
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

  const dataRight = [
    {
      title: "Họ và tên mẹ:",
      values: record ? record.motherName : "",
    },
    {
      title: "Năm sinh mẹ:",  
      values: record ? record.motherDateBirth : "",
    },
    {
      title: "Nghề nghiệp mẹ:",
      values: record ? record.motherWork : "",
    },
  ];
  const columnsRigth = [
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
  if (props.record) {
    return (
      <div className="student-description-wrapper">
        <Row>
          <Col md={6}>
            <Table
              bordered
              rowKey="title"
              showHeader={false}
              pagination={false}
              columns={columnsLeft}
              dataSource={dataLeft}
            ></Table>
          </Col>
          <Col>
            <Table
              bordered
              rowKey="title"
              showHeader={false}
              pagination={false}
              columns={columnsRigth}
              dataSource={dataRight}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default FamilyInfo;
