// @ts-nocheck
import React from 'react';
import SupportChatArea from './SupportChatArea';
import SupportChatAreaHeader from './SupportChatAreaHeader';
import './SupportConversation.scss';
import SupportMessageList from './SupportMessageList';
import SupportEditorBox from './SupportEditorBox';
import SupportNoChatFound from './SupportNoChatFound';
import ContactAlphcxModal from '../settings/ContactAlphcxModal';

function SupportConversation() {
    return (
        <div className="support-conversation">
            <div className="sconv__section sconv__section--one">
                <SupportMessageList />
            </div>
            <div className="sconv__section sconv__section--two">
                {true ? (
                    <SupportNoChatFound />
                ) : (
                    <>
                        <SupportChatAreaHeader />
                        <SupportChatArea />
                        <SupportEditorBox />
                    </>
                )}
            </div>
            <ContactAlphcxModal />
        </div>
    );
}

export default SupportConversation;
