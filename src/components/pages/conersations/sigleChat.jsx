import React from "react";
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
export default function SigleChat({ ticket }) {
  return (
    <div>
      <div className="single-chat-home-header fixed-header-singleChat">
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
      <div className="chats-body">
        <div className="sender-full-message-body">
          Hi there, <br />I need a refund for the headphones that I purchased
          last week. My order ID is #53467. The product was <br />
          damaged when I received it. Can you please tell me how I can get a
          refund? <br />
          Best,
          <br /> Jerome.
        </div>
        <div className="msgTime-single">13 Mar 2021 </div>

        <div className="siglechat-hr"></div>

        <div className="chat-response" style={{ marginTop: "20px" }}>
          {ticket?.map((data) => {
            {
              console.log(JSON.parse(data.response));
            }
            return (
              <div className="single-msg-container">
                <div
                  className="singleChat-Sender-img"
                  style={{ position: "relative" }}
                >
                  <img src={data.user.avatar} alt="" />

                  <div className="single-chat-user-name">
                    <p style={{ color: "#006298" }}>
                      {`${data.user.firstname} ${data.user.lastname}`}{" "}
                      <span style={{ color: "#656565" }}>replied</span>
                    </p>
                    <p>Via email (Sat, 13 Mar 2021 at 10:54 AM)</p>
                  </div>
                </div>
                <div className="single-chat-response">
                  {/* {JSON.parse(data.response).map((t) => {
                  t.insert;
                })} */}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-3 single-chat-ckeditor">
          <CKEditor
            editor={ClassicEditor}
            onInit={(editor) => {}}
            config={{
              extraPlugins: [MyCustomUploadAdapterPlugin],
              //  ckfinder:{uploadUrl: "https://ckeditor.com/apps/ckfinder/3.5.0/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json"}
              // ckfinder:{uploadUrl: "https://api.cloudinary.com/v1_1/lms-center/upload"}
            }}
            onChange={(e, editor) => {
              //   setArticleBody(editor.getData());
              //   console.log(editor.getData());
            }}
          />

          <div className="sendMsg">
            <button>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
