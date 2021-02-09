import React, { useState, useEffect } from "react";
import { Menu, Tag } from "antd";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import { api } from "Api";
import {
  SettingOutlined,
  DoubleLeftOutlined,
  ClockCircleOutlined,
  BankOutlined,
  CodeOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

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

  const getProgressName = (progress) => {
    if (progress === 11) {
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<ClockCircleOutlined  />}
          color="default"
        >
          Khởi tạo
        </Tag>
      );
    } else if (progress == 12)
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<SyncOutlined spin />}
          color="processing"
        >
          Đang mở đăng ký học phần
        </Tag>
      );
    else if (progress == 13)
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<CheckCircleOutlined />}
          color="success"
        >
          Hoàn tất đăng ký học phần
        </Tag>
      );
    else if (progress == 21)
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<SyncOutlined spin />}
          color="processing"
        >
          Đang mở đăng ký lớp học phần
        </Tag>
      );
    else if (progress == 22)
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<CheckCircleOutlined />}
          color="success"
        >
          Hoàn tất đăng ký lớp học phần
        </Tag>
      );
    else if (progress == 31)
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<SyncOutlined  spin/>}
          color="processing"
        >
          Đang mở đăng ký điều chỉnh
        </Tag>
      );
    else if (progress == 32)
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<CheckCircleOutlined />}
          color="success"
        >
          Hoàn tất đăng ký điều chỉnh
        </Tag>
      );
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
              Thông tin học kỳ {term.term} năm {term.year}{" "}
              {getProgressName(term.progress)}
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
              <Menu.Item key="setting:1">
                <ClockCircleOutlined />
                Học phần dự kiến
              </Menu.Item>
              <Menu.Item key="setting:2">
                <BankOutlined />
                Lớp học phần
              </Menu.Item>
              <Menu.Item key="setting:3">
                <CodeOutlined />
                Đăng ký điều chỉnh
              </Menu.Item>
            </SubMenu>
            <SubMenu
              key="result"
              icon={<SettingOutlined />}
              title="Kết quả học tập "
            >
              <Menu.Item key="result:1">Thời khoá biểu</Menu.Item>
              <Menu.Item key="result:2">Danh sách lớp học phần</Menu.Item>
            </SubMenu>
          </Menu>
        </span>
      </div>
      <hr style={{ margin: "0px", marginBottom: "15px" }} />
      {current === "setting:1" && (
        <StepOne term={term} getTermDetail={getTermDetail} />
      )}
      {current === "setting:2" && (
        <StepTwo
          term={term}
          getTermDetail={getTermDetail}
          setCurrent={setCurrent}
        />
      )}
      {current === "setting:3" && (
        <StepThree term={term} getTermDetail={getTermDetail} />
      )}
    </div>
  );
};

export default TermComponent;
