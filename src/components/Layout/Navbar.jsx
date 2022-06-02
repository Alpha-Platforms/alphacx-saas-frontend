/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, NavLink, useHistory } from 'react-router-dom';
// import { AuthContext } from "../../context/authContext";
import { connect } from 'react-redux';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import MoonLoader from 'react-spinners/MoonLoader';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { LayoutContext } from '../../context/layoutContext';
import { NotificationBellEmpty, NotificationBellNew } from '../../assets/images/svgs';
// import userIcon from "../../assets/images/user.png";
import searchIcon from '../../assets/imgF/Search.png';
import { HelpIcon, DowncaretIcon, PlusIcon } from '../../assets/SvgIconsSet.jsx';
import CreateTicketModal from '../pages/tickets/CreateTicketModal';
import CreateCustomerModal from '../pages/customers/CreateCustomerModal';
import DummyAvatar from '../../assets/images/dummyavatar.jpeg';
import InitialsFromString from '../helpers/InitialsFromString';
import '../../styles/Navbar.css';
import { httpGetMain, httpPatchMain } from '../../helpers/httpMethods';
// import AccordionLink from "components/pages/help_center/components/accordion/AccordionLink";
import { accessControlFunctions } from '../../config/accessControlList';
import { multiIncludes } from '../../helper';

function DropDown() {
    const [createCustModalShow, setCreateCustModalShow] = useState(false);
    const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
    return (
        <>
            <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown global-create-dropdown">
                <Dropdown.Toggle variant="" size="" className="btn acx-btn-primary" style={{ borderRadius: '.15rem' }}>
                    <div style={{ padding: '.25rem .5rem' }}>
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
    );
}

