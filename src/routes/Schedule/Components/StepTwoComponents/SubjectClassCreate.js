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

  const [totalNumberOfSeats, setTotalNumberOfSeats] = useState(0);

  const [subjectList, setSubjectList] = useState([]);

  const [teacherList, setTeacherList] = useState([]);

  const [subject, setSubject] = useState(undefined);

  const [subjectClassList, setSubjectClassList] = useState([]);

  const getTeacherList = () => {
    api
      .get("/teachers")
      .then((res) => {
        setTeacherList(res);
      })
      .catch((err) => showErrNoti(err));
  };
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
    if (subject.eachSubject <= 3) {
      let newSubjectClassList = [...subjectClassList];
      for (var i = 0; i < subjectClassList.length; i++) {
        newSubjectClassList[i].duration = subject.eachSubject;
        newSubjectClassList[i].type = 1;
      }
      setSubjectClassList([...newSubjectClassList]);
    } else if (subject.eachSubject > 3 && subject.eachSubject < 6) {
      let newSubjectClassList = [...subjectClassList];
      for (var i = 0; i < subjectClassList.length; i++) {
        newSubjectClassList[i].duration = 2;
        let newSubjectClass = {
          ...subjectClassList[i],
          duration: subject.eachSubject % 2,
          type: 2,
          mainSubjectClassId: props.term.id + subject.subjectId + i + i,
        };
        newSubjectClassList.push(newSubjectClass);
      }
      setSubjectClassList([...newSubjectClassList]);
    } else if (subject.eachSubject >= 6) {
      let newSubjectClassList = [...subjectClassList];
      for (var i = 0; i < subjectClassList.length; i++) {
        newSubjectClassList[i].duration = 3;
        let newSubjectClass = {
          ...newSubjectClassList[i],
          duration: subject.eachSubject % 3,
          type: 2,
          mainSubjectClassId: props.term.id + subject.subjectId + i + i,
        };
        newSubjectClassList.push(newSubjectClass);
      }
      setSubjectClassList([...newSubjectClassList]);
    }

    let subjectClassArr = [];
    for (var i = 0; i < subjectClassList.length; i++) {
      let subjectClass = { ...subjectClassList[i] };
      subjectClass.subjectClassId = props.term.id + subject.subjectId + i;
      subjectClass.subjectId = subject.subjectId;
      subjectClass.termId = props.term.id;
      subjectClass.numberOfSeats = values.numberOfSeats;
      subjectClass.isRequireLab = values.isRequireLab; 
      subjectClassArr.push(subjectClass);
    }

    console.log(subjectClassArr);
    api
      .post("/subjectClasses", subjectClassArr, true)
      .then((res) => {
        NotificationManager.success("Tạo mới lớp học phần thành công.");
        props.getSubjectClassList();
      })
      .catch((error) => {
        showErrNoti(error);
      });
    props.setVisible(false);
  };

  const getSubjectList = () => {
    api
      .get("/subjects?actionType=SCS", true)
      .then((res) => {
        setSubjectList(res);
      })
      .catch((err) => {
        showErrNoti(err);
      });
  };

  useEffect(() => {
    getSubjectList();
    getTeacherList();
    form.resetFields();
  }, [props.visible]);
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
        disabled: subjectClassList
          ? subjectClassList.length > 0
            ? false
            : true
          : true,
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
      forceRender
    >
      <Form
        form={form}
        {...formItemLayout}
        initialValues={{
          subjectId: undefined,
          numberOfSeats: undefined,
          isRequireLab: 0,
        }}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {
          setTotalNumberOfSeats(
            form.getFieldValue("numberOfSeats") *
              form.getFieldValue("numberOfGroup")
          );
        }}
      >
        <Form.Item
          name="subjectId"
          label="Học phần"
          rules={[{ required: true, message: "Vui lòng chọn học phần!!!" }]}
        >
          <Select
            showSearch
            allowClear
            style={{ width: "100%" }}
            placeholder="Học phần..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            onChange={(value) => {
              if (value === undefined || value === null) {
                setSubject(undefined);
              } else {
                form.setFieldsValue({
                  ...form.getFieldsValue,
                  subjectId: value,
                });
                for (var i = 0; i < subjectList.length; i++) {
                  if (subjectList[i].subjectId === value) {
                    setSubject({ ...subjectList[i] });
                  }
                }
                setSubjectClassList([]);
              }
            }}
          >
            {subjectList.map((item, index) => (
              <Option
                key={"SubjectClassCreateOpts" + index}
                value={item.subjectId}
              >
                {item.subjectId + " - " + item.subjectName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="numberOfSeats"
          label="Sĩ số"
          rules={[{ required: true, message: "Vui lòng chọn sĩ số!" }]}
        >
          <Slider
            min={subject ? minOfType(subject.subjectType) : 15}
            max={subject ? maxOfType(subject.subjectType) : 90}
          />
        </Form.Item>
        <Form.Item
          name="isRequireLab"
          label="Yêu cầu phòng máy"
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
              newSubjectClassList.push({});
              setSubjectClassList(newSubjectClassList);
            }}
            disabled={subject ? false : true}
            style={{ width: "135px" }}
          >
            <PlusSquareOutlined />
            Thêm lớp
          </Button>
        </Col>
      </Row>
      {subjectClassList.map((item, index) => {
        return (
          <Form {...formItemLayout}>
            <Row>
              <Col md={5} sm={5}>
                <Form.Item
                  name="groupId"
                  label="Nhóm"
                  rules={[{ required: true, message: "Vui lòng chọn nhóm!" }]}
                >
                  <Select
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
                      ? subject.groupList.map((item, index) => (
                          <Option
                            key={"subjectGroup" + index}
                            value={item.groupId}
                          >
                            {item.educationProgramName +
                              " - Nhóm " +
                              item.groupId}
                          </Option>
                        ))
                      : ""}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={5} sm={5}>
                <Form.Item
                  name="employeeId"
                  label="Giảng viên"
                  rules={[
                    { required: true, message: "Vui lòng chọn giảng viên!" },
                  ]}
                >
                  <Select
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
                    {teacherList.map((item, index) => (
                      <Option
                        key={"TeacherSubjectClassCreateOpts" + index}
                        value={item.employeeId}
                      >
                        {item.employeeId + " - " + item.fullName}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col md={2} sm={2}>
                <Button
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
          </Form>
        );
      })}
    </Modal>
  );
};

export default SubjectClassCreate;
