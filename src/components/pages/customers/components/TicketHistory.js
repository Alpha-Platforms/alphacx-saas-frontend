import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MaterialTable from 'material-table';
import {TablePagination} from '@material-ui/core';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import ShowIcon from '../../../../assets/icons/Show.svg';
import {getPaginatedCurrentCustomerTickets} from '../../../../reduxstore/actions/customerActions';
import {connect} from 'react-redux';
import moment from 'moment';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { Fragment } from 'react';

const getStatusColor = (status, id) => {
/*     switch (status) {
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
 */

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

}

const TicketHistory = ({ currentCustomerTicketsMeta, currentCustomerId, getPaginatedCurrentCustomerTickets, isCurrentCustomerLoaded, currentCustomerTickets, isCurrentCustomerTicketsLoaded, currentCustomer }) => {
    const [changingRow, setChangingRow] = useState(false);
    const [ticketLoading,
        setTicketLoading] = useState(false);

    useEffect(() => {
        if (isCurrentCustomerLoaded) {
            getPaginatedCurrentCustomerTickets(10, 1, currentCustomerId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCurrentCustomerLoaded]);

    useEffect(() => {
        setTicketLoading(!isCurrentCustomerTicketsLoaded);
        if (isCurrentCustomerTicketsLoaded) {
            setChangingRow(false);
        }
}, [isCurrentCustomerTicketsLoaded]);

    const tableColumns = [
        {
            title: 'Ticket ID',
            field: 'ticketId',
            render: rowData => <Link
                    to={`/tickets/${rowData.ticketId}`}
                    style={{
                    textTransform: 'uppercase'
                }}>{rowData
                        .ticketId
                        .slice(-8)}</Link>
        }, {
            title: 'Subject',
            field: 'subject',
            width: '30%'
        }, 
        // {
        //     title: 'Category',
        //     field: 'category'
        // }, 
        {
            title: 'Assigned To',
            field: 'agentAssignedId',
            render: rowData => <Fragment>{rowData.agentAssigned.trim() ? <Link to={`/settings/profile/${rowData.agentAssignedId}`}>{rowData.agentAssigned}</Link> : <span>Unassigned</span>}</Fragment>
        }, 
        { 
            title: 'Stage',
            field: 'stage',
            render: rowData => <div className={`ticket-state ${getStatusColor(rowData.stage, rowData.stageId)}`}>
                    <Link to="#" className="btn btn-sm">{rowData.stage}</Link>
                </div>
        }, {
            title: 'Last Updated',
            field: 'date'
        }
    ];

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
            rowsPerPage={currentCustomerTicketsMeta?.itemsPerPage || 5}
            count={Number(currentCustomerTicketsMeta?.totalItems || 20)}
            page={(currentCustomerTicketsMeta?.currentPage || 1) - 1}
            onPageChange={onChangePage}
            // when the number of rows per page changes
            onRowsPerPageChange={event => {
                        setChangingRow(true);
                        getPaginatedCurrentCustomerTickets(event.target.value, 1, currentCustomerId);
                        }}
            ActionsComponent={(subprops) => {
                const { onPageChange, ...actionsComponentProps } = subprops;
                return (
                    <ActionsComponent
                    {...actionsComponentProps}
                    onChangePage={(event, newPage) => {
                        // fetch tickets with new current page
                        getPaginatedCurrentCustomerTickets(currentCustomerTicketsMeta.itemsPerPage, newPage + 1, currentCustomerId);
                        }}
                    onRowsPerPageChange={event => {
                        // fetch tickets with new rows per page
                        getPaginatedCurrentCustomerTickets(event.target.value, currentCustomerTicketsMeta.currentPage, currentCustomerId);
                    }}
                    />
                );
                }}
        />
    )}

    return (
        <div>
            <div id="alphacxMTable" className="pb-3 acx-ticket-cust-table acx-ticket-table acx-single-cust-table fit-content">
                    {!isCurrentCustomerTicketsLoaded ? <div className="text-center"><ScaleLoader loading={ticketLoading} color={"#006298"}/></div> : <MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {tableColumns}
                            data = {currentCustomerTickets.map(({subject, id, category, created_at, status, assignee}) => ({
                                date: moment(created_at).format('DD MMM, YYYY'),
                                ticketId: id,
                                subject: `${subject.substr(0, 25)}...`,
                                category: `Enquiry`,
                                // category: category.name,
                                // agentAssigned: `${assignee.firstname} ${assignee.lastname}`,
                                agentAssigned: `${assignee?.firstname || ''} ${assignee?.lastname || ''}`,
                                stage: status?.status,
                                agentAssignedId: `${assignee?.id}`,
                                stageId: status?.id
                            }))
                            }
                            options = {{
                                search: false,
                                selection: true,
                                // exportButton: true,
                                tableLayout: 'auto',
                                paging: true,
                                pageSize: currentCustomerTicketsMeta?.itemsPerPage || 10,
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
                                    emptyDataSourceMessage: `No tickets to display for ${currentCustomer.firstname} ${currentCustomer.lastname}`
                                }
                             }}
                            //  onSelectionChange={handleSelectionChange}
                        />
                    </MuiThemeProvider>}
                </div>
        </div>
    )
}

const mapStateToProps = (state, ownProps) => ({
    isCurrentCustomerLoaded: state.customer.isCurrentCustomerLoaded,
    currentCustomerTickets: state.customer.currentCustomerTickets,
    currentCustomerTicketsMeta: state.customer.currentCustomerTicketsMeta,
    isCurrentCustomerTicketsLoaded: state.customer.isCurrentCustomerTicketsLoaded,
    currentCustomer: state.customer.currentCustomer
});

export default connect(mapStateToProps, {getPaginatedCurrentCustomerTickets})(TicketHistory);
