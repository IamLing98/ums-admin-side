import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import moment from "moment";
import {
  CreditCardOutlined,
  OrderedListOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import StudentAccount from "./StudentAccounts";
import TeacherAccount from "./TeacherAccount";
import {api} from 'Api'

const AccountHome = (props) => {
  const [current, setCurrent] = useState("setting:1");

  const [departmentList, setDepartmentList] = useState([]);

  const [yearClassList, setYearClassList] = useState([]);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const getDepartmentList = () => {
    api
      .get(`/departments`)
      .then((values) => setDepartmentList(values))
      .catch((err) => console.error(err));
  };

  const getYearClassList = () => {
    api
      .get(`/yearClasses`)
      .then((values) => setYearClassList(values))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getDepartmentList();
    getYearClassList();
  },[]);
  return (
    <>
      <div className="data-table-wrapper">
        <Helmet>
          <title>Tài khoản</title>
          <meta name="description" content="Thu Chi Sinh Viên" />
        </Helmet>
        <div className="rct-block ">
          <div className="collapse show">
            <div className="rct-full-block">
              <hr style={{ margin: "0px" }} />
              <div className="table-responsive">
                <div className="ant-page-header-heading">
                  <div className=" ant-page-header-heading-left">
                    <h4>
                      <span>Tài khoản</span>
                    </h4>
                  </div>
                  <span className="ant-page-header-heading-extra">
                    <Menu
                      onClick={handleClick}
                      selectedKeys={[current]}
                      mode="horizontal"
                    >
                      <Menu.Item key="setting:1">
                        <OrderedListOutlined />
                        Tài khoản sinh viên
                      </Menu.Item>
                      <Menu.Item key="setting:2">
                        <OrderedListOutlined />
                        Tài khoản giảng viên
                      </Menu.Item>
                      <Menu.Item key="setting:3">
                        <CreditCardOutlined />
                        Tài khoản hệ thống
                      </Menu.Item>
                    </Menu>
                  </span>
                </div>
                <hr style={{ margin: "0px", marginBottom: "15px" }} />
                {current === "setting:2" && <TeacherAccount />}
                {current === "setting:1" && (
                  <StudentAccount
                    departmentList={departmentList}
                    yearClassList={yearClassList}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountHome;
