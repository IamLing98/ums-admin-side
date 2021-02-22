import React from "react";

const FeeCategoryGroup = (props) => {
  const { feeCategoryGroup } = props;

  function format(n) {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n)   
  }
  if (!feeCategoryGroup) {
    return <></>;
  } else
    return (
      <div className="rct-block ">
        <div className="rct-block-title ">
          <h4>
            <span>{feeCategoryGroup.feeCategoryGroupName}</span>{" "}
          </h4>
        </div>
        <ul className="MuiList-root p-0 fs-14 MuiList-padding">
          {feeCategoryGroup.feeCategoryList.map((feeCategory, index) => {
            return (
              <li
                className="MuiListItem-root d-flex justify-content-between border-bottom  align-items-center p-15 MuiListItem-gutters"
                key={feeCategory.id + feeCategoryGroup.feeCategoryGroupId}
              >
                <span>
                  <i className="material-icons mr-25 fs-14 text-primary">access_time</i>
                  <span>{feeCategory.feeCategoryName}</span>
                </span>
                <span>{format(feeCategory.value)   }</span>
              </li>
            );
          })}
        </ul>
      </div>
    );
};

export default FeeCategoryGroup;
