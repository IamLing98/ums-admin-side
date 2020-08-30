/**
 * Module Dashboard
 */

import React, { useState, useEffect } from 'react'
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';
import { Table, Tag, Space, Button, Modal } from 'antd';
import { NotificationManager } from 'react-notifications';
import {
  DeleteFilled,
  EditFilled,
  RetweetOutlined
} from '@ant-design/icons';
import CreateEducationProgram from 'Routes/EducationProgram/Programs/Components/CreateEducationProgram';
import UpdateEducationProgram from 'Routes/EducationProgram/Programs/Components/UpdateEducationProgram';
import { api } from 'Api';

const defaultRecord = {
  branchId: "",
  branchName: "",
  educationProgramId: "",
  educationProgramLevel: "3",
  educationProgramName: "",
  educationProgramStatus: "",
  educationProgramType: "",
}
export const EducationProgramList = (props) => {

  const [educationProgramList, setEducationProgramsList] = useState([]);

  const [showModalCreate, setShowModalCreate] = useState(false);

  const [showModalUpdate, setShowModalUpdate] = useState(false);

  const [recordUpdate, setRecordUpdate] = useState(defaultRecord)

  const [rerender, setRerender] = useState(false);

  const handleSubmitFormCreate = (values) => {
    setShowModalCreate(false);
    api.post('/education-program/create', values, true).then(
      response => {
        NotificationManager.success("Tạo mới thành công");
        setRerender(value => value = !value);
      }).catch(error => {

        NotificationManager.error("Không thành công")
        if (error.message === 'Forbidden') {
          NotificationManager.error("Did you forget something? Please activate your account");
        }
        else if (error.message === 'Unauthorized') {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  }

  const handleSubmitFormUpdate = (values) => {
    setShowModalUpdate(false);
    api.post('/education-program/update', values, true).then(
      response => {
        NotificationManager.success("Chỉnh sửa thành công");
        setRerender(value => value = !value);
      }).catch(error => {

        NotificationManager.error("Không thành công")
        if (error.message === 'Forbidden') {
          NotificationManager.error("Did you forget something? Please activate your account");
        }
        else if (error.message === 'Unauthorized') {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
    setRecordUpdate(defaultRecord);
  }

  useEffect(() => {
    api.get('/education-program/getAllProgram', true).then(
      response => {
        setEducationProgramsList(response);
      }).catch(error => {

        console.log(error.message);
        if (error.message === 'Forbidden') {
          NotificationManager.error("Did you forget something? Please activate your account");
        }
        else if (error.message === 'Unauthorized') {
          throw new SubmissionError({ _error: "Username or Password Invalid" });
        }
      });
  }, [rerender]);

  const columns = [
    {
      title: 'Mã CTDT ',
      dataIndex: 'educationProgramId',
    },
    {
      title: 'Tên Chương Trình ',
      dataIndex: 'educationProgramName',
      render: text => <a href="google.com">{text}</a>,
    },
    {
      title: 'Trình Độ Đào Tạo',
      dataIndex: "educationProgramLevel",
      render: text => {
        if (text === "1") {
          return <span>Đào Tạo Tiến Sỹ</span>
        }
        else if (text === "2") {
          return <span>Đào Tạo Thạc Sỹ</span>
        }
        else if (text === "3") {
          return <span>Đại học</span>
        }
        else {
          return <span></span>
        }
      },
    },
    {
      title: 'Ngành Đào Tạo',
      dataIndex: "branchName",
    },
    {
      title: 'Hình Thức Đào Tạo',
      dataIndex: "educationProgramType",
      render: text => {
        if (text === "1") {
          return <span>Đại học chính quy</span>
        }
        else if (text === "2") {
          return <span>Đại học vừa làm vừa học </span>
        }
        else if (text === "3") {
          return <span>Văn bằng 2</span>
        }
        else if (text === "4") {
          return <span>L.thông từ Cao đẳng lên Đại học</span>
        }
        else if (text === "5") {
          return <span>L.thông từ Trung cấp lên Đại học</span>
        }
        else if (text === "6") {
          return <span>Liên kết đào tạo quốc tế</span>
        }
        else if (text === "7") {
          return <span>Đại học từ xa</span>
        }
      },
    },
    {
      title: 'Trạng Thái',
      dataIndex: "educationProgramStatus",
      render: status => {
        let color;
        let text = '';
        if (status === '1') {
          color = 'geekblue';
          text = "Đang Triển Khai"
        }
        else if (status === '2') {
          color = 'volcano';
          text = "Chờ Cập Nhật"
        }
        else if (status === '3') {
          color = 'green';
          text = "Chờ Cập Nhật"
        }
        return (
          <Tag color={color} key={text}>
            {text.toUpperCase()}
          </Tag>
        );
      }
    },
    {
      title: 'Thao Tác',
      render: (text, record) => (
        <Space size="middle">
          {
            record.educationProgramStatus === '2' ?
            <Button type="">
              <RetweetOutlined />
            </Button>
            :
            <Button type="" disabled>
              <RetweetOutlined />
            </Button>
          }
          <Button type=""
            onClick={
              () => {
                setRecordUpdate(record);
                setShowModalUpdate(true);
              }
            }>
            <EditFilled
            />
          </Button>
          <Button type="">
            <DeleteFilled />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <RctCollapsibleCard
      heading={<span>Chương Trình Đào Tạo</span>}
      collapsible
      fullBlock
      closeable
    >
      <button onClick={() => setShowModalCreate(true)}>  Thêm chương trình đào tạo</button>
      {/* <div className="MuiToolbar-root MuiToolbar-regular MTableToolbar-root-5 MuiToolbar-gutters">
                  <div className="MTableToolbar-title-9">
                    <h6
                      className="MuiTypography-root MuiTypography-h6"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      Editable Example
                    </h6>
                  </div>
                  <div className="MTableToolbar-spacer-7" />
                  <div className="MuiFormControl-root MuiTextField-root MTableToolbar-searchField-10">
                    <div className="MuiInputBase-root MuiInput-root MuiInput-underline MuiInputBase-formControl MuiInput-formControl MuiInputBase-adornedStart MuiInputBase-adornedEnd">
                      <div className="MuiInputAdornment-root MuiInputAdornment-positionStart">
                        <span
                          className="material-icons MuiIcon-root MuiIcon-fontSizeSmall"
                          aria-hidden="true"
                        >
                          search
                   </span>
                      </div>
                      <input
                        aria-invalid="false"
                        placeholder="Search"
                        type="text"
                        aria-label="Search"
                        className="MuiInputBase-input MuiInput-input MuiInputBase-inputAdornedStart MuiInputBase-inputAdornedEnd"
                        defaultValue
                      />
                      <div className="MuiInputAdornment-root MuiInputAdornment-positionEnd">
                        <button
                          className="MuiButtonBase-root MuiIconButton-root Mui-disabled Mui-disabled"
                          tabIndex={-1}
                          type="button"
                          aria-label="Clear Search"
                          disabled
                        >
                          <span className="MuiIconButton-label">
                            <span
                              className="material-icons MuiIcon-root MuiIcon-fontSizeSmall"
                              aria-hidden="true"
                              aria-label="clear"
                            >
                              clear
            </span>
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="MTableToolbar-actions-8">
                    <div>
                      <div>
                        <span>
                          <button
                            className="MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit"
                            tabIndex={0}
                            type="button"
                          >
                            <span className="MuiIconButton-label">
                              <span className="material-icons MuiIcon-root" aria-hidden="true">
                                add_box
              </span>
                            </span>
                            <span className="MuiTouchRipple-root" />
                          </button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div> */}
      <div className="table-responsive">
        <Table
          columns={columns}
          dataSource={educationProgramList}
          pagination={false}
          bordered
          rowKey="educationProgramId"
        />
      </div >

      <CreateEducationProgram
        visible={showModalCreate}
        onOk={(values) => handleSubmitFormCreate(values)}
        onCancel={() => setShowModalCreate(false)}
      />

      <UpdateEducationProgram
        visible={showModalUpdate}
        onOk={(values) => handleSubmitFormUpdate(values)}
        onCancel={() => {
          setShowModalUpdate(false);
          setRecordUpdate(defaultRecord);
        }}
        record={recordUpdate}
      />
    </RctCollapsibleCard>

  )

}

export default EducationProgramList;
