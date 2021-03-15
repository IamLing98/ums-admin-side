import React, { useEffect, useState } from "react";
import { Drawer, Button, Table, Divider } from "antd";
import { RollbackOutlined, PrinterFilled } from "@ant-design/icons";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { Row, Col } from "reactstrap";
import moment from "moment";

const BillDetail = (props) => {
  const [loading, setLoading] = useState(true);

  const [record, setRecord] = useState(null);

  function format(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
  }

  const dataHeaderLeft = [
    {
      title: "Mã phiếu thu:",
      values: record ? record.invoiceNo : "",
    },
    {
      title: "Mã sinh viên:",
      values: record ? record.student.studentId : "",
    },
    {
      title: "Học kỳ:",
      values: record ? record.term.term : "",
    },
    {
      title: "Loại phiếu:",
      values: record ? (record.invoiceType === 0 ? "Phiếu thu" : "Phiếu chi") : "",
    },
    {
      title: "Người thu :",
      values: record ? record.permanentResidence : "",
    },
  ];
  const columnsHeaderLeft = [
    {
      title: "Danh mục",
      dataIndex: "title",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => {
        return <strong style={{ fontWeight: "700" }}>{text}</strong>;
      },
    },
    {
      title: "Giá trị",
      dataIndex: "values",
      width: "70%",
    },
  ];
  const dataHeaderRight = [
    {
      title: "Ngày thu:",
      values: record ? moment(record.invoiceCreatedDate).format("HH:mm DD/MM/YYYY") : "",
    },
    {
      title: "Họ tên:",
      values: record ? record.student.fullName : "",
    },
    {
      title: "Năm học:",
      values: record ? record.term.year : "",
    },
    {
      title: "Lý do:",
      values: record ? record.invoiceName : "",
    },
    {
      title: "Tổng tiền :",
      values: record ? format(record.amount) : "",
    },
  ];
  const columnsHeaderRight = [
    {
      title: "Danh mục",
      dataIndex: "title",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
      render: (text, record) => {
        return <strong style={{ fontWeight: "700" }}>{text}</strong>;
      },
    },
    {
      title: "Giá trị",
      dataIndex: "values",
      width: "70%",
    },
  ];

  const feeCategoryTableColumns = [
    { title: "Mã Danh Mục", dataIndex: "id", align: "center" },
    { title: "Tên Danh Mục", dataIndex: "feeCategoryName", align: "center" },
    { title: "Nhóm Danh Mục", dataIndex: "feeCategoryGroupName", align: "center" },
    { title: "Mô tả", dataIndex: "description", align: "center" },
    { title: "Giá Trị", dataIndex: "value", align: "center" },
  ];

  const getInvoiceDetail = (invoiceNo) => {
    api
      .get(`/studentInvoices/${invoiceNo}`)
      .then((res) => {
        setRecord(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (props.visible) {
      getInvoiceDetail(props.visible.invoiceNo);
    }
  }, [props.visible]);

  return (
    <>
      <Drawer
        title="Thông tin phiếu thu"
        width={"50%"}
        onClose={() => props.onDeselectRow(props.record)}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              style={{ width: "108px" }}
              onClick={() => props.onDeselectRow(props.record)}
              style={{ marginRight: 8 }}
            >
              <RollbackOutlined />
              Quay lại
            </Button>
            <Button
              onClick={() => {
                if (record) {
                  let obj = {
                    invoiceNo: record.invoiceNo,
                    studentId: record.student.studentId,
                    fullName: record.student.fullName,
                    yearClassId: record.student.yearClassId,
                    departmentName: record.student.departmentName,
                    content: "Thu tiền học phí kỳ " + record.term.term + " năm " + record.term.year  ,
                    totalFee: record.amount,
                    textMoney: record.textMoney,
                    studentSign: record.student.fullName,
                    username: 5372000,
                  };
                  props.handlePrintStudentInvoice(obj,1);
                }
              }}
              type="primary"
              style={{ width: "108px" }}
            >
              <PrinterFilled />
              In
            </Button>
          </div>
        }
      >
        {loading === true ? (
          <RctPageLoader />
        ) : (
          <div className="student-description-wrapper">
            <Row>
              <Col md={12}>
                <Divider orientation="left">Thông tin phiếu</Divider>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Table
                  bordered
                  rowKey="title"
                  showHeader={false}
                  pagination={false}
                  columns={columnsHeaderLeft}
                  dataSource={dataHeaderLeft}
                ></Table>
              </Col>
              <Col md={6}>
                <Table
                  bordered
                  rowKey="title"
                  showHeader={false}
                  pagination={false}
                  columns={columnsHeaderRight}
                  dataSource={dataHeaderRight}
                ></Table>
              </Col>
            </Row>
            <Row style={{ marginTop: "30px" }}>
              <Col>
                <Divider orientation="left">Danh mục</Divider>
                <Table
                  bordered
                  rowKey="id"
                  pagination={false}
                  columns={feeCategoryTableColumns}
                  dataSource={record ? record.items : []}
                ></Table>
              </Col>
            </Row>
          </div>
        )}
      </Drawer>
    </>
  );
};

export default BillDetail;
