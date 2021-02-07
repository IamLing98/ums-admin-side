import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  Form,
  Select,
  Slider,
  Statistic,
  Radio,
  Button,
} from "antd";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  RollbackOutlined,
  CheckOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";

const { Options } = Select;

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

const minOfType = (type) => {
  if (type === 1) return 20;
  else if (type === 2) return 20;
  else if (type === 3) return 15;
  else return 20;
};
const maxOfType = (type) => {
  if (type === 1) return 90;
  else if (type === 2) return 30;
  else if (type === 3) return 30;
  else return 90;
};

const SubjectClassCreate = (props) => {
  const [form] = Form.useForm();

  const [numberOfSeats, setNumberOfSeats] = useState(
    props.subject.subjectType === 3 ? 45 : 30
  );

  const [subjectClassList, setSubjectClassList] = useState([]);

  const [teacherList, setTeacherList] = useState([]);

  const [subject, setSubject] = useState(undefined);

  const [subForm] = Form.useForm();

  const showErrNoti = (err) => {
    NotificationManager.err(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err(
        "Did you forget something? Please activate your account"
      );
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };
  const handleSubmitForm = (values) => {
    console.log(values);
    subForm.validateFields();
    if (props.subject.eachSubject <= 3) {
      let newSubjectClassList = [...subjectClassList];
      for (var i = 0; i < subjectClassList.length; i++) {
        newSubjectClassList[i].duration = props.subject.eachSubject;
        newSubjectClassList[i].type = 1;
      }
      setSubjectClassList([...newSubjectClassList]);
    } else if (props.subject.eachSubject > 3 && props.subject.eachSubject < 6) {
      let newSubjectClassList = [...subjectClassList];
      for (var i = 0; i < subjectClassList.length; i++) {
        newSubjectClassList[i].duration = 2;
        let newSubjectClass = {
          ...newSubjectClassList[i],
        };
        newSubjectClass.duration = props.subject.eachSubject % 2;
        newSubjectClass.mainSubjectClassId =
          props.term.id + props.subject.subjectId + i;
        newSubjectClass.type = 2;
        newSubjectClassList.push(newSubjectClass);
      }
      setSubjectClassList([...newSubjectClassList]);
    } else if (props.subject.eachSubject >= 6) {
      let newSubjectClassList = [...subjectClassList];
      for (var i = 0; i < subjectClassList.length; i++) {
        newSubjectClassList[i].duration = 3;
        let newSubjectClass = {
          ...newSubjectClassList[i],
        };
        newSubjectClass.duration = props.subject.eachSubject % 3;
        newSubjectClass.mainSubjectClassId =
          props.term.id + props.subject.subjectId + i;
        newSubjectClass.type = 2;
        newSubjectClassList.push(newSubjectClass);
      }
      setSubjectClassList([...newSubjectClassList]);
    }

    let subjectClassArr = [];
    for (var i = 0; i < subjectClassList.length; i++) {
      let subjectClass = { ...subjectClassList[i] };
      subjectClass.subjectClassId = props.term.id + props.subject.subjectId + i;
      subjectClass.subjectId = props.subject.subjectId;
      subjectClass.termId = props.term.id;
      subjectClass.numberOfSeats = values.numberOfSeats;
      subjectClass.isRequireLab = values.isRequireLab;
      subjectClassArr.push(subjectClass);
    }
    console.log("arr: ", subjectClassArr);
    api
      .post("/subjectClasses", subjectClassArr, true)
      .then((res) => {
        NotificationManager.success("Tạo mới lớp học phần thành công.");
        props.getSubmittingInfo(props.term.id);
      })
      .catch((error) => {
        showErrNoti(error);
      });
    props.setVisible(false);
  };

  const getTeacherList = () => {
    api
      .get("/teachers")
      .then((res) => {
        setTeacherList(res);
      })
      .catch((err) => showErrNoti(err));
  };

  const getSubjectList = () => {
    api
      .get("/subjects?actionType=SCS", true)
      .then((res) => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].subjectId === props.subject.subjectId) {
            setSubject(res[i]);
          }
        }
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  useEffect(() => {
    getTeacherList();
    getSubjectList();
    console.log(props.subject);
  }, []);

  return (
    <Modal
      title="Tạo mới lớp học phần"
      visible={props.visible}
      onOk={() => {
        let values = form.getFieldsValue();
        form.resetFields();
        console.log(values);
        handleSubmitForm(values);
      }}
      onCancel={() => {
        props.setVisible(false);
      }}
      okButtonProps={{
        icon: <CheckOutlined />,
        disabled: subjectClassList.length > 0 ? false : true,
        style: { width: "135px" },
      }}
      cancelButtonProps={{
        icon: <RollbackOutlined />,
        disabled: false,
        style: { width: "135px" },
      }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      destroyOnClose={true}
      centered
      closable={false}
      width={"50%"}
    >
      <Form
        form={form}
        {...formItemLayout}
        initialValues={{
          subjectId:
            props.subject.subjectId + " - " + props.subject.subjectName,
          numberOfSeats: props.subject.subjectType === 3 ? 45 : 30,
          isRequireLab: props.subject.subjectType === 3 ? 1 : 0,
        }}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
      >
        <Form.Item name="subjectId" label="Học phần">
          <Input disabled />
        </Form.Item>
        <Form.Item
          name="numberOfSeats"
          label="Sĩ số"
          // hasFeedback
          rules={[{ required: true, message: "Vui lòng chọn sĩ số!" }]}
        >
          <Slider
            min={minOfType(props.subject.subjectType)}
            max={maxOfType(props.subject.subjectType)}
            onChange={(value) => {
              form.setFieldsValue({
                ...form.getFieldsValue(),
                numberOfSeats: value,
              });
              console.log(value);
              setNumberOfSeats(value);
            }}
          />
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
      </Form>
      <Row gutter={16} style={{ marginBottom: "24px" }}>
        <Col span={24} style={{ textAlign: "center" }}>
          <Button
            type="primary"
            onClick={() => {
              let newSubjectClassList = [...subjectClassList];
              newSubjectClassList.push({
                groupId: undefined,
                teacherId: undefined,
              });
              setSubjectClassList(newSubjectClassList);
            }}
            disabled={props.subject ? false : true}
            style={{ width: "135px" }}
          >
            <PlusSquareOutlined />
            Thêm lớp
          </Button>
        </Col>
      </Row>

      <Form {...formItemLayout} form={subForm}>
        {subjectClassList.map((item, index) => {
          return (
            <Row>
              <Col md={5} sm={5}>
                <Form.Item
                  label="Nhóm"
                  name={"groupId" + index}
                  rules={[{ required: true, message: "Vui lòng chọn nhóm!" }]}
                  key={"formItem1" + index}
                >
                  <Select
                    value={subjectClassList[index].groupId}
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Nhóm..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => {
                      let newSubjectClassList = [...subjectClassList];
                      newSubjectClassList[index].groupId = value;
                      setSubjectClassList(newSubjectClassList);
                    }}
                  >
                    {subject
                      ? subject.groupList.map((item, i) => (
                          <Select.Option
                            key={"subjectGroup" + index + i}
                            value={item.groupId}
                          >
                            {item.educationProgramName +
                              " - Nhóm " +
                              item.groupId}
                          </Select.Option>
                        ))
                      : ""}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={5} sm={5}>
                <Form.Item
                  label="Giảng viên"
                  name={"teacherId" + index}
                  key={"formItem2" + index}
                  rules={[
                    { required: true, message: "Vui lòng chọn giảng viên!" },
                  ]}
                >
                  <Select
                    value={subjectClassList[index].teacherId}
                    showSearch
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Giảng viên..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    filterSort={(optionA, optionB) =>
                      optionA.children
                        .toLowerCase()
                        .localeCompare(optionB.children.toLowerCase())
                    }
                    onChange={(value) => {
                      let newSubjectClassList = [...subjectClassList];
                      newSubjectClassList[index].teacherId = value;
                      setSubjectClassList(newSubjectClassList);
                    }}
                  >
                    {teacherList.map((item, i) => (
                      <Select.Option
                        key={"TeacherSubjectClassCreateOpts" + index + i}
                        value={item.employeeId}
                      >
                        {item.employeeId + " - " + item.fullName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={2} sm={2}>
                <Button
                  key={"btnDelete" + index}
                  type="primary"
                  style={{ background: "#FF0000", width: "135px" }}
                  onClick={() => {
                    let newSubjectClassList = [...subjectClassList];
                    newSubjectClassList.splice(index, 1);
                    setSubjectClassList(newSubjectClassList);
                  }}
                >
                  <MinusSquareOutlined />
                  Xoá
                </Button>
              </Col>
            </Row>
          );
        })}
      </Form>
      <Row gutter={16}>
        <Col span={12} style={{ textAlign: "center" }}>
          <Statistic
            title="Số lượng dự đoán"
            value={props.subject.predictSubmit}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <Statistic
            title="Số lượng đăng ký"
            value={props.subject.totalSubmit}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
        <Col span={12} style={{ textAlign: "center" }}>
          <Statistic
            title="Số lượng theo lớp học phần"
            value={subjectClassList.length * numberOfSeats}
            formatter={(values) => <span>{values + " sinh viên"}</span>}
          />
        </Col>
      </Row>
    </Modal>
  );
};

export default SubjectClassCreate;
