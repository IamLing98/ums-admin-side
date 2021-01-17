import React, { useState, useEffect } from "react";
import {
  Result,
  Button,
  Modal,
  Tag,
  Table,
  Input,
  Form,
  Select,
  DatePicker,
  Badge,
  Space,
  Popconfirm,
} from "antd";
import { LockOutlined, SmileOutlined } from "@ant-design/icons";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  PlusOutlined,
  SearchOutlined,
  CloseCircleOutlined,
  LockFilled,
  UnlockFilled,
  BranchesOutlined,
  DeleteFilled,
} from "@ant-design/icons";
import { Row, Col } from "reactstrap";
import CreateSubjectClass from "./CreateSubjectClass";

const { RangePicker } = DatePicker;

const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Vui lòng chọn các mốc thời gian!",
    },
  ],
};

const StepOne = (props) => {
  const [form] = Form.useForm();

  const [subjectSubmitFormVisible, setSubjectSubmitFormVisible] = useState(
    false
  );

  const [submittingInfo, setSubmittingInfo] = useState([]);

  const getSubmittingInfo = (termId) => {
    api
      .get("/subjectsRegistration/" + termId)
      .then((res) => {
        res.forEach(function(element) {
          if (
            element.discussNumber ||
            element.exerciseNumber ||
            element.practiceNumber
          ) {
            if (element.theoryNumber) element.subjectType = "BOTH";
            else element.subjectType = "ONLYPRACTICE";
          } else element.subjectType = "ONLYTHEORY";
        });
        console.log(res);
        setSubmittingInfo(res);
      })
      .catch((err) => console.log(err));
  };

  const handleSubjectSubmittingOpen = (values) => {
    let subjectSubmittingStartDate = values["rangeTime"][0].format(
      "YYYY-MM-DD"
    );
    let subjectSubmittingEndDate = values["rangeTime"][1].format("YYYY-MM-DD");
    let termObj = { ...props.term };
    termObj.subjectSubmittingStartDate = subjectSubmittingStartDate;
    termObj.subjectSubmittingEndDate = subjectSubmittingEndDate;
    termObj.actionType = "SSON";
    api
      .put(`/terms/${termObj.id}`, termObj, true)
      .then((res) => {
        NotificationManager.success(
          "Mở đăng ký học phần thành công thành công"
        );
        setSubjectSubmitFormVisible(false);
        api.get(`/terms/${termObj.id}`, true).then((res) => {
          props.setIsShowDetail(res);
          getSubmittingInfo(termObj.id);
        });
      })
      .catch((error) => {
        NotificationManager.error(error.response.data.message);
        if (error.response.status === 403) {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.response.status === "Lỗi xác thực") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  const handleSubjectSubmittingClose = () => {
    let subjectSubmittingEndDate = new Date().toISOString().substring(0, 10);
    console.log(subjectSubmittingEndDate);
    let termObj = { ...props.term };
    termObj.subjectSubmittingEndDate = subjectSubmittingEndDate;
    termObj.actionType = "SSOFF";
    api
      .put(`/terms/${termObj.id}`, termObj, true)
      .then((res) => {
        NotificationManager.success(
          "Đóng đăng ký học phần thành công thành công"
        );
        setSubjectSubmitFormVisible(false);
        api.get(`/terms/${termObj.id}`, true).then((res) => {
          props.setIsShowDetail(res);
          getSubmittingInfo(termObj.id);
        });
      })
      .catch((error) => {
        NotificationManager.error(error.response.data.message);
        if (error.response.status === 403) {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.response.status === "Lỗi xác thực") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  useEffect(() => {
    getSubmittingInfo(props.term.id);
  }, []);

  if (props.term.progress === 11) {
    return (
      <div>
        <Result
          icon={<SmileOutlined />}
          title="Bắt đầu Tên học phần mới bằng việc mở đăng ký học phần!"
          extra={
            <Button
              type="primary"
              onClick={() => setSubjectSubmitFormVisible(true)}
            >
              Mở DKHP
            </Button>
          }
        />
        <Modal
          title="Mở Đăng Ký Học Phần"
          visible={subjectSubmitFormVisible}
          onOk={() => {
            form
              .validateFields()
              .then((values) => {
                form.resetFields();
                handleSubjectSubmittingOpen(values);
              })
              .catch((info) => {
                console.log("Validate Failed:", info);
              });
          }}
          onCancel={() => setSubjectSubmitFormVisible(false)}
          maskClosable={false}
          okText="Mở đăng ký"
          cancelText="Đóng"
          destroyOnClose={true}
          closable={false}
          centered
        >
          <Form
            form={form}
            onFieldsChange={(changedFields, allFields) => {}}
            preserve={false}
            onValuesChange={(changedValues, allValues) => {}}
          >
            <Form.Item name="rangeTime" label="Thời gian" {...rangeConfig}>
              <RangePicker style={{ width: "100%" }} />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    );
  } else if (props.term.progress === 12) {
    const columnsInSubmittingOpen = [
      {
        title: "Mã học phần",
        dataIndex: "subjectId",
      },
      {
        title: "Tên học phần",
        dataIndex: "subjectName",
      },
      {
        title: "Khoa phụ trách",
        dataIndex: "term",
        width: "20%",
      },
      {
        title: "Số lượng đăng ký",
        dataIndex: "totalSubmit",
        width: "40%",
        align: "center",
        render: (text, record) => {
          return (
            <Space>
              Dự đoán:
              <Badge
                count={record.predictSubmit}
                showZero={true}
                overflowCount={10000}
                title={"Số lượng dự đoán"}
              />
              Tổng số:
              <Badge
                count={record.totalSubmit}
                showZero={true}
                overflowCount={10000}
                title={"Tổng số đăng ký"}
              />
              Tự động:
              <Badge
                count={record.autoSubmit}
                style={{ backgroundColor: "#52c41a" }}
                showZero={true}
                overflowCount={10000}
                title={"Tự động đăng ký"}
              />
            </Space>
          );
        },
      },
    ];

    return (
      <>
        <Row>
          <Col
            md={6}
            sm={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Row>
              <Col md={4}>
                <Input placeholder="Mã học phần..." size="middle" />
              </Col>
              <Col md={4}>
                <Input placeholder="Tên học phần..." size="middle" />
              </Col>
              <Col md={4} style={{ display: "block", flexDirection: "column" }}>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary"
                  //onClick={() => setShowModalCreate(true)}
                >
                  <SearchOutlined />
                  <span>Tìm Kiếm</span>
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className="tableListOperator"
              style={{ textAlign: "right", width: "100%" }}
            >
              {/* <button
                type="button"
                className="ant-btn ant-btn-primary"
                // onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Mở nhiều lớp </span>
              </button>
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                // onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Đăng ký khoá mới </span>
              </button> */}
              <Button
                type="primary"
                onClick={() => handleSubjectSubmittingClose()}
                danger
              >
                <CloseCircleOutlined />
                <span>Kết thúc đăng ký</span>
              </Button>
            </div>
          </Col>
        </Row>
        <Table
          columns={columnsInSubmittingOpen}
          dataSource={submittingInfo}
          rowKey="subjectId"
          bordered
          pagination={{ pageSize: 10 }}
          size="small"
          locale={{
            emptyText: (
              <div className="ant-empty ant-empty-normal">
                <div className="ant-empty-image">
                  <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                  <p className="ant-empty-description">
                    Không có dữ liệu đăng ký học phần
                  </p>
                </div>
              </div>
            ),
          }}
        />
      </>
    );
  } else if (props.term.progress === 13) {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    const onSelectChange = (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    };

    const [
      showSubjectClassCreateModal,
      setShowSubjectClassCreateModal,
    ] = useState(false);

    const [subjectToCreateClass, setSubjectToCreateClass] = useState(null);

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange,
      selections: [
        Table.SELECTION_ALL,
        Table.SELECTION_INVERT,
        {
          key: "odd",
          text: "Select Odd Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return false;
              }
              return true;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          },
        },
        {
          key: "even",
          text: "Select Even Row",
          onSelect: (changableRowKeys) => {
            let newSelectedRowKeys = [];
            newSelectedRowKeys = changableRowKeys.filter((key, index) => {
              if (index % 2 !== 0) {
                return true;
              }
              return false;
            });
            setSelectedRowKeys(newSelectedRowKeys);
          },
        },
      ],
    };

    const columnsInSubmittingClose = [
      {
        title: "Mã học phần",
        dataIndex: "subjectId",
      },
      {
        title: "Tên học phần",
        dataIndex: "subjectName",
      },
      {
        title: "Khoa phụ trách",
        dataIndex: "term",
      },
      {
        title: "Loại học phần",
        dataIndex: "subjectType",
        render: (text, record) => {
          // check thực hành/thí nghiệm/thảo luận
          if (text === "BOTH") {
            return <>Lý thuyết/Thực hành</>;
          } else if (text === "ONLYTHEORY") {
            return <>Lý thuyết</>;
          } else if (text === "ONLYPRACTICE") {
            return <>Thực hành</>;
          }
        },
      },
      {
        title: "Số lượng đăng ký",
        dataIndex: "totalSubmit",
        width: "30%",
        align: "center",
        render: (text, record) => {
          return (
            <Space>
              Dự đoán:
              <Badge
                count={record.predictSubmit}
                showZero={true}
                overflowCount={10000}
                title={"Số lượng dự đoán"}
              />
              Tổng số:
              <Badge
                count={record.totalSubmit}
                showZero={true}
                overflowCount={10000}
                title={"Tổng số đăng ký"}
              />
              Tự động:
              <Badge
                count={record.autoSubmit}
                style={{ backgroundColor: "#52c41a" }}
                showZero={true}
                overflowCount={10000}
                title={"Tự động đăng ký"}
              />
            </Space>
          );
        },
      },
      {
        title: "Số lớp đã mở",
        dataIndex: "totalSubjectClassOpened",
      },
      {
        title: "Thao tác",
        dataIndex: "term",
        width: "15%",
        render: (text, record) => (
          <Space size="middle">
            <Button
              type=""
              onClick={() => {
                setShowSubjectClassCreateModal(true);
                setSubjectToCreateClass(record);
              }}
            >
              <BranchesOutlined />
            </Button>
            <Button
              type=""
              onClick={() => {
                setRecordUpdate(record);
                setShowModalUpdate(true);
              }}
            >
              <LockOutlined />
            </Button>
            <Popconfirm
              placement="left"
              title={"Chắc chắn xoá?"}
              onConfirm={() => handleDeleteRecord(record)}
              okText="Ok"
              cancelText="Không"
            >
              <Button type="">
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
        ),
      },
    ];

    return (
      <>
        <Row>
          <Col
            md={6}
            sm={12}
            style={{ display: "flex", flexDirection: "column" }}
          >
            <Row>
              <Col md={4}>
                <Input placeholder="Mã học phần..." size="middle" />
              </Col>
              <Col md={4}>
                <Input placeholder="Tên học phần..." size="middle" />
              </Col>
              <Col md={4} style={{ display: "block", flexDirection: "column" }}>
                <button
                  type="button"
                  className="ant-btn ant-btn-primary"
                  //onClick={() => setShowModalCreate(true)}
                >
                  <SearchOutlined />
                  <span>Tìm Kiếm</span>
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={6} sm={12} xs={12}>
            <div
              className="tableListOperator"
              style={{ textAlign: "right", width: "100%" }}
            >
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                // onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Mở nhiều lớp </span>
              </button>
              <button
                type="button"
                className="ant-btn ant-btn-primary"
                // onClick={() => setShowModalCreate(true)}
              >
                <PlusOutlined></PlusOutlined>
                <span>Mở lớp toàn bộ </span>
              </button>
            </div>
          </Col>
        </Row>
        <Table
          columns={columnsInSubmittingClose}
          dataSource={submittingInfo}
          rowKey="subjectId"
          bordered
          pagination={{ pageSize: 10 }}
          size="small"
          rowSelection={true}
          rowSelection={rowSelection}
          locale={{
            emptyText: (
              <div className="ant-empty ant-empty-normal">
                <div className="ant-empty-image">
                  <SearchOutlined style={{ fontSize: "16px", color: "#08c" }} />
                  <p className="ant-empty-description">
                    Không có dữ liệu đăng ký học phần
                  </p>
                </div>
              </div>
            ),
          }}
        />
        {showSubjectClassCreateModal && (
          <CreateSubjectClass
            visible={showSubjectClassCreateModal}
            setVisible={setShowSubjectClassCreateModal}
            subject={subjectToCreateClass}
            term={props.term}
          />
        )}
      </>
    );
  } else return <></>;
};

export default StepOne;
