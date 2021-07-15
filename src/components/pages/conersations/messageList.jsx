import React from "react";
import pic from "../../../assets/imgF/codeuiandyimg.png";
import truncateWithEllipses from "../../helpers/truncate";
import ClipLoader from "react-spinners/ClipLoader";
export default function MessageList({ tickets, LoadingTick }) {
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
      ) : (
        tickets.map((data) => {
          return (
            <div className="message-listmain">
              <div className="message-user-img">
                <img src={data.customer.avatar} alt="" />
                <div className="user-status-online"></div>
              </div>
              <div className="message-user-body">
                <p className="senderName">{`${data.customer.firstname} ${data.customer.lastname}`}</p>
                <p className="senderMSG">
                  {data.customer.description == null
                    ? ""
                    : truncateWithEllipses(data.customer.description, 30)}
                </p>
                <div className="msg-badges">
                  <span>Whatsapp</span>
                  <span>{data.status.status}</span>
                </div>
              </div>
              <div className="message-user-time">
                <p className="msGtime">05:51</p>
                <p className="msgCountCon">4</p>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
