import { Descriptions, Tabs } from "antd";
import React, { useEffect } from "react";
const StudentProfile = (props) => {
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

  if(props.record ){
    return (
      <div className="student-description-wrapper">
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Họ và tên" span={3}>
            {props.record.fullName}
          </Descriptions.Item>
          <Descriptions.Item label="Giới tính" span={3}>
            {props.record.sex !== null ? (props.record.sex === 1 ? "Nam" : "Nữ") : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Ngày sinh" span={3}>
            {props.record.dateBirth !== null ? props.record.dateBirth : "__ /__ /____"}
          </Descriptions.Item>
          <Descriptions.Item label="Nơi sinh" span={3}>
            {props.record.bornPlace !== null ? props.record.bornPlace : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Quốc tịch" span={3}>
            {props.record.nationalityName !== null ? props.record.nationalityName : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Dân tộc" span={3}>
            {props.record.ethnicName !== null ? props.record.ethnicName : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Tôn giáo" span={3}>
            {props.record.religion !== null ? props.record.religion : ""}
          </Descriptions.Item>
          <Descriptions.Item label="Nguyên quán" span={3}>
            {props.record.homeTown !== null ? props.record.homeTown : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Hộ khẩu thường trú" span={3}>
            {props.record.permanentResidence !== null ? props.record.permanentResidence : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Khu vực tuyển sinh" span={3}>
            {enrollmentAreaDisplay(props.record.enrollmentArea)}
          </Descriptions.Item>
          <Descriptions.Item label="Đối tượng" span={3}>
            {/* {props.record.homeTown !== null ? props.record.homeTown : ""} */}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Đạo Đức" span={3}>
            {/* Việt Nam */}
          </Descriptions.Item>
  
          <Descriptions.Item label="Trình độ văn hoá" span={3}>
            {props.record.educationLevel !== null ? props.record.educationLevel : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Diện chính sách" span={3}>
            {props.record.incentivesType !== null ? props.record.incentivesType : ""}
          </Descriptions.Item>
  
          <Descriptions.Item label="Thành phần gia đình" span={3}>
            {props.record.familyElement !== null ? props.record.familyElement : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Ngày vào đoàn" span={3}>
            {props.record.CYUStartDate !== null ? props.record.CYUStartDate : ""}
          </Descriptions.Item>
  
          <Descriptions.Item label="Ngày vào đảng" span={3}>
            {props.record.CPStartDate !== null ? props.record.CPStartDate : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Số CMND" span={3}>
            {props.record.identityNumber !== null ? props.record.identityNumber : ""}
          </Descriptions.Item>
  
          <Descriptions.Item label="Ngày cấp" span={3}>
            {props.record.identityCreatedDate !== null
              ? props.record.identityCreatedDate
              : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Nơi cấp" span={3}>
            {props.record.identityCreatedPlace !== null
              ? props.record.identityCreatedPlace
              : ""}
          </Descriptions.Item>
  
          <Descriptions.Item label="Số tài khoản" span={3}>
            {props.record.bankNumber !== null ? props.record.bankNumber : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Số điện thoại" span={3}>
            {props.record.phoneNumber !== null ? props.record.phoneNumber : ""}
          </Descriptions.Item>
  
          <Descriptions.Item label="Email" span={3}>
            {props.record.email !== null ? props.record.email : ""}
          </Descriptions.Item>
        </Descriptions>
  
        <Descriptions layout="horizontal" column={6}>
          <Descriptions.Item label="Địa chỉ liên lạc" span={3}>
            {props.record.contactAddress !== null ? props.record.contactAddress : ""}
          </Descriptions.Item>
  
          <Descriptions.Item label="Ghi chú" span={3}>
            {props.record.note !== null ? props.record.note : ""}
          </Descriptions.Item>
        </Descriptions>
      </div>
  );
  }
   else{
     return <div></div>
   }
};

export default StudentProfile;
