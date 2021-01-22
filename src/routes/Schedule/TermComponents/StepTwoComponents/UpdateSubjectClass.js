import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
  Slider,
  Switch,
  Statistic,
  Radio,
  AutoComplete,
} from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
} from "@ant-design/icons";
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

const UpdateSubjectClass = (props) => {
  const [form] = Form.useForm();

  const [totalNumberOfSeats, setTotalNumberOfSeats] = useState(0);

  const [techerList, setTeacherList] = useState([]);

  const getTeacherList = () => {
    api
      .get("/teachers")
      .then((res) => {
        let options = res.map((item, index) => {
          return {
            key: index,
            value: item.employeeId,
            label: item.employeeId + " - " + item.fullName,
          };
        });
        setTeacherList(options);
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

  const options = [
    {
      value: "Burns Bay Road",
    },
    {
      value: "Downing Street",
    },
    {
      value: "Wall Street",
    },
  ];

  useEffect(() => {
    console.log(props.recordUpdate);
    getTeacherList();
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
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      centered
      closable={false}
      width={"40%"}
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
          hasFeedback
          rules={[{ required: true, message: "Vui lòng điền số nhóm!" }]}
        >
          <AutoComplete
            style={{
              width: 200,
            }}
            options={techerList}
            placeholder="Nhập mã giảng viên hoặc tên giảng viên"
            filterOption={(inputValue, option) =>
              option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
              -1
            }
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateSubjectClass;
