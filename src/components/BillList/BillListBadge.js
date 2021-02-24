import React from "react";
import "./style.scss";

const BillListBadge = (props) => {
  function format(n) {
    return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(n);
  }
  return (
    <div className="w-1/3" style={props.style}>
      <div className="remain-overview">
        <div className="remain-overview-data inner-overview-data">
          <div className="overview-data-number flex">
            <div className="total-money">{format(props.number)}</div>
          </div>
          <div data-v-5a9a1269 data-v-135b2dee className="label-overview">
            {props.text}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillListBadge;
