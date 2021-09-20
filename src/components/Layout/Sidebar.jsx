import React, { useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
import { LayoutContext } from "../../context/layoutContext";
import { AuthContext } from "../../context/authContext";
import { NotificationManager } from "react-notifications";
import {
  // appLogo,
  // dashboardIcon,
  toggleIcon,
  HomeIcon,
  ClockIcon,
  CardIcon,
  MoreIcon,
  LogoutIcon,
  Graph,
  SettingsIcon,
  AppLogo,
  AppFullLogo
} from "../../assets/images/svgs";
export default function Sidebar({ browserRouter, currentRoute }) {
  const {
    // setreduceSidebarWidth,
    appReduceSidebarWidth,
    reduceSidebarWidth,
  } = useContext(LayoutContext);

  // const [PublicationShow, SetPublicationShow] = useState(true);
  // const [CategoriesShow, SetCategoriesShow] = useState(false);
  // const [SortShow, SetSortShow] = useState(false);
  // const [DateShow, SetDateShow] = useState(false);
  // const [startDate, setStartDate] = useState(new Date());

  // const [PublicationsFilter, SetPublicationsFilter] = useState({
  //   all: true,
  //   newsPaper: false,
  //   magazine: false,
  //   books: false,
  // });

  // const [SortFilter, SetSortFilter] = useState({
  //   popular: true,
  //   recent: false,
  // });

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
        window.location.href = "/login";
      }
    });
  };

  return (
    <menu className={`sidebar-wrap ${ appReduceSidebarWidth === true ? "" : "collapsed" }`} >
      <header className="sidebar-header">
          <span className="sidebar-header--full-logo">
            <AppFullLogo />
          </span>
          <span className="sidebar-header--logo">
            <AppLogo />
          </span>
      </header>
      <ul className="sidebar-list mb-auto">

        <li onClick={() => reduceSidebarWidth()}
            className="sidebar-list--item">
          <span className="sidebar-list--icon">
            {toggleIcon}
          </span>
          <span className="sidebar-list--text small fst-italic">
            Collapse Menu
          </span>
        </li>

        <li className={`sidebar-list--item ${(currentRoute === "/home" || currentRoute === "/home/tabs")? "active" : ""}`}
            onClick={() => browserRouter(`/home`)} >
          <span className="sidebar-list--icon">
            { <HomeIcon activeRoute={false}/> }
          </span>
          <span className="sidebar-list--text">
            Dashboard
          </span>
        </li>

        <li onClick={() => browserRouter(`/conversation`)}
          className={`sidebar-list--item ${currentRoute === "/conversation" ? "active" : ""}`}>
          <span className="sidebar-list--icon">
            { <ClockIcon activeRoute={false}/> }
          </span>
          <span className="sidebar-list--text">
            Conversations
          </span>
        </li>

        <li onClick={() => browserRouter(`/tickets`)}
            className={`sidebar-list--item ${currentRoute === "/tickets" ? "active" : ""}`}>
          <span className="sidebar-list--icon">
            { <CardIcon activeRoute={false}/> }
          </span>
          <span className="sidebar-list--text">
            Tickets
          </span>
        </li>

        <li onClick={() => browserRouter(`/customers`)}
            className={`sidebar-list--item ${currentRoute === "/customers" ? "active" : ""}`}>
          <span className="sidebar-list--icon">
            { <MoreIcon activeRoute={false}/> }
          </span>
          <span className="sidebar-list--text">
            Customers
          </span>
        </li>

        <li onClick={() => browserRouter(`/reports`)}
            className={`sidebar-list--item ${currentRoute === "/reports" ? "active" : ""}`}>
          <span className="sidebar-list--icon">
            { <Graph activeRoute={false}/> }
          </span>
          <span className="sidebar-list--text">
            Reports
          </span>
        </li>

        <li onClick={() => browserRouter(`/settings`)}
            className={`sidebar-list--item ${currentRoute === "/settings" ? "active" : ""}`}>
          <span className="sidebar-list--icon">
            { <SettingsIcon activeRoute={false}/> }
          </span>
          <span className="sidebar-list--text">
            Settings
          </span>
        </li>
      </ul>
      <ul className="sidebar-list mt-auto">
        <li onClick={() => Logout()}
            className="sidebar-list--item">
            <span className="sidebar-list--icon">
              { <LogoutIcon activeRoute={false}/> }
            </span>
            <span className="sidebar-list--text">
              Logout
            </span>
        </li>
      </ul>
    </menu>
  );
}
