/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './dashboard.scss';
import './dashcards/pieChartCard/pieChartCard.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { NotificationManager } from 'react-notifications';
import LineChartCard from './dashcards/lineChartCard';
import PieChartCard from './dashcards/pieChartCard';
import TotalCard from './dashcards/totalCard';
import ProgressBar from './dashcards/progressBar';

import 'react-circular-progressbar/dist/styles.css';
import { httpGetMain } from '../../../helpers/httpMethods';

function AgentDashboard() {
    const [dashInfo, setDashInfo] = useState({});
    const [userInfo, setUserInfo] = useState({});
    const getTickets = async () => {
        const user = JSON.parse(localStorage.getItem('user'));

        const res = await httpGetMain('tickets');
        if (res?.status == 'success') {
            console.clear();
            console.log(res.data);
            console.log('user', user);
            setDashInfo({
                ...dashInfo,
                totalTickets: parseInt(res?.data?.meta?.totalItems),
            });
        } else {
            return NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
        const statuses = await httpGetMain('statuses');

        if (statuses?.status == 'success') {
            // console.clear();
            console.log('statues', statuses.data);

            // setDashInfo({
            //   ...dashInfo,
            //   totalTickets: parseInt(statuses?.data?.meta?.totalItems),
            // });
        } else {
            return NotificationManager.error(statuses?.er?.message, 'Error', 4000);
        }
    };
    useEffect(() => {
        getTickets();
    }, []);
    return (
        <div className="dashboard">
            <h3 className="greeting">Hi, Dabo</h3>
            <div className="charts">
                <div className="top">
                    <div className="pie-chart" style={{ backgroundColor: 'white' }}>
                        <div className="top-section">
                            <p>Customer Satisfaction (CSAT)</p>
                        </div>
                        <div style={{ width: 130, height: 130 }} className="circular-progress">
                            <CircularProgressbar
                                value={62.5}
                                text={`${62.5}%`}
                                styles={buildStyles({
                                    strokeLinecap: 'butt',
                                    pathColor: '#1E90FF',
                                    textColor: '#263238',
                                })}
                            />
                        </div>
                    </div>
                    <PieChartCard
                        values={[25, 5, 20, 18]}
                        colors={['#D1E8FF', '#1E90FF', '#0707ED', '#000080']}
                        labels={['Open', 'In Progress', 'Pending', 'Closed']}
                    />
                </div>
                <LineChartCard />
            </div>
            <div className="side-bar">
                <TotalCard title="Total Tickets" value={dashInfo?.totalTickets} color="#662D91" />
                <TotalCard title="Assigned Tickets" value={57} color="#51B74F" />
                <TotalCard title="Overdue Tickets" value={50} color="#F40D0D" />

                {/* sidebar progress bars */}
                <div className="progress-bars">
                    <div className="top-section">
                        <h3>Ticket Category</h3>
                    </div>
                    <ProgressBar title="Complaints" value={10} color="#000080" />
                    <ProgressBar title="Enquiry" value={15} color="#51B74F" />
                    <ProgressBar title="Request" value={28} color="#F40D0D" />
                    <ProgressBar title="Double deduction" value={10} color="#662D91" />
                    <ProgressBar title="Service pricing" value={10} color="#0067DD" />
                    <ProgressBar title="Account statement" value={10} color="#FEAE3B" />
                </div>
            </div>
        </div>
    );
}

export default AgentDashboard;
