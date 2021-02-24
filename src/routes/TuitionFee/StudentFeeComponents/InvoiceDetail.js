import React, { useEffect, useState } from "react";
import { Drawer, Button, Table, Divider } from "antd";
import { RollbackOutlined, PrinterFilled } from "@ant-design/icons";
import { api } from "Api";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { Row, Col } from "reactstrap";

const BillDetail = (props) => {
  const [loading, setLoading] = useState(true);

  const [record, setRecord] = useState(null);

  const dataHeaderLeft = [
    {
      title: "Mã phiếu thu:",
      values: record ? record.fullName : "",
    },
    {
      title: "Mã sinh viên:",
      values: record ? record.fullName : "",
    },
    {
      title: "Học kỳ:",
      values: record ? record.nationalityName : "",
    },
    {
      title: "Lý do:",
      values: record ? record.religion : "",
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
      values: record ? record.dateBirth : "",
    },
    {
      title: "Họ tên:",
      values: record ? record.fullName : "",
    },
    {
      title: "Năm học:",
      values: record ? record.religion : "",
    },
    {
      title: "Diễn giải:",
      values: record ? record.religion : "",
    },
    {
      title: "Tổng tiền :",
      values: record ? record.permanentResidence : "",
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
    { title: "Nhóm Danh Mục", dataIndex: "values", align: "center" },
    { title: "Mô tả", dataIndex: "description", align: "center" },
    { title: "Giá Trị", dataIndex: "value", align: "center" },
  ];

  const [invoiceDetail, setInvoiceDetail] = useState(null);

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
            <Button onClick={props.onClose} type="primary" style={{ width: "108px" }}>
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
                  rowKey="title"
                  pagination={false}
                  columns={feeCategoryTableColumns}
                  dataSource={dataHeaderLeft}
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
