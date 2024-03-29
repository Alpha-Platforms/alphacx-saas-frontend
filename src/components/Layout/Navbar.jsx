/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
/* eslint-disabled */
// @ts-nocheck
import React, { useEffect, useState, useContext, Fragment } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
// import { AuthContext } from "../../context/authContext";
import { connect, useSelector } from 'react-redux';
import moment from 'moment';
import { NotificationManager } from 'react-notifications';
import MoonLoader from 'react-spinners/MoonLoader';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { css } from '@emotion/css';
import { LayoutContext } from '../../context/layoutContext';
import { NotificationBellEmpty, NotificationBellNew } from '../../assets/images/svgs';
// import userIcon from "../../assets/images/user.png";
import { HelpIcon, DowncaretIcon, PlusIcon } from '../../assets/SvgIconsSet';
import CreateTicketModal from '../pages/tickets/CreateTicketModal';
import CreateCustomerModal from '../pages/customers/CreateCustomerModal';
import DummyAvatar from '../../assets/images/dummyavatar.jpeg';
import InitialsFromString from '../helpers/InitialsFromString';
import '../../styles/Navbar.css';
import { httpGetMain, httpPatchMain } from '../../helpers/httpMethods';
// import AccordionLink from "components/pages/help_center/components/accordion/AccordionLink";
import { accessControlFunctions } from '../../config/accessControlList';
import { hasFeatureAccess, multiIncludes, brandKit } from '../../helper';
import GlobalSearch from './components/GlobalSearch';

