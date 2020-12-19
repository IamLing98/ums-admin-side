import React, { useState, useEffect } from "react";
import { Steps } from "antd";
import {
  DeleteFilled,
  DeleteOutlined,
  DiffOutlined,
  EditFilled,
  PlusOutlined,
  SearchOutlined,
  UserOutlined,
  LoadingOutlined,
  SmileOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
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

  const termReducer = useSelector((state) => state.termReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    const { progress } = termReducer.recordDetail;
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
          //subTitle="15/10/2020"
          status="finish"
          description="Đăng ký học phần."
        />
        <Step
          title="Giai đoạn 2"
          //subTitle="18/10/2020"
          status="process"
          description="Đăng ký lớp học phần."
        />
        <Step
          title="Giai đoạn 3"
          //subTitle="21/10/2020"
          status="wait"
          description="Đăng ký chỉnh sửa."
        />
      </Steps>
      {<StepRender step={step} />}
    </div>
  );
};

export default TermComponent;
