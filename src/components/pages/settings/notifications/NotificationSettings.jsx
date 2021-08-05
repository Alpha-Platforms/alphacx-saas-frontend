import React from "react";
import { useState } from "react";
import "./NotificationSettings.scss";
import TripleDot from "../../../../assets/imgF/triple_dot.png";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import { Link } from "react-router-dom";

const TableItem = ({ not }) => {
  const [showActions, setShowActions] = useState(false);
  return (
    <div className="listItem">
      <p>{not.name}</p>
      <p>{not.category}</p>
      <p>{not.subject}</p>
      <p>{not.description}</p>
      {/* <button
        className="actions-btn"
        onClick={() => setShowActions(!showActions)}
      >
        <img src={TripleDot} alt="" />
      </button>
      {showActions && (
        <div className="actions-drop">
          <p>Edit</p>
          <p>Delete</p>
        </div>
      )} */}
    </div>
  );
};

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState([
    {
      name: "Welcome Message",
      category: "Email",
      subject: "Welcome to AlphaCX",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Welcome Message",
      category: "SMS",
      subject: "Welcome to AlphaCX",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      name: "Welcome Message",
      category: "WhatsApp",
      subject: "Welcome to AlphaCX",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
  ]);
  return (
    <div className="notification-settings">
      <div className="card card-body bg-white border-0 p-5 mt-4">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            Settings{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
            <span className="text-custom">Notification Settings</span>
          </h6>
        </div>
        <div className="d-flex justify-content-between align-baseline">
          <h5 className="mt-3 mb-4 f-16 fw-bold">Email Management</h5>
          <div>
            <Link
              className="btn btn-sm f-14 px-5 btn-custom bt"
              to="/settings/notifications/email-template"
            >
              Add Notification
            </Link>
          </div>
        </div>
        <div className="articleList">
          <div className="header">
            <p>Name</p>
            <p>Notification Category</p>
            <p>Subject</p>
            <p>Description </p>
          </div>
          {notifications?.map((not, i) => (
            <TableItem key={i} not={not} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotificationSettings;
