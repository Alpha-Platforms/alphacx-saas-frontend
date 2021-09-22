import React, { useState, useEffect } from "react";
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
import { dateFormater, timeFormater } from "../../helpers/dateFormater";
import capitalizeFirstLetter from "../../helpers/capitalizeFirstLetter";
export default function SigleChat({
  ticket,
  SenderInfo,
  setMessageSenderId,
  Statues,
  upTicketStatus,
  setshowUserProfile,
  setopenSaveTicketModal,
  openSaveTicketModal,
  msgHistory,
  UserInfo,
}) {
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
          {SenderInfo?.customer?.avatar ? (
            <img src={SenderInfo?.customer?.avatar} alt="" />
          ) : (
            <div className="singleChatSenderImg">
              <p>{`${SenderInfo?.customer?.firstname?.slice(0,1)}${SenderInfo?.lastname == "default"? "" : SenderInfo?.customer?.lastname?.slice(0, 1)}`}</p>
            </div>
          )}
          <div className="single-chat-user-name">
            <p>{`${capitalizeFirstLetter(
              SenderInfo?.customer?.firstname
            )} ${capitalizeFirstLetter(SenderInfo?.customer?.lastname)}`}</p>
            <p>{`Via ${ticket[0].channel} (${dateFormater(
              ticket[0].updated_at
            )})`}</p>
          </div>
        </div>
        <div className="alignt-action-right-single">
          <div className="action-on-d-single-chat">
            <select
              name=""
              id=""
              onChange={(e) => upTicketStatus(e.target.value)}
            >
              <option value="">Mark As</option>
              {Statues?.map((data) => {
                return <option value={data.id}>{data.status}</option>;
              })}
            </select>
          </div>
          <div className="single-chat-swap-icon">
            <Swap />
          </div>

          <div className="single-chat-swap-icon">
            <AddToChat />
          </div>

          <div
            className="single-chat-swap-icon"
            onClick={() => setshowUserProfile(true)}
          >
            <UserChatIcon />
          </div>

          <div
            className="single-chat-swap-icon"
            onClick={() => setopenSaveTicketModal(!openSaveTicketModal)}
          >
            <CheclkChat />
          </div>
        </div>
      </div>

      <div className="singleChatMessage">
        <h3> {ticket[0]?.subject}</h3>
        <div className="singleChatMessage-tiketId">Ticket ID: #53467</div>
      </div>
      <div className="singleChat-line-br"></div>
      <div className="chats-body">
        <div className="sender-full-message-body">
          {ticket[0]?.plain_description}
        </div>
        <div className="msgTime-single">
          {dateFormater(ticket[0].updated_at)}
        </div>

        <div className="siglechat-hr"></div>
        {noResponseFound ? (
          <p
            style={{
              textAlign: "center",
              paddingTop: "30px",
              paddingBottom: "30px",
            }}
          >
            <NoChatFound value="No response found" />
          </p>
        ) : (
          <div className="chat-response" style={{ marginTop: "20px" }}>
            {ticket.map((data) => {
              return msgHistory.map((e) => {
                return (
                  <div className="single-msg-container">
                    <div
                      className="singleChat-Sender-img"
                      style={{ position: "relative" }}
                    >
                      {e?.user?.avatar == null ? (
                        <div className="singleChat-Sender-imgNoImg">
                          <p>{`${capitalizeFirstLetter(
                            e?.user?.firstname?.slice(0, 1)
                          )} ${capitalizeFirstLetter(
                            e?.user?.lastname?.slice(0, 1)
                          )}`}</p>
                        </div>
                      ) : (
                        <img src={e?.user?.avatar} alt="" />
                      )}

                      <div className="single-chat-user-name">
                        <p style={{ color: "#006298" }}>
                          {`${e?.user?.firstname} ${e?.user?.lastname}`}{" "}
                          <span style={{ color: "#656565" }}>replied</span>
                        </p>
                        <p>{`Via ${ticket[0].channel} (${dateFormater(
                          e?.created_at
                        )})`}</p>
                      </div>
                    </div>
                    <div className="single-chat-response">
                      <div
                        dangerouslySetInnerHTML={createMarkup(e?.response)}
                      />
                    </div>
                  </div>
                );
              });
            })}
          </div>
        )}
      </div>
    </div>
  );
}
