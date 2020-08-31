/**
 * Module Dashboard
 */

import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Button, Modal } from 'antd';
import { CustomInput, Input, Form, FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';


export const UpdateEducationProgram = (props) => {

    const [educationProgramId, setEducationProgramId] = useState("");

    const [educationProgramName, setEducationProgramName] = useState("");

    const [branchId, setBranchId] = useState("");

    const [educationProgramLevel, setEducationProgramLevel] = useState("0");

    const [educationProgramType, setEducationProgramType] = useState("0");

    const handleSubmitFormCreate = () => {
        let formData = new FormData();
        formData.append("educationProgramId", educationProgramId);
        formData.append("educationProgramName", educationProgramName);
        formData.append("branchId", branchId);
        formData.append("educationProgramLevel", educationProgramLevel);
        formData.append("educationProgramType", educationProgramType);
        formData.append("educationProgramStatus", "2");
        props.onOk(formData);
    }
    useEffect(() => {
        const {record} = props;
        setEducationProgramId(record.educationProgramId);
        setEducationProgramName(record.educationProgramName);
        setBranchId(record.branchId);
        setEducationProgramLevel(record.educationProgramLevel);
        setEducationProgramType(record.educationProgramType);
    }, [JSON.stringify(props.record)])

    return (
        <Modal
            title="Chỉnh Sửa CTDT"
            visible={props.visible}
            onOk={() => handleSubmitFormCreate()}
            onCancel={props.onCancel}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: false }}
            maskClosable={false}
            okText="Chỉnh Sửa"
            cancelText="Đóng"
            destroyOnClose={true}
            centered
            closable={false}
        // confirmLoading={true}
        >
            <div className="form-group">
                <label htmlFor="educationProgramId" >
                    Mã Chương Trình Đào Tạo
                </label>
                <input
                    name="educationProgramsId"
                    id="educationProgramsId"
                    placeholder="Mã CTDT"
                    type="text"
                    className="form-control"
                    onChange={e => setEducationProgramId(e.target.value)}
                    value={educationProgramId}
                    disabled
                />
            </div>
            <div className="form-group">
                <label htmlFor="educationProgramName" >
                    Tên Chương Trình Đào Tạo
          </label>
                <input
                    name="educationProgramName"
                    id="educationProgramName"
                    placeholder="Tên Chương Trình Đào Tạo"
                    type="text"
                    className="form-control"
                    onChange={e => setEducationProgramName(e.target.value)}
                    value={educationProgramName}
                />
            </div>
            <FormGroup>
                <Label for="exampleCustomSelect">Ngành Đào Tạo</Label>
                <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={e => setBranchId(e.target.value)} value={branchId}>
                    <option value="">Ngành Đào Tạo</option>
                    {
                        props.educationProgram.listBranch.map(
                            item => <option key={item.branchId} value={item.branchId}>{item.branchName}</option>
                        )
                    }
                </CustomInput>
            </FormGroup>
            <FormGroup>
                <Label for="exampleCustomSelect">Các Cấp Đào Tạo</Label>
                <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={e => setEducationProgramLevel(e.target.value)} value={educationProgramLevel}>
                    <option value="0">Các Cấp Đào Tạo</option>
                    <option value="1">Tiến Sỹ</option>
                    <option value="2">Thạc Sỹ</option>
                    <option value="3">Đại Học</option>
                    <option value="4">Cao Đẳng</option>
                    <option value="5">Trung Cấp</option>
                </CustomInput>
            </FormGroup>
            <FormGroup>
                <Label for="exampleCustomSelect">Hình Thức Đào Tạo</Label>
                <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={e => setEducationProgramType(e.target.value)} value={educationProgramType}>
                    <option value="0">Hình Thức Đào Tạo</option>
                    <option value="1">Đại Học Chính Quy</option>
                    <option value="2">Đại Học Vừa Học Vừa Làm</option>
                    <option value="3">Văn Bằng 2</option>
                    <option value="4">Liên Thông Cao Đẳng</option>
                    <option value="5">Liên Thông Trung Cấp</option>
                    <option value="6">Liên Kết Đào Tạo Quốc Tế</option>
                    <option value="7">Đại Học Từ Xa</option>

                </CustomInput>
            </FormGroup>
        </Modal>
    )

}


const mapStateToProps = ({ educationProgram }) => {
    return { educationProgram };
};

export default connect(mapStateToProps, {


})(UpdateEducationProgram);  
