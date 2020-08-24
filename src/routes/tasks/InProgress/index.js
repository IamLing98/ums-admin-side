/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";



export default class PendingTask extends Component{
    render(){
        const{match} = this.props;
        return(
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Polucon | Task In-Progress</title>
                    <meta name="description" content="Task In Progress" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.inProgress" />} match={match} />
            </div>
        );
    }
}



