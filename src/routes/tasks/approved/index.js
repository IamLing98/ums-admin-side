/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";



export default class ApprovedTask extends Component{
    render(){
        const{match} = this.props;
        return(
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Polucon | Task Approved</title>
                    <meta name="description" content="Task Approved" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.approved" />} match={match} />
            </div>
        );
    }
}



