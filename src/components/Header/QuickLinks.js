/**
 * Quick Links
 */
import React from 'react';
import { UncontrolledDropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import { Link } from 'react-router-dom';
import { Badge } from 'reactstrap';
import Tooltip from '@material-ui/core/Tooltip';
import { withRouter } from "react-router-dom";

// helpers
import { getAppLayout } from "Helpers/helpers";

const QuickLinks = ({ location }) => (
	<UncontrolledDropdown nav className="list-inline-item quciklink-dropdown tour-step-1">
		<DropdownToggle nav className="header-icon p-0">
			<Tooltip title="Quick Links" placement="bottom">
				<i className="zmdi zmdi-apps"></i>
			</Tooltip>
		</DropdownToggle>
		<DropdownMenu>
			<Scrollbars className="rct-scroll" autoHeight autoHeightMin={100} autoHeightMax={350}>
				<div className="dropdown-content">
					<div className="dropdown-top d-flex justify-content-between rounded-top bg-primary">
						<span className="text-white font-weight-bold">Quick Links</span>
						<Badge color="warning">1 NEW</Badge>
					</div>
					<ul className="list-unstyled mb-0 dropdown-list">
						<li>
							<Link to={`/${getAppLayout(location)}/pages/report`}>
								<i className="ti-notepad text-primary mr-10"></i>
								<span>báo cáo</span>
							</Link>
						</li>
						<li>
							<Link to={`/${getAppLayout(location)}/tables/data-table`}>
								<i className="ti-layout text-danger mr-10"></i>
								<span>bảng</span>
							</Link>
						</li>
						<li>
							<Link to={`/${getAppLayout(location)}/users/user-management`}>
								<i className="ti-user text-success mr-10"></i>
								<span>Quản lý tài khoản</span>
							</Link>
						</li>
						<li>
							<Link to={`/${getAppLayout(location)}/ecommerce/invoice`}>
								<i className="text-info ti-agenda mr-10"></i>
								<span>Invoice</span>
							</Link>
						</li>
						<li>
							<Link to={`/${getAppLayout(location)}/mail/folder/inbox`}>
								<i className="ti-email text-danger  mr-10"></i>
								<span>Tin nhắn</span>
							</Link>
						</li>
						<li>
							<Link to={`/${getAppLayout(location)}/calendar/basic`}>
								<i className="text-warning ti-calendar mr-10"></i>
								<span>Lịch</span>
							</Link>
						</li>

					</ul>
				</div>
			</Scrollbars>
		</DropdownMenu>
	</UncontrolledDropdown>
);

export default withRouter(QuickLinks);
