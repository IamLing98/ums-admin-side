import React, { useState, useEffect } from "react";
import { Result, Button, Modal, Tag, Table, Input, Form, Select } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { setTermDetail } from "../../../../actions/TermActions";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import {
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";

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
  initialValues: {
    term: undefined,
  },
};

const StepOne = (props) => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const [showOpenSubjectSubmitModal, setShowOpenSubjectSubmitModal] = useState(
    false
  );

  const termReducer = useSelector((state) => state.termReducer);

  const recordDetail = { ...termReducer.recordDetail };

  const onOpenSubjectSubmit = () => {
    const recordDetail = { ...termReducer.recordDetail };
    recordDetail.progress = 12;
    api
      .put("/terms", recordDetail, true)
      .then((res) => {
        console.log(res);
        NotificationManager.success(
          "Mở đăng ký học phần thành công thành công"
        );
        setShowOpenSubjectSubmitModal(false);
        dispatch(setTermDetail(recordDetail));
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

  if (recordDetail.progress === 11) {
    return (
      <div>
        <Result
          icon={<SmileOutlined />}
          title="Bắt đầu học kỳ mới bằng việc mở đăng ký học phần!"
          extra={
            <Button
              type="primary"
              onClick={() => setShowOpenSubjectSubmitModal(true)}
            >
              Mở DKHP
            </Button>
          }
        />
        <Modal
          title="Mở Đăng Ký Học Phần"
          visible={showOpenSubjectSubmitModal}
          onOk={() => onOpenSubjectSubmit()}
          onCancel={() => setShowOpenSubjectSubmitModal(false)}
          centered
        >
          <Form
            form={form}
            {...formItemLayout}
            onFieldsChange={(changedFields, allFields) => {}}
            preserve={false}
            onValuesChange={(changedValues, allValues) => {}}
          >
            <Form.Item
              name="term"
              label="Kỳ"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Chọn học kỳ"
              >
                <Option value={1}>Học kỳ 1</Option>
                <Option value={2}>Học kỳ 2</Option>
                <Option value={3}>Học kỳ hè</Option>
              </Select>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  } else if (recordDetail.progress === 12) {
    return (
      <>
        <hr />
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
          dataSource={recordDetail.subjectRegistrationList}
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
