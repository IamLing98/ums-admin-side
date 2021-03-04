import { Table } from "antd";
import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import moment from 'moment';


const StudentProfile = (props) => {
  const [record, setRecord] = useState(undefined);

  useEffect(() => {
    if (props.record) {
      setRecord(props.record);
    }
  }, [props.record]);

  const dataLeft = [
    {
      title: "Họ và tên:",
      values: record ? record.fullName : "",
    },
    {
      title: "Ngày sinh:",
      values: record && record.dateBirth ? moment(record.dateBirth).format("DD.MM.YYYY") : "",
    },
    {
      title: "Quốc tịch:",
      values: record ? record.nationality : "",
    },
    {
      title: "Tôn giáo:",
      values: record && record.religion ? record.religion : "Không",
    },
    {
      title: "Hộ khẩu thường trú:",
      values: record ? record.contactAddress : "",
    },
    {
      title: "Khu vực tuyển sinh:",
      values: "",
    }, 
    {
      title: "Diện chính sách:",
      values: record && record.incentivesType ? record.incentivesType : "Không",
    },
    {
      title: "Số CMND:",
      values: record ? record.identityNumber : "",
    },
    {
      title: "Nơi cấp:",
      values: record ? record.identityCreatedPlace : "",
    },
    {
      title: "Số điện thoại:",
      values: record ? record.phoneNumber : "",
    },
    {
      title: "Địa chỉ liên lạc:",
      values: record ? record.contactAddress : "",
    },
    {
      title: "Ngày vào đoàn:",
      values: record ? record.CYUStartDate : "",
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
      title: "Giới tính:",
      values: record ? record.sex === 0 ? "Nam" : "Nữ" :""
    },
    {
      title: "Nơi sinh:",
      values: record ? record.bornPlace : "",
    },
    {
      title: "Dân tộc:",
      values: record ? record.ethnic : "",
    },
    {
      title: "Nguyên quán:",
      values: record ? record.homeTown : "",
    },
    {
      title: "Đối tượng:",
      values: "Không",
    },
    {
      title: "Trình độ văn hoá:",
      values: record ? record.educationLevel : "",
    },
    {
      title: "Thành phần gia đình:",
      values: record ? record.familyElement : "",
    },
    {
      title: "Ngày vào đảng:",
      values: record ? record.CPStartDate : "",
    },
    {
      title: "Ngày cấp:",
      values: record ? record.identityCreatedDate : "",
    },
    {
      title: "Số tài khoản:",
      values: record ? record.bankNumber : "",
    },
    {
      title: "Email:",
      values: record ? record.email : "",
    },
    {
      title: "Ghi chú:",
      values: record ? record.note : "",
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

export default StudentProfile;
