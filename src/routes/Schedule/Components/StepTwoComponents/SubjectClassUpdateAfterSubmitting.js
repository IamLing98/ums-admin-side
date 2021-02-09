import React, { useState, useEffect } from "react";
import { Modal, Form, Select, Slider, Radio } from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import { RollbackOutlined, CheckOutlined } from "@ant-design/icons";
import { Row, Col } from "reactstrap";

const { Option } = Select;

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

const SubjectClassUpdateAfterSubmitting = (props) => {
  const [form] = Form.useForm();

  const [totalNumberOfSeats, setTotalNumberOfSeats] = useState(0);

  const [teacherList, setTeacherList] = useState([]);

  const getTeacherList = () => {
    api
      .get("/teachers")
      .then((res) => { 
        setTeacherList(res);
      })
      .catch((err) => console.log(res));
  };

  const handleSubmitForm = (values) => {
    let subjectClass = { ...props.recordUpdate };
    subjectClass.teacherId = values.employeeId;
    subjectClass.isRequireLab = values.isRequireLab;
    subjectClass.numberOfSeats = values.numberOfSeats;
    api
      .put(
        `/subjectClasses/${props.recordUpdate.subjectClassId}`,
        subjectClass,
        true
      )
      .then((res) => {
        NotificationManager.success("Cập nhật lớp học phần thành công.");
        props.getSubjectClassList();
        props.onCancel();
      })
      .catch((error) => {
        console.log(error.response);
        props.onCancel();
        NotificationManager.error(error.response.data.message);
        if (error.response.status === 403) {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.response.status === "Lỗi xác thực") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  useEffect(() => {
    console.log(props.recordUpdate);
    getTeacherList();
    form.resetFields();
  }, []);

  return (
    <Modal
      title="Cập nhật thông tin lớp học phần"
      visible={props.visible}
      onOk={() => {
        let values = form.getFieldsValue();
        form.resetFields();
        handleSubmitForm(values);
      }}
      onCancel={() => props.onCancel()}
      okButtonProps={{
        icon: <CheckOutlined />,
        disabled: false,
        style: { width: "108px" },
      }}
      cancelButtonProps={{
        icon: <RollbackOutlined />,
        disabled: false,
        style: { width: "108px" },
      }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      centered
      closable={false}
      width={"40%"}
      forceRender
    >
      <Form
        form={form}
        {...formItemLayout}
        initialValues={{ ...props.recordUpdate }}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {
          if (allValues.numberOfSeats && allValues.numberOfGroup) {
            setTotalNumberOfSeats(
              allValues.numberOfSeats * allValues.numberOfGroup
            );
          }
        }}
      >
        <Form.Item
          name="numberOfSeats"
          label="Sĩ số"
          // hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn sĩ số!" }]}
        >
          <Slider min={15} max={90} />
        </Form.Item>
        <Form.Item
          name="isRequireLab"
          label="Yêu cầu phòng máy"
          // hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn !" }]}
        >
          <Radio.Group>
            <Radio value={1}>Có</Radio>
            <Radio value={0}>Không</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="employeeId"
          label="Giảng viên"
          rules={[{ required: true, message: "Vui lòng chọn giảng viên!" }]}
        >
          <Select
            showSearch
            allowClear
            style={{ width: "100%" }}
            placeholder="Giảng viên..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
          >
            {teacherList.map((item, index) => (
              <Option
                key={"TeacherSubjectClassUpdateOpts" + index}
                value={item.employeeId}
              >
                {item.employeeId + " - " + item.fullName}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SubjectClassUpdateAfterSubmitting;
