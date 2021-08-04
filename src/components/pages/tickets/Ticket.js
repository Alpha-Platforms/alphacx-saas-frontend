import {useState, Fragment, useEffect} from 'react';
import TicketIcon from '../../../assets/svgicons/Ticket.svg';
import WorkIcon from '../../../assets/svgicons/Work.svg';
import ProfileLightIcon from '../../../assets/svgicons/Profile-Light.svg';
import FolderIcon from '../../../assets/icons/Folder.svg';
import '../../../styles/Ticket.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getCurrentTicket} from '../../../reduxstore/actions/ticketActions';
import {getUserInitials} from '../../../helper';

const CircleIcon = (props) => <span className="cust-grey-circle"><img src={props.icon} alt="" className="pe-none"/></span>;

const Ticket = ({isTicketLoaded, getCurrentTicket, isCurrentTicketLoaded, currentTicket}) => {

    const {id} = useParams();

    useEffect(() => {
        // get current ticket when component mounts
        getCurrentTicket(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log("current ticket from tick", currentTicket);

    return (
        <Fragment>
            {!isCurrentTicketLoaded
                ? <div className="single-cust-loader"><ScaleLoader loading={true} color={"#006298"}/></div>
                : !currentTicket ? <div>No Ticket Found.</div> : <div
                    style={{
                    gridTemplateColumns: "280px 1fr"
                }}
                    className="d-grid mb-4">

                    <div
                        style={{
                        borderRight: '1px solid #f1f1f1'
                    }}
                        className="bg-primary py-5 px-3 bg-white">
                        <div className="user-initials-lg">
                            <div className="user-initials blue me-auto ms-auto">{getUserInitials(`${currentTicket.customer?.firstname} ${currentTicket.customer?.lastname}`)}</div>
                            <div className="text-center mt-3">
                                <h4 className="text-capitalize">{`${currentTicket.customer?.firstname} ${currentTicket.customer?.lastname}`}</h4>
                                <p className="text-muted">Gillette Group International</p>
                            </div>
                        </div>
                        <hr className="op-1"/> {/* <!-- Ticket date info --> */}
                        <div className="py-3">
                            <ul className="cust-profile-info">
                                <li>
                                    <div><CircleIcon icon={ProfileLightIcon}/></div>
                                    <div>
                                        <h6>Assignee</h6>
                                        <p className="text-muted text-capitalize">{`${currentTicket.assignee.firstname} ${currentTicket.assignee.lastname}`}</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={TicketIcon}/></div>
                                    <div>
                                        <h6>ID</h6>
                                        <p className="text-muted">{id?.slice(-8).toUpperCase()}</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={WorkIcon}/></div>
                                    <div>
                                        <h6>Priority</h6>
                                        <p className="text-muted">{currentTicket.priority?.name}</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={FolderIcon}/></div>
                                    <div>
                                        <h6>Stage</h6>
                                        <p className="text-muted">{currentTicket.status?.status}</p>
                                    </div>
                                </li>
                            </ul>

                        </div>

                        <hr className="op-1"/>

                        <div className="text-center mt-4">

                        </div>
                    </div>

                    <div
                        style={{
                        overflowX: "hidden"
                    }}
                        className="bg-secondary py-3 pt-0 bg-white">

<div className="col-md ps-0 pe-0">

<div className="">

  <div className="p-md-4">

    <div className="d-flex justify-content-start rounded-2 comment">
      <a href="#" className="conversation-avatar align-self-start acx-text-green">
        <img src="../assets/alphatickets/images/man.jpg" className="rounded-circle img-fluid" loading="lazy" alt=""/>
      </a>

      <div className="flex-grow-1 ms-2">
        <div className="d-flex justify-content-between">
          <div>                         
            <p className="text-at-blue mb-0">Marvin McKinney</p>
            <small className="fst-italic acx-fs-8">Via email (Sat, 13 Mar 2021 at 10:54 AM)</small>
          </div>
          <div className="d-flex justify-content-end flex-wrap">

            <div className="ms-2">
              <button className="btn btn-sm px-1">
                <object data="../assets/alphatickets/icons/swap.svg" className="icon-md" type="image/svg+xml"></object>
              </button>
              <button className="btn btn-sm px-1">
                <object data="../assets/alphatickets/icons/user_icon.svg" className="icon-md" type="image/svg+xml"></object>
              </button>
              <button id="openProfilePanel" className="btn btn-sm px-1">
                <object data="../assets/alphatickets/icons/user_rounded.svg" className="icon-md" type="image/svg+xml"></object>
              </button>
              <button data-bs-toggle="modal" data-bs-target="#closedChatModal" className="btn btn-sm px-1">
                <object data="../assets/alphatickets/icons/CheckCircle.svg" className="icon-md" type="image/svg+xml"></object>
              </button>
            </div>

          </div>
        </div>
        
      </div>

    </div>

    <div className="mt-2">
      <h6 className="mb-0 fw-bold">How can I get a refund for my order?</h6>
      <p className="small">Ticket ID: #53467</p>
    </div>

    <div className="border-top pt-2">
      <p>Hi there,</p>
      <p>I need a refund for the headphones that I purchased last week. My order ID is #53467. The product was damaged when I received it. Can you please tell me how I can get a refund?</p>
      <p>Best, <br/>Jerome.</p>

      <small className="text-muted acx-fs-8">13 Mar 2021</small>                    

    </div>
    
  </div>


  <div className="bg-at-blue-lighter border m-md-3 p-md-2 rounded">

    <div className="d-flex justify-content-start rounded-2 comment">
      <a href="#" className="conversation-avatar align-self-start acx-text-green">
        <img src="../assets/alphatickets/images/man.jpg" className="rounded-circle img-fluid" loading="lazy" alt=""/>
      </a>

      <div className="flex-grow-1 ms-2">
        <div className="d-flex justify-content-between">
          <div>                         
            <p className="text-at-blue mb-0">Hammed Daudu <span className="text-muted">sent an internal note to Steph Okafor & 23 Others</span></p>
            <small className="fst-italic acx-fs-8">16 days ago (Sat, 13 Mar 2021 at 12:45 PM)</small>
          </div>

          
        </div>
        
      </div>

    </div>

    <div>
      <p><span className="text-at-blue">@Steph okafor</span> Please could you take a look at this.</p>
    </div>
    
  </div>

  <div className="p-md-4">

    <div className="d-flex justify-content-start rounded-2 comment">
      <a href="#" className="conversation-avatar align-self-start acx-text-green">
        <img src="../assets/alphatickets/images/man.jpg" className="rounded-circle img-fluid" loading="lazy" alt=""/>
      </a>

      <div className="flex-grow-1 ms-2">
        <div className="d-flex justify-content-between">
          <div>                         
            <p className="text-at-blue mb-0">Hammed Daudu <span className="text-muted">replied</span></p>
            <small className="fst-italic acx-fs-8">16 days ago (Sat, 13 Mar 2021 at 12:45 PM)</small>
          </div>

          
        </div>
        
      </div>

    </div>
    
  </div>

  <div className="px-md-3 pb-md-3">
    

    <div className="border rounded-2">
      
      {/* <!-- addressbar --> */}
      <div className="address-wpr d-flex flex-wrap border-bottom py-1">
        
        <input type="hidden" value="foobar" className="address-value"/>
        <div className="input-group ">
          <div className="input-group-text border-0 bg-transparent p-0">
            <button type="button" className="btn btn-sm border-0">To:</button>
          </div>

          <input type="text" name="" id="addressInput" className="address-input flex-grow-1 border-0"/>

          <div className="input-group-text border-0 bg-transparent p-0">
            <button data-address-field="addressccContainer" type="button" className="addressButton btn btn-sm border-0">cc</button>
          </div>

          <div className="input-group-text border-0 bg-transparent p-0">
            <button data-address-field="addressbcContainer" type="button" className="addressButton btn btn-sm border-0">bb</button>
          </div>
        </div>

        <div id="addressccContainer" className="input-group hider">
          <div className="input-group-text border-0 bg-transparent p-0">
            <button type="button" className="btn btn-sm border-0">cc:</button>
          </div>

          <input type="text" name="" className="address-input flex-grow-1 border-0"/>
        </div>

        <div id="addressbcContainer" className="input-group hider">
          <div className="input-group-text border-0 bg-transparent p-0">
            <button type="button" className="btn btn-sm border-0">bc:</button>
          </div>

          <input type="text" name="" className="address-input flex-grow-1 border-0"/>
        </div>                    

      </div>
      {/* <!-- // addressbar --> */}

      <div id="editor"></div>
    </div>

    {/* <!-- Send button --> */}
    <div id="editorSendButton" className="btn-group dropup ms-auto position-relative">
      <button type="button" className="btn btn-sm bg-at-blue-light px-2">Send</button>
      <button type="button" className="btn btn-sm bg-at-blue-light px-2 border-start dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
        <span className="visually-hidden">Toggle Dropdown</span>
      </button>
      <ul className="dropdown-menu dropdown-menu-dark">
        <li className="bg-at-blue-light px-2 rounded-1"><a className="dropdown-item text-white" href="#">Send and Close</a></li>
        <li className="bg-at-blue-light px-2 rounded-1"><a className="dropdown-item text-white" href="#">Send as Comment</a></li>
      </ul>
    </div>

  </div>                

</div>
</div>

                        

                    </div>

                </div>}

        </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketLoaded: state.ticket.isTicketLoaded, isCurrentTicketLoaded: state.ticket.isCurrentTicketLoaded, currentTicket: state.ticket.currentTicket});

export default connect(mapStateToProps, {getCurrentTicket})(Ticket);