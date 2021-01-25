import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import { api } from "Api";
import { ArrowRightOutlined } from "@ant-design/icons";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { Step } = Steps;

function StepRender(props) {
  if (props.step === 0) {
    return (
      <div>
        <StepOne {...props} />
      </div>
    );
  } else if (props.step === 1)
    return (
      <div>
        <StepTwo {...props} />
      </div>
    );
}

const TermComponent = (props) => {
  const [step, setStep] = useState(0); 

  const [term, setTerm] = useState(null);

  const [loading, setLoading] = useState(true);

  const getTermDetail = (id) => {
    api
      .get(`/terms/${id}`)
      .then((res) => {
        setTerm(res);
        setLoading(false);
        if(term){
          const { progress } = props.term;
          if (progress > 10 && progress < 20) setStep(0);
          else if (progress > 20 && progress < 30) setStep(1);
          else if (progress > 30 && progress < 40) setStep(2); 
        }
      })
      .catch((err) => console.log(err));
  };
 

  useEffect(() => {
    if (props.term) {
      getTermDetail(props.term.id);
    }
  }, []);

  if (loading && !term) {
    return <RctPageLoader />;
  }
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
          term={term}
          getTermDetail={getTermDetail} 
        />
      }
    </div>
  );
};

export default TermComponent;
