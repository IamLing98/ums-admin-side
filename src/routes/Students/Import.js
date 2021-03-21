import React, {useState} from 'react'
import { Space, Button, Tooltip, Modal, Table, Upload, message, Spin } from "antd";
import { 
  ImportOutlined,
  RetweetOutlined,
  PrinterOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import FileSaver from "file-saver";
import moment from "moment"; 

export const ImportStudent = (props) => {

  const [fileList, setFileList] = useState(null);

  const importModalProps = {
    onRemove: (file) => {
      setFileList(null);
    },
    beforeUpload: (file) => {
      console.log(file.type);
      let fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      setFileList(file);
      if (file.type !== fileType) {
        message.error(`${file.name} is not a spread sheet file`);
      }
      return false;
    },
  };
 
  return (
    <Modal
      visible={props.visible}
      centered
      onCancel={() => props.setShowModalImport(false)}
      footer={
        <div>
          <Button disabled={!fileList} onClick={() => props.handleUpload(fileList)} type="primary">
            Tải lên
          </Button>
        </div>
      }
    >
      <div style={{ width: "100%", display: "grid", justifyContent: "center" }}>
        <Upload {...importModalProps} maxCount={1}>
          <Button icon={<UploadOutlined />}>Chọn file định dạng .xls,.xlsx</Button>
        </Upload>
      </div>
    </Modal>
  );
};

export default ImportStudent;
