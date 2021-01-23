import React from 'react';
import {Field, reduxForm} from "redux-form";
import {renderField} from "../../../../../forms/ComonForm";
import {Form, FormGroup} from "reactstrap";
import Button from "@material-ui/core/Button";
import { AddUserRequest} from "Actions/AddUserActions";
import {connect} from "react-redux";
import ProfilePicBrowser from "Components/ImageUploader/ProfilePicBrowser";
import UserProfilePic from "Components/ImageUploader/UserProfilePic";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {NotificationManager} from "react-notifications";

const mapDispatchToProp = {
    AddUserRequest
};

const mapStateToProp = state => ({
    ...state.addUser
});
class AddUserForm extends React.Component {
    state = {
        addFieldDepartment:false,
        roles:[
            {
                id:1,
                value:'ADMIN',
                URI: 'ROLE_ADMIN'
            },
            {
                id:2,
                value:'SUB-ADMIN',
                URI: 'ROLE_SUBADMIN'
            },
            {
                id:3,
                value:'CLIENT',
                URI: 'ROLE_CLIENT'
            },
            {
                id:4,
                value:'SURVEYOR',
                URI: 'ROLE_SURVEYOR'
            }
        ],
    };


    //department add
    onSubmit(values){
        if(this.props.profilePicUploaded){
            if(Array.isArray(values.roles)){
                let temp = values.roles[0];
                values.roles = [];
                values.roles[0] = temp
            }else {
                values.roles = [values.roles]
            }
            const {profilePicImage} = this.props;
            values.profilePic = `/api/images/${profilePicImage['id']}`;
            // eslint-disable-next-line radix
            values.departmentId = parseInt(values.departmentId);
            return this.props.AddUserRequest(values,this);
        }else{
            NotificationManager.error("Please upload the image.");
        }
    }
    //add Department
    departmentFunction(value){

        if ('ROLE_SURVEYOR' === value.currentTarget.value){
            this.setState({addFieldDepartment:true})
        }
        else {
            this.setState({addFieldDepartment:false})
        }
    }

    render() {
        const {addFieldDepartment} = this.state;
        const {handleSubmit,profilePicImage,profilePicUploaded,countries,department,addUserLoader,closeModal}=this.props;

        return(
            <Form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

                <Field name="firstName" label="First Name" type="text" placeholder="First Name" component={renderField}/>
                <Field name="lastName" label="Last Name" type="text" placeholder="Last Name" component={renderField}/>
                <Field name="username" label="Username" type="text" placeholder="Username" component={renderField}/>
                <Field name="password"  label="Password" type="password" placeholder="Password" component={renderField}/>
                <Field name="retypePassword"  label="Confirm Password" type="password" placeholder="Confirm Password" component={renderField}/>
                <Field name="email" label="Email" type="email" placeholder="Email" component={renderField}/>
                <Field name="roles" label="Role" onChange={this.departmentFunction.bind(this)} type="select" selectItems={this.state.roles} component={renderField}/>
                {countries  && <Field name="countries" label="Country" type="select" selectItems={countries} component={renderField}/>}
                {addFieldDepartment && department  && <Field name="departmentId"  label="Department" type="select" selectItems={department} component={renderField}/> }
                <hr/>
                {profilePicUploaded ?  <ProfilePicBrowser ProfilePic={profilePicImage}/>:
                    <UserProfilePic/> }
                <hr/>
                <FormGroup className="mb-15">
                    {addUserLoader?
                        <RctPageLoader/>
                        :
                        <div>
                            <Button variant="contained" className="text-white btn-success" type="submit">Add</Button>
                            {' '}
                            <Button variant="contained" className="text-white btn-danger" onClick={() => closeModal()}>Cancel</Button>
                        </div>
                    }
                </FormGroup>
            </Form>
        )
    }
}

export default reduxForm({form:'addUserForm'})(connect(mapStateToProp,mapDispatchToProp)(AddUserForm));