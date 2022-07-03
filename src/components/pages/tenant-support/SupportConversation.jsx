import React from 'react';
import SupportChatArea from './SupportChatArea';
import './SupportConversation.scss';
import SupportMessageList from './SupportMessageList';

function SupportConversation() {
    return (
        <div className="support-conversation">
            <div className="sconv__section sconv__section--one">
                <SupportMessageList />
            </div>
            <div className="sconv__section sconv__section--two">
                <SupportChatArea />
            </div>
        </div>
    );
}

export default SupportConversation;
