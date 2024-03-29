/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect, Fragment } from 'react';
import { capitalize } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import { CancelIconC, UserProfileIcon1, UserProfileIcon2, UserProfileIcon3 } from '../../../assets/images/svgs';

import userImg from '../../../assets/imgF/user.png';

import { ReactComponent as TicketAssignedSvg } from '../../../assets/icons/ticketassigned.svg';
import TicketIdIcon, { ReactComponent as TicketIdSvg } from '../../../assets/icons/ticketid.svg';
import InitialsFromString from '../../helpers/InitialsFromString';

import TicketPriorityIcon from '../../../assets/icons/ticketpriority.svg';
import TicketStageIcon from '../../../assets/icons/ticketstage.svg';
import TicketCategoriesIcon from '../../../assets/icons/Ticketcategory.svg';
import TicketDueDateIcon from '../../../assets/icons/ticketduedate.svg';
import TicketSourceIcon from '../../../assets/icons/ticketsource.svg';
import { dateFormater } from '../../helpers/dateFormater';
import TicketAttachment from './TicketAttachment';
import { brandKit } from '../../../helper';

export default function UserProfile({ ticket, UserInfo, isTicketDetails, timeLine = true, showAttachment = true }) {
    const [timeStampsMsg, setTimeStampsMsg] = useState([]);
    const [tags, setTags] = useState([
        <div style={{ color: '#662D91', background: '#F8EEFF' }}>High Value</div>,
        <div style={{ color: '#F40D0D', background: '#FFEAEA ' }}>Billing</div>,
        <div style={{ color: '#662D91', background: '#F8EEFF' }}>High Value</div>,
        <div style={{ color: '#1E90FF', background: '#E3F1FF' }}>Billing</div>,
        <div style={{ color: '#662D91', background: '#F8EEFF' }}>High Value</div>,
        <div style={{ color: '#1E90FF', background: '#E3F1FF' }}>Billing</div>,
        <div style={{ color: '#F40D0D', background: '#FFEAEA ' }}>Billing</div>,
        <div style={{ color: '#662D91', background: '#F8EEFF' }}>High Value</div>,
        <div style={{ color: '#1E90FF', background: '#E3F1FF' }}>Billing</div>,
    ]);

    useEffect(() => {
        // getTickets();
        sortMsges(ticket?.history);
    }, []);

    function CircleIcon(props) {
        return (
            <span style={{ backgroundColor: props.color }} className="cust-grey-circle">
                <img src={props.icon} alt="" className="pe-none" />
            </span>
        );
    }

    const sortMsges = (msgs) => {
        const resultTimestamps = msgs.filter((observation) => {
            return observation.response.includes('Conversation status has been marked');
        });
        setTimeStampsMsg(resultTimestamps);
    };

    const sortTags = () => {};

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <div className="user-profile-conversation-page">
                <div className="userProfileTwoColFormat">
                    <div className="userProfilePicCon">
                        {ticket?.customer?.avatar ? (
                            <img src={ticket?.customer?.avatar} alt="" />
                        ) : (
                            // <img src={userImg} alt="" />
                            <div className={`userProfilePicConNoImgj ${css({ ...brandKit({ bgCol: 0 }) })}`}>
                                <p className="text-capitalize">
                                    {InitialsFromString(
                                        `${
                                            ticket?.customer?.firstname == 'default' ||
                                            !ticket?.customer?.firstname
                                                ? ''
                                                : ticket?.customer?.firstname
                                        }`,
                                        `${
                                            ticket?.customer?.lastname == 'default' || !ticket?.customer?.lastname
                                                ? ''
                                                : ticket?.customer?.lastname
                                        }`,
                                    )}
                                </p>
                            </div>
                        )}
                        <h6 className="mb-0 text-capitalize mt-2 pb-0">
                            <Link to={`/customers/${ticket?.customer.id}`} className="text-at-blue">
                                {`${capitalize(ticket?.customer?.firstname || '')} 
                  ${UserInfo?.lastname == 'default' ? '' : capitalize(ticket?.customer?.lastname || '')}`}
                            </Link>
                        </h6>
                        {isTicketDetails && (
                            <>
                                <p className="mb-0 pb-0 pt-1 f-12">{UserInfo?.email ? UserInfo?.email : 'N/A'}</p>
                                <p className="pt-1 f-12">{UserInfo?.phoneNumber ? UserInfo?.phoneNumber : 'N/A'}</p>
                            </>
                        )}
                    </div>

                    <div className="userProfileAboutCovers">
                        {!isTicketDetails ? (
                            <>
                                <div className="aboutUserColConv">
                                    <p>
                                        {' '}
                                        <span className="psvgIcon">
                                            <UserProfileIcon1 />
                                        </span>{' '}
                                        Conversation ID
                                    </p>

                                    <p style={{ textTransform: 'uppercase' }}>
                                        <Link to={`tickets/${ticket?.id}`} className="text-at-blue">
                                            #{ticket?.ticket_id}
                                        </Link>
                                    </p>
                                </div>

                                <div
                                    className="aboutUserColConv__"
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        marginBottom: 6,
                                    }}
                                >
                                    <div className="psvgIcon__" style={{ marginRight: 17 }}>
                                        {ticket?.assignee == null ? (
                                            <div className="avatar avatar-sm rounded-circle overflow-hidden acx-bg-secondary d-flex justify-content-center align-items-center">
                                                <p className="fs-6 mb-0 text-white">
                                                    <i className="bi-person-x" />
                                                </p>
                                            </div>
                                        ) : ticket?.assignee?.avatar ? (
                                            <img
                                                // src={ticket?.assignee?.avatar || 'love'}
                                                src={ticket?.assignee?.avatar}
                                                alt={`${ticket?.assignee?.firstname} ${ticket?.assignee?.lastname}`}
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '100%',
                                                    marginRight: '2px',
                                                }}
                                            />
                                        ) : (
                                            <div className="avatar avatar-sm rounded-circle overflow-hidden acx-bg-secondary d-flex justify-content-center align-items-center">
                                                <p className="fs-6 mb-0 text-white">{`${capitalize(
                                                    ticket?.assignee?.firstname?.slice(0, 1),
                                                )}${
                                                    ticket?.assignee?.lastname == 'default'
                                                        ? ''
                                                        : capitalize(ticket?.assignee?.lastname?.slice(0, 1))
                                                }`}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <p className="acx-fs-8">Assigned to</p>
                                        {ticket?.assignee ? (
                                            <Link
                                                to={`/settings/profile/${ticket?.assignee?.id}`}
                                                className="text-at-blue"
                                            >
                                                {`${capitalize(ticket?.assignee?.firstname)} ${capitalize(
                                                    ticket?.assignee?.lastname,
                                                )}`}
                                            </Link>
                                        ) : (
                                            <span>Unassigned</span>
                                        )}
                                    </div>
                                </div>

                                <div className="aboutUserColConv">
                                    <p>
                                        {' '}
                                        <span className="psvgIcon">
                                            <UserProfileIcon2 />
                                        </span>{' '}
                                        Work Phone
                                    </p>
                                    {/* <p>
              
            </p> */}
                                    <p>{UserInfo?.phoneNumber ? UserInfo?.phoneNumber : 'unavailable'}</p>
                                </div>

                                <div className="aboutUserColConv">
                                    <p>
                                        {' '}
                                        <span className="psvgIcon">
                                            <UserProfileIcon3 />
                                        </span>{' '}
                                        Email Address
                                    </p>
                                    <p>{UserInfo?.email ? UserInfo?.email : 'unavailable'}</p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="aboutUserColConv__ d-flex align-items-center mb-3">
                                    <div className="psvgIcon__" style={{ marginRight: 17 }}>
                                        {ticket?.assignee?.avatar ? (
                                            <img
                                                // src={ticket?.assignee?.avatar || 'love'}
                                                src={ticket?.assignee?.avatar}
                                                alt={`${ticket?.assignee?.firstname} ${ticket?.assignee?.lastname}`}
                                                style={{
                                                    width: '30px',
                                                    height: '30px',
                                                    borderRadius: '100%',
                                                    marginRight: '2px',
                                                }}
                                            />
                                        ) : (
                                            <div className="avatar avatar-sm rounded-circle overflow-hidden acx-bg-secondary d-flex justify-content-center align-items-center">
                                                <p className="small mb-0 text-white">
                                                    {ticket?.assignee
                                                        ? `${capitalize(ticket?.assignee?.firstname?.slice(0, 1))}${
                                                              ticket?.assignee?.lastname == 'default'
                                                                  ? ''
                                                                  : capitalize(
                                                                        ticket?.assignee?.lastname?.slice(0, 1),
                                                                    )
                                                          }`
                                                        : ''}
                                                </p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <p className="acx-fs-8 mb-0">Assigned to</p>
                                        {ticket?.assignee ? (
                                            <Link
                                                to={`/settings/profile/${ticket?.assignee?.id}`}
                                                className="text-at-blue"
                                            >
                                                {`${capitalize(ticket?.assignee?.firstname)} ${capitalize(
                                                    ticket?.assignee?.lastname,
                                                )}`}
                                             </Link>
                                        ) : (
                                            <span>Unassigned</span>
                                        )}
                                    </div>
                                </div>

                                <ul className="ps-0 ticket-dleft">
                                    <li className="ms-0">
                                        <CircleIcon color="rgba(108, 65, 129, 0.25)" icon={TicketIdIcon} />
                                        <div>
                                            <p className="pb-0 mb-0 f-12 text-muted op-9">Conversation ID</p>
                                            <p className="text-muted f-13 text-uppercase" title={`${ticket?.id}`}>
                                                #{ticket?.ticket_id}
                                            </p>
                                        </div>
                                    </li>

                                    <li className="ms-0">
                                        <CircleIcon color="rgba(244, 13, 13, 0.25)" icon={TicketPriorityIcon} />
                                        <div>
                                            <p className="pb-0 mb-0 f-12 text-muted op-9">Priority</p>
                                            <p className="text-muted f-13 text-capitalize">
                                                {ticket?.priority?.name}
                                            </p>
                                        </div>
                                    </li>

                                    <li className="ms-0">
                                        <CircleIcon color="rgba(7, 1100, 247, 0.25)" icon={TicketStageIcon} />
                                        <div>
                                            <p className="pb-0 mb-0 f-12 text-muted op-9">Status</p>
                                            <p className="text-muted f-13">{ticket?.status?.status}</p>
                                        </div>
                                    </li>

                                    <li className="ms-0">
                                        <CircleIcon color="rgba(255, 159, 67, 0.25)" icon={TicketCategoriesIcon} />
                                        <div>
                                            <p className="pb-0 mb-0 f-12 text-muted op-9">Categories</p>
                                            <p className="text-muted f-13">{ticket?.category.name}</p>
                                        </div>
                                    </li>

                                    <li className="ms-0">
                                        <CircleIcon color="rgba(247, 37, 133, 0.25)" icon={TicketDueDateIcon} />
                                        <div>
                                            <p className="pb-0 mb-0 f-12 text-muted op-9">Due Date</p>
                                            <p className="text-muted f-13">N/A</p>
                                        </div>
                                    </li>

                                    <li className="ms-0">
                                        <CircleIcon color="rgba(17, 63, 100, 0.25)" icon={TicketSourceIcon} />
                                        <div>
                                            <p className="pb-0 mb-0 f-12 text-muted op-9">Ticket Source</p>
                                            <p className="text-muted f-13">{ticket?.channel}</p>
                                        </div>
                                    </li>
                                </ul>

                                {/*             <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketIdIcon} className="scale-9" alt="" />
                </span>{" "}
                ID
              </p>

              <p>#53467</p>
            </div>


            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketPriorityIcon} className="scale-9" alt="" />
                </span>{" "}
                Priority
              </p>
              <p>
                Medium
              </p>
            </div>

            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketStageIcon} className="scale-9" alt="" />
                </span>{" "}
                Stage
              </p>
              <p>Pending</p>
            </div>

            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <CircleIcon icon={TicketCategoriesIcon} />
                </span>{" "}
                Categories
              </p>
              <p>Enquires</p>
            </div>
            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketDueDateIcon} className="scale-9" alt="" />
                </span>{" "}
                Due Date
              </p>
              <p>31 August, 2021</p>
            </div>

            <div className="aboutUserColConv">
              <p>
                {" "}
                <span className="psvgIcon">
                  <img src={TicketSourceIcon} className="scale-9" alt="" />
                </span>{" "}
                <span>Ticket Source</span>
              </p>
              <p>Email</p>
            </div>
 */}
                            </>
                        )}
                        <div className="ticktTagsgfs3 d-flex justify-content-center border-top pt-2">
                            {ticket?.tags === null || ticket?.tags.length === 0?(
                                <p
                                    style={{
                                        fontSize: '11px',
                                        textAlign: 'center',
                                        // margin: "auto",
                                    }}
                                >
                                    No Tags
                                </p>
                            ) : (
                                ticket?.tags?.map((data) => {
                                    return <div key={data}>{data}</div>;
                                })
                            )}
                        </div>
                    </div>
                </div>
                {timeLine && (
                    <div className="container-timeline">
                        <div className="box">
                            <div className="borderContaner">
                                <div className={`circle ${css({ ...brandKit({ bgCol: 100 }) })}`} />
                                <div className={`img ${css({ ...brandKit({ bgCol: 100 }) })}`} />
                            </div>
                            <div className="textTimeLineSec">
                                <span>
                                    This message is assigned to{' '}
                                    {`${capitalize(ticket?.assignee?.firstname || '')} ${capitalize(
                                        ticket?.assignee?.lastname || '',
                                    )}`}
                                </span>
                                <div className="timeLinehashtags">
                                    <div style={{ textTransform: 'uppercase' }}>
                                        #{ticket?.id.slice(ticket?.id?.length - 8)}
                                    </div>
                                    <div>{dateFormater(ticket?.created_at)}</div>
                                </div>
                            </div>
                        </div>

                        {ticket?.history.length === 0 ? (
                            ''
                        ) : (
                            <div className="box">
                                <div className="borderContaner">
                                    <div className={`circle ${css({ ...brandKit({ bgCol: 100 }) })}`} />
                                    <div className={`img ${css({ ...brandKit({ bgCol: 100 }) })}`} />
                                </div>
                                <div className="textTimeLineSec">
                                    <span>
                                        {`${capitalize(ticket?.assignee?.firstname || '')} ${capitalize(
                                            ticket?.assignee?.lastname || '',
                                        )}`}{' '}
                                        picked up this chat
                                    </span>
                                    <div className="timeLinehashtags">
                                        <div style={{ textTransform: 'uppercase' }}>
                                            #{ticket?.id.slice(ticket?.id?.length - 8)}
                                        </div>
                                        <div>{dateFormater(ticket?.created_at)}</div>
                                        {/* {console.log(ticket)} */}
                                    </div>
                                </div>
                            </div>
                        )}
                        {timeStampsMsg.map((data) => {
                            return (
                                <div key={data.id} className="box">
                                    <div className="borderContaner">
                                        <div className={`circle ${css({ ...brandKit({ bgCol: 100 }) })}`} />
                                        <div className={`img ${css({ ...brandKit({ bgCol: 100 }) })}`} />
                                    </div>
                                    <div className="textTimeLineSec">
                                        <span>
                                            This {`${data.response}`} by{' '}
                                            <span className="fst-italic">{`${
                                                data?.user?.firstname ? capitalize(data?.user?.firstname) : ''
                                            } ${data?.user?.lastname == 'default' ? '' : data?.user?.lastname}`}</span>
                                        </span>
                                        <div className="timeLinehashtags flex-column align-items-start">
                                            <div>
                                                <a href={`#${data?.id}`} className="acx-link-primary d-block">
                                                    Ticket{' '}
                                                    {`${data.response.replace('Conversation Status has been marked as ', '')}`}
                                                </a>
                                            </div>
                                            <div>{dateFormater(data.created_at)}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {showAttachment && <TicketAttachment ticket={ticket} />}
            </div>
        </div>
    );
}
