import React from "react";
import { Link } from "react-router-dom";
import { HelpNavIcon } from "../../../../../assets/images/svgs";
import "./navCard.scss";

const NavCard = ({ title, icon, items, link }) => {
  return (
    <div className="nav-card">
      <Link to={`/help${link}` || "/help"}>
        <div className="nav-icon">
          <HelpNavIcon name={icon} size={50} />
        </div>
        <p className="title">{title}</p>
        <div className="description">
          {items.map((item, i) => (
            <p key={i}>{item}</p>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default NavCard;
