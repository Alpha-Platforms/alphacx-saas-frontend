/* eslint-disable */
import React from 'react';
import NoChatSvg from '../../../assets/imgF/noChat.png';

export default function noChatFound({ value }) {
    return (
        <div className="no-chant-found-container">
            <img src={NoChatSvg} alt="" />
            <p className="fw-bold">No Messages Yet</p>
            <p className="small">Click <a href="/settings/integrations">here</a> to connect your channels</p>
            {/* <p>{value}</p> */}
        </div>
    );
}
