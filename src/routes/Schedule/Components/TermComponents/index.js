import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import { setTermDetail } from "../../../../actions/TermActions";
import { useSelector, useDispatch } from "react-redux";
import StepOne from "./StepOne";
import { api } from "Api";

const { Step } = Steps;

function StepRender(props) {
  if (props.step === 0) {
    return (
      <div>
        <StepOne term={props.term} />
      </div>
    );
  } else return <div></div>;
}

const TermComponent = (props) => {
  const [step, setStep] = useState(0);

  const dispatch = useDispatch();

  const term = useSelector((state) => state.termReducer.recordDetail);

  useEffect(() => {
    const { progress } = term;
    if (progress > 10 && progress < 20) setStep(0);
    else if (progress > 20 && progress < 30) setStep(1);
    else if (progress > 30 && progress < 40) setStep(2);

    return () => dispatch(setTermDetail(null));
  }, []);

  return (
    <div>
      <Steps
        type="navigation"
        size="small"
        current={step}
        onChange={(step) => setStep(step)}
        className="site-navigation-steps"
      >
        <Step
          title="Giai đoạn 1"
          subTitle={`${term.progress11Date ? term.progress11Date + " -> " : ""}   ${term.progress12Date ? term.progress12Date : ""}`}
          status="process"
          description="Đăng ký học phần."
        />
        <Step
          title="Giai đoạn 2"
          subTitle={`${term.progress21Date ? term.progress21Date + " -> " : ""}   ${term.progress22Date ? term.progress22Date : ""}`}
          status="process"
          description="Đăng ký lớp học phần."
        />
        <Step
          title="Giai đoạn 3"
          subTitle={`${term.progress31Date ? term.progress31Date + " -> " : ""}   ${term.progress32Date ? term.progress33Date : ""}`}
          status="wait"
          description="Đăng ký chỉnh sửa."
        />
      </Steps>
      <hr />
      {<StepRender step={step} />}
    </div>
  );
};

export default TermComponent;
