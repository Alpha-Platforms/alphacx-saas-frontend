import React from "react";
import { Link } from "react-router-dom";
import { ReactComponent as DocSvg } from "../../../../../assets/icons/Document2.svg";
import { ReactComponent as Folder } from "../../../../../assets/icons/Folder.svg";
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
          <Folder/>
        </div>
        <div>
          <p className="title">{textCapitalize(title)}</p>
          <div className="description">
              <p>{folders[0]?.name}</p>
            {/* {folders.map((item, i) => {
              return ( 
              <p key={i}>dd{item.name}dd</p>
            )
            })} */}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default NavCard;
