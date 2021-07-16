import React, { useState, useEffect } from "react";
import "./conversation.css";
import MessageList from "./messageList";
import searchIcon from "../../../assets/imgF/Search.png";
import NoChatFound from "./noChatFound";
import SingleChatOpen from "./sigleChat";
import { httpGetMain } from "../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import ClipLoader from "react-spinners/ClipLoader";
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

  const [loadSelectedMsg, setloadSelectedMsg] = useState("");
  const [tickets, setTickets] = useState([]);
  const [ticket, setTicket] = useState([]);
  const [LoadingTick, setLoadingTicks] = useState(true);
  const [loadSingleTicket, setLoadSingleTicket] = useState(false);
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
      return NotificationManager.error(res.er.message, "Error", 4000);
    }
  };

  const loadSingleMessage = async ({ id }) => {
    setLoadSingleTicket(true);
    setTicket([]);
    const res = await httpGetMain(`tickets/${id}`);
    if (res.status == "success") {
      setTicket(res?.data[0]?.history);
      console.log("his>>>", res?.data[0]?.history);
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
          />
        </div>

        <div
          className="conversation-layout-col-two"
          style={{ position: "relative" }}
        >
          {/* {loadSingleTicket ? (
           
          ) : ticket.length === 0 ? ( */}
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
          ) : typeof ticket !== "undefined" && ticket.length === 0 ? (
            <NoChatFound />
          ) : (
            <SingleChatOpen ticket={ticket} />
          )}

          {/* ) : ( */}

          {/* )} */}
        </div>
      </div>
    </div>
  );
}
