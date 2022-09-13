// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import { Tabs, Tab } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import ChannelsTab from './components/ChannelsTab';
import NewCategoryTab from './components/NewCategoryTab';
import TicketStatusTab from './components/TicketStatusTab';
import TicketSettingsTab from './components/TicketSettingsTab';
import TicketCategoriesTab from './components/TicketCategoriesTab';
import RightArrow from '../../../../assets/imgF/arrow_right.png';
import { hasFeatureAccess, brandKit } from '../../../../helper';

function TicketSettings() {
    const location = useLocation();
    const [tabKey, setTabKey] = useState(hasFeatureAccess('categories') ? 'ticket-categories' : 'ticket-settings');
    useEffect(() => {
        if (location.state && location.state.hasOwnProperty('historyTabKey')) {
            setTabKey(location.state.historyTabKey);
        }
    }, [location]);

    const actionBtnStyle = css({
        '& > li > button.active': {
            color: `${brandKit({ col: 0 })?.color} !important`,
            fontWeight: 600,
            borderBottom: `2px solid ${brandKit({ bgCol: 0 })?.backgroundColor} !important`,
        },
    });
    return (
        <div>
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <span>Conversation</span>
                    </h6>
                </div>
                <div className="mt-4">
                    <ul className={`nav nav-pills ${actionBtnStyle}`} id="fieldTabsSelector" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link px-0 me-5 ${tabKey === 'ticket-settings' && 'active'} text-muted`}
                                id="pills-customer-tab"
                                type="button"
                                role="tab"
                                onClick={() => setTabKey('ticket-settings')}
                                aria-controls="customer-field-view"
                                aria-selected="true"
                            >
                                Conversation Distribution
                            </button>
                        </li>
                        {hasFeatureAccess('status') && (
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link px-0 me-5 ${
                                        tabKey === 'ticket-status' && 'active'
                                    } text-muted`}
                                    id="pills-ticket-tab"
                                    onClick={() => setTabKey('ticket-status')}
                                    type="button"
                                    role="tab"
                                    aria-controls="ticket-categoriese-view"
                                    aria-selected="false"
                                >
                                    Conversation Status
                                </button>
                            </li>
                        )}
                        {hasFeatureAccess('categories') && (
                            <>
                                <li className="nav-item px-0" role="presentation">
                                    <button
                                        className={`nav-link px-0 me-5 ${
                                            tabKey === 'ticket-categories' && 'active'
                                        } text-muted`}
                                        id="pills-ticket-tab"
                                        onClick={() => setTabKey('ticket-categories')}
                                        type="button"
                                        role="tab"
                                        aria-controls="ticket-categoriese-view"
                                        aria-selected="false"
                                    >
                                        Conversation Categories
                                    </button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button
                                        className={`nav-link px-0 me-5 ${
                                            tabKey === 'new-category' && 'active'
                                        } text-muted`}
                                        id="pills-ticket-tab"
                                        onClick={() => setTabKey('new-category')}
                                        type="button"
                                        role="tab"
                                        aria-controls="ticket-categoriese-view"
                                        aria-selected="false"
                                    >
                                        Add Category
                                    </button>
                                </li>
                            </>
                        )}
                        {hasFeatureAccess('channels') && (
                            <li className="nav-item" role="presentation">
                                <button
                                    className={`nav-link px-0 ${tabKey === 'channels' && 'active'} text-muted`}
                                    id="pills-channels-tab"
                                    onClick={() => setTabKey('channels')}
                                    type="button"
                                    role="tab"
                                    aria-controls="ticket-channels-view"
                                    aria-selected="false"
                                >
                                    Channels
                                </button>
                            </li>
                        )}
                    </ul>
                </div>

                <div id="fieldTabsWrapper">
                    {/* Ticket History Tab */}
                    <Tabs
                        id="fieldTabs"
                        activeKey={tabKey}
                        onSelect={(k) => setTabKey(k)}
                        className="mb-3 ticket-settings-tabs"
                    >
                        <Tab eventKey="ticket-settings" className="">
                            <TicketSettingsTab />
                        </Tab>

                        <Tab eventKey="ticket-status" className="">
                            {hasFeatureAccess('status') && <TicketStatusTab />}
                        </Tab>

                        {/* Ticket Field Tab */}
                        <Tab eventKey="ticket-categories" className="">
                            {hasFeatureAccess('categories') && <TicketCategoriesTab />}
                        </Tab>
                        <Tab eventKey="new-category" className="">
                            {hasFeatureAccess('categories') && <NewCategoryTab />}
                        </Tab>

                        <Tab eventKey="channels" className="">
                            {hasFeatureAccess('channels') && <ChannelsTab />}
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default TicketSettings;
