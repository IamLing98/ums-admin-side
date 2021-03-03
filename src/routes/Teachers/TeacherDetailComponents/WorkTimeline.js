import { Table, Divider } from "antd";
import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import moment from "moment";

const WorkTimeline = (props) => {
  const [record, setRecord] = useState(undefined);

  useEffect(() => {
    if (props.record) {
      setRecord(props.record);
    }
  }, [props.record]);

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "teacherWorkTimeLineId",
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
      title: "Nơi công tác",
      dataIndex: "workUnit",
      align: "center",
    },
    {
      title: "Công việc đảm nhiệm",
      dataIndex: "job",
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
              rowKey="teacherWorkTimeLineId"
              pagination={false}
              columns={columns}
              dataSource={record.teacherWorkTimeLineList}
            ></Table>
          </Col>
        </Row>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default WorkTimeline;
