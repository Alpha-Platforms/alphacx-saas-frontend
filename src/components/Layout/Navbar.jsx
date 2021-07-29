import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { LayoutContext } from "../../context/layoutContext";
import { SearchIconNavbr, BellIconNavbar } from "../../assets/images/svgs";
import { useHistory } from "react-router-dom";
import userIcon from "../../assets/images/user.png";
import pic from "../../assets/imgF/codeuiandyimg.png";
import { useLocation } from "react-router-dom";
//import GoBack from './../helpers/GoBack';
import searchIcon from "../../assets/imgF/Search.png";

// --- dropdown component
function PlusIcon(){
  return (
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.19486 6.95428L4.79963 7.02689" stroke="#2B304D" stroke-width="1.21622" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M7.03707 9.19234L6.96484 4.79297" stroke="#2B304D" stroke-width="1.21622" stroke-linecap="round" stroke-linejoin="round"/>
          <path fill-rule="evenodd" clip-rule="evenodd" d="M9.81124 1H4.18811C2.22854 1 1 2.38746 1 4.35092V9.64908C1 11.6125 2.2227 13 4.18811 13H9.81059C11.7766 13 13 11.6125 13 9.64908V4.35092C13 2.38746 11.7766 1 9.81124 1Z" stroke="#2B304D" stroke-width="1.21622" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
  )
}

function DowncaretIcon(){
  return (
      <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8.5 1.25L5 4.75L1.5 1.25" stroke="#130F26" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
  )
}

function Dropdown() {
  const [isVisible, setInvisible] = useState(false)
  const clickHandler = e => setInvisible( isVisible => !isVisible)
  return (
      <div className="dd_wrap pe-3">
              <button onClick={clickHandler}
              style={{ 
                  border: "solid 1px #ccc",
                  padding: "0.25rem 0.75rem",
                  backgroundColor: "white",
                  borderRadius: "5px",
                  width: "7rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
               }}
              className="" 
              type="button" 
              id="dropdownMenuButtonSM">
              
              <span style={{padding: 0}}>               
                  <PlusIcon />
              </span>
              <span style={{padding: "0 1rem"}}>New</span>
              <span>
                  <DowncaretIcon />
              </span>
              
              </button>
              {
                  isVisible &&
                  <ul className="dd_menu list-unstyled"
                      style={{ 
                          border: "solid 1px #ccc",
                          padding: "0.25rem 0.75rem 0.5rem",
                          backgroundColor: "white",
                          borderRadius: "5px",
                          marginTop: "2px",
                          width: "7rem",
                          position: "fixed"
                      }}
                   >
                      <li style={{borderBottom: "solid 1px #CCC"}}>
                        <button className="dd_item btn rounded-0">Ticket</button>
                      </li>
                      <li style={{borderBottom: "solid 1px #CCC"}}>
                        <button className="dd_item btn rounded-0">Contact</button>
                      </li>
                  </ul>
              }
          </div>
      
  )
}
// --- //dropdown component


export default function Navbar({
  browserRouter,
  routeType,
  fullProps,
  pageName,
}) {
  // let [initsidebarState, setinitsidebarState] = useContext(LayoutContext);
  const getLocalItem = "h";
  const router = useLocation();
  let [LoginUser, setLoginUser] = useState(false);
  let [navDrop, setnavDrop] = useState(false);
  let [userData, setUserData] = useState();
  const [currentPath, setCurrentPath] = useState(
    router.pathname.replace("/", "")
  );
  const [UserProfilePage, setUserProfilePage] = useState("Profile");
  const IsUserValidated = () => {
    // const lastUsedToken = localStorage.getItem("token");
    // if (
    //   lastUsedToken === null ||
    //   lastUsedToken === undefined ||
    //   lastUsedToken === ""
    // ) {
    //   setLoginUser(false);
    // } else {
    //   setLoginUser(true);
    //   let res = JSON.parse(getLocalItem("user"));
    //   setUserData(res);
    // }
  };
  let [useUserContextData, setUseUserContext] = useState(null);

  const { appReduceSidebarWidth } = useContext(LayoutContext);
  const [sp, setSp] = useState(window.pageYOffset);

  useEffect(() => {
    //IsUserValidated();
    console.log("page", router);
    console.log(pageName);
  }, []);

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
                <span style={{ textTransform: "capitalize" }}>{pageName}</span>
              </div>
              <div className="navbar-right-content align-items-center d-flex">
                
              <div className="search-chat-con">
                <form>
                  <div className="hjdwc">
                    <input placeholder="Search" type="text" style={{height: 28, borderRadius: 16, paddingLeft: '32px!important'}} />

                    <div className="search-chat-searchIcon" style={{ paddingRight: "20px" }}>
                      <img src={searchIcon} alt="" style={{
                          top: "-20px",
                          height: "10px",
                          width: "10px",
                      }} />

                    </div>
                  </div>
                </form>
              </div>

              <Dropdown />




{/*     <img src={AddIcon} alt="" style={{height: "12px", width: "12px"}} /> */}

                
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
