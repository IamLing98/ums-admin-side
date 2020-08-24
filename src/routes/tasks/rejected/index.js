/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";



export default class RejectedTask extends Component{
    render(){
        const{match} = this.props;
        return(
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Polucon | Task Rejected</title>
                    <meta name="description" content="Task Rejected" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.rejected" />} match={match} />
            </div>
        );
    }
}



