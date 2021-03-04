import React, { useState, useEffect } from "react";
import { Modal, Form, Row, Col, Select, Input, DatePicker, Divider, Upload, message } from "antd";
import { NotificationManager } from "react-notifications";
import { RollbackOutlined, CheckOutlined, InboxOutlined } from "@ant-design/icons";
import { api } from "Api";
import EducationLevelDynamicFields from "./TeacherCreateComponents/EducationLevelDynamicFields";
import WorkerTimeLineDynamicFields from "./TeacherCreateComponents/WorkTimelineDynamicFields";
import moment from "moment";

import { data } from "./data";

const { Option } = Select;

const { Dragger } = Upload;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

export const TeacherCreate = (props) => {
  const [form] = Form.useForm();

  const [record, setRecord] = useState(null);

  const [loading, setLoading] = useState(true);

  const getTeacherDetail = (teacherId) => {
    api
      .get(`/employee/${teacherId} `)
      .then((res) => {
        console.log(res);
        console.log(moment(res.dateBirth).toDate());
        res.dateBirth = moment(res.dateBirth);
        let newSubjectList = [];
        for (var i = 0; i < res.subjectList.length; i++) {
          newSubjectList.push(res.subjectList[i].subjectId);
        }
        res.subjectList = [...newSubjectList];
        setRecord(res); 
        form.resetFields();
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.visible) {
      getTeacherDetail(props.visible);
    }
  }, [props.visible]);
  return (
    <Modal
      title="Cập Nhật Thông Tin Giảng Viên"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            props.handleSubmitForm({...values});
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        form.resetFields();
        props.setShowModalUpdate(false);
      }}
      okButtonProps={{ icon: <CheckOutlined />, disabled: false, style: { width: "108px" } }}
      cancelButtonProps={{ icon: <RollbackOutlined />, disabled: false, style: { width: "108px" } }}
      maskClosable={false}
      okText="Cập Nhật"
      cancelText="Đóng"
      centered
      closable={false}
      width={"70%"}
      forceRender
    >
      {!loading ? (
        <Form
          form={form}
          {...formItemLayout}
          initialValues={record}
          preserve={false}
          onValuesChange={(changedValues, allValues) => {}}
        >
          <Row gutter={[16, 24]}>
            <Col span={12}>
              <Divider>Thông tin cá nhân</Divider>
              <Form.Item
                name="employeeId"
                label="Mã Giảng Viên"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!!!" }]}
              >
                <Input disabled placeholder="Họ và tên giảng viên..." allowClear />
              </Form.Item>
              <Form.Item
                name="fullName"
                label="Họ Và Tên"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng nhập tên giảng viên!!!" }]}
              >
                <Input placeholder="Họ và tên giảng viên..." allowClear />
              </Form.Item>
              <Form.Item
                name="sex"
                label="Giới Tính"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng chọn giới tính!!!" }]}
              >
                <Select allowClear style={{ width: "100%" }} placeholder="Giới tính...">
                  <Option value={0}>Nam</Option>
                  <Option value={1}>Nữ</Option>
                </Select>
              </Form.Item>
              <Form.Item
                name="dateBirth"
                label="Ngày Sinh"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh!!!" }]}
              >
                <DatePicker
                  format={"YYYY/MM/DD"}
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Ngày sinh..."
                ></DatePicker>
              </Form.Item>
              <Form.Item
                name="ethnic"
                label="Dân Tộc"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng chọn dân tộc!!!" }]}
              >
                <Select allowClear showSearch style={{ width: "100%" }} placeholder="Dân tộc...">
                  {props.ethnicList.map((item, index) => {
                    return (
                      <Option key={index + `ethnicOpts`} value={item.label}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="identityNumber"
                label="CMND/Căn Cước"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng nhập CMND/Căn cước!!!" }]}
              >
                <Input placeholder="Số CMND/Căn cước..." />
              </Form.Item>
              <Form.Item
                name="homeTown"
                label="Quê Quán"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng nhập quê quán!!!" }]}
              >
                <Select allowClear showSearch style={{ width: "100%" }} placeholder="Quê quán...">
                  {props.provinceList.map((item, index) => {
                    return (
                      <Option key={index + `provinceOpts`} value={item.label}>
                        {item.label}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="contactAddress"
                label="Địa Chỉ Thường Trú"
                hasFeedback
                rules={[{ required: false, message: "Vui lòng nhập địa chỉ thường trú!!!" }]}
              >
                <Input placeholder="Địa chỉ thường trú..." />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="Số Điện Thoại"
                hasFeedback
                rules={[{ required: false, message: "Vui lòng nhập số điện thoại!!!" }]}
              >
                <Input placeholder="Số điện thoại..." />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                hasFeedback
                rules={[{ required: false, message: "Vui lòng nhập số điện thoại!!!" }]}
              >
                <Input placeholder="Số điện thoại..." />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Divider>Trình độ học vấn</Divider>
              <EducationLevelDynamicFields />
              <Divider>Quá trình công tác</Divider>
              <WorkerTimeLineDynamicFields />
              <Divider>Giảng dạy</Divider>
              <Form.Item
                name="departmentId"
                label="Khoa Giảng Dạy "
                hasFeedback
                rules={[{ required: true, message: "Vui lòng chọn khoa!!!" }]}
              >
                <Select style={{ width: "100%" }} placeholder="Khoa..." allowClear showSearch>
                  {props.departmentList.map((item, index) => {
                    return (
                      <Option key={index + "depOpts" + item.departmentId} value={item.departmentId}>
                        {item.departmentName}{" "}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="subjectList"
                label="H.Phần Phụ Trách"
                hasFeedback
                rules={[{ required: true, message: "Vui lòng chọn khoa!!!" }]}
              >
                <Select mode="multiple" allowClear style={{ width: "100%" }} placeholder="Môn phụ trách ..." showSearch>
                  {props.subjectList.map((item, index) => {
                    return (
                      <Option key={index + "subjectOpts" + item.subjectId} value={item.subjectId}>
                        {item.subjectId + " - " + item.subjectName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Dragger {...propss}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Kéo file ảnh cá nhân</p>
          </Dragger>
        </Form>
      ) : (
        ""
      )}
    </Modal>
  );
};

const propss = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default TeacherCreate;
