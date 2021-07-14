import React, { useState, useEffect } from "react";
import "./conversation.css";
import MessageList from "./messageList";
import searchIcon from "../../../assets/imgF/Search.png";
import NoChatFound from "./noChatFound";
import SingleChatOpen from "./sigleChat";
import { httpGetMain } from "../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
export default function Conversation() {
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
  const [tickets, setTickets] = useState([]);
  const [LoadingTick, setLoadingTicks] = useState(true);
  useEffect(() => {
    getTickets();
  }, []);

  const getTickets = async () => {
    const res = await httpGetMain("tickets");
    if (res.status == "success") {
      setTickets(res.data.tickets);
      setLoadingTicks(false);
    } else {
      setLoadingTicks(false);
      return NotificationManager.error(res.message, "Error", 4000);
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
          <MessageList tickets={tickets} LoadingTick={LoadingTick} />
        </div>

        <div
          className="conversation-layout-col-two"
          style={{ position: "relative" }}
        >
          <SingleChatOpen />
          {/* <NoChatFound /> */}
        </div>
      </div>
    </div>
  );
}
