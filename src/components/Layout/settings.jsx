/* eslint-disable */
import React, { useEffect, useContext } from 'react';
import Navbar from './Navbar.jsx';
import Sidebar from './Sidebar';
import './layout.css';
import { LayoutContext } from '../../context/layoutContext';

export default function Index(props) {
    useEffect(() => {}, []);

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

            <div>
                <section className="settings-container">{props.children}</section>
            </div>
        </div>
    );
}
