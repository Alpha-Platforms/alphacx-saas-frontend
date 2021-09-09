import React from "react";
import { useState, useEffect, Fragment } from "react";
import HelpNavBar from "../../../Layout/helpNavBar";
import TotalCard from "../../dashboard/dashcards/totalCard";
import StarRating from "../components/starRating/starRating";
import TicketItem from "../components/ticket_item/TicketItem";
import TopBar from "../components/topBar/topBar";
import "./CustomerPortal.scss";
import {connect} from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {getCustTickets} from '../../../../reduxstore/actions/customerActions';
import {Pagination} from 'react-bootstrap';


const TicketPagination = ({currentPage, numberOfPages, handleTicketPagination}) => {
  const pageArr = [];

  for (let page = 1; page <= numberOfPages; page++) {
      if(page === currentPage) {
        pageArr.push(<li className="page-item active"><span className="page-link">{page}</span></li>)
      } else {

        switch (page) {
          case 1:
          case 2:
          case (currentPage+1):
          case (currentPage-1):
          case 10:
          case 20:
          case 30:
          case numberOfPages:

          pageArr.push(<li className="page-item"><span className="page-link" onClick={() => handleTicketPagination(page)}>{page}</span></li>)

            break;
            
          default:

          if (pageArr[pageArr.length - 1] !== 'empty') {

            pageArr.push('empty')

          }
            break;
        }
      }
  }


  return <nav aria-label="ticket pagination">
      <ul className="pagination">
        <li className={`page-item ${currentPage <= 1 ? 'disabled' : ''}`}>
          <span className="page-link" onClick={() => currentPage > 1 && handleTicketPagination(currentPage - 1)}>Previous</span>
        </li>
       {pageArr.map(x => <Fragment>
         {x === 'empty' ? <li className="page-item disabled"><span className="page-link" href="#">...</span></li> : x}
       </Fragment>)}
       <li className={`page-item ${currentPage >= numberOfPages ? 'disabled' : ''}`}>
          <span className="page-link" onClick={() => currentPage < numberOfPages && handleTicketPagination(currentPage + 1)}>Next</span>
        </li>
      </ul>
  </nav>
}

const CustomerPortal = ({statuses}) => {
  var emptyArea = [1, 2];

  const custId = '15c8c94e-0bc1-4619-9f7b-d685b41e84f9';


  const [custState, setCustState] = useState({
    custTickets: [],
    meta: null,
    isCustTicketsLoaded: false,
    isCustTicketsLoading: false,
    noPerPage: 10,
    currentStatus: ''
  });

  useEffect(() => {
    console.log('current status just changed');

  }, [custState.currentStatus])

  useEffect(() => {
    (async () => {
      setCustState(prev => ({
        ...prev,
        isCustTicketsLoading: true
      }));
      const custRes = await getCustTickets(custState.noPerPage, 1, custId);
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
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleTicketPagination = async (page) => {
    setCustState(prev => ({
      ...prev,
      isCustTicketsLoading: true,
      isCustTicketsLoaded: false
    }));
    const custRes = await getCustTickets(custState.noPerPage, page, custId, custState.currentStatus);
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
  }

  const getStatusColor = (id) => {
    if (id) {
      switch (id.slice(0, 13)) {
        case "23838da6-0566":
          return "orange";
        case "dafcab89-2b7f":
          return "green";
        case "23838ae4-1223":
          return "yellow";
        case "23838da6-1223":
          return "awaiting";
        case "23838ec5-0566":
          return "red";
        default:
          return "";
      }
    }
  };

  const handleStatusClick = async (status) => {
      setCustState(prev => ({
        ...prev,
        currentStatus: status?.id || '',
        isCustTicketsLoaded: false,
        isCustTicketsLoading: true
      }));
      const custRes = await getCustTickets(custState.noPerPage, 1, custId, status?.id);
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
  }

  return (
    <>
      <HelpNavBar activeBG={true} />
      <TopBar />
      <div className="customer-portal">
        <div className="total-cards">
          <TotalCard title="Total Tickets" value={custState.meta?.totalItems || 0} color={"#662D91"} />
          <TotalCard title="Overdue Tickets" value={57} color={"#FD7289"} />
          <TotalCard title="Resolved Tickets" value={57} color={"#6C4181"} />
        </div>
        <div className="tickets-container">
          <div className="tickets-list">
            <div className="top">

              <p style={{ marginRight: 30 }}>Support Tickets</p>

              <div className="statuses">
                <div className="tag">
                  <p className={`all ${custState.currentStatus === '' ? 'active' : ''}`} onClick={() => handleStatusClick('')}>All</p>
                </div>
                {statuses && statuses.map(status => <div className="tag">
                  <p className={`${getStatusColor(status?.id)} ${custState.currentStatus === status?.id ? 'active' : ''}`} onClick={() => handleStatusClick(status)}>{status?.status}</p>
                </div>)}
              </div>
            </div>

            {
              !custState.isCustTicketsLoaded ? <div className="text-center pt-3"><ScaleLoader loading={true} color={"#006298"}/></div> : custState.custTickets.length === 0 ? <div>No Tickets yet.</div> : custState.custTickets.map((ticket, i) => (
              <TicketItem key={i} ticket={ticket} getStatusColor={getStatusColor} />
            ))
            }
            <div className="mt-4">
            {custState.isCustTicketsLoaded && <div>Showing 1-10 of {custState.meta?.totalPages} entries</div>}
            <div className="float-end mt-2">
                {custState.isCustTicketsLoaded && <TicketPagination numberOfPages={custState.meta?.totalPages || 1} currentPage={custState.meta?.currentPage || 1} handleTicketPagination={handleTicketPagination} />}
            </div>
            </div>
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
  statuses: state.status.statuses
});

export default connect(mapStateToProps, null)(CustomerPortal);
