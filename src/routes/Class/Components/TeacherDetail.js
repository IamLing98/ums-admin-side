import React, { useEffect, useState } from "react";
import { Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Tabs } from "antd";
import { RollbackOutlined } from "@ant-design/icons"; 
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { Option } = Select;

const { TabPane } = Tabs;

const TeacherDetail = (props) => {
  const [loading, setLoading] = useState(true);

  const [studentDetail, setStudentDetail] = useState(null);

  const getStudentDetail = (studentId) => {
    api
      .get(`/students/${studentId}`)
      .then((res) => {
        setStudentDetail(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.record) {
      getStudentDetail(props.record.studentId);
    }
  }, [props.record]);

  return (
    <>
      <Drawer
        title="Thông tin giảng viên"
        width={700}
        closable={false}
        onClose={() => {
          props.setShowTeacherDetail(false);
        }}
        visible={props.visible} 
      >
        This is two-level drawer
      </Drawer>
    </>
  );
};

export default TeacherDetail;
