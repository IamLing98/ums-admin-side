import { Descriptions, Tabs } from "antd";
import React, { useEffect } from "react";
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
  useEffect(() => {}, [JSON.stringify(props.record)]);
  const { record } = props;
  console.log("record", record);

  const enrollmentAreaDisplay = (value) => {
    if (value === 1) {
      return <>Khu vực 1 (KV1)</>;
    } else if (value === 2) {
      return <>Khu vực 2 (KV2)</>;
    } else if (value === 3) {
      return <>Khu vực 2 nông thôn (KV2-NT)</>;
    } else if (value === 4) {
      return <>Khu vực 3</>;
    } else {
      return <></>;
    }
  };

  if (record === null) {
    return <div></div>;
  } else {
    return (
      <div className="student-description-wrapper">
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Họ và tên" span={3}>
            {record.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính" span={3}>
            {record.sex !== null ? (record.sex === 1 ? "Nam" : "Nữ") : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Ngày sinh" span={3}>
            {record.dateBirth !== null ? record.dateBirth : "__ /__ /____"}
          </Descriptions.Item>
          <Descriptions.Item label="Nơi sinh" span={3}>
            {record.bornPlace !== null ? record.bornPlace : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Quốc tịch" span={3}>
            {record.nationalityName !== null ? record.nationalityName : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Dân tộc" span={3}>
            {record.ethnicName !== null ? record.ethnicName : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Tôn giáo" span={3}>
            {record.religion !== null ? record.religion : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Nguyên quán" span={3}>
            {record.homeTown !== null ? record.homeTown : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Hộ khẩu thường trú" span={3}>
            {record.permanentResidence !== null
              ? record.permanentResidence
              : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Khu vực tuyển sinh" span={3}>
            {enrollmentAreaDisplay(record.enrollmentArea)}
          </Descriptions.Item>
          <Descriptions.Item label="Đối tượng" span={3}>
            {/* {record.homeTown !== null ? record.homeTown : ""} */}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Đạo Đức" span={3}>
            {/* Việt Nam */}
          </Descriptions.Item>

          <Descriptions.Item label="Trình độ văn hoá" span={3}>
            {record.educationLevel !== null
              ? record.educationLevel
              : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Diện chính sách" span={3}>
          {record.incentivesType !== null ? record.incentivesType : ""}
          </Descriptions.Item>

          <Descriptions.Item label="Thành phần gia đình" span={3}>
          {record.familyElement !== null ? record.familyElement : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Ngày vào đoàn" span={3}>
          {record.CYUStartDate !== null ? record.CYUStartDate : ""}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày vào đảng" span={3}>
          {record.CPStartDate !== null ? record.CPStartDate : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Số CMND" span={3}>
          {record.identityNumber !== null ? record.identityNumber : ""}
          </Descriptions.Item>

          <Descriptions.Item label="Ngày cấp" span={3}>
          {record.identityCreatedDate !== null ? record.identityCreatedDate : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Nơi cấp" span={3}>
          {record.identityCreatedPlace !== null ? record.identityCreatedPlace : ""}
          </Descriptions.Item>

          <Descriptions.Item label="Số tài khoản" span={3}>
          {record.bankNumber !== null ? record.bankNumber : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Số điện thoại" span={3}>
          {record.phoneNumber !== null ? record.phoneNumber : ""}
          </Descriptions.Item>

          <Descriptions.Item label="Email" span={3}>
          {record.email !== null ? record.email : ""}
          </Descriptions.Item>
        </Descriptions>

        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Địa chỉ liên lạc" span={3}>
          {record.contactAddress !== null ? record.contactAddress : ""}
          </Descriptions.Item>

          <Descriptions.Item label="Ghi chú" span={3}>
          {record.note !== null ? record.note : ""}
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
};

export default StudentProfile;
