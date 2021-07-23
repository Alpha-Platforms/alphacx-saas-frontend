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
import {getPaginatedTickets} from '../../../reduxstore/actions/ticketActions';
import {Modal, Form, Row, Col, Button} from 'react-bootstrap';


const TicketList = ({isTicketsLoaded, tickets, meta, getPaginatedTickets}) => {
    const [ticketLoading,
        setTicketLoading] = useState(false);
    const [createModalShow, setCreateModalShow] = useState(false);
        
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

    const handleExportBtn = () => {
        const exportBtn = document.querySelector('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit');
        exportBtn && exportBtn.click();
    }

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
            rowsPerPageOptions={[5, 10, 20, 30]}
            rowsPerPage={meta.itemsPerPage}
            count={Number(meta.totalItems)}
            page={meta.currentPage - 1}
            onPageChange={onChangePage}
            // when the number of rows per page changes
            onRowsPerPageChange={event => {
                        getPaginatedTickets(event.target.value, meta.currentPage);
                        }}
            ActionsComponent={(subprops) => {
                const { onPageChange, ...actionsComponentProps } = subprops;
                return (
                    <ActionsComponent
                    {...actionsComponentProps}
                    onChangePage={(event, newPage) => {
                        // fetch tickets with new current page
                        getPaginatedTickets(meta.itemsPerPage, newPage + 1);
                        }}
                    onRowsPerPageChange={event => {
                        // fetch tickets with new rows per page
                        getPaginatedTickets(event.target.value, meta.currentPage);
                    }}
                    />
                );
                }}
        />
    )}
    

    return (
        <div>
            { ticketLoading && <div className={`cust-table-loader ${ticketLoading && 'add-loader-opacity'}`}><ScaleLoader loading={ticketLoading} color={"#006298"}/></div>}
            <div className="m-4">
                <div
                    className={`d-flex justify-content-between flex-wrap bg-light rounded-top-big flex-md-nowrap align-items-center p-4 px-3 ${ticketLoading && 'rounded-bottom-big'}`}>

                    <div>
                        
                    </div>

                    <div className="btn-toolbar mb-md-0">
                        <button
                            type="button"
                            className="btn btn-sm bg-at-blue-light px-md-3 mx-1"
                            onClick={() => setCreateModalShow(true)}>
                            <img src={TicketStarIcon} style={{ transform: 'scale(0.8)', display: 'inline-block' }} alt=""/>&nbsp;New Ticket
                        </button>

                        <button
                            onClick={handleExportBtn}
                            type="button"
                            className="btn btn-sm btn-outline-secondary ps-md-3 ms-md-3 reset-btn-outline">
                            <ImportSvg/>&nbsp;Export
                        </button>
                    </div>

                </div>


                <div id="ticketsTable" className="pb-5">
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
                                        field: 'subject',
                                        width: '40%'
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
                                        field: 'tags',
                                        render: rowData => (<div className={"table-tags"}><span className="badge rounded-pill acx-bg-purple-30 px-3 py-2 me-1">Customer Data</span><span className="badge rounded-pill acx-bg-blue-light-30 px-3 py-2 me-1">Billing</span><span className="badge rounded-pill text-muted border px-2 py-1">+2</span></div>)
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
                                tableLayout: 'auto',
                                paging: true,
                                pageSize: meta.itemsPerPage,
                                headerStyle: {
                                    backgroundColor: '#f8f9fa'
                                }
                            }}
                            components={{ 
                                Pagination: TicketPagination
                            }}
                        />
                    </MuiThemeProvider>}
                </div>
            </div>

            {/* Create new customer modal */}
            <Modal
                    show={createModalShow}
                    onHide={() => setCreateModalShow(false)}
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    size="lg"
                    >
                    <Modal.Body>
                        <div className="col-12 p-4">
                            <h5 className="mb-3">Create Ticket</h5>
                            <form className="needs-validation mb-5" noValidate>
                                <div className="row">
                                    <div className="col-6 mt-2 position-relative">
                                        <label htmlFor="customer" className="form-label">Customer</label>
                                        <input type="text" name="customer" className="form-control"/>
                                        <span className="text-at-blue-light f-12 d-inline-block w-100 text-end">Add Customer</span>
                                    </div>

                                    <div className="col-6 mt-2">
                                        <label htmlFor="category" className="form-label">Category</label>
                                        <select class="form-select" name="category" aria-label="Category select">
                                            <option selected></option>
                                            <option value="1">--</option>
                                            <option value="2">--</option>
                                            <option value="3">--</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row g-3 ">
                                    <div className="col-12 mt-3">
                                        <label htmlFor="subject" className="form-label">Subject</label>
                                        <input type="text" name="subject" id="subject" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="description" className="form-label">Description</label>
                                        <textarea name="description" id="description" className="form-control"></textarea>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="priority" className="form-label">Priority</label>
                                        <select class="form-select" name="priority" aria-label="Category select">
                                            <option selected></option>
                                            <option value="1">--</option>
                                            <option value="2">--</option>
                                            <option value="3">--</option>
                                        </select>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Tags</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                    <div className="col-12 mt-3">
                                        <label htmlFor="title" className="form-label">Attachment (If Any)</label>
                                        <input type="text" className="form-control"/>
                                    </div>

                                </div>

                                <button
                                    className="btn btn-sm bg-at-blue-light mt-1 mt-sm-3 float-end pt-1 pe-3 ps-3"
                                    type="submit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#contactCreated"
                                    data-bs-dismiss="modal">Create</button>

                            </form>
                        </div>
                    </Modal.Body>
                </Modal>

        </div>

    )
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketsLoaded: state.ticket.isTicketsLoaded, meta: state.ticket.meta, isTicketsFullyLoaded: state.ticket.isTicketsFullyLoaded})

export default connect(mapStateToProps, {getPaginatedTickets})(TicketList);