function Notification({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [notificationsLoaded, setNotificationsLoaded] = useState(false);
    const [isUnreadNotificiations, setIsUnreadNotificiations] = useState(true);
    const history = useHistory();

    useEffect(() => {
        notifications.map((item) => {
            if (item.isRead == false) setIsUnreadNotificiations(false);
        });
    }, [notifications]);

    useEffect(() => {
        getNotifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    //
    function createMarkup(data) {
        return { __html: data };
    }

    const markAllRead = (e) => {
        httpPatchMain(`notifications_mark_all?userId=${userId}`)
            .then((res) => {
                setNotifications([]);
                setIsUnreadNotificiations(true);
                setNotificationsLoaded(false);
                return NotificationManager.success('All notifications marked read', 'Success', 4000);
            })
            .catch((error) => console.log(error));

        // if (res.status === "success") {
        //   console.log(res.data);
        // return NotificationManager.success(res.data, "Error", 4000);
        // } else {
        //   console.log(res);
        // return NotificationManager.error(res, "Error", 4000);
        // }
        // /v1/notifications_mark_all?userId=17c28cf6-c3d3-4bc3-91bd-60290cec8792
    };

    const getNotifications = async () => {
        const res = await httpGetMain(`notifications/${userId}`);
        if (res.status === 'success') {
            setNotificationsLoaded(true);
            setNotifications(res?.data);
        } else {
            setNotificationsLoaded(true);
            return NotificationManager.error(res.er.message, 'Error', 4000);
        }
    };

    const goToTicket = (e, data, index) => {
        if (e.target.localName == 'a') {
            return;
        }

        if (data?.ticketId) {
            history.push({
                pathname: `/conversation`,
                from: 'notifications',
                state: {
                    ticketId: data?.ticketId,
                    ticketHistoryId: data?.ticketHistoryId,
                    ticketData: data,
                },
            });
        } else {
            history.push({
                pathname: '/conversation',
                from: 'notifications',
            });
        }

        // Mark notification as read when clicked
        httpPatchMain(`notifications/${data.notificationId}`, {
            isRead: true,
        }).then(({ data }) => {
            // const notifs = [...notifications]
            // notifs[index] = data
            // setNotifications(notifs)
        });

        // the ideal thing is to update the notif that was effected - res should bring back that one with its new data
        const filteredNotifications = notifications.filter((item) => item.id !== data.notificationId);
        setNotifications(filteredNotifications);
    };

    return (
        <NavDropdown
            title={
                <div className="d-flex justify-items-start align-items-center">
                    {isUnreadNotificiations ? <NotificationBellEmpty /> : <NotificationBellNew />}
                </div>
            }
            className="acx-dropdown-hidden acx-notification-nav-dropdown"
            id="navbarScrollingDropdown"
        >
            {notificationsLoaded && (
                <>
                    <Dropdown.Header
                        className="d-flex justify-content-between align-items-center border-bottom position-sticky bg-white py-2"
                        style={{ top: '-10px', zIndex: 20 }}
                    >
                        <div className="flex-grow-1">
                            <p
                                className={`acx-text-gray-800 mb-0 ${
                                    notifications.length == 0 || notifications == null || notifications == undefined
                                        ? 'text-center'
                                        : ''
                                }`}
                            >
                                Notifications
                            </p>
                        </div>
                        {notifications.length == 0 ||
                        notifications == null ||
                        notifications == undefined ||
                        isUnreadNotificiations ? (
                            ''
                        ) : (
                            <div className="">
                                <button type="button" onClick={markAllRead} className="acx-link-primary small">
                                    Mark all read
                                </button>
                            </div>
                        )}
                    </Dropdown.Header>

                    {notificationsLoaded == false ? (
                        <NavDropdown.Item as="div">
                            <div className="d-flex justify-content-center align-items-center py-5 ps-1 notification-loader-indicator">
                                <MoonLoader color="#0d4166" loading={notificationsLoaded == false} size={30} />
                            </div>
                        </NavDropdown.Item>
                    ) : notifications.length == 0 || notifications == null || notifications == undefined ? (
                        <NavDropdown.Item as="div">
                            <div className="d-flex flex-column justify-content-center align-items-center py-3">
                                <h2 className="text-muted mb-2">
                                    <i className="bi-bell-slash" />{' '}
                                </h2>
                                <p className="text-muted mb-0">No notifications</p>
                            </div>
                        </NavDropdown.Item>
                    ) : (
                        <>
                            {notifications
                                .slice(0)
                                .reverse()
                                .map((data, index) => {
                                    if ((!data.isRead && data.type == 'tickets') || data.type == 'mention') {
                                        return (
                                            <NavDropdown.Item
                                                key={index}
                                                as="div"
                                                onClick={(e) =>
                                                    goToTicket(
                                                        e,
                                                        {
                                                            notificationId: data.id,
                                                            ticketId: data?.others?.ticketId,
                                                            ticketHistoryId: data?.others?.ticketHistoryId,
                                                        },
                                                        index,
                                                    )
                                                }
                                            >
                                                <div className="d-flex justify-content-start align-items-start">
                                                    <div className="me-3 flex-shrink-0 avatar avatar-md rounded-circle overflow-hidden d-flex justify-content-center align-items-center acx-bg-affair-800">
                                                        {data?.sender?.avatar == null ? (
                                                            <h3 className="text-white">
                                                                <span>
                                                                    {InitialsFromString(
                                                                        `${
                                                                            data?.sender?.firstname == 'default' ||
                                                                            !data?.sender?.firstname
                                                                                ? ''
                                                                                : data?.sender?.firstname
                                                                        }`,
                                                                        `${
                                                                            data?.sender?.lastname == 'default' ||
                                                                            !data?.sender?.lastname
                                                                                ? ''
                                                                                : data?.sender?.lastname
                                                                        }`,
                                                                    )}
                                                                </span>
                                                            </h3>
                                                        ) : (
                                                            <img
                                                                width="40"
                                                                height="auto"
                                                                src={data?.sender?.avatar}
                                                                alt=""
                                                            />
                                                        )}
                                                    </div>
                                                    <div className="media-body flex-grow-1">
                                                        <div className="media-header d-flex justify-content-between align-items-center mb-1">
                                                            <p
                                                                className="mb-0 me-2 text-truncate"
                                                                title={data.title}
                                                                style={{ maxWidth: '130px' }}
                                                            >
                                                                {data.title}
                                                            </p>
                                                            <span className="text-muted small">
                                                                {moment(`${data.created_at}`).fromNow()}
                                                            </span>
                                                        </div>
                                                        <div className="acx-text-gray-500 media-content">
                                                            <div
                                                                className="mb-0 text-wrap"
                                                                dangerouslySetInnerHTML={
                                                                    data?.others?.response
                                                                        ? createMarkup(data?.others?.response)
                                                                        : createMarkup(data?.content)
                                                                }
                                                            >
                                                                {/* {data.content} */}
                                                                {/* <span className="acx-text-primary">I need a refund for my order</span>. */}
                                                                {/* <span className="acx-bg-alpha-blue-100 px-3 py-1 mt-2 acx-rounded-5 d-block text-nowrap text-truncate" 
                                  style={{"maxWidth":"230px"}}>
                              <span className="acx-text-primary">@hammeddaudu {" "}</span> 
                              Please make sure that
                            </span> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </NavDropdown.Item>
                                        );
                                    }
                                })}
                            <NavDropdown.Item
                                as={NavLink}
                                to="/conversation"
                                className="acx-link-primary position-sticky d-block bottom-0 bg-white border-top"
                            >
                                <div className="text-center">
                                    <p className="text-muted mb-0">View all notifications</p>
                                </div>
                            </NavDropdown.Item>
                        </>
                    )}
                </>
            )}
        </NavDropdown>
    );
}

function Navbar({ pageName, user }) {
    const { appReduceSidebarWidth } = useContext(LayoutContext);
    const [localUser, setlocalUser] = useState({});

    const [notif, setNotif] = useState({
        active: false,
        trialDaysLeft: 0,
        plan: '',
    });

    useEffect(() => {
        const tenantSubscription = JSON.parse(window.localStorage.getItem('tenantSubscription'));

        if (tenantSubscription) {
            if (tenantSubscription?.subscription?.is_trial || tenantSubscription?.plan?.name === 'Alpha Plan') {
                // days left for plan expiration
                const daysLeft = moment(tenantSubscription?.subscription?.end_date).diff(moment(new Date()), 'days');

                if (daysLeft <= 8 && daysLeft > 0) {
                    setNotif((prev) => ({
                        ...prev,
                        active: true,
                        trialDaysLeft: daysLeft,
                        plan: tenantSubscription?.plan?.name,
                    }));
                }
            }
        }
    }, []);

    useEffect(() => {
        getUserFromStorage();
    }, [window.localStorage.getItem('user')]);

    const getUserFromStorage = () => {
        const lUser = localStorage.getItem('user');
        if (lUser === undefined || lUser === null) {
        } else {
            const parse = JSON.parse(lUser);
            // console.log(parse);
            setlocalUser(parse.user);
        }
    };

    return (
        <div
            id="navbar"
            className={`${
                appReduceSidebarWidth === true
                    ? notif.active
                        ? 'section-wrap-nav section-wrap-nav-2'
                        : 'section-wrap-nav'
                    : notif.active
                    ? 'section-wrap-nav section-wrap-nav-2 section-wrap-navPadding'
                    : 'section-wrap-nav section-wrap-navPadding'
            }`}
        >
            <div className="navbar-position">
                <div
                    style={{ height: notif.active ? `calc(90px + 3rem)` : '90px' }}
                    className={`${
                        appReduceSidebarWidth === true ? 'navbar-wrap' : 'navbar-wrap section-wrap-navWidth'
                    }`}
                >
                    {notif.active && (
                        <div className="sub-notif">
                            <span>
                                Your {notif.plan} is ending in {notif.trialDaysLeft} {notif.trialDaysLeft > 1 ? 'days' : 'day'}.
                            </span>{' '}
                            <Link
                                to="/settings/account?tab=subscription"
                                className="btn btn-sm bg-at-blue-light sub-notif-get"
                            >
                                Get Alpha Plan Now
                            </Link>{' '}
                            <button
                                onClick={() => setNotif((prev) => ({ ...prev, active: false }))}
                                className="sub-notif-cancel btn"
                            >
                                ×
                            </button>
                        </div>
                    )}

                    <div className="navbar-content" style={{ height: notif.active ? `calc(100% - 3rem)` : '100%' }}>
                        <div className="pageTitle">
                            <span style={{ textTransform: 'capitalize' }}>{pageName}</span>
                        </div>
                        <div className="navbar-right-content align-items-center d-flex gap-3">
                            <form>
                                <div>
                                    <input
                                        placeholder="Search"
                                        type="text"
                                        style={{
                                            width: '100%',
                                            borderRadius: 3,
                                            border: 'solid 0.5px #ddd',
                                            padding: '0.35rem 2rem',
                                            backgroundImage: `url(${searchIcon})`,
                                            backgroundRepeat: 'no-repeat',
                                            backgroundSize: '14px',
                                            backgroundPosition: '10px 50%',
                                        }}
                                    />

                                    <div>
                                        <img
                                            src={searchIcon}
                                            alt=""
                                            style={{
                                                height: '10px',
                                                width: '10px',
                                                display: 'none',
                                            }}
                                        />
                                    </div>
                                </div>
                            </form>

                            {multiIncludes(accessControlFunctions[user?.role], [
                                'create_ticket',
                                'create_customer',
                            ]) && <DropDown />}

                            {/* <div style={{ width: "1.5" }}>
                  <BellIconNavbar />
                </div> */}
                            <Notification userId={user?.id} />

                            <Link to="/knowledge-base" target="_blank">
                                <HelpIcon />
                            </Link>

                            <div>
                                <Link to={`/settings/profile/${localUser?.id}`}>
                                    {localUser?.avatar ? (
                                        <img
                                            src={localUser?.avatar || DummyAvatar}
                                            alt=""
                                            style={{
                                                width: 30,
                                                borderRadius: '50%',
                                            }}
                                        />
                                    ) : (
                                        <span className="nav-initials">
                                            {`${user?.firstname[0] || ''}${user?.lastname[0] || ''}`
                                                .trim()
                                                .toUpperCase()}
                                        </span>
                                    )}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    user: state.userAuth.user,
});

export default connect(mapStateToProps)(Navbar);
