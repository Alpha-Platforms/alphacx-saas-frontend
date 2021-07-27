import React, { useState, useEffect, useContext } from "react";
import "./conversation.css";
import { Modal } from "react-responsive-modal";
import MessageList from "./messageList";
import searchIcon from "../../../assets/imgF/Search.png";
import NoChatFound from "./noChatFound";
import SingleChatOpen from "./sigleChat";
import {
  httpGetMain,
  httpPostMain,
  httpPatchMain,
} from "../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
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
import TextAlignLeft from "../../../assets/imgF/TextAlignLeft.png";
import TextAlignCenter from "../../../assets/imgF/TextAlignCenter.png";
import TextAlignRight from "../../../assets/imgF/TextAlignRight.png";
import UserProfile from "./userProfile";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import { SocketDataContext } from "../../../context/socket";
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

  const {
    AppSocket,
    wsTickets,
    setWsTicketFilter,
    wsTicketFilter,
  } = useContext(SocketDataContext);
  const [loadSelectedMsg, setloadSelectedMsg] = useState("");
  const [tickets, setTickets] = useState([]);
  const [filterTicketsState, setFilterTicketsState] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [LoadingTick, setLoadingTicks] = useState(true);
  const [loadSingleTicket, setLoadSingleTicket] = useState(false);
  const [SenderInfo, setSenderInfo] = useState(false);
  const [singleTicketFullInfo, setTingleTicketFullInfo] = useState(false);
  const [Category, setCategory] = useState([]);
  const [editorState, setEditorState] = useState(initialState);
  const [firstTimeLoad, setfirstTimeLoad] = useState(true);
  const [MessageSenderId, setMessageSenderId] = useState("");
  const [TicketId, setTicketId] = useState("");
  const [showUserProfile, setshowUserProfile] = useState(false);
  const [ReplyTicket, setReplyTicket] = useState({
    plainText: "",
    richText: "",
  });
  const [Statues, setStatues] = useState([]);
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
  useEffect(() => {
    // getTickets();
  }, []);

  useEffect(() => {
    getStatues();
    getCategories();
  }, []);
  useEffect(() => {
    AppSocket.createConnection();
  }, [wsTickets]);

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
    console.log(">>>>", richText, richText);
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
    if (type == "channel") {
      AppSocket.createConnection();
      let data = { channel: value, per_page: 100 };
      AppSocket.io.emit(`ws_tickets`, data);
    }

    if (type == "status") {
      AppSocket.createConnection();
      let data = { status: value, per_page: 100 };
      AppSocket.io.emit(`ws_tickets`, data);
    }
  };

  const replyTicket = async (reply, attachment) => {
    console.log(reply);
    const data = {
      // type: "note",
      response: reply.richText,
      plainResponse: reply.plainText,
      phoneNumber: singleTicketFullInfo.customer.phone_number,
      // attachment: "",
    };
    console.log(singleTicketFullInfo.customer.phone_number);
    console.log(data);
    setsendingReply(true);
    const res = await httpPostMain(
      `tickets/${singleTicketFullInfo.id}/replies`,
      data
    );
    if (res?.status == "success") {
      setsendingReply(false);
      ReloadloadSingleMessage();
      setEditorState(initialState);
      setReplyTicket({ plainText: "", richText: "" });
    } else {
      // setLoadingTicks(false);
      setsendingReply(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

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

  const getStatues = async () => {
    const res = await httpGetMain(`statuses`);
    if (res.status == "success") {
      // getTickets();
      setStatues(res?.data?.statuses);
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const getCategories = async () => {
    const res = await httpGetMain(`categories`);
    if (res.status == "success") {
      setCategory(res?.data?.categories);
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const upTicketStatus = async (id) => {
    const data = { statusId: id };
    const res = await httpPatchMain(`tickets/${TicketId}`, data);
    if (res.status == "success") {
      // setStatues(res?.data?.statuses);
      return NotificationManager.success(
        "Ticket status update successfully",
        "Success",
        4000
      );
    } else {
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const loadSingleMessage = async ({ id, customer, subject }) => {
    setChatCol({ col1: "hideColOne", col2: "showColTwo" });
    setSenderInfo({ customer, subject });
    getUser(customer.id);
    setMessageSenderId(id);
    setLoadSingleTicket(true);
    setTingleTicketFullInfo();
    setTicket([]);
    const res = await httpGetMain(`tickets/${id}`);
    setfirstTimeLoad(false);
    if (res.status == "success") {
      setTicket(res?.data);
      setSaveTicket({
        ...saveTicket,
        customer: "",
        subject: res?.data[0].subject,
        description: res?.data[0].history,
      });
      console.log(res?.data[0]?.history);
      setLoadSingleTicket(false);
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

  const closeSaveTicketModal = () => {
    setopenSaveTicketModal(!openSaveTicketModal);
    setSaveTicket({
      customer: "",
      subject: "",
      description: [],
      category: "",
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

  return (
    <div className="conversation-wrap codei-ui-andy-setDefaults">
      <div className="conversation-layout">
        <div className={`conversation-layout-col-one ${ChatCol.col1}`}>
          <div className="message-toggles">
            <div className="messageType">
              <select
                name=""
                id=""
                onChange={(e) => {
                  filterTicket(e.target.value, "channel");
                }}
              >
                <option value="">All</option>
                <option value="facebook">Facebook</option>
                <option value="whatsapp">Whatsapp</option>
                <option value="email">Email</option>
                <option value="liveChat">Live Chat</option>
              </select>
            </div>
            <div className="messageOpenClose">
              <select
                name=""
                id=""
                onChange={(e) => {
                  filterTicket(e.target.value, "status");
                }}
              >
                <option value="">All</option>
                {Statues?.map((data) => {
                  return <option value={data.id}>{data.status}</option>;
                })}
              </select>
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
          />
        </div>

        <div
          className={`conversation-layout-col-two ${ChatCol.col2}`}
          style={showUserProfile ? { width: "calc(100% - 636px)" } : {}}
        >
          {loadSingleTicket ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "50px",
              }}
            >
              {" "}
              <ClipLoader
                color="#0d4166"
                loading={loadSingleTicket}
                size={35}
              />
            </div>
          ) : firstTimeLoad ? (
            <NoChatFound value="Click on a ticket to get started" />
          ) : (
            <div className="single-chat-ckeditor">
              <div
                className="showBackArrowOnMobile"
                onClick={() =>
                  setChatCol({ col1: "showColOne", col2: "hideColTwo" })
                }
              >
                <img src={BackArrow} alt="" />
              </div>
              <SingleChatOpen
                ticket={ticket}
                SenderInfo={SenderInfo}
                setMessageSenderId={setMessageSenderId}
                Statues={Statues}
                upTicketStatus={upTicketStatus}
                setshowUserProfile={setshowUserProfile}
                setopenSaveTicketModal={setopenSaveTicketModal}
                openSaveTicketModal={openSaveTicketModal}
              />

              <Editor
                editorState={editorState}
                toolbar={{
                  options: [
                    "emoji",
                    "inline",
                    // "blockType",

                    // "list",
                    "textAlign",
                    // "colorPicker",
                    // "link",
                    // "embedded",
                    "image",
                  ],
                  // inline: {
                  //   inDropdown: false,
                  //   icon: boldB,
                  //   options: ["bold", "underline", "italic"],
                  // },

                  inline: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: ["bold", "italic", "underline"],
                    bold: { icon: boldB, className: undefined },
                    italic: { icon: TextItalic, className: undefined },
                    underline: { icon: TextUnderline, className: undefined },
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
                  textAlign: {
                    inDropdown: false,
                    className: undefined,
                    component: undefined,
                    dropdownClassName: undefined,
                    options: ["left", "center", "right"],
                    left: { icon: TextAlignLeft, className: undefined },
                    center: { icon: TextAlignCenter, className: undefined },
                    right: { icon: TextAlignRight, className: undefined },
                    // justify: { icon: TextAlignCenter, className: undefined },
                  },

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
                onEditorStateChange={(editor) => onEditorStateChange(editor)}
              />

              <div className="sendMsg">
                <button
                  disabled={sendingReply}
                  onClick={() => replyTicket(ReplyTicket, "attachment")}
                >
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div style={showUserProfile ? { display: "block" } : { display: "none" }}>
        <UserProfile
          setshowUserProfile={setshowUserProfile}
          UserInfo={UserInfo}
        />
      </div>
      <div>
        <Modal open={openSaveTicketModal} onClose={closeSaveTicketModal} center>
          <div className="saveTicketWrapModal">
            <div className="modalHeaderSaveT">
              Kindly update ticket before closing the chat
            </div>

            <div className="saveTicketModalForm">
              <div className="ticketmodalInput-twoCol">
                <div className="ticketmodalInputWrapMain">
                  <label htmlFor="">Customer</label>
                  <input
                    value={`${capitalizeFirstLetter(
                      ticket[0]?.customer?.firstname
                    )} ${capitalizeFirstLetter(ticket[0]?.customer?.lastname)}`}
                    type="text"
                    disabled
                  />
                </div>

                <div className="ticketmodalInputWrapMain">
                  <label htmlFor="">Category</label>
                  <select name="" id="">
                    <option value="">Select Category</option>
                    {Category?.map((data) => {
                      return (
                        <option key={data.id} value={data?.id}>
                          {data?.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>

              <div className="ticketmodalInput-OneCol">
                <div className="ticketmodalInputWrapMainOne">
                  <label htmlFor="">Subject</label>
                  <input
                    type="text"
                    value={`${saveTicket.subject} `}
                    type="text"
                    disabled
                  />
                </div>
              </div>

              <div className="descriptionWrap">
                <label htmlFor="">Description</label>
                <textarea
                  style={{ padding: "10px" }}
                  name=""
                  id=""
                  value={`${saveTicket?.description?.map((data) => {
                    return data?.plain_response;
                  })} `}
                ></textarea>
              </div>

              <div className="closeTicketModdalj">
                <select name="" id="">
                  <option value="">Close chat</option>
                  <option value="Save as in progress">
                    Save as in progress
                  </option>
                  <option value="Save as closed">Save as closed</option>
                </select>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
