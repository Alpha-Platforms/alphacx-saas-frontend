import React from "react";
import NoChatSvg from "../../../assets/imgF/noChat.png";
export default function noChatFound({ value }) {
  return (
    <div className="no-chant-found-container">
      <img src={NoChatSvg} alt="" />
      {/* <p>You have no active chat yet</p> */}
      <p>{value}</p>
    </div>
  );
}
