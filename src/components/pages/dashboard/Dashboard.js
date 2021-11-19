// @ts-nocheck
import { useEffect, Fragment, useState} from 'react';
// 
import {connect} from 'react-redux';
import Container from 'react-bootstrap/Container';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {CircularProgressbar, buildStyles} from "react-circular-progressbar";
// 
import TicketCount from './components/TicketCount';
import TicketStatusPie from './components/TicketStatusPie';
import TicketLineGraph from './components/TicketLineGraph';
import OnboardingModal from './components/OnboardingModal';
import TicketCategoryBar from './components/TicketCategoryBar';
import { getAnalytics } from './../../../reduxstore/actions/analyticsActions';
// 
import '../../../styles/Dashboard.css';

const DashboardTwo = ({isAnalyticsLoaded, analytics, user, getAnalytics, isUserAuthenticated}) => {
    const [open, setOpen] = useState(false);
    const [onboardingSplashScreen, setOnboardingSplashScreen] = useState(false)

    const hideOnboardingModal = () => setOpen(false);
    const openOnboardingModal = () => setOpen(true);

    useEffect(() => {
        if (isUserAuthenticated) {
            getAnalytics();
            // /*  */
            setOpen(false);
            // /*  */
            let onboardingSplash = localStorage.getItem("onboardingSplash")
            if(!onboardingSplash || onboardingSplash != "hide"){
                setOnboardingSplashScreen(true);
            }else{
                setOnboardingSplashScreen(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);

    return (
        <Fragment>
            <Container fluid>
                <Fragment>
                    {!isAnalyticsLoaded ?
                        <div className="text-center mt-4"><ScaleLoader loading={true} color={"#006298"}/></div>
                    : <div className="dashboard-main">
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
            {onboardingSplashScreen ? 
                <OnboardingModal open={open} hide={hideOnboardingModal} setOpen={openOnboardingModal} />
                : null
            }
        </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => ({
    isAnalyticsLoaded: state.analytics.isAnalyticsLoaded,
    analytics: state.analytics.analytics,
    user: state.userAuth.user,
    isUserAuthenticated: state.userAuth.isUserAuthenticated
});

export default connect(mapStateToProps, { getAnalytics })(DashboardTwo);