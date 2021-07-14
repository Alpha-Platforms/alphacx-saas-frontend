import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { LayoutContext } from "../../context/layoutContext";
import { SearchIconNavbr, BellIconNavbar } from "../../assets/images/svgs";
import { useHistory } from "react-router-dom";
import userIcon from "../../assets/images/user.png";
import pic from "../../assets/imgF/codeuiandyimg.png";
//import GoBack from './../helpers/GoBack';

export default function Navbar({ browserRouter, routeType, fullProps }) {
  // let [initsidebarState, setinitsidebarState] = useContext(LayoutContext);
  const getLocalItem = "h";
  let [LoginUser, setLoginUser] = useState(false);
  let [navDrop, setnavDrop] = useState(false);
  let [userData, setUserData] = useState();
  const [UserProfilePage, setUserProfilePage] = useState("Profile");
  const IsUserValidated = () => {
    const lastUsedToken = localStorage.getItem("token");
    if (
      lastUsedToken === null ||
      lastUsedToken === undefined ||
      lastUsedToken === ""
    ) {
      setLoginUser(false);
    } else {
      setLoginUser(true);
      // let res = JSON.parse(getLocalItem("user"));
      // setUserData(res);
    }
  };
  let [useUserContextData, setUseUserContext] = useState(null);

  const { appReduceSidebarWidth } = useContext(LayoutContext);
  const [sp, setSp] = useState(window.pageYOffset);
  useEffect(() => {
    IsUserValidated();
    var prevScrollpos = sp;
    window.onscroll = function () {
      var currentScrollPos = window.pageYOffset;

      if (prevScrollpos > currentScrollPos) {
        document.getElementById("navbar").style.opacity = "1";
      } else {
        document.getElementById("navbar").style.opacity = "0";
      }
      prevScrollpos = currentScrollPos;
    };
  }, [sp]);
  const GobackFun = () => {
    console.log("A step back");
    fullProps.history.goBack();
  };
  return (
    <React.Fragment>
      <div
        id="navbar"
        className={`${
          appReduceSidebarWidth === true
            ? "section-wrap-nav"
            : "section-wrap-nav section-wrap-navPadding"
        }`}
      >
        <div className="navbar-position">
          <div
            className="navbar-wrap"
            className={`${
              appReduceSidebarWidth === true
                ? "navbar-wrap"
                : "navbar-wrap section-wrap-navWidth"
            }`}
          >
            {/* <div className="navbar-pad">
              <div className="nav-list-data">
                <span className="navBack-container">
                  <span
                    onClick={GobackFun}
                    style={{ color: "#14274E", cursor: "pointer" }}
                  >
                    <img
                      style={{ marginRight: "10px", marginBottom: "-2px" }}
                      src={backIcon}
                      alt=""
                    />{" "}
                    Back
                  </span>
                </span>

                <span
                  // style={{ marginBottom: "15px" }}
                  className="center-element"
                >
                  <span className="navbar-bel-icon">
                    <img
                      style={{ width: "18px", marginRight: "27px" }}
                      src={bellIcon}
                      alt=""
                    />
                  </span>
                  <span className="center-element user-info-nav">
                    <span className="userNameiii">okeke</span>
                    <img
                      style={{ width: "45px", borderRadius: "50%" }}
                      src={userIcon}
                      alt=""
                    />
                  </span>
                </span>
              </div>
            </div> */}
            <div className="navbar-content">
              <div className="pageTitle">
                <span>Conversations</span>
              </div>
              <div className="navbar-right-content">
                <span>
                  <SearchIconNavbr />
                </span>
                <span>
                  <BellIconNavbar />
                </span>
                <span className="navbar-user-image">
                  <img src={pic} alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
