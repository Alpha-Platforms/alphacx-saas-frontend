import { useState, useEffect } from 'react';
import SideNavBar from '../../Layout/SideNavBar';
import {connect} from 'react-redux';
import {ReactComponent as EditSvg} from '../../../assets/svgicons//Edit.svg';
import {Link} from 'react-router-dom';
import FilterIcon from '../../../assets/svgicons//Filter3.svg';
import {ReactComponent as ImportSvg} from '../../../assets/svgicons//import.svg';
import ShowIcon from '../../../assets/svgicons//Show.svg';
import TicketStarIcon from '../../../assets/svgicons//Ticket-Star.svg';
import MaterialTable from 'material-table';
import {TablePagination} from '@material-ui/core';
import tableIcons from '../../../assets/materialicons/tableIcons';
import '../../../styles/Ticket.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import moment from 'moment';

const TicketPagination = props => {
    const {
      ActionsComponent,
      onChangePage,
      onChangeRowsPerPage,
      ...tablePaginationProps
    } = props;
  
    return (
      <TablePagination
        {...tablePaginationProps}
        onPageChange={onChangePage}
        onRowsPerPageChange={onChangeRowsPerPage}
        ActionsComponent={(subprops) => {
          const { onPageChange, ...actionsComponentProps } = subprops;
          return (
            <ActionsComponent
              {...actionsComponentProps}
              onChangePage={onPageChange}
            />
          );
        }}
      />
    );
  }

