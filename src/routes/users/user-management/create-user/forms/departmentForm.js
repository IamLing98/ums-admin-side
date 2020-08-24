import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../../../forms/ComonForm";
import {Form, FormGroup} from "reactstrap";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {addDept} from "Actions/AddUserActions";
import {connect} from "react-redux";
import Button from "reactstrap/es/Button";


const mapDispatchToProp = {
  addDept
};

const mapStateToProp = state => ({
    ...state.addUser
});
class DepartmentForm extends React.Component {

    //department add
    onSubmitDept(values){
        return this.props.addDept(values);
    }

    render() {
        const {handleSubmit,deptLoading}=this.props;
        return(
            <Form onSubmit={handleSubmit(this.onSubmitDept.bind(this))}>
                <Field name="DepartmentName" label="Department Name" type="text" placeholder="Department Name" component={renderField}/>
                <FormGroup className="mb-15">
                    <div>
                        <Button color="primary" outline>Add</Button>
                    </div>
                </FormGroup>
                {deptLoading &&
                <RctSectionLoader/>
                }
            </Form>
        )
    }
}

export default reduxForm({form:'addDeptFrom'})(connect(mapStateToProp,mapDispatchToProp)(DepartmentForm));