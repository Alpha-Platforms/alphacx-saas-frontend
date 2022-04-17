import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import OnboardingModal from './components/OnboardingModal';
import './layout.css';

function Index({ user, isUserAuthenticated, ...props }) {
    const location = useLocation();
    const [open, setOpen] = useState(false);
    const [onboardingSplashScreen, setOnboardingSplashScreen] = useState(false);
    const hideOnboardingModal = () => setOpen(false);
    const openOnboardingModal = () => setOpen(true);
    console.log('%cindex.jsx line:15 location.pathname', 'color: white; background-color: #007acc;', location.pathname);
    useEffect(() => {
        if (isUserAuthenticated) {
            setOpen(false);
            const onboardingSplash = localStorage.getItem('onboardingSplash');
            if (!onboardingSplash || onboardingSplash != 'hide') {
                setOnboardingSplashScreen(true);
            } else {
                setOnboardingSplashScreen(false);
            }
        }
    }, [isUserAuthenticated]);

    return (
        <>
            <div className="general-wrapper">
                <div id="hideNav">
                    <Navbar
                        browserRouter={props.browserRouter}
                        routeType={props.routeType}
                        fullProps={props.fullProps}
                        pageName={props.pageName}
                    />
                </div>

                <Sidebar browserRouter={props.browserRouter} currentRoute={props.currentRoute} />
                <section className={`app-container ${location.pathname === '/conversation' ? 'convo-page' : ''}`}>{props.children}</section>
            </div>
            {onboardingSplashScreen ? (
                <OnboardingModal open={open} hide={hideOnboardingModal} setOpen={openOnboardingModal} />
            ) : null}
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.userAuth.user,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
});

export default connect(mapStateToProps, null)(Index);
