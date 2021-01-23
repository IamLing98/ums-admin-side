/**
 * User Management Page
 */
import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import Button from '@material-ui/core/Button';
import {
   Modal,
   ModalHeader,
   ModalBody,
   Form, FormGroup, PaginationItem, PaginationLink, Pagination, Alert
} from 'reactstrap';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { NotificationManager } from 'react-notifications';
import Avatar from '@material-ui/core/Avatar';

// api
import {api} from 'Api';

// delete confirmation dialog
import DeleteConfirmationDialog from 'Components/DeleteConfirmationDialog/DeleteConfirmationDialog';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages


// rct card box
import RctCollapsibleCard from 'Components/RctCollapsibleCard/RctCollapsibleCard';

// rct section loader
import RctSectionLoader from 'Components/RctSectionLoader/RctSectionLoader';
import IntlMessages from "Util/IntlMessages";
import {Field} from "redux-form";
import {renderField} from "../../../../forms/ComonForm";
import {connect} from "react-redux";
import {getCountries, getDept, getUsersManage, setUserProp, updateUser} from "Actions/AddUserActions";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import {NotificationContainer} from "react-notifications";
import {fetchUserError} from "Actions";
import {SERVER_PATH} from "Actions/types";
import Moment from 'react-moment';
import {
   ROLE_ADMIN,
   ROLE_ADMIN_BADGE,
   ROLE_CLIENT, ROLE_CLIENT_BADGE,
   ROLE_SUBADMIN,
   ROLE_SUBADMIN_BADGE,
   ROLE_SURVEYOR, ROLE_SURVEYOR_BADGE
} from "Util/apiUtils";
import Menu from "@material-ui/core/es/Menu";
import MenuItem from "@material-ui/core/es/MenuItem";
import classNames from "classnames";
import SweetAlert from "react-bootstrap-sweetalert";
import DepartmentForm from "Routes/users/user-management/create-user/forms/departmentForm";
import AddUserForm from "Routes/users/user-management/create-user/forms/addUserForm";
import UpdateUserForm from "Routes/users/user-management/create-user/forms/updateUserForm";
import Dropdown from "reactstrap/es/Dropdown";
import DropdownToggle from "reactstrap/es/DropdownToggle";
import DropdownMenu from "reactstrap/es/DropdownMenu";
import DropdownItem from "reactstrap/es/DropdownItem";



const mapStateToProps = state => ({
   ...state.addUser
});
const mapDispatchToProps = {
   fetchUserError,
   getUsersManage,
   setUserProp,
   updateUser,
   getDept,
   getCountries
};
class UserProfile extends Component {
   constructor(props) {
      super(props);

      this.toggle = this.toggle.bind(this);
   }

   toggle() {
      this.setState(prevState => ({
         dropdownOpen: !prevState.dropdownOpen
      }));
   }

   state = {
      dropdownOpen: false,
      all: false,
      selectedUser: null, // selected user to perform operations
      addNewUserModal: false, // add new user form modal
      rolesApi:['ROLE_ADMIN','ROLE_SUBADMIN','ROLE_SURVEYOR','ROLE_CLIENT'],
      profilePicUploaded: false,
      openViewUserDialog: false, // view user dialog box
      editUser: null,
      allSelected: false,
      selectedUsers: 0,
      anchorEl: null,
      selectedIndex: 1,
      withDes:false
   };

   getUsers(url){
      return this.props.getUsersManage(url);
   }

   componentDidMount() {
      this.props.getDept();
      this.props.getCountries();
      this.getUsers('/users/all-users');
   }
   // Drop Menu Functions

   handleClickListItem = (index) => {
      this.getUsers(`/users/all-users?roles=${this.state.rolesApi[index]}`);
   };

	/**
	 * On Delete
	 */
   onDelete(data) {
      this.refs.deleteConfirmationDialog.open();
      this.setState({ selectedUser: data });
   }

