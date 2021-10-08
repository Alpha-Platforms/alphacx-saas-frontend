import React from "react";
import { Link } from "react-router-dom";
import { HelpNavIcon } from "../../../../../assets/images/svgs";
import "./navCard.scss";
import {slugify, textCapitalize} from '../../../../../helper';

const NavCard = ({ title, icon, folders, id }) => {
  return (
    <div className="nav-card">
      <Link
        to={
          `/knowledge-base/${slugify(title.toLowerCase())}` ||
          "/knowledge-base"
        }
      >
        <div className="nav-icon">
          <HelpNavIcon name={icon} size={50} />
        </div>
        <p className="title">{textCapitalize(title)}</p>
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
