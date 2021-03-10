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
  CodeOutlined,
  SyncOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import { useSelector } from "react-redux";
import { NotificationManager } from "react-notifications";
import moment from "moment";

const { SubMenu } = Menu;

const TermComponent = (props) => {
  const [term, setTerm] = useState(null);

  const [loading, setLoading] = useState(true);

  const [current, setCurrent] = useState("setting:1");

  const webSocketReducer = useSelector((state) => state.webSocketReducer);  

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
    if (webSocketReducer.messages.length > 0 && webSocketReducer.connected) {
      console.log("ws length: ", webSocketReducer.messages.length);
      console.log("ws:", webSocketReducer);
      if (webSocketReducer.messages[0].type === 1) {
        console.log("phai thay doi");
        getTermDetail(props.term.id);
      }
    }
  }, [JSON.stringify(webSocketReducer.messages.length)]);

  // useEffect(() => {
  //   if (term !== null) {
  //   }
  // }, [JSON.stringify(term)]);

  const handleClick = (e) => {
    console.log(e);
    setCurrent(e.key);
  };

  const getProgressName = (term) => {
    if (term.term.progress === 11) {
      return (
        <>
          <Tag
            style={{ fontSize: "15px" }}
            icon={<ClockCircleOutlined />}
            color="default"
          >
            Khởi tạo
          </Tag>
          <Tag color="default">default</Tag>
        </>
      );
    } else if (term.progress === 12)
      return (
        <>
          <Tag
            style={{ fontSize: "15px" }}
            icon={<SyncOutlined spin />}
            color="processing"
          >
            Đang mở đăng ký học phần
          </Tag>{" "}
          <Tag
            style={{ fontSize: "15px" }}
            icon={<ClockCircleOutlined />}
            color="default"
          >
            {moment(term.subjectSubmittingStartDate).format("hh:mm DD/MM/YYYY") +
              " - " +
              moment(term.subjectSubmittingEndDate).format("hh:mm DD/MM/YYYY")}
          </Tag>
        </>
      );
    else if (term.progress === 13)
      return (
        <>
          <Tag
            style={{ fontSize: "15px" }}
            icon={<CheckCircleOutlined />}
            color="success"
          >
            Hoàn tất đăng ký học phần
          </Tag>
          <Tag
            style={{ fontSize: "15px" }}
            icon={<ClockCircleOutlined />}
            color="default"
          >
            {moment(term.subjectSubmittingStartDate).format("hh:mm DD/MM/YYYY") +
              " - " +
              moment(term.subjectSubmittingEndDate).format("hh:mm DD/MM/YYYY")}
          </Tag>
        </>
      );
    else if (term.progress === 21)
      return (
        <>
          {" "}
          <Tag
            style={{ fontSize: "15px" }}
            icon={<SyncOutlined spin />}
            color="processing"
          >
            Đang mở đăng ký lớp học phần
          </Tag>{" "}
          <Tag
            style={{ fontSize: "15px" }}
            icon={<ClockCircleOutlined />}
            color="default"
          >
            {moment(term.subjectClassSubmittingStartDate).format("hh:mm DD/MM/YYYY") +
              " - " +
              moment(term.subjectCLassSubmittingEndDate).format("hh:mm DD/MM/YYYY")}
          </Tag>
        </>
      );
    else if (term.progress === 22)
      return (
        <Tag style={{ fontSize: "15px" }} icon={<CheckCircleOutlined />} color="success">
          Hoàn tất đăng ký lớp học phần
        </Tag>
      );
    else if (term.progress === 31)
      return (
        <>
          <Tag
            style={{ fontSize: "15px" }}
            icon={<SyncOutlined spin />}
            color="processing"
          >
            Đang mở đăng ký điều chỉnh
          </Tag>
          <Tag
            style={{ fontSize: "15px" }}
            icon={<ClockCircleOutlined />}
            color="default"
          >
            {moment(term.editSubmittingStartDate).format("hh:mm DD/MM/YYYY") +
              " - " +
              moment(term.editSubmittingEndDate).format("hh:mm DD/MM/YYYY")}
          </Tag>
        </>
      );
    else if (term.progress === 32)
      return (
        <Tag style={{ fontSize: "15px" }} icon={<CheckCircleOutlined />} color="success">
          Hoàn tất đăng ký điều chỉnh
        </Tag>
      );
    else if (term.progress === 33) {
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<SyncOutlined spin  />}
          color="processing"
        >
          Đang đóng học phí
        </Tag>
      );
    } else if (term.progress === 34) {
      return (
        <Tag style={{ fontSize: "15px" }} icon={<CheckCircleOutlined />} color="success">
          Kết thúc đóng học phí
        </Tag>
      );
    } else if (term.progress === 35) {
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<SyncOutlined spin  />}
          color="processing"
        >
          Đang mở nhập điểm
        </Tag>
      );
    } else if (term.progress === 36) {
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<CheckCircleOutlined />}
          color="processing"
        >
          Kết thúc nhập điểm
        </Tag>
      );
    }else if (term.progress === 37) {
      return (
        <Tag
          style={{ fontSize: "15px" }}
          icon={<CheckCircleOutlined />}
          color="processing"
        >
          Đã tổng hợp kết quả
        </Tag>
      );
    }
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
              </a>
              Thông tin học kỳ {term.term} năm {term.year} {getProgressName(term)}
            </span>
          </h4>
        </div>
        <span className="ant-page-header-heading-extra">
          <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
            <Menu.Item key="setting:1">
              <ClockCircleOutlined />
              Kế hoạch học tập
            </Menu.Item>
            <Menu.Item
              key={term.progress < 32 ? "setting:2" : "setting:3"}
              disabled={term.progress < 13}
            >
              <CodeOutlined />
              {term.status === 2 ? "Đăng ký học tập" : "Lớp học phần"}
            </Menu.Item>
          </Menu>
        </span>
      </div>
      <hr style={{ margin: "0px", marginBottom: "15px" }} />
      {current === "setting:1" && <StepOne term={term} getTermDetail={getTermDetail} />}
      {current === "setting:2" && (
        <StepTwo term={term} getTermDetail={getTermDetail} setCurrent={setCurrent} />
      )}
      {current === "setting:3" && <StepThree term={term} getTermDetail={getTermDetail} />}
    </div>
  );
};
export default TermComponent;
