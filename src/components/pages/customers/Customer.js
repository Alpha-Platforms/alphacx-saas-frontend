import {useState, Fragment, useEffect} from 'react';
import MessageIcon from '../../../assets/svgicons/Message.svg';
import TicketIcon from '../../../assets/svgicons/Ticket.svg';
import ShowIcon from '../../../assets/svgicons/Show.svg';
import WorkIcon from '../../../assets/svgicons/Work.svg';
import CallIcon from '../../../assets/svgicons/Call.svg';
import LocationIcon from '../../../assets/svgicons/Location.svg';
import ProfileLightIcon from '../../../assets/svgicons/Profile-Light.svg';
import DiscountIcon from '../../../assets/svgicons/Discount.svg';
import ImageDefault from '../../../assets/svgicons/image-default.svg';
import {Tabs, Tab, Button} from 'react-bootstrap';
import '../../../styles/Customer.css';
import {Link} from 'react-router-dom';
import {CKEditor} from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ScaleLoader from 'react-spinners/ScaleLoader';
import {connect} from 'react-redux';
import {useParams} from 'react-router-dom';
import {getCurrentCustomer} from '../../../reduxstore/actions/customerActions';
import {getUserInitials} from '../../../helper';
import TicketHistory from './components/TicketHistory';
import Notes from './components/Notes';
import Timeline from './components/Timeline';

const CircleIcon = (props) => <span style={{ backgroundColor: props.color }} className="cust-grey-circle"><img src={props.icon} alt="" className="pe-none"/></span>;

