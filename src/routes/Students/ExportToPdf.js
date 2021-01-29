import React, { useState, useEffect } from "react";

import Pdf from "react-to-pdf";
import "./ExportPDF.scss";
import { Drawer, Select, DatePicker, Table } from "antd";
import { Form, Row, Col, Input, Button } from "antd";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";

const ref = React.createRef();
const ToPdf = (props) => {
  const [title, setTitle] = useState("");

  const [list, setList] = useState([]);

  const [type, setType] = useState(undefined);

  useEffect(() => {
    let newList = [];
    for (var i = 0; i < props.selectedRowKeys.length; i++) {
      for (var j = 0; j < props.studentList.length; j++) {
        if (props.studentList[j].studentId === props.selectedRowKeys[i])
          newList.push(props.studentList[j]);
      }
    }
    setList(newList);
    console.log(newList);
  }, [props.selectedRowKeys]);
  return (
    <>
      <Drawer
        title="Thông tin sinh viên"
        width={"50%"}
        onClose={() => props.setShowModalPDF(false)}
        visible={props.visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={
          <div
            style={{
              textAlign: "right",
            }}
          >
            <Button
              onClick={() => props.setShowModalPDF(false)}
              style={{ marginRight: 8 }}
            >
              Quay lại
            </Button>

            <Pdf targetRef={ref} filename={`${title}.pdf`}>
              {({ toPdf }) => <Button onClick={toPdf}>Generate Pdf</Button>}
            </Pdf>
          </div>
        }
      >
        <Row gutter={[16, 24]}>
          <Col span={12}>
            <Form.Item name="subjectForLevel" label="Tên danh sách" hasFeedback>
              <Input
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                placeholder="Tên danh sách"
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            {" "}
            <Form.Item
              name="subjectForLevel"
              label="Loại danh sách"
              hasFeedback
            >
              <Select
                allowClear
                style={{ width: "100%" }}
                placeholder="Loại danh sách..."
                onChange={(value) => setType(value)}
                value={type}
              >
                <Option key={"lver" + 1} value={1}>
                  Danh sách học bổng
                </Option>
                <Option key={"lver" + 2} value={2}>
                  Danh sách lớp niên khoá
                </Option>
                <Option key={"lver" + 3} value={3}>
                  Danh sách đình chỉ học tập
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <div className="toPDF">
          <page
            size="A4"
            style={{ padding: "20px", backGroundColor: "white" }}
            ref={ref}
          >
            <div>
              <table
                cellPadding={0}
                cellSpacing={0}
                style={{
                  marginRight: "calc(1%)",
                  marginLeft: "9pt",
                  borderCollapse: "collapse",
                  float: "left",
                  width: "98%",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        width: "41.3497%",
                        paddingRight: "5.4pt",
                        paddingLeft: "5.4pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "center",
                          fontSize: "13pt",
                        }}
                      >
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          BỘ GIÁO DỤC VÀ ĐÀO TẠO
                        </span>
                      </p>
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "center",
                          fontSize: "13pt",
                        }}
                      >
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          TRƯỜNG ĐẠI HỌC PHƯƠNG ĐÔNG
                        </span>
                      </p>
                    </td>
                    <td
                      style={{
                        width: "58.5276%",
                        paddingRight: "5.4pt",
                        paddingLeft: "5.4pt",
                        verticalAlign: "top",
                      }}
                    >
                      <p
                        style={{
                          marginTop: "0pt",
                          marginBottom: "0pt",
                          textAlign: "center",
                          fontSize: "13pt",
                        }}
                      >
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                        </span>
                        <br />
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          Độc lập –
                        </span>
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          &nbsp;&nbsp;
                        </span>
                        <span style={{ fontFamily: '"Times New Roman"' }}>
                          Tự do – Hạnh phúc
                        </span>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "10pt",
                  textIndent: "36pt",
                  textAlign: "center",
                  lineHeight: "115%",
                  fontSize: "7pt",
                }}
              >
                <strong>
                  <span style={{ fontFamily: '"Times New Roman"' }}>
                    &nbsp;
                  </span>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "10pt",
                  textIndent: "36pt",
                  textAlign: "center",
                  lineHeight: "115%",
                  fontSize: "26pt",
                }}
              >
                <br />
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "10pt",
                  textIndent: "36pt",
                  textAlign: "center",
                  lineHeight: "115%",
                  fontSize: "26pt",
                }}
              >
                <strong>
                  <span style={{ fontFamily: '"Times New Roman"' }}>
                    DANH SÁCH SINH VIÊN
                  </span>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "10pt",
                  textAlign: "center",
                  lineHeight: "115%",
                  fontSize: "14pt",
                }}
              >
                <strong>
                  <span style={{ fontFamily: '"Times New Roman"' }}>
                    {title}
                  </span>
                </strong>
              </p>
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "10pt",
                  lineHeight: "115%",
                  fontSize: "10pt",
                }}
              >
                <span style={{ fontFamily: '"Times New Roman"' }}>&nbsp;</span>
              </p>
              {/* table */}
              {type === 2 && (
                <table
                  style={{
                    width: "92%",
                    borderCollapse: "collapse",
                    border: "1px solid rgb(0, 0, 0)",
                    marginLeft: "calc(5%)",
                    marginRight: "calc(3%)",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: "5.4381%",
                          border: "1px solid rgb(0, 0, 0)",
                        }}
                      >
                        STT
                      </th>
                      <th
                        style={{
                          width: "16.9184%",
                          border: "1px solid rgb(0, 0, 0)",
                        }}
                      >
                        Mã sinh viên
                      </th>
                      <th
                        style={{
                          width: "27.4924%",
                          border: "1px solid rgb(0, 0, 0)",
                        }}
                      >
                        Họ và tên&nbsp;
                      </th>
                      <th
                        style={{
                          width: "11.3293%",
                          border: "1px solid rgb(0, 0, 0)",
                        }}
                      >
                        Giới tính
                      </th>
                      <th
                        style={{
                          width: "13.8973%",
                          border: "1px solid rgb(0, 0, 0)",
                        }}
                      >
                        Ngày sinh
                      </th>
                      <th
                        style={{
                          width: "13.2931%",
                          border: "1px solid rgb(0, 0, 0)",
                        }}
                      >
                        Quê quán
                      </th>
                      <th
                        style={{
                          width: "11.6314%",
                          border: "1px solid rgb(0, 0, 0)",
                        }}
                      >
                        Số điện thoại
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => (
                      <tr>
                        <td
                          style={{
                            width: "5.4381%",
                            border: "1px solid rgb(0, 0, 0)",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                            {index + 1}
                          </div>
                        </td>
                        <td
                          style={{
                            width: "16.9184%",
                            border: "1px solid rgb(0, 0, 0)",
                          }}
                        >
                          <div style={{ textAlign: "center" }}>
                          {item.studentId }
                          </div>
                        </td>
                        <td
                          style={{
                            width: "27.4924%",
                            border: "1px solid rgb(0, 0, 0)",
                          }}
                        >
                         {item.fullName }
                        </td>
                        <td
                          style={{
                            width: "11.3293%",
                            border: "1px solid rgb(0, 0, 0)",
                          }}
                        >
                          <br />
                        </td>
                        <td
                          style={{
                            width: "13.8973%",
                            border: "1px solid rgb(0, 0, 0)",
                          }}
                        >
                          <br />
                        </td>
                        <td
                          style={{
                            width: "13.2931%",
                            border: "1px solid rgb(0, 0, 0)",
                          }}
                        >
                          <br />
                        </td>
                        <td
                          style={{
                            width: "11.6314%",
                            border: "1px solid rgb(0, 0, 0)",
                          }}
                        >
                          <br />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              {/* type == 2 */}
              {type == 1 && (
                <table
                  style={{
                    width: "92%",
                    borderCollapse: "collapse",
                    border: "1px solid rgb(0, 0, 0)",
                    marginLeft: "calc(5%)",
                    marginRight: "calc(3%)",
                  }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          width: "4.6815%",
                          border: "1px solid rgb(0, 0, 0)",
                          textAlign: "center",
                        }}
                      >
                        STT
                      </th>
                      <th
                        style={{
                          width: "14.4126%",
                          border: "1px solid rgb(0, 0, 0)",
                          textAlign: "center",
                        }}
                      >
                        Mã sinh viên
                      </th>
                      <th
                        style={{
                          width: "23.2314%",
                          border: "1px solid rgb(0, 0, 0)",
                          textAlign: "center",
                        }}
                      >
                        Họ và tên
                      </th>
                      <th
                        style={{
                          width: "13.5003%",
                          border: "1px solid rgb(0, 0, 0)",
                          textAlign: "center",
                        }}
                      >
                        Lớp
                      </th>
                      <th
                        style={{
                          width: "7.9386%",
                          border: "1px solid rgb(0, 0, 0)",
                          textAlign: "center",
                        }}
                      >
                        Tín chỉ
                      </th>
                      <th
                        style={{
                          width: "8.5787%",
                          border: "1px solid rgb(0, 0, 0)",
                          textAlign: "center",
                        }}
                      >
                        Điểm RL
                      </th>
                      <th
                        style={{
                          width: "9.9312%",
                          border: "1px solid rgb(0, 0, 0)",
                          textAlign: "center",
                        }}
                      >
                        Điểm TB
                      </th>
                      <th
                        style={{
                          width: "17.4696%",
                          border: "1px solid rgb(0, 0, 0)",
                          textAlign: "center",
                        }}
                      >
                        Học bổng
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {list.map((item, index) => {
                      return (
                        <tr>
                          <td
                            style={{
                              width: "4.6815%",
                              border: "1px solid rgb(0, 0, 0)",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {index + 1}
                            </div>
                          </td>
                          <td
                            style={{
                              width: "14.4126%",
                              border: "1px solid rgb(0, 0, 0)",
                              textAlign: "center",
                            }}
                          >
                            <div style={{ textAlign: "center" }}>
                              {item.studentId}
                            </div>
                          </td>
                          <td
                            style={{
                              width: "23.2314%",
                              border: "1px solid rgb(0, 0, 0)",
                              textAlign: "center",
                            }}
                          >
                            {item.fullName}
                          </td>
                          <td
                            style={{
                              width: "13.5003%",
                              border: "1px solid rgb(0, 0, 0)",
                              textAlign: "center",
                            }}
                          ></td>
                          <td
                            style={{
                              width: "7.9386%",
                              border: "1px solid rgb(0, 0, 0)",
                              textAlign: "center",
                            }}
                          >
                            {item.yearClassId}
                          </td>
                          <td
                            style={{
                              width: "8.5787%",
                              border: "1px solid rgb(0, 0, 0)",
                              textAlign: "center",
                            }}
                          ></td>
                          <td
                            style={{
                              width: "9.9312%",
                              border: "1px solid rgb(0, 0, 0)",
                              textAlign: "center",
                            }}
                          ></td>
                          <td
                            style={{
                              width: "17.4696%",
                              border: "1px solid rgb(0, 0, 0)",
                              textAlign: "center",
                            }}
                          ></td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              <br />
              <p
                style={{
                  marginTop: "0pt",
                  marginBottom: "10pt",
                  lineHeight: "115%",
                  fontSize: "14pt",
                }}
              >
                <span style={{ width: "280.88pt", display: "inline-block" }}>
                  &nbsp;
                </span>
                <span style={{ fontFamily: '"Times New Roman"' }}>
                  Hà Nội, ngày 29 tháng 1 năm 2021
                </span>
              </p>
              <div style={{ clear: "both" }}>
                <p
                  style={{
                    marginTop: "0pt",
                    marginBottom: "0pt",
                    fontSize: "10pt",
                  }}
                >
                  <span style={{ fontFamily: '"Times New Roman"' }}>
                    &nbsp;
                  </span>
                </p>
              </div>
            </div>
          </page>
        </div>
      </Drawer>
    </>
  );
};


export default ToPdf;