const TicketList = ({isTicketsLoaded, tickets}) => {
    const [ticketLoading,
        setTicketLoading] = useState(false);

    useEffect(() => {
        setTicketLoading(!isTicketsLoaded);
    }, [isTicketsLoaded]);

    console.log(tickets);

    return (
        <SideNavBar navbarTitle="Ticket List" parentCap="container-fluid">
            <div className="cust-table-loader"><ScaleLoader loading={ticketLoading} color={"#006298"}/></div>
            <div className="m-4">
                <div
                    className="d-flex justify-content-between flex-wrap bg-light rounded-top-big flex-md-nowrap align-items-center p-4">

                    <div>
                        <div className="input-group input-group-sm has-validation">

                            <span className="input-group-text bg-transparent border-end-0">

                                <i className="bi-search"></i>

                            </span>

                            <input
                                type="text"
                                className="form-control bg-transparent border-start-0 pe-4"
                                placeholder="Search all contacts"
                                required=""/>

                        </div>
                    </div>

                    <div className="btn-toolbar mb-md-0">
                        <button
                            type="button"
                            class="btn btn-sm bg-at-blue px-md-3 mx-1"
                            data-bs-toggle="modal"
                            data-bs-target="#createNewTicket">
                            <img src={TicketStarIcon} alt=""/>
                            New Ticket
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary px-md-3 mx-md-3">
                            <ImportSvg/>&nbsp;Export
                        </button>
                        <div className="btn-group me-2">
                            <button
                                type="button"
                                disabled={false}
                                className="btn btn-sm btn-outline-secondary">
                                <i className="bi-chevron-left"></i>
                            </button>
                            <button
                                type="button"
                                disabled={false}
                                className="btn btn-sm btn-outline-secondary">
                                <i className="bi-chevron-right"></i>
                            </button>
                        </div>
                    </div>

                </div>

                {/* <table
                    id="usersTable"
                    className="table table-responsive bg-white rounded-bottom-big table-striped__ table-hover__ w-100 p-0 pt-0">
                    <thead className="bg-light">
                        <tr>
                            <th className="text-center">
                                <input type="checkbox" className="form-check-input ticket-select-all" id=""/>
                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Category</th>
                            <th>Ticket ID</th>
                            <th>State</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Created</th>
                            <th>

                                <EditSvg/>

                                <img src={FilterIcon} alt=""/>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <input type="checkbox" className="form-check-input ticket-select" id=""/>
                            </td>
                            <td className="text-at-blue-light">Jerome Bell</td>
                            <td>debra.holt@example.com</td>
                            <td>whitefish664</td>
                            <td className="text-at-blue-light">3398</td>

                            <td className="ticket-state yellow">
                                <Link href="#" className="btn btn-sm ">Pending</Link>
                            </td>
                            <td className="ticket-priority green">

                                <div className="dropdown">
                                    <button
                                        className="btn btn-sm dropdown-toggle pt-0"
                                        type="button"
                                        id="dropdownMenuButtonSM"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <span>Low</span>
                                    </button>
                                    <ul className="dropdown-menu bg-at-blue" aria-labelledby="dropdownMenuButtonSM">
                                        <li>
                                            <Link className="dropdown-item" href="#">Low</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="#">Medium</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="#">High</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="#">Urgent</Link>
                                        </li>
                                    </ul>
                                </div>

                            </td>

                            <td className="ticket-status green">

                                <div className="dropdown">
                                    <button
                                        className="btn btn-sm dropdown-toggle pt-0"
                                        type="button"
                                        id="dropdownMenuButtonSM"
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false">
                                        <span>Resolved</span>
                                    </button>
                                    <ul className="dropdown-menu bg-at-blue" aria-labelledby="dropdownMenuButtonSM">
                                        <li>
                                            <Link className="dropdown-item" href="#">Open</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="#">Pending</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="#">Resolved</Link>
                                        </li>
                                        <li>
                                            <Link className="dropdown-item" href="#">Closed</Link>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                            <td>5/27/15</td>
                            <td>
                                <img src={ShowIcon} alt=""/>
                            </td>

                        </tr>

                    </tbody>
                </table> */}

                <div id="ticketsTable" className="pb-5">
                    {isTicketsLoaded && <MaterialTable
                    title = ""
                    icons = {
                        tableIcons
                    }
                    columns = {
                        [
                            {
                                title: 'Name',
                                field: 'name',
                                render: rowData => <Link>{rowData.name}</Link>
                            }, {
                                title: 'Subject',
                                field: 'subject'
                            }, {
                                title: 'Category',
                                field: 'category'
                            }, {
                                title: 'Ticket ID',
                                field: 'ticketId',
                                render: rowData => <Link>{rowData.ticketId}</Link>
                            }, {
                                title: 'State',
                                field: 'state',
                                render: rowData => <div className="ticket-state yellow"><Link to="#" className="btn btn-sm" style={{ backgroundColor: rowData.state.background_color, color: rowData.state.foreground_color }}>{rowData.state.status}</Link></div>
                            }, {
                                title: 'Status',
                                field: 'status',
                                render: rowData => (<select name="ticket-status-select" id="ticket-status-select">
                                                        <option value="open">Open</option>
                                                        <option value="pending">Pending</option>
                                                        <option value="resolved">Resolved</option>
                                                        <option value="closed">Closed</option>
                                                    </select>)
                            }, {
                                title: 'Tags',
                                field: 'tags'
                            }, {
                                title: 'Created',
                                field: 'created'
                            }, {
                                title: '',
                                field: 'action'
                            }
                        ]
                    }
                    data = {tickets.map(({customer, subject, id, category, created_at, status}) => ({
                        name: `${customer.firstname} ${customer.lastname}`,
                        email: customer.email,
                        subject: `${subject.substr(0, 25)}...`,
                        ticketId: id.slice(-8),
                        category: category.name,
                        created: moment(created_at).format('DD MMM, YYYY'),
                        state: status

                    }))
                    }
                    options = {{
                        search: true,
                        selection: true
                    }}
                    components={{ 
                        Pagination: TicketPagination
                     }}
                    />}
                </div>
            </div>

        </SideNavBar>

    )
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketsLoaded: state.ticket.isTicketsLoaded, meta: state.ticket.meta})

export default connect(mapStateToProps, null)(TicketList);