	/**
	 * Delete User Permanently
	 */
   deleteUserPermanently() {
      const { selectedUser } = this.state;
      let users = this.props.users;
      let indexOfDeleteUser = users.indexOf(selectedUser);
      this.setState({ loading: true });
      const url = `/users/${selectedUser['id']}`;

      api.delete(url).then(response =>{
         users.splice(indexOfDeleteUser, 1);
         this.refs.deleteConfirmationDialog.close();
         this.setState({ selectedUser: null });
         NotificationManager.success('User Deleted!');
         return this.props.getUsersManage('/users/all-users');
      }).catch(error =>{
         this.setState({ loading: false, selectedUser: null });
         if (error.message === 'Unauthorized'){
            NotificationManager.error("Session Timed out");
            this.props.dispatch(this.props.fetchUserError);
         }
         else {
            NotificationManager.error('Something Went Wrong');
         }
      });

   }

	/**
	 * Open Add New User Modal
	 */
   opnAddNewUserModal() {
      this.setState({ addNewUserModal: true });
   }

	/**
	 * On Reload
	 */
   onReload() {
       this.getUsers('/users/all-users');
   }


	/**
	 * View User Detail Hanlder
	 */
   viewUserDetail(data) {
      this.setState({ openViewUserDialog: true, selectedUser: data });
   }

	/**
	 * On Add & Update User Modal Close
	 */
   onAddUpdateUserModalClose() {
      this.setState({ addNewUserModal: false, editUser: null })
   }


   /**
    * On Edit User
    */
   onEditUser(user) {
      this.setState({ addNewUserModal: true, editUser: user });
   }


   handleValueChange = e =>{
      const name = e.target.name;
      const value = e.target.value;
      var editUser2 = {...this.state.editUser, [name]: value};
      this.setState({editUser:editUser2});
   };


   //alert
   /**
    * On Confirm dialog
    * @param {string} key
    */
   onConfirm(key) {
      this.setState({ [key]: false })
   }

   /**
    * Open Alert
    * @param {key} key
    */
   openAlert(key) {
      this.setState({ [key]: true });
   }

