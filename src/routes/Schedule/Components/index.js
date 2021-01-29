import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { api } from "Api";
import { ArrowRightOutlined } from "@ant-design/icons";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { TabPane } = Tabs;

const TermComponent = (props) => { 

  const [term, setTerm] = useState(null);

  const [loading, setLoading] = useState(true);

  const getTermDetail = (id) => {
    api
      .get(`/terms/${id}`)
      .then((res) => {
        setTerm(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };
 

  useEffect(() => {
    if (props.term) {
      getTermDetail(props.term.id);
    }
  }, []);

  useEffect(() => { 
  }, [JSON.stringify(term)]);

  if (loading && !term) {
    return <RctPageLoader />;
  }
  return (
    <div>
      <Tabs defaultActiveKey="1" type="card" size={"small"}>
        <TabPane tab="Học phần dự kiến" key="1">
          <StepOne   term={term} getTermDetail={getTermDetail} />
        </TabPane>
        <TabPane tab="Lớp học phần" key="2">
          <StepTwo   term={term} getTermDetail={getTermDetail} />
        </TabPane>
        <TabPane tab="Đăng ký điều chỉnh" key="3">
          <StepThree   term={term} getTermDetail={getTermDetail} />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default TermComponent;
