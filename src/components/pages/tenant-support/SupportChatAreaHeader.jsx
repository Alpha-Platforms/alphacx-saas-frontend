/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { StarIconTicket } from '../../../assets/images/svgs';
import { setSupportModalActive } from '../../../reduxstore/actions/supportActions';

function SupportChatAreaHeader({ activeSupportTicket }) {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="conversationHeaderV2">
                <div className="conversationHeaderMainV2">
                    <div className="custormChatHeaderInfo">
                        <div className="custormChatHeaderInfoData my-3">
                            <h1 className="mb-0">{activeSupportTicket?.customer?.ticket?.subject}</h1>
                            <p className="mb-0">
                                {`${activeSupportTicket?.customer?.assignee?.firstname || ''} ${
                                    activeSupportTicket?.customer?.assignee?.lastname || ''
                                }`.trim()}{' '}
                                {activeSupportTicket?.customer?.customer?.email || ''}
                                <span className="custormChatHeaderDot d-block" />{' '}
                                <span>
                                    {dayjs(activeSupportTicket?.customer?.ticket?.created_at).format('DD MMM, YYYY')} at{' '}
                                    {dayjs(activeSupportTicket?.customer?.ticket?.created_at).format('hh:mm a')}
                                </span>
                            </p>
                        </div>
                        <button
                            type="button"
                            className="custormChatHeaderInfoAction"
                            onClick={() => dispatch(setSupportModalActive(true))}
                        >
                            <StarIconTicket /> New Conversation
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SupportChatAreaHeader;
