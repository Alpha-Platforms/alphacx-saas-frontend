/* eslint-disable react/prop-types */
import React from 'react';
import dayjs from 'dayjs';

function SupportChatArea({ activeSupportTicket }) {
    return (
        <div className="support-chat-area">
            <div className="message support-message">
                <div className="message-container">
                    <div className="avatar avatar-md rounded-circle overflow-hidden acx-bg-primary d-flex justify-content-center align-items-center">
                        {false ? (
                            <img className="avatar-img" src="" width="100%" alt="" />
                        ) : (
                            <div className="">
                                <p className="fs-6 mb-0 text-white">
                                    {`${activeSupportTicket?.customer?.assignee?.firstname?.[0] || ''}${
                                        activeSupportTicket?.customer?.assignee?.lastname?.[0] || ''
                                    }`.trim()}
                                </p>
                            </div>
                        )}
                    </div>
                    <div className="message-inner">
                        <div className="message-body">
                            <div className="message-content">
                                <div className="message-text">
                                    <p className="text-dark message-title mb-1">
                                        {`${activeSupportTicket?.customer?.assignee?.firstname || ''} ${
                                            activeSupportTicket?.customer?.assignee?.lastname || ''
                                        }`.trim()}
                                    </p>
                                    <div className="message-text-content">
                                        Hello {activeSupportTicket?.customer?.customer?.firstname || ''}, how can we serve you
                                        today?
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="message-footer">
                            <span className="text-muted">
                                {dayjs(activeSupportTicket?.customer?.ticket?.created_at).format('DD MMM, YYYY')}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="message support-message message-out">
                <div className="message-container">
                    <div className="avatar avatar-md rounded-circle overflow-hidden acx-bg-primary d-flex justify-content-center align-items-center">
                        {false ? (
                            <img className="avatar-img" src="" width="100%" alt="" />
                        ) : (
                            <div className="">
                                <p className="fs-6 mb-0 text-white">JG</p>
                            </div>
                        )}
                    </div>
                    <div className="message-inner">
                        <div className="message-body">
                            <div className="message-content">
                                <div className="message-text">
                                    <p className="text-dark message-title mb-1">James Gibson</p>
                                    <div className="message-text-content">This is a message</div>
                                </div>
                            </div>
                        </div>
                        <div className="message-footer">
                            <span className="text-muted">12-01-2022</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportChatArea;
