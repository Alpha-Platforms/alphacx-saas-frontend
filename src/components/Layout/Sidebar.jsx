/* eslint-disable */
import React, { useState, useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { NotificationManager } from 'react-notifications';
import Modal from 'react-responsive-modal';
import AccessControl from 'components/pages/auth/accessControl';
import { LayoutContext } from '../../context/layoutContext';
import { AuthContext } from '../../context/authContext';
import {
    // appLogo,
    // dashboardIcon,
    toggleIcon,
    HomeIcon,
    ClockIcon,
    CardIcon,
    MoreIcon,
    LogoutIcon,
    Graph,
    SettingsIcon,
    AppLogo,
    AppFullLogo,
} from '../../assets/images/svgs';

export default function Sidebar({ browserRouter, currentRoute }) {
    const {
        // setreduceSidebarWidth,
        appReduceSidebarWidth,
        reduceSidebarWidth,
    } = useContext(LayoutContext);

    const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

    return (
        <>
            <menu className={`sidebar-wrap ${appReduceSidebarWidth === true ? '' : 'collapsed'}`}>
                <header className="sidebar-header">
                    <span className="sidebar-header--full-logo">
                        <AppFullLogo />
                    </span>
                    <span className="sidebar-header--logo">
                        <AppLogo />
                    </span>
                </header>
                <ul className="sidebar-list mb-auto">
                    <li onClick={() => reduceSidebarWidth()} className="sidebar-list--item">
                        <span className="sidebar-list--icon">{toggleIcon}</span>
                        <span className="sidebar-list--text small fst-italic">Collapse Menu</span>
                    </li>

                    <li
                        className={`sidebar-list--item ${
                            currentRoute === '/' || currentRoute === '/tabs' ? 'active' : ''
                        }`}
                        onClick={() => browserRouter(`/`)}
                    >
                        <span className="sidebar-list--icon">
                            <HomeIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Dashboard</span>
                    </li>

                    <li
                        onClick={() => browserRouter(`/conversation`)}
                        className={`sidebar-list--item ${currentRoute === '/conversation' ? 'active' : ''}`}
                    >
                        <span className="sidebar-list--icon">
                            <ClockIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Conversations</span>
                    </li>

                    <li
                        onClick={() => browserRouter(`/tickets`)}
                        className={`sidebar-list--item ${currentRoute === '/tickets' ? 'active' : ''}`}
                    >
                        <span className="sidebar-list--icon">
                            <CardIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Tickets</span>
                    </li>

                    <li
                        onClick={() => browserRouter(`/customers`)}
                        className={`sidebar-list--item ${currentRoute === '/customers' ? 'active' : ''}`}
                    >
                        <span className="sidebar-list--icon">
                            <MoreIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Customers</span>
                    </li>

                    <AccessControl>
                        <li
                            onClick={() => browserRouter(`/reports`)}
                            className={`sidebar-list--item ${currentRoute === '/reports' ? 'active' : ''}`}
                        >
                            <span className="sidebar-list--icon">
                                <Graph activeRoute={false} />
                            </span>
                            <span className="sidebar-list--text">Reports</span>
                        </li>
                    </AccessControl>

                    <li
                        onClick={() => browserRouter(`/settings`)}
                        className={`sidebar-list--item ${currentRoute === '/settings' ? 'active' : ''}`}
                    >
                        <span className="sidebar-list--icon">
                            <SettingsIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Settings</span>
                    </li>
                </ul>
                <ul className="sidebar-list mt-auto">
                    <li onClick={() => setIsDeleteConfirmed(true)} className="sidebar-list--item">
                        <span className="sidebar-list--icon">
                            <LogoutIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Logout</span>
                    </li>
                </ul>
            </menu>
            <Modal open={isDeleteConfirmed} onClose={() => setIsDeleteConfirmed(false)} center>
                <div className="p-5 w-100">
                    <h6 className="mb-5">Are you sure you want to logout?</h6>
                    <div className="d-flex justify-content-center">
                        <button
                            className="btn btn-sm f-12 border cancel px-4"
                            onClick={() => setIsDeleteConfirmed(false)}
                        >
                            Cancel
                        </button>
                        <button
                            className="btn btn-sm ms-2 f-12 bg-custom px-4"
                            onClick={(e) => {
                                e.preventDefault();
                                // retain onboardingSplash value
                                const onboardingSplash = localStorage.getItem('onboardingSplash');
                                localStorage.clear();
                                localStorage.setItem('onboardingSplash', onboardingSplash);

                                NotificationManager.success('Logout Successfully.');
                                window.location.href = '/login';
                            }}
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}
