import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { NotificationManager } from "react-notifications";
import moment from "moment";
import { CreditCardOutlined, OrderedListOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import { Row, Col } from "reactstrap";

const FeeCategoriesHome = (props) => {
  const [current, setCurrent] = useState("setting:1");

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <>
      <div className="data-table-wrapper">
        <Helmet>
          <title>Danh Mục Thu Chi</title>
          <meta name="description" content="Danh Mục Thu Chi" />
        </Helmet> 
        <Row>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="rct-block ">
              <div className="rct-block-title pb-0">
                <h4>Khoản thu</h4>
              </div>
              <hr style={{ margin: "0px", marginBottom: "0px" }} />
              <div class="rct-block-content "></div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="rct-block ">
              <div className="rct-block-title pb-0">
                <h4>Khoản chi</h4>
              </div>
              <hr style={{ margin: "0px", marginBottom: "0px" }} />
              <div class="rct-block-content "></div>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
};

export default FeeCategoriesHome;
