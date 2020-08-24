import React from 'react';
import {Helmet} from "react-helmet";
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";
import IntlMessages from "Util/IntlMessages";
import RctCollapsibleCard from "Components/RctCollapsibleCard/RctCollapsibleCard";


class CreateInvoice extends React.Component{

    render() {
        const { match } = this.props;
        return(
            <div className="ecom-dashboard-wrapper">
                    <Helmet>
                        <title>Polucon | Create Invoice</title>
                        <meta name="description" content="Polucon Create Invoice" />
                    </Helmet>
                    <PageTitleBar title={<IntlMessages id="sidebar.createInvoices" />} match={match} />
                <RctCollapsibleCard
                heading="Create Invoice"
                collapsible
                fullBlock
                >


                </RctCollapsibleCard>
                <RctCollapsibleCard
                    heading="Invoice List"
                    collapsible
                    fullBlock
                >


                </RctCollapsibleCard>
            </div>)
    }
}

export default CreateInvoice;