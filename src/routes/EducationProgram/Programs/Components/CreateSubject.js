/**
 * Module Dashboard
 */

import React, { useState, useEffect } from 'react'
import { Table, Tag, Space, Button, Modal } from 'antd';
import { CustomInput, Input, Form, FormGroup, Label } from 'reactstrap';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import MultiSelect from "react-multi-select-component";

export const CreateSubject = (props) => {

    const [subjectId, setSubjectId] = useState("");

    const [subjectName, setSubjectName] = useState("");

    const [eachSubject, setEachSubject] = useState("");

    const [theoryNumber, setTheoryNumber] = useState("");

    const [exerciseNumber, setExerciseNumber] = useState("");

    const [discussNumber, setDiscussNumber] = useState("");

    const [practiceNumber, setPracticeNumber] = useState("");

    const [selfLearningNumber, setSelfLearningNumber] = useState([]);

    const [subjectForLevel, setSubjectForLevel] = useState("");

    const [educationProgramType, setEducationProgramType] = useState("0");

    const [selected, setSelected] = useState([]);

    const handleSubmitFormCreate = () => {
        let formData = new FormData();
        formData.append("subjectId", subjectId);
        formData.append("subjectName", subjectName);
        formData.append("eachSubject", eachSubject);
        formData.append("theoryNumber", theoryNumber);
        formData.append("exerciseNumber", exerciseNumber);
        formData.append("discussNumber", discussNumber);
        formData.append("practiceNumber", practiceNumber);
        formData.append("selfLearningNumber", selfLearningNumber);
        formData.append("subjectForLevel", subjectForLevel);
        props.onOk(formData);
    }
    useEffect(() => {
        // console.log(props.educationProgram.listBranch)
    }, [JSON.stringify(props.visible)])

    return (
        <Modal
            title="Tạo Mới Học Phần"
            visible={props.visible}
            onOk={() => handleSubmitFormCreate()}
            onCancel={props.onCancel}
            okButtonProps={{ disabled: false }}
            cancelButtonProps={{ disabled: false }}
            maskClosable={false}
            okText="Tạo Mới"
            cancelText="Đóng"
            destroyOnClose={true}
            centered
            closable={false}
            width={1000}
        // confirmLoading={true}
        >
            <Row>
                <Col md={4}>
                    <div className="form-group">
                        <label htmlFor="educationProgramId" >
                            Mã Học Phần
                        </label>
                        <input
                            name="subjectId"
                            id="educationProgramsId"
                            placeholder="Mã Học Phần"
                            type="text"
                            className="form-control"
                            onChange={e => setSubjectId(e.target.value)}
                            value={subjectId}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="subjectName" >
                            Tên Học Phần
                        </label>
                        <input
                            placeholder="Tên Học Phần"
                            type="text"
                            className="form-control"
                            onChange={e => setSubjectName(e.target.value)}
                            value={subjectName}
                        />
                    </div>
                    <FormGroup>
                        <Label  >Số Tín Chỉ</Label>
                        <Input
                            value={eachSubject}
                            type="text"
                            placeholder="Số Tín Chỉ..."
                            onChange={e => setEachSubject(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label  >Số Giờ Lý Thuyết</Label>
                        <Input
                            value={theoryNumber}
                            type="text"
                            placeholder="Số Giờ Lý Thuyết..."
                            onChange={e => setTheoryNumber(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label  >Số Giờ Bài Tập</Label>
                        <Input
                            value={exerciseNumber}
                            type="text"
                            placeholder="Số Giờ Bài Tập..."
                            onChange={e => setExerciseNumber(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label  >Số Giờ Thảo Luận</Label>
                        <Input
                            value={discussNumber}
                            type="text"
                            placeholder="Số Giờ Thảo Luận..."
                            onChange={e => setDiscussNumber(e.target.value)}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label  >Số Giờ Thực Hành</Label>
                        <Input
                            value={practiceNumber}
                            type="text"
                            placeholder="Số Giờ Thực Hành..."
                            onChange={e => setPracticeNumber(e.target.value)}
                        />
                    </FormGroup>
                </Col>
                <Col md={8}>
                    <Row>
                        <Col md={7} style={{ display: "flex", flexDirection: "column" }}>
                            <FormGroup>
                                <Label  >Số Giờ Tự Học</Label>
                                <Input
                                    value={selfLearningNumber}
                                    type="text"
                                    placeholder="Số Giờ Tự Học..."
                                    onChange={e => setSelfLearningNumber(e.target.value)}
                                />
                            </FormGroup>
                            <FormGroup >
                                <Label  >Các Cấp Đào Tạo</Label>
                                <CustomInput type="select" id="exampleCustomSelect" name="customSelect" onChange={e => setSubjectForLevel(e.target.value)} value={subjectForLevel}>
                                    <option value="0">Các Cấp Đào Tạo</option>
                                    <option value="1">Tiến Sỹ</option>
                                    <option value="2">Thạc Sỹ</option>
                                    <option value="3">Đại Học</option>
                                    <option value="4">Cao Đẳng</option>
                                    <option value="5">Trung Cấp</option>
                                </CustomInput>
                            </FormGroup>
                            <FormGroup >
                                <label  >Học Phần Tương Đương</label>
                                <MultiSelect
                                    options={props.options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy={"Học Phần Tương Đương..."}
                                    style={{ width: "100%" }}
                                    overrideStrings={{
                                        selectSomeItems: "Học Phần Tương Đương...",
                                        "allItemsAreSelected": "Đã Chọn Tất Cả.",
                                        "selectAll": "Chọn Hết",
                                        "search": "Tìm Kiếm"
                                    }}
                                />
                            </FormGroup >
                        </Col>

                        <Col style={{ borderLeft: "1px solid #F7F7F7" }}>
                            <ul className="MuiList-root p-0 MuiList-padding"  >
                                {
                                    selected.map(
                                        item => (
                                            <>
                                                <div
                                                    className="MuiButtonBase-root MuiListItem-root MuiListItem-gutters MuiListItem-button"
                                                    tabIndex={0}
                                                    role="button"
                                                    aria-disabled="false"
                                                    key={item.value}
                                                >
                                                    <div className="MuiListItemText-root">
                                                        <span className="MuiTypography-root MuiListItemText-primary MuiTypography-body1">
                                                            {item.label}
                                                        </span>
                                                    </div>
                                                    <span className="MuiTouchRipple-root" />
                                                </div>
                                                <hr className="MuiDivider-root" />
                                            </>
                                        )
                                    )
                                }

                            </ul>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Modal>
    )

}


const mapStateToProps = ({ educationProgram }) => {
    return { educationProgram };
};

export default connect(mapStateToProps, {


})(CreateSubject);  
