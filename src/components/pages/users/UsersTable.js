import { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ReactComponent as ImportSvg} from '../../../assets/svgicons//import.svg';
import TicketStarIcon from '../../../assets/svgicons//Ticket-Star.svg';
import MaterialTable from 'material-table';
import {TablePagination} from '@material-ui/core';
import tableIcons from '../../../assets/materialicons/tableIcons';
import '../../../styles/Ticket.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import moment from 'moment';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Breadcrumb from 'react-bootstrap/Breadcrumb';


import SearchBox from "../../reusables/SearchBox";


const AlphacxMTPagination = props => {
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
    exportBtn && exportBtn.click();
}

const UsersTable = ({isTicketsLoaded, tickets}) => {
    const [ticketLoading,
        setTicketLoading] = useState(false);

    useEffect(() => {
        setTicketLoading(!isTicketsLoaded);
    }, [isTicketsLoaded]);

const tableTheme = createTheme({
    palette: {
        primary: {
        main: 'rgba(0, 98, 152)',
        },
        secondary: {
        main: 'rgba(0, 98, 152)',
        },
    },

    });

    return (
        <div>

            <div className="cust-table-loader"><ScaleLoader loading={ticketLoading} color={"#006298"}/></div>
            <div className="m-4">

                <Breadcrumb>
                    <Breadcrumb.Item href="#">Settings</Breadcrumb.Item>
                    <Breadcrumb.Item active>Users</Breadcrumb.Item>
                </Breadcrumb>

                <div className="setting-page-title">
                    <h5 className="text-dark fw-light mb-1">User Management</h5>
                    <p>Create, invite or import users here</p>
                </div>

                <SearchBox />

                <div
                    className="d-flex justify-content-between flex-wrap bg-light rounded-top-big flex-md-nowrap align-items-center p-4 px-3">

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
                            className="btn btn-sm btn-outline-secondary ps-md-3 ms-md-3 reset-btn-outline">
                            <ImportSvg/>&nbsp;Export
                        </button>
                    </div>

                </div>


                <div id="alphacxMTable" className="pb-5">
                    {isTicketsLoaded && <MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {
                                [
                                    {
                                        title: 'Name',
                                        field: 'name',
                                        render: rowData => <Link to="#" style={{ textTransform: 'capitalize' }}>{rowData.name}</Link>
                                    }, {
                                        title: 'Subject',
                                        field: 'subject'
                                    }, {
                                        title: 'Category',
                                        field: 'category'
                                    }, {
                                        title: 'Ticket ID',
                                        field: 'ticketId',
                                        render: rowData => <Link to="#" style={{ textTransform: 'uppercase' }}>{rowData.ticketId}</Link>
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
                                // filtering: true
                            }}
                            components={{ 
                                Pagination: AlphacxMTPagination
                            }}
                        />
                    </MuiThemeProvider>}
                </div>
            </div>
        </div>

    )
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketsLoaded: state.ticket.isTicketsLoaded, meta: state.ticket.meta})

export default connect(mapStateToProps, null)(UsersTable);