import React, { useState, useEffect, useContext } from "react";
import { UserDataContext } from "../../../context/userContext";
import "./conversation.css";
import { Modal } from "react-responsive-modal";
import Spinner from 'react-bootstrap/Spinner';
import PinIcon from '../../../assets/icons/pin.svg';
import MessageList from "./messageList";
import searchIcon from "../../../assets/imgF/Search.png";
import NoChatFound from "./noChatFound";
// import SingleChatOpen from "./sigleChat";
import {
  httpGetMain,
  httpPostMain,
  httpPatchMain,
} from "../../../helpers/httpMethods";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { NotificationManager } from "react-notifications";
import ClipLoader from "react-spinners/ClipLoader";
// bootstrap components
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
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
import TextAlignLeft from "../../../assets/imgF/TextAlignLeft.png";
import TextAlignCenter from "../../../assets/imgF/TextAlignCenter.png";
import TextAlignRight from "../../../assets/imgF/TextAlignRight.png";
import UserProfile from "./userProfile";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import { SocketDataContext } from "../../../context/socket";
import {
  StarIconTicket,
  SendMsgIcon,
  ExpandChat,
} from "../../../assets/images/svgs";
import pic from "../../../assets/imgF/codeuiandyimg.png";
import { dateFormater } from "../../helpers/dateFormater";
import { capitalize } from "@material-ui/core";
import moment from "moment";
import RSelect from "react-select/creatable";

