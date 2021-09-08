import React from "react";
import { useState, useEffect } from "react";
import HelpNavBar from "../../../Layout/helpNavBar";
import TotalCard from "../../dashboard/dashcards/totalCard";
import StarRating from "../components/starRating/starRating";
import TicketItem from "../components/ticket_item/TicketItem";
import TopBar from "../components/topBar/topBar";
import "./CustomerPortal.scss";
import {connect} from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {getCustTickets} from '../../../../reduxstore/actions/customerActions';

const CustomerPortal = () => {
  var emptyArea = [1, 2];

  const custId = '15c8c94e-0bc1-4619-9f7b-d685b41e84f9';


  const [custState, setCustState] = useState({
    custTickets: [],
    meta: null,
    isCustTicketsLoaded: false,
    isCustTicketsLoading: false,
    currentStatus: 'all'
  });

  useEffect(() => {
    (async () => {
      setCustState(prev => ({
        ...prev,
        isCustTicketsLoading: true
      }));
      const custRes = await getCustTickets(10, 1, custId);
      if (custRes) {
        console.log("Success Customer Response: ", custRes);
        setCustState(prev => ({
          ...prev,
          custTickets: custRes?.tickets,
          meta: custRes?.meta,
          isCustTicketsLoaded: true,
          isCustTicketsLoading: false
        }));
      }
    })()
  }, [])

  return (
    <>
      <HelpNavBar activeBG={true} />
      <TopBar />
      <div className="customer-portal">
        <div className="total-cards">
          <TotalCard title="Total Tickets" value={57} color={"#662D91"} />
          <TotalCard title="Overdue Tickets" value={57} color={"#FD7289"} />
          <TotalCard title="Resolved Tickets" value={57} color={"#6C4181"} />
        </div>
        <div className="tickets-container">
          <div className="tickets-list">
            <div className="top">
              <p style={{ marginRight: 30 }}>Support Tickets</p>
              <div className="tag">
                <p className="all">All</p>
              </div>
              <div className="tag">
                <p className="open">Open</p>
              </div>
              <div className="tag">
                <p className="approved">Approved</p>
              </div>
              <div className="tag">
                <p className="closed">Closed</p>
              </div>
            </div>

            {
              !custState.isCustTicketsLoaded ? <div className="text-center pt-3"><ScaleLoader loading={true} color={"#006298"}/></div> : custState.custTickets.length === 0 ? <div>No Tickets yet.</div> : custState.custTickets.map((ticket, i) => (
              <TicketItem key={i} ticket={ticket} />
            ))
            }
          </div>
          <div className="submit-ticket">
            <p className="title">Submit a Ticket</p>
            <p>
              Providing these details will help us resolve your question faster.
            </p>
            <form>
              <div className="form-group mt-3">
                <label for="slaName" className="f-14 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="slaName"
                />
              </div>
              <div className="form-group mt-3">
                <label for="ticket" className="f-14 mb-1">
                  Issue Type
                </label>
                <select className="form-select form-select-sm f-14" id="ticket">
                  <option>Complaints</option>
                  <option>Enquiry</option>
                  <option>Request</option>
                  <option>Delete Deduction</option>
                  <option>Service Pricing</option>
                  <option>Account Statement</option>
                </select>
              </div>
              <div className="form-group mt-3">
                <label for="Desc" className="f-14 mb-1">
                  Description
                </label>
                <textarea
                  className="form-control"
                  rows="4"
                  id="Desc"
                ></textarea>
              </div>
              <div className="form-group mt-3">
                <label for="Desc" className="f-14 mb-1">
                  Attachment (If Any)
                </label>
                <button className="add-file">Add file or drag file here</button>
              </div>
              <button className="btn btn-sm ms-2 f-12 bg-custom px-4 mt-3 mb-2">
                Submit
              </button>
            </form>
            <StarRating numOfStars={5} />
            <p className="mt-2">Does our service make you happy?</p>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  isCurrentCustomerLoaded: state.customer.isCurrentCustomerLoaded,
  currentCustomerTickets: state.customer.currentCustomerTickets,
  currentCustomerTicketsMeta: state.customer.currentCustomerTicketsMeta,
  isCurrentCustomerTicketsLoaded: state.customer.isCurrentCustomerTicketsLoaded,
  currentCustomer: state.customer.currentCustomer
});

export default connect(mapStateToProps, null)(CustomerPortal);
