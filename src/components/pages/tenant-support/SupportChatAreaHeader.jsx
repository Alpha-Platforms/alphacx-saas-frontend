/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import { useDispatch } from 'react-redux';
import { StarIconTicket } from '../../../assets/images/svgs';
import { setSupportModalActive } from '../../../reduxstore/actions/supportActions';

function SupportChatAreaHeader() {
    const dispatch = useDispatch();
    return (
        <div>
            <div className="conversationHeaderV2">
                <div className="conversationHeaderMainV2">
                    <div className="custormChatHeaderInfo">
                        <div className="custormChatHeaderInfoData my-3">
                            <h1 className="mb-0">This is a subject</h1>
                            <p className="mb-0">
                                Tijani Femi 4976375299158381@alphacx.co
                                <span className="custormChatHeaderDot d-block" /> <span>12-01-2022</span>
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
