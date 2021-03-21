import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { OrderedListOutlined } from "@ant-design/icons";
import { Button, TreeSelect, Modal, Select, Menu } from "antd";
import TermResult from "./TermResult"; 
import Graduation from './Graduation';

export const ResultsHome = (props) => {
  const [current, setCurrent] = useState("setting:1");
    
  const handleClick = (e) => {setCurrent(e.key)}

  return (
    <div className="data-table-wrapper">
      <Helmet>
        <title>Kết Quả Học Tập</title>
        <meta name="description" content="Danh Sách Giảng Viên" />
      </Helmet>
      <div className="rct-block ">
        <div className="collapse show">
          <div className="rct-full-block">
            <hr style={{ margin: "0px" }} />
            <div className="table-responsive">
              <div className="ant-page-header-heading">
                <div className="ant-page-header-heading-left">
                  <h4>
                    <span>Kết quả học tập</span>
                  </h4>
                </div>
                <span className="ant-page-header-heading-extra">
                  <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                    <Menu.Item key="setting:1">
                      <OrderedListOutlined />
                      Kết Quả Theo Kỳ
                    </Menu.Item>
                    <Menu.Item key="setting:2">
                      <OrderedListOutlined />
                      Xét Tốt Nghiệp
                    </Menu.Item>
                  </Menu>
                </span>
              </div>
              <hr style={{ margin: "0px", marginBottom: "15px" }} />
              {current === "setting:1" && <TermResult />}
              {current === "setting:2" && <Graduation />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsHome;
