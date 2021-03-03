import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Collapse, Input } from "antd";

const { Panel } = Collapse;

function DynamicField(props) {
  return (
    <Form.List name="teacherEducationTimeLineList">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <Collapse bordered={false} defaultActiveKey={["1"]}>
                <Panel header={`Đơn vị ${index + 1}`} key="1">
                  <div key={field.key}>
                    <Form.Item
                      name={[index, "educationLevel"]}
                      label="Bậc Đào Tạo"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng chọn bậc đào tạo!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Bậc đào tạo..." showSearch>
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
                      name={[index, "branchName"]}
                      label="C.Ngành Đào Tạo"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập ngành đào tạo!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Chuyên ngành đào tạo..." showSearch>
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
                      name={[index, "educationLevel"]}
                      label="Cơ Sở Đào Tạo"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập cơ sở đào tạo!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Cở sở đào tạo..." showSearch>
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
                      name={[index, "graduationYear"]}
                      label="Năm Tốt Nghiệp"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập năm tốt nghiệp!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Năm tốt nghiệp..." showSearch>
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