const Customer = ({isCustomerLoaded, getCurrentCustomer, isCurrentCustomerLoaded, currentCustomer}) => {

    const {id} = useParams();

    const [tabKey,
        setTabKey] = useState('ticket-history');
    const [showUpdate,
        setShowUpdate] = useState(false);

    const customers = [
        {
            date: '02 Jul, 2021',
            ticket_id: '0721115',
            subject: 'How do I get a refund?',
            category: 'Enquiry',
            agent_assigned: 'Munachi',
            status: 'Pending'
        }, {
            date: '02 Jul, 2021',
            ticket_id: '0721115',
            subject: 'How do I get a refund?',
            category: 'Enquiry',
            agent_assigned: 'Munachi',
            status: 'Closed'
        }, {
            date: '02 Jul, 2021',
            ticket_id: '0721115',
            subject: 'How do I get a refund?',
            category: 'Enquiry',
            agent_assigned: 'Munachi',
            status: 'Overdue'
        }, {
            date: '02 Jul, 2021',
            ticket_id: '0721115',
            subject: 'How do I get a refund?',
            category: 'Enquiry',
            agent_assigned: 'Munachi',
            status: 'Pending'
        }
    ];

    useEffect(() => {

        getCurrentCustomer(id);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCustomerLoaded])

    const getStatusColor = status => {
        let output;
        switch (status.toLowerCase()) {
            case 'pending':
                output = 'yellow';
                break;
            case 'overdue':
                output = 'red';
                break;
            case 'closed':
                output = 'green';
                break;
            default:
        }
        return output;
    }

    return (
        <Fragment>
            {!isCurrentCustomerLoaded
                ? <div className="single-cust-loader"><ScaleLoader loading={true} color={"#006298"}/></div>
                : !currentCustomer ? <div>No Customer Found.</div> : <div
                    style={{
                    gridTemplateColumns: "280px 1fr",
                    border: '1px solid #f1f1f1'
                }}
                    className="d-grid mb-4">

                    <div
                        style={{
                        borderRight: '1px solid #f1f1f1'
                    }}
                        className="bg-primary py-5 pt-4 px-3 bg-white">
                        <div className="user-initials-lg">
                            {currentCustomer?.avatar ? <div className="customer-avatar"><img src={currentCustomer.avatar} alt='' /></div> : <div className="user-initials blue me-auto ms-auto">{getUserInitials(`${currentCustomer.firstname} ${currentCustomer.lastname}`)}</div>}
                            <div className="text-center mt-3">
                                <h4 style={{ textTransform: 'capitalize' }}>{`${currentCustomer.firstname} ${currentCustomer.lastname}`}</h4>
                                <p className="text-muted">jackmay@gmail.com</p>
                            </div>
                        </div>
                        <hr className="op-1"/> {/* <!-- Customer date info --> */}
                        <div className="py-3">
                            <ul className="cust-profile-info">
                                <li>
                                    <div><CircleIcon icon={WorkIcon}/></div>
                                    <div>
                                        <h6>Account ID</h6>
                                        <p className="text-muted">{id?.slice(0, 8).toUpperCase()}</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon color="rgba(186, 104, 200, 0.25)" icon={CallIcon}/></div>
                                    <div>
                                        <h6>Work Phone</h6>
                                        <p className="text-muted">{currentCustomer.phone_number}</p>
                                    </div>
                                </li>
                                {/* <li>
                                    <div><CircleIcon icon={MessageIcon}/></div>
                                    <div>
                                        <h6>Email Address</h6>
                                        <p className="text-muted">{currentCustomer.email}</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={LocationIcon}/></div>
                                    <div>
                                        <h6>Location</h6>
                                        <p className="text-muted">Lagos, Nigeria</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={ProfileLightIcon}/></div>
                                    <div>
                                        <h6>Assignee</h6>
                                        <p className="text-muted">Adekunle Adebowale</p>
                                    </div>
                                </li>
                                <li>
                                    <div><CircleIcon icon={DiscountIcon}/></div>
                                    <div>
                                        <h6>Subscription Enquiry</h6>
                                        <p className="text-muted pb-0 mb-0">26-06-2022</p>
                                    </div>
                                </li> */}
                            </ul>
                            <div className={"table-tags text-justify"}><span className="badge rounded-pill acx-bg-purple-30 px-3 py-2 me-1 my-1 f-10">High Value</span><span className="badge rounded-pill acx-bg-blue-light-30 px-3 py-2 me-1 my-1 f-10">Billing</span><span className="badge rounded-pill acx-bg-red-30 px-3 py-2 me-1 my-1 f-10">Pharmaceuticals</span><span className="badge rounded-pill acx-bg-green-30 px-3 py-2 me-1 my-1 f-10">Active</span><span className="badge rounded-pill acx-bg-blue-light-30 px-3 py-2 me-1 my-1 f-10">Urgent</span><span className="badge rounded-pill acx-bg-red-30 px-3 py-2 me-1 my-1 f-10">Pharmaceuticals</span><span className="badge rounded-pill acx-bg-purple-30 px-3 py-2 me-1 my-1 f-10">High Value</span></div>

                        </div>

                        <hr className="op-1"/>

                        <div class="container-timeline">
                            <div class="box">
                            <div class="borderContaner">
                                <div class="circle"></div>
                                <div class="img"></div>
                            </div>
                            <div class="textTimeLineSec">
                            <p className="pb-0 mb-0 f-13">
                            <Link to="#">Olamide Adeleke</Link>&nbsp;changed ticket status from In progress to Closed</p>
                                <div className="timeLinehashtags">
                                <div className="d-none"></div>
                                <div>01-05-2021, 12.00 AM</div>
                                </div>
                            </div>
                            </div>
                            <div class="box">
                            <div class="borderContaner">
                                <div class="circle"></div>
                                <div class="img"></div>
                            </div>
                            <div class="textTimeLineSec">
                            <p className="pb-0 mb-0 f-13">
                            <Link to="#">Olamide Adeleke</Link>&nbsp;changed ticket status from In progress to Closed</p>
                                <div className="timeLinehashtags">
                                <div className="d-none"></div>
                                <div>01-05-2021, 12.00 AM</div>
                                </div>
                            </div>
                            </div>

                            <div class="box">
                            <div class="borderContaner">
                                <div class="circle"></div>
                                <div style={{ height: "0px" }} class="img"></div>
                            </div>
                            <div class="textTimeLineSec">
                            <p className="pb-0 mb-0 f-13">
                            <Link to="#">Olamide Adeleke</Link>&nbsp;changed priorrity from medium to high</p>
                                <div className="timeLinehashtags">
                                <div className="d-none"></div>
                                <div>01-05-2021, 12.00 AM</div>
                                </div>
                            </div>
                            </div>
                        </div>

                        <div className="text-center mt-4">
                            <Button
                                className="bg-at-blue-light px-3"
                                size="sm"
                                onClick={() => setShowUpdate(true)}>Update Profile</Button>
                        </div>
                    </div>

                    <div
                        style={{
                        overflowX: "hidden"
                    }}
                        className="bg-secondary py-3 pt-0 bg-white">

                        <div
                            style={{
                            margin: "0 -0.5rem"
                        }}
                            className="px-4 py-3 d-flex justify-content-between">
                            <div>
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item " role="presentation">
                                        <button
                                            className={`nav-link ${tabKey === 'ticket-history' && 'nav-active'} text-muted ps-0`}
                                            id="pills-profile-tab"
                                            type="button"
                                            onClick={() => setTabKey('ticket-history')}>Ticket History</button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${tabKey === 'notes' && 'nav-active'} text-muted`}
                                            id="pills-notes-tab"
                                            type="button"
                                            onClick={() => setTabKey('notes')}>Notes</button>
                                    </li>
                                    {/* <li className="nav-item" role="presentation">
                                        <button
                                            className={`nav-link ${tabKey === 'timeline' && 'nav-active'} text-muted`}
                                            id="pills-timeline-tab"
                                            type="button"
                                            onClick={() => setTabKey('timeline')}>Timeline</button>
                                    </li> */}
                                </ul>
                            </div>
                            <div className="d-flex align-items-md-center">
                                <div>
                                    {/* <button
                                        type="button"
                                        className="btn btn-sm btn-outline-secondary px-md-3 mx-md-2 me-1">
                                        <img src={TicketIcon} className="pe-none" alt=""/>&nbsp; New Ticket
                                    </button> */}
                                    <button
                                        type="button"
                                        className="reset-btn-outline btn btn-sm border btn-outline-secondary px-md-2 mx-md-2"><img src={MessageIcon} className="pe-none" alt=""/>&nbsp; Activation Email
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            {/* Ticket History Tab */}
                            <Tabs
                                id="controlled-tab-example"
                                activeKey={tabKey}
                                onSelect={(k) => setTabKey(k)}
                                className="mb-3">
                                <Tab eventKey="ticket-history" className="px-2">
                                    <TicketHistory currentCustomerId={id} />
                                </Tab>

                                {/* Notes Tab */}
                                <Tab eventKey="notes" className="px-2">
                                    <Notes />
                                </Tab>

                                {/* Timeline tab */}
                                <Tab eventKey="timeline" className="px-2">
                                    <Timeline />
                                </Tab>
                            </Tabs>
                        </div>

                    </div>

                </div>}

            {/* Profile Update OffCanvas */}
            <div
                className={showUpdate
                ? "update-backdrop"
                : ''}
                onClick={() => setShowUpdate(false)}></div>
            <div
                className="offcanvas offcanvas-end show"
                tabindex="-1"
                id="uploadSidebar"
                aria-labelledby="offcanvasRightLabel"
                style={{
                visibility: `${showUpdate
                    ? 'visible'
                    : 'hidden'}`
            }}>
                <div className="offcanvas-header mx-2 mt-3">
                    <h5 id="offcanvasRightLabel" className="mt-1">Update Profile</h5>
                    <div
                        className="d-flex justify-content-center align-items-center update-close-wrap">
                        <button
                            type="button"
                            className="btn-close text-reset p-0 m-0 h-100 w-100"
                            data-bs-dismiss="offcanvas"
                            aria-label="Close"
                            onClick={() => setShowUpdate(false)}>x</button>
                    </div>
                </div>
                <div className="offcanvas-body">
                    <form className="px-2">
                        <div className="mb-3">
                            <div className="d-flex">
                                <div
                                    className="col-auto rounded-3 d-flex justify-content-between align-items-center me-5">
                                    <div className="ms-3 d-flex justify-content-between align-items-center">
                                        <img src={ImageDefault} alt="" className="pe-none"/>
                                    </div>
                                </div>
                                <div>
                                    <label htmlFor="imageInput" className="form-label btn bg-at-blue-light hover-op-8">Upload Photo</label>
                                    <p className="op-9">
                                        <small>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</small>
                                    </p>
                                </div>
                            </div>
                            <input type="file" className="form-control" id="imageInput"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="firstNameInput" className="form-label">First Name</label>
                            <input type="text" className="form-control" id="firstNameInput"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="lastNameInput" className="form-label">Last Name</label>
                            <input type="text" className="form-control" id="lastNameInput"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="emailInput" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="emailInput"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="phoneNumerInput" className="form-label">Phone Number</label>
                            <input type="tel" className="form-control" id="phoneNumberInput"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="companyInput" className="form-label">Company</label>
                            <input type="text" className="form-control" id="companyInput"/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="addressInput" className="form-label">Address</label>
                            <textarea className="form-control" id="addressInput"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="customerGroupInput" className="form-label">Customer Group</label>
                            <input type="text" className="form-control" id="customerGroupInput"/>
                        </div>
                        <button
                            type="submit"
                            className="btn bg-at-blue-light rounded-0 d-block w-100 mt-5 hover-op-8">Update</button>
                    </form>
                </div>
            </div>

            {/* <!-- end of profile update canvas --> */}

        </Fragment>
    )
}

const mapStateToProps = (state, ownProps) => ({customers: state.customer.customers, isCustomerLoaded: state.customer.isCustomerLoaded, isCurrentCustomerLoaded: state.customer.isCurrentCustomerLoaded, currentCustomer: state.customer.currentCustomer});

export default connect(mapStateToProps, {getCurrentCustomer})(Customer);