function DropDown({ shouldShowUserExceededNotif }) {
    const [createCustModalShow, setCreateCustModalShow] = useState(false);
    const [createTicketModalShow, setCreateTicketModalShow] = useState(false);
    const tenantSubscription = useSelector((state) => state?.subscription?.subscription);
    const subExpired = moment(tenantSubscription?.subscription?.end_date).isBefore(new Date());
    return (
        <>
            <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown global-create-dropdown">
                <Dropdown.Toggle
                    disabled={subExpired || shouldShowUserExceededNotif}
                    variant=""
                    size=""
                    className={`btn nav-cta ${css({
                        ...brandKit({ bgCol: 0 }),
                        color: 'white',
                        borderRadius: '4px !important',
                        '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                    })}`}
                >
                    <div>
                        <PlusIcon />
                        <span className="ps-2 pe-4">Create</span>
                        <DowncaretIcon />
                    </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item eventKey="1">
                        <button
                            type="button"
                            disabled={subExpired}
                            onClick={() =>
                                !subExpired && !shouldShowUserExceededNotif && setCreateTicketModalShow(true)
                            }
                        >
                            Conversation
                        </button>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                        <button
                            type="button"
                            disabled={subExpired}
                            onClick={() => !subExpired && !shouldShowUserExceededNotif && setCreateCustModalShow(true)}
                        >
                            Customer
                        </button>
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
    const socketMessage = useSelector((state) => state?.socket?.socketMessage);
    const audioInstance = useSelector((state) => state?.audio?.audioInstance);
    const history = useHistory();

    useEffect(() => {
        notifications.map((item) => {
            if (item.isRead === false) setIsUnreadNotificiations(false);
        });
    }, [notifications]);

    useEffect(() => {
        if (socketMessage) {
            const eventData = socketMessage;
            if (eventData?.type === 'socketHook' && eventData?.status === 'incoming' && eventData?.data?.notification) {
                setNotifications((prev) => [...prev, eventData?.data?.notification]);
            }
            if (
                (eventData?.type === 'liveStream' || eventData?.type === 'socketHook') &&
                eventData?.status === 'incoming' &&
                !eventData?.data?.notification &&
                audioInstance
            ) {
                audioInstance.play();
            }
        }
    }, [socketMessage, audioInstance]);

    function createMarkup(data) {
        return { __html: data };
    }

    const markAllRead = () => {
        httpPatchMain(`notifications_mark_all?userId=${userId}`)
            .then(() => {
                setNotifications([]);
                setIsUnreadNotificiations(true);
                setNotificationsLoaded(false);
                return NotificationManager.success('All notifications marked read', 'Success', 4000);
            })
            // eslint-disable-next-line no-console
            .catch((error) => console.error(error));
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

    useEffect(() => {
        getNotifications();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId]);

    const goToTicket = (e, data) => {
        if (e.target.localName === 'a') {
            return;
        }

        if (data?.ticketId) {
            history.push({
                pathname: `/`,
                from: 'notifications',
                state: {
                    ticketId: data?.ticketId,
                    ticketHistoryId: data?.ticketHistoryId,
                    ticketData: data,
                },
            });
        } else {
            history.push({
                pathname: '/',
                from: 'notifications',
            });
        }

        // Mark notification as read when clicked
        httpPatchMain(`notifications/${data.notificationId}`, {
            isRead: true,
        }).then(() => {
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
                                    notifications.length === 0 || notifications == null || notifications === undefined
                                        ? 'text-center'
                                        : ''
                                }`}
                            >
                                Notifications
                            </p>
                        </div>
                        {notifications.length === 0 ||
                        notifications === null ||
                        notifications === undefined ||
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

                    {notificationsLoaded === false ? (
                        <NavDropdown.Item as="div">
                            <div className="d-flex justify-content-center align-items-center py-5 ps-1 notification-loader-indicator">
                                <MoonLoader
                                    color={brandKit({ bgCol: 0 })?.backgroundColor}
                                    loading={notificationsLoaded === false}
                                    size={30}
                                />
                            </div>
                        </NavDropdown.Item>
                    ) : notifications.length === 0 || notifications == null || notifications === undefined ? (
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
                                    if ((!data.isRead && data.type === 'tickets') || data.type === 'mention') {
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
                                                                            data?.sender?.firstname === 'default' ||
                                                                            !data?.sender?.firstname
                                                                                ? ''
                                                                                : data?.sender?.firstname
                                                                        }`,
                                                                        `${
                                                                            data?.sender?.lastname === 'default' ||
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
    const tenantSubscription = useSelector((state) => state?.subscription?.subscription);
    const location = useLocation();

    const [notif, setNotif] = useState({
        active: false,
        trialDaysLeft: 0,
        trialHoursLeft: 0,
        trialMinutesLeft: 0,
        planName: '',
        subExpired: false,
        showPlanExpiredNotif: false,
        showUserExceededNotif: false,
    });

    const numOfSubUsers = tenantSubscription?.subscription?.no_of_users;
    const totalUsers = tenantSubscription?.subscription?.totalUsers;
    const shouldShowUserExceededNotif = !tenantSubscription?.plan?.is_trial && totalUsers > numOfSubUsers;

    const endDate = tenantSubscription?.subscription?.end_date;
    const planName = tenantSubscription?.plan?.name;

    // days left for plan expiration
    const daysLeft = moment(endDate).diff(moment(new Date()), 'days');
    const hoursLeft = moment(endDate).diff(moment(new Date()), 'hours');
    const minutesLeft = moment(endDate).diff(moment(new Date()), 'minutes');
    const subExpired = moment(endDate).isBefore(new Date());
    const shouldShowPlanExpiredNotif = !tenantSubscription?.plan?.is_free && daysLeft <= 8;

    useEffect(() => {
        setNotif((prev) => ({
            ...prev,
            showPlanExpiredNotif: shouldShowPlanExpiredNotif,
        }));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [shouldShowPlanExpiredNotif, location.pathname]);

    useEffect(() => {
        setNotif((prev) => ({
            ...prev,
            showUserExceededNotif: shouldShowUserExceededNotif,
        }));
    }, [shouldShowUserExceededNotif, location.pathname]);

    const getUserFromStorage = () => {
        const lUser = localStorage.getItem('user');
        if (lUser) {
            const parse = JSON.parse(lUser);
            setlocalUser(parse.user);
        }
    };

    useEffect(() => {
        getUserFromStorage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [window.localStorage.getItem('user')]);

    const actualSubTime = (() => {
        const _daysLeft = Math.abs(daysLeft);
        const _hoursLeft = Math.abs(hoursLeft);
        const _minutesLeft = Math.abs(minutesLeft);

        if (_daysLeft > 0) return `${_daysLeft} ${_daysLeft > 1 ? 'days' : 'day'}`;
        if (_hoursLeft > 0) return `${_hoursLeft} ${_hoursLeft > 1 ? 'hours' : 'hour'}`;
        if (_minutesLeft > 0) return `${_minutesLeft} ${_minutesLeft > 1 ? 'minutes' : 'minute'}`;
        return '';
    })();

    return (
        <div
            id="navbar"
            className={`${
                appReduceSidebarWidth === true
                    ? notif.showPlanExpiredNotif || notif.showUserExceededNotif
                        ? 'section-wrap-nav section-wrap-nav-2'
                        : 'section-wrap-nav'
                    : notif.showPlanExpiredNotif || notif.showUserExceededNotif
                    ? 'section-wrap-nav section-wrap-nav-2 section-wrap-navPadding'
                    : 'section-wrap-nav section-wrap-navPadding'
            }`}
        >
            <div className="navbar-position">
                <div
                    style={{
                        height:
                            notif.showPlanExpiredNotif || notif.showUserExceededNotif ? `calc(90px + 3rem)` : '90px',
                    }}
                    className={`${
                        appReduceSidebarWidth === true ? 'navbar-wrap' : 'navbar-wrap section-wrap-navWidth'
                    }`}
                >
                    {notif.showUserExceededNotif ? (
                        <div className="sub-notif">
                            <span>
                                You have exceeded the number of users ({numOfSubUsers}) allowed by your plan. Kindly
                                remove others.
                            </span>{' '}
                            <Link
                                to={
                                    location.pathname === '/settings/users'
                                        ? '/settings/account?tab=subscription'
                                        : '/settings/users'
                                }
                                className="btn btn-sm bg-at-blue-light sub-notif-get"
                            >
                                {location.pathname === '/settings/users' ? 'Subscription' : 'Users'}
                            </Link>{' '}
                            <button
                                type="button"
                                onClick={() => setNotif((prev) => ({ ...prev, showUserExceededNotif: false }))}
                                className="sub-notif-cancel btn"
                            >
                                ×
                            </button>
                        </div>
                    ) : (
                        notif.showPlanExpiredNotif && (
                            <div className="sub-notif">
                                {!subExpired ? (
                                    <span>
                                        {actualSubTime ? `Your ${planName} is ending in ${actualSubTime}.` : '...'}
                                    </span>
                                ) : (
                                    <span>Your {planName} has expired</span>
                                )}{' '}
                                <Link
                                    to="/settings/account?tab=subscription"
                                    className={`btn btn-sm px-3 sub-notif-get ${css({
                                        ...brandKit({ bgCol: 0 }),
                                        color: 'white',
                                        '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                    })}`}
                                >
                                    Get Alpha Plan Now
                                </Link>{' '}
                                <button
                                    type="button"
                                    onClick={() => setNotif((prev) => ({ ...prev, showPlanExpiredNotif: false }))}
                                    className="sub-notif-cancel btn"
                                >
                                    ×
                                </button>
                            </div>
                        )
                    )}

                    <div
                        className="navbar-content"
                        style={{
                            height:
                                notif.showPlanExpiredNotif || notif.showUserExceededNotif
                                    ? `calc(100% - 3rem)`
                                    : '100%',
                        }}
                    >
                        <div className="pageTitle">
                            <span style={{ textTransform: 'capitalize' }}>{pageName}</span>
                        </div>
                        <div className="navbar-right-content align-items-center d-flex gap-3">
                            <GlobalSearch />

                            {multiIncludes(accessControlFunctions[user?.role], [
                                'create_ticket',
                                'create_customer',
                            ]) && <DropDown shouldShowUserExceededNotif={shouldShowUserExceededNotif} />}
                            <Notification userId={user?.id} />

                            {hasFeatureAccess('knowledgebase') && (
                                // <Link to="/knowledgebase" target="_blank">
                                //     <HelpIcon />
                                // </Link>
                                <Dropdown className="ticket-status-dropdown help-dropdown">
                                    <Dropdown.Toggle
                                        variant=""
                                        size=""
                                        className="btn"
                                        style={{ borderRadius: '.15rem' }}
                                    >
                                        <div style={{ padding: '.25rem .5rem' }}>
                                            <HelpIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} stroke="white" />
                                        </div>
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Link
                                            to={{ pathname: 'https://docs.alphacx.co' }}
                                            target="_blank"
                                            className="p-2 w-100 text-at-blue"
                                        >
                                            Documentation
                                        </Link>
                                        <Link
                                            to="/settings?opencontactmodal=open"
                                            className="p-2 w-100 text-at-blue whitespace-nowrap"
                                        >
                                            Contact Support
                                        </Link>
                                    </Dropdown.Menu>
                                </Dropdown>
                            )}

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
                                        <span className={`nav-initials ${css({ ...brandKit({ bgCol: 0 }) })}`}>
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

const mapStateToProps = (state) => ({
    user: state.userAuth.user,
});

export default connect(mapStateToProps)(Navbar);
