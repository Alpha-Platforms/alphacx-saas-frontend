// @ts-nocheck
import { useState, useEffect } from "react";
// 
import { Tabs, Tab } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
// 
import ChannelsTab from './components/ChannelsTab';
import NewCategoryTab from './components/NewCategoryTab';
import TicketStatusTab from './components/TicketStatusTab';
import TicketSettingsTab from "./components/TicketSettingsTab";
import TicketCategoriesTab from "./components/TicketCategoriesTab";
// 
import RightArrow from "../../../../assets/imgF/arrow_right.png";

const TicketSettings = (props) => {
  const location = useLocation();
  // 
  const [tabKey, setTabKey] = useState("ticket-categories");
  // 
  useEffect(() => {
    if (location.state && location.state.hasOwnProperty('historyTabKey')) {
      setTabKey(location.state.historyTabKey)
    }
  }, [location]);
  // 
  return (
    <div>
      <div className="card card-body bg-white border-0 p-0 mb-4">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span>Ticket</span>
          </h6>
        </div>
        <div className="mt-4">
          <ul className="nav nav-pills" id="fieldTabsSelector" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link px-0 me-5 ${
                  tabKey === "ticket-settings" && "active"
                } text-muted`}
                id="pills-customer-tab"
                type="button"
                role="tab"
                onClick={() => setTabKey("ticket-settings")}
                aria-controls="customer-field-view"
                aria-selected="true"
              >
                Ticket Distribution
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link px-0 me-5 ${
                  tabKey === "ticket-status" && "active"
                } text-muted`}
                id="pills-ticket-tab"
                onClick={() => setTabKey("ticket-status")}
                type="button"
                role="tab"
                aria-controls="ticket-categoriese-view"
                aria-selected="false"
              >
                Ticket Stage
              </button>
            </li>
            <li className="nav-item px-0" role="presentation">
              <button
                className={`nav-link px-0 me-5 ${
                  tabKey === "ticket-categories" && "active"
                } text-muted`}
                id="pills-ticket-tab"
                onClick={() => setTabKey("ticket-categories")}
                type="button"
                role="tab"
                aria-controls="ticket-categoriese-view"
                aria-selected="false"
              >
                Ticket Categories
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link px-0 me-5 ${
                  tabKey === "new-category" && "active"
                } text-muted`}
                id="pills-ticket-tab"
                onClick={() => setTabKey("new-category")}
                type="button"
                role="tab"
                aria-controls="ticket-categoriese-view"
                aria-selected="false"
              >
                Add Category
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link px-0 ${
                  tabKey === "channels" && "active"
                } text-muted`}
                id="pills-channels-tab"
                onClick={() => setTabKey("channels")}
                type="button"
                role="tab"
                aria-controls="ticket-channels-view"
                aria-selected="false"
              >
                Channels
              </button>
            </li>
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

            {/* Ticket Field Tab */}
            <Tab eventKey="ticket-categories" className="">
              <TicketCategoriesTab />
            </Tab>

            <Tab eventKey="ticket-status" className="">
              <TicketStatusTab />
            </Tab>

            <Tab eventKey="new-category" className="">
              <NewCategoryTab />
            </Tab>
            <Tab eventKey="channels" className="">
              <ChannelsTab />
            </Tab>

          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TicketSettings;