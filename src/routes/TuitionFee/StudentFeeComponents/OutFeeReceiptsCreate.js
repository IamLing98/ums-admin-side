import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Divider } from "antd";
import { NotificationManager } from "react-notifications";
import { api } from "Api";
import { Row, Col } from "reactstrap";
import { RollbackOutlined, SaveOutlined } from "@ant-design/icons";
import FeeCategoryGroup from "../../../components/TuitionFeeComponens/FeeCategoryGroup";

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

export const OutFeeReceiptsCreate = (props) => {
  const [initialValues, setInitialValues] = useState({
    studentId: null,
    fullName: null,
    term: null,
    totalFee: 0,
  });

  function format(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
  }

  const [feeCategoryGroupList, setFeeCategoryGroupList] = useState([]);

  const [form] = Form.useForm();

  const handleSubmitForm = (values) => {};

  useEffect(() => {
    if (props.visible) {
      api
        .get(`/tuitionFee/${props.selectedTerm}/${props.visible.studentId}`)
        .then((response) => {
          console.log(response);
          let { student } = response;
          let { feeCategoryGroupList } = response;
          let { term } = response;
          let { totalFee } = response;
          setInitialValues({
            studentId: student.studentId,
            fullName: student.fullName,
            categoryGroupList: feeCategoryGroupList,
            term: term,
            totalFee: totalFee,
          });
          setFeeCategoryGroupList(feeCategoryGroupList);
          form.resetFields();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [props.visible]);

  return (
    <Modal
      title="Tạo Mới Phiếu Chi"
      visible={props.visible}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            handleSubmitForm(values);
          })
          .catch((info) => {
            console.log("Validate Failed:", info);
          });
      }}
      onCancel={() => {
        // form.validateFields();
        props.onCancel(false);
      }}
      okButtonProps={{
        icon: <SaveOutlined />,
        style: { width: "135px" },
      }}
      cancelButtonProps={{
        icon: <RollbackOutlined />,
        style: { width: "135px" },
      }}
      maskClosable={false}
      okText="Ghi sổ"
      cancelText="Quay lại"
      destroyOnClose={true}
      centered
      closable={true}
      width={"70%"}
      forceRender
    >
      <Form
        form={form}
        {...formItemLayout}
        onFieldsChange={(changedFields, allFields) => {}}
        preserve={false}
        onValuesChange={(changedValues, allValues) => {}}
        initialValues={initialValues}
      >
        <Row>
          <Col md={6} xs={6} style={{ display: "block" }}>
            <Divider>Thông tin phiếu chi</Divider>
            <Form.Item
              name="studentId"
              label="Mã sinh viên"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name="fullName"
              label="Họ và tên"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Input disabled />
            </Form.Item>{" "}
            <Form.Item
              name={["term", "term"]}
              label="Học kỳ"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name={["term", "year"]}
              label="Năm học"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              name={"reason"}
              label="Lý do chi tiền"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Input defaultValue="Thu tiền học phí" />
            </Form.Item>
          </Col>
          <Col md={6} xs={6} style={{ display: "block" }}>
            <Divider>Khoản chi</Divider>
            {feeCategoryGroupList.map((feeCategoryGroup, index) => {
              return (
                <FeeCategoryGroup
                  key={"feeCategoryGroup" + index}
                  feeCategoryGroup={feeCategoryGroup}
                ></FeeCategoryGroup>
              );
            })}
            <div className="rct-block ">
              <div className="rct-block-title ">
                <h4 style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>Tổng tiền : </span>
                  <span> {format(initialValues.totalFee)}</span>
                </h4>
              </div>
            </div>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default OutFeeReceiptsCreate;
