import React, { useState, useEffect } from "react";
import "../conersations/conversation.css";
import "../../../styles/Setting.css";

// import searchIcon from "../../../assets/imgF/Search.png";
import AgentLightIcon from "../../../assets/icons/agent_light.svg";
import AutomationIcon from "../../../assets/icons/Automation.svg";
import ShieldIcon from "../../../assets/icons/Shield-Done.svg";
import DepartmentLightIcon from "../../../assets/icons/department_light.svg";
import MailLightIcon from "../../../assets/icons/mail_light.svg";
import FieldsLightIcon from "../../../assets/icons/fields_light.svg";
import FormsLightIcon from "../../../assets/icons/forms_light.svg";
import HierarchyLightIcon from "../../../assets/icons/heirarchy_light.svg";
import LocationLightIcon from "../../../assets/icons/location_light.svg";
import FolderBlueIcon from "../../../assets/icons/Folder-blue.svg";
import ReportsLightIcon from "../../../assets/icons/reports_light.svg";
import User3BlueIcon from "../../../assets/icons/3-User-blue.svg";
import SendBlueIcon from "../../../assets/icons/Send-blue.svg";
import SendBlueIcon2 from "../../../assets/icons/Activity-blue.svg";
import ActivityBlueIcon from "../../../assets/icons/Search-blue.svg";
import SearchBlueIcon from "../../../assets/icons/Database-blue.svg";
import DatabaseBlueIcon from "../../../assets/icons/Message-BW.svg";
import MessageBWIcon from "../../../assets/icons/account_light.svg";
import AccountLightIcon from "../../../assets/icons/Social-blurb.svg";
import SocialBlurbIcon from "../../../assets/icons/Chart-blue.svg";
import ChartBlueIcon from "../../../assets/icons/Star-BW.svg";
import StarBWIcon from "../../../assets/icons/User-BW.svg";
import UserBWIcon from "../../../assets/icons/Discount-blue.svg";
import DiscountBlueIcon from "../../../assets/icons/Touch-blue.svg";
import HeartBWIcon from "../../../assets/icons/Heart-BW.svg";
import RoleLightIcon from "../../../assets/icons/role_light.svg";
import LivechatIcon from "../../../assets/icons/chat-blue.svg";
import DocumentIcon from "../../../assets/icons/doc-blue.svg";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';

function SettingsHome({signedUser}) {
  return (
    <>
      <div className="form-group mb-4 rounded-pill">
        <input
          type="search"
          className="form-control magnifying-glass py-2"
          placeholder="Search Settings"
        />
      </div>

      <div
        className="flex-wrap d-flex align-items-start"
        style={{ flexBasis: "32%" }}
      >
        <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/users"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={AgentLightIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Users</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Create users, assign permissions
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link
            to="settings/automation"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={AutomationIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Automation</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Automate notifications, responses and durations
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/account"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={ShieldIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Account</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Access your profile and account subscriptions
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/email"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={MailLightIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Email</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Configure inbound and outbound email settings for your
                  organization
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link to={`/settings/profile/${signedUser.id}`} className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={UserBWIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Profile Settings</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Update your user profile
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/teams"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={FolderBlueIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Teams</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Organize users in your organization
                </p>
              </div>
            </div>
          </Link>
        </div>

{/*   ROLES */}
        {/* <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/roles"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={FolderBlueIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Roles</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Define access levels and permission for user types
                </p>
              </div>
            </div>
          </Link>
        </div> */}

        <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/tickets"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={AccountLightIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Ticket Settings</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Create ticket types, organize and prioritize tickets
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/help-center"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={SearchBlueIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Help Centre</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Learn how to use AlphaCX, fix a problem and get answers to
                  your questions
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/notifications"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={SendBlueIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Notifications</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Assign notifications roles to users
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link to="#" className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={RoleLightIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Customer Satisfaction</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Setup ratings for customer feedback
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link to="/settings/integrations" className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={SocialBlurbIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Integrations</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Connect social channels to your app.
                </p>
              </div>
            </div>
          </Link>
        </div>

        {/* <div className="setting-link-item border rounded bg-light">
          <Link
            to="/settings/canned-responses"
            className="d-block cursor text-decoration-none"
          >
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={DocumentIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Canned Responses</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Create responses templates
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link to="#" className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={LivechatIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Live Chat</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Setup and update Live Chat settings
                </p>
              </div>
            </div>
          </Link>
        </div>

        <div className="setting-link-item border rounded bg-light">
          <Link to="#" className="d-block cursor text-decoration-none">
            <div className="d-flex align-items-center p-md-4">
              <div className="">
                <img src={RoleLightIcon} alt="" />
              </div>
              <div className="ms-3">
                <h6 className="text-dark mb-0">Submit a Ticket</h6>
                <p className="acx-fs-8 lh-1 mt-1 text-muted">
                  Description here
                </p>
              </div>
            </div>
          </Link>
        </div> */}
      </div>
    </>
  );
}

const mapStateToProps = (state, ownProps) => ({
  signedUser: state.userAuth.user
})

export default connect(mapStateToProps, null)(SettingsHome);