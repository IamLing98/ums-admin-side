import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import MultiSelect from "react-multi-select-component";
import { Button, Space, Modal } from "antd";
import "Routes/EducationProgram/Programs/Components/style.scss";
import { FormGroup, Input, Label } from "reactstrap";

const UpdateEducationProgramSubject = (props) => {
  const [selected1, setSelected1] = useState([]);

  const [selected2, setSelected2] = useState([]);

  const handleOkOnClick = () => {
    const { record } = props;
    var listSubject = [];
    const educationProgramId = record.educationProgramId;
    selected1.map((item) => {
      let element = {
        educationProgramId: educationProgramId,
        subject: {
          subjectId: item.value,
        },
        transactionType: "1",
      };
      listSubject.push(element);
    });
    selected2.map((item) => {
      let element = {
        educationProgramId: educationProgramId,
        subject: {
          subjectId: item.value,
        },
        transactionType: "2",
      };
      listSubject.push(element);
    });
    // selected3.map(
    //     item => {
    //         let element = {
    //             educationProgramId: educationProgramId,
    //             subjectId: item.value,
    //             subjectName: item.label,
    //             subjectType: "3"
    //         }
    //         listSubject.push(element);

    //     }
    // );
    // selected4.map(
    //     item => {
    //         let element = {
    //             educationProgramId: educationProgramId,
    //             subjectId: item.value,
    //             subjectName: item.label,
    //             subjectType: "4"
    //         }
    //         listSubject.push(element);

    //     }
    // );
    var object = {
      ...props.record,
      subjectList: listSubject,
    };
    props.onOk(object);
  };

  useEffect(() => {
    var selected1 = [];
    var selected2 = [];
    props.selectedSubjectList.map((item) => {
      let subject = {
        transactionType: item.transactionType,
        value: item.subject.subjectId,
        label: item.subject.subjectName,
        ...item.subject,
      };
      if (item.transactionType === "1") selected1.push(subject);
      if (item.transactionType === "2") selected2.push(subject);
    });
    setSelected1(selected1);
    setSelected2(selected2);
  }, [props.visible]);
  return (
    <Modal
      title="Cập Nhật Học Phần Liên Quan"
      visible={props.visible}
      onOk={() => handleOkOnClick()}
      onCancel={props.back}
      okButtonProps={{ disabled: false }}
      cancelButtonProps={{ disabled: false }}
      maskClosable={false}
      okText="Tạo Mới"
      cancelText="Đóng"
      destroyOnClose={true}
      closable={false}
      width="60%"
      // confirmLoading={true}
    >
      <div className="ant-row ant-form-item" style={{ margin: "0rem 0rem" }}>
        <div
          className="ant-col ant-col-4 ant-form-item-label"
          style={{ flex: "none" }}
        >
          <label title="Kỳ học: " style={{ fontWeight: "500" }}>
            Kỳ học:{" "}
          </label>
        </div>
        <div className="ant-col ant-col-2 ant-form-item-control">
          <select className="ant-input">
            <option>Kỳ 1</option>
          </select>
        </div>
      </div>

      <Row style={{ display: "flex", flexDirection: "row" }}>
        <Col className="update-subject-divide">
          <div className="subject-column-header">Học Phần Bắt Buộc</div>
          <div className="update-subject-select">
            <MultiSelect
              options={props.options}
              value={selected1}
              onChange={setSelected1}
              labelledBy={"Học Phần Tương Đương..."}
              style={{ width: "100%" }}
              overrideStrings={{
                selectSomeItems: "Lựa Chọn Học Phần...",
                allItemsAreSelected: "Đã Chọn Tất Cả.",
                selectAll: "Chọn Hết",
                search: "Tìm Kiếm",
              }}
            />
          </div>
          <div className="update-subject-result">
            <ul className="MuiList-root MuiList-padding">
              {selected1.map((item, index) => (
                <>
                  <li className="MuiListItem-container" key={"li" + item.value}>
                    <div
                      className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button MuiListItem-secondaryAction"
                      tabIndex={0}
                      role="button"
                      aria-disabled="false"
                    >
                      <div className="MuiListItemAvatar-root">
                        {/* <div className="MuiAvatar-root MuiAvatar-circle bg-primary MuiAvatar-colorDefault">
                                                        <i className="zmdi zmdi-star" />  
                                                    </div> */}
                        {`${"\t" + index + ". "}`}
                      </div>
                      <div className="MuiListItemText-root">
                        <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
                          {item.label}
                        </span>
                      </div>
                      <span className="MuiTouchRipple-root" />
                    </div>
                    <div
                      className="MuiListItemSecondaryAction-root"
                      key={"spannn" + item.value}
                    >
                      <button
                        className="MuiButtonBase-root MuiIconButton-root"
                        tabIndex={0}
                        type="button"
                        aria-label="Delete"
                      >
                        <span
                          className="MuiIconButton-label"
                          onClick={() => { 
                            const value = item.value;
                            var newSelected = selected1.filter(function(
                              element
                            ) {
                              return element.value !== value;
                            });
                            setSelected1(newSelected);
                          }}
                        >
                          <i className="zmdi zmdi-delete text-primary" />
                        </span>
                        <span className="MuiTouchRipple-root" />
                      </button>
                    </div>
                  </li>
                  <hr style={{ margin: "0" }} />
                </>
              ))}
            </ul>
          </div>
        </Col>
        <Col className="update-subject-divide">
          <div className="subject-column-header ">
            <span>Học Phần Tự Chọn</span>
          </div>
          <div className="update-subject-select">
            <MultiSelect
              options={props.options}
              value={selected2}
              onChange={setSelected2}
              labelledBy={"Học Phần Tương Đương..."}
              style={{ width: "100%" }}
              overrideStrings={{
                selectSomeItems: "Lựa Chọn Học Phần...",
                allItemsAreSelected: "Đã Chọn Tất Cả.",
                selectAll: "Chọn Hết",
                search: "Tìm Kiếm",
              }}
            />
          </div>
          <div className="update-subject-result">
            <ul className="MuiList-root MuiList-padding">
              {selected2.map((item, index) => (
                <>
                  <li className="MuiListItem-container" key={"li" + item.value}>
                    <div
                      className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button MuiListItem-secondaryAction"
                      tabIndex={0}
                      role="button"
                      aria-disabled="false"
                    >
                      <div className="MuiListItemAvatar-root">
                        {/* <div className="MuiAvatar-root MuiAvatar-circle bg-primary MuiAvatar-colorDefault">
                                                        <i className="zmdi zmdi-star" />  
                                                    </div> */}
                        {`${"\t" + index + ". "}`}
                      </div>
                      <div className="MuiListItemText-root">
                        <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
                          {item.label}
                        </span>
                      </div>
                      <span className="MuiTouchRipple-root" />
                    </div>
                    <div
                      className="MuiListItemSecondaryAction-root"
                      key={"spannn" + item.value}
                    >
                      <button
                        className="MuiButtonBase-root MuiIconButton-root"
                        tabIndex={0}
                        type="button"
                        aria-label="Delete"
                      >
                        <span
                          className="MuiIconButton-label"
                          onClick={() => {
                            const value = item.value;
                            var newSelected = selected2.filter(function(
                              element
                            ) {
                              return element.value !== value;
                            });
                            setSelected2(newSelected);
                          }}
                        >
                          <i className="zmdi zmdi-delete text-primary" />
                        </span>
                        <span className="MuiTouchRipple-root" />
                      </button>
                    </div>
                  </li>
                  <hr style={{ margin: "0" }} />
                </>
              ))}
            </ul>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default UpdateEducationProgramSubject;
