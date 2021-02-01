/**
 * Module Dashboard
 */

import { InboxOutlined } from "@ant-design/icons";
import { Modal, Select, Upload, Input } from "antd";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux"; 

const { Dragger } = Upload;

const { Option } = Select;

export const ImportStudent = (props) => {
  const [educationProgramId, setEducationProgramId] = useState(null);

  const [educationProgramName, setEducationProgramName] = useState(null);

  const [branchId, setBranchId] = useState(null);

  const [educationProgramLevel, setEducationProgramLevel] = useState(null);

  const [educationProgramType, setEducationProgramType] = useState(null);

  const [modalWidth, setModalWidth] = useState("40%");

  const [rows, setRows] = useState([[]]);

  const [cols, setCols] = useState([]);

   
  return (
    <></>
  );
};

const mapStateToProps = ({ departmentReducer }) => {
  return { departmentReducer };
};

export default connect(mapStateToProps, {})(ImportStudent);
