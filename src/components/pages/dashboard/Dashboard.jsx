/* eslint-disable */
// @ts-nocheck
import { useEffect, Fragment, useState } from 'react';
//
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
//
import TicketCount from './components/TicketCount';
import TicketStatusPie from './components/TicketStatusPie';
import TicketLineGraph from './components/TicketLineGraph';
import TicketCategoryBar from './components/TicketCategoryBar';
import { getAnalytics, getNewAnalytics } from '../../../reduxstore/actions/analyticsActions';
//
import '../../../styles/Dashboard.css';

function DashboardTwo({
    isAnalyticsLoaded,
    isNewAnalyticsLoaded,
    analytics,
    newAnalytics,
    user,
    getAnalytics,
    getNewAnalytics,
    isUserAuthenticated,
}) {
    useEffect(() => {
        if (isUserAuthenticated) {
            // getAnalytics();
            getNewAnalytics();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);

    return (
        <Container fluid>
            <>
                {!isAnalyticsLoaded && !isNewAnalyticsLoaded ? (
                    <div className="text-center mt-4">
                        <ScaleLoader loading color="#006298" />
                    </div>
                ) : (
                    <div className="dashboard-main">
                        {/* Authenticated User */}
                        {/* <div>
                            <h3 className="wlc-text">Hi, {textCapitalize(`${user?.firstname || ""}`)}</h3>
                        </div> */}
                        <div className="dashboard-wrapper">
                            <div className="box-1">
                                <div className="dashboard-box-top my-3 px-2">
                                    <div>Customer Satisfaction (CSAT)</div>
                                    <div>
                                        {/* <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                                            <Dropdown.Toggle variant="transparent" size="sm">
                                                <span className="">Days</span> <i className="bi bi-chevron-expand"></i>
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item eventKey="1">
                                                    <span className="black-text">--</span>
                                                </Dropdown.Item>
                                                <Dropdown.Item eventKey="2">
                                                    <span className="black-text">--</span>
                                                </Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                    </div>
                                </div>
                                <div className="csat-progress">
                                    <CircularProgressbar
                                        value={analytics?.cSat || 0}
                                        text={`${analytics?.cSat || 0}%`}
                                        styles={buildStyles({
                                            strokeLinecap: 'butt',
                                            pathColor: '#1E90FF',
                                            textColor: '#263238',
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="box-2">
                                <TicketStatusPie analytics={analytics} newAnalytics={newAnalytics} />
                            </div>
                            <div className="box-3">
                                <div>
                                    <TicketCount analytics={analytics} newAnalytics={newAnalytics} />
                                    <TicketCategoryBar analytics={analytics} newAnalytics={newAnalytics} />
                                </div>
                            </div>
                            <div className="box-4">
                                <TicketLineGraph analytics={{ newTicket: [] }} />
                            </div>
                        </div>
                    </div>
                )}
            </>
        </Container>
    );
}

const mapStateToProps = (state, ownProps) => ({
    isAnalyticsLoaded: state.analytics.isAnalyticsLoaded,
    isNewAnayticsLoaded: state.analytics.isNewAnayticsLoaded,
    analytics: state.analytics.analytics,
    newAnalytics: state.analytics.newAnalytics,
    user: state.userAuth.user,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
});

export default connect(mapStateToProps, { getAnalytics, getNewAnalytics })(DashboardTwo);