/* eslint-disable */
import React from 'react';
import './dashboard.scss';
import './dashcards/pieChartCard/pieChartCard.scss';
import 'react-circular-progressbar/dist/styles.css';

import Navigation from './navigation';
import AgentDashboard from './agentDashboard';

function Dashboard() {
    return (
        <>
            {/* <Navigation page="Dashboard" /> */}
            <AgentDashboard />
        </>
    );
}

export default Dashboard;
