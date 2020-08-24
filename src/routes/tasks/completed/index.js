/* eslint-disable */
import React ,{Component} from 'react';
import {Helmet} from "react-helmet";

import IntlMessages from "Util/IntlMessages";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";



export default class CompletedTask extends Component{
    render(){
        const{match} = this.props;
        return(
            <div className="ecom-dashboard-wrapper">
                <Helmet>
                    <title>Polucon | Task Completed</title>
                    <meta name="description" content="Task Rejected" />
                </Helmet>
                <PageTitleBar title={<IntlMessages id="sidebar.completed" />} match={match} />
            </div>
        );
    }
}



