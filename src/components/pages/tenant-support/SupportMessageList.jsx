import React from 'react';
import InitialsFromString from '../../helpers/InitialsFromString';

function SupportMessageList() {
    return (
        <div>
            <div className="message-listmain message-listmain-active" id="msgListTop">
                <div className="message-user-img">
                    {true ? (
                        <div className="message-user-noimg">
                            <span>{InitialsFromString(`James`, `Gibson`)}</span>
                        </div>
                    ) : (
                        <img src="" alt="" />
                    )}
                    <div className="user-status-online" />
                </div>
                <div className="message-user-body">
                    <p className="senderName">James Gabson</p>
                    <p className="senderMSG text-truncate" style={{ maxWidth: '160px' }}>
                        This is a plain response
                    </p>
                </div>
                <div className="message-user-time">
                    <p className="msgCountCon">2</p>
                    <p className="msGtime">image.png</p>
                </div>
            </div>
        </div>
    );
}

export default SupportMessageList;
