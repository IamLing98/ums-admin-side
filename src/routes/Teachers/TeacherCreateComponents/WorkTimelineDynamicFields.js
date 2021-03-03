import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Collapse, Input } from "antd";

const { Panel } = Collapse;

function DynamicField(props) {
  return (
    <Form.List name="teacherWorkTimeLineList">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <Collapse bordered={false} defaultActiveKey={["1"]}>
                <Panel header={`Đơn vị ${index + 1}`} key="1">
                  <div key={field.key}>
                    <Form.Item
                      name={[index, "startDate"]}
                      label="Năm Bắt Đầu"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập năm bắt đầu!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Năm bắt đầu..." showSearch>
                        {/* {props.departmentList.map((item, index) => {
                      return (
                        <Option key={index + "depOpts" + item.departmentId} value={item.departmentId}>
                          {" "}
                          {item.departmentName}{" "}
                        </Option>
                      );
                    })} */}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[index, "job"]}
                      label="Công Việc"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập công việc!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Công việc..." showSearch>
                        {/* {props.departmentList.map((item, index) => {
                      return (
                        <Option key={index + "depOpts" + item.departmentId} value={item.departmentId}>
                          {" "}
                          {item.departmentName}{" "}
                        </Option>
                      );
                    })} */}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[index, "workUnit"]}
                      label="Đơn Vị Đào Tạo"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập đơn vị đào tạo!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Đơn vị đào tạo..." showSearch>
                        {/* {props.departmentList.map((item, index) => {
                      return (
                        <Option key={index + "depOpts" + item.departmentId} value={item.departmentId}>
                          {" "}
                          {item.departmentName}{" "}
                        </Option>
                      );
                    })} */}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[index, "endDate"]}
                      label="Năm Kết Thúc"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập năm kết thúc!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Năm kết thúc..." showSearch>
                        {/* {props.departmentList.map((item, index) => {
                      return (
                        <Option key={index + "depOpts" + item.departmentId} value={item.departmentId}>
                          {" "}
                          {item.departmentName}{" "}
                        </Option>
                      );
                    })} */}
                      </Select>
                    </Form.Item>
                    {fields.length > 0 ? (
                      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
                        <Button
                          type="danger"
                          className="dynamic-delete-button"
                          onClick={() => remove(field.name)}
                          icon={<MinusCircleOutlined />}
                        >
                          Xoá trường
                        </Button>
                      </div>
                    ) : null}
                  </div>
                </Panel>
              </Collapse>
            ))}
            <Divider />
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <Form.Item>
                <Button type="dashed" onClick={() => add()}>
                  <PlusOutlined /> Thêm trường
                </Button>
              </Form.Item>
            </div>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;
