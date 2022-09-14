/* eslint-disable */
// @ts-nocheck
import { useEffect, Fragment, useState } from 'react';
//
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import MoonLoader from 'react-spinners/MoonLoader';
import { css } from '@emotion/css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
//
import TicketCount from './components/TicketCount';
import TicketStatusPie from './components/TicketStatusPie';
import TicketLineGraph from './components/TicketLineGraph';
import TicketCategoryBar from './components/TicketCategoryBar';
import { getAnalytics, getNewAnalytics } from '../../../reduxstore/actions/analyticsActions';
import { brandKit } from './../../../helper';
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

    const brandingBg = brandKit({ bgCol: 0 });

    return (
        <div>
            <>
                {!isAnalyticsLoaded && !isNewAnalyticsLoaded ? (
                    <div className="d-flex justify-content-center align-items-center pt-5 away">
                    {' '}
                    <MoonLoader color={brandingBg?.backgroundColor} loading size={30} />
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
                                            pathColor: `${brandingBg?.backgroundColor}`,
                                            textColor: '#263238',
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="box-2">
                                <TicketStatusPie analytics={analytics} newAnalytics={newAnalytics} brandKit={brandKit} />
                            </div>
                            <div className="box-3">
                                <div>
                                    <TicketCount analytics={analytics} newAnalytics={newAnalytics} />
                                    <TicketCategoryBar analytics={analytics} newAnalytics={newAnalytics} />
                                </div>
                            </div>
                            <div className="box-4">
                                <TicketLineGraph brandingBg={brandingBg} newAnalytics={newAnalytics} analytics={{ newTicket: [] }} />
                            </div>
                        </div>
                    </div>
                )}
            </>
        </div>
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
