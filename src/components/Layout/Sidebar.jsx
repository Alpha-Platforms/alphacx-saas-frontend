import React, { useState, useContext, useEffect } from "react";

import { LayoutContext } from "../../context/layoutContext";
import { AuthContext } from "../../context/authContext";
import {
  appLogo,
  toggleIcon,
  HomeIcon,
  ClockIcon,
  CardIcon,
  MoreIcon,
  LogoutIconIcon,
  Graph,
  SettingsIcon,
  AppLogo,
} from "../../assets/images/svgs";
export default function Sidebar({ browserRouter, currentRoute }) {
  const {
    setreduceSidebarWidth,
    appReduceSidebarWidth,
    reduceSidebarWidth,
  } = useContext(LayoutContext);

  const [PublicationShow, SetPublicationShow] = useState(true);
  const [CategoriesShow, SetCategoriesShow] = useState(false);
  const [SortShow, SetSortShow] = useState(false);
  const [DateShow, SetDateShow] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [PublicationsFilter, SetPublicationsFilter] = useState({
    all: true,
    newsPaper: false,
    magazine: false,
    books: false,
  });

  const [SortFilter, SetSortFilter] = useState({
    popular: true,
    recent: false,
  });

  return (
    <div>
      <div
        className={`${
          appReduceSidebarWidth === true
            ? "sidebar-wrap"
            : "sidebar-wrap reduceSidebarWidth"
        }`}
      >
        <ul style={{ paddingBottom: "60px" }} className="sidebar-list">
          <span
            className={`${
              appReduceSidebarWidth === true
                ? "sidebar-header"
                : "sidebar-header moveAppLinksToCenter"
            }`}
            style={{ marginLeft: "-5px" }}
          >
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <AppLogo />
            </span>
          </span>

          <li
            onClick={() => reduceSidebarWidth()}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              {toggleIcon}
            </span>
            Menu
          </li>

          <li
            style={
              currentRoute === "/home" || currentRoute === "/home/tabs"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            // onClick={() => browserRouter("/home")}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              {
                <HomeIcon
                  activeRoute={
                    currentRoute === "/home" || currentRoute === "/home/tabs"
                      ? true
                      : false
                  }
                />
              }
            </span>
            Dashboard
          </li>

          <li
            style={
              currentRoute === "/user_transations"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            // onClick={() => browserRouter("/user_transations")}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <ClockIcon
                activeRoute={
                  currentRoute === "/user_transations" ? true : false
                }
              />
            </span>
            Conversations
          </li>

          <li
            style={
              currentRoute === "/user_cards"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            // onClick={() => browserRouter("/user_cards")}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <CardIcon
                activeRoute={currentRoute === "/user_cards" ? true : false}
              />
            </span>
            Tickets
          </li>

          <li
            style={
              currentRoute === "/more"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            // onClick={() => browserRouter("/more")}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <MoreIcon
                activeRoute={currentRoute === "/more" ? "#e3b451" : null}
              />
            </span>
            Customer
          </li>

          <li
            style={
              currentRoute === "/more"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            // onClick={() => browserRouter("/more")}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <Graph
                activeRoute={currentRoute === "/more" ? "#e3b451" : null}
              />
            </span>
            Reports
          </li>

          <li
            style={
              currentRoute === "/more"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            // onClick={() => browserRouter("/more")}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <SettingsIcon
                activeRoute={currentRoute === "/more" ? "#e3b451" : null}
              />
            </span>
            Settings
          </li>
        </ul>
        <ul className="sidebar-list">
          <li
            style={
              currentRoute === "/more"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            // onClick={() => browserRouter("/more")}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <LogoutIconIcon
                activeRoute={currentRoute === "/more" ? "#e3b451" : null}
              />
            </span>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
}