   render() {
      const { selectedUser, editUser ,anchorEl,withDes } = this.state;
      const {users, loading, paginationHydra, HydraPageCount, CurrentPage, department} = this.props;
      let range = [];
      if(HydraPageCount){
         for(let i =1; i<= HydraPageCount; i++){
             range.push(i);
         }
      }
      return (

          <div className="user-management">
             {/* <NotificationContainer />
             <Helmet>
                <title>Polucon | Users Management</title>
                <meta name="description" content="Polucon User Management" />
             </Helmet>
             <PageTitleBar
                 title={<IntlMessages id="sidebar.userManagement" />}
                 match={this.props.match}
             />


             <SweetAlert
                 show={withDes}
                 title="Opps!"
                 btnSize="sm"
                 onConfirm={() => this.onConfirm('withDes')}
             >
                Please fix the warnings to continue.
             </SweetAlert>
             <RctCollapsibleCard
                 heading={<IntlMessages id="register.departmentAdd" />}
                 collapsible
                 reloadable
                 fullBlock
             >

               <div className="container">
                  {department && (department.length === 0) &&
                  <Alert color="warning">
                     No Departments found please add below.
                  </Alert>
                  }
                  <DepartmentForm/>
               </div>
                <br/>
             </RctCollapsibleCard> */}
             <RctCollapsibleCard  heading={<IntlMessages id="register.registerUser" />}
                                  collapsible fullBlock>
                <div className="table-responsive">
                   {/* <div className="d-flex justify-content-between py-20 px-10 border-bottom">
                      <div>
                         <a href="javascript:void(0)" onClick={() => this.onReload()} className="btn-outline-default mr-10"><i className="ti-reload"></i></a>
                      </div>
                      <div>

                         <Dropdown group isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                            <DropdownToggle caret>
                               Select Role
                            </DropdownToggle>
                            <DropdownMenu positionFixed persist>
                               <DropdownItem onClick={() => this.onReload()}>All</DropdownItem>
                               <DropdownItem divider />
                               <DropdownItem onClick={() => this.handleClickListItem(0)}>Admin</DropdownItem>
                               <DropdownItem divider />
                               <DropdownItem onClick={() => this.handleClickListItem(1)}>Sub-Admin</DropdownItem>
                               <DropdownItem divider />
                               <DropdownItem onClick={() => this.handleClickListItem(2)}>Surveyor</DropdownItem>
                               <DropdownItem divider />
                               <DropdownItem onClick={() => this.handleClickListItem(3)}>Client</DropdownItem>
                            </DropdownMenu>
                         </Dropdown>
                      </div>
                      <div>
                         <a href="javascript:void(0)" onClick={() => {
                            if (department.length !== 0){
                               return  this.opnAddNewUserModal();
                            }
                            else {
                               return this.openAlert('withDes');
                            }
                         }} color="primary" className="caret btn-sm mr-10">Add New User <i className="zmdi zmdi-plus"></i></a>
                      </div>

                   </div> */}
                   <table className="table table-middle table-hover mb-0">
                      <thead>
                      <tr>
                         <th>User</th>
                         <th>Email Address</th>
                         <th>Status</th>
                         <th>Roles</th>
                         <th>Date Created</th>
                         <th>Action</th>
                      </tr>
                      </thead>
                      <tbody>

                      {users && (users.length !==0 ) ? users.map((user) => (
                          <tr key={user.id}>
                             <td>
                                <div className="media">
                                   {(user.profilePic !== null) ?
                                       <img src={`${SERVER_PATH}${user.profilePic.url}`} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                                       : <Avatar className="mr-15">{`${user.firstName.charAt(0)}${user.lastName.charAt(0)}`}</Avatar>
                                   }
                                   <div className="media-body">
                                      <h5 className="mb-5 fw-bold">{user.firstName}</h5>
                                   </div>
                                </div>
                             </td>
                             <td>{user.email}</td>
                             <td className="d-flex justify-content-start">
                                {user.enabled ?  <span className={`badge badge-xs badge-success mr-10 mt-10 position-relative`}>&nbsp;</span>
                                    :
                                    <span className={`badge badge-xs badge-warning mr-10 mt-10 position-relative`}>&nbsp;</span>}
                                <div className="status">
                                   {user.enabled ?  <span className="d-block text-uppercase">Activated</span>:
                                       <span className="d-block text-uppercase text-yellow">Not Activated</span>}

                                </div>
                             </td>
                             <td> {user.roles[0] === ROLE_ADMIN ?    <span className={`badge ${ROLE_ADMIN_BADGE} badge-pill`}>Admin</span> :
                                 user.roles[0] === ROLE_SUBADMIN ?    <span className={`badge ${ROLE_SUBADMIN_BADGE}  badge-pill`}>Sub-Admin</span>  :
                                     user.roles[0] === ROLE_CLIENT ?   <span className={`badge ${ROLE_CLIENT_BADGE}  badge-pill`}>Client</span>  :
                                         user.roles[0] === ROLE_SURVEYOR &&  <span className={`badge ${ROLE_SURVEYOR_BADGE}  badge-pill`}>Surveyor</span> }
                                        </td>

                             <td>  <Moment format="YYYY/MM/DD">
                                {user.createdDate}
                             </Moment></td>
                             <td className="list-action">
                                <a href="javascript:void(0)" onClick={() =>  this.viewUserDetail(user) }><i className="ti-eye"></i></a>
                                <a href="javascript:void(0)" onClick={() => this.onEditUser(user)}><i className="ti-pencil"></i></a>
                                <a href="javascript:void(0)" onClick={() => this.onDelete(user)}><i className="ti-close"></i></a>
                             </td>
                          </tr>
                      )):
                         <tr>
                            <td>Nothing Found</td>
                         </tr>
                      }

                      </tbody>
                      <tfoot className="border-top">
                      {(paginationHydra && HydraPageCount && CurrentPage !== null) && <tr>

                         <td colSpan="100%">
                            {/* eslint-disable-next-line radix */}
                            <Pagination className="mb-0 py-10 px-10">

                               <PaginationItem>
                                  <PaginationLink previous href="#"/>
                                    {/*<Button onClick={(e) => this.getUsers('/users/all-users?page=2')}>Next</Button>*/}
                               </PaginationItem>
                               {
                                  range.map(page => {
                                     return(
                                         // eslint-disable-next-line radix
                                         <PaginationItem key={page} className={classNames({active: parseInt(CurrentPage) === page})}>
                                            <PaginationLink href="javascript:void(0)">{page}</PaginationLink>
                                         </PaginationItem>
                                     )
                                  })
                               }

                               <PaginationItem>
                                  <PaginationLink next href="javascript:void(0)" />
                               </PaginationItem>
                            </Pagination>
                         </td>
                      </tr>
                      }

                      </tfoot>
                   </table>
                </div>
                {(loading) &&
                <RctSectionLoader />
                }
             </RctCollapsibleCard>
             <DeleteConfirmationDialog
                 ref="deleteConfirmationDialog"
                 title="Are You Sure Want To Delete?"
                 message="This will delete user permanently."
                 onConfirm={() => this.deleteUserPermanently()}
             />
             <Modal isOpen={this.state.addNewUserModal} toggle={() => this.onAddUpdateUserModalClose()}>
                <ModalHeader toggle={() => this.onAddUpdateUserModalClose()}>
                   {editUser === null ?
                       'Add New User' : 'Update User'
                   }
                </ModalHeader>
                <ModalBody>
                   {editUser === null ?
                       <AddUserForm closeModal={this.onAddUpdateUserModalClose.bind(this)}/>
                       :
                      <UpdateUserForm editUser={editUser} closeModal={this.onAddUpdateUserModalClose.bind(this)} handleChange={this.handleValueChange.bind(this)}/>
                   }
                </ModalBody>

             </Modal>
             <Dialog
                 onClose={() => this.setState({ openViewUserDialog: false })}
                 open={this.state.openViewUserDialog}
             >
                <DialogContent>
                   {selectedUser !== null &&
                   <div>
                      <div className="clearfix d-flex">
                         <div className="media pull-left">
                            {(selectedUser.profilePic !== null) ?
                                <img src={`${SERVER_PATH}${selectedUser.profilePic.url}`} alt="user prof" className="rounded-circle mr-15" width="50" height="50" />
                                : <Avatar className="mr-15">{`${selectedUser.firstName.charAt(0)}${selectedUser.lastName.charAt(0)}`}</Avatar>
                            }

                            <div className="media-body">
                               <p>Name: <span className="fw-bold">{selectedUser.firstName}</span></p>
                               <p>Email: <span className="fw-bold">{selectedUser.email}</span></p>
                               <p>Account Type:{' '}
                                  {selectedUser.roles[0] === ROLE_ADMIN ?    <span className={`badge ${ROLE_ADMIN_BADGE} badge-pill`}>Admin</span> :
                                      selectedUser.roles[0] === ROLE_SUBADMIN ?    <span className={`badge ${ROLE_SUBADMIN_BADGE}  badge-pill`}>Sub-Admin</span>  :
                                          selectedUser.roles[0] === ROLE_CLIENT ?   <span className={`badge ${ROLE_CLIENT_BADGE}  badge-pill`}>Client</span>  :
                                              selectedUser.roles[0] === ROLE_SURVEYOR &&  <span className={`badge ${ROLE_SURVEYOR_BADGE}  badge-pill`}>Surveyor</span> }
                               </p>
                               <p>Status:
                                  {selectedUser.enabled ?  <span className="d-block text-uppercase">Activated</span>:
                                      <span className="d-block text-uppercase text-yellow">Not Activated</span>}
                               </p>

                            </div>
                         </div>
                      </div>
                   </div>
                   }
                </DialogContent>
             </Dialog>
          </div>
      );
   }
}


export default connect(mapStateToProps,mapDispatchToProps)(UserProfile)
