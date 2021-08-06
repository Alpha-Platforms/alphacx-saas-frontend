import React from "react";
import StarRating from "../starRating/starRating";
import "./TicketItem.scss";

const TicketItem = () => {
  return (
    <div className="ticket-item">
      <p className="subject">How can I get a refund for my order?</p>
      <p className="ticket-det">Via email (Sat, 13 Mar 2021 at 10:54 AM)</p>
      <div className="ticket-id">
        <p>Ticket ID: #53467</p>
        <p className="tag open">Open</p>
      </div>
      <div className="rating">
        <p>Rate our support</p>
        <StarRating numOfStars={5} checked={4} />
      </div>
    </div>
  );
};

export default TicketItem;
