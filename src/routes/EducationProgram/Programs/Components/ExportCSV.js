import React from "react";
import { Table, Tag, Space, Button, Popconfirm, Input } from "antd";
import { NotificationManager } from "react-notifications";
import { DiffOutlined } from "@ant-design/icons";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ExportCSV = ({ csvData, fileName }) => {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (csvData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <a
      href="javascript:void(0)"
      className="ant-btn"
      onClick={(e) => exportToCSV(csvData, fileName)}
    >
      <DiffOutlined />
      <span>ExportCSV</span>
    </a>
  );
};
export default ExportCSV;
