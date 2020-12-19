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
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [subjectSubmitFormVisible, setSubjectSubmitFormVisible] = useState(
    false
  );

  const termReducer = useSelector((state) => state.termReducer);

  const term = { ...termReducer.recordDetail };

  const onOpenSubjectSubmit = (values) => {
    let progress11Date = values["rangeTime"][0].format('YYYY-MM-DD') ;
    let progress13Date = values["rangeTime"][0].format('YYYY-MM-DD') ;
    let termObj = {...term};
    termObj.progress = 12;
    termObj.progress11Date = progress11Date;
    termObj.progress13Date = progress13Date;
    api
      .put("/terms", termObj, true)
      .then((res) => {
        console.log(res);
        NotificationManager.success(
          "Mở đăng ký học phần thành công thành công"
        );
        setSubjectSubmitFormVisible(false);
        dispatch(setTermDetail(termObj));
      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error(
          "Mở đăng ký học phần không thành công thành công"
        );
      });
  };

  const columns = [
    {
      title: "Mã học phần",
      dataIndex: "id",
    },
    {
      title: "Tên học phần",
      dataIndex: "year",
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
      title: "Thao tác",
      dataIndex: "status",
      render: (status) => {
        let color;
        let text = "";
        if (status === 2) {
          color = "geekblue";
          text = "Đang Diễn Ra";
        } else if (status === 1) {
          color = "volcano";
          text = "Kết thúc";
        } else if (status === 3) {
          color = "green";
          text = "Sắp Diễn Ra";
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      },
    },
  ];
 

  if (term.progress === 11) {
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
  } else if (term.progress === 12) {
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
              <button
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
              </button>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={term.subjectRegistrationList}
          rowKey="id"
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
