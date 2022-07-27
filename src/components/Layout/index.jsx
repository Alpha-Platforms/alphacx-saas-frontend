/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import './layout.css';

function Index({ ...props }) {
    const location = useLocation();

    return (
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
            <section className={`app-container ${location.pathname === '/conversation' ? 'convo-page' : ''}`}>
                {props.children}
            </section>
        </div>
    );
}

export default Index;
