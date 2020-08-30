/**
 * App Header
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { Link } from 'react-router-dom';
import screenfull from 'screenfull';
import Tooltip from '@material-ui/core/Tooltip';
import MenuIcon from '@material-ui/icons/Menu';
import { withRouter } from 'react-router-dom';
import $ from 'jquery';
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
// actions
import { collapsedSidebarAction } from 'Actions';

// // components
// import SearchForm from './SearchForm';
// import MobileSearchForm from './MobileSearchForm';
import Notifications from "Components/Header/Notifications";
import ChatSidebar from "Components/Header/ChatSidebar";


class Header extends Component {

	state = {
		customizer: false,
		isMobileSearchFormVisible: false
	}

	// function to change the state of collapsed sidebar
	onToggleNavCollapsed = (event) => {
		const val = !this.props.navCollapsed;
		this.props.collapsedSidebarAction(val);
	}

	// open dashboard overlay
	openDashboardOverlay() {
		$('.dashboard-overlay').toggleClass('d-none');
		$('.dashboard-overlay').toggleClass('show');
		if ($('.dashboard-overlay').hasClass('show')) {
			$('body').css('overflow', 'hidden');
		} else {
			$('body').css('overflow', '');
		}
	}

	// close dashboard overlay
	closeDashboardOverlay() {
		$('.dashboard-overlay').removeClass('show');
		$('.dashboard-overlay').addClass('d-none');
		$('body').css('overflow', '');
	}

	// toggle screen full
	toggleScreenFull() {
		screenfull.toggle();
	}

	// mobile search form
	openMobileSearchForm() {
		this.setState({ isMobileSearchFormVisible: true });
	}

	render() {
		const { isMobileSearchFormVisible } = this.state;
		$('body').click(function () {
			$('.dashboard-overlay').removeClass('show');
			$('.dashboard-overlay').addClass('d-none');
			$('body').css('overflow', '');
		});
		const { horizontalMenu, agencyMenu} = this.props;
		return (
			<AppBar position="static" className="rct-header">
				<Toolbar className="d-flex justify-content-between w-100 pl-0">
					<div className="d-flex align-items-center">
						{(horizontalMenu || agencyMenu) &&
							<div className="site-logo">
								<Link to="/" className="logo-mini">
									<img src={require('Assets/img/appLogo.png')} className="mr-15" alt="site logo" width="35" height="35" />
								</Link>
								<Link to="/" className="logo-normal">
									<img src={require('Assets/img/appLogoText.png')} className="img-fluid" alt="site-logo" width="67" height="17" />
								</Link>
							</div>
						}
						{!agencyMenu &&
							<ul className="list-inline mb-0 navbar-left">
								{!horizontalMenu ?
									<li className="list-inline-item" onClick={(e) => this.onToggleNavCollapsed(e)}>
										<Tooltip title="Thu nhỏ" placement="bottom">
											<IconButton  color="inherit" mini="true" aria-label="Menu" style ={{border:"none !important"}}className="humburger p-0">
												<MenuIcon /> 
											</IconButton>
										</Tooltip>
									</li> :
									<li className="list-inline-item">
										<Tooltip title="Thu nhỏ" placement="bottom">
											<IconButton color="inherit" aria-label="Menu" className="humburger p-0" component={Link} to="/">
												<i className="ti-layout-sidebar-left"></i>
											</IconButton>
										</Tooltip>
									</li>
								}
								<li className="list-inline-item search-icon d-inline-block">

									<IconButton mini="true" className="search-icon-btn" onClick={() => this.openMobileSearchForm()}>
										<i className="zmdi zmdi-search"></i>
									</IconButton>
									{/* <MobileSearchForm
									isOpen={isMobileSearchFormVisible}
										onClose={() => this.setState({ isMobileSearchFormVisible: false })}
									/>  */}
								</li>
								<li className="list-inline-item search-icon d-inline-block">
								<PageTitleBar title={<span style={{height:"100%", verticalAlign:"middle"}}>{this.props.currentLocationPathName.pageTitle}</span>} match={this.props.match} />
								</li>
							</ul>
						}
					</div>
					
 					<ul className="navbar-right list-inline mb-0">
						<Notifications />
						<li className="list-inline-item">
							<Tooltip title="Hòm thư" placement="bottom">
								<IconButton aria-label="settings" onClick={() =>  {}}>
									<i className="zmdi zmdi-email"></i>
								</IconButton>
							</Tooltip>
						</li>
						<li className="list-inline-item">
							<Tooltip title="Tin nhắn" placement="bottom">
								<IconButton aria-label="settings" onClick={() => {}}>
									<i className="zmdi zmdi-comments"></i>
								</IconButton>
							</Tooltip>
						</li>
						<li className="list-inline-item">
							<Tooltip title="Toàn màn hình" placement="bottom">
								<IconButton aria-label="settings" onClick={() => {}}>
									<i className="zmdi zmdi-crop-free"></i>
								</IconButton>
							</Tooltip>
						</li>


					</ul>
				</Toolbar>
			</AppBar>
		);
	}
}

// map state to props
const mapStateToProps = ({ settings, sidebar }) => {
	const {currentLocationPathName} = sidebar;
	return {...settings, currentLocationPathName};
};

export default withRouter(connect(mapStateToProps, {
	collapsedSidebarAction
})(Header));