export default function Conversation() {
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

  const { AppSocket } = useContext(SocketDataContext);
  const { loading } = useContext(UserDataContext);
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
  const [Tags, setTags] = useState([]);
  const [editorState, setEditorState] = useState(initialState);
  const [firstTimeLoad, setfirstTimeLoad] = useState(true);
  const [MessageSenderId, setMessageSenderId] = useState("");
  const [TicketId, setTicketId] = useState("");
  const [showUserProfile, setshowUserProfile] = useState(false);
  const [ReplyTicket, setReplyTicket] = useState({
    plainText: "",
    richText: "",
  });
  const [Agents, setAgents] = useState([]);
  const [Statuses, setStatuses] = useState([]);
  const [UserInfo, setUserInfo] = useState({});
  const [ChatCol, setChatCol] = useState({
    col1: "",
    col2: "",
  });
  const [openSaveTicketModal, setOpenSaveTicketModal] = useState(false);
  const [filterChat, setFilterChat] = useState("system");
  const [saveTicket, setSaveTicket] = useState({
    customer: "",
    subject: "",
    description: [],
    category: "",
  });
  const [sendingReply, setSendingReply] = useState(false);
  const [msgHistory, setMsgHistory] = useState([]);
  const [wsTickets, setWsTickets] = useState([]);
  const [categoryUpdate, setCategoryUpdate] = useState("");
  const [noResponseFound, setNoResponseFound] = useState(true);
  const [TodayMsges, setTodayMsges] = useState([]);
  const [YesterdayMsges, setYesterdayMsges] = useState([]);
  const [AchiveMsges, setAchiveMsges] = useState([]);
  const [ShowAchive, setShowAchive] = useState(false);
  const [channel, setChannel] = useState("All");
  const [status, setstatus] = useState("All");
  const [activeChat, setActiveChat] = useState(1);
  const [updateTickStatusS, setupdateTickStatusS] = useState("");
  
  /* UPDATE MODAL FORM VALUES */
  const [processing, setProcessing] = useState(false);
  const [RSCustomerName, setRSCustomerName] = useState("");
  const [RSTicketTags, setRSTicketTags] = useState([]);
  const [RSTicketAssignee, setRSTicketAssignee] = useState([]);
  const [RSTicketCategory, setRSTicketCategory] = useState("");
  const [RSTicketSubject, setRSTicketSubject] = useState("");
  const [RSTicketStage, setRSTicketStage] = useState("");
  const [RSTicketPriority, setRSTicketPriority] = useState("");
  const [RSTicketRemarks, setRSTicketRemarks] = useState("");
  const [RSTicketAssignedAgent, setRSTicketAssignedAgent] = useState("");

  const [isAdditionalOptionVisible, setIsAdditionalOptionVisible] = useState(
    false
  );
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
    // let swData = { assigneeId: "15b7c94e-0fc1-4619-9f7b-d985b41e84f9", userId:  "490af948-cd93-45c6-9a9e-a06be5bbea2b" };
    // AppSocket.io.emit("join_private", swData);
    AppSocket.io.on(`ws_tickets`, (data) => {
      setTickets(data?.data?.tickets);
      // console.log("this are Tickets", data?.data?.tickets);
      setWsTickets(data?.data?.tickets);
    });
    AppSocket.io.on(`message`, (data) => {
      // console.log("this are history msg", data);
      // console.log(`${UserInfo}`);
      // if(data.user.id == ticket[0]?.customer?.id){
        let msg = {
          created_at: data.created_at,
          id: data.history.id,
          plain_response: data.history.plain_response,
          response: data.history.response,
          type: "reply",
          user: data.user,
        };
        
        setMsgHistory((item) => [...item, msg]);
        
        let ticketsData = { channel: filterTicketsState === "" ? "ALL" : filterTicketsState, per_page: 100 };
        AppSocket.io.emit(`ws_tickets`, ticketsData);

        scollPosSendMsgList();
      // }
      // sortMsges((item) => [...item, msg]);
    });
    AppSocket.io.on(`join_private`, () => {
      console.log("something came up");
    });
    return () => { AppSocket.io.disconnect()};
  },[]);

  const sortMsges = (msgs) => {
    // console.log("msgHis", msgs);
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
    /* console.log("Today>>>", resultToday);
    console.log("Yesterdat msg ", resultYesterday);
    console.log("resultAchive msg ", resultAchive); */
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
    // console.log(">>>>", richText, richText);
  };
  const getTickets = async () => {
    const res = await httpGetMain("tickets?channel=whatsapp");
    if (res?.status === "success") {
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
      let data = { channel: value === "All" ? "" : value, per_page: 100 };
      AppSocket.io.emit(`ws_tickets`, data);
    }

    if (type === "status") {
      setstatus(value);
      AppSocket.createConnection();
      let data = { status: value === "All" ? "" : value, per_page: 100 };
      AppSocket.io.emit(`ws_tickets`, data);
    }
    setFilterTicketsState(value);
  };

  const replyTicket = async (reply, attachment) => {
    scollPosSendMsg();
    // console.log(reply);
    let filterSentTick = tickets.filter((tic) => {
      return tic.id == singleTicketFullInfo.id;
    });
    let filterSentTickAll = tickets.filter((tic) => {
      return tic.id != singleTicketFullInfo.id;
    });
    setActiveChat(1);
    filterSentTick[0]["__meta__"].history_count = ++filterSentTick[0][
      "__meta__"
    ].history_count;
    filterSentTick[0]["updated_at"] = new Date();
    const newTicket = [...filterSentTick, ...filterSentTickAll];
    setTickets(newTicket);
    // console.log(filterSentTick);
    const data = {
      type: "note",
      response: reply.richText,
      plainResponse: reply.plainText,
      phoneNumber: singleTicketFullInfo.customer.phone_number,
      // attachment: "",
    };
    // console.log(singleTicketFullInfo.customer.phone_number);
    // console.log(data);
    // setSendingReply(true);
    const replyData = {
      attachment: null,
      created_at: new Date(),
      plain_response: reply.plainText,
      response: reply.richText,
      // user: SenderInfo?.customer,
      user: ticket[0]?.assignee,
    };
    // console.log(replyData);
    setMsgHistory((item) => [...item, replyData]);
    const res = await httpPostMain(
      `tickets/${singleTicketFullInfo.id}/replies`,
      data
    );

    if (res?.status === "success") {
      scollPosSendMsgList();
      // setSendingReply(false);
      // ReloadloadSingleMessage();
      setEditorState(initialState);
      setReplyTicket({ plainText: "", richText: "" });

      // emit ws_tickets event on reply
      AppSocket.createConnection();
      let channelData = { channel: filterTicketsState === "" ? "ALL" : filterTicketsState, per_page: 100 };
      AppSocket.io.emit(`ws_tickets`, channelData);

    } else {
      // setLoadingTicks(false);
      setSendingReply(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const ReloadloadSingleMessage = async () => {
    setLoadSingleTicket(true);

    const res = await httpGetMain(`tickets/${MessageSenderId}`);
    if (res.status === "success") {
      setTicket(res?.data);
      setLoadSingleTicket(false);
    } else {
      setLoadSingleTicket(false);
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const getStatuses = async () => {
    const res = await httpGetMain(`statuses`);
    if (res.status === "success") {
      // getTickets();
      setStatuses(res?.data?.statuses);
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const getCategories = async () => {
    const res = await httpGetMain(`categories`);
    if (res.status === "success") {
      setCategory(res?.data?.categories);
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
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
      return NotificationManager.error(res.er.message, "Error", 4000);
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

  const upTicketStatus = async (id) => {
    const data = { statusId: id };
    const res = await httpPatchMain(`tickets/${TicketId}`, data);
    if (res.status === "success") {
      // setStatuses(res?.data?.statuses);
      return NotificationManager.success(
        "Ticket status update successfully",
        "Success",
        4000
      );
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const loadSingleMessage = async ({ id, customer, assignee, subject }) => {
    setShowAchive(false);
    setAchiveMsges([]);
    getUser(customer.id);
    setChatCol({ col1: "hideColOne", col2: "showColTwo" });
    setSenderInfo({ customer, subject });
    setMessageSenderId(id);
    setLoadSingleTicket(true);
    setTingleTicketFullInfo();
    setTicket([]);
    let swData = { assigneeId: assignee?.id || "", userId: customer?.id || "" };
    UserInfo.id && AppSocket.io.leave(`${UserInfo.id}${assignee.id}`);
    AppSocket.io.emit("join_private", swData);
    const res = await httpGetMain(`tickets/${id}`);
    setfirstTimeLoad(false);
    if (res.status === "success") {
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
      scollPosSendMsgList();
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
      statusId: RSTicketStage ,
      priorityId: RSTicketPriority,
      categoryId: RSTicketCategory,
      subject: RSTicketSubject,
      description: RSTicketRemarks,
      assigneeId: RSTicketAssignee,
      tags: (!Array.isArray(RSTicketTags) || !RSTicketTags.length) ? null : RSTicketTags,
    };
    const res = await httpPatchMain(`tickets/${ticket[0].id}`, data);
    if (res.status === "success") {
      setProcessing(false);
      closeSaveTicketModal();
      NotificationManager.success(
        "Ticket status successfully updated",
        "Success"
      );
      AppSocket.createConnection();
      let data = { channel: filterTicketsState === "" ? "ALL" : filterTicketsState, per_page: 100 };
      AppSocket.io.emit(`ws_tickets`, data);
      const res = await httpGetMain(`tickets/${ticket[0].id}`);
      if (res.status === "success") {
          setTicket(res?.data);
          return NotificationManager.success("Data updated", "Success");
      } else {
        setLoadSingleTicket(false);
        return NotificationManager.info("please refresh your page to see changes");
      }
    } else {
      setProcessing(false);
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const closeSaveTicketModal = () => {
    setOpenSaveTicketModal(!openSaveTicketModal);
    setSaveTicket({
      customer: "",
      subject: "",
      description: [],
      category: "",
    });
    if(openSaveTicketModal){  
      setRSTicketStage(ticket[0].status.id);
      setRSTicketPriority(ticket[0].priority.id);
      setRSTicketCategory(ticket[0].category.id);
      setRSTicketSubject(ticket[0].subject);
      setRSTicketRemarks(ticket[0].description);
      setRSTicketTags(ticket[0].tags);
      setRSTicketAssignee(ticket[0]?.assignee?.id);
    }
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

  function scollPosSendMsg(e) {
    window.location.href = "#msgListTop";
  }

  function scollPosSendMsgList(e) {
    window.location.href = "#lastMsg";
  }

  return (
    <React.Fragment>
      <div className="conversation-wrap codei-ui-andy-setDefaults">
        <div className="conversation-layout">
          {/* CHAT COL ONE */}
          <div className={`conversation-layout-col-one`}>
            <div className="message-toggles">
              <div className="messageType">
                <FormControl variant="outlined">
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(e) => {
                      filterTicket(e.target.value, "channel");
                    }}
                    label="Filter"
                    value={channel}
                  >
                    {/* <MenuItem value=""></MenuItem> */}
                    <MenuItem value="All" label="All">
                      Channels
                    </MenuItem>
                    <MenuItem value="facebook">Facebook</MenuItem>
                    <MenuItem value="whatsapp">Whatsapp</MenuItem>
                    <MenuItem value="system">System</MenuItem>
                    <MenuItem value="email">Email</MenuItem>
                    <MenuItem value="liveChat">Live Chat</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <div className="messageOpenClose">
                <FormControl variant="outlined">
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={(e) => {
                      filterTicket(e.target.value, "status");
                    }}
                    value={status}
                  >
                    <MenuItem value="All">Stages</MenuItem>
                    {Statuses?.map((data) => {
                      return <MenuItem value={data.id}>{data.status}</MenuItem>;
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
              LoadingTick={LoadingTick}
              loadSingleMessage={loadSingleMessage}
              setTingleTicketFullInfo={setTingleTicketFullInfo}
              setTicketId={setTicketId}
              filterChat={filterChat}
              filterTicketsState={filterTicketsState}
              activeChat={activeChat}
              setActiveChat={setActiveChat}
              scollPosSendMsgList={scollPosSendMsgList}
            />
          </div>

          {/* CHAT COL ONE END*/}

          {/* CHAT COL TWO */}

          <div
            className={`conversation-layout-col-two`}
            // style={showUserProfile ? { width: "calc(100% - 636px)" } : {}}
          >
            {firstTimeLoad ? (
              <NoChatFound value="Click on a ticket to get started" />
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
                <ClipLoader
                  color="#0d4166"
                  loading={loadSingleTicket}
                  size={35}
                />
              </div>
            ) : (
              <div className="conversation-layout-col-two-chatCol vgb">
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
                <React.Fragment>
                  <div className="conversationHeaderV2">
                    <div className="conversationHeaderMainV2">
                      <div className="custormChatHeaderInfo">
                        <div className="custormChatHeaderInfoData">
                          <h1>{ticket[0]?.subject}</h1>
                          <p>
                            {`${capitalize(SenderInfo?.customer?.firstname)} 
                              ${capitalize(SenderInfo?.customer?.lastname == "default"? "":SenderInfo?.customer?.lastname)} 
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
                  {/* CHAT SECTION */}
                  <div className="conversationsMain">
                    {AchiveMsges.length == 0 ? (
                      ""
                    ) : (
                      <div
                        className="achivemsagesSection"
                        onClick={() => setShowAchive(!ShowAchive)}
                      >
                        <ExpandChat />
                        {AchiveMsges.length == 0 &&
                        TodayMsges.length == 0 &&
                        YesterdayMsges.length == 0 ? (
                          <span> No response found ({AchiveMsges.length})</span>
                        ) : (
                          <span>
                            {" "}
                            {ShowAchive ? "Condense" : "Expand"} all
                            conversation ({AchiveMsges.length})
                          </span>
                        )}
                      </div>
                    )}

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

                    <div className="customerTiketChat">
                      <div className="customerTImageHeader">
                        <div className="imgContainercth">
                          {SenderInfo?.customer?.avatar ? (
                            <img src={SenderInfo?.customer?.avatar} alt="" />
                          ) : (
                            <div className="singleChatSenderImg">
                              <p>{`${SenderInfo?.customer?.firstname?.slice(0,1)}${SenderInfo?.customer?.lastname == "default"? "" : SenderInfo?.customer?.lastname?.slice(0,1)}`}</p>
                            </div>
                          )}
                          <div className="custorActiveStateimgd"></div>
                        </div>
                      </div>
                      <div className="custormernameticket">
                        <p style={{ color: "#006298" }}>
                          {`${capitalize(ticket[0]?.customer?.firstname)} ${capitalize(ticket[0]?.customer?.lastname == "default" ? "" : ticket[0]?.customer?.lastname)}`}
                        </p>
                        <p>{`Via ${ticket[0].channel} . ${dateFormater(
                          ticket[0].created_at
                        )}`}</p>
                      </div>
                    </div>
                    <div className="msgbodyticketHeader">
                      {capitalize(ticket[0]?.description)}
                    </div>
                    <div className="msgAssingedToee3">
                      This message is assigned to{" "}
                      <span>
                        {" "}
                        {`${capitalize(
                          ticket[0]?.assignee?.firstname || ""
                        )} ${capitalize(ticket[0]?.assignee?.lastname || "")}`}
                      </span>
                    </div>

                    <div
                      className="msgAssingedToee3"
                      style={{ paddingTop: "8px", marginBottom: "-6px" }}
                    >
                      <span>
                        {" "}
                        {`${capitalize(
                          ticket[0]?.assignee?.firstname || ""
                        )} ${capitalize(ticket[0]?.assignee?.lastname || "")}`}
                      </span>{" "}
                      picked up this chat
                    </div>

                    <div className="msgAssingedToee3">
                      Ticket Status has been marked as{" "}
                      <span> {ticket[0].status.status}</span>
                    </div>

                    <div
                      className={` ${
                        ShowAchive && AchiveMsges.length > 0
                          ? "showAchivesWrap"
                          : "hideAchivesWrap"
                      }`}
                    >
                      {AchiveMsges.map((data) => {
                        return (
                          <div className="msgRepliesSectionChattsdw">
                            <div className="customerTiketChat">
                              <div className="customerTImageHeader">
                                <div className="imgContainercth">
                                  {data?.user.avatar ? (
                                    <img src={data?.user.avatar} alt="" />
                                  ) : (
                                    <div className="singleChatSenderImg">
                                      <p>{`${data?.user?.firstname?.slice(0,1)}${data?.user?.lastname == "default" ? "" : data?.user?.lastname?.slice(0,1)}`}</p>
                                    </div>
                                  )}
                                  <div className="custorActiveStateimgd"></div>
                                </div>
                              </div>
                              <div className="custormernameticket">
                                <p style={{ color: "#006298" }}>
                                  {`${capitalize(
                                    data?.user?.firstname
                                  )} ${capitalize(data?.user?.lastname == "default" ? "" : data?.user?.lastname)}`}
                                  <span style={{ color: "#656565" }}>
                                    {" "}
                                    replied
                                  </span>
                                </p>
                                <p>{dateFormater(data.created_at)}</p>
                              </div>
                            </div>

                            <div
                              className="msgbodyticketHeader"
                              dangerouslySetInnerHTML={createMarkup(
                                data?.response
                              )}
                            ></div>
                          </div>
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
                        <div className="msgRepliesSectionChattsdw">
                          <div className="customerTiketChat">
                            <div className="customerTImageHeader">
                              <div className="imgContainercth">
                                {data?.user.avatar ? (
                                  <img src={data?.user.avatar} alt="" />
                                ) : (
                                  <div className="singleChatSenderImg">
                                    <p>{`${data?.user?.firstname?.slice(0,1)}${data?.user?.lastname == "default" ? "" : data?.user?.lastname?.slice(0, 1)}`}</p>
                                  </div>
                                )}
                                <div className="custorActiveStateimgd"></div>
                              </div>
                            </div>
                            <div className="custormernameticket">
                              <p style={{ color: "#006298" }}>
                                {`${capitalize(
                                  data?.user?.firstname
                                )} ${capitalize(data?.user?.lastname == "default" ? "" : data?.user?.lastname)}`}
                                <span style={{ color: "#656565" }}>
                                  {" "}
                                  replied
                                </span>
                              </p>
                              <p>{dateFormater(data.created_at)}</p>
                            </div>
                          </div>

                          <div
                            className="msgbodyticketHeader"
                            dangerouslySetInnerHTML={createMarkup(
                              data?.response
                            )}
                          ></div>
                        </div>
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
                        <div className="msgRepliesSectionChattsdw">
                          <div className="customerTiketChat">
                            <div className="customerTImageHeader">
                              <div className="imgContainercth">
                                {data?.user?.avatar ? (
                                  <img src={data?.user.avatar} alt="" />
                                ) : (
                                  <div className="singleChatSenderImg">
                                    <p>{`${data?.user?.firstname?.slice(0,1)}${data?.user?.lastname == "default" ? "" : data?.user?.lastname?.slice(0, 1)}`}</p>
                                  </div>
                                )}
                                <div className="custorActiveStateimgd"></div>
                              </div>
                            </div>
                            <div className="custormernameticket">
                              <p style={{ color: "#006298" }}>
                                {`${(data?.user?.firstname) ? capitalize(data?.user?.firstname) : "empty"} ${(data?.user?.lastname == "default") ? "" : data?.user?.lastname}`}
                                <span style={{ color: "#656565" }}>
                                  {" "}
                                  replied
                                </span>
                              </p>
                              <p>{dateFormater(data.created_at)}</p>
                            </div>
                          </div>

                          <div
                            className="msgbodyticketHeader"
                            dangerouslySetInnerHTML={createMarkup(
                              data?.response
                            )}
                          ></div>
                        </div>
                      );
                    })}
                    <span id="lastMsg"></span>

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
                </React.Fragment>
                {/* CHAT COMMENT BOX SECTION */}
                <div className="conversationCommentBox">
                  <div className="single-chat-ckeditor">
                    <div
                      className="showBackArrowOnMobile"
                      onClick={() =>
                        setChatCol({ col1: "showColOne", col2: "hideColTwo" })
                      }
                    >
                      <img src={BackArrow} alt="" />
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

          {/* CHAT COL THREE */}
          <div className="conversation-layout-col-three">
            {firstTimeLoad ? (
              ""
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
                <ClipLoader
                  color="#0d4166"
                  loading={loadSingleTicket}
                  size={35}
                />
              </div>
            ) : (
              <UserProfile UserInfo={UserInfo} ticket={ticket} />
            )}
          </div>
          {/* CHAT COL THREE END */}
        </div>
      </div>
      {/* Modal area starts here */}
      <Modal open={openSaveTicketModal} onClose={closeSaveTicketModal} center>
        <Form className="saveTicketWrapModal">
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
              <Form.Control as="textarea" rows={5} 
                onChange={(e) => setRSTicketRemarks(e.target.value)}
              >{ticket[0]?.description}</Form.Control>
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
                (<React.Fragment><Spinner as="span" size="sm" animation="border" variant="light" /> Processing...</React.Fragment>  ) 
                  : `Update`}
              </Button>
            </div>
          </div>
        </Form>
      </Modal>
    </React.Fragment>
  );
}
