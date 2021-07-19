import React, { useState, useEffect } from "react";
import "./conversation.css";
import MessageList from "./messageList";
import searchIcon from "../../../assets/imgF/Search.png";
import NoChatFound from "./noChatFound";
import SingleChatOpen from "./sigleChat";
import { httpGetMain, httpPostMain } from "../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import ClipLoader from "react-spinners/ClipLoader";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
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
  const [ReplyTicket, setReplyTicket] = useState({
    plainText: "",
    richText: "",
  });
  useEffect(() => {
    getTickets();
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
      // setTickets(res?.data?.tickets);
      // setLoadingTicks(false);
    } else {
      // setLoadingTicks(false);
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  const loadSingleMessage = async ({ id, customer, subject }) => {
    setSenderInfo({ customer, subject });
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
        <div className="conversation-layout-col-one">
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
                <option value="">Open</option>
                <option value="">In Progress</option>
                <option value="">Closed</option>
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
          />
        </div>

        <div
          className="conversation-layout-col-two"
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
              <SingleChatOpen
                ticket={ticket}
                SenderInfo={SenderInfo}
                replyTicket={replyTicket}
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
