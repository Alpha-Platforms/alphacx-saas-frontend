import React, { useState, useEffect } from "react";
import "./conversation.css";
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

  const [loadSelectedMsg, setloadSelectedMsg] = useState("");
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [LoadingTick, setLoadingTicks] = useState(true);
  const [loadSingleTicket, setLoadSingleTicket] = useState(false);
  const [SenderInfo, setSenderInfo] = useState(false);
  const [singleTicketFullInfo, setTingleTicketFullInfo] = useState(false);
  const [Response, setResponse] = useState([]);
  const [editorState, setEditorState] = useState(initialState);
  const [firstTimeLoad, setfirstTimeLoad] = useState(true);
  const [MessageSenderId, setMessageSenderId] = useState("");
  const [TicketId, setTicketId] = useState("");
  const [ReplyTicket, setReplyTicket] = useState({
    plainText: "",
    richText: "",
  });
  const [Statues, setStatues] = useState([]);

  const [ChatCol, setChatCol] = useState({
    col1: "",
    col2: "",
  });
  useEffect(() => {
    getTickets();
  }, []);

  useEffect(() => {
    getStatues();
  }, []);

  const onEditorStateChange = (editorState) => {
    // handleDescriptionValidation(editorState);

    const plainText = editorState.getCurrentContent().getPlainText();
    const richText = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    setEditorState(editorState);
    setReplyTicket({ plainText, richText });
    console.log(">>>>", richText, richText);
  };
  const getTickets = async () => {
    const res = await httpGetMain("tickets");
    if (res?.status == "success") {
      setLoadingTicks(true);
      setTickets(res?.data?.tickets);
      setLoadingTicks(false);
    } else {
      setLoadingTicks(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const replyTicket = async (reply, attachment) => {
    console.log(reply);
    const data = {
      // type: "note",
      response: reply.richText,
      plainResponse: reply.plainText,
      // attachment: "",
    };
    console.log(data);
    const res = await httpPostMain(
      `tickets/${singleTicketFullInfo.id}/replies`,
      data
    );
    if (res?.status == "success") {
      ReloadloadSingleMessage();
      setEditorState(initialState);
      setReplyTicket({ plainText: "", richText: "" });
    } else {
      // setLoadingTicks(false);
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
      getTickets();
      setStatues(res?.data?.statuses);
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
    setMessageSenderId(id);
    setLoadSingleTicket(true);
    setTingleTicketFullInfo();
    setTicket([]);
    const res = await httpGetMain(`tickets/${id}`);
    setfirstTimeLoad(false);
    if (res.status == "success") {
      setTicket(res?.data);
      setLoadSingleTicket(false);
    } else {
      setLoadSingleTicket(false);
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };
  return (
    <div className="conversation-wrap">
      <div className="conversation-layout">
        <div className={`conversation-layout-col-one ${ChatCol.col1}`}>
          <div className="message-toggles">
            <div className="messageType">
              <select name="" id="">
                <option value="">All</option>
                <option value="">Facebook</option>
                <option value="">Whatsapp</option>
                <option value="">Email</option>
                <option value="">Live Chat</option>
              </select>
            </div>
            <div className="messageOpenClose">
              <select name="" id="">
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
          />
        </div>

        <div
          className={`conversation-layout-col-two ${ChatCol.col2}`}
          style={{ position: "relative" }}
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
              />

              <Editor
                editorState={editorState}
                toolbar={{
                  options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                    "image",
                    "remove",
                    "history",
                  ],
                  inline: {
                    inDropdown: true,
                  },
                  image: {
                    previewImage: true,
                  },
                  blockType: {
                    inDropdown: true,
                  },

                  list: {
                    inDropdown: true,
                  },
                  textAlign: {
                    inDropdown: true,
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
                <button onClick={() => replyTicket(ReplyTicket, "attachment")}>
                  Send
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
