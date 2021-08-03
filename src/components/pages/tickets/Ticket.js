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

                        Right side

                        

                    </div>

                </div>}

        </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketLoaded: state.ticket.isTicketLoaded, isCurrentTicketLoaded: state.ticket.isCurrentTicketLoaded, currentTicket: state.ticket.currentTicket});

export default connect(mapStateToProps, {getCurrentTicket})(Ticket);