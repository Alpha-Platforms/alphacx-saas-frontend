import { useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import TicketCategoriesTab from "./components/TicketCategoriesTab";
import TicketSettingsTab from "./components/TicketSettingsTab";
import { Link } from "react-router-dom";
import RightArrow from "../../../../assets/imgF/arrow_right.png";

const TicketSettings = () => {
  const [tabKey, setTabKey] = useState("ticket-settings");

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
            <span>Ticket Settings</span>
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
                Ticket Settings
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link px-0 ${
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
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TicketSettings;
