/* eslint-disable */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import MoonLoader from 'react-spinners/MoonLoader';
import moment from 'moment';
import { css } from '@emotion/css';
import truncateWithEllipses from '../../helpers/truncate';
import { timeFormater } from '../../helpers/dateFormater';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import InitialsFromString from '../../helpers/InitialsFromString';
import ChatBubble from '../../../assets/svgicons/chatBubble.svg';
import { scrollToView, brandKit } from '../../../helper';

function EmptyMessageList(){
    return (
        <div className="mt-5 mx-3 text-center">
            <div className='mb-4'>
                <img src={ChatBubble} alt="No message icon" />
            </div>
            <p className="mb-2">Hello there, you do not have any connected channels.</p>
            <p className="">Click <a href="/settings/integrations">here</a> to connect your channels.</p>
        </div>
    );
}

export default function MessageList({
    tickets,
    LoadingTick,
    setLoadingTicks,
    loadSingleMessage,
    setSingleTicketFullInfo,
    setTicketId,
    filterChat,
    filterTicketsState,
    activeChat,
    setActiveChat,
    statuses,
    ticketsLoaded,
    searchedTickets
}) {
    const [renderTicket, setRenderTicket] = useState([]);
    const [loadingTickets, setLoadingTickets] = useState(true);

    useEffect(() => {
        setLoadingTicks(true);
        checkRender(); // , [filterChat, tickets, filterTicketsState]
    }, [filterChat, tickets, filterTicketsState]);

    useEffect(() => {
        setLoadingTicks(false);
    }, [renderTicket]);

    useEffect(() => {
        if (LoadingTick == false) {
            setLoadingTickets(false);
        }
    }, [LoadingTick]);

    const checkRender = () => {
        if (filterChat === 'system') {
            setRenderTicket(tickets);
        } else {
            setRenderTicket(filterTicketsState);
        }
    };

    const getChannelColor = (channel, placement = 'foreground') => {
        channel = channel?.toLowerCase();
        const obj = {
            facebook: '#1877F2',
            email: '#2B304D',
            whatsapp: '#075e54',
            sms: '#F22F46',
            helpdesk: '#4A154B',
            livechat: '#1A1D33',
            system: '#F00073',
            others: '#2E2E2E',
        };
        if (
            Object.keys(obj).some(function (k) {
                return ~k.indexOf(channel);
            })
        ) {
            if (placement === 'foreground') {
                return Object.entries(obj).find(([k, v]) => k.startsWith(channel))[1];
            }
            return `${Object.entries(obj).find(([k, v]) => k.startsWith(channel))[1]}16`;
        }
        if (placement === 'foreground') {
            return obj.others;
        }
        return `${obj.others}16`;
    };

    const formatDate = (date) => {
        let formatedDate = '';
        if (moment(`${date}`).format('DD/MM/YYYY') == moment(new Date()).format('DD/MM/YYYY')) {
            formatedDate = moment(`${date}`).add(1, 'hours').format('LT');
        } else {
            formatedDate = moment(`${date}`).format('Do MMM, yyyy');
        }
        return formatedDate;
    };

    return (
        <div className="message-list-container" id="messageListContainer">
            {loadingTickets || !ticketsLoaded ? (
                <div className="d-flex justify-content-center align-items-center pt-5 away">
                    {' '}
                    <MoonLoader color={brandKit({ bgCol: 0 })?.backgroundColor} loading size={30} />
                </div>
            ) : Array.isArray(renderTicket) ? (
                renderTicket.length == 0 ? (
                    <EmptyMessageList />
                ) : (searchedTickets.active && searchedTickets.tickets.length === 0) ? <div className="text-center mt-5 px-2">No Ticket Found</div> : (
                    (searchedTickets.active ? searchedTickets.tickets : renderTicket).map((data, index) => {
                        const currentStatus = statuses?.find((item) => item?.id === data?.status?.id || item?.id === data?.status_id);
                        return (
                            <div
                                key={index}
                                className={`message-listmain ${
                                    data?.id === activeChat ? `${css`
                                        border-left: 2.7px solid ${brandKit({ bgCol: 0 })?.backgroundColor}
                                    `}` : ''
                                }`}
                                onClick={() => {
                                    scrollToView('#lastMsg');
                                    loadSingleMessage(data);
                                    setSingleTicketFullInfo(data);
                                    setTicketId(data?.id);
                                    setActiveChat(data?.id);
                                }}
                                id="msgListTop"
                            >
                                <div className="message-user-img">
                                    {data?.customer?.avatar == null ? (
                                        <div className={`message-user-noimg ${css`
                                                color: ${brandKit({ bgCol: 0 })?.backgroundColor}
                                        `}`}>

                                        {/* // <div className={`message-user-noimg ${css`
                                        //     background: linear-gradient(
                                        //         180deg,
                                        //         ${brandKit({ bgCol: 0 })?.backgroundColor} -93.06%,
                                        //         ${brandKit({ bgCol: -120 })?.backgroundColor} 100%
                                        //     );
                                        // `}`}> */}
                                            <span>
                                                {InitialsFromString(
                                                    `${
                                                        data?.customer?.firstname == 'default' ||
                                                        !data?.customer?.firstname
                                                            ? ''
                                                            : data?.customer?.firstname
                                                    }`,
                                                    `${
                                                        data?.customer?.lastname == 'default' ||
                                                        !data?.customer?.lastname
                                                            ? ''
                                                            : data?.customer?.lastname
                                                    }`,
                                                )}
                                            </span>
                                        </div>
                                    ) : (
                                        <img src={data?.customer?.avatar} alt="" />
                                    )}
                                    <div className="user-status-online" />
                                </div>
                                <div className="message-user-body">
                                    <p className="senderName">
                                        {`${
                                            !data?.customer?.firstname || data?.customer?.firstname == 'default'
                                                ? ''
                                                : capitalizeFirstLetter(data?.customer?.firstname)
                                        } 
                  ${
                      !data?.customer?.lastname || data?.customer?.lastname == 'default'
                          ? ''
                          : capitalizeFirstLetter(data?.customer?.lastname)
                  }`}
                                    </p>
                                    <p className="senderMSG text-truncate" style={{ maxWidth: '160px' }}>
                                        {!Array.isArray(data?.history)
                                            ? ''
                                            : data?.history.length == 0
                                            ? ''
                                            : data?.history[0]?.plain_response === null ||
                                              data?.history[0]?.plain_response === undefined
                                            ? ''
                                            : data?.history[0]?.plain_response}
                                    </p>
                                    <div className="msg-badges">
                                        <div
                                            style={{
                                                background: `"${getChannelColor(data?.channel || '', 'background')}"`,
                                                color: `"${getChannelColor(data?.channel || '')}"`,
                                            }}
                                        >
                                            {data?.channel || ''}
                                        </div>

                                        <div
                                            style={{
                                                background: `"${currentStatus?.background_color}"`,
                                                color: `"${currentStatus?.forecolor}"`,
                                            }}
                                        >
                                            {currentStatus?.status}
                                        </div>
                                    </div>
                                </div>
                                <div className="message-user-time">
                                    {data?.__meta__?.unRead == 0 || data?.id === activeChat ? (
                                        ''
                                    ) : (
                                        <p className="msgCountCon">{data?.__meta__?.unRead}</p>
                                    )}
                                    <p className="msGtime">{formatDate(data?.updated_at || data?.created_at)}</p>
                                </div>
                            </div>
                        );
                    })
                )
            ) : (
                <p className="text-center pt-5 lead h4">No ticket found</p>
            )}
        </div>
    );
}
