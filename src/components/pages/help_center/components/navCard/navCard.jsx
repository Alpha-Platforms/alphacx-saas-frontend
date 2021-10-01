import React from "react";
import { Link } from "react-router-dom";
import { HelpNavIcon } from "../../../../../assets/images/svgs";
import "./navCard.scss";

const NavCard = ({ title, icon, folders, id }) => {
  return (
    <div className="nav-card">
      <Link
        to={
          `/knowledge-base/${title.toLowerCase().replaceAll(" ", "-")}?cat=${id}` ||
          "/knowledge-base"
        }
      >
        <div className="nav-icon">
          <HelpNavIcon name={icon} size={50} />
        </div>
        <p className="title">{title}</p>
        <div className="description">
          {folders.map((item, i) => (
            <p key={i}>{item.name}</p>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default NavCard;
