import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { LayoutContext } from "../../context/layoutContext";
import { AuthContext } from "../../context/authContext";
import { NotificationManager } from "react-notifications";
import {
  appLogo,
  toggleIcon,
  dashboardIcon,
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

  const Logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You are about to logout from the Alpha Kustormar service!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#006298",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Log me out!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        NotificationManager.success("Logout Successfully.");
        window.location.href = "/";
      }
    });
  };

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
            onClick={() => browserRouter(`/home`)}
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
              currentRoute === "/conversation"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            onClick={() => browserRouter(`/conversation`)}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <ClockIcon
                activeRoute={
                  currentRoute === "/conversation" ? true : false
                }
              />
            </span>
            Conversations
          </li>

          <li
            style={
              currentRoute === "/tickets"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            // onClick={() => browserRouter("/user_cards")}
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => browserRouter(`/tickets`)}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <CardIcon
                activeRoute={currentRoute === "/tickets" ? true : false}
              />
            </span>
            Tickets
          </li>

          <li
            style={
              currentRoute === "/customers"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => browserRouter(`/customers`)}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <MoreIcon
                activeRoute={currentRoute === "/customers" ? true : false}
              />
            </span>
            Customer
          </li>

          <li
            style={
              currentRoute === "/reports"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => browserRouter(`/reports`)}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <Graph
                activeRoute={currentRoute === "/reports" ? true : false}
              />
            </span>
            Reports
          </li>

          <li
            style={
              currentRoute === "/settings"
                ? { color: "#e3b451" }
                : { color: "white" }
            }
            className={`${
              appReduceSidebarWidth === true ? "" : "moveAppLinksToCenter"
            }`}
            onClick={() => browserRouter(`/settings`)}
          >
            {" "}
            <span style={{ marginRight: "20px", marginTop: "-4px" }}>
              <SettingsIcon
                activeRoute={currentRoute === "/settings" ? true : false}
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
            onClick={() => Logout()}
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
