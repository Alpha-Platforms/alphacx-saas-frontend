import React from "react";
import { useScrollDetect } from "../helpers/helpers";
import Logo from "../../assets/imgF/logo.png";
import AlphaLogo from "../../assets/imgF/alpha.png";
import "./helpnav.scss";
import { Link } from "react-router-dom";

const HelpNavBar = ({ activeBG }) => {
  const { shadow: scroll } = useScrollDetect();
  return (
    <div className={`help-nav  ${scroll || activeBG ? "onScroll" : ""}`}>
      <div className="logo">
        <img src={AlphaLogo} alt="" />
        <img src={Logo} alt="" />
      </div>
      <div className="nav-links">
        <p className="link">FAQ</p>
        <Link to="/help/tickets">
          <p className="link">Submit a ticket</p>
        </Link>
        <Link to="/register">
          <p className="link">Sign in</p>
        </Link>
      </div>
    </div>
  );
};

export default HelpNavBar;
