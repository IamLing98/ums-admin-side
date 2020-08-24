/**
 * Profile Page
 */
import React, { Component } from 'react';
import { FormGroup, Input, Form, Label, Col, InputGroup, InputGroupAddon,Button } from 'reactstrap';

import { NotificationManager } from 'react-notifications';

// intlmessages
import IntlMessages from 'Util/IntlMessages';
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {renderField} from "../../../../forms/ComonForm";
import Modal from "reactstrap/es/Modal";
import ModalHeader from "reactstrap/es/ModalHeader";
import ModalBody from "reactstrap/es/ModalBody";
import {UpdateProfile, UpdateProfilePassword} from "Actions/UpdateUserAction";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";

const mapStateToProps = state =>({
   ...state.updateUserRed,
   ...state.auth
});
const mapDispatchToProps = {
   UpdateProfile,
   UpdateProfilePassword
};
class Profile extends Component {
   constructor(props) {
      super(props);
      this.toggle = this.toggle.bind(this);
   }
   state = {
      modal: false
   };
   toggle() {
      this.setState(prevState => ({
         modal: !prevState.modal
      }));
   }
   /**
    * On Update Profile
    */
   onUpdateProfile(values) {
      return this.props.UpdateProfile(values,this.props.user_id);
   };

   onUpdatePassword(values){
      return this.props.UpdateProfilePassword(values,this.props.user_id);
   };

   render() {
      const {handleSubmit,loadingUpdate} = this.props;
      return (
         <div className="profile-wrapper w-50">
            <h2 className="heading"><IntlMessages id="widgets.personalDetails" /></h2>
            <Form onSubmit={handleSubmit(this.onUpdateProfile.bind(this))} inline>
               <Field name="firstName" type="text" placeholder="First Name" component={renderField} />
               {' '}
               <Button color="primary" type="submit" outline size="md"><IntlMessages id="widgets.updateProfile" /></Button>
            </Form>
            <hr/>
            <Form onSubmit={handleSubmit(this.onUpdateProfile.bind(this))} inline>
               <Field name="lastName" type="text" placeholder="Last Name" component={renderField}/>
               {' '}
               <Button color="primary" type="submit" outline size="md"><IntlMessages id="widgets.updateProfile" /></Button>
            </Form>
            <hr/>

            <Button color="danger" onClick={this.toggle} outline size="md">Change Password</Button>
            <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop>
               <ModalHeader toggle={this.toggle}>Update Password</ModalHeader>
               <ModalBody>
                  <Form onSubmit={handleSubmit(this.onUpdatePassword.bind(this))}>
                     <Field name="oldPassword" label="Old Password" type="password" placeholder="Old Password" component={renderField}/>
                     <Field name="newPassword" label="New Password" type="password" placeholder="New Password" component={renderField}/>
                     <Field name="newRetypePassword" label="Retype Password" type="password" placeholder="Retype Password" component={renderField}/>
                     <Button color="primary" type="submit" outline size="md">Update</Button>
                     {' '}
                     <Button color="danger" onClick={this.toggle} outline size="md">Cancel</Button>
                  </Form>
               </ModalBody>
            </Modal>
            {loadingUpdate &&
            <RctSectionLoader/>}
         </div>
      );
   }
}


export default reduxForm({form:'profileFormUpdate'})(connect(mapStateToProps,mapDispatchToProps)(Profile))

