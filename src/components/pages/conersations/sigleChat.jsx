import React from "react";
import pic from "../../../assets/imgF/codeuiandyimg.png";
import {
  Swap,
  AddToChat,
  UserChatIcon,
  CheclkChat,
} from "../../../assets/images/svgs";
export default function SigleChat() {
  return (
    <div>
      <div className="single-chat-home-header">
        <div className="singleChat-Sender-img" style={{ position: "relative" }}>
          <img src={pic} alt="" />

          <div className="single-chat-user-name">
            <p>Okeke Andrew</p>
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
        <h3>How can I get a refund for my order?</h3>
        <div className="singleChatMessage-tiketId">Ticket ID: #53467</div>
      </div>
      <div className="singleChat-line-br"></div>
      <div className="sender-full-message-body">
        Hi there, <br />I need a refund for the headphones that I purchased last
        week. My order ID is #53467. The product was <br />
        damaged when I received it. Can you please tell me how I can get a
        refund? <br />
        Best,
        <br /> Jerome.
      </div>
    </div>
  );
}
