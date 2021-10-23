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
import {DowncaretIcon, PlusIcon} from "../../assets/SvgIconsSet.jsx";
import { Dropdown } from "react-bootstrap";


function DropDown() {
  const [createCustModalShow, setCreateCustModalShow] = useState(false)
  const [createTicketModalShow, setCreateTicketModalShow] = useState(false)
  return (
    <>
      <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown global-create-dropdown">
        <Dropdown.Toggle variant="" size="" className="btn acx-btn-primary" style={{"borderRadius": ".15rem"}}>
          <div style={{"padding": ".25rem .5rem"}}>
            <PlusIcon /> 
            <span className="px-2">Create</span> 
            <DowncaretIcon />
          </div>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item eventKey="1">
            <button onClick={() => setCreateTicketModalShow(true)}>Ticket</button>
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <button onClick={() => setCreateCustModalShow(true)}>Customer</button>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>



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
    </>
  )
}



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

                <DropDown />

                <div style={{ width: "1.5" }}>
                  <BellIconNavbar />
                </div>

                <Link to="/knowledge-base" target="_blank">
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