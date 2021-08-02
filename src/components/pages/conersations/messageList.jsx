import React, { useState, useEffect } from "react";
import pic from "../../../assets/imgF/codeuiandyimg.png";
import truncateWithEllipses from "../../helpers/truncate";
import ClipLoader from "react-spinners/ClipLoader";
import { timeFormater } from "../../helpers/dateFormater";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";

export default function MessageList({
  tickets,
  LoadingTick,
  loadSingleMessage,
  setTingleTicketFullInfo,
  setTicketId,
  filterChat,
  filterTicketsState,
}) {
  const [activeChat, setActiveChat] = useState(1);
  const [renderTicket, setRenderTicket] = useState([]);
  useEffect(() => {
    checkRender();
  }, [filterChat, tickets, filterTicketsState]);
  const checkRender = () => {
    if (filterChat == "system") {
      setRenderTicket(tickets);
    } else {
      setRenderTicket(filterTicketsState);
    }
  };
  return (
    <div className="message-list-container">
      {LoadingTick ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {" "}
          <ClipLoader color="#0d4166" loading={LoadingTick} size={35} />
        </div>
      ) : renderTicket.length == 0 ? (
        <p
          style={{ textAlign: "center", paddingTop: "20px", fontSize: "15px" }}
        >
          No ticket found
        </p>
      ) : (
        renderTicket.map((data, index) => {
          return (
            <div
              key={index}
              className={`message-listmain ${
                index + 1 == activeChat ? "message-listmain-active" : ""
              }`}
              onClick={() => {
                loadSingleMessage(data);
                setTingleTicketFullInfo(data);
                setTicketId(data.id);
                setActiveChat(index + 1);
              }}
            >
              <div className="message-user-img">
                {data.customer.avatar == null ? (
                  <div className="message-user-noimg">
                    <span>{`${capitalizeFirstLetter(
                      data?.customer?.firstname?.slice(0, 1)
                    )}${capitalizeFirstLetter(
                      data?.customer?.lastname?.slice(0, 1)
                    )}`}</span>
                  </div>
                ) : (
                  <img src={data?.customer?.avatar} alt="" />
                )}
                <div className="user-status-online"></div>
              </div>
              <div className="message-user-body">
                <p className="senderName">{`${capitalizeFirstLetter(
                  data?.customer?.firstname
                )} ${capitalizeFirstLetter(data?.customer?.lastname)}`}</p>
                <p className="senderMSG">
                  {data.customer.description == null
                    ? ""
                    : truncateWithEllipses(data.customer.description, 30)}
                </p>
                <div className="msg-badges">
                  <div
                    style={{
                      background: data.status.background_color,
                      color: data.status.forecolor,
                      // border: `1px solid ${data.status.forecolor}`,
                    }}
                    // className={`chMslist${data.channel}`}
                  >
                    {data.channel}
                  </div>

                  <div
                    style={{
                      background: data.status.background_color,
                      color: data.status.forecolor,
                      // border: `1px solid ${data.status.forecolor}`,
                    }}
                  >
                    {data.status.status}
                  </div>
                </div>
              </div>
              <div className="message-user-time">
                <p className="msgCountCon">4</p>
                <p className="msGtime">{timeFormater(data.updated_at)}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
