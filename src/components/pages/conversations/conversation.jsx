/* eslint-disable no-param-reassign */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-return-assign */
/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { useLocation } from 'react-router-dom';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import YouTube from 'react-youtube';
import RSelect from 'react-select/creatable';
import moment from 'moment';
import MoonLoader from 'react-spinners/MoonLoader';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import { capitalize } from '@material-ui/core';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { NotificationManager } from 'react-notifications';
// import debounce from 'debounce';
import MessageList from './messageList';
import searchIcon from '../../../assets/imgF/Search.png';
import NoChatFound from './noChatFound';
import { httpGetMain, httpPostMain, httpPatchMain } from '../../../helpers/httpMethods';
import InitialsFromString from '../../helpers/InitialsFromString';
import { SocketDataContext } from '../../../context/socket';
import { StarIconTicket, SendMsgIcon } from '../../../assets/images/svgs';
import { dateFormater } from '../../helpers/dateFormater';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import UserProfile from './userProfile';
import LinkImg from '../../../assets/imgF/insertLink.png';
import TextUnderline from '../../../assets/imgF/TextUnderline.png';
import TextItalic from '../../../assets/imgF/TextItalic.png';
import boldB from '../../../assets/imgF/boldB.png';
import Smiley from '../../../assets/imgF/Smiley.png';
import editorImg from '../../../assets/imgF/editorImg.png';
import BackArrow from '../../../assets/imgF/back.png';
import { multiIncludes, uuid } from '../../../helper';
import { accessControlFunctions } from '../../../config/accessControlList';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './conversation.css';
import Socket from '../../../socket';
import noimage from '../../../assets/images/noimage.png';

function YouTubeGetID(url) {
    let ID = '';
    const newUrl = url.replace(/(>|<)/gi, '').split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    if (newUrl[2] !== undefined) {
        const [id] = newUrl[2].split(/[^0-9a-z_-]/i);
        ID = id;
    } else {
        ID = newUrl;
    }
    return ID;
}

const youtubeRegex =
    /(?:https?:\/\/)?(?:www\.|m\.)?youtu(?:\.be\/|be.com\/\S*(?:watch|embed)(?:(?:(?=\/[^&\s\?]+(?!\S))\/)|(?:\S*v=|v\/)))([^&\s\?]+)/;

// let appSocket;

