/* eslint-disable camelcase */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/no-noninteractive-element-to-interactive-role */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/no-danger */
/* eslint-disable react/no-children-prop */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
/* eslint-disable no-shadow */
// @ts-nocheck
import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { css } from '@emotion/css';
import moment from 'moment';
import { connect } from 'react-redux';
import draftToHtml from 'draftjs-to-html';
import { useParams } from 'react-router-dom';
import RSelect from 'react-select/creatable';
import { Editor } from 'react-draft-wysiwyg';
import { capitalize } from '@material-ui/core';
import MoonLoader from 'react-spinners/MoonLoader';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import remarkGfm from 'remark-gfm';
import ReactMarkdown from 'react-markdown';
import { NotificationManager } from 'react-notifications';
import YouTube from 'react-youtube';
import boldB from '../../../assets/imgF/boldB.png';
import Smiley from '../../../assets/imgF/Smiley.png';
import BackArrow from '../../../assets/imgF/back.png';
import editorImg from '../../../assets/imgF/editorImg.png';
import LinkImg from '../../../assets/imgF/insertLink.png';
import { multiIncludes, brandKit, getSubdomainOrUrl } from '../../../helper';
import UserProfile from '../conversations/userProfile';
import TicketTimeline from '../conversations/TicketTimeline';
import { dateFormater } from '../../helpers/dateFormater';
import { getCurrentTicket } from '../../../reduxstore/actions/ticketActions';
import { StarIconTicket, SendMsgIcon } from '../../../assets/images/svgs';
import '../../../styles/Ticket.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import TextItalic from '../../../assets/imgF/TextItalic.png';
import InitialsFromString from '../../helpers/InitialsFromString';
import TextUnderline from '../../../assets/imgF/TextUnderline.png';
import capitalizeFirstLetter from '../../helpers/capitalizeFirstLetter';
import { httpGetMain, httpPostMain, httpPatchMain } from '../../../helpers/httpMethods';
import { accessControlFunctions } from '../../../config/accessControlList';

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

// function CircleIcon(props) {
//     return (
//         <span className="cust-grey-circle">
//             <img src={props.icon} alt="" className="pe-none" />
//         </span>
//     );
// }

function scrollPosSendMsgList() {
    // window.location.href = '#lastMsg';
    const ticketConvoBox = window.document.querySelector('#ticketConvoBox');
    if (ticketConvoBox) {
        ticketConvoBox.scrollTop = ticketConvoBox.scrollHeight;
    }
}

