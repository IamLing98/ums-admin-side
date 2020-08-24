/**
 * Module Dashboard
 */

import React from 'react'
import { Helmet } from "react-helmet";
// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';
import { ApprovedTasksWidget, TotalClientWidget, TotalTaskWidget } from "Components/Widgets";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


export const ModuleHome = ({match}) => {
    console.log(match.url)
    return (
        <div className="data-table-wrapper">
            <PageTitleBar title={<span>Học Phần</span>} match={match} />
            <div class="rct-block ">

                ádas
            </div>
        </div>
    )

}

export default ModuleHome;
