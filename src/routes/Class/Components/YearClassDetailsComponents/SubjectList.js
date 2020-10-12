import React, { useEffect, useState } from "react";
import { api } from "Api";
import { NotificationManager } from "react-notifications";
import {
  DeleteFilled,
  EditFilled,
  RetweetOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  DiffOutlined,
  SearchOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import {
  Table,
  Tag,
  Space,
  Button,
  Popconfirm,
  Alert,
  Input,
  Result,
} from "antd";
import { Row, Col } from "reactstrap";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import UpdateEducationProgramSubject from "Routes/EducationProgram/Programs/UpdateEducationProgramSubject";
import TermSchedule from "Routes/Class/Components/YearClassDetailsComponents/EducationProgramDetailsComponents/TermSchedule";

const defaultRecord = {
  branchId: "",
  branchName: "",
  educationProgramId: "",
  educationProgramLevel: "3",
  educationProgramName: "",
  educationProgramStatus: "",
  educationProgramType: "",
};

function roughScale(x, base) {
  const parsed = parseInt(x, base);
  if (isNaN(parsed)) {
    return 0;
  }
  return parsed;
}

const EducationProgramDetail = (props) => {
  const [educationProgram, setEducationPorgram] = useState(
    props.educationProgram
  );

  const [toUpdateSubject, setToUpdateSubject] = useState(false);

  const [totalCredit, setTotalCredit] = useState(0);

  const [selected1, setSelected1] = useState([]);

  const [selected2, setSelected2] = useState([]);

  const [selected3, setSelected3] = useState([]);

  const [selected4, setSelected4] = useState([]);

  const [recordUpdateSubject, setRecordUpdateSubject] = useState(defaultRecord);

  const [optionsToUpdateSubject, setOptionsToUpdateSubject] = useState([]);

  const [render, setRerender] = useState(false);

  const [loading, setLoading] = useState(true);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (selectedRowKeys) => {
    setSelectedRowKeys(selectedRowKeys);
  };

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

  const handleSubmitUpdateEducationProgramSubject = (values) => {
    api
      .post("/education-program/updateSubject", values, true)
      .then((response) => {
        NotificationManager.success("Cập nhật thành công");
        setToUpdateSubject(false);
        setRecordUpdateSubject(defaultRecord);
        setRerender((value) => (value = !value));
      })
      .catch((error) => {
        setToUpdateSubject(false);
        setRecordUpdateSubject(defaultRecord);
        NotificationManager.error("Không thành công");
        if (error.message === "Forbidden") {
          NotificationManager.error(
            "Did you forget something? Please activate your account"
          );
        } else if (error.message === "Unauthorized") {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  };

  const columns = [
    {
      title: "Mã Học Phần ",
      render: (text, record) => <a>{record.subjectId}</a>,
    },
    {
      title: "Tên Học Phần ",
      render: (text, record) => <a>{record.subjectName}</a>,
      width: "20%",
    },
    {
      title: "Số Tín Chỉ",
      render: (text, record) => <a>{record.eachSubject}</a>,
    },
    {
      title: "Tự Chọn",
      dataIndex: "eachSubject",
    },
    {
      title: "Môn Học Tiên Quyết",
      dataIndex: "tags",
      render: (tags) => <></>,
    },
    {
      title: "Học Phần Học Trước",
      render: (text, record) => <a>{record.subjectId}</a>,
    },
    {
      title: "Song Hành Với Học Phần",
      render: (text, record) => <a>{record.subjectId}</a>,
    },
    {
      title: "Thao Tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <Button
            type=""
            onClick={() => {
              setCurrentTitle("Cập Nhật Chương Trình Đào Tạo");
              setRecordUpdateSubject(record);
              setToUpdateSubject(true);
            }}
          >
            <RetweetOutlined />
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

  if (props.detail === null || props.detail === undefined) {
    return (
      <Result
        status="404"
        title="404"
        subTitle="Chưa cập nhật chương trình đào tạo của lớp này."
        extra={<Button type="primary">Cập nhật</Button>}
      />
    );
  }
  return (
    <>
      <TermSchedule detail={props.detail}  />
    </>
  );
};

export default EducationProgramDetail;