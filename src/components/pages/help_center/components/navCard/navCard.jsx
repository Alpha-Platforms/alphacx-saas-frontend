import React from "react";
import { HelpNavIcon } from "../../../../../assets/images/svgs";
import "./navCard.scss";

const NavCard = ({ title, icon, items }) => {
  return (
    <div className="nav-card">
      <div className="nav-icon">
        <HelpNavIcon name={icon} size={50} />
      </div>
      <p className="title">{title}</p>
      <div className="description">
        {items.map((item, i) => (
          <p key={i}>{item}</p>
        ))}
      </div>
    </div>
  );
};

export default NavCard;
