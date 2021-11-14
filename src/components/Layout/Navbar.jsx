import React, { useEffect, useState, useContext, Fragment } from "react";
//import GoBack from './../helpers/GoBack';
import userIcon from "../../assets/images/user.png";
import {HelpIcon} from '../../assets/SvgIconsSet.jsx';
import searchIcon from "../../assets/imgF/Search.png";
import DummyAvatar from '../../assets/images/dummyavatar.jpeg';
import { httpGetMain } from "../../helpers/httpMethods";
import { AuthContext } from "../../context/authContext";
import { LayoutContext } from "../../context/layoutContext";
import CreateTicketModal from '../pages/tickets/CreateTicketModal';
import InitialsFromString from "../helpers/InitialsFromString";
import CreateCustomerModal from '../pages/customers/CreateCustomerModal';
import { DowncaretIcon, PlusIcon} from "../../assets/SvgIconsSet.jsx";
import { SearchIconNavbr, BellIconNavbar } from "../../assets/images/svgs";
// 
import moment from "moment";
import {connect} from 'react-redux';
import ScaleLoader from "react-spinners/ScaleLoader";
import { NotificationManager } from "react-notifications";
import { Link, NavLink, useRouteMatch, useHistory, useLocation} from 'react-router-dom';
// 
import Dropdown from "react-bootstrap/Dropdown";
import NavDropdown from "react-bootstrap/NavDropdown";
// 
import '../../styles/Navbar.css';

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

function Notification(props){
  const [notifications, setNotifications] = useState([]);
  const [notificationsLoaded, setNotificationsLoaded] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getNotifications();
  }, [props.userId]);

  const getNotifications = async() => {
    const res = await httpGetMain(`notifications/${props.userId}`);
    if (res.status === "success") {
      setNotificationsLoaded(true);
      setNotifications(res?.data);
    } else {
      setNotificationsLoaded(true);
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  } 

  const goToTicket = ({...data}) =>{
    if(data?.ticketId){
      history.push({
          pathname:  `/tickets/${data?.ticketId}`,
          from: "notifications"
      });
    }else{
      history.push({
          pathname:  "/conversation",
          from: "notifications"
      });
    }
  }

  return (
    <NavDropdown title={<>
        <div className="d-flex justify-items-start align-items-center">
          <BellIconNavbar />
        </div>
      </>} className="acx-dropdown-hidden acx-notification-nav-dropdown" id="navbarScrollingDropdown">
      <Dropdown.Header className="d-flex justify-content-between align-items-center border-bottom">
        <div className="flex-grow-1">
          <p className={`acx-text-gray-800 mb-0 ${notifications.length? "" : "text-center"}`}>
            Notifications
          </p>
        </div>
        {notifications.length == 0 || notifications == null || notifications == undefined?
          ""
          :
          <div className="">
            <a href="#read-notification" className="acx-link-primary">mark all as read</a>
          </div>
        }
      </Dropdown.Header>
      {notificationsLoaded == false? 
        <NavDropdown.Item as="div">
            <div className="d-flex justify-content-center align-items-center py-5 ps-1 notification-loader-indicator">
              <ScaleLoader
                  color="#0d4166"
                  loading={notificationsLoaded == false}
                  size={5}
                />
            </div>
        </NavDropdown.Item>
      : 
        notifications.length == 0 || notifications == null || notifications == undefined?
        <NavDropdown.Item as="div">
            <div className="d-flex flex-column justify-content-center align-items-center py-3">
              <h2 className="text-muted mb-2"><i className="bi-bell-slash"></i> </h2>
              <p className="text-muted mb-0">No notifications</p>
            </div>
        </NavDropdown.Item>
        :
        <Fragment>
          { notifications.map((data, index) => {
              if(data.type == "tickets" || data.type == "mention"){
                return (
                  <NavDropdown.Item key={index} as="div" onClick={() => goToTicket({ticketId: data?.others?.ticketId, ticketHistoryId: data?.others?.ticketHistoryId})}>
                      <div className="d-flex justify-content-start align-items-start">
                        <div className="me-3 flex-shrink-0 avatar avatar-sm rounded-circle overflow-hidden d-flex justify-content-center align-items-center acx-bg-affair-800">
                          {data?.sender?.avatar == null ? (
                            <h3 className="text-white">
                              <span>{InitialsFromString(`${data?.sender?.firstname == "default" || !data?.sender?.firstname? "" : data?.sender?.firstname}`, `${data?.sender?.lastname == "default" || !data?.sender?.lastname ? "" : data?.sender?.lastname}`)}</span>
                            </h3>
                            ) : (
                            <img width="30" height="auto" src={data?.sender?.avatar} alt="" />
                          )}
                        </div>
                        <div className="media-body flex-grow-1">
                          <div className="media-header d-flex justify-content-between align-items-center mb-1">
                            <p className="mb-0 me-3">{data.title}</p>
                            <span className="text-muted">{moment(`${data.created_at}`).fromNow()}</span>
                          </div>
                          <div className="acx-text-gray-500 media-content">
                            <p className="mb-0 text-wrap">
                              {data.content}
                              {/* <span className="acx-text-primary">I need a refund for my order</span>. */}
                              {/* <span className="acx-bg-alpha-blue-100 px-3 py-1 mt-2 acx-rounded-5 d-block text-nowrap text-truncate" 
                                    style={{"maxWidth":"230px"}}>
                                <span className="acx-text-primary">@hammeddaudu {" "}</span> 
                                Please make sure that
                              </span> */}
                            </p>
                          </div>
                        </div>
                      </div>
                  </NavDropdown.Item>
                )
              }
            }
          )}
          <NavDropdown.Item as={NavLink} to="/conversation" className="acx-link-primary">
            <div className="text-center">
              <p className="text-muted mb-0">View all notifications</p>
            </div>
          </NavDropdown.Item>
        </Fragment>
      }
  </NavDropdown>
  );
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

                {/* <div style={{ width: "1.5" }}>
                  <BellIconNavbar />
                </div> */}
                <Notification userId={user?.id} />

                <Link to="/knowledge-base" target="_blank">
                  <HelpIcon />
                </Link>

                <div>
                  <Link to={`/settings/profile/${localUser?.id}`}>
                    {localUser?.avatar ? <img
                      src={localUser?.avatar || DummyAvatar}
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