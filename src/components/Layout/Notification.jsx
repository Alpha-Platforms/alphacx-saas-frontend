/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useSelector } from 'react-redux';
import { httpGetMain, httpPatchMain } from 'helpers/httpMethods';
import { NavLink, useHistory } from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { NotificationManager } from 'react-notifications';
import MoonLoader from 'react-spinners/MoonLoader';
import { NotificationBellEmpty, NotificationBellNew } from '../../assets/images/svgs';
import InitialsFromString from '../helpers/InitialsFromString';
// import '../../styles/Navbar.css';

function AppNotification({ userId }) {
    const [notifications, setNotifications] = useState([]);
    const [notificationsLoaded, setNotificationsLoaded] = useState(false);
    const [isUnreadNotificiations, setIsUnreadNotificiations] = useState(true);
    const socketMessage = useSelector((state) => state.socket?.socketMessage);
    const history = useHistory();

    // console.log('APPNOTIFICATION NOTIFICATIONS => ', notifications);

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
        }
    }, [socketMessage]);

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
        <>
            {!isUnreadNotificiations && 
                <div className="h-50 border mt-3 rounded">
                    <p className="bg-light border-bottom px-3 py-2">Notifications</p>
                    <div className="overflow-scroll notification-items">
                    {notifications
                        .slice(0)
                        .reverse()
                        .map((data, index) => {
                            if ((!data.isRead && data.type === 'tickets') || data.type === 'mention') {
                                return (
                                    <div
                                        key={index}
                                        onClick={(e) =>
                                            goToTicket(
                                                e,
                                                {
                                                    notificationId: data?.id,
                                                    ticketId: data?.others?.ticketId,
                                                    ticketHistoryId: data?.others?.ticketHistoryId,
                                                },
                                                index,
                                            )
                                        }
                                        className="acx-notification-item border-bottom px-2 mb-1"
                                    >
                                        <div className="d-flex justify-content-start align-items-start">
                                            <div className="me-3 flex-shrink-0 avatar avatar-md rounded-circle overflow-hidden d-flex justify-content-center align-items-center acx-bg-affair-800">
                                                {data?.sender?.avatar == null ? (
                                                    <h3 className="text-white">
                                                        <span>
                                                            {InitialsFromString(
                                                                `${
                                                                    data?.sender?.firstname === 'default' || !data?.sender?.firstname
                                                                        ? ''
                                                                        : data?.sender?.firstname
                                                                }`,
                                                                `${
                                                                    data?.sender?.lastname === 'default' || !data?.sender?.lastname
                                                                        ? ''
                                                                        : data?.sender?.lastname
                                                                }`,
                                                            )}
                                                        </span>
                                                    </h3>
                                                ) : (
                                                    <img width="40" height="auto" src={data?.sender?.avatar} alt="" />
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
                                                    <span className="text-muted f-12">
                                                        {moment(`${data.created_at}`).fromNow()}
                                                    </span>
                                                </div>
                                                <div className="acx-text-gray-500 small media-content">
                                                    <div
                                                        className="mb-0 text-wrap"
                                                        dangerouslySetInnerHTML={
                                                            data?.others?.response
                                                                ? createMarkup(data?.others?.response)
                                                                : createMarkup(data?.content)
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            }
                        })
                    }</div>
                </div>
            }
        </>
    );
}

export default AppNotification;
