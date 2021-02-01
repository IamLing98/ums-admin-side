import React, { useState, useEffect } from "react";
import { Tabs, Menu  } from "antd";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { api } from "Api";
import {
  ArrowRightOutlined,
  MailOutlined,
  SettingOutlined,
  AppstoreOutlined,
  DoubleLeftOutlined,
} from "@ant-design/icons";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const { TabPane } = Tabs;

const { SubMenu } = Menu;

const TermComponent = (props) => {
  const [term, setTerm] = useState(null);

  const [loading, setLoading] = useState(true);

  const [current, setCurrent] = useState("setting:1");

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
    if (term !== null) {
      console.log("oke");
    }
  }, [JSON.stringify(term)]);

  const handleClick = (e) => {
    console.log(e.key);
    setCurrent(e.key);
  };
  if (loading && !term) {
    return <RctPageLoader />;
  }
  return (
    <div>
      <div className="ant-page-header-heading">
        <div className=" ant-page-header-heading-left">
          <h4>
            <span>
              <a
                href="javascript:void(0)"
                onClick={() => {
                  props.setIsShowDetail(null);
                }}
              >
                <DoubleLeftOutlined />
              </a>{" "}
              Thông tin học kỳ {term.term} năm {term.year}
            </span>
          </h4>
        </div>
        <span className="ant-page-header-heading-extra">
          <Menu
            onClick={handleClick}
            selectedKeys={[current]}
            mode="horizontal"
          >
            <SubMenu
              key="submitting"
              icon={<SettingOutlined />}
              title="Đăng ký học tập"
            >
              <Menu.Item key="setting:1">Học phần dự kiến</Menu.Item>
              <Menu.Item key="setting:2">Lớp học phần</Menu.Item>
              <Menu.Item key="setting:3">Đăng ký điều chỉnh</Menu.Item>
            </SubMenu>
            <SubMenu key="result" icon={<SettingOutlined />} title="Thông tin ">
              <Menu.Item key="result:1">Option 1</Menu.Item>
              <Menu.Item key="result:2">Option 2</Menu.Item>
              <Menu.Item key="result:3">Option 3</Menu.Item>
              <Menu.Item key="result:4">Option 4</Menu.Item>
            </SubMenu>
          </Menu>
        </span>
      </div>
      <hr style={{ margin: "0px", marginBottom: "15px" }} />
      {current === "setting:1" && (
        <StepOne term={term} getTermDetail={getTermDetail} />
      )}
      {current === "setting:2" && (
        <StepTwo term={term} getTermDetail={getTermDetail} />
      )}
      {current === "setting:3" && (
        <StepThree term={term} getTermDetail={getTermDetail} />
      )}
    </div>
  );
};

export default TermComponent;
