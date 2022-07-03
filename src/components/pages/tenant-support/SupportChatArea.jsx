import React from 'react';

function SupportChatArea() {
    return (
        <div>
            <div className="message support-message">
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
