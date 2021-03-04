import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Collapse, Input } from "antd";

const { Panel } = Collapse;

const educationLevelOptions = [
  { level: 0, name: "Đại học" },
  { level: 1, name: "Thạc sỹ" },
  { level: 2, name: "Tiến sỹ" },
];
function DynamicField(props) {
  return (
    <Form.List name="teacherEducationTimeLineList">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <Collapse bordered={false} defaultActiveKey={"Collapse teacherEducationTimeLineList " + index + 1}>
                <Panel header={`Đơn vị ${index + 1}`} key={"teacherEducationTimeLineListPanel" + index + 1}>
                  <div key={field.key}>
                    <Form.Item
                      name={[index, "educationLevel"]}
                      label="Bậc Đào Tạo"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng chọn bậc đào tạo!!!" }]}
                    >
                      <Select allowClear style={{ width: "100%" }} placeholder="Bậc đào tạo..." showSearch>
                        {educationLevelOptions.map((item, index) => {
                          return (
                            <Option key={index + "educationLevelOptios" + index} value={item.level}>
                              {item.name}
                            </Option>
                          );
                        })}
                      </Select>
                    </Form.Item>
                    <Form.Item
                      name={[index, "branchName"]}
                      label="C.Ngành Đào Tạo"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập ngành đào tạo!!!" }]}
                    >
                      <Input allowClear style={{ width: "100%" }} placeholder="Chuyên ngành đào tạo..." />
                    </Form.Item>
                    <Form.Item
                      name={[index, "educationPlace"]}
                      label="Cơ Sở Đào Tạo"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập cơ sở đào tạo!!!" }]}
                    >
                      <Input allowClear style={{ width: "100%" }} placeholder="Cơ sở đào tạo..." />
                    </Form.Item>
                    <Form.Item
                      name={[index, "graduationYear"]}
                      label="Năm Tốt Nghiệp"
                      hasFeedback
                      rules={[{ required: true, message: "Vui lòng nhập năm tốt nghiệp!!!" }]}
                    >
                      <Input allowClear style={{ width: "100%" }} placeholder="Năm tốt nghiệp..." type="number" />
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
