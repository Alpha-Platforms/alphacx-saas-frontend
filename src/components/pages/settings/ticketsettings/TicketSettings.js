import {useState} from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import TicketCategoriesTab from './components/TicketCategoriesTab';
import TicketSettingsTab from './components/TicketSettingsTab';

const TicketSettings = () => {
    const [tabKey,
        setTabKey] = useState('ticket-settings');

    return (
        <div>
            <div className="card card-body bg-white border-0 p-5 mb-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">Settings
                        <i className="bi bi-chevron-right"></i>
                        <span className="text-custom">Ticket Settings</span>
                    </h6>
                </div>
                <div className="mt-4">
                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${ (tabKey === 'ticket-settings') && 'active'} text-muted`}
                                id="pills-customer-tab"
                                type="button"
                                role="tab"
                                onClick={() => setTabKey('ticket-settings')}
                                aria-controls="customer-field-view"
                                aria-selected="true">Ticket Settings</button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link ${ (tabKey === 'ticket-categories') && 'active'} text-muted`}
                                id="pills-ticket-tab"
                                onClick={() => setTabKey('ticket-categories')}
                                type="button"
                                role="tab"
                                aria-controls="ticket-categoriese-view"
                                aria-selected="false">Ticket Categories</button>
                        </li>
                    </ul>
                </div>

                <div>
                    {/* Ticket History Tab */}
                    <Tabs
                        id="fieldTabs"
                        activeKey={tabKey}
                        onSelect={(k) => setTabKey(k)}
                        className="mb-3">
                        <Tab eventKey="ticket-settings" className="px-2">
                            <TicketSettingsTab />
                        </Tab>

                        {/* Ticket Field Tab */}
                        <Tab eventKey="ticket-categories" className="px-2">
                            <TicketCategoriesTab />
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}

export default TicketSettings;