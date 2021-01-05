import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import { setTermDetail } from "../../../../actions/TermActions";
import StepOne from "./StepOne";
import { api } from "Api";
import { ArrowRightOutlined } from "@ant-design/icons";
const { Step } = Steps;

function StepRender(props) {
  if (props.step === 0) {
    return (
      <div>
        <StepOne {...props} />
      </div>
    );
  } else return <div></div>;
}

const TermComponent = (props) => {
  const [step, setStep] = useState(0);

  const [submittingInfo, setSubmittingInfo] = useState([]);
 
  const getSubmittingInfo = (termId) => {
    api
      .get("/subjectsRegistration/" + termId)
      .then((res) => setSubmittingInfo(res))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    const { progress } = props.term;
    if (progress > 10 && progress < 20) setStep(0);
    else if (progress > 20 && progress < 30) setStep(1);
    else if (progress > 30 && progress < 40) setStep(2);
    return () => props.setIsShowDetail(null);
  }, []);  

  const icon = () => {
    return <ArrowRightOutlined />;
  };
  return (
    <div>
      <Steps
        size="small"
        className="site-navigation-steps"
        current={step}
        onChange={(step) => setStep(step)}
        percent={60}
      >
        <Step
          title="Đăng ký học phần"
          status="process"
          // description={
          //   term.progress11Date && term.progress13Date ? (
          //     <span>
          //       {term.progress11Date}
          //       {icon()} {term.progress13Date}
          //     </span>
          //   ) : (
          //     ""
          //   )
          // }
        />
        <Step
          title="Đăng ký lớp học phần"
          status="process"
          // description={`${
          //   term.progress21Date ? term.progress21Date + " - " : ""
          // }   ${term.progress23Date ? term.progress23Date : ""}`}
        />
        <Step
          title="Đăng ký chỉnh sửa"
          status="wait"
          // description={`${
          //   term.progress31Date ? term.progress31Date + " - " : ""
          // }   ${term.progress32Date ? term.progress33Date : ""}`}
        />
      </Steps>
      <br />
      {
        <StepRender
          step={step}
          submittingInfo={submittingInfo}
          getSubmittingInfo={getSubmittingInfo}
          setIsShowDetail={props.setIsShowDetail}
          term={props.term}
        />
      }
    </div>
  );
};

export default TermComponent;
