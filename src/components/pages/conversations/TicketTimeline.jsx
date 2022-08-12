/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { capitalize } from '@material-ui/core';
import { dateFormater } from '../../helpers/dateFormater';
import 'react-image-lightbox/style.css';
import TicketAttachment from './TicketAttachment';

export default function TicketTimeline({ ticket, timeLine = true }) {
    const [timeStampsMsg, setTimeStampsMsg] = useState([]);

    const sortMsges = (msgs) => {
        const resultTimestamps = msgs.filter((observation) => {
            return observation.response.includes('Ticket Stage has been marked');
        });
        setTimeStampsMsg(resultTimestamps);
    };

    useEffect(() => {
        sortMsges(ticket[0].history);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="zeelz" style={{ width: '100%', height: '100%', borderLeft: '1px solid rgb(241, 241, 241)' }}>
            <div className="user-profile-conversation-page tktimeline-wrapper">
                {timeLine ? (
                    <div className="container-timeline">
                        <div className="box">
                            <div className="borderContaner">
                                <div className="circle" />
                                <div className="img" />
                            </div>
                            <div className="textTimeLineSec">
                                <span>
                                    This message is assigned to{' '}
                                    {`${capitalize(ticket[0]?.assignee?.firstname || '')} ${capitalize(
                                        ticket[0]?.assignee?.lastname || '',
                                    )}`}
                                </span>
                                <div className="timeLinehashtags">
                                    <div style={{ textTransform: 'uppercase' }}>
                                        #{ticket[0]?.id.slice(ticket[0]?.id?.length - 8)}
                                    </div>
                                    <div>{dateFormater(ticket[0].created_at)}</div>
                                </div>
                            </div>
                        </div>

                        {ticket[0].history.length === 0 ? (
                            ''
                        ) : (
                            <div className="box">
                                <div className="borderContaner">
                                    <div className="circle" />
                                    <div className="img" />
                                </div>
                                <div className="textTimeLineSec">
                                    <span>
                                        {`${capitalize(ticket[0]?.assignee?.firstname || '')} ${capitalize(
                                            ticket[0]?.assignee?.lastname || '',
                                        )}`}{' '}
                                        picked up this chat
                                    </span>
                                    <div className="timeLinehashtags">
                                        <div style={{ textTransform: 'uppercase' }}>
                                            #{ticket[0]?.id.slice(ticket[0]?.id?.length - 8)}
                                        </div>
                                        <div>{dateFormater(ticket[0].created_at)}</div>
                                        {/* {console.log(ticket[0])} */}
                                    </div>
                                </div>
                            </div>
                        )}
                        {timeStampsMsg.map((data) => {
                            return (
                                <div key={data.id} className="box">
                                    <div className="borderContaner">
                                        <div className="circle" />
                                        <div className="img" />
                                    </div>
                                    <div className="textTimeLineSec">
                                        <span>
                                            This {`${data.response}`} by{' '}
                                            <span className="fst-italic">{`${
                                                data?.user?.firstname ? capitalize(data?.user?.firstname) : ''
                                            } ${data?.user?.lastname === 'default' ? '' : data?.user?.lastname}`}</span>
                                        </span>
                                        <div className="timeLinehashtags flex-column align-items-start">
                                            <div>
                                                <a href={`#${data?.id}`} className="acx-link-primary d-block">
                                                    Conversation{' '}
                                                    {`${data.response.replace(
                                                        'Conversation Stage has been marked as ',
                                                        '',
                                                    )}`}
                                                </a>
                                            </div>
                                            <div>{dateFormater(data.created_at)}</div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    ''
                )}
            </div>
            <TicketAttachment ticket={ticket} />
        </div>
    );
}
