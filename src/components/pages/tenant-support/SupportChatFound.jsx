// @ts-nocheck
import React from 'react';
import { useSelector } from 'react-redux';
import SupportChatArea from './SupportChatArea';
import SupportChatAreaHeader from './SupportChatAreaHeader';
import SupportEditorBox from './SupportEditorBox';

function SupportChatFound() {
    const supportTickets = useSelector((state) => state.support?.supportTickets);
    const activeSupportTicketId = useSelector((state) => state.support?.activeSupportTicketId);
    const activeSupportTicket = supportTickets?.find((item) => item?.customer?.ticket?.id === activeSupportTicketId);

    console.log(
        '%cSupportChatFound.jsx line:13 activeSupportTicketId',
        'color: white; background-color: #007acc;',
        activeSupportTicketId,
    );
    console.log(
        '%cSupportChatFound.jsx line:14 activeSupportTicket',
        'color: white; background-color: #26bfa5;',
        activeSupportTicket,
    );
    return (
        <div>
            <SupportChatAreaHeader activeSupportTicket={activeSupportTicket} />
            <SupportChatArea activeSupportTicket={activeSupportTicket} />
            <SupportEditorBox />
        </div>
    );
}

export default SupportChatFound;
