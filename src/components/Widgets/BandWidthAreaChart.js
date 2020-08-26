/**
 * BandWidth Area Chart Widget
 */
import React from 'react';

// dynamic line chart
import DynamicLineChart from 'Components/Charts/DynamicLineChart';

// rct card box
import { RctCard, RctCardContent } from 'Components/RctCard';

const BandwidthAreaChart = () => (
    <RctCard customClasses="gradient-primary overflow-hidden">
        <div className="p-20">
            <h2><span>Band witdh</span></h2>
            <h2>50 GB</h2>
        </div>
        <RctCardContent noPadding>
            <DynamicLineChart />
        </RctCardContent>
    </RctCard>
);

export default BandwidthAreaChart;
