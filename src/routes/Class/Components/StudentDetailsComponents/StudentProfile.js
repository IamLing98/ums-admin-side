import React, { useEffect, useState } from "react";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  DeleteFilled,
  EditFilled,
  RetweetOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DiffOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  Table,
  Tag,
  Tabs,
  Space,
  Button,
  Popconfirm,
  Alert,
  Input,
  Descriptions,
} from "antd";
import UpdateEducationProgramSubject from "Routes/EducationProgram/Programs/Components/UpdateEducationProgramSubject";
import { Row, Col } from "antd";
const { TabPane } = Tabs;

const defaultRecord = {
  branchId: "",
  branchName: "",
  educationProgramId: "",
  educationProgramLevel: "3",
  educationProgramName: "",
  educationProgramStatus: "",
  educationProgramType: "",
};

const StudentProfile = (props) => {
  const size = "small";
  const {record} = props;
  console.log("record", record)
  return (
    <div className="student-description-wrapper">

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Họ và tên" span={3}>
          {record.fullName}
        </Descriptions.Item>
        <Descriptions.Item label="Giới tính" span={3}>
        {record.sex !== null ? (record.sex === 1 ? "Nam" : "Nữ" )   :""}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Ngày sinh" span={3}>
        {record.dateBirth !== null ? record.dateBirth      :"__ /__ /____"}
        </Descriptions.Item>
        <Descriptions.Item label="Nơi sinh" span={3}>
        {record.homeTown !== null ? record.homeTown      :""}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Quốc tịch" span={3}>
        {record.nationality !== null ? record.nationality      :""}
        </Descriptions.Item>
        <Descriptions.Item label="Dân tộc" span={3}>
        {record.ethnic !== null ? record.ethnic      :""}
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Tôn giáo" span={3}>
        {record.ethnic !== null ? record.ethnic      :""}
        </Descriptions.Item>
        <Descriptions.Item label="Nguyên quán" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Hộ khẩu thường trú" span={3}>
          Nguyên Giáp Tứ Kỳ Hải Dương
        </Descriptions.Item>
         
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Khu vực tuyển sinh" span={3}>
          Việt Nam
        </Descriptions.Item>
        <Descriptions.Item label="Đối tượng" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Đạo Đức" span={3}>
          Việt Nam
        </Descriptions.Item>

        <Descriptions.Item label="Trình độ văn hoá" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Diện chính sách" span={3}>
          Việt Nam
        </Descriptions.Item>

        <Descriptions.Item label="Thành phần gia đình" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Ngày vào đoàn" span={3}>
          Việt Nam
        </Descriptions.Item>

        <Descriptions.Item label="Ngày vào đảng" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Số CMND" span={3}>
          Việt Nam
        </Descriptions.Item>

        <Descriptions.Item label="Ngày cấp" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Nơi cấp" span={3}>
          Việt Nam
        </Descriptions.Item>

        <Descriptions.Item label="Số tài khoản" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Số điện" span={3}>
          Việt Nam
        </Descriptions.Item>

        <Descriptions.Item label="Email" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>

      <Descriptions layout="horizontal" column={6}>
        <Descriptions.Item label="Địa chỉ liên lạc" span={3}>
          Việt Nam
        </Descriptions.Item>

        <Descriptions.Item label="Ghi chú" span={3}>
          Việt Nam
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default StudentProfile;
