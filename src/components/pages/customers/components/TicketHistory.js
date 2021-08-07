import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import MaterialTable from 'material-table';
import {TablePagination} from '@material-ui/core';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import ShowIcon from '../../../../assets/icons/Show.svg';
import {getPaginatedCurrentCustomerTickets} from '../../../../reduxstore/actions/customerActions';
import {connect} from 'react-redux';

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

const TicketHistory = ({ meta, currentCustomerId, getPaginatedCurrentCustomerTickets, isCurrentCustomerLoaded }) => {
    const [changingRow, setChangingRow] = useState(false);

    console.log("currentCustomerId", currentCustomerId);

    useEffect(() => {
        if (isCurrentCustomerLoaded) {
            getPaginatedCurrentCustomerTickets(10, 1, currentCustomerId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCurrentCustomerLoaded]);

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
            width: '40%'
        }, {
            title: 'Category',
            field: 'category'
        }, {
            title: 'Agent Assigned',
            field: 'agentAssigned',
            render: rowData => <Link to="#">{rowData.agentAssigned}</Link>
        }, {
            title: 'Status',
            field: 'stage',
            render: rowData => <div className={`ticket-state ${getStatusColor(rowData.stage)}`}>
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
            rowsPerPage={meta?.itemsPerPage || 5}
            count={Number(meta?.totalItems || 20)}
            page={(meta?.currentPage || 1) - 1}
            onPageChange={onChangePage}
            // when the number of rows per page changes
            onRowsPerPageChange={event => {
                        setChangingRow(true);
                        getPaginatedCurrentCustomerTickets(event.target.value, 1);
                        }}
            ActionsComponent={(subprops) => {
                const { onPageChange, ...actionsComponentProps } = subprops;
                return (
                    <ActionsComponent
                    {...actionsComponentProps}
                    onChangePage={(event, newPage) => {
                        // fetch tickets with new current page
                        getPaginatedCurrentCustomerTickets(meta.itemsPerPage, newPage + 1);
                        }}
                    onRowsPerPageChange={event => {
                        // fetch tickets with new rows per page
                        getPaginatedCurrentCustomerTickets(event.target.value, meta.currentPage);
                    }}
                    />
                );
                }}
        />
    )}

    return (
        <div>
            <div id="alphacxMTable" className="pb-5 acx-ticket-cust-table acx-ticket-table">
                    {<MuiThemeProvider theme={tableTheme}>
                        <MaterialTable
                            title = ""
                            icons = {
                                tableIcons
                            }
                            columns = {tableColumns}
                            data = {[0, 1, 2, 3, 4].map(() => ({
                                date: `5:28 PM`,
                                ticketId: '0721115',
                                subject: 'How do I get a refund',
                                category: `Enquiry`,
                                agentAssigned: 'Munachi',
                                stage: 'Pending'
                            }))
                            }
                            options = {{
                                search: false,
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
                                // Pagination: AlphacxMTPagination
                            }}
                            localization={{ 
                                body: {
                                    emptyDataSourceMessage: 'No tickets to display'
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
});

export default connect(mapStateToProps, {getPaginatedCurrentCustomerTickets})(TicketHistory);
