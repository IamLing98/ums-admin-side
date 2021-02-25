import React, { useState, useEffect } from "react";
import { Modal, Form, Input, Divider, Select } from "antd";
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

export const InFeeReceiptsCreate = (props) => {
  const [initialValues, setInitialValues] = useState({
    studentId: null,
    fullName: null,
    term: null,
    totalFee: 0,
    reasonId: 1,
  });

  const [studentFeeInfo, setStudentFeeInfo] = useState({});

  const [reasonList, setReasonList] = useState([]);

  function format(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
  }

  const [feeCategoryGroupList, setFeeCategoryGroupList] = useState([]);

  const [form] = Form.useForm();

  const showErrNoti = (err) => {
    NotificationManager.error(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err("Did you forget something? Please activate your account");
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  };
  const handleSubmitForm = (values) => {
    let feeCategories = [];
    feeCategoryGroupList.map((feeCategoryGroup) => {
      feeCategoryGroup.feeCategoryList.map((feeCategory) => {
        feeCategories.push(feeCategory);
      });
    });
    let studentInvoice = {
      student: studentFeeInfo.student,
      amount: studentFeeInfo.totalFee,
      reasonId: values.reasonId,
      term: studentFeeInfo.term,
      studentsFeeCategories: feeCategories,
      invoiceType: 0,
    };

    console.log("studentInvoice: ", studentInvoice);
    api
      .post(`/studentInvoices`, studentInvoice)
      .then((response) => {
        NotificationManager.success("Tạo phiếu thu thành công");
        props.getStudentInvoiceList(props.selectedTerm);
        props.getTermDetail(props.selectedTerm);
        props.showPrintConfirm(values);
        props.onCancel(false);
      })
      .catch((error) => {
        showErrNoti(error);
        props.onCancel(false);
      });
  };

  const getReceiptDetail = (studentId, termId) => {
    api
      .get(`/tuitionFee/${termId}/${studentId}`)
      .then((response) => {
        console.log(response);
        let { student } = response;
        let { feeCategoryGroupList } = response;
        let { term } = response;
        let { totalFee } = response;
        console.log("response: ", response);
        setInitialValues({
          ...initialValues,
          studentId: student.studentId,
          fullName: student.fullName,
          categoryGroupList: feeCategoryGroupList,
          term: term,
          totalFee: totalFee,
        });
        setFeeCategoryGroupList(feeCategoryGroupList);
        setStudentFeeInfo(response);
        form.resetFields();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getFeeReason = () => {
    api
      .get("/feeReasons")
      .then((response) => {
        setReasonList(response);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getFeeReason();
  }, []);

  useEffect(() => {
    form.resetFields();
  }, [props.visible]);

  return (
    <Modal
      title="Tạo Mới Phiếu Thu"
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
            <Divider>Thông tin phiếu thu</Divider>
            <Form.Item
              name="studentId"
              label="Sinh viên"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn sinh viên!" }]}
            >
              <Select
                allowClear
                showSearch
                onSelect={(value) => {
                  form.setFieldsValue({ ...form.getFieldsValue, studentId: value });
                  getReceiptDetail(value, props.selectedTerm);
                }}
              >
                {props.studentList.map((student, index) => {
                  return (
                    <Select.Option key={"inReceiptStudentOpts" + student.studentId + index} value={student.studentId}>
                      {student.studentId + " - " + student.fullName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
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
              name={"reasonId"}
              label="Lý do thu tiền"
              hasFeedback
              rules={[{ required: true, message: "Vui lòng chọn kỳ!" }]}
            >
              <Select>
                {reasonList.map((reason, index) => {
                  return (
                    <Select.Option key={"InreasonOptios" + index} value={reason.id}>
                      {reason.reasonName}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
          </Col>
          <Col md={6} xs={6} style={{ display: "block" }}>
            <Divider>Khoản thu</Divider>
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

export default InFeeReceiptsCreate;
