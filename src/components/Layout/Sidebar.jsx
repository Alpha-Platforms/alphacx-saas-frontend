/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @ts-nocheck
import React, { useState, useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import Modal from 'react-responsive-modal';
import { useSelector } from 'react-redux';
import AccessControl from '../pages/auth/accessControl';
import { LayoutContext } from '../../context/layoutContext';
import {
    // appLogo,
    // dashboardIcon,
    // toggleIcon,
    HomeIcon,
    ClockIcon,
    CardIcon,
    MoreIcon,
    LogoutIcon,
    Graph,
    SettingsIcon,
    AppLogo,
    AppFullLogo,
    CollapseLeft,
} from '../../assets/images/svgs';
import { ReactComponent as DiscountWhite } from '../../assets/icons/Discount-White.svg';
import { hasFeatureAccess } from '../../helper';

export default function Sidebar({ browserRouter, currentRoute }) {
    const {
        // setreduceSidebarWidth,
        appReduceSidebarWidth,
        reduceSidebarWidth,
    } = useContext(LayoutContext);

    const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);

    const tenantSubscription = useSelector((state) => state?.subscription?.subscription);

    const numOfSubUsers = tenantSubscription?.subscription?.no_of_users;
    const totalUsers = tenantSubscription?.subscription?.totalUsers;

    const shouldShowUserExceededNotif = !tenantSubscription?.plan?.is_trial && totalUsers > numOfSubUsers;

    const customBrowserRouter = (path) => {
        if (!path) return;
        /* Should not execute the router method if more users exists than allowed */
        if (shouldShowUserExceededNotif) return;
        browserRouter(path);
    };

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
                        <span className={`sidebar-list--icon ${appReduceSidebarWidth === true ? '' : 'rotate-180'}`}>
                            <CollapseLeft />
                        </span>
                        <span className="sidebar-list--text small fst-italic">Collapse Menu</span>
                    </li>

                    <li
                        onClick={() => customBrowserRouter(`/`)}
                        className={`sidebar-list--item ${currentRoute === '/' ? 'active' : ''}`}
                    >
                        <span className="sidebar-list--icon">
                            <ClockIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Conversations</span>
                    </li>

                    <li
                        onClick={() => customBrowserRouter(`/tickets`)}
                        className={`sidebar-list--item ${currentRoute.includes('/tickets') ? 'active' : ''}`}
                    >
                        <span className="sidebar-list--icon">
                            <CardIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Tickets</span>
                    </li>

                    <li
                        onClick={() => customBrowserRouter(`/customers`)}
                        className={`sidebar-list--item ${currentRoute.includes('/customers') ? 'active' : ''}`}
                    >
                        <span className="sidebar-list--icon">
                            <MoreIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Customers</span>
                    </li>

                    {hasFeatureAccess('reports') && (
                        <AccessControl>
                            <li
                                onClick={() => customBrowserRouter(`/reports`)}
                                className={`sidebar-list--item ${currentRoute === '/reports' ? 'active' : ''}`}
                            >
                                <span className="sidebar-list--icon">
                                    <Graph activeRoute={false} />
                                </span>
                                <span className="sidebar-list--text">Reports</span>
                            </li>
                        </AccessControl>
                    )}

                    <li
                        onClick={() => customBrowserRouter(`/settings`)}
                        className={`sidebar-list--item ${currentRoute.includes('/settings') ? 'active' : ''}`}
                    >
                        <span className="sidebar-list--icon">
                            <SettingsIcon activeRoute={false} />
                        </span>
                        <span className="sidebar-list--text">Settings</span>
                    </li>

                    {tenantSubscription?.plan?.plan_type === 'appsumo' && (
                        <li
                            onClick={() => customBrowserRouter(`/appsumo-plans`)}
                            className={`sidebar-list--item ${currentRoute.includes('/appsumo-plans') ? 'active' : ''}`}
                        >
                            <span className="sidebar-list--icon">
                                <DiscountWhite />
                            </span>
                            <span className="sidebar-list--text">AppSumo Plans</span>
                        </li>
                    )}
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
                            type="button"
                            className="btn btn-sm f-12 border cancel px-4"
                            onClick={() => setIsDeleteConfirmed(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
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
