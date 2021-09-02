import React, { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SearchIconNavbr } from "../../../../../assets/images/svgs";
import "./topBar.scss";

const TopBar = ({ categoryId }) => {
  const location = useLocation();
  const [links, setLinks] = useState([]);

  useEffect(() => {
    let pagelinks = location.pathname.split("/");
    pagelinks.shift();
    pagelinks.shift();
    console.log("links", pagelinks);
    setLinks(pagelinks);
  }, []);
  return (
    <div className="top-bar">
      <div className="breadcrumbs">
        <Link to="/help">
          <p className="link active">Home</p>
        </Link>
        {links.map((link, i) => (
          <p
            key={i}
            className={`link ${i === links.length - 2 ? "active" : ""}`}
          >
            {i === links.length - 2 ? (
              <Link
                to={`/help/${link}${categoryId ? "?cat=" + categoryId : ""}`}
              >
                {link.replaceAll("-", " ")}
              </Link>
            ) : (
              link.replaceAll("-", " ")
            )}
          </p>
        ))}
      </div>
      <div className="search-bar">
        <div className="icon">
          <SearchIconNavbr />
        </div>
        <form>
          <input type="text" placeholder="Search help center" />
        </form>
      </div>
    </div>
  );
};

export default TopBar;
