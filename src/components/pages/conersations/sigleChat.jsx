import React, { useState, useEffect } from "react";
import pic from "../../../assets/imgF/codeuiandyimg.png";
import {
  Swap,
  AddToChat,
  UserChatIcon,
  CheclkChat,
} from "../../../assets/images/svgs";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import MyCustomUploadAdapterPlugin from "./UploadAdapter";
import NoChatFound from "./noChatFound";
export default function SigleChat({ ticket, SenderInfo, replyTicket }) {
  useEffect(() => {
    // getTicketMsg();
    checkRes();
  }, []);
  // const getTicketMsg = () => {
  //   console.log("user>>>>>", ticket);
  //   const getJson = ticket.map((data) => {
  //     const parseData = JSON.parse(data?.response);
  //     console.log(">>>FROMfUN>>>>", parseData?.ops);
  //     setResponse(parseData?.ops);
  //   });
  // };
  const [noResponseFound, setNoResponseFound] = useState(true);
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
  return (
    <div>
      <div className="single-chat-home-header fixed-header-singleChat">
        <div className="singleChat-Sender-img" style={{ position: "relative" }}>
          <img src={SenderInfo?.customer?.avatar} alt="" />

          <div className="single-chat-user-name">
            <p>{`${SenderInfo?.customer?.firstname} ${SenderInfo?.customer?.lastname}`}</p>
            <p>Via email (Sat, 13 Mar 2021 at 10:54 AM)</p>
          </div>
        </div>
        <div className="alignt-action-right-single">
          <div className="action-on-d-single-chat">
            <select name="" id="">
              <option value="">All</option>
              <option value="">Open</option>
              <option value="">In Progress</option>
              <option value="">Closed</option>
            </select>
          </div>
          <div className="single-chat-swap-icon">
            <Swap />
          </div>

          <div className="single-chat-swap-icon">
            <AddToChat />
          </div>

          <div className="single-chat-swap-icon">
            <UserChatIcon />
          </div>

          <div className="single-chat-swap-icon">
            <CheclkChat />
          </div>
        </div>
      </div>

      <div className="singleChatMessage">
        <h3>{SenderInfo?.subject}</h3>
        <div className="singleChatMessage-tiketId">Ticket ID: #53467</div>
      </div>
      <div className="singleChat-line-br"></div>
      <div className="chats-body">
        <div className="sender-full-message-body">
          {SenderInfo?.customer?.description}
        </div>
        <div className="msgTime-single">13 Mar 2021 </div>

        <div className="siglechat-hr"></div>
        {noResponseFound ? (
          <p
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <NoChatFound value="No response found " />
          </p>
        ) : (
          <div className="chat-response" style={{ marginTop: "20px" }}>
            {ticket?.map((data) => {
              return (
                <div className="single-msg-container">
                  <div
                    className="singleChat-Sender-img"
                    style={{ position: "relative" }}
                  >
                    <img src={data?.customer?.avatar} alt="" />

                    <div className="single-chat-user-name">
                      <p style={{ color: "#006298" }}>
                        {`${data?.customer?.firstname} ${data?.customer?.lastname}`}{" "}
                        <span style={{ color: "#656565" }}>replied</span>
                      </p>
                      <p>Via email (Sat, 13 Mar 2021 at 10:54 AM)</p>
                    </div>
                  </div>
                  <div className="single-chat-response">
                    {data?.history.map((history) => {
                      return (
                        <div
                          dangerouslySetInnerHTML={createMarkup(
                            history?.response
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