function Ticket({ getCurrentTicket, isCurrentTicketLoaded, currentTicket, user, appSocket, socketMessage }) {
    const { id } = useParams();

    const [isAdditionalOptionVisible, setIsAdditionalOptionVisible] = useState(false);

    /** >>>>> FROM CODE-UI-ANDY */
    const initialState = EditorState.createWithContent(ContentState.createFromText(''));

    const [Tags, setTags] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [loadSingleTicket, setLoadSingleTicket] = useState(false);
    const [SenderInfo, setSenderInfo] = useState(false);
    const [Category, setCategory] = useState([]);
    const [Priority, setPriority] = useState([]);
    const [editorState, setEditorState] = useState(initialState);
    const [firstTimeLoad, setfirstTimeLoad] = useState(true);
    const [ReplyTicket, setReplyTicket] = useState({
        plainText: '',
        richText: '',
    });
    const [replyType, setReplyType] = useState('reply');
    const [, setMentions] = useState([]);
    //
    const [Agents, setAgents] = useState([]);
    const [Statuses, setStatuses] = useState([]);
    const [UserInfo, setUserInfo] = useState({});
    const [openSaveTicketModal, setopenSaveTicketModal] = useState(false);
    const [saveTicket, setSaveTicket] = useState({
        customer: '',
        subject: '',
        description: [],
        category: '',
    });
    const [sendingReply, setsendingReply] = useState(false);
    const [msgHistory, setMsgHistory] = useState([]);
    const [, setNoResponseFound] = useState(true);
    const [TodayMsges, setTodayMsges] = useState([]);
    const [YesterdayMsges, setYesterdayMsges] = useState([]);
    const [AchiveMsges, setAchiveMsges] = useState([]);
    // UPDATE MODAL FORM VALUES
    const [processing, setProcessing] = useState(false);
    const [RSTicketTags, setRSTicketTags] = useState([]);
    const [RSTicketCategory, setRSTicketCategory] = useState('');
    const [RSTicketSubject, setRSTicketSubject] = useState('');
    const [RSTicketStage, setRSTicketStage] = useState({});
    const [RSTicketPriority, setRSTicketPriority] = useState('');
    const [RSTicketRemarks, setRSTicketRemarks] = useState('');
    const [RSTicketAssignee, setRSTicketAssignee] = useState([]);
    const [RSTicketCustomFields, setRSTicketCustomFields] = useState(null);
    // ticket custom fields
    const [customFieldConfig, setCustomFieldConfig] = useState([]);
    const [customFieldsGroup, setCustomFieldsGroup] = useState([]);
    const [customFieldIsSet, setCustomFieldIsSet] = useState(false);
    const [editorUploadImg, setEditorUploadImg] = useState('');
    const [attachments, setAttachments] = useState([]);
    const [statusUpdateFailed, setStatusUpdateFailed] = useState(false);
    const [statusOps, setStatusOps] = useState(false);

    useEffect(() => {
        if (socketMessage) {
            const eventData = socketMessage;
            // console.log('Message from socket => ', eventData);
            if (
                (eventData?.type === 'liveStream' || eventData?.type === 'socketHook') &&
                eventData?.status === 'incoming'
            ) {
                const data = eventData?.data;
                if (currentTicket?.id && data?.id === currentTicket?.id) {
                    const reply = {
                        ...data?.reply,
                    };
                    // set message history only when the
                    setMsgHistory((prev) => {
                        return [...prev, reply];
                    });
                    scrollPosSendMsgList();
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTicket?.id, socketMessage]);

    useEffect(() => {
        // get current ticket when component mounts
        getCurrentTicket(id);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    useEffect(() => {
        if (currentTicket) {
            setSenderInfo(currentTicket);
            setTimeout(() => {
                scrollPosSendMsgList();
            }, 1000);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTicket]);

    // youtube player options
    const youtubePlayerOptions = {
        height: '180',
        width: '320',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    useEffect(() => {
        setCustomFieldIsSet(false);
        setRSTicketCustomFields(null);
        const ticket_custom_fields = ticket?.custom_fields || {};
        const merged_custom_user_fields = customFieldConfig.map((element) => {
            if (ticket_custom_fields.hasOwnProperty(element.id)) {
                setRSTicketCustomFields((prevState) => ({
                    ...prevState,
                    [element.id]: ticket_custom_fields[element.id],
                }));
                return {
                    ...element,
                    value: ticket_custom_fields[element.id],
                };
            }
            return {
                ...element,
                value: '',
            };
        });
        const groupedCustomFields = Object.entries(
            //
            merged_custom_user_fields.reduce(
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ticket]);

    const sortMsges = (msgs) => {
        // const Today = [];
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

    const onEditorStateChange = (editorState) => {
        // handleDescriptionValidation(editorState);

        const plainText = editorState.getCurrentContent().getPlainText();
        const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
        setEditorState(editorState);
        setReplyTicket({ plainText, richText });
    };

    const replyTicket = async (reply, attachment, type = replyType) => {
        let agentMentions = [];
        if (replyType === 'note') {
            // reply.richText
            // eslint-disable-next-line func-names
            agentMentions = Agents.reduce(function (result, object) {
                if (reply.richText.includes(object?.id)) {
                    result.push(object.id);
                }
                return result;
            }, []);

            setMentions(() => [...agentMentions]);
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
            phoneNumber: currentTicket.customer.phone_number,
            // attachment: "",
            mentions: agentMentions,
            attachments: actualAttachments,
        };

        const replyData = {
            attachment: null,
            created_at: new Date(),
            plain_response: plainTextContent,
            response: reply.richText,
            type,
            user,
            mentions: agentMentions,
            attachments: actualAttachments,
        };
        setMsgHistory((item) => [...item, replyData]);
        scrollPosSendMsgList();
        const currentTicketCopy = JSON.parse(JSON.stringify(currentTicket));
        // remove history property from object before sending via socket
        Reflect.deleteProperty(currentTicketCopy, 'history');
        const msgObj = {
            msgreciever: {
                msgrecieverid: currentTicket?.customer?.id,
            },
            data: {
                ...currentTicketCopy,
                reply: replyData,
            },
        };
        appSocket.sendLiveStreamMessage(msgObj);
        const res = await httpPostMain(`tickets/${currentTicket?.id}/replies`, data);
        if (res?.status === 'success') {
            setEditorState(initialState);
            setEditorUploadImg('');
            setAttachments([]);
            setReplyTicket({ plainText: '', richText: '' });
            scrollPosSendMsgList();
        } else {
            // setLoadingTicks(false);
            setsendingReply(false);
            NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
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

    // const onReplyTypeChange = (event) => {
    //     setReplyType(event.target.value);
    // };

    // get custom field config
    const getCustomFieldConfig = async () => {
        const res = await httpGetMain(`custom-field?belongsTo=ticket`);
        if (res.status === 'success') {
            setCustomFieldConfig(res?.data);
        }
    };

    // const ReloadloadSingleMessage = async () => {
    //     setLoadSingleTicket(true);

    // // MessageSenderId here should be the current ticket id
    //     const res = await httpGetMain(`tickets/${MessageSenderId}`);
    //     if (res.status === 'success') {
    //         setTicket(res?.data);
    //         setLoadSingleTicket(false);
    //     } else {
    //         setLoadSingleTicket(false);
    //         return NotificationManager.error(res.er.message, 'Error', 4000);
    //     }
    // };

    const getStatuses = async () => {
        const res = await httpGetMain(`statuses`);
        if (res.status === 'success') {
            // getTickets();
            setStatuses(res?.data?.statuses);
        }
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
        } else {
            NotificationManager.error(res.er.message, 'Error', 4000);
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
            setAgents(res?.data);
        } else {
            NotificationManager.error(res.er.message, 'Error', 4000);
        }
    };

    //
    const handleCustomFieldChange = (e) => {
        const { name, value } = e.target;
        setRSTicketCustomFields((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const updateTicketStatus = async () => {
        if (RSTicketStage.label === 'Closed') {
            let subdomain;
            if (getSubdomainOrUrl() === 'app' || getSubdomainOrUrl() === 'dev') {
                subdomain = window.localStorage.getItem('domain');
            }
            // get url and replace domain
            const base_url = window.location.origin;
            const complete_url = `${base_url}/feedback/${ticket.id}/${ticket.customer.id}${
                subdomain ? `?domain=${subdomain}` : ''
            }`;
            const rich_text = `<p>Your ticket has been marked as closed, Please click on the link to rate this conversation : <a target='_blank' href='${complete_url}'>Click here to rate us</a></p>`;
            const ReplyTicket = {
                richText: rich_text,
                plainText: `Your ticket has been marked as closed, Please click on the link to rate this conversation ${complete_url}`,
            };
            replyTicket(ReplyTicket, 'attachment', 'reply');
        }
        const statusRes = await httpPatchMain(`tickets-status/${ticket.id}`, { statusId: RSTicketStage.value });
        if (statusRes.status === 'success') {
            const replyData = {
                type: 'reply',
                status_action: true,
                attachment: null,
                created_at: new Date(),
                plain_response: `Ticket Stage has been marked as ${RSTicketStage.label}`,
                response: `Ticket Stage has been marked as ${RSTicketStage.label}`,
                user: ticket?.assignee,
            };
            setMsgHistory((item) => [...item, replyData]);
            return NotificationManager.success('Conversation status successfully updated', 'Success');
        }
        setStatusOps(true);
        return NotificationManager.error(statusRes.er.message, 'Error', 4000);
    };

    const closeSaveTicketModal = () => {
        setopenSaveTicketModal(!openSaveTicketModal);
        setSaveTicket({
            customer: '',
            subject: '',
            description: [],
            category: '',
        });
        setRSTicketPriority(ticket.priority.id);
        setRSTicketCategory(ticket.category.id);
        setRSTicketSubject(ticket.subject);
        setRSTicketRemarks(ticket.description);
        setRSTicketTags(ticket.tags);
        setRSTicketAssignee(ticket.assignee?.id);
    };
    function createMarkup(data) {
        return { __html: data };
    }
    const checkRes = () => {
        ticket?.forEach((data) => {
            if (data.history.length === 0) {
                setNoResponseFound(true);
            } else {
                setNoResponseFound(false);
            }
        });
    };

    const getUser = async (id) => {
        const res = await httpGetMain(`users/${id}`);
        setfirstTimeLoad(false);
        if (res.status === 'success') {
            setUserInfo(res.data);
        } else {
            setLoadSingleTicket(false);
            NotificationManager.error(res.er.message, 'Error', 4000);
        }
    };

    useEffect(() => {
        if (!multiIncludes(accessControlFunctions[user?.role], ['reply_conv'])) {
            setReplyType('note');
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        sortMsges(msgHistory);
    }, [msgHistory]);

    useEffect(() => {
        scrollPosSendMsgList();
    }, [TodayMsges, YesterdayMsges, AchiveMsges]);

    useEffect(() => {
        getStatuses();
        getCategories();
        getPriorities();
        getTags();
        getAgents();
        getCustomFieldConfig();
    }, []);

    // if status update fails don't proceed with ticket update
    useEffect(() => {
        if (statusOps) {
            setStatusUpdateFailed(true);
        }
    }, [statusOps]);

    const loadSingleMessage = async (currentTicket) => {
        const { customer, subject, history } = currentTicket;
        setAchiveMsges([]);
        getUser(customer?.id);
        setSenderInfo({ customer, subject });
        setfirstTimeLoad(false);
        setTicket(currentTicket);
        setMsgHistory(history);
        setSaveTicket({
            ...saveTicket,
            customer: '',
            subject,
            description: history,
        });
        checkRes();
    };

    const updateTicket = async (status) => {
        setProcessing(true);
        if (status === '') {
            return;
        }

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

        // if status update fails don't proceed with ticket update
        if (!statusUpdateFailed) {
            const res = await httpPatchMain(`tickets/${ticket.id}`, data);
            if (res.status === 'success') {
                setProcessing(false);
                closeSaveTicketModal();
                NotificationManager.success('Ticket successfully updated', 'Success');
                getCurrentTicket(id);
                // const ticketRes = await httpGetMain(`tickets/${ticket.id}`);
                // if (ticketRes.status === 'success') {
                //     setTicket(ticketRes?.data);
                // } else {
                //     setLoadSingleTicket(false);
                //     NotificationManager.info('please refresh your page to see changes');
                // }
            } else {
                setProcessing(false);
                NotificationManager.error(res.er.message, 'Error', 4000);
            }
        }
    };

    const _uploadImageCallBack = (file) => {
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
                    setEditorUploadImg(`${ReplyTicket.plainText + editorUploadImg}${res?.data?.url}`);
                    setAttachments((prev) => [...prev, res.data?.url]);
                    resolve({ data: { link: res.data?.url } });
                })
                .catch(() => {
                    NotificationManager.error('Photo could not be uploaded', 'Error');
                });
        });
    };

    useEffect(() => {
        if (isCurrentTicketLoaded && currentTicket) {
            loadSingleMessage(currentTicket);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCurrentTicketLoaded, currentTicket]);

    return (
        <>
            {!isCurrentTicketLoaded ? (
                <div className="cust-table-loader">
                    <MoonLoader loading color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                </div>
            ) : !currentTicket ? (
                <div>No Conversation Found.</div>
            ) : (
                <div
                    id="ticketDetailsWrapper"
                    style={{ gridTemplateColumns: '280px 1fr 280px', border: '1px solid #f1f1f1' }}
                    className="d-grid mb-0"
                >
                    <div className="pt-2" style={{ backgroundColor: '#fafafa', borderRight: '1px solid #f1f1f1' }}>
                        <UserProfile
                            UserInfo={UserInfo}
                            ticket={currentTicket}
                            isTicketDetails
                            timeLine={false}
                            showAttachment={false}
                        />
                    </div>
                    <div
                        id="ticketDetailsRightPane"
                        style={{ overflowX: 'hidden' }}
                        className="bg-secondary pt-0 bg-white"
                    >
                        {/* Conversation Part */}

                        {/* CHAT COL TWO */}
                        {firstTimeLoad ? (
                            <div className="cust-table-loader">
                                <MoonLoader loading color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                            </div>
                        ) : loadSingleTicket ? (
                            <div className="d-flex justify-content-center align-items-center mt-5 w-100">
                                {' '}
                                <MoonLoader
                                    color={brandKit({ bgCol: 0 })?.backgroundColor}
                                    loading={loadSingleTicket}
                                    size={30}
                                />
                            </div>
                        ) : (
                            <div className="conversation-layout-col-two-chatCol">
                                {' '}
                                {/* CHAT HEADER BOX SECTION */}
                                {/* {noResponseFound ? (
                  <p
                    style={{
                      textAlign: "center",
                      paddingTop: "30px",
                      paddingBottom: "30px",
                      marginBottom: "auto",
                      marginTop: "auto",
                    }}
                  >
                    {" "}
                    <NoChatFound value="No response found" />
                  </p>
                ) : ( */}
                                <div className="conversationHeaderV2">
                                    <div className="conversationHeaderMainV2">
                                        <div className="custormChatHeaderInfo">
                                            <div className="custormChatHeaderInfoData pt-3">
                                                <h1>{ticket?.subject}</h1>
                                                <p>
                                                    {`${capitalize(SenderInfo?.customer?.firstname || '')} ${capitalize(
                                                        SenderInfo?.customer?.lastname === 'default'
                                                            ? ''
                                                            : SenderInfo?.customer?.lastname || '',
                                                    )} 
                                ${capitalize(SenderInfo?.customer?.email || '')}`}
                                                    <span className="custormChatHeaderDot" />{' '}
                                                    <span>{dateFormater(ticket?.updated_at)}</span>
                                                </p>
                                            </div>
                                            {multiIncludes(accessControlFunctions[user?.role], ['edit_ticket']) && (
                                                <button
                                                    type="button"
                                                    className={`custormChatHeaderInfoAction btn btn-sm ${css({
                                                        ...brandKit({ bgCol: 0 }),
                                                        color: 'white',
                                                        '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                                    })}`}
                                                    onClick={closeSaveTicketModal}
                                                >
                                                    <StarIconTicket /> Update
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                {/* CHAT SECTION */}
                                <div id="ticketConvoBox" className="conversationsMain">
                                    <div className="chatDateHeader">
                                        <div className="chatDateHeaderhr1" />
                                        <div className="chatDateHeaderTitle">
                                            <span>
                                                {moment(ticket.created_at).format('DD/MM/YYYY') ===
                                                moment(new Date()).format('DD/MM/YYYY')
                                                    ? 'Today'
                                                    : moment(ticket.created_at).format('DD/MM/YYYY') ===
                                                      moment().add(-1, 'days').format('DD/MM/YYYY')
                                                    ? 'Yesterday'
                                                    : moment(ticket.created_at).fromNow()}
                                            </span>{' '}
                                        </div>
                                        <div className="chatDateHeaderhr2" />
                                    </div>
                                    <div className="msgAssingedToee3">
                                        This message is assigned to{' '}
                                        <span>
                                            {' '}
                                            {`${capitalize(ticket?.assignee?.firstname || '')} ${capitalize(
                                                ticket?.assignee?.lastname || '',
                                            )}`}
                                        </span>
                                    </div>

                                    <div
                                        className="msgAssingedToee3"
                                        style={{ paddingTop: '8px', marginBottom: '-6px' }}
                                    >
                                        <span>
                                            {' '}
                                            {`${capitalize(ticket?.assignee?.firstname || '')} ${capitalize(
                                                ticket?.assignee?.lastname || '',
                                            )}`}
                                        </span>{' '}
                                        picked up this chat
                                    </div>

                                    <div className="msgAssingedToee3">
                                        Conversation Status has been marked as <span> {ticket?.status?.status}</span>
                                    </div>

                                    <div className="">
                                        {AchiveMsges.map((data) => {
                                            return (
                                                <Fragment key={data.id}>
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
                                                                                {ticket?.channel === 'email' &&
                                                                                data?.user?.role === 'Customer' ? (
                                                                                    <div className="message-text-content">
                                                                                        <ReactMarkdown
                                                                                            children={data?.response
                                                                                                .replace('<p>', '')
                                                                                                .replace('</p>', '')}
                                                                                            remarkPlugins={[remarkGfm]}
                                                                                        />
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
                                                                            {dateFormater(data.created_at)}
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Fragment>
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
                                            <Fragment key={data.id}>
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
                                                                            {ticket?.channel === 'email' &&
                                                                            data?.user?.role === 'Customer' ? (
                                                                                <div className="message-text-content">
                                                                                    <ReactMarkdown
                                                                                        children={data?.response
                                                                                            .replace('<p>', '')
                                                                                            .replace('</p>', '')}
                                                                                        remarkPlugins={[remarkGfm]}
                                                                                    />
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
                                                                        {dateFormater(data.created_at)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Fragment>
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
                                            <Fragment key={data.id}>
                                                {data?.response.includes('Conversation Stage has been marked') ||
                                                data?.statusAction ? (
                                                    <div className="msgAssingedToee3 my-3" id={`${data?.id}`}>
                                                        <span> {`${data?.response}`}</span>
                                                    </div>
                                                ) : (
                                                    <div
                                                        className={`message ${
                                                            data?.user?.role === 'Customer' ? '' : 'message-out'
                                                        } ${data?.type === 'note' ? 'message-note' : ''}`}
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
                                                                            {ticket?.channel === 'email' &&
                                                                            data?.user?.role === 'Customer' ? (
                                                                                <div className="message-text-content">
                                                                                    <ReactMarkdown
                                                                                        children={data?.response
                                                                                            .replace('<p>', '')
                                                                                            .replace('</p>', '')}
                                                                                        remarkPlugins={[remarkGfm]}
                                                                                    />
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
                                                                        {dateFormater(data.created_at)}
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </Fragment>
                                        );
                                    })}
                                    {/* <div id="lastMsg" /> */}
                                </div>
                                {/* CHAT COMMENT BOX SECTION */}
                                {ticket?.status?.status === 'Closed' ? (
                                    ''
                                ) : (
                                    <div id="ticketConvoEditorBox" className="conversationCommentBox">
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
                                                disabled={ticket?.status?.status === 'Closed'}
                                                readOnly={ticket?.status?.status === 'Closed'}
                                                editorState={editorState}
                                                toolbar={{
                                                    options:
                                                        currentTicket?.channel === 'facebook' ||
                                                        currentTicket?.channel === 'instagram'
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
                                                        alignmentEnabled: true,
                                                        uploadCallback: _uploadImageCallBack,
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
                                                    blockType: {
                                                        inDropdown: true,
                                                    },
                                                    link: {
                                                        inDropdown: false,
                                                        showOpenOptionOnHover: true,
                                                        defaultTargetOption: '_blank',
                                                        options: ['link', 'unlink'],
                                                        link: { icon: LinkImg, className: undefined },
                                                        unlink: { className: undefined },
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
                                                    className={`btn btn-sm ${css({
                                                        ...brandKit({ bgCol: 0 }),
                                                        color: 'white',
                                                        '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                                    })}`}
                                                    disabled={sendingReply ? true : ticket?.status?.status === 'Closed'}
                                                    onClick={() => replyTicket(ReplyTicket, 'attachment')}
                                                >
                                                    <SendMsgIcon /> Send
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                        {/* <div className={`conversation-layout-col-two h-100`}>
              conversationo layout two
              </div> */}
                        {/* CHAT COL TWO END */}
                    </div>
                    {/* THIRD COLUMN */}
                    <div>
                        <TicketTimeline UserInfo={UserInfo} ticket={[currentTicket]} isTicketDetails timeLine />
                    </div>{' '}
                    {/* END OF THIRD COLUMN */}
                </div>
            )}
            <Modal
                show={openSaveTicketModal}
                onHide={closeSaveTicketModal}
                centered
                scrollable
                dialogClassName="modal-mw-520"
            >
                <Modal.Body className="p-2">
                    <Form className="bg-white p-3" onSubmit={(e) => e.preventDefault()}>
                        <p className="fs-5">Kindly update ticket before closing the chat</p>
                        <div className="">
                            <Row md={6} className="mb-3">
                                <Form.Group as={Col} md={6} className="form-group acx-form-group mb-3">
                                    <Form.Label className="mb-0">Customer</Form.Label>
                                    <Form.Control
                                        value={`${capitalizeFirstLetter(
                                            ticket?.customer?.firstname,
                                        )} ${capitalizeFirstLetter(ticket?.customer?.lastname)}`}
                                        type="text"
                                        disabled
                                    />
                                </Form.Group>

                                {/* 
                  Andy's setters
                  setCategoryUpdate,
                  updateTicket              
                  */}

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
                                            value: ticket?.category?.id,
                                            label: ticket?.category?.name,
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
                                            value: ticket?.status?.id,
                                            label: ticket?.status?.status,
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
                                            value: ticket?.priority?.id,
                                            label: ticket?.priority?.name,
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
                                    defaultValue={`${ticket?.subject}`}
                                    onChange={(e) => setRSTicketSubject(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="form-group acx-form-group mb-3">
                                <Form.Label className="mb-0">Remarks</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    rows={5}
                                    defaultValue={ticket?.plain_description}
                                    onChange={(e) => setRSTicketRemarks(e.target.value)}
                                />
                            </Form.Group>

                            <p
                                className="btn mt-2 mb-0 p-0 text-start"
                                role="button"
                                onClick={() => setIsAdditionalOptionVisible((v) => !v)}
                            >
                                Additional Options
                            </p>

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
                                                    value: ticket?.assignee?.id,
                                                    label: `${ticket?.assignee?.firstname || ''}  ${
                                                        ticket?.assignee?.lastname || ''
                                                    }`,
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
                                    <div className="mt-4 mb-3">
                                        <label htmlFor="">Tags</label>
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
                                                ticket?.tags
                                                    ? ticket?.tags.map((data) => {
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
                                                                                              .map((data) => {
                                                                                                  return {
                                                                                                      value: data,
                                                                                                      label: data,
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
                                    className={`btn px-4 ${css({
                                        ...brandKit({ bgCol: 0 }),
                                        color: 'white',
                                        '&:hover, &:disabled, &:focus': { ...brandKit({ bgCol: 30 }) },
                                    })}`}
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
    tickets: state.ticket.tickets,
    isCurrentTicketLoaded: state.ticket.isCurrentTicketLoaded,
    currentTicket: state.ticket.currentTicket,
    user: state.userAuth.user,
    appSocket: state.socket.appSocket,
    socketMessage: state.socket?.socketMessage,
});

export default connect(mapStateToProps, { getCurrentTicket })(Ticket);
