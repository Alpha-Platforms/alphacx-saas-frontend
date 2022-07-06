/* eslint-disable react/prop-types */
// @ts-nocheck
import React from 'react';
import { useDispatch } from 'react-redux';
import NoChatSvg from '../../../assets/imgF/noChat.png';
import { StarIconTicket } from '../../../assets/images/svgs';
import { setSupportModalActive } from '../../../reduxstore/actions/supportActions';

function SupportNoChatFound() {
    const dispatch = useDispatch();
    return (
        <div className="no-chant-found-container">
            <img src={NoChatSvg} alt="" />
            <p className="mb-0">Click on a conversation to get started</p>
            <p>— or —</p>
            <div>
                <button
                    type="button"
                    className="custormChatHeaderInfoAction"
                    onClick={() => dispatch(setSupportModalActive(true))}
                >
                    <StarIconTicket /> New Conversation
                </button>
            </div>
        </div> );
}

export default SupportNoChatFound;
