import {useState, Fragment, useEffect, useContext} from 'react';
// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// 
import TicketIcon from '../../../assets/svgicons/Ticket.svg';
import WorkIcon from '../../../assets/svgicons/Work.svg';
import ProfileLightIcon from '../../../assets/svgicons/Profile-Light.svg';
import FolderIcon from '../../../assets/icons/Folder.svg';
import PinIcon from '../../../assets/icons/pin.svg';
import '../../../styles/Ticket.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getCurrentTicket} from '../../../reduxstore/actions/ticketActions';
import {getUserInitials} from '../../../helper';
import UserProfile from '../conersations/userProfile';
import { dateFormater } from "../../helpers/dateFormater";
import {
  StarIconTicket,
  SendMsgIcon,
  ExpandChat,
} from "../../../assets/images/svgs";
import moment from 'moment';
import { capitalize } from '@material-ui/core';
import ClipLoader from "react-spinners/ClipLoader";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import BackArrow from "../../../assets/imgF/back.png";
import editorImg from "../../../assets/imgF/editorImg.png";
import Smiley from "../../../assets/imgF/Smiley.png";
import boldB from "../../../assets/imgF/boldB.png";
import TextItalic from "../../../assets/imgF/TextItalic.png";
import TextUnderline from "../../../assets/imgF/TextUnderline.png";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import { SocketDataContext } from "../../../context/socket";
import { NotificationManager } from 'react-notifications';
import {
  httpGetMain,
  httpPostMain,
  httpPatchMain,
} from "../../../helpers/httpMethods";
import NoChatFound from "../conersations/noChatFound";
import { CURRENT_CUSTOMER_TICKETS_LOADING } from '../../../reduxstore/types';
import RSelect from 'react-select/creatable';
import { Modal } from "react-responsive-modal";

const CircleIcon = (props) => <span className="cust-grey-circle"><img src={props.icon} alt="" className="pe-none"/></span>;


