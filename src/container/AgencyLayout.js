/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import AgencyLayout from 'Components/RctAgencyLayout';

// router service
import routerService from "../routes/_routerService.js";
import {fetchUserDetails, fetchUserError} from "Actions";


class DefaultLayout extends Component {

	render() {
		const { match } = this.props;

		return (
			<AgencyLayout>
				{routerService && routerService.map((route,key)=>
					<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</AgencyLayout>
		);

	}
}
const mapStateToProps = state =>({
	...state.auth
});
export default withRouter(connect(mapStateToProps,{
	fetchUserDetails,
	fetchUserError
})(DefaultLayout));
