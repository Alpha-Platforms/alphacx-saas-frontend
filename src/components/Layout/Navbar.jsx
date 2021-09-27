import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import { LayoutContext } from "../../context/layoutContext";
import { SearchIconNavbr, BellIconNavbar } from "../../assets/images/svgs";
import { useHistory } from "react-router-dom";
import userIcon from "../../assets/images/user.png";
import { useLocation } from "react-router-dom";
//import GoBack from './../helpers/GoBack';
import searchIcon from "../../assets/imgF/Search.png";
import {HelpIcon} from '../../assets/SvgIconsSet.jsx';
import CreateTicketModal from '../pages/tickets/CreateTicketModal';
import CreateCustomerModal from '../pages/customers/CreateCustomerModal';
import dummyavatar from '../../assets/images/dummyavatar.jpeg';
import '../../styles/Navbar.css';
import {connect} from 'react-redux';

// --- dropdown component
function PlusIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.19486 6.95428L4.79963 7.02689"
        stroke="currentColor"
        strokeWidth="1.21622"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.03707 9.19234L6.96484 4.79297"
        stroke="currentColor"
        strokeWidth="1.21622"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.81124 1H4.18811C2.22854 1 1 2.38746 1 4.35092V9.64908C1 11.6125 2.2227 13 4.18811 13H9.81059C11.7766 13 13 11.6125 13 9.64908V4.35092C13 2.38746 11.7766 1 9.81124 1Z"
        stroke="currentColor"
        strokeWidth="1.21622"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DowncaretIcon() {
  return (
    <svg
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.5 1.25L5 4.75L1.5 1.25"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Dropdown() {
  const [isVisible, setInvisible] = useState(false);
  const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
  const [createCustModalShow, setCreateCustModalShow] = useState(false);


  return (
      <div className="" style={{ fontSize: "0.8rem"}} onMouseLeave={() => setInvisible(false)} >
              <button 
                onClick={() => setInvisible(isVisible => !isVisible)}
                style={{ 
                    color: "white",
                    padding: "0.5rem 0",
                    backgroundColor: "#006298",
                    borderRadius: "3px",
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
              <span style={{padding: "0 0.5rem"}}>Create</span>
              <span>
                  <DowncaretIcon />
              </span>
              
              </button>
              {
                  isVisible &&
                  <ul className="dd_menu list-unstyled"
                    style={{ 
                        // padding: "0.25rem 0.75rem 0.5rem",
                        backgroundColor: "white",
                        borderRadius: "3px",
                        marginTop: "0px",
                        position: "fixed",
                        textAlign: "center"
                    }}
                  >
                      <li style={{}}>
                        <button 
                          className="dd_item btn rounded-0"                          
                          onClick={() => setCreateTicketModalShow(true)}
                          >Ticket</button>
                      </li>
                      <li style={{}}>
                        <button 
                          className="dd_item btn rounded-0"
                          onClick={() => setCreateCustModalShow(true)}
                        >Contact</button>
                      </li>
                  </ul>
              }
              <CreateTicketModal
                createModalShow={createTicketModalShow}
                setCreateModalShow={setCreateTicketModalShow}
                // setChangingRow={setChangingRow}
              />
              <CreateCustomerModal 
                createModalShow={createCustModalShow} 
                setCreateModalShow={setCreateCustModalShow} 
                isEditing={false}
                // setChangingRow={setChangingRow} 
              />
          </div>
      
  )
}
// --- //dropdown component


function Navbar({
  browserRouter,
  routeType,
  fullProps,
  pageName,
  user
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
  const [localUser, setlocalUser] = useState({});
  useEffect(() => {
    getUserFromStorage();
  }, []);

  const getUserFromStorage = () => {
    let lUser = localStorage.getItem("user");
    if (lUser == undefined || lUser == null) {
      return;
    } else {
      let parse = JSON.parse(lUser);
      // console.log(parse);
      setlocalUser(parse.user);
    }
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
            className={`${
              appReduceSidebarWidth === true
                ? "navbar-wrap"
                : "navbar-wrap section-wrap-navWidth"
            }`}
          >

            <div className="navbar-content">
              <div className="pageTitle">
                <span style={{ textTransform: "capitalize" }}>{pageName}</span>
              </div>
              <div className="navbar-right-content align-items-center d-flex gap-3">
                <form>
                  <div>
                    <input
                      placeholder="Search"
                      type="text"
                      style={{
                        width: "100%",
                        borderRadius: 3,
                        border: "solid 0.5px #ddd",
                        padding: "0.35rem 2rem",
                        backgroundImage: `url(${searchIcon})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "14px",
                        backgroundPosition: "10px 50%",
                      }}
                    />

                    <div>
                      <img
                        src={searchIcon}
                        alt=""
                        style={{
                          height: "10px",
                          width: "10px",
                          display: "none",
                        }}
                      />
                    </div>
                  </div>
                </form>

                <Dropdown />

                <div style={{ width: "1.5" }}>
                  <BellIconNavbar />
                </div>

                <Link to="/help" target="_blank">
                  <HelpIcon />
                </Link>

                <div>
                  <Link to={`/settings/profile/${localUser?.id}`}>
                    {localUser?.avatar ? <img
                      src={localUser?.avatar || dummyavatar}
                      alt=""
                      style={{
                        width: 30,
                        borderRadius: "50%",
                      }}
                    /> : <span className="nav-initials">{`${user?.firstname[0] || ''}${user?.lastname[0] || ''}`.trim().toUpperCase()}</span>
                    }
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state, ownProps) => ({
  user: state.userAuth.user
})

export default connect(mapStateToProps)(Navbar);