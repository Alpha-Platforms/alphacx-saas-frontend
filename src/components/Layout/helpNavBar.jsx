import React from "react";
import { useScrollDetect } from "../helpers/helpers";
import Logo from "../../assets/imgF/logo.png";
import AlphaLogo from "../../assets/imgF/alpha.png";
import "./helpnav.scss";
import { Link } from "react-router-dom";

const HelpNavBar = () => {
  const { shadow: scroll } = useScrollDetect();
  return (
    <div className={`help-nav ${scroll ? "onScroll" : ""}`}>
      <div className="logo">
        <img src={AlphaLogo} alt="" />
        <img src={Logo} alt="" />
      </div>
      <div className="nav-links">
        <p className="link">FAQ</p>
        <p className="link">Submit a ticket</p>
        <Link to="/register">
          <p className="link">Sign in</p>
        </Link>
      </div>
    </div>
  );
};

export default HelpNavBar;
