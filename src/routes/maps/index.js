/**
 * Maps Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Helmet } from "react-helmet";
// async components
import {
	AsyncGooleMapsComponent

} from 'Components/AsyncComponent/AsyncComponent';

const Maps = ({ match }) => (
	<div className="content-wrapper">
		<Helmet>
			<title>Polucon | Location</title>
			<meta name="description" content="Reactify Maps" />
		</Helmet>
		<Switch>
			<Redirect exact from={`${match.url}/`} to={`${match.url}/map`} />
			<Route path={`${match.url}/map`} component={AsyncGooleMapsComponent} />

		</Switch>
	</div>
);

export default Maps;
