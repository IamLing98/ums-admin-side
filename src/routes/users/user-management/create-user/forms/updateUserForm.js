import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../../../forms/ComonForm";
import {Form, FormGroup} from "reactstrap";
import Button from "@material-ui/core/Button";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {addDept, updateUser} from "Actions/AddUserActions";
import {connect} from "react-redux";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";


const mapDispatchToProp = {
    addDept,
    updateUser
};

const mapStateToProp = state => ({
    ...state.addUser
});
class UpdateUserForm extends React.Component {

    /**
     * Update User
     */
    updateUser(value) {
        console.log(value);
        const {editUser} = this.props;
        return this.props.updateUser(value,editUser)
    }
    render() {
        const {handleSubmit,editUser,addUserLoader,closeModal,handleChange}=this.props;
        return(
            <Form onSubmit={handleSubmit(this.updateUser.bind(this))} >

                <Field name="firstName" onChange={ (e) =>handleChange(e)} values={editUser.firstName} label="First Name" type="text" placeholder="First Name" component={renderField}/>
                <Field name="lastName" onChange={ (e) =>handleChange(e)}  values={editUser.lastName} label="Last Name" type="text" placeholder="Last Name" component={renderField}/>
                <Field name="username" onChange={  (e) =>handleChange(e)}  values={editUser.username} label="Username" type="text" placeholder="Username" component={renderField}/>
                <Field name="email" onChange={  (e) =>handleChange(e)}  values={editUser.email} label="Email" type="email" placeholder="Email" component={renderField}/>
                <hr/>
                <FormGroup className="mb-15">
                    {addUserLoader?
                        <RctPageLoader/>
                        :
                        <div>
                            <Button variant="contained" className="text-white btn-success" type="submit">Update</Button>
                            {' '}
                            <Button variant="contained" className="text-white btn-danger" onClick={() => closeModal()}>Cancel</Button>
                        </div>
                    }
                </FormGroup>
            </Form>
        )
    }
}

export default reduxForm({form:'updateUserForm'})(connect(mapStateToProp,mapDispatchToProp)(UpdateUserForm));