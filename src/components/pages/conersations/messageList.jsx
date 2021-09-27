import React, { useState, useEffect } from "react";
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
    checkRender();//, [filterChat, tickets, filterTicketsState]
  });
  const checkRender = () => {
    if (filterChat == "system") {
      setRenderTicket(tickets);
    } else {
      setRenderTicket(filterTicketsState);
    }
  };

    const getChannelColor = (channel, placement = "foreground") => {
      let obj = {
          "facebook": "#1877F2", 
          "email": "#2B304D", 
          "whatsapp": "#075e54",
          "sms": "#F22F46",
          "helpdesk": "#4A154B",
          "livechat": "#1A1D33",
          "system": "#F00073"
      };
      if(Object.keys(obj).some(function(k){ return ~k.indexOf(channel) })){
          if((placement === "foreground")) { 
              return Object.entries(obj).find(([k, v]) => k.startsWith(channel))[1];
          }
          return `${Object.entries(obj).find(([k, v]) => k.startsWith(channel))[1]}16`
      }
      return "#2e2e2e";
  }
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
                data.id === activeChat ? "message-listmain-active" : ""
              }`}
              onClick={() => {
                scollPosSendMsgList();
                loadSingleMessage(data);
                setTingleTicketFullInfo(data);
                setTicketId(data.id);
                setActiveChat(data.id);
                // setActiveChat(index + 1);
              }}
              id="msgListTop"
            >
              <div className="message-user-img">
                {data.customer.avatar == null ? (
                  <div className="message-user-noimg">
                    <span>{`${capitalizeFirstLetter(data?.customer?.firstname?.slice(0, 1))}${data?.customer?.lastname == "default"? "" : capitalizeFirstLetter(data?.customer?.lastname?.slice(0, 1))}`}
                    </span>
                  </div>
                ) : (
                  <img src={data?.customer?.avatar} alt="" />
                )}
                <div className="user-status-online"></div>
              </div>
              <div className="message-user-body">
                <p className="senderName">{`${capitalizeFirstLetter(
                  data?.customer?.firstname
                )} ${data?.customer?.lastname == "default"? "" : capitalizeFirstLetter(data?.customer?.lastname)}`}</p>
                <p className="senderMSG text-truncate" style={{ "maxWidth": "160px" }}>
                  {/* {truncateWithEllipses(data?.plain_description, 20)} */}
                  {/* {(Array.isArray(data.history)) ? data.history.length :  ""} */}
                  {(!Array.isArray(data.history)) ? ""
                    : (data.history.length == 0)? "" 
                    : (data.history[0].plain_response === null || data.history[0].plain_response === undefined ) ? "" 
                    : data.history[0].plain_response
                  }
                    {/* truncateWithEllipses(data.history.at(-1), 20) */}
                </p>
                <div className="msg-badges">
                  <div
                    style={{
                      background: getChannelColor(data.channel, "background"),
                      color: getChannelColor(data.channel),
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
                {(data?.__meta__?.unRead == 0 || data.id === activeChat) ? ("") 
                : ( <p className="msgCountCon">{data?.__meta__?.unRead}</p>)}
                <p className="msGtime">{timeFormater(data.updated_at)}</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