const Ticket = ({isTicketLoaded, getCurrentTicket, isCurrentTicketLoaded, currentTicket, user}) => {
  
  const {id} = useParams();
  
  const [isAdditionalOptionVisible, setIsAdditionalOptionVisible] = useState(false)

    useEffect(() => {
        // get current ticket when component mounts
        getCurrentTicket(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useEffect(() => {
      if (currentTicket) {
        const {customer, subject} = currentTicket;
        setSenderInfo(currentTicket);
      }

    }, [currentTicket]);

    // console.log("current ticket from tick", currentTicket);



    /** >>>>> FROM CODE-UI-ANDY */
    const initialState = EditorState.createWithContent(
      ContentState.createFromText("")
    );
    const [userMsg, setUsermsg] = useState([
      {
        img: "",
        fullName: "",
        msg: "",
        date: "",
        msgCount: "",
        badge1: "",
      },
    ]);
  
    const {
      AppSocket,
      setWsTicketFilter,
      wsTicketFilter,
      // setMsgHistory,
      // msgHistory,
    } = useContext(SocketDataContext);
    const [Tags, setTags] = useState([]);
    const [loadSelectedMsg, setloadSelectedMsg] = useState("");
    const [tickets, setTickets] = useState([]);
    const [filterTicketsState, setFilterTicketsState] = useState([]);
    const [ticket, setTicket] = useState([]);
    const [LoadingTick, setLoadingTicks] = useState(true);
    const [loadSingleTicket, setLoadSingleTicket] = useState(false);
    const [SenderInfo, setSenderInfo] = useState(false);
    const [singleTicketFullInfo, setTingleTicketFullInfo] = useState(false);
    const [Category, setCategory] = useState([]);
    const [Priority, setPriority] = useState([]);
    const [editorState, setEditorState] = useState(initialState);
    const [firstTimeLoad, setfirstTimeLoad] = useState(true);
    const [MessageSenderId, setMessageSenderId] = useState("");
    const [TicketId, setTicketId] = useState("");
    const [showUserProfile, setshowUserProfile] = useState(false);
    // 
    const [ReplyTicket, setReplyTicket] = useState({
      plainText: "",
      richText: "",
    });
    const [replyType, setReplyType] = useState("reply");
    // 
    const [Agents, setAgents] = useState([]);
    const [Statuses, setStatuses] = useState([]);
    const [UserInfo, setUserInfo] = useState({});
    const [ChatCol, setChatCol] = useState({
      col1: "",
      col2: "",
    });
    const [openSaveTicketModal, setopenSaveTicketModal] = useState(false);
    const [filterChat, setFilterChat] = useState("system");
    const [saveTicket, setSaveTicket] = useState({
      customer: "",
      subject: "",
      description: [],
      category: "",
    });
    const [sendingReply, setsendingReply] = useState(false);
    const [msgHistory, setMsgHistory] = useState([]);
    const [wsTickets, setwsTickets] = useState([]);
    const [categoryUpdate, setCategoryUpdate] = useState("");
    const [noResponseFound, setNoResponseFound] = useState(true);
    const [TodayMsges, setTodayMsges] = useState([]);
    const [YesterdayMsges, setYesterdayMsges] = useState([]);
    const [AchiveMsges, setAchiveMsges] = useState([]);
    const [ShowAchive, setShowAchive] = useState(false);
    const [Channel, setChannel] = useState("All");
    const [Status, setStatus] = useState("All");
    // UPDATE MODAL FORM VALUES
    const [processing, setProcessing] = useState(false);
    const [RSCustomerTags, setRSCustomerTags] = useState([]);
    const [RSTicketTags, setRSTicketTags] = useState([]);
    const [RSTicketCategory, setRSTicketCategory] = useState("");
    const [RSTicketSubject, setRSTicketSubject] = useState("");
    const [RSTicketStage, setRSTicketStage] = useState("");
    const [RSTicketPriority, setRSTicketPriority] = useState("");
    const [RSTicketRemarks, setRSTicketRemarks] = useState("");
    const [RSTicketAssignee, setRSTicketAssignee] = useState([]);
    const [RSCustomerName, setRSCustomerName] = useState("")
    useEffect(() => {
      // getTickets();
      sortMsges(msgHistory);
    }, [msgHistory]);
  
    useEffect(() => {
      getStatuses();
      getCategories();
      getPriorities();
      getTags();
      getAgents();
    }, []);
    useEffect(() => {
      AppSocket.createConnection();
      AppSocket.io.on(`ws_tickets`, (data) => {
        setwsTickets(data?.data?.tickets);
      });
      AppSocket.io.on(`message`, (data) => {
        if(data.id == id){
          let msg = {
            created_at: data.created_at,
            id: data?.history?.id || data?.id,
            plain_response: data?.history?.plain_response || data?.plain_response,
            response: data?.history?.response || data?.response,
            type: "reply",
            user: data.user,
          };
          setMsgHistory((item) => [...item, msg]);
        }
      });
      return () => {
        AppSocket.io.disconnect();
      };
    }, []);
  
    const sortMsges = (msgs) => {
      let Today = [];
  
      let resultToday = msgs.filter((observation) => {
        return (
          moment(observation.created_at).format("DD/MM/YYYY") ==
          moment(new Date()).format("DD/MM/YYYY")
        );
      });
      let resultYesterday = msgs.filter((observation) => {
        return (
          moment(observation.created_at).format("DD/MM/YYYY") ==
          moment().add(-1, "days").format("DD/MM/YYYY")
        );
      });
  
      let resultAchive = msgs.filter((observation) => {
        return (
          moment(observation.created_at).format("DD/MM/YYYY") !=
            moment().add(-1, "days").format("DD/MM/YYYY") &&
          moment(observation.created_at).format("DD/MM/YYYY") !=
            moment(new Date()).format("DD/MM/YYYY")
        );
      });
      setTodayMsges(resultToday);
      setYesterdayMsges(resultYesterday);
      setAchiveMsges(resultAchive);
    };
    useEffect(() => {
      setLoadingTicks(true);
      setTickets(wsTickets);
      setLoadingTicks(false);
    }, [wsTickets]);
  
    const onEditorStateChange = (editorState) => {
      // handleDescriptionValidation(editorState);
  
      const plainText = editorState.getCurrentContent().getPlainText();
      const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
      setEditorState(editorState);
      setReplyTicket({ plainText, richText });
    };
    const getTickets = async () => {
      const res = await httpGetMain("tickets?channel=whatsapp");
      if (res?.status == "success") {
        setLoadingTicks(true);
        setTickets(res?.data?.tickets);
        setLoadingTicks(false);
      } else {
        setLoadingTicks(false);
        return NotificationManager.error(res?.er?.message, "Error", 4000);
      }
    };
  
    const filterTicket = (value, type) => {
      if (type === "channel") {
        setChannel(value);
        AppSocket.createConnection();
        let data = { channel: value == "All" ? "" : value, per_page: 100 };
        AppSocket.io.emit(`ws_tickets`, data);
      }
  
      if (type === "status") {
        setStatus(value);
        AppSocket.createConnection();
        let data = { status: value === "All" ? "" : value, per_page: 100 };
        AppSocket.io.emit(`ws_tickets`, data);
      }
    };
  
    const scrollPosSendMsgList = () => {
      let element = document.getElementById("lastMsg");
      element.scrollIntoView({behavior: 'smooth'});
    }
    const replyTicket = async (reply, attachment) => {
      
      const data = {
        type: replyType,
        response: reply.richText,
        plainResponse: reply.plainText,
        phoneNumber: currentTicket.customer.phone_number,
        // attachment: "",
      }; 

      const replyData = {
        attachment: null,
        created_at: new Date(),
        plain_response: reply.plainText,
        response: reply.richText,
        // user: SenderInfo?.customer,
        user: user,
      };
      setMsgHistory((item) => [...item, replyData]);
      const res = await httpPostMain(
        `tickets/${currentTicket.id}/replies`,
        data
      );
      if (res?.status === "success") {
        setEditorState(initialState);
        setReplyTicket({ plainText: "", richText: "" });
        // emit ws_tickets event on reply
        AppSocket.createConnection();
        let channelData = { channel: filterTicketsState === "" ? "ALL" : filterTicketsState, per_page: 100 };
        AppSocket.io.emit(`ws_tickets`, channelData);
        scrollPosSendMsgList();
      } else {
        // setLoadingTicks(false);
        setsendingReply(false);
        return NotificationManager.error(res?.er?.message, "Error", 4000);
      }
    };
  
    const onReplyTypeChange = (event) => {
      setReplyType(event.target.value);
    }
    // 

    const ReloadloadSingleMessage = async () => {
      setLoadSingleTicket(true);
  
      const res = await httpGetMain(`tickets/${MessageSenderId}`);
      if (res.status == "success") {
        setTicket(res?.data);
        setLoadSingleTicket(false);
      } else {
        setLoadSingleTicket(false);
        return NotificationManager.error(res.er.message, "Error", 4000);
      }
    };
  
    const getStatuses = async () => {
      const res = await httpGetMain(`statuses`);
      if (res.status == "success") {
        // getTickets();
        setStatuses(res?.data?.statuses);
      } else {
        return;
      }
    };
  
    const getCategories = async () => {
      const res = await httpGetMain(`categories`);
      if (res.status == "success") {
        setCategory(res?.data?.categories);
      } else {
        return;
      }
    };
    const getPriorities = async () => {
      const res = await httpGetMain(`priorities`);
      if (res.status === "success") {
        setPriority(res?.data?.priorities);
      } else {
        return NotificationManager.error(res.er.message, "Error", 4000);
      }
    };
    const getTags = async () => {
      const res = await httpGetMain(`tags`);
      if (res.status === "success") {
        setTags(res?.data?.tags_names.tags);
      } else {
        return;
      }
    };

    const getAgents = async () => {
      const res = await httpGetMain(`agents`);
      if (res.status === "success") {
        setAgents(res?.data);
      } else {
        return NotificationManager.error(res.er.message, "Error", 4000);
      }
    };
  
    const updateTicketStatus = async () => {
      if(RSTicketStage.label === "Closed"){
      let base_url = window.location.origin;
      let complete_url = `${base_url}/feedback/${localStorage.domain}/${ticket[0].id}/${ticket[0].customer.id}`;
      let rich_text = `Your ticket has been marked as closed, Please click on the link to rate this conversation ${complete_url}`;
      let rich_text_encode = rich_text;
      let ReplyTicket = {
          richText : rich_text_encode,
          plainText : "Your ticket has been marked as closed, Please click on the link to rate this conversation"
        }
        replyTicket(ReplyTicket, "attachment")
      }
      const statusRes = await httpPatchMain(`tickets-status/${ticket[0].id}`, {"statusId": RSTicketStage.value});
      if (statusRes.status === "success") {
        return NotificationManager.success("Ticket status successfully updated", "Success");
      } else{
        return NotificationManager.error(statusRes.er.message, "Error", 4000);
      }
    };
  
    const loadSingleMessage = async ({ id, customer, assignee, subject }) => {
      setShowAchive(false);
      setAchiveMsges([]);
      getUser(customer?.id);
      setChatCol({ col1: "hideColOne", col2: "showColTwo" });
      setSenderInfo({ customer, subject });
      setMessageSenderId(id);
      setLoadSingleTicket(true);
      setTingleTicketFullInfo();
      setTicket([]);
      let swData = { assigneeId: assignee?.id  || '', userId: customer?.id  || '' };
      UserInfo.id && AppSocket.io.leave(`${UserInfo.id}${assignee?.id}`);
      AppSocket.io.emit("join_private", swData);
      const res = await httpGetMain(`tickets/${id}`);
      setfirstTimeLoad(false);
      if (res.status == "success") {
        setTicket(res?.data);
        setMsgHistory(res?.data[0]?.history);
        // sortMsges(res?.data[0]?.history);
        setMessageSenderId(res?.data[0]?.id);
        setSaveTicket({
          ...saveTicket,
          customer: "",
          subject: res?.data[0].subject,
          description: res?.data[0].history,
        });
        setLoadSingleTicket(false);
        checkRes();
      } else {
        setLoadSingleTicket(false);
        return NotificationManager.error(res.er.message, "Error", 4000);
      }
    };
  
    const getUser = async (id) => {
      const res = await httpGetMain(`users/${id}`);
      setfirstTimeLoad(false);
      if (res.status == "success") {
        setUserInfo(res.data);
      } else {
        setLoadSingleTicket(false);
        return NotificationManager.error(res.er.message, "Error", 4000);
      }
    };
  
    const updateTicket = async (status) => {
      setProcessing(true);
      if (status === "") {
        return;
      }
  
      let data = {
        priorityId: RSTicketPriority,
        categoryId: RSTicketCategory,
        subject: RSTicketSubject,
        description: RSTicketRemarks,
        assigneeId: RSTicketAssignee,
        tags: (!Array.isArray(RSTicketTags) || !RSTicketTags.length) ? null : RSTicketTags,
      };
      if(RSTicketStage){
        const statusRes = await httpPatchMain(`tickets-status/${ticket[0].id}`, {"statusId": RSTicketStage});
        if (statusRes.status === "success") {
          NotificationManager.success("Ticket status successfully updated", "Success");
        } else{
          NotificationManager.error(statusRes.er.message, "Error", 4000);
        }
      }
      const res = await httpPatchMain(`tickets/${ticket[0].id}`, data);
      if (res.status === "success") {
        setProcessing(false);
        closeSaveTicketModal();
        NotificationManager.success("Ticket status successfully updated","Success");
        const ticketRes = await httpGetMain(`tickets/${ticket[0].id}`);
        if (ticketRes.status === "success") {
            setTicket(ticketRes?.data);
            NotificationManager.success("Data updated", "Successful");
        } else {
          setLoadSingleTicket(false);
          NotificationManager.info("please refresh your page to see changes");
        }
      } else {
        setProcessing(false);
        return NotificationManager.error(res.er.message, "Error", 4000);
      }
    };
  
    const closeSaveTicketModal = () => {
      setopenSaveTicketModal(!openSaveTicketModal);
      setSaveTicket({
        customer: "",
        subject: "",
        description: [],
        category: "",
      });
      setRSTicketStage(ticket[0].status.id);
      setRSTicketPriority(ticket[0].priority.id);
      setRSTicketCategory(ticket[0].category.id);
      setRSTicketSubject(ticket[0].subject);
      setRSTicketRemarks(ticket[0].description);
      setRSTicketTags(ticket[0].tags);
      setRSTicketAssignee(ticket[0].assignee.id);
    };
    function createMarkup(data) {
      return { __html: data };
    }
    const checkRes = () => {
      let a = ticket?.map((data) => {
        if (data.history.length === 0) {
          setNoResponseFound(true);
        } else {
          setNoResponseFound(false);
        }
      });
    };
  
    // const _uploadImageCallBack = (file) => {
    //   // long story short, every time we upload an image, we
    //   // need to save it to the state so we can get it's data
    //   // later when we decide what to do with it.
  
    //   // Make sure you have a uploadImages: [] as your default state
    //   let uploadedImages = uploadImgS;
  
    //   const imageObject = {
    //     file: file,
    //     localSrc: URL.createObjectURL(file),
    //   };
  
    //   setUploadIMGs(imageObject);
  
    //   uploadImgS(uploadedImages);
  
    //   // We need to return a promise with the image src
    //   // the img src we will use here will be what's needed
    //   // to preview it in the browser. This will be different than what
    //   // we will see in the index.md file we generate.
    //   return new Promise((resolve, reject) => {
    //     resolve({ data: { link: imageObject.localSrc } });
    //   });
    // };
  
    const _uploadImageCallBack = (file) => {
      // long story short, every time we upload an image, we
      // need to save it to the state so we can get it's data
      // later when we decide what to do with it.
  
      // Make sure you have a uploadImages: [] as your default state
      let uploadedImages = [];
  
      const imageObject = {
        file: file,
        localSrc: URL.createObjectURL(file),
      };
  
      uploadedImages.push(imageObject);
      console.log(imageObject);
  
      //this.setState(uploadedImages: uploadedImages)
  
      // We need to return a promise with the image src
      // the img src we will use here will be what's needed
      // to preview it in the browser. This will be different than what
      // we will see in the index.md file we generate.
      return new Promise((resolve, reject) => {
        resolve({ data: { link: imageObject.localSrc } });
      });
    };

    /* <<<<<< FROM CODE-UI-ANDY */


    useEffect(() => {

      if (isCurrentTicketLoaded && currentTicket) {
        loadSingleMessage(currentTicket);
      }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCurrentTicketLoaded, currentTicket])


    return (
        <Fragment>
          {!isCurrentTicketLoaded ? 
            <div className="single-cust-loader">
              <ScaleLoader loading={true} color={"#006298"}/>
            </div>
            : !currentTicket ? <div>No Ticket Found.</div> 
            : <div id="ticketDetailsWrapper" style={{ gridTemplateColumns: "280px 1fr", border: '1px solid #f1f1f1'}}  className="d-grid mb-0">
                <div className="pt-2" style={{ backgroundColor: "#fafafa", borderRight: '1px solid #f1f1f1' }}>
                  <UserProfile UserInfo={UserInfo} ticket={[currentTicket]} isTicketDetails={true} timeLine={false}  />
                </div>
                <div id="ticketDetailsRightPane"
                    style={{overflowX: "hidden"}}
                    className="bg-secondary pt-0 bg-white">
                    {/* Conversation Part */}

                  {/* CHAT COL TWO */}

                  <div
                    className={`conversation-layout-col-two h-100`}>
                    {firstTimeLoad ? (
                      <div className="single-cust-loader"><ScaleLoader loading={true} color={"#006298"}/></div>
                    ) : loadSingleTicket ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "50px",
                          width: "100%",
                        }}
                      >
                        {" "}
                        <ScaleLoader
                          color="#0d4166"
                          loading={loadSingleTicket}
                          // size={35}
                        />
                      </div>
                    ) : (
                      <div className="conversation-layout-col-two-chatCol">
                        {" "}
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
                        <Fragment>
                          <div className="conversationHeaderV2">
                            <div className="conversationHeaderMainV2">
                              <div className="custormChatHeaderInfo">
                                <div className="custormChatHeaderInfoData pt-3">
                                  <h1>{ticket[0]?.subject}</h1>
                                  <p>
                                    {`${capitalize(
                                      SenderInfo?.customer?.firstname)} ${capitalize(SenderInfo?.customer?.lastname == "default"? "" : SenderInfo?.customer?.lastname)} 
                                      ${capitalize(SenderInfo?.customer?.email)}`}
                                    <div className="custormChatHeaderDot"></div>{" "}
                                    <span>{dateFormater(ticket[0]?.updated_at)}</span>
                                  </p>
                                </div>
                                <div
                                  className="custormChatHeaderInfoAction"
                                  onClick={closeSaveTicketModal}
                                >
                                  <StarIconTicket /> Update
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div>
                            <div className="achivemsagesSection pt-3"
                                onClick={() => setShowAchive(!ShowAchive)}>
                                <ExpandChat />
                                {AchiveMsges.length == 0 &&
                                TodayMsges.length == 0 &&
                                YesterdayMsges.length == 0 ? (
                                  <span> No response found ({AchiveMsges.length})</span>
                                ) : (
                                  <span>
                                    {" "}
                                    {ShowAchive ? "Condense" : "Expand"} all conversation
                                    ({AchiveMsges.length})
                                  </span>
                                )}
                              </div>
                          </div> */}
                          {/* CHAT SECTION */}
                          <div id="ticketConvoBox" className="conversationsMain">
                            <div className="chatDateHeader">
                              <div className="chatDateHeaderhr1"></div>
                              <div className="chatDateHeaderTitle">
                                <span>
                                  {moment(ticket[0].created_at).format("DD/MM/YYYY") ==
                                  moment(new Date()).format("DD/MM/YYYY")
                                    ? "Today"
                                    : moment(ticket[0].created_at).format(
                                        "DD/MM/YYYY"
                                      ) == moment().add(-1, "days").format("DD/MM/YYYY")
                                    ? "Yesterday"
                                    : moment(ticket[0].created_at).fromNow()}
                                </span>{" "}
                              </div>
                              <div className="chatDateHeaderhr2"></div>
                            </div>
                            <div className="msgAssingedToee3">
                              This message is assigned to{" "}
                              <span>
                                {" "}
                                {`${capitalize(
                                  ticket[0]?.assignee?.firstname || ""
                                )} ${capitalize(ticket[0]?.assignee?.lastname  || '')}`}
                              </span>
                            </div>

                            <div className="msgAssingedToee3" style={{ paddingTop: "8px", marginBottom: "-6px" }}>
                              <span>
                                {" "}
                                {`${capitalize(
                                  ticket[0]?.assignee?.firstname || ""
                                )} ${capitalize(ticket[0]?.assignee?.lastname || '')}`}
                              </span>{" "}
                              picked up this chat
                            </div>

                            <div className="msgAssingedToee3">
                              Ticket Status has been marked as{" "}
                              <span> {ticket[0].status.status}</span>
                            </div>

                            <div className="">
                              {AchiveMsges.map((data) => {
                                return (
                                  <Fragment>
                                  {(data?.response.includes("Ticket Stage has been marked") || data?.statusAction)? (
                                    <div className="msgAssingedToee3 my-3" id={`${data?.id}`}>
                                      <span>{" "}
                                        {`${data?.response}`}
                                      </span>
                                    </div>
                                    ) : (
                                    <div className={`message ${data?.user?.role == "Customer" ? "" : "message-out"}`}>
                                      <div className="avatar avatar-md rounded-circle overflow-hidden acx-bg-primary d-flex justify-content-center align-items-center">
                                        {data?.user?.avatar ? ( 
                                          <img className="avatar-img" src={data?.user.avatar} width="100%" alt=""/> ) 
                                          : ( <div className="">
                                              <p className="fs-6 mb-0 text-white">{`${data?.user?.firstname?.slice(0,1)}${data?.user?.lastname == "default" ? "" : data?.user?.lastname?.slice(0, 1)}`}</p>
                                            </div>
                                          )}
                                      </div>
                                      <div className="message-inner">
                                          <div className="message-body">
                                              <div className="message-content">
                                                  <div className="message-text">
                                                      <p className="text-dark message-title mb-1">
                                                        {`${(data?.user?.firstname) ? capitalize(data?.user?.firstname) : ""} ${(data?.user?.lastname == "default") ? "" : data?.user?.lastname}`}
                                                      </p>
                                                      <div className="message-text-content" dangerouslySetInnerHTML={createMarkup(data?.response)}></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="message-footer">
                                              <span className="text-muted">{dateFormater(data.created_at)}</span>
                                          </div>
                                      </div>
                                    </div>
                                  )}
                                </Fragment>
                                );
                              })}
                            </div>

                            {YesterdayMsges.length == 0 ? (
                              ""
                            ) : (
                              <div className="chatDateHeader">
                                <div className="chatDateHeaderhr1"></div>
                                <div className="chatDateHeaderTitle">
                                  <span>Yesterday</span>{" "}
                                </div>
                                <div className="chatDateHeaderhr2"></div>
                              </div>
                            )}

                            {YesterdayMsges.map((data) => {
                              return (
                                <Fragment>
                                  {(data?.response.includes("Ticket Stage has been marked") || data?.statusAction)? (
                                    <div className="msgAssingedToee3 my-3" id={`${data?.id}`}>
                                      <span>{" "}
                                        {`${data?.response}`}
                                      </span>
                                    </div>
                                    ) : (
                                    <div className={`message ${data?.user?.role == "Customer" ? "" : "message-out"}`}>
                                      <div className="avatar avatar-md rounded-circle overflow-hidden acx-bg-primary d-flex justify-content-center align-items-center">
                                        {data?.user?.avatar ? ( 
                                          <img className="avatar-img" src={data?.user.avatar} width="100%" alt=""/> ) 
                                          : ( <div className="">
                                              <p className="fs-6 mb-0 text-white">{`${data?.user?.firstname?.slice(0,1)}${data?.user?.lastname == "default" ? "" : data?.user?.lastname?.slice(0, 1)}`}</p>
                                            </div>
                                          )}
                                      </div>
                                      <div className="message-inner">
                                          <div className="message-body">
                                              <div className="message-content">
                                                  <div className="message-text">
                                                      <p className="text-dark message-title mb-1">
                                                        {`${(data?.user?.firstname) ? capitalize(data?.user?.firstname) : ""} ${(data?.user?.lastname == "default") ? "" : data?.user?.lastname}`}
                                                      </p>
                                                      <div className="message-text-content" dangerouslySetInnerHTML={createMarkup(data?.response)}></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="message-footer">
                                              <span className="text-muted">{dateFormater(data.created_at)}</span>
                                          </div>
                                      </div>
                                    </div>
                                  )}
                                </Fragment>
                              );
                            })}

                            {TodayMsges.length == 0 ? (
                              ""
                            ) : (
                              <div className="chatDateHeader">
                                <div className="chatDateHeaderhr1"></div>
                                <div className="chatDateHeaderTitle">
                                  <span>Today</span>{" "}
                                </div>
                                <div className="chatDateHeaderhr2"></div>
                              </div>
                            )}

                            {TodayMsges.map((data) => {
                              return (
                                <Fragment>
                                  {(data?.response.includes("Ticket Stage has been marked") || data?.statusAction)? (
                                    <div className="msgAssingedToee3 my-3" id={`${data?.id}`}>
                                      <span>{" "}
                                        {`${data?.response}`}
                                      </span>
                                    </div>
                                    ) : (
                                    <div className={`message ${data?.user?.role == "Customer" ? "" : "message-out"}`}>
                                      <div className="avatar avatar-md rounded-circle overflow-hidden acx-bg-primary d-flex justify-content-center align-items-center">
                                        {data?.user?.avatar ? ( 
                                          <img className="avatar-img" src={data?.user.avatar} width="100%" alt=""/> ) 
                                          : ( <div className="">
                                              <p className="fs-6 mb-0 text-white">{`${data?.user?.firstname?.slice(0,1)}${data?.user?.lastname == "default" ? "" : data?.user?.lastname?.slice(0, 1)}`}</p>
                                            </div>
                                          )}
                                      </div>
                                      <div className="message-inner">
                                          <div className="message-body">
                                              <div className="message-content">
                                                  <div className="message-text">
                                                      <p className="text-dark message-title mb-1">
                                                        {`${(data?.user?.firstname) ? capitalize(data?.user?.firstname) : ""} ${(data?.user?.lastname == "default") ? "" : data?.user?.lastname}`}
                                                      </p>
                                                      <div className="message-text-content" dangerouslySetInnerHTML={createMarkup(data?.response)}></div>
                                                  </div>
                                              </div>
                                          </div>
                                          <div className="message-footer">
                                              <span className="text-muted">{dateFormater(data.created_at)}</span>
                                          </div>
                                      </div>
                                    </div>
                                  )}
                                </Fragment>
                              );
                            })}
                            <div id="lastMsg"></div>
                            {/* <div
                            className="msgRepliesSectionChattsdw"
                            style={{ marginTop: "10px" }}
                          >
                            <div className="customerTiketChat">
                              <div className="customerTImageHeader">
                                <div className="imgContainercth">
                                  <img src={pic} alt="" />
                                  <div className="custorActiveStateimgd"></div>
                                </div>
                              </div>
                              <div className="custormernameticket">
                                <p style={{ color: "#006298" }}>
                                  Hammed Daudu{" "}
                                  <span style={{ color: "#656565" }}>replied</span>
                                </p>
                                <p>Just now</p>
                              </div>
                            </div>

                            <div
                              className="msgbodyticketHeader"
                              style={{ color: "rgba(101, 101, 101, 0.7)" }}
                            >
                              is typing...
                            </div>
                          </div> */}
                          </div>
                        </Fragment>
                        {/* CHAT COMMENT BOX SECTION */}
                        <div id="ticketConvoEditorBox" className="conversationCommentBox">
                          <div className="single-chat-ckeditor position-relative">
                            <div
                              className="showBackArrowOnMobile"
                              onClick={() =>
                                setChatCol({ col1: "showColOne", col2: "hideColTwo" })
                              }
                            >
                              <img src={BackArrow} alt="" />
                            </div>
                            <div className="ticket-convo-editor">
                              <div className="position-absolute ps-1 pt-1 bg-white rounded-top border w-100" style={{"zIndex": "2"}}>
                                <Form.Check
                                  inline
                                  label="Reply"
                                  value="reply"
                                  name="reply_type"
                                  checked={replyType === "reply"}
                                  onChange={onReplyTypeChange}
                                  type="radio"
                                  id={`inline-response_type-1`}
                                />
                                <Form.Check
                                  inline
                                  label="Comment"
                                  value="note"
                                  name="reply_type"
                                  checked={replyType === "note"}
                                  onChange={onReplyTypeChange}
                                  type="radio"
                                  id={`inline-response_type-2`}
                                />
                              </div>
                              <Editor
                                editorState={editorState}
                                toolbar={{
                                  options: ["emoji", "inline", "image"],

                                  inline: {
                                    inDropdown: false,
                                    className: undefined,
                                    component: undefined,
                                    dropdownClassName: undefined,
                                    options: ["bold", "italic", "underline"],
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
                                      "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                                    alt: { present: false, mandatory: false },
                                    defaultSize: {
                                      height: "auto",
                                      width: "auto",
                                    },
                                  },
                                  emoji: {
                                    icon: Smiley,
                                  },
                                  blockType: {
                                    inDropdown: true,
                                  },

                                  list: {
                                    inDropdown: true,
                                  },
                                  // textAlign: {
                                  //   inDropdown: false,
                                  //   className: undefined,
                                  //   component: undefined,
                                  //   dropdownClassName: undefined,
                                  //   options: ["left", "center", "right"],
                                  //   left: { icon: TextAlignLeft, className: undefined },
                                  //   center: {
                                  //     icon: TextAlignCenter,
                                  //     className: undefined,
                                  //   },
                                  //   right: { icon: TextAlignRight, className: undefined },
                                  //   // justify: { icon: TextAlignCenter, className: undefined },
                                  // },

                                  link: {
                                    inDropdown: true,
                                  },

                                  history: {
                                    inDropdown: true,
                                  },
                                }}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={(editor) =>
                                  onEditorStateChange(editor)
                                }
                              />
                            </div>

                            <div className="sendMsg">
                              <button
                                disabled={sendingReply}
                                onClick={() => replyTicket(ReplyTicket, "attachment")}
                              >
                                <SendMsgIcon /> Send
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* CHAT COL TWO END */}
                </div>
              </div>}
          <Modal open={openSaveTicketModal} onClose={closeSaveTicketModal} center>
            <Form className="saveTicketWrapModal" onSubmit={(e) => e.preventDefault()}>
          <p className="fs-5">
            Kindly update ticket before closing the chat
          </p>

          <div className="">
            <Row  md={6} className="mb-3">
              <Form.Group as={Col} md={6} className="form-group acx-form-group mb-3">
                <Form.Label className="mb-0">Customer</Form.Label>
                <Form.Control
                  value={`${capitalizeFirstLetter(ticket[0]?.customer?.firstname)} ${capitalizeFirstLetter(ticket[0]?.customer?.lastname)}`}
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
                  style={{ fontSize: "12px" }}
                  isClearable={false}
                  onChange={(newValue, actionMeta) => {
                    setRSTicketCategory(newValue.value);
                  }}
                  defaultValue={{
                    value: ticket[0]?.category?.id , 
                    label: ticket[0]?.category?.name
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
                  style={{ fontSize: "12px" }}
                  onChange={(newValue, actionMeta) => {
                    setRSTicketStage(newValue.value);
                  }}
                  isClearable={false}
                  defaultValue={{
                    value: ticket[0]?.status?.id , 
                    label: ticket[0]?.status?.status
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
                  style={{ fontSize: "12px" }}
                  onChange={(newValue, actionMeta) => {
                    setRSTicketPriority(newValue.value);
                  }}
                  isClearable={false}
                  defaultValue={{
                    value: ticket[0]?.priority?.id, 
                    label: ticket[0]?.priority?.name
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

            <Form.Group  className="form-group acx-form-group mb-3">
              <Form.Label className="mb-0">Subject</Form.Label>
              <Form.Control type="text"
                defaultValue={`${ticket[0]?.subject}`}
                onChange={(e) => setRSTicketSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group  className="form-group acx-form-group mb-3">
              <Form.Label className="mb-0">Remarks</Form.Label>
              <Form.Control as="textarea" rows={5} defaultValue={ticket[0]?.description} onChange={(e) => setRSTicketRemarks(e.target.value)}/>
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
                      closeMenuOnSelect={true}
                      menuPlacement={"top"}
                      onChange={(newValue, actionMeta) => {
                        setRSTicketAssignee(newValue.value);
                      }}
                      defaultValue={{
                        value: ticket[0]?.assignee?.id , 
                        label: `${ticket[0]?.assignee?.firstname}  ${ticket[0]?.assignee?.lastname}`
                      }}
                      options={
                        // populate 'options' prop from $Category, with names remapped
                        Agents.map((data) => {
                          return { value: data.id, label: `${data.firstname}  ${data.lastname}` };
                        })
                      }
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label htmlFor="">Tags</label>
                  <RSelect
                    className="rselectfield"
                    closeMenuOnSelect={false}
                    menuPlacement={"top"}
                    onChange={selectedOptions => {
                      setRSTicketTags(selectedOptions.map((item) => { return item.value} ))
                    }}
                    defaultValue={
                      ticket[0]?.tags ? ticket[0]?.tags.map((data) => {
                        return { value: data, label: data};
                      }) :  null
                      
                    }
                    options={
                      // populate 'options' prop from $Tags remapped
                      Tags.map((data) => {
                        return { value: data, label: data};
                      })
                    }
                    isMulti
                  />
                </div>
                <div className="col-12 mt-3">
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
                </div>
              </div>
            )}
            <div className="text-end mt-3">
              <Button className="btn acx-btn-primary px-3 py-2" disabled={processing} type="submit" onClick={updateTicket}>
                { processing ? 
                (<Fragment><Spinner as="span" size="sm" animation="border" variant="light" /> Processing...</Fragment>  ) 
                  : `Update`}
              </Button>
            </div>
          </div>
        </Form>
          </Modal>
        </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketLoaded: state.ticket.isTicketLoaded, isCurrentTicketLoaded: state.ticket.isCurrentTicketLoaded, currentTicket: state.ticket.currentTicket, user: state.userAuth.user});

export default connect(mapStateToProps, {getCurrentTicket})(Ticket);
