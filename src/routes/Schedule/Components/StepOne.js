import React, { useState, useEffect } from "react";
import { Form, DatePicker } from "antd";
import { api } from "Api";
import { NotificationManager } from "react-notifications"; 
import SubjectListInTerm from "./StepOneComponents/SubjectListInTerm";
import SubjectRegistrationOpenning from "./StepOneComponents/SubjectRegistrationOpenning";
import SubjectSubmittingResult from "./StepOneComponents/SubjectSubmittingResult"; 

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
        props.getTermDetail(props.term.id);
        callbacks(false);
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
        NotificationManager.success("Đóng đăng ký học phần thành công");
        props.getTermDetail(props.term.id);
      })
      .catch((error) => {
        showErrNoti(error);
      });
  };

  if (props.term.progress === 11) {
    return (
      <SubjectRegistrationOpenning
        {...props}
        handleSubjectSubmittingOpen={handleSubjectSubmittingOpen}
      />
    );
  } else if (props.term.progress === 12) {
    return (
      <SubjectListInTerm
        {...props}
        handleSubjectSubmittingClose={handleSubjectSubmittingClose}
      />
    );
  } else {
    return <SubjectSubmittingResult {...props} />;
  }
};

export default StepOne;
