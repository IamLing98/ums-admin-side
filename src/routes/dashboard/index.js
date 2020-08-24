/**
 * Dasboard Routes
 */
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
// async components
import {
    AsyncClientHomeDashboardComponent,
    AsyncHomeDashboardComponent
} from 'Components/AsyncComponent/AsyncComponent';

const Dashboard = ({ match,userData }) => {

    return( <div className="Crm-wrapper">
        <Switch>
            <Redirect exact from={`${match.url}/`} to={`${match.url}/home`} />
            {userData && (userData.roles[0] === 'ROLE_CLIENT') ?
                <Route path={`${match.url}/home`} component={AsyncClientHomeDashboardComponent} />
                :
                <Route path={`${match.url}/home`} component={AsyncHomeDashboardComponent} />

            }
        </Switch>
    </div>);
};
const mapStateToProps = state =>({
    ...state.auth
});
export default connect(mapStateToProps,null)(Dashboard);
