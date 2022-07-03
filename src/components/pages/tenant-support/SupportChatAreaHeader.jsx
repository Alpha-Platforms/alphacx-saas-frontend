// @ts-nocheck
import React, { useState } from 'react';
import { StarIconTicket } from '../../../assets/images/svgs';
import ContactAlphcxModal from '../settings/ContactAlphcxModal';

function SupportChatAreaHeader() {
    const [contactSupportModalShow, setContactSupportModalShow] = useState(false);
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
                            onClick={() => setContactSupportModalShow(true)}
                        >
                            <StarIconTicket /> New Conversation
                        </button>
                    </div>
                </div>
            </div>
            <ContactAlphcxModal
                contactSupportModalShow={contactSupportModalShow}
                setContactSupportModalShow={setContactSupportModalShow}
            />
        </div>
    );
}

export default SupportChatAreaHeader;
