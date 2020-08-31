import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import MultiSelect from "react-multi-select-component";
import { Button, Space } from "antd";
import 'Routes/EducationProgram/Programs/Components/style.scss';
import { FormGroup, Input, Label } from 'reactstrap';

const UpdateEducationProgramSubject = (props) => {
    const [selected, setSelected] = useState([]);

    const [selected2, setSelected2] = useState([]);

    const [selected3, setSelected3] = useState([]);

    const [selected4, setSelected4] = useState([]);

    const handleOkOnClick = () => {
        const { record } = props;
        var listSubject = [];
        const educationProgramId = record.educationProgramId;
        selected.map(
            item => {
                console.log(item)
                let element = {
                    educationProgramId: educationProgramId,
                    subjectId: item.value,
                    subjectName: item.label,
                    subjectType: "1"
                }
                listSubject.push(element)
            }
        );
        selected2.map(
            item => {
                let element = {
                    educationProgramId: educationProgramId,
                    subjectId: item.value,
                    subjectName: item.label,
                    subjectType: "2"
                }
                listSubject.push(element);

            }
        );
        selected3.map(
            item => {
                let element = {
                    educationProgramId: educationProgramId,
                    subjectId: item.value,
                    subjectName: item.label,
                    subjectType: "3"
                }
                listSubject.push(element);

            }
        );
        selected4.map(
            item => {
                let element = {
                    educationProgramId: educationProgramId,
                    subjectId: item.value,
                    subjectName: item.label,
                    subjectType: "4"
                }
                listSubject.push(element);

            }
        );
        props.onOk(listSubject);
    }

    return (
        <div  >
            <Row style={{ margin: "0" }}>
                <h5 style={{ marginLeft: "20px" }}>Giáo Dục Đại Cương</h5>
                <Col md={12} >

                    <Row>
                        <Col md={6} style={{ display: "flex", flexDirection: "column", padding: "0.9375rem 1.25rem" }}>
                            <div className="rct-block " style={{ minHeight: "400px", maxHeight: "400px", padding: "0.9375rem 1.25rem" }}>

                                <Label for="exampleCustomSelect">Học Phần Bắt Buộc</Label>
                                <MultiSelect
                                    options={props.options}
                                    value={selected}
                                    onChange={setSelected}
                                    labelledBy={"Học Phần Tương Đương..."}
                                    style={{ width: "100%" }}
                                    overrideStrings={{
                                        selectSomeItems: "Lựa Chọn Học Phần...",
                                        "allItemsAreSelected": "Đã Chọn Tất Cả.",
                                        "selectAll": "Chọn Hết",
                                        "search": "Tìm Kiếm"
                                    }}
                                />

                            </div>
                        </Col>
                        <Col md={6} style={{ display: "flex", flexDirection: "column", padding: "0.9375rem 1.25rem" }}>
                            <div className="rct-block " style={{ minHeight: "400px", maxHeight: "400px", padding: "0.9375rem 1.25rem" }}>
                                <FormGroup>
                                    <Label for="exampleCustomSelect"><h5>Mục Đã Chọn</h5></Label>
                                </FormGroup>
                                <div>
                                    <ul className="MuiList-root MuiList-padding">
                                        {
                                            selected.map(
                                                (item, index) =>
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
                                                            <div className="MuiListItemSecondaryAction-root" key={"spannn" + item.value}>
                                                                <button
                                                                    className="MuiButtonBase-root MuiIconButton-root"
                                                                    tabIndex={0}
                                                                    type="button"
                                                                    aria-label="Delete"
                                                                >
                                                                    <span
                                                                        className="MuiIconButton-label"
                                                                        onClick={
                                                                            () => {
                                                                                console.log(item);
                                                                                const value = item.value;
                                                                                var newSelected = selected.filter(function (element) {
                                                                                    return element.value !== value
                                                                                });
                                                                                setSelected(newSelected);
                                                                            }
                                                                        }
                                                                    >
                                                                        <i className="zmdi zmdi-delete text-primary" />
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root" />
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <hr style={{ margin: "0" }} />
                                                    </>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} style={{ display: "flex", flexDirection: "column", padding: "0.9375rem 1.25rem" }}>
                            <div className="rct-block " style={{ minHeight: "400px", maxHeight: "400px", padding: "0.9375rem 1.25rem" }}>

                                <Label for="exampleCustomSelect">Học Phần Tự Chọn</Label>
                                <MultiSelect
                                    options={props.options}
                                    value={selected2}
                                    onChange={setSelected2}
                                    labelledBy={"Học Phần Tương Đương..."}
                                    style={{ width: "100%" }}
                                    overrideStrings={{
                                        selectSomeItems: "Lựa Chọn Học Phần...",
                                        "allItemsAreSelected": "Đã Chọn Tất Cả.",
                                        "selectAll": "Chọn Hết",
                                        "search": "Tìm Kiếm"
                                    }}
                                />

                            </div>
                        </Col>
                        <Col md={6} style={{ display: "flex", flexDirection: "column", padding: "0.9375rem 1.25rem" }}>
                            <div className="rct-block " style={{ minHeight: "400px", maxHeight: "800px" }}>
                                <FormGroup>
                                    <Label for="exampleCustomSelect"><h5>Mục Đã Chọn</h5></Label>
                                </FormGroup>
                                <div>
                                    <ul className="MuiList-root MuiList-padding">
                                        {
                                            selected2.map(
                                                (item, index) =>
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
                                                            <div className="MuiListItemSecondaryAction-root" key={"spannn" + item.value}>
                                                                <button
                                                                    className="MuiButtonBase-root MuiIconButton-root"
                                                                    tabIndex={0}
                                                                    type="button"
                                                                    aria-label="Delete"
                                                                >
                                                                    <span
                                                                        className="MuiIconButton-label"
                                                                        onClick={
                                                                            () => {
                                                                                console.log(item);
                                                                                const value = item.value;
                                                                                var newSelected = selected2.filter(function (element) {
                                                                                    return element.value !== value
                                                                                });
                                                                                setSelected2(newSelected);
                                                                            }
                                                                        }
                                                                    >
                                                                        <i className="zmdi zmdi-delete text-primary" />
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root" />
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <hr style={{ margin: "0" }} />
                                                    </>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <hr style={{ margin: "0" }} />
            <Row style={{ margin: "0" }}>
                <h5 style={{ marginLeft: "20px" }}>Giáo Dục Đại Cương</h5>
                <Col md={12} >

                    <Row>
                        <Col md={6} style={{ display: "flex", flexDirection: "column", padding: "0.9375rem 1.25rem" }}>
                            <div className="rct-block " style={{ minHeight: "400px", maxHeight: "800px" }}>

                                <FormGroup>
                                    <Label for="exampleCustomSelect">Học Phần Bắt Buộc</Label>
                                    <MultiSelect
                                        options={props.options}
                                        value={selected3}
                                        onChange={setSelected3}
                                        labelledBy={"Học Phần Tương Đương..."}
                                        style={{ width: "100%" }}
                                        overrideStrings={{
                                            selectSomeItems: "Lựa Chọn Học Phần...",
                                            "allItemsAreSelected": "Đã Chọn Tất Cả.",
                                            "selectAll": "Chọn Hết",
                                            "search": "Tìm Kiếm"
                                        }}
                                    />
                                </FormGroup>

                            </div>
                        </Col>
                        <Col md={6} style={{ display: "flex", flexDirection: "column", padding: "0.9375rem 1.25rem" }}>
                            <div className="rct-block " style={{ minHeight: "400px", maxHeight: "800px" }}>
                                <FormGroup>
                                    <Label for="exampleCustomSelect"><h5>Mục Đã Chọn</h5></Label>
                                </FormGroup>
                                <div>
                                    <ul className="MuiList-root MuiList-padding">
                                        {
                                            selected3.map(
                                                (item, index) =>
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
                                                            <div className="MuiListItemSecondaryAction-root" key={"spannn" + item.value}>
                                                                <button
                                                                    className="MuiButtonBase-root MuiIconButton-root"
                                                                    tabIndex={0}
                                                                    type="button"
                                                                    aria-label="Delete"
                                                                >
                                                                    <span
                                                                        className="MuiIconButton-label"
                                                                        onClick={
                                                                            () => {
                                                                                console.log(item);
                                                                                const value = item.value;
                                                                                var newSelected = selected3.filter(function (element) {
                                                                                    return element.value !== value
                                                                                });
                                                                                setSelected3(newSelected);
                                                                            }
                                                                        }
                                                                    >
                                                                        <i className="zmdi zmdi-delete text-primary" />
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root" />
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <hr style={{ margin: "0" }} />
                                                    </>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6} style={{ display: "flex", flexDirection: "column", padding: "0.9375rem 1.25rem" }}>
                            <div className="rct-block " style={{ minHeight: "400px", maxHeight: "800px" }}>

                                <FormGroup>
                                    <Label for="exampleCustomSelect">Học Phần Tự Chọn</Label>
                                    <MultiSelect
                                        options={props.options}
                                        value={selected4}
                                        onChange={setSelected4}
                                        labelledBy={"Học Phần Tương Đương..."}
                                        style={{ width: "100%" }}
                                        overrideStrings={{
                                            selectSomeItems: "Lựa Chọn Học Phần...",
                                            "allItemsAreSelected": "Đã Chọn Tất Cả.",
                                            "selectAll": "Chọn Hết",
                                            "search": "Tìm Kiếm"
                                        }}
                                    />
                                </FormGroup>

                            </div>
                        </Col>
                        <Col md={6} style={{ display: "flex", flexDirection: "column", padding: "0.9375rem 1.25rem" }}>
                            <div className="rct-block " style={{ minHeight: "400px", maxHeight: "800px" }}>
                                <FormGroup>
                                    <Label for="exampleCustomSelect"><h5>Mục Đã Chọn</h5></Label>
                                </FormGroup>
                                <div>
                                    <ul className="MuiList-root MuiList-padding">
                                        {
                                            selected4.map(
                                                (item, index) =>
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
                                                            <div className="MuiListItemSecondaryAction-root" key={"spannn" + item.value}>
                                                                <button
                                                                    className="MuiButtonBase-root MuiIconButton-root"
                                                                    tabIndex={0}
                                                                    type="button"
                                                                    aria-label="Delete"
                                                                >
                                                                    <span
                                                                        className="MuiIconButton-label"
                                                                        onClick={
                                                                            () => {
                                                                                console.log(item);
                                                                                const value = item.value;
                                                                                var newSelected = selected4.filter(function (element) {
                                                                                    return element.value !== value
                                                                                });
                                                                                setSelected4(newSelected);
                                                                            }
                                                                        }
                                                                    >
                                                                        <i className="zmdi zmdi-delete text-primary" />
                                                                    </span>
                                                                    <span className="MuiTouchRipple-root" />
                                                                </button>
                                                            </div>
                                                        </li>
                                                        <hr style={{ margin: "0" }} />
                                                    </>
                                            )
                                        }
                                    </ul>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row style={{ padding: " 0.9375rem 1.25rem ", margin: "0" }}>
                <Space size="middle">
                    <Button type="" onClick={() => props.back()}>Quay Lại</Button>
                    {" "}
                    <Button
                        type="primary"
                        onClick={() => handleOkOnClick()}
                    >
                        Cập Nhật
                         </Button>
                </Space>
            </Row>
        </div>
    );
}

export default UpdateEducationProgramSubject;