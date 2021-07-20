import React from "react";
import "./navigation.scss";
import avatar from "../../../../assets/images/user.png";
import DashboardIcon from "./icons";
import { useScrollDetect } from "../../../helpers/helpers";

const Navigation = () => {
  const { shadow } = useScrollDetect();
  return (
    <div className="dashboard-navigation">
      <div className={`topbar ${shadow ? "box-shadow" : ""}`}>
        <h3 className="sub-title">Dashboard</h3>
        <div className="user-info">
          <div></div>
          <div></div>
          <div className="user-profile">
            <img src={avatar} alt="" />
          </div>
        </div>
      </div>
      <div className="sidebar">
        <div className="logo">
          <DashboardIcon name="logo" />
        </div>
        <div className="nav-icon">
          <div className="icon">
            <DashboardIcon name="home" />
          </div>
          <div className="icon">
            <DashboardIcon name="ticket" />
          </div>
          <div className="icon">
            <DashboardIcon name="profile" />
          </div>
          <div className="icon">
            <DashboardIcon name="graph" />
          </div>
          <div className="icon">
            <DashboardIcon name="setting" />
          </div>
          <div className="icon logout">
            <DashboardIcon name="logout" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
