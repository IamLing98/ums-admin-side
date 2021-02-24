import React, { useEffect, useState } from "react";
import {   PrinterFilled    , RollbackOutlined  } from "@ant-design/icons";
import { Button, Tabs, Select, Spin, Modal } from "antd";
import { Viewer } from "@react-pdf-viewer/core";
import { printPlugin } from "@react-pdf-viewer/print";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";

const InvoicePrint = (props) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const printPluginInstance = printPlugin();

  const [loading, setLoading] = useState(false);
  return (
    <Modal
      title="In phiếu thu"
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
        icon: <PrinterFilled />,
        style: { width: "135px" },
      }}
      cancelButtonProps={{
        icon: <RollbackOutlined />,
        style: { width: "135px" },
      }}
      maskClosable={false}
      okText="In"
      cancelText="Quay lại"
      destroyOnClose={true}
      centered
      closable={true}
      width={"70%"}
      forceRender
    >
      <Spin spinning={loading}>
        <Viewer plugins={[printPluginInstance,defaultLayoutPluginInstance]} fileUrl="http://localhost:8080/downloadFile/pdf.pdf" />
      </Spin>
    </Modal>
  );
};

export default InvoicePrint;
