import { Descriptions, Tabs } from "antd";
import React, { useEffect } from "react";
const FamilyInfo = (props) => {
    const enrollmentAreaDisplay = (value) => {
        if (value === 1) {
            return <>Khu vực 1 (KV1)</>;
        } else if (value === 2) {
            return <>Khu vực 2 (KV2)</>;
        } else if (value === 3) {
            return <>Khu vực 2 nông thôn (KV2-NT)</>;
        } else if (value === 4) {
            return <>Khu vực 3</>;
        } else {
            return <></>;
        }
    };

    if (props.record) {
        return (
            <div className="student-description-wrapper">
                <Descriptions layout="horizontal" column={6}>
                    <Descriptions.Item label="Họ và tên bố" span={3}>
                        {props.record.fatherName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Năm sinh" span={3}>
                        {props.record.fatherDateBirth}
                    </Descriptions.Item>
                </Descriptions>

                <Descriptions layout="horizontal" column={6}>
                    <Descriptions.Item label="Họ và tên mẹ" span={3}>
                        {props.record.motherName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Năm sinh" span={3}>
                        {props.record.motherDateBirth}
                    </Descriptions.Item>
                </Descriptions>
            </div>
        );
    }
    else {
        return <div></div>
    }
};

export default FamilyInfo;
