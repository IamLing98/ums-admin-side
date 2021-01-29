import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
} from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import Progress12 from "./StepOneComponents/Progress12";
import Progress11 from "./StepOneComponents/Progress11";
import Progress13 from "./StepOneComponents/Progress13";
const { RangePicker } = DatePicker;

const StepOne = (props) => {
  const [form] = Form.useForm(); 

  const showErrNoti = (err) => {
    NotificationManager.err(err.response.data.message);
    if (err.message === "Forbidden") {
      NotificationManager.err(
        "Did you forget something? Please activate your account"
      );
    } else if (err.message === "Unauthorized") {
      throw new SubmissionError({ _err: "Username or Password Invalid" });
    }
  }; 

  const handleSubjectSubmittingOpen = (values, callbacks) => {
    let subjectSubmittingStartDate = values["rangeTime"][0].format(
      "YYYY-MM-DD"
    );
    let subjectSubmittingEndDate = values["rangeTime"][1].format("YYYY-MM-DD");
    let termObj = { ...props.term };
    termObj.subjectSubmittingStartDate = subjectSubmittingStartDate;
    termObj.subjectSubmittingEndDate = subjectSubmittingEndDate;
    termObj.actionType = "SSON";
    api
      .put(`/terms/${termObj.id}`, termObj, true)
      .then((res) => {
        NotificationManager.success("Mở đăng ký học phần thành công"); 
        props.getTermDetail(props.term.id)
        callbacks(false)
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };

  const handleSubjectSubmittingClose = () => {
    let subjectSubmittingEndDate = new Date().toISOString().substring(0, 10);
    console.log(subjectSubmittingEndDate);
    let termObj = { ...props.term };
    termObj.subjectSubmittingEndDate = subjectSubmittingEndDate;
    termObj.actionType = "SSOFF";
    api
      .put(`/terms/${termObj.id}`, termObj, true)
      .then((res) => {
        NotificationManager.success(
          "Đóng đăng ký học phần thành công"
        ); 
        props.getTermDetail(props.term.id)
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };
 

  if (props.term.progress === 11) {
    return (
      <Progress11
        {...props}
        handleSubjectSubmittingOpen={handleSubjectSubmittingOpen} 
      />
    );
  } else if (props.term.progress === 12) {
    return (
      <Progress12
        {...props}
        handleSubjectSubmittingClose={handleSubjectSubmittingClose}
      />
    );
  } else  {
    return <Progress13 {...props} />;
  }  
};

export default StepOne;
