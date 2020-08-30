/**
 * Reactify Sidebar
 */
import React, { Component, Fragment } from 'react';
import classNames from 'classnames';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import $ from 'jquery';

// redux actions
import {collapsedSidebarAction, fetchUserDetails} from 'Actions';

// components
import UserBlock from './UserBlock';
import SidebarContentSuperAdmin from './SidebarContentSuperAdmin';
import SidebarContentAdmin from "Components/Sidebar/SidebarContentAdmin";
import SidebarContentSubAdmin from "Components/Sidebar/SidebarContentSubAdmin";
import SidebarContentClient from "Components/Sidebar/SidebarContentClient";
import RctPageLoader from "Components/RctPageLoader/RctPageLoader";
import RctSectionLoader from "Components/RctSectionLoader/RctSectionLoader";
import {ROLE_ADMIN, ROLE_CLIENT, ROLE_SUBADMIN, ROLE_SUPERADMIN} from "Util/apiUtils";

class Sidebar extends Component {

	componentWillMount() {
		this.updateDimensions();
	}

	shouldComponentUpdate(nextProps) {
		const { enableSidebarBackgroundImage, selectedSidebarImage, isDarkSidenav,locale } = this.props;
		if (enableSidebarBackgroundImage !== nextProps.enableSidebarBackgroundImage || selectedSidebarImage !== nextProps.selectedSidebarImage || isDarkSidenav !== nextProps.isDarkSidenav || locale) {
			return true
		} else {
			return false
		}
	}

	componentDidMount() {
		window.addEventListener("resize", this.updateDimensions);
		const {user_id} = this.props.auth;
		if (user_id !== null){
			//this.props.fetchUserDetails(user_id);
		}
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.updateDimensions);
	}

	componentWillReceiveProps(nextProps) {
		const { windowWidth } = this.state;
		const { collapsedSidebar } = this.props;
		if (nextProps.location !== this.props.location) {
			if (windowWidth <= 1199) {
				this.props.collapsedSidebarAction(false);
			}
		}
	}

	updateDimensions = () => {
		this.setState({ windowWidth: $(window).width(), windowHeight: $(window).height() });
	}

	render() { 
		const { enableSidebarBackgroundImage, selectedSidebarImage, isDarkSidenav } = this.props;
		const {userData} = this.props.auth;
		var ROLE = null;
		if (userData){
			ROLE = userData.roles[0];
		}
		return (
			<Fragment>
				<div
					className={classNames('rct-sidebar', { 'background-none': !enableSidebarBackgroundImage })}
					style={{ backgroundImage: enableSidebarBackgroundImage ? `url(${selectedSidebarImage})` : 'none' }}
				>
					<div className={classNames("rct-sidebar-content", { "sidebar-overlay-dark": isDarkSidenav, 'sidebar-overlay-light': !isDarkSidenav })}>
						<div className="site-logo" style={{justifyContent:"center"}}>

							<Link to="/" className="logo-normal"  >
								{/* <img src={require('Assets/img/pdu-logo.png')} className="img-fluid" alt="site-logo" width="53" height="17px" /> */}
								<h1 style={{textAlign:"center"}}>PDU ERP</h1>
							</Link>
						</div>
						<div className="rct-sidebar-wrap">
							<Scrollbars
								className="rct-scroll"
								autoHide
								autoHideDuration={100}
								style={{ height: 'calc(100vh - 60px)' }}
							>
								<UserBlock userData={userData}/>
								{userData?
									(ROLE === ROLE_SUPERADMIN)?<SidebarContentSuperAdmin userData={userData}/>
									:(ROLE === ROLE_ADMIN)?<SidebarContentAdmin userData={userData}/>
									:(ROLE === ROLE_SUBADMIN)?<SidebarContentSubAdmin userData={userData}/>
									:(ROLE === ROLE_CLIENT) && <SidebarContentClient userData={userData}/>
								:<RctSectionLoader/>
								}
							</Scrollbars>
						</div>
					</div>
				</div>
			</Fragment>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings,auth }) => {
	const { enableSidebarBackgroundImage, selectedSidebarImage, collapsedSidebar, isDarkSidenav, locale } = settings;
	return { enableSidebarBackgroundImage, selectedSidebarImage, collapsedSidebar, isDarkSidenav, locale, auth };
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction,
	fetchUserDetails
})(Sidebar));
