// @ts-nocheck
import {useEffect} from 'react';
import '../../../styles/Dashboard.css';
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
import TicketCategoryBar from './components/TicketCategoryBar';
import TicketCount from './components/TicketCount';
import TicketStatusPie from './components/TicketStatusPie';
import TicketLineGraph from './components/TicketLineGraph';
import {Dropdown} from 'react-bootstrap';
import { Fragment } from 'react';
import {connect} from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {textCapitalize} from '../../../helper';
// 
import Container from 'react-bootstrap/Container';
import { getAnalytics } from './../../../reduxstore/actions/analyticsActions';

const DashboardTwo = ({isAnalyticsLoaded, analytics, user, getAnalytics, isUserAuthenticated}) => {

    useEffect(() => {
        if (isUserAuthenticated) {
            getAnalytics()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);

    return (
        <Container fluid>
            <Fragment>
                {!isAnalyticsLoaded ?
                    <div className="text-center mt-4"><ScaleLoader loading={true} color={"#006298"}/></div>
                : <div className="dashboard-main">
                    <div>
                        <h3 className="wlc-text">Hi, {textCapitalize(`${user?.firstname || ""}`)}</h3>
                    </div>
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
                                    text={`${ analytics?.cSat || 0 }%`}
                                    styles={buildStyles({strokeLinecap: "butt", pathColor: "#1E90FF", textColor: "#263238"})}/>
                            </div>

                        </div>
                        <div className="box-2">
                            <TicketStatusPie analytics={analytics} />
                        </div>
                        <div className="box-3">
                            <div>
                                <TicketCount analytics={analytics} />
                                <TicketCategoryBar analytics={analytics} />
                            </div>
                        </div>
                        <div className="box-4">
                            <TicketLineGraph analytics={analytics} />
                        </div>
                    </div>
                </div>}
            </Fragment>
        </Container>
    )
}

const mapStateToProps = (state, ownProps) => ({
    isAnalyticsLoaded: state.analytics.isAnalyticsLoaded,
    analytics: state.analytics.analytics,
    user: state.userAuth.user,
    isUserAuthenticated: state.userAuth.isUserAuthenticated
});

export default connect(mapStateToProps, { getAnalytics })(DashboardTwo);