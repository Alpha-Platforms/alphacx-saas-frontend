import React, { useState, useEffect } from "react";
import truncateWithEllipses from "../../helpers/truncate";
import ScaleLoader from "react-spinners/ScaleLoader";
import moment from "moment";
import { timeFormater } from "../../helpers/dateFormater";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
import InitialsFromString from "../../helpers/InitialsFromString";

export default function MessageList({
  tickets,
  LoadingTick,
  setLoadingTicks,
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
  const [loadingTickets, setLoadingTickets] = useState(true);

  useEffect(() => {
    setLoadingTicks(true);
    checkRender();//, [filterChat, tickets, filterTicketsState]
  }, [filterChat, tickets, filterTicketsState]);

  useEffect(() =>{
    setLoadingTicks(false);
  }, [renderTicket]);

  useEffect(() =>{
    if(LoadingTick == false){
      setLoadingTickets(false);
    }
  }, [LoadingTick]);

  const checkRender = () => {
    if (filterChat === "system") {
      setRenderTicket(tickets);
    } else {
      setRenderTicket(filterTicketsState);
    }
  };

  const getChannelColor = (channel, placement = "foreground") => {
    channel = channel.toLowerCase();
    let obj = {
        "facebook": "#1877F2", 
        "email": "#2B304D", 
        "whatsapp": "#075e54",
        "sms": "#F22F46",
        "helpdesk": "#4A154B",
        "livechat": "#1A1D33",
        "system": "#F00073",
        "others": "#2E2E2E"
    };
    if(Object.keys(obj).some(function(k){ return ~k.indexOf(channel) })){
        if((placement === "foreground")) { 
            return Object.entries(obj).find(([k, v]) => k.startsWith(channel))[1]
        }
        return `${Object.entries(obj).find(([k, v]) => k.startsWith(channel))[1]}16`
    }else{ 
      if(placement === "foreground"){
        return obj.others
      }else{
        return `${obj.others}16`
      }
    }
  }

  const formatDate = (date) =>{
    let formatedDate = "";
    if(moment(`${date}`).format("DD/MM/YYYY") == moment(new Date()).format("DD/MM/YYYY")){
      formatedDate = moment(`${date}`).format('LT'); 
    } else{
      formatedDate = moment(`${date}`).format('Do MMM, yyyy')
    }
    return( formatedDate );
  }

  return (
    <div className="message-list-container">
      {loadingTickets?
        <div className="d-flex justify-content-center align-items-center pt-5 away">
          {" "}
          <ScaleLoader color="#0d4166" loading={loadingTickets} size={35} />
        </div>
          : Array.isArray(renderTicket) ? (renderTicket.length == 0 ? (
          <div className="d-flex justify-content-center align-items-center pt-5 away">
            {/* <p className="text-center pt-5 lead h4">
              No ticket found
            </p> */}
            {" "}
            <ScaleLoader color="#0d4166" loading={true} size={35} />
          </div>
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
              }}
              id="msgListTop"
            >
              <div className="message-user-img">
                {data?.customer?.avatar == null ? (
                  <div className="message-user-noimg">
                    <span>{InitialsFromString(`${data?.customer?.firstname == "default" || !data?.customer?.firstname? "" : data?.customer?.firstname}`, `${data?.customer?.lastname == "default" || !data?.customer?.lastname ? "" : data?.customer?.lastname}`)}</span>
                  </div>
                ) : (
                  <img src={data?.customer?.avatar} alt="" />
                )}
                <div className="user-status-online"></div>
              </div>
              <div className="message-user-body">
                <p className="senderName">
                  {`${!data?.customer?.firstname || data?.customer?.firstname == "default"? "" : capitalizeFirstLetter(data?.customer?.firstname )} 
                  ${!data?.customer?.lastname || data?.customer?.lastname == "default"? "" : capitalizeFirstLetter(data?.customer?.lastname)}`}
                </p>
                <p className="senderMSG text-truncate" style={{ "maxWidth": "160px" }}>
                  {(!Array.isArray(data.history)) ? ""
                    : (data.history.length == 0)? "" 
                    : (data.history[0].plain_response === null || data.history[0].plain_response === undefined ) ? "" 
                    : data.history[0].plain_response
                  }
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
                <p className="msGtime">{formatDate(data.updated_at)}</p>
              </div>
            </div>
          );
        })
      )) : 
        <p className="text-center pt-5 lead h4">
          No ticket found
        </p> }
    </div>
  );
}