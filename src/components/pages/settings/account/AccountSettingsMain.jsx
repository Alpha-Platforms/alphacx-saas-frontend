// @ts-nocheck
import {useState, useEffect} from "react";
import { connect } from "react-redux";
import {Tabs, Tab} from "react-bootstrap";
import {Link} from "react-router-dom";
import RightArrow from "../../../../assets/imgF/arrow_right.png"
import Subscription from './subscription/Subscription';
import AccountSettings from './AccountSettings';


const AccountSettingsMain = ({userRole}) => {

    const [tabKey, setTabKey] = useState("acct-settings");
    // const [tabKey, setTabKey] = useState("sub-payment");

    // const [tabKey,
    //     setTabKey] = useState("sub-payment");

    // useEffect(() => {
    //     console.clear()
    //     console.log(userRole)
    // }, [])

    return (
        <div>
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{" "}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/> {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <span>Account Settings</span>
                    </h6>
                </div>
                <div className="mt-3 mb-2">
                    <ul className="nav nav-pills" id="fieldTabsSelector" role="tablist">
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link px-0 me-5 ${tabKey === "acct-settings" && "active"} text-muted`}
                                id="pills-customer-tab"
                                type="button"
                                role="tab"
                                onClick={() => setTabKey("acct-settings")}
                                aria-controls="customer-field-view"
                                aria-selected="true">
                                Account Settings
                            </button>
                        </li>
                        <li className="nav-item" role="presentation">
                            <button
                                className={`nav-link px-0 me-5 ${tabKey === "sub-payment" && "active"} text-muted`}
                                id="pills-ticket-tab"
                                onClick={() => setTabKey("sub-payment")}
                                type="button"
                                role="tab"
                                aria-controls="ticket-categoriese-view"
                                aria-selected="false">
                                Subscription and Payment
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
                        className="mb-3 ticket-settings-tabs">
                        <Tab eventKey="acct-settings" className="">
                            <AccountSettings />
                        </Tab>

                        {/* Ticket Field Tab */}
                        <Tab eventKey="sub-payment" className="">
                            <Subscription />
                        </Tab>

                    </Tabs>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    userRole: state.userAuth.user.role
})
export default connect(mapStateToProps)(AccountSettingsMain)
