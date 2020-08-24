/**
 * Ecommerce Dashboard
 */

import React, { Component } from 'react'

// intl messages
import IntlMessages from 'Util/IntlMessages';
import {Helmet} from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import {ApprovedTasksWidget, TotalClientWidget, TotalTaskWidget} from "Components/Widgets";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


export default class ClientHome extends Component {


    render() {
        const { match } = this.props;

        return (
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Polucon | Home</title>
                    <meta name="description" content="Polucon Home Page" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.home" />} match={match} />
                <div className="row">
                    <div className="col-sm-6 col-md-3 w-xs-half-block">
                        <TotalTaskWidget totalTask={30} />
                    </div>
                    <div className="col-sm-6 col-md-3 w-xs-half-block">
                        <TotalClientWidget totalClient={30} />
                    </div>
                    <div className="col-sm-6 col-md-6 w-xs-half-block">
                        <RctCollapsibleCard
                            colClasses="col-sm-12 col-md-8 col-lg-8 w-xs-full"
                            heading={<IntlMessages id="widgets.approvedTasks" />}
                            collapsible
                            reloadable
                            fullBlock
                        >
                            <ApprovedTasksWidget />
                        </RctCollapsibleCard>
                    </div>

                </div>
            </div>
        )
    }
}
