import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DocSvg } from "../../../../../assets/icons/Document2.svg";
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
          <DocSvg/>
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
