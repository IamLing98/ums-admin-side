/**
 * App Routes
 */
import React, { Component } from 'react';
import { Route, withRouter} from 'react-router-dom';
import { connect } from 'react-redux';

// app default layout
import RctHorizontalLayout from 'Components/RctHorizontalLayout';

// router service
import routerService from "../routes/_routerService.js";
import {fetchUserDetails, fetchUserError} from "Actions";


class DefaultLayout extends Component {

	render() {
		const { match } = this.props;

		return (
			<RctHorizontalLayout>
				{routerService && routerService.map((route,key)=>
					<Route key={key} path={`${match.url}/${route.path}`} component={route.component} />
				)}
			</RctHorizontalLayout>
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
