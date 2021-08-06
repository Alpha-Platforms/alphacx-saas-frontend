import { useState, useEffect } from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {ReactComponent as UploadSvg} from '../../../assets/svgicons/Upload.svg';
import {ReactComponent as ImportSvg} from '../../../assets/svgicons/import.svg';
import TicketStarIcon from '../../../assets/svgicons//Ticket-Star.svg';
import MaterialTable from 'material-table';
import {TablePagination} from '@material-ui/core';
import tableIcons from '../../../assets/materialicons/tableIcons';
import '../../../styles/Ticket.css';
import ScaleLoader from 'react-spinners/ScaleLoader';
import moment from 'moment';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import {getPaginatedTickets} from '../../../reduxstore/actions/ticketActions';
import CreateTicketModal from './CreateTicketModal';
import {Dropdown} from 'react-bootstrap';
import {exportTable} from '../../../helper';
import SaveAlt from '@material-ui/icons/SaveAlt';
import {ReactComponent as StarUnactiveSvg} from '../../../assets/icons/Star-unactive.svg';
import {ReactComponent as StarYellowSvg} from '../../../assets/icons/Star-yellow.svg';



const TicketList = ({isTicketsLoaded, tickets, meta, getPaginatedTickets}) => {
    const [ticketLoading,
        setTicketLoading] = useState(false);
    const [createModalShow, setCreateModalShow] = useState(false);
    const [changingRow, setChangingRow] = useState(false);
    let selectedRows = [];
        
        useEffect(() => {
            setTicketLoading(!isTicketsLoaded);
            if (isTicketsLoaded) {
                setChangingRow(false);
            }
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
        // const exportBtn = document.querySelector('.MuiButtonBase-root.MuiIconButton-root.MuiIconButton-colorInherit');
        // exportBtn && exportBtn.click();
    }

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
            rowsPerPageOptions={[10, 20, 30]}
            rowsPerPage={meta?.itemsPerPage || 5}
            count={Number(meta?.totalItems || 20)}
            page={(meta?.currentPage || 1) - 1}
            onPageChange={onChangePage}
            // when the number of rows per page changes
            onRowsPerPageChange={event => {
                        setChangingRow(true);
                        getPaginatedTickets(event.target.value, 1);
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

    const getStatusColor = status => {
        switch (status) {
            case "Pending":
                return 'orange';
            case "Resolved":
                return 'green';
            case "In Review":
                return 'yellow';
            case "Awaiting User Reply":
                return 'awaiting';
            case "Closed":
                return 'red';
            default:
                return ''
        }
    }

    const tableColumns = [
        {
            title: 'Name',
            field: 'name',
            render: rowData => <Link to={`/customers/${rowData.name.customerId}`} style={{ textTransform: 'capitalize' }}>{rowData.name.fullName}</Link>
        }, {
            title: 'Ticket ID',
            field: 'ticketId',
            width: '40%',
            render: rowData => <Link to={`/tickets/${rowData.ticketId}`} style={{ textTransform: 'uppercase' }}>{rowData.ticketId.slice(-8)}</Link>
        }, {
            title: 'Subject',
            field: 'subject',
            width: '40%'
        }, {
            title: 'Category',
            field: 'category'
        }, {
            title: 'Status',
            field: 'status',
            render: rowData => <div className={`ticket-state ${getStatusColor(rowData.status.status)}`}><Link to="#" className="btn btn-sm">{rowData.status.status}</Link></div>
        },
        {
            title: 'Assigned to',
            field: 'assignedTo',
            render: rowData => <Link to="#" style={{ textTransform: 'capitalize' }}>Paul Ifeoma</Link>
        },  
        // {
        //     title: 'Status',
        //     field: 'status',
        //     render: rowData => (<Dropdown className="ticket-status-dropdown">
        //                             <Dropdown.Toggle variant="transparent" size="sm">
        //                                 Open
        //                             </Dropdown.Toggle>
        //                             <Dropdown.Menu>
        //                                 <Dropdown.Item eventKey="1">Open</Dropdown.Item>
        //                                 <Dropdown.Item eventKey="2">Pending</Dropdown.Item>
        //                                 <Dropdown.Item eventKey="3">Resolved</Dropdown.Item>
        //                                 <Dropdown.Item eventKey="4">Closed</Dropdown.Item>
        //                             </Dropdown.Menu>
        //                         </Dropdown>)
        //     // render: rowData => (<select name="ticket-status-select" id="ticket-status-select">
        //     //                         <option value="open">Open</option>
        //     //                         <option value="pending">Pending</option>
        //     //                         <option value="resolved">Resolved</option>
        //     //                         <option value="closed">Closed</option>
        //     //                     </select>)
        // }, 
        // {
        //     title: 'Tags',
        //     field: 'tags',
        //     render: rowData => (<div className={"table-tags"}><span className="badge rounded-pill acx-bg-purple-30 px-3 py-2 me-1">Customer Data</span><span className="badge rounded-pill text-muted border px-2 py-1">+2</span></div>)
        // },
        {
            title: 'Ratings',
            field: 'rating',
            render: rowData => (<div className={"table-ratings"}><span className="table-ratings-span"><StarYellowSvg/></span><span className="me-1 table-ratings-span"><StarUnactiveSvg/></span><span className="me-1 table-ratings-span"><StarUnactiveSvg/></span><span className="me-1 table-ratings-span"><StarUnactiveSvg/></span><span className="me-1 table-ratings-span"><StarUnactiveSvg/></span></div>)
        }, {
            title: 'Created',
            field: 'created'
        }
    ];

    const handleCSVExport = () => {
        if (tickets) {
            const data = selectedRows.length !== 0 ? selectedRows : tickets.map(({customer, subject, id, category, created_at, status}) => ({
                name: `${customer.firstname} ${customer.lastname}`,
                email: customer.email,
                subject: `${subject.substr(0, 25)}...`,
                ticketId: id.slice(-8),
                category: category.name,
                created: moment(created_at).format('DD MMM, YYYY'),
                state: status

            }));
            exportTable(tableColumns, data, 'csv', 'TicketExport');
        }

    }

    const handlePDFExport = () => {
        if (tickets) {
            const data = selectedRows.length !== 0 ? selectedRows : tickets.map(({customer, subject, id, category, created_at, status}) => ({
                name: `${customer.firstname} ${customer.lastname}`,
                email: customer.email,
                subject: `${subject.substr(0, 25)}...`,
                ticketId: id.slice(-8),
                category: category.name,
                created: moment(created_at).format('DD MMM, YYYY'),
                state: status

            }));
            exportTable(tableColumns, data, 'pdf', 'TicketExport');
        }
    }

    const handleSelectionChange = (rows) => {
        selectedRows = rows;
    }


    return (
        <div>
            { ticketLoading && <div className={`cust-table-loader ${ticketLoading && 'add-loader-opacity'}`}><ScaleLoader loading={ticketLoading} color={"#006298"}/></div>}
            <div className="ticket-table-wrapper">
                <div style={{ background: '#fefdfd' }}
                    className={`d-flex justify-content-start flex-wrap rounded-top-04 flex-md-nowrap align-items-center p-4 px-3 ${ticketLoading && 'rounded-bottom-04'}`}>

{/*                     <div>
                        
                    </div> */}

                    <div className="btn-toolbar mb-md-0">
                        {/* <button
                            type="button"
                            className="btn btn-sm bg-at-blue-light px-md-3 mx-1"
                            onClick={() => setCreateModalShow(true)}>
                            <img src={TicketStarIcon} style={{ transform: 'scale(0.8)', display: 'inline-block' }} alt=""/>&nbsp;New Ticket
                        </button>

                        <button
                            onClick={handleExportBtn}
                            type="button"
                            className="btn btn-sm btn-outline-secondary ps-md-3 mx-md-3 reset-btn-outline">
                            <UploadSvg/>&nbsp;Import
                        </button> */}

                        <Dropdown id="export-dropdown-main">
                            <Dropdown.Toggle id="export-dropdown" className="reset-btn-outline btn ticket-export-btn">
                                {/* <ImportSvg/>&nbsp;Export */}
                                <SaveAlt />
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                <Dropdown.Item as="button" onClick={handlePDFExport}>As PDF</Dropdown.Item>
                                <Dropdown.Item as="button" onClick={handleCSVExport}>As CSV</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                </div>


                <div id="alphacxMTable" className="pb-5 acx-ticket-cust-table acx-ticket-table">
                    {(tickets && !changingRow) && <MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {tableColumns}
                            data = {tickets.map(({customer, subject, id, category, created_at, status}) => ({
                                name: {fullName: `${customer.firstname} ${customer.lastname}`, customerId: customer.id},
                                ticketId: id,
                                email: customer.email,
                                subject: `${subject.substr(0, 25)}...`,
                                category: category.name,
                                created: moment(created_at).format('DD MMM, YYYY'),
                                status

                            }))
                            }
                            options = {{
                                search: true,
                                selection: true,
                                // exportButton: true,
                                tableLayout: 'auto',
                                paging: true,
                                pageSize: meta?.itemsPerPage || 10,
                                headerStyle: {
                                    // backgroundColor: '#f8f9fa'
                                    backgroundColor: '#fefdfd'
                                }
                            }}
                            components={{ 
                                Pagination: AlphacxMTPagination
                            }}
                            localization={{ 
                                body: {
                                    emptyDataSourceMessage: 'No tickets to display'
                                }
                             }}
                             onSelectionChange={handleSelectionChange}
                        />
                    </MuiThemeProvider>}
                </div>
            </div>

            <CreateTicketModal createModalShow={createModalShow} setCreateModalShow={setCreateModalShow} setChangingRow={setChangingRow} />

            
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({tickets: state.ticket.tickets, isTicketsLoaded: state.ticket.isTicketsLoaded, meta: state.ticket.meta, isTicketsFullyLoaded: state.ticket.isTicketsFullyLoaded})

export default connect(mapStateToProps, {getPaginatedTickets})(TicketList);