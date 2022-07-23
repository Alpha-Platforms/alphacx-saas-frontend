import React from 'react';
import Dashboard from '../dashboard/Dashboard';
import ReportsFilter from './ReportsFilter';

function Reports() {
    return (
        <>
            <ReportsFilter />
            <div className="reports-dashboard mb-5">
                <Dashboard />
            </div>
        </>
    );
}

export default Reports;
