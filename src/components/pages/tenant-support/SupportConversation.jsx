// @ts-nocheck
import React, { useState } from 'react';
import './SupportConversation.scss';
import SupportMessageList from './SupportMessageList';
import SupportNoChatFound from './SupportNoChatFound';
import ContactAlphcxModal from '../settings/ContactAlphcxModal';
import SupportChatFound from './SupportChatFound';

function SupportConversation() {
    const [activeSupportTicketId, setActiveSupportTicketId] = useState(null);
    return (
        <div className="support-conversation">
            <div className="sconv__section sconv__section--one">
                <SupportMessageList
                    activeSupportTicketId={activeSupportTicketId}
                    setActiveSupportTicketId={setActiveSupportTicketId}
                />
            </div>
            <div className="sconv__section sconv__section--two">
                {!activeSupportTicketId ? <SupportNoChatFound /> : <SupportChatFound />}
            </div>
            <ContactAlphcxModal />
        </div>
    );
}

export default SupportConversation;