function Conversation({ user }) {
    const initialState = EditorState.createWithContent(ContentState.createFromText(''));
    // const { AppSocket } = useContext(SocketDataContext);
    const [tickets, setTickets] = useState([]);
    const [ticketsLoaded, setTicketsLoaded] = useState(false);
    const [meta, setMeta] = useState({});
    const [filterTicketsState, setFilterTicketsState] = useState('');
    const [ticket, setTicket] = useState([]);
    const [loadingTicks, setLoadingTicks] = useState(true);
    const [loadSingleTicket, setLoadSingleTicket] = useState(false);
    const [SenderInfo, setSenderInfo] = useState(false);
    const [singleTicketFullInfo, setSingleTicketFullInfo] = useState(false);
    const [Category, setCategory] = useState([]);
    const [Priority, setPriority] = useState([]);
    const [Tags, setTags] = useState([]);
    const [editorState, setEditorState] = useState(initialState);
    const [firstTimeLoad, setfirstTimeLoad] = useState(true);
    // const [MessageSenderId, setMessageSenderId] = useState('');
    const [ticketId, setTicketId] = useState('');
    const [ReplyTicket, setReplyTicket] = useState({
        plainText: '',
        richText: '',
    });
    const [replyType, setReplyType] = useState('reply');
    // const [mentions, setMentions] = useState([]);
    const [Agents, setAgents] = useState([]);
    const [channels, setChannels] = useState([]);
    const [Statuses, setStatuses] = useState([]);
    const [UserInfo, setUserInfo] = useState({});
    // const [ChatCol, setChatCol] = useState({
    //     col1: '',
    //     col2: '',
    // });
    const [openSaveTicketModal, setOpenSaveTicketModal] = useState(false);
    const [filterChat] = useState('system');
    const [saveTicket, setSaveTicket] = useState({
        customer: '',
        subject: '',
        description: [],
        category: '',
    });
    const [sendingReply, setSendingReply] = useState(false);
    const [msgHistory, setMsgHistory] = useState([]);
    const [wsTickets, setWsTickets] = useState([]);
    const [TodayMsges, setTodayMsges] = useState([]);
    const [YesterdayMsges, setYesterdayMsges] = useState([]);
    const [AchiveMsges, setAchiveMsges] = useState([]);
    const [channel, setChannel] = useState('All');
    const [status, setstatus] = useState('All');
    const [activeChat, setActiveChat] = useState('');

    /* UPDATE MODAL FORM VALUES */
    const [processing, setProcessing] = useState(false);
    const [RSTicketTags, setRSTicketTags] = useState([]);
    const [RSTicketAssignee, setRSTicketAssignee] = useState([]);
    const [RSTicketCategory, setRSTicketCategory] = useState('');
    const [RSTicketSubject, setRSTicketSubject] = useState('');
    const [RSTicketStage, setRSTicketStage] = useState({});
    const [RSTicketPriority, setRSTicketPriority] = useState('');
    const [RSTicketRemarks, setRSTicketRemarks] = useState('');
    const [RSTicketCustomFields, setRSTicketCustomFields] = useState(null);
    // ticket custom fields
    const [customFieldConfig, setCustomFieldConfig] = useState([]);
    const [customFieldsGroup, setCustomFieldsGroup] = useState([]);
    const [customFieldIsSet, setCustomFieldIsSet] = useState(false);
    //
    const [isAdditionalOptionVisible, setIsAdditionalOptionVisible] = useState(false);
    const [addHist, setAddHist] = useState(false);
    // scroll position
    const [scrollPosition, setScrollPosition] = useState('#lastMsg');
    const [editorUploadImg, setEditorUploadImg] = useState('');
    const [attachments, setAttachments] = useState([]);
    const location = useLocation();
    const [appSocket, setAppSocket] = useState(null);
    const [connectionClosed, setConnectionClosed] = useState(false);
    const [generatedUuid] = useState(uuid());

    // youtube player options
    const youtubePlayerOptions = {
        height: '180',
        width: '320',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    /**
     *
     *
     * @param {*} [e=scrollPosition] # + id of element you want to scroll to
     */
    const scrollPosSendMsgList = (e = scrollPosition) => {
        window.location.href = e;
    };

    const getUser = async (id) => {
        const res = await httpGetMain(`users/${id}`);
        setfirstTimeLoad(false);
        if (res.status === 'success') {
            return setUserInfo(res.data);
        }
        setLoadSingleTicket(false);
        return NotificationManager.error(res.er.message, 'Error', 4000);
    };

    const loadSingleMessage = async ({ id, customer, assignee, subject }) => {
        setAchiveMsges([]);
        getUser(customer.id);
        setLoadSingleTicket(true);
        setSenderInfo({ customer, subject });
        setTicket([]);

        /* 
        FIXME:  handle with http if ought to
        const swData = { assigneeId: assignee?.id || '', userId: customer?.id || '' };
        AppSocket.io.emit('join_private', swData);
         */

        const res = await httpGetMain(`tickets/${id}`);
        setfirstTimeLoad(false);
        if (res.status === 'success') {
            setTicket(res?.data);
            setMsgHistory(res?.data[0]?.history);
            // update the unread count of item to be loaded to zero since it is being loaded
            setTickets((prev) =>
                prev.map((item) => {
                    if (item?.id === id) {
                        return {
                            ...item,
                            __meta__: {
                                ...item.__meta__,
                                unRead: 0,
                            },
                        };
                    }
                    return item;
                }),
            );
            setSaveTicket({
                ...saveTicket,
                customer: '',
                subject: res?.data[0].subject,
                description: res?.data[0].history,
            });
            /* 
            FIXME:  handle with http if ought to
            const ticketsData = { channel: filterTicketsState === '' ? 'All' : filterTicketsState, per_page: 100 };
            AppSocket.io.emit(`ws_tickets`, ticketsData); */

            setLoadSingleTicket(false);
            return scrollPosSendMsgList(scrollPosition);
        }
        setLoadSingleTicket(false);
        return NotificationManager.error(res.er.message, 'Error', 4000);
    };

    // get custom field config
    const getCustomFieldConfig = async () => {
        const res = await httpGetMain(`custom-field?belongsTo=ticket`);
        if (res.status === 'success') {
            setCustomFieldConfig(res?.data);
        }
    };

    const getStatuses = async () => {
        const res = await httpGetMain(`statuses`);
        if (res.status === 'success') {
            return setStatuses(res?.data?.statuses);
        }
        return NotificationManager.error(res.er.message, 'Error', 4000);
    };

    const getCategories = async () => {
        const res = await httpGetMain(`categories`);
        if (res.status === 'success') {
            setCategory(res?.data?.categories);
        }
    };
    const getPriorities = async () => {
        const res = await httpGetMain(`priorities`);
        if (res.status === 'success') {
            setPriority(res?.data?.priorities);
        }
    };
    const getTags = async () => {
        const res = await httpGetMain(`tags`);
        if (res.status === 'success') {
            if (res?.data?.tags_names?.tags) {
                setTags(res?.data?.tags_names.tags);
            }
        }
    };
    const getAgents = async () => {
        const res = await httpGetMain(`agents`);
        if (res.status === 'success') {
            return setAgents(res?.data);
        }
        return NotificationManager.error(res.er.message, 'Error', 4000);
    };
    const getChannels = async () => {
        const res = await httpGetMain(`channel`);
        if (res.status === 'success') {
            return setChannels(res?.data?.channels);
        }
        return NotificationManager.error(res.er.message, 'Error', 4000);
    };

    const sortMsges = (msgs) => {
        const resultToday = msgs.filter((observation) => {
            return moment(observation.created_at).format('DD/MM/YYYY') === moment(new Date()).format('DD/MM/YYYY');
        });
        const resultYesterday = msgs.filter((observation) => {
            return (
                moment(observation.created_at).format('DD/MM/YYYY') === moment().add(-1, 'days').format('DD/MM/YYYY')
            );
        });

        const resultAchive = msgs.filter((observation) => {
            return (
                moment(observation.created_at).format('DD/MM/YYYY') !== moment().add(-1, 'days').format('DD/MM/YYYY') &&
                moment(observation.created_at).format('DD/MM/YYYY') !== moment(new Date()).format('DD/MM/YYYY')
            );
        });

        setTodayMsges(resultToday);
        setYesterdayMsges(resultYesterday);
        setAchiveMsges(resultAchive);
    };

    function scollPosSendMsg() {
        window.location.href = '#msgListTop';
    }

    useEffect(() => {
        if (!multiIncludes(accessControlFunctions[user?.role], ['reply_conv'])) {
            setReplyType('note');
        }
    }, []);

    useEffect(() => {
        // ticketHistoryId
        if (tickets?.length > 0 && location.state && location.state.hasOwnProperty('ticketId')) {
            const currentTicket = tickets?.find((item) => item.id === location.state.ticketId);
            setSingleTicketFullInfo(currentTicket);
            loadSingleMessage(currentTicket);
            setTicketId(location.state.ticketId);
            setActiveChat(location.state.ticketId);
            setScrollPosition(`#${location.state.ticketHistoryId}`);
            scrollPosSendMsgList(`#${location.state.ticketHistoryId}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tickets, location]);

    useEffect(() => {
        if (addHist) {
            setTimeout(() => {
                setAddHist(false);
            }, 2000);
        }
    }, [addHist]);

    useEffect(() => {
        sortMsges(msgHistory);
    }, [msgHistory]);

    useEffect(() => {
        getStatuses();
        getCategories();
        getPriorities();
        getTags();
        getAgents();
        getCustomFieldConfig();
        getChannels();
    }, []);

    useEffect(() => {
        (async () => {
            const initRes = await httpGetMain(`tickets?per_page=100`);
            console.log('%cconversation.jsx line:341 initRes', 'color: white; background-color: #007acc;', initRes);
            if (initRes?.status === 'success') {
                setTickets(initRes?.data?.tickets || []);
                setMeta(initRes?.data?.meta || {});
                setTicketsLoaded(true);
                // const res = await httpGetMain(`tickets?per_page=${initRes?.data?.meta?.totalItems}`);
                // if (res?.status === 'success') {
                //     console.log('%cconversation.jsx line:345 res', 'color: white; background-color: #007acc;', res);
                // }
            }
        })();
    }, []);

    const loggedInUser = JSON.parse(window.localStorage.getItem('user') || '{}')?.user;
    const domain = window.localStorage.getItem('domain');
    const tenantId = window.localStorage.getItem('tenantId');

    useEffect(() => {
        setAppSocket(new Socket(generatedUuid, domain, tenantId));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        setConnectionClosed(false);
        /* create a socket connection */
        if (appSocket) {
            appSocket.createConnection();

            appSocket?.socket.addEventListener('close', () => {
                setConnectionClosed(true);
                // console.log('%csocket.js WebSocket has closed: ', 'color: white; background-color: #007acc;', event);
                if (navigator.onLine) {
                    setAppSocket(new Socket(loggedInUser?.id, domain, tenantId));
                }
            });
        }

        return () => appSocket?.socket.close();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [appSocket]);

    useEffect(() => {
        const newConnection = () => {
            if (connectionClosed) {
                setAppSocket(new Socket(loggedInUser?.id, domain, tenantId));
            }
        };

        window.document.addEventListener('online', newConnection);

        return () => window.document.removeEventListener('online', newConnection);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [connectionClosed]);

    useEffect(() => {
        if (appSocket?.socket) {
            appSocket.socket.onmessage = (event) => {
                event.preventDefault();
                event.stopPropagation();
                const eventData = JSON.parse(event.data);
                console.log('Message from socket => ', eventData);
                if (
                    (eventData?.type === 'liveStream' || eventData?.type === 'socketHook') &&
                    eventData?.status === 'incoming' &&
                    !eventData?.data?.notification
                ) {
                    const data = eventData?.data;
                    if (ticketId && data?.id === ticketId) {
                        setMsgHistory((prev) => {
                            const reply = {
                                ...data?.reply,
                            };
                            if (data?.reply?.is_deleted) {
                                return prev.filter((item) => item?.id !== data?.reply?.id);
                            }
                            return [...prev, reply];
                        });
                        if (!data?.reply?.is_deleted) scrollPosSendMsgList('#lastMsg');
                    }

                    setTickets((prev) => {
                        if (data?.reply?.is_deleted)
                            return prev.map((ticketItem) => {
                                if (ticketItem?.id === data?.id) {
                                    const newTicket = {
                                        ...ticketItem,
                                        history: ticketItem.history?.filter((item) => item?.id !== data?.reply?.id),
                                        __metaticketItem__: {
                                            ...ticketItem?.__meta__,
                                            history_count: Number(ticket?.__meta__?.history_count) - 1,
                                        },
                                    };
                                    return newTicket;
                                }
                                return ticketItem;
                            });
                        // get ticket from existing
                        const currentTicket = prev.find((item) => item?.id === data?.id);
                        if (currentTicket) {
                            // ticket of `data` exists
                            // add new message history and update read count and push to first item in the array
                            const newCurrentTicket = {
                                ...currentTicket,
                                history: Array.isArray(data?.history)
                                    ? [...data.history, ...currentTicket.history]
                                    : data?.reply
                                    ? [data?.reply, ...currentTicket.history]
                                    : [...currentTicket.history],
                                __meta__: {
                                    history_count:
                                        Number(currentTicket?.__meta__?.history_count) >= 0
                                            ? Number(currentTicket.__meta__.history_count) + 1
                                            : 1,
                                    unRead:
                                        Number(currentTicket.__meta__.unRead) >= 0
                                            ? Number(currentTicket.__meta__.unRead) + 1
                                            : 1,
                                },
                            };
                            // remove current ticke from the tickets
                            const remainingTickets = prev.filter((item) => item?.id !== data?.id);
                            // make first item in the array
                            return [newCurrentTicket, ...remainingTickets];
                        }
                        // ticket of `data` does not exist
                        const newTicket = {
                            customer: data?.reply?.user,
                            history: [data?.reply],
                            ...data,
                            __meta__: {
                                history_count: 1,
                                unRead: 1,
                            },
                        };
                        // add as first item
                        return [newTicket, ...prev];
                    });
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticketId, appSocket]);

    console.log('msg history => ', msgHistory);

    useEffect(() => {
        setCustomFieldIsSet(false);
        setRSTicketCustomFields(null);
        const ticketCustomFields = ticket[0]?.custom_fields || {};
        const mergedCustomUserFields = customFieldConfig.map((element) => {
            if (ticketCustomFields.hasOwnProperty(element.id)) {
                setRSTicketCustomFields((prevState) => ({
                    ...prevState,
                    [element.id]: ticketCustomFields[element.id],
                }));
                return {
                    ...element,
                    value: ticketCustomFields[element.id],
                };
            }
            return {
                ...element,
                value: '',
            };
        });
        const groupedCustomFields = Object.entries(
            mergedCustomUserFields.reduce(
                (
                    acc,
                    {
                        id,
                        field_name,
                        field_type,
                        field_section,
                        field_options,
                        required,
                        multiple_options,
                        belongs_to,
                        value,
                    },
                ) => {
                    // Group initialization
                    if (!acc[field_section]) {
                        acc[field_section] = [];
                    }
                    // Grouping
                    // only pushing the object in a field section
                    acc[field_section].push({
                        id,
                        field_name,
                        field_type,
                        field_section,
                        required,
                        multiple_options,
                        belongs_to,
                        field_options,
                        value,
                    });
                    return acc;
                },
                {},
            ),
        ).map(([section, fields]) => ({ section, fields }));
        //
        setCustomFieldIsSet(true);
        setCustomFieldsGroup([...groupedCustomFields]);
        if (ticket?.length > 0) {
            const loadedTicket = ticket[0];
            if (loadedTicket?.channel?.toLowerCase() === 'instagram') {
                setTimeout(() => {
                    const convoMain = document.querySelector('#conversationMain');
                    const allMsgImgs = convoMain.querySelectorAll('img');
                    allMsgImgs.forEach(
                        (img) =>
                            // eslint-disable-next-line func-names
                            (img.onerror = function () {
                                this.src = noimage;
                            }),
                    );
                }, 1000);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticket]);

    const onEditorStateChange = (newEditorState) => {
        const plainText = newEditorState.getCurrentContent().getPlainText();
        const richText = draftToHtml(convertToRaw(newEditorState.getCurrentContent()));
        setEditorState(newEditorState);
        setReplyTicket({ plainText, richText });
    };

    const filterTicket = (value, type) => {
        if (type === 'channel') {
            setChannel(value);

            /* 
            FIXME:  handle with http if ought to
            AppSocket.createConnection();
            const data = { channel: value === 'All' ? '' : value, per_page: 100 };
            AppSocket.io.emit(`ws_tickets`, data); */
        }

        if (type === 'status') {
            setstatus(value);
            /* 
            FIXME:  handle with http if ought to
            AppSocket.createConnection();
            const data = { status: value === 'All' ? '' : value, per_page: 100 };
            AppSocket.io.emit(`ws_tickets`, data); */
        }
        setFilterTicketsState(value);
    };

    const replyTicket = async (reply, attachment, type = replyType) => {
        if (!reply?.richText?.trim() || !reply?.plainText?.trim()) return;
        scollPosSendMsg();

        // return console.log('%cconversation.jsx line:572 singleTicketFullInfo', 'color: white; background-color: #007acc;', singleTicketFullInfo);
        // console.log(singleTicketFullInfo);
        const filterSentTick = tickets.filter((tic) => {
            return tic.id === singleTicketFullInfo.id;
        });
        const filterSentTickAll = tickets.filter((tic) => {
            return tic.id !== singleTicketFullInfo.id;
        });
        setActiveChat(ticketId);
        filterSentTick[0].__meta__.history_count += 1;
        filterSentTick[0].updated_at = new Date();
        const newTicket = [...filterSentTick, ...filterSentTickAll];
        setTickets(newTicket);
        let agentMentions = [];
        if (replyType === 'note') {
            // reply.richText
            agentMentions = Agents.reduce((result, object) => {
                if (reply.richText.includes(object?.id)) {
                    result.push(object.id);
                }
                return result;
            }, []);

            // setMentions(() => [...agentMentions]);
        }

        let plainTextContent = reply.plainText;
        if (reply.plainText === '\n \n') {
            plainTextContent = editorUploadImg;
        }
        // attachmments that are truly in the response
        const actualAttachments = attachments.filter((item) => reply?.richText?.indexOf(item) !== -1);

        const data = {
            type,
            response: reply.richText,
            plainResponse: plainTextContent,
            phoneNumber: singleTicketFullInfo.customer.phone_number,
            mentions: agentMentions,
            attachments: actualAttachments,
        };
        const replyData = {
            type,
            attachment: null,
            created_at: new Date(),
            plain_response: plainTextContent,
            response: reply.richText,
            user,
            mentions: agentMentions,
            attachments: actualAttachments,
        };

        setMsgHistory((item) => [...item, replyData]);
        setTickets((prev) => {
            // get ticket from existing
            const currentTicket = prev.find((item) => item?.id === ticketId);
            if (currentTicket) {
                // ticket of `data` exists
                // add new message history and update read count and push to first item in the array
                const newCurrentTicket = {
                    ...currentTicket,
                    history: [replyData, ...currentTicket.history],
                };
                // remove current ticke from the tickets
                const remainingTickets = prev.filter((item) => item?.id !== ticketId);
                // make first item in the array
                return [newCurrentTicket, ...remainingTickets];
            }
            return prev;
        });
        scrollPosSendMsgList();
        const currentTicket = JSON.parse(JSON.stringify(singleTicketFullInfo));
        // remove history property from object before sending via socket
        Reflect.deleteProperty(currentTicket, 'history');
        const msgObj = {
            msgreciever: {
                msgrecieverid: singleTicketFullInfo?.customer?.id,
            },
            data: {
                ...currentTicket,
                reply: replyData,
            },
        };
        appSocket.sendLiveStreamMessage(msgObj);
        const res = await httpPostMain(`tickets/${singleTicketFullInfo.id}/replies`, data);
        // deep copy the currently loaded ticket

        if (res?.status === 'success') {
            setEditorState(initialState);
            setEditorUploadImg('');
            setAttachments([]);
            return setReplyTicket({ plainText: '', richText: '' });
        }

        // setSendingReply(false);
        return NotificationManager.error(res?.er?.message, 'Error', 4000);
    };

    const editorEditableBox = document.querySelector('.editorClassName');

    useEffect(() => {
        if (editorEditableBox) {
            editorEditableBox.onkeydown = (e) => {
                if (e.shiftKey && e.which === 13) return;
                if (e.ctrlKey && e.which === 13) return;
                if (e.metaKey && e.which === 13) return;
                if (e.altKey && e.which === 13) return;
                if (e.which === 13) {
                    e.target?.blur();
                    replyTicket(ReplyTicket, 'attachment');
                }
            };
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [editorEditableBox, ReplyTicket]);

    const updateTicketStatus = async () => {
        if (RSTicketStage.label === 'Closed') {
            // get url and replace domain
            const baseUrl = window.location.origin;
            const completedUrl = `${baseUrl}/feedback/${localStorage.domain}/${ticket[0].id}/${ticket[0].customer.id}`;
            const richText = `<p>Your ticket has been marked as closed, Please click on the link to rate this conversation : <a target='_blank' href='${completedUrl}'>Click here to rate us</a></p>`;
            const reply = {
                richText,
                plainText: `Your ticket has been marked as closed, Please click on the link to rate this conversation ${completedUrl}`,
            };
            replyTicket(reply, 'attachment', 'reply');
        }
        const statusRes = await httpPatchMain(`tickets-status/${ticket[0].id}`, { statusId: RSTicketStage.value });
        if (statusRes.status === 'success') {
            const replyData = {
                type: 'reply',
                status_action: true,
                attachment: null,
                created_at: new Date(),
                plain_response: `Ticket Stage has been marked as ${RSTicketStage.label}`,
                response: `Ticket Stage has been marked as ${RSTicketStage.label}`,
                user: ticket[0]?.assignee,
            };

            setMsgHistory((item) => [...item, replyData]);

            /*
            FIXME:  handle with http if ought to
            const channelData = { channel: filterTicketsState === '' ? 'All' : filterTicketsState, per_page: 100 };
            AppSocket.io.emit(`ws_tickets`, channelData); */

            return NotificationManager.success('Ticket status successfully updated', 'Success');
        }
        return NotificationManager.error(statusRes.er.message, 'Error', 4000);
    };

    const handleCustomFieldChange = (e) => {
        const { name, value } = e.target;
        setRSTicketCustomFields((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const closeSaveTicketModal = () => {
        setOpenSaveTicketModal(!openSaveTicketModal);
        setSaveTicket({
            customer: '',
            subject: '',
            description: [],
            category: '',
        });
        setRSTicketPriority(ticket[0].priority.id);
        setRSTicketCategory(ticket[0].category.id);
        setRSTicketSubject(ticket[0].subject);
        setRSTicketRemarks(ticket[0].description);
        setRSTicketTags(ticket[0].tags);
        setRSTicketAssignee(ticket[0]?.assignee?.id);
    };

    const updateTicket = async () => {
        const data = {
            priorityId: RSTicketPriority,
            categoryId: RSTicketCategory,
            subject: RSTicketSubject,
            description: RSTicketRemarks,
            assigneeId: RSTicketAssignee,
            tags: !Array.isArray(RSTicketTags) || !RSTicketTags.length ? null : RSTicketTags,
            customField: RSTicketCustomFields,
        };
        if (Object.keys(RSTicketStage).length > 0) {
            updateTicketStatus();
            setRSTicketStage({});
        }
        const res = await httpPatchMain(`tickets/${ticket[0].id}`, data);
        if (res.status === 'success') {
            setProcessing(false);
            closeSaveTicketModal();
            NotificationManager.success('Ticket successfully updated', 'Success');

            /*
            FIXME: handle with http if ought to 
            AppSocket.createConnection();
            const socketData = { channel: filterTicketsState === '' ? 'All' : filterTicketsState, per_page: 100 };
            AppSocket.io.emit(`ws_tickets`, socketData);
 */
            const ticketRes = await httpGetMain(`tickets/${ticket[0].id}`);
            if (ticketRes.status === 'success') {
                setTicket(ticketRes?.data);
            } else {
                setLoadSingleTicket(false);
                NotificationManager.info('please refresh your page to see changes');
            }
        } else {
            setProcessing(false);
            NotificationManager.error(res.er.message, 'Error', 4000);
        }
    };

    function createMarkup(data) {
        return { __html: data };
    }

    const uploadImageCallBack = (file) => {
        // long story short, every time we upload an image, we
        // need to save it to the state so we can get it's data
        // later when we decide what to do with it.

        // Make sure you have a uploadImages: [] as your default state
        const uploadedImages = [];

        const imageObject = {
            file,
            localSrc: URL.createObjectURL(file),
        };

        uploadedImages.push(imageObject);

        // this.setState(uploadedImages: uploadedImages)
        // We need to return a promise with the image src
        // the img src we will use here will be what's needed
        // to preview it in the browser. This will be different than what
        // we will see in the index.md file we generate.
        return new Promise((resolve) => {
            const data = new FormData();

            data.append('file', file);
            data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET);
            data.append('cloud_name', process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
            axios
                .post(`${process.env.REACT_APP_CLOUDINARY_BASE_URL}/image/upload`, data)
                .then(async (res) => {
                    // console.log(res.data?.url);
                    imageObject.src = res.data?.url;
                    setEditorUploadImg(ReplyTicket.plainText + editorUploadImg + (res.data?.url || ''));
                    setAttachments((prev) => [...prev, res.data?.url]);
                    resolve({ data: { link: res.data?.url } });
                })
                .catch(() => {
                    NotificationManager.error('Photo could not be uploaded', 'Error');
                });
        });
    };

    return (
        <>
            <div className="conversation-wrap codei-ui-andy-setDefaults">
                <div className="conversation-layout">
                    {/* CHAT COL ONE */}
                    <div className="conversation-layout-col-one">
                        <div className="message-toggles">
                            <div className="messageType">
                                <FormControl variant="outlined">
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => {
                                            filterTicket(e.target.value, 'channel');
                                        }}
                                        label="Filter"
                                        value={channel}
                                    >
                                        {/* <MenuItem value=""></MenuItem> */}
                                        <MenuItem value="All" label="All">
                                            Channels
                                        </MenuItem>
                                        {channels?.map((data) => {
                                            return (
                                                <MenuItem key={data?.id} value={data?.name}>
                                                    {data?.name.trim().replace(/^\w/, (c) => c.toUpperCase())}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                            <div className="messageOpenClose">
                                <FormControl variant="outlined">
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => {
                                            filterTicket(e.target.value, 'status');
                                        }}
                                        value={status}
                                    >
                                        <MenuItem value="All">Stages</MenuItem>
                                        {Statuses?.map((data) => {
                                            return (
                                                <MenuItem key={data.id} value={data.id}>
                                                    {data.status}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </div>
                        </div>

                        <div className="search-chat-con">
                            <form>
                                <div className="hjdwc">
                                    <input placeholder="Search" type="text" />
                                    <div className="search-chat-searchIcon">
                                        <img src={searchIcon} alt="" />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <MessageList
                            tickets={tickets}
                            LoadingTick={loadingTicks}
                            setLoadingTicks={setLoadingTicks}
                            loadSingleMessage={loadSingleMessage}
                            setSingleTicketFullInfo={setSingleTicketFullInfo}
                            filterChat={filterChat}
                            filterTicketsState={filterTicketsState}
                            activeChat={activeChat}
                            setActiveChat={setActiveChat}
                            scrollPosSendMsgList={scrollPosSendMsgList}
                            setTicketId={setTicketId}
                            statuses={Statuses}
                            ticketsLoaded={ticketsLoaded}
                        />
                    </div>

                    {/* CHAT COL ONE END */}

                    {/* CHAT COL TWO */}
                    <div
                        className="conversation-layout-col-two"
                        // style={showUserProfile ? { width: "calc(100% - 636px)" } : {}}
                    >
                        {firstTimeLoad ? (
                            <NoChatFound value="Click on a ticket to get started" />
                        ) : loadSingleTicket ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '50px',
                                    width: '100%',
                                }}
                            >
                                {' '}
                                <MoonLoader color="#0d4166" loading={loadSingleTicket} size={30} />
                            </div>
                        ) : (
                            <div className="conversation-layout-col-two-chatCol vgb">
                                {' '}
                                <div className="conversationHeaderV2">
                                    <div className="conversationHeaderMainV2">
                                        <div className="custormChatHeaderInfo">
                                            <div className="custormChatHeaderInfoData">
                                                <h1>{ticket[0]?.subject}</h1>
                                                <p>
                                                    {`${
                                                        !SenderInfo?.customer?.firstname
                                                            ? ''
                                                            : capitalize(SenderInfo?.customer?.firstname)
                                                    } 
                              ${
                                  !SenderInfo?.customer?.lastname
                                      ? ''
                                      : capitalize(
                                            SenderInfo?.customer?.lastname === 'default'
                                                ? ''
                                                : SenderInfo?.customer?.lastname,
                                        )
                              } 
                              ${!SenderInfo?.customer?.email ? 'N/A' : capitalize(SenderInfo?.customer?.email)}`}
                                                    <span className="custormChatHeaderDot d-block" />{' '}
                                                    <span>{dateFormater(ticket[0]?.updated_at)}</span>
                                                </p>
                                            </div>
                                            {multiIncludes(accessControlFunctions[user?.role], ['edit_ticket']) && (
                                                <button
                                                    type="button"
                                                    className="custormChatHeaderInfoAction"
                                                    onClick={closeSaveTicketModal}
                                                >
                                                    <StarIconTicket /> Update
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* CHAT SECTION */}
                                <div className="conversationsMain" id="conversationMain">
                                    {AchiveMsges.length === 0 ? (
                                        ''
                                    ) : (
                                        <div className="achivemsagesSection">
                                            {AchiveMsges.length === 0 &&
                                            TodayMsges.length === 0 &&
                                            YesterdayMsges.length === 0 ? (
                                                <span> No response found ({AchiveMsges.length})</span>
                                            ) : (
                                                <span> </span>
                                            )}
                                        </div>
                                    )}

                                    <div className="chatDateHeader">
                                        <div className="chatDateHeaderhr1" />

                                        <div className="chatDateHeaderTitle">
                                            <span>
                                                {moment(ticket[0].created_at).format('DD/MM/YYYY') ===
                                                moment(new Date()).format('DD/MM/YYYY')
                                                    ? 'Today'
                                                    : moment(ticket[0].created_at).format('DD/MM/YYYY') ===
                                                      moment().add(-1, 'days').format('DD/MM/YYYY')
                                                    ? 'Yesterday'
                                                    : moment(ticket[0].created_at).fromNow()}
                                            </span>{' '}
                                        </div>
                                        <div className="chatDateHeaderhr2" />
                                    </div>

                                    <div className="customerTiketChat" />
                                    <div className="msgAssingedToee3">
                                        {' '}
                                        This message is assigned to{' '}
                                        <span>
                                            {' '}
                                            {`${capitalize(ticket[0]?.assignee?.firstname || '')} ${capitalize(
                                                ticket[0]?.assignee?.lastname || '',
                                            )}`}
                                        </span>
                                    </div>

                                    <div
                                        className="msgAssingedToee3"
                                        style={{ paddingTop: '8px', marginBottom: '-6px' }}
                                    >
                                        <span>
                                            {' '}
                                            {`${capitalize(ticket[0]?.assignee?.firstname || '')} ${capitalize(
                                                ticket[0]?.assignee?.lastname || '',
                                            )}`}
                                        </span>{' '}
                                        picked up this chat
                                    </div>

                                    <div className="msgAssingedToee3">
                                        Ticket Status has been marked as <span> {ticket[0].status.status}</span>
                                    </div>

                                    <div className="">
                                        {AchiveMsges.map((data) => {
                                            return (
                                                <React.Fragment key={data?.id}>
                                                    {data?.response.includes('Ticket Stage has been marked') ||
                                                    data?.statusAction ? (
                                                        <div className="msgAssingedToee3 my-3" id={`${data?.id}`}>
                                                            <span> {`${data?.response}`}</span>
                                                        </div>
                                                    ) : (
                                                        <div
                                                            className={`message ${
                                                                data?.user?.role === 'Customer' ? '' : 'message-out'
                                                            } ${data?.type === 'note' ? 'message-note' : ''}`}
                                                            id={`${data?.id}`}
                                                        >
                                                            <div className="message-container">
                                                                <div className="avatar avatar-md rounded-circle overflow-hidden acx-bg-primary d-flex justify-content-center align-items-center">
                                                                    {data?.user?.avatar ? (
                                                                        <img
                                                                            className="avatar-img"
                                                                            src={data?.user.avatar}
                                                                            width="100%"
                                                                            alt=""
                                                                        />
                                                                    ) : (
                                                                        <div className="">
                                                                            <p className="fs-6 mb-0 text-white">{`${data?.user?.firstname?.slice(
                                                                                0,
                                                                                1,
                                                                            )}${
                                                                                data?.user?.lastname === 'default'
                                                                                    ? ''
                                                                                    : data?.user?.lastname?.slice(0, 1)
                                                                            }`}</p>
                                                                        </div>
                                                                    )}
                                                                </div>
                                                                <div className="message-inner">
                                                                    <div className="message-body">
                                                                        <div className="message-content">
                                                                            <div className="message-text">
                                                                                <p className="text-dark message-title mb-1">
                                                                                    {`${
                                                                                        data?.user?.firstname
                                                                                            ? capitalize(
                                                                                                  data?.user?.firstname,
                                                                                              )
                                                                                            : ''
                                                                                    } ${
                                                                                        data?.user?.lastname ===
                                                                                        'default'
                                                                                            ? ''
                                                                                            : data?.user?.lastname
                                                                                    }`}
                                                                                </p>
                                                                                {new RegExp(youtubeRegex).test(
                                                                                    data?.response,
                                                                                ) ? (
                                                                                    <div className="message-gallery mx-2 rounded-3 overflow-hidden">
                                                                                        {/* onReady={}  */}
                                                                                        <YouTube
                                                                                            videoId={YouTubeGetID(
                                                                                                data?.response.match(
                                                                                                    youtubeRegex,
                                                                                                )[0],
                                                                                            )}
                                                                                            opts={youtubePlayerOptions}
                                                                                        />
                                                                                    </div>
                                                                                ) : null}
                                                                                {ticket[0]?.channel === 'email' &&
                                                                                data?.user?.role === 'Customer' ? (
                                                                                    <div className="message-text-content">
                                                                                        <ReactMarkdown
                                                                                            remarkPlugins={[remarkGfm]}
                                                                                        >
                                                                                            {data?.response
                                                                                                .replace('<p>', '')
                                                                                                .replace('</p>', '')}
                                                                                        </ReactMarkdown>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div
                                                                                        className="message-text-content"
                                                                                        dangerouslySetInnerHTML={createMarkup(
                                                                                            data?.response,
                                                                                        )}
                                                                                    />
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <div className="message-footer">
                                                                        <span className="text-muted">
                                                                            {dateFormater(
                                                                                data?.createdAt || data?.created_at,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>

                                    {YesterdayMsges.length === 0 ? (
                                        ''
                                    ) : (
                                        <div className="chatDateHeader">
                                            <div className="chatDateHeaderhr1" />
                                            <div className="chatDateHeaderTitle">
                                                <span>Yesterday</span>{' '}
                                            </div>
                                            <div className="chatDateHeaderhr2" />
                                        </div>
                                    )}

                                    {YesterdayMsges.map((data) => {
                                        return (
                                            <React.Fragment key={data?.id}>
                                                {data?.response.includes('Ticket Stage has been marked') ||
                                                data?.statusAction ? (
                                                    <div className="msgAssingedToee3 my-3" id={`${data?.id}`}>
                                                        <span> {`${data?.response}`}</span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={`message ${
                                                            data?.user?.role === 'Customer' ? '' : 'message-out'
                                                        } ${data?.type === 'note' ? 'message-note' : ''}`}
                                                        id={`${data?.id}`}
                                                    >
                                                        <div className="message-container">
                                                            <div className="avatar avatar-md rounded-circle overflow-hidden acx-bg-primary d-flex justify-content-center align-items-center">
                                                                {data?.user?.avatar ? (
                                                                    <img
                                                                        className="avatar-img"
                                                                        src={data?.user.avatar}
                                                                        width="100%"
                                                                        alt=""
                                                                    />
                                                                ) : (
                                                                    <div className="">
                                                                        <p className="fs-6 mb-0 text-white">{`${data?.user?.firstname?.slice(
                                                                            0,
                                                                            1,
                                                                        )}${
                                                                            data?.user?.lastname === 'default'
                                                                                ? ''
                                                                                : data?.user?.lastname?.slice(0, 1)
                                                                        }`}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="message-inner">
                                                                <div className="message-body">
                                                                    <div className="message-content">
                                                                        <div className="message-text">
                                                                            <p className="text-dark message-title mb-1">
                                                                                {`${
                                                                                    data?.user?.firstname
                                                                                        ? capitalize(
                                                                                              data?.user?.firstname,
                                                                                          )
                                                                                        : ''
                                                                                } ${
                                                                                    data?.user?.lastname === 'default'
                                                                                        ? ''
                                                                                        : data?.user?.lastname
                                                                                }`}
                                                                            </p>
                                                                            {new RegExp(youtubeRegex).test(
                                                                                data?.response,
                                                                            ) ? (
                                                                                <div className="message-gallery mx-2  rounded-3 overflow-hidden">
                                                                                    {/* onReady={}  */}
                                                                                    <YouTube
                                                                                        videoId={YouTubeGetID(
                                                                                            data?.response.match(
                                                                                                youtubeRegex,
                                                                                            )[0],
                                                                                        )}
                                                                                        opts={youtubePlayerOptions}
                                                                                    />
                                                                                </div>
                                                                            ) : null}
                                                                            {ticket[0]?.channel === 'email' &&
                                                                            data?.user?.role === 'Customer' ? (
                                                                                <div className="message-text-content">
                                                                                    <ReactMarkdown
                                                                                        remarkPlugins={[remarkGfm]}
                                                                                    >
                                                                                        {data?.response
                                                                                            .replace('<p>', '')
                                                                                            .replace('</p>', '')}
                                                                                    </ReactMarkdown>
                                                                                </div>
                                                                            ) : (
                                                                                <div
                                                                                    className="message-text-content"
                                                                                    dangerouslySetInnerHTML={createMarkup(
                                                                                        data?.response,
                                                                                    )}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="message-footer">
                                                                    <span className="text-muted">
                                                                        {dateFormater(
                                                                            data?.createdAt || data?.created_at,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}

                                    {TodayMsges.length === 0 ? (
                                        ''
                                    ) : (
                                        <div className="chatDateHeader">
                                            <div className="chatDateHeaderhr1" />
                                            <div className="chatDateHeaderTitle">
                                                <span>Today</span>{' '}
                                            </div>
                                            <div className="chatDateHeaderhr2" />
                                        </div>
                                    )}

                                    {TodayMsges.map((data) => {
                                        return (
                                            <React.Fragment key={data?.id}>
                                                {data?.response?.includes('Ticket Stage has been marked') ||
                                                data?.statusAction ? (
                                                    <div className="msgAssingedToee3 my-3" id={`${data?.id}`}>
                                                        <span> {`${data?.response}`}</span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={`message ${
                                                            data?.user?.role === 'Customer' ? '' : 'message-out'
                                                        } ${data?.type === 'note' ? 'message-note' : ''}`}
                                                        id={`${data?.id}`}
                                                    >
                                                        <div className="message-container">
                                                            <div className="avatar avatar-md rounded-circle overflow-hidden acx-bg-primary d-flex justify-content-center align-items-center">
                                                                {data?.user?.avatar ? (
                                                                    <img
                                                                        className="avatar-img"
                                                                        src={data?.user.avatar}
                                                                        width="100%"
                                                                        alt=""
                                                                    />
                                                                ) : (
                                                                    <div className="">
                                                                        <p className="fs-6 mb-0 text-white">{`${data?.user?.firstname?.slice(
                                                                            0,
                                                                            1,
                                                                        )}${
                                                                            data?.user?.lastname === 'default'
                                                                                ? ''
                                                                                : data?.user?.lastname?.slice(0, 1)
                                                                        }`}</p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                            <div className="message-inner">
                                                                <div className="message-body">
                                                                    <div className="message-content">
                                                                        <div className="message-text">
                                                                            <p className="text-dark message-title mb-1">
                                                                                {`${
                                                                                    data?.user?.firstname
                                                                                        ? capitalize(
                                                                                              data?.user?.firstname,
                                                                                          )
                                                                                        : ''
                                                                                } ${
                                                                                    data?.user?.lastname === 'default'
                                                                                        ? ''
                                                                                        : data?.user?.lastname
                                                                                }`}
                                                                            </p>
                                                                            {new RegExp(youtubeRegex).test(
                                                                                data?.response,
                                                                            ) ? (
                                                                                <div className="message-gallery mx-2 rounded-3 overflow-hidden">
                                                                                    {/* onReady={}  */}
                                                                                    <YouTube
                                                                                        videoId={YouTubeGetID(
                                                                                            data?.response.match(
                                                                                                youtubeRegex,
                                                                                            )[0],
                                                                                        )}
                                                                                        opts={youtubePlayerOptions}
                                                                                    />
                                                                                </div>
                                                                            ) : null}
                                                                            {ticket[0]?.channel === 'email' &&
                                                                            data?.user?.role === 'Customer' ? (
                                                                                <div className="message-text-content">
                                                                                    <ReactMarkdown
                                                                                        remarkPlugins={[remarkGfm]}
                                                                                    >
                                                                                        {data?.response
                                                                                            .replace('<p>', '')
                                                                                            .replace('</p>', '')}
                                                                                    </ReactMarkdown>
                                                                                </div>
                                                                            ) : (
                                                                                <div
                                                                                    className="message-text-content"
                                                                                    dangerouslySetInnerHTML={createMarkup(
                                                                                        data?.response,
                                                                                    )}
                                                                                />
                                                                            )}
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="message-footer">
                                                                    <span className="text-muted">
                                                                        {dateFormater(
                                                                            data?.createdAt || data?.created_at,
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </React.Fragment>
                                        );
                                    })}
                                    <span id="lastMsg" />
                                </div>
                                {/* CHAT COMMENT BOX SECTION */}
                                {ticket[0].status.status === 'Closed' ? (
                                    ''
                                ) : (
                                    <div className="conversationCommentBox">
                                        <div className="single-chat-ckeditor position-relative">
                                            <div className="showBackArrowOnMobile">
                                                <img src={BackArrow} alt="" />
                                            </div>
                                            <div className="pb-1 pt-0 bg-white border border-bottom-0 acx-rounded-top-10 w-100 overflow-hidden">
                                                <Tabs
                                                    activeKey={replyType}
                                                    onSelect={(k) => setReplyType(k)}
                                                    id="replyTypeToggle"
                                                    className="mb-0 border-top-0"
                                                >
                                                    {multiIncludes(accessControlFunctions[user?.role], [
                                                        'reply_conv',
                                                    ]) && <Tab className="text-dark" eventKey="reply" title="Reply" />}
                                                    {multiIncludes(accessControlFunctions[user?.role], [
                                                        'comment_conv',
                                                    ]) && <Tab className="text-dark" eventKey="note" title="Comment" />}
                                                </Tabs>
                                            </div>
                                            <Editor
                                                disabled={ticket[0].status.status === 'Closed'}
                                                readOnly={ticket[0].status.status === 'Closed'}
                                                editorState={editorState}
                                                toolbar={{
                                                    // options: ['emoji', 'inline', 'image', 'link'],
                                                    options:
                                                        ticket[0]?.channel === 'facebook' ||
                                                        ticket[0]?.channel === 'instagram'
                                                            ? ['emoji', 'image', 'link']
                                                            : ['emoji', 'inline', 'image', 'link'],

                                                    inline: {
                                                        inDropdown: false,
                                                        className: undefined,
                                                        component: undefined,
                                                        dropdownClassName: undefined,
                                                        options: ['bold', 'italic', 'underline'],
                                                        bold: { icon: boldB, className: undefined },
                                                        italic: { icon: TextItalic, className: undefined },
                                                        underline: {
                                                            icon: TextUnderline,
                                                            className: undefined,
                                                        },
                                                    },

                                                    image: {
                                                        icon: editorImg,
                                                        className: undefined,
                                                        component: undefined,
                                                        popupClassName: undefined,
                                                        urlEnabled: true,
                                                        uploadEnabled: true,
                                                        alignmentEnabled: 'LEFT',
                                                        uploadCallback: uploadImageCallBack,
                                                        previewImage: true,
                                                        inputAccept:
                                                            'image/gif,image/jpeg,image/jpg,image/png,image/svg',
                                                        alt: { present: false, mandatory: false },
                                                        defaultSize: {
                                                            height: 'auto',
                                                            width: '300px',
                                                        },
                                                    },
                                                    emoji: {
                                                        icon: Smiley,
                                                    },
                                                    link: {
                                                        inDropdown: false,
                                                        showOpenOptionOnHover: true,
                                                        defaultTargetOption: '_blank',
                                                        options: ['link', 'unlink'],
                                                        link: { icon: LinkImg, className: undefined },
                                                        unlink: { className: undefined },
                                                    },
                                                    blockType: {
                                                        inDropdown: true,
                                                    },

                                                    list: {
                                                        inDropdown: true,
                                                    },

                                                    history: {
                                                        inDropdown: true,
                                                    },
                                                }}
                                                toolbarClassName="toolbarClassName"
                                                wrapperClassName="wrapperClassName"
                                                editorClassName="editorClassName"
                                                onEditorStateChange={(editor) => onEditorStateChange(editor)}
                                                mention={{
                                                    separator: ' ',
                                                    trigger: '@',
                                                    suggestions:
                                                        replyType === 'note'
                                                            ? Agents.map((data) => {
                                                                  return {
                                                                      text: (
                                                                          <>
                                                                              <span className="rdw-suggestion-option-avatar">
                                                                                  {InitialsFromString(
                                                                                      `${data.firstname}`,
                                                                                      `${data.lastname}`,
                                                                                  )}
                                                                              </span>
                                                                              <span>
                                                                                  {' '}
                                                                                  {` ${data.firstname}  ${data.lastname}`}
                                                                              </span>
                                                                          </>
                                                                      ),
                                                                      value: `${data.firstname}  ${data.lastname}`,
                                                                      url: `/settings/profile/${data.id}`,
                                                                  };
                                                              })
                                                            : [],
                                                }}
                                            />

                                            <div className="sendMsg">
                                                <button
                                                    type="button"
                                                    disabled={
                                                        sendingReply ? true : ticket[0].status.status === 'Closed'
                                                    }
                                                    onClick={() => replyTicket(ReplyTicket, 'attachment')}
                                                >
                                                    <SendMsgIcon /> Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {/*  */}
                            </div>
                        )}
                    </div>

                    {/* CHAT COL TWO END */}

                    {/* CHAT COL THREE */}
                    <div className="conversation-layout-col-three">
                        {firstTimeLoad ? (
                            ''
                        ) : loadSingleTicket ? (
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: '50px',
                                    width: '100%',
                                }}
                            >
                                {' '}
                                <MoonLoader color="#0d4166" loading={loadSingleTicket} size={30} />
                            </div>
                        ) : (
                            <UserProfile UserInfo={UserInfo} ticket={ticket} />
                        )}
                    </div>
                    {/* CHAT COL THREE END */}
                </div>
            </div>

            {/* Modal area starts here */}
            {/* <Modal open={openSaveTicketModal} onClose={closeSaveTicketModal} center> */}
            <Modal
                show={openSaveTicketModal}
                onHide={closeSaveTicketModal}
                centered
                scrollable
                dialogClassName="modal-mw-520"
            >
                <Modal.Body className="p-2">
                    <Form className="p-3 bg-white" onSubmit={(e) => e.preventDefault()}>
                        <h5 className="acx-text-gray-800 mb-3">Kindly update ticket before closing the chat</h5>

                        <div className="">
                            <Row md={6} className="mb-3">
                                <Form.Group as={Col} md={6} className="form-group acx-form-group mb-3">
                                    <Form.Label className="mb-0">Customer</Form.Label>
                                    <Form.Control
                                        value={`${capitalizeFirstLetter(
                                            ticket[0]?.customer?.firstname,
                                        )} ${capitalizeFirstLetter(ticket[0]?.customer?.lastname)}`}
                                        type="text"
                                        disabled
                                    />
                                </Form.Group>

                                <Col md={6} className="">
                                    <label className="mb-0">Category</label>
                                    <RSelect
                                        className="rselectfield"
                                        style={{ fontSize: '12px' }}
                                        isClearable={false}
                                        onChange={(newValue) => {
                                            setRSTicketCategory(newValue.value);
                                        }}
                                        defaultValue={{
                                            value: ticket[0]?.category?.id,
                                            label: ticket[0]?.category?.name,
                                        }}
                                        options={
                                            // populate 'options' prop from $Category, with names remapped
                                            Category.map((data) => {
                                                return { value: data.id, label: data.name };
                                            })
                                        }
                                    />
                                </Col>
                                <Col md={6}>
                                    <label htmlFor="">Stage</label>
                                    <RSelect
                                        className="rselectfield"
                                        style={{ fontSize: '12px' }}
                                        onChange={(newValue) => {
                                            setRSTicketStage((prevState) => ({
                                                ...prevState,
                                                value: newValue.value,
                                                label: newValue.label,
                                            }));
                                        }}
                                        isClearable={false}
                                        defaultValue={{
                                            value: ticket[0]?.status?.id,
                                            label: ticket[0]?.status?.status,
                                        }}
                                        options={
                                            // populate 'options' prop from $Category, with names remapped
                                            Statuses.map((data) => {
                                                return { value: data.id, label: data.status };
                                            })
                                        }
                                    />
                                </Col>

                                <Col md={6}>
                                    <label htmlFor="">Priority</label>
                                    <RSelect
                                        className="rselectfield"
                                        style={{ fontSize: '12px' }}
                                        onChange={(newValue) => {
                                            setRSTicketPriority(newValue.value);
                                        }}
                                        isClearable={false}
                                        defaultValue={{
                                            value: ticket[0]?.priority?.id,
                                            label: ticket[0]?.priority?.name,
                                        }}
                                        options={
                                            // populate 'options' prop from $Statuses, with names remapped
                                            Priority.map((data) => {
                                                return { value: data.id, label: data.name };
                                            })
                                        }
                                    />
                                </Col>
                            </Row>

                            <Form.Group className="form-group acx-form-group mb-3">
                                <Form.Label className="mb-0">Subject</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={`${ticket[0]?.subject}`}
                                    onChange={(e) => setRSTicketSubject(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="form-group acx-form-group mb-3">
                                <Form.Label className="mb-0">Remarks</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    defaultValue={ticket[0]?.plain_description}
                                    onChange={(e) => setRSTicketRemarks(e.target.value)}
                                />
                            </Form.Group>

                            <button
                                type="button"
                                style={{ outline: 'none' }}
                                className="btn mt-2 mb-0 p-0 text-start"
                                onClick={() => setIsAdditionalOptionVisible((v) => !v)}
                            >
                                Additional Options
                            </button>

                            {isAdditionalOptionVisible && (
                                <div className="additional-options">
                                    <div className="ticketmodalInput-OneCol">
                                        <div className="ticketmodalInputWrapMainOne">
                                            <label htmlFor="">Assigned To</label>
                                            <RSelect
                                                className="rselectfield"
                                                closeMenuOnSelect
                                                menuPlacement="top"
                                                onChange={(newValue) => {
                                                    setRSTicketAssignee(newValue.value);
                                                }}
                                                defaultValue={{
                                                    value: ticket[0]?.assignee?.id,
                                                    label: `${ticket[0]?.assignee?.firstname}  ${ticket[0]?.assignee?.lastname}`,
                                                }}
                                                options={
                                                    // populate 'options' prop from $Category, with names remapped
                                                    Agents.map((data) => {
                                                        return {
                                                            value: data.id,
                                                            label: `${data.firstname}  ${data.lastname}`,
                                                        };
                                                    })
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="mt-4 mb-4">
                                        <label>Tags</label>
                                        <RSelect
                                            className="rselectfield"
                                            closeMenuOnSelect={false}
                                            menuPlacement="top"
                                            onChange={(selectedOptions) => {
                                                setRSTicketTags(
                                                    selectedOptions.map((item) => {
                                                        return item.value;
                                                    }),
                                                );
                                            }}
                                            defaultValue={
                                                ticket[0]?.tags
                                                    ? ticket[0]?.tags.map((data) => {
                                                          return { value: data, label: data };
                                                      })
                                                    : null
                                            }
                                            options={
                                                // populate 'options' prop from $Tags remapped
                                                Tags?.map((data) => {
                                                    return { value: data, label: data };
                                                })
                                            }
                                            isMulti
                                        />
                                    </div>
                                    <h6 className="text-dark my-3">Custom Fields</h6>
                                    {customFieldIsSet ? (
                                        <Row className="mb-3">
                                            {customFieldsGroup.map((sections) => {
                                                return (
                                                    <Fragment key={sections.section}>
                                                        {sections.fields.map((data) => {
                                                            if (data?.field_type === 'select') {
                                                                return (
                                                                    <Col md={6} key={data.id}>
                                                                        <Form.Group className="mb-3 form-group acx-form-group">
                                                                            <Form.Label className="text-muted small mb-1">
                                                                                {data?.field_name}{' '}
                                                                                {data?.required ? (
                                                                                    <span className="text-danger">
                                                                                        *
                                                                                    </span>
                                                                                ) : (
                                                                                    ''
                                                                                )}
                                                                            </Form.Label>
                                                                            <RSelect
                                                                                name={data.id}
                                                                                className="rselectfield mb-1"
                                                                                onChange={(selectedOptions) => {
                                                                                    data?.multiple_options
                                                                                        ? setRSTicketCustomFields(
                                                                                              (prevState) => ({
                                                                                                  ...prevState,
                                                                                                  [data.id]:
                                                                                                      selectedOptions
                                                                                                          .map(
                                                                                                              (
                                                                                                                  item,
                                                                                                              ) => {
                                                                                                                  return item.value;
                                                                                                              },
                                                                                                          )
                                                                                                          .join(','),
                                                                                              }),
                                                                                          )
                                                                                        : setRSTicketCustomFields(
                                                                                              (prevState) => ({
                                                                                                  ...prevState,
                                                                                                  [data.id]:
                                                                                                      selectedOptions.value,
                                                                                              }),
                                                                                          );
                                                                                }}
                                                                                closeMenuOnSelect={
                                                                                    !data?.multiple_options
                                                                                }
                                                                                menuPlacement="top"
                                                                                required={data?.required}
                                                                                defaultValue={
                                                                                    data?.value &&
                                                                                    !data?.multiple_options
                                                                                        ? {
                                                                                              value: data?.value,
                                                                                              label: `${data?.value}`,
                                                                                          }
                                                                                        : data?.value &&
                                                                                          data?.multiple_options
                                                                                        ? data?.value
                                                                                              .split(',')
                                                                                              .map((val) => {
                                                                                                  return {
                                                                                                      value: val,
                                                                                                      label: val,
                                                                                                  };
                                                                                              })
                                                                                        : null
                                                                                }
                                                                                options={
                                                                                    data.field_options
                                                                                        ? data?.field_options
                                                                                              .replace(/{|"|}/g, '')
                                                                                              .split(',')
                                                                                              .map((options) => {
                                                                                                  return {
                                                                                                      value: options,
                                                                                                      label: options,
                                                                                                  };
                                                                                              })
                                                                                        : null
                                                                                }
                                                                                isMulti={data?.multiple_options}
                                                                            />
                                                                            {/* <span className="text-danger d-block small">{getError(data?.id)}</span> */}
                                                                        </Form.Group>
                                                                    </Col>
                                                                );
                                                            }
                                                            return (
                                                                <Col md={6} key={data.id}>
                                                                    <Form.Group className="mb-3 form-group acx-form-group">
                                                                        <Form.Label className="text-muted small mb-1">
                                                                            {data?.field_name}{' '}
                                                                            {data?.required ? (
                                                                                <span className="text-danger">*</span>
                                                                            ) : (
                                                                                ''
                                                                            )}
                                                                        </Form.Label>
                                                                        <Form.Control
                                                                            name={data?.id}
                                                                            type={data?.field_type}
                                                                            className="text-dark mb-1"
                                                                            onChange={handleCustomFieldChange}
                                                                            defaultValue={data?.value || ''}
                                                                            required={data?.required}
                                                                        />
                                                                        {/* <span className="text-danger d-block small">{getError(data?.id)}</span> */}
                                                                    </Form.Group>
                                                                </Col>
                                                            );
                                                        })}
                                                    </Fragment>
                                                );
                                            })}
                                        </Row>
                                    ) : (
                                        ''
                                    )}
                                    {/* <div className="col-12 mt-3">
                    <label htmlFor="title" className="form-label">Attachment (If Any)</label>
                    <div
                        id="ticket-ath-box"
                        className="border border-1 d-block text-center f-14 p-3 position-relative">
                        <img src={PinIcon} alt=""/>
                        <span className="text-at-blue-light">Add file</span>&nbsp;
                        <span>or drag file here</span>
                        <input type="file" 
                          className="position-absolute top-0 bottom-0 end-0 start-0 w-100 h-100" 
                          style={{ "zIndex": 1200 }}
                          // onChange={} 
                          />
                    </div>
                  </div> */}
                                </div>
                            )}
                            <div className="text-end mt-3">
                                <Button
                                    className="btn acx-btn-primary px-3 py-2"
                                    disabled={processing}
                                    type="submit"
                                    onClick={updateTicket}
                                >
                                    {processing ? (
                                        <>
                                            <Spinner as="span" size="sm" animation="border" variant="light" />{' '}
                                            Processing...
                                        </>
                                    ) : (
                                        `Update`
                                    )}
                                </Button>
                            </div>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
}

const mapStateToProps = (state) => ({
    user: state.userAuth.user,
});
export default connect(mapStateToProps)(Conversation);
