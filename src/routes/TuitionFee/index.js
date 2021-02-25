import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import moment from "moment";
import { CreditCardOutlined, OrderedListOutlined,SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import InFeeStudent from "./InFeeStudents";
import InFeeReceiptStudentPrint from "../../util/InFeeReceiptStudentPrint";

const TuitionFeeHome = (props) => {
  const [current, setCurrent] = useState("setting:1");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <div className="data-table-wrapper">
        <Helmet>
          <title>Thu Chi Sinh Viên</title>
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
                      <span>Thu chi sinh viên</span>
                    </h4>
                  </div>
                  <span className="ant-page-header-heading-extra">
                    <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                      <Menu.Item key="setting:1">
                        <OrderedListOutlined />
                        Thu chi tiền
                      </Menu.Item>
                      <Menu.Item key="setting:4">
                        <OrderedListOutlined />
                        Kiểm kê
                      </Menu.Item>
                      <Menu.Item key="setting:5">
                        <CreditCardOutlined />
                        Báo cáo
                      </Menu.Item>
                      <Menu.Item key="setting:2">
                        <SettingOutlined />
                        Cài đặt
                      </Menu.Item>
                    </Menu>
                  </span>
                </div>
                <hr style={{ margin: "0px", marginBottom: "15px" }} />
                {current === "setting:1" && <InFeeStudent />}
                {current === "setting:2" && <InFeeReceiptStudentPrint />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TuitionFeeHome;
