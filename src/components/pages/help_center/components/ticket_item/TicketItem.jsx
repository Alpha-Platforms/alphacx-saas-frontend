import React from "react";
import StarRating from "../starRating/starRating";
import "./TicketItem.scss";
import moment from 'moment';

const TicketItem = ({ticket, getStatusColor}) => {
  return (
    <div className="ticket-item">
      <p className="subject">{ticket?.subject || ''}</p>
      {/* <p className="ticket-det">Via email (Sat, 13 Mar 2021 at 10:54 AM)</p> */}
      <p className="ticket-det">Via email ({moment(ticket?.updated_at).format('ddd, DD MMM, YYYY [at] hh:mm A')})</p>
      <div className="ticket-id">
        <p>Ticket ID: <span className="text-uppercase">#{ticket?.id?.slice(-8) || ''}</span></p>
        {ticket?.status && <p className={`tag status-tag ${getStatusColor(ticket?.status?.id)}`}>{ticket?.status?.status}</p>}
      </div>
      <div className="rating">
        <p>Rating</p>
        <StarRating numOfStars={5} checked={4} />
      </div>
    </div>
  );
};

export default TicketItem;
