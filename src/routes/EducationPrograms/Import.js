import React, { useState, useEffect } from "react";
import { Modal, Row, Col, Select, Input, Upload } from "antd";
import { NotificationManager } from "react-notifications";
import { api } from "Api";
import { InboxOutlined } from "@ant-design/icons";

const { Dragger } = Upload;

const propss = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export const EducationImport = (props) => {
  return (
    <Modal
      title="Import Học Phần"
      visible={props.visible}
      onOk={() => {}}
      onCancel={() => {
        props.setShowImportEducationProgram(false);
      }}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Import"
      cancelText="Đóng"
      centered
      closable={false}
      width={"40%"}
      forceRender
    >
      <Dragger {...propss}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click hoặc kéo file để upload</p>
        <p className="ant-upload-hint">Chấp nhận file đuôi .xsl, .xsls</p>
      </Dragger>
    </Modal>
  );
};

export default EducationImport;
