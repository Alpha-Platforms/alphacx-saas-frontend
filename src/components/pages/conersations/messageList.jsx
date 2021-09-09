import React, { useState, useEffect } from "react";
// import pic from "../../../assets/imgF/codeuiandyimg.png";
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
  activeChat,
  setActiveChat,
  scollPosSendMsgList,
}) {
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
      ) : renderTicket.length === 0 ? (
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
                index + 1 === activeChat ? "message-listmain-active" : ""
              }`}
              onClick={() => {
                scollPosSendMsgList();
                loadSingleMessage(data);
                setTingleTicketFullInfo(data);
                setTicketId(data.id);
                setActiveChat(index + 1);
              }}
              id="msgListTop"
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
                  {truncateWithEllipses(data?.plain_description, 20)}
                  {/* {(Array.isArray(data.history)) ? data.history.length :  ""} */}
                  {/* {(!Array.isArray(data.history)) ? ""
                    : (data.history.at(-1).response === null || data.history.at(-1).response === undefined ) ? "no text" 
                    : truncateWithEllipses(data.history.at(-1).response, 20)
                  } */}
                </p>
                <div className="msg-badges">
                  <div
                    style={{
                      background: data.status.background_color,
                      color: data.status.forecolor,
                    }}
                  >
                    {data.channel}
                  </div>

                  <div
                    style={{
                      background: data.status.background_color,
                      color: data.status.forecolor,
                    }}
                  >
                    {data.status.status}
                  </div>
                </div>
              </div>
              <div className="message-user-time">
                {data?.__meta__?.history_count == 0 ? (
                  ""
                ) : (
                  <p className="msgCountCon">{data?.__meta__?.history_count}</p>
                )}

                <p className="msGtime">{timeFormater(data.updated_at)}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
