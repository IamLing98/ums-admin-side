import { Table, Divider } from "antd";
import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";

const EducationLevel = (props) => {
  const [record, setRecord] = useState(undefined);

  useEffect(() => {
    if (props.record) {
      setRecord(props.record);
    }
  }, [props.record]);

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "graduationYear",
      align: "center", 
    },
    {
      title: "Bậc đào tạo",
      dataIndex: "educationLevel",
      align: "center",
      render: (text) => {
        if (text === 0) {
          return <span>Đại học</span>;
        } else if (text === 1) {
          return <span>Thạc sỹ</span>;
        } else if (text === 2) {
          return <span>Tiến sỹ</span>;
        }
      },
    },
    {
      title: "Nội dung đào tạo",
      dataIndex: "banchName",
      align: "center",
    },
    {
      title: "Đơn vị đào tạo",
      dataIndex: "educationPlace",
      align: "center",
    },
  ];

  if (record) {
    return (
      <div className="student-description-wrapper">
        <Row>
          <Col md={12}>
            <Table
              bordered
              rowKey="teacherTimeLineId"
              pagination={false}
              columns={columns}
              dataSource={record.teacherEducationTimeLineList}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default EducationLevel;
