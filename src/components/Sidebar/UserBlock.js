/**
 * User Block Component
 */
import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Badge } from 'reactstrap';
import { NotificationManager } from 'react-notifications';

// components
import SupportPage from '../Support/Support';

// redux action
import {fetchUserDetails, userLogoutAction} from 'Actions';

// intl messages
import IntlMessages from 'Util/IntlMessages';
import CircularProgress from "@material-ui/core/CircularProgress";
import {api} from "Api";
import {SERVER_PATH} from "Actions/types";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";



class UserBlock extends Component {

	state = {
		userDropdownMenu: false,
		isSupportModal: false
	};

	/**
	 * Logout User
	 */
	logoutUser() {
		this.props.userLogoutAction();
	}

	/**
	 * Toggle User Dropdown Menu
	 */
	toggleUserDropdownMenu() {
		this.setState({ userDropdownMenu: !this.state.userDropdownMenu });
	}

	/**
	 * Open Support Modal
	 */
	openSupportModal() {
		this.setState({ isSupportModal: true });
	}

	/**
	 * On Close Support Page
	 */
	onCloseSupportPage() {
		this.setState({ isSupportModal: false });
	}

	/**
	 * On Submit Support Page
	 */
	onSubmitSupport() {
		this.setState({ isSupportModal: false });
		NotificationManager.success('Message has been sent successfully!');
	}

	render() {
		const {userData}= this.props;
		return (
			<div className="top-sidebar">
				<div className="sidebar-user-block">
					<Dropdown
						isOpen={this.state.userDropdownMenu}
						toggle={() => this.toggleUserDropdownMenu()}
						className="rct-dropdown"
					>
						<DropdownToggle
							tag="div"
							className="d-flex align-items-center"
						>
							{userData ? <div className="user-profile">
									{
										(userData.profilePic !== null)?
											<img
												//src={`${SERVER_PATH}${userData.profilePic.url}`}
												src={userData.profilePic}
												alt="user profile"
												className="img-fluid rounded-circle"
												width="50"
												height="100"
											/>
											: <img
												src={require('Assets/avatars/profile.jpg')}
												alt="user profile"
												className="img-fluid rounded-circle bg-light"
												width="50"
												height="100"
											/>

									}
							</div>
								:<CircularProgress className="w-10 mr-30 mb-10 progress-primary" thickness={2.5} />
							}
							<div className="user-info">
								{userData ?
									<div>
										<span className="user-name ml-4">{userData.username}</span><i className="zmdi zmdi-chevron-down dropdown-icon mx-4"></i>
									</div>
									:<RctSectionLoader/>}

							</div>
						</DropdownToggle>
						<DropdownMenu>
							<ul className="list-unstyled mb-0">
								<li className="p-15 border-bottom user-profile-top bg-primary rounded-top">
									{userData ?<p className="text-white mb-0 fs-14">{userData.firstName+" "+userData.lastName}</p> :<CircularProgress className="w-10 mr-30 mb-10 progress-primary" thickness={1.5} />}
									{userData ? <span className="text-white fs-14">{userData.email}</span>:<RctSectionLoader/>}
								</li>
								<li>
									<Link to={{
										pathname: '/app/users/user-profile-1',
										state: { activeTab: 0 }
									}}>
										<i className="zmdi zmdi-account text-primary mr-3"></i>
										<span>Tài khoản</span>
									</Link>
								</li>
								<li className="border-top">
									<a href="javascript:void(0)"  onClick={() => this.logoutUser()}>
										<i className="zmdi zmdi-power text-danger mr-3"></i>
										<span>Đăng xuất</span>
									</a>
								</li>
							</ul>
						</DropdownMenu>
					</Dropdown>
				</div>
				<SupportPage
					isOpen={this.state.isSupportModal}
					onCloseSupportPage={() => this.onCloseSupportPage()}
					onSubmit={() => this.onSubmitSupport()}
				/>
			</div>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings }) => {

	return {settings};
};

export default connect(mapStateToProps, {
	userLogoutAction
})(UserBlock);
