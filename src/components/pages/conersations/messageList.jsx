import React from "react";
import pic from "../../../assets/imgF/codeuiandyimg.png";
export default function MessageList() {
  return (
    <div className="message-list-container">
      {[..."123456789"].map((data) => {
        return (
          <div className="message-listmain">
            <div className="message-user-img">
              <img src={pic} alt="" />
              <div className="user-status-online"></div>
            </div>
            <div className="message-user-body">
              <p className="senderName">Okeke Andrew</p>
              <p className="senderMSG">Amet minim mollit non dese runt...</p>
              <div className="msg-badges">
                <span>Whatsapp</span>
                <span>Open</span>
              </div>
            </div>
            <div className="message-user-time">
              <p className="msGtime">05:51</p>
              <p className="msgCountCon">4</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
