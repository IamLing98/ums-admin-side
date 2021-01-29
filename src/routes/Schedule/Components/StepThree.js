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
import SubjectClassList from './StepThreeComponents/SubjectClassList';
import Progress32 from './StepThreeComponents/Progress32';


const { RangePicker } = DatePicker;

const StepThree= (props) => {
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

  const handleCloseSubmittingEdit = () => {
    let termObj = { ...props.term };
    termObj.actionType = "SCREOFF";
    api
      .put(`/terms/${termObj.id}`, termObj, true)
      .then((res) => {
        NotificationManager.success("Kết thúc đăng ký chỉnh sửa thành công");
        props.getTermDetail(props.term.id); 
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };

   

  if (props.term.progress === 31) {
    return (
      <SubjectClassList
        {...props}
        handleCloseSubmittingEdit={handleCloseSubmittingEdit}
      />
    );
  } else if (props.term.progress === 32) {
    return (
      <Progress32
        {...props} 
      />
    );
  }  else return <></>;
};

export default StepThree;
