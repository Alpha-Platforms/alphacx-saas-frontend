import React from 'react';
import SupportChatArea from './SupportChatArea';
import SupportChatAreaHeader from './SupportChatAreaHeader';
import './SupportConversation.scss';
import SupportMessageList from './SupportMessageList';
import SupportEditorBox from './SupportEditorBox';

function SupportConversation() {
    return (
        <div className="support-conversation">
            <div className="sconv__section sconv__section--one">
                <SupportMessageList />
            </div>
            <div className="sconv__section sconv__section--two">
                <SupportChatAreaHeader />
                <SupportChatArea />
                <SupportEditorBox />
            </div>
        </div>
    );
}

export default SupportConversation;
