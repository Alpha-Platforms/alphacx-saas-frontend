// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import SupportChatArea from './SupportChatArea';
import SupportChatAreaHeader from './SupportChatAreaHeader';
import SupportEditorBox from './SupportEditorBox';
import Socket from '../../../socket';
import { SUPPORT_DOMAIN } from '../../../reduxstore/actions/supportActions';

function SupportChatFound() {
    const [appSocket, setAppSocket] = useState(null);

    const supportTickets = useSelector((state) => state.support?.supportTickets);
    const activeSupportTicketId = useSelector((state) => state.support?.activeSupportTicketId);
    const activeSupportTicket = supportTickets?.find((item) => item?.customer?.ticket?.id === activeSupportTicketId);

    useEffect(() => {
        console.log('activeSupportTicket => ', activeSupportTicket);
    }, [activeSupportTicket]);

    // useEffect(() => {
    //     if (appSocket && activeSupportTicket) {
    //         appSocket?.createConnection();

    //         if (appSocket?.socket) {
    //             appSocket.socket.onclose = () => {
                
    //             }
    //         }
    //     } else if (activeSupportTicket) {
    //         setAppSocket(new Socket(activeSupportTicket?.customer?.customer?.id, SUPPORT_DOMAIN, SUPPORT_DOMAIN));

    //     }

    // }, [appSocket, activeSupportTicketId])

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
