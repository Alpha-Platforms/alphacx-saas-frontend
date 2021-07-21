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

  const handleExportBtn = () => {
      const exportBtn = document.querySelector('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit');
      exportBtn.click();
  }

const TicketList = ({isTicketsLoaded, tickets}) => {
    const [ticketLoading,
        setTicketLoading] = useState(false);

    useEffect(() => {
        setTicketLoading(!isTicketsLoaded);
    }, [isTicketsLoaded]);

    console.log(tickets);

    return (
        // <SideNavBar navbarTitle="Ticket List" parentCap="container-fluid">
<div>
            <div className="cust-table-loader"><ScaleLoader loading={ticketLoading} color={"#006298"}/></div>
            <div className="m-4">
                <div
                    className="d-flex justify-content-between flex-wrap bg-light rounded-top-big flex-md-nowrap align-items-center p-4">

                    <div>
                        
                    </div>

                    <div className="btn-toolbar mb-md-0">
                        <button
                            type="button"
                            class="btn btn-sm bg-at-blue-light px-md-3 mx-1"
                            data-bs-toggle="modal"
                            data-bs-target="#createNewTicket">
                            <img src={TicketStarIcon} alt=""/>&nbsp;New Ticket
                        </button>

                        <button
                            onClick={handleExportBtn}
                            type="button"
                            className="btn btn-sm btn-outline-secondary px-md-3 mx-md-3">
                            <ImportSvg/>&nbsp;Export
                        </button>
                    </div>

                </div>


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
                                render: rowData => <div className="ticket-state yellow"><Link to="#" className="btn btn-sm" style={{ color: rowData.state.foreground_color }}>{rowData.state.status}</Link></div>
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
                        selection: true,
                        exportButton: true,
                        filtering: true
                    }}
                    components={{ 
                        Pagination: TicketPagination
                     }}
                    />}
                </div>
            </div>
</div>
      //  </SideNavBar>

    )
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketsLoaded: state.ticket.isTicketsLoaded, meta: state.ticket.meta})

export default connect(mapStateToProps, null)(TicketList);