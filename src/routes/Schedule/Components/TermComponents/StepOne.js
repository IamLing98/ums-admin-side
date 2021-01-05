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
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { setTermDetail } from "../../../../actions/TermActions";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Vui lòng chọn các mốc thời gian!",
    },
  ],
};

const StepOne = (props) => { 

  const [form] = Form.useForm();

  const [subjectSubmitFormVisible, setSubjectSubmitFormVisible] = useState(
    false
  );
 
  const onOpenSubjectSubmit = (values) => {
    let subjectSubmittingStartDate = values["rangeTime"][0].format("YYYY-MM-DD");
    let subjectSubmittingEndDate = values["rangeTime"][1].format("YYYY-MM-DD");
    let termObj = { ...props.term };
    termObj.progress = 12;
    termObj.subjectSubmittingStartDate = subjectSubmittingStartDate;
    termObj.subjectSubmittingEndDate = subjectSubmittingEndDate;
    termObj.actionType = "SSON";
    api
      .put(`/terms/${termObj.id}`, termObj, true)
      .then((res) => {
        NotificationManager.success(
          "Mở đăng ký học phần thành công thành công"
        );
        setSubjectSubmitFormVisible(false);
        dispatch(setTermDetail(termObj)); 
      })
      .catch((error) => {
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

  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "subjectId",
    },
    {
      title: "Tên học phần",
      dataIndex: "subjectName",
    },
    {
      title: "Khoa phụ trách",
      dataIndex: "term",
      width: "20%",
    },
    {
      title: "Chương trình đào tạo",
      dataIndex: "term",
      width: "20%",
    },
    {
      title: "Số lượng đăng ký",
      dataIndex: "totalSubmit",
      width: "20%",
    }, 
  ];

  if (props.term.progress === 11) {
    return (
      <div>
        <Result
          icon={<SmileOutlined />}
          title="Bắt đầu học kỳ mới bằng việc mở đăng ký học phần!"
          extra={
            <Button
              type="primary"
              onClick={() => setSubjectSubmitFormVisible(true)}
            >
              Mở DKHP
            </Button>
          }
        />
        <Modal
          title="Mở Đăng Ký Học Phần"
          visible={subjectSubmitFormVisible}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                onOpenSubjectSubmit(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
          onCancel={() => setSubjectSubmitFormVisible(false)}
          maskClosable={false}
          okText="Mở đăng ký"
          cancelText="Đóng"
          destroyOnClose={true}
          closable={false}
          centered
        >
          <Form
            form={form}
            onFieldsChange={(changedFields, allFields) => {}}
            preserve={false}
            onValuesChange={(changedValues, allValues) => {}}
          >
            <Form.Item name="rangeTime" label="Thời gian" {...rangeConfig}>
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  } else if (props.term.progress === 12) {
    return (
      <>
        <Row>
          <Col
            md={6}
            sm={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Row>
              <Col md={4}>
                <Input placeholder="Năm học..." size="middle" />
              </Col>
              <Col md={4}>
                <Input placeholder="Học kỳ..." size="middle" />
              </Col>
              <Col md={4} style={{ display: "block", flexDirection: "column" }}>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary"
                  //onClick={() => setShowModalCreate(true)}
                >
                  <SearchOutlined />
                  <span>Tìm Kiếm</span>
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className="tableListOperator"
              style={{ textAlign: "right", width: "100%" }}
            >
              {/* <button
                type="button"
                className="ant-btn ant-btn-primary"
                // onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Mở nhiều lớp </span>
              </button>
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                // onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Đăng ký khoá mới </span>
              </button> */}
              <Button type="primary" danger>
                <CloseCircleOutlined />
                <span>Kết thúc đăng ký</span>
              </Button>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={props.submittingInfo}
          rowKey="subjectId"
          bordered
          pagination={{ pageSize: 10 }}
          size="small"
          locale={{
            emptyText: (
              <div className="ant-empty ant-empty-normal">
                <div className="ant-empty-image">
                  <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                  <p className="ant-empty-description">
                    Không có dữ liệu đăng ký học phần
                  </p>
                </div>
              </div>
            ),
          }}
        />
      </>
    );
  } else return <></>;
};

export default StepOne;
