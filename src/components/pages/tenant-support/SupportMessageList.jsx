/* eslint-disable react/no-array-index-key */
// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import InitialsFromString from '../../helpers/InitialsFromString';

function SupportMessageList() {
    const supportTickets = useSelector((state) => state.support?.supportTickets || []);
    const activeSupportTicket = useSelector((state) => state.support?.activeSupportTicket);
    return (
        <div>
            {supportTickets.map((item, idx) => (
                <div
                    className={`message-listmain ${
                        activeSupportTicket?.customer?.ticket?.id === item?.customer?.ticket?.id
                            ? 'message-listmain-active'
                            : ''
                    }`}
                    id="msgListTop"
                    key={idx}
                >
                    <div className="message-user-img">
                        {true ? (
                            <div className="message-user-noimg">
                                <span>
                                    {InitialsFromString(
                                        item?.customer?.customer?.firstname || '',
                                        item?.customer?.customer?.lastname || '',
                                    )}
                                </span>
                            </div>
                        ) : (
                            <img src="" alt="" />
                        )}
                        <div className="user-status-online" />
                    </div>
                    <div className="message-user-body">
                        <p className="senderName">
                            {`${item?.customer?.customer?.firstname || ''} ${
                                item?.customer?.customer?.lastname || ''
                            }`.trim()}
                        </p>
                        <p className="senderMSG text-truncate" style={{ maxWidth: '160px' }}>
                            This is a plain response
                        </p>
                    </div>
                    <div className="message-user-time">
                        {/* <p className="msgCountCon">2</p> */}
                        <p className="msGtime">{dayjs(item?.customer?.ticket?.created_at).format('DD MMM, YYYY')}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SupportMessageList;
