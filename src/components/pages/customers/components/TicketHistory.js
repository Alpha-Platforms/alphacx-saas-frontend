import {Link} from 'react-router-dom';
import MaterialTable from 'material-table';
import {TablePagination} from '@material-ui/core';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import ShowIcon from '../../../../assets/icons/Show.svg';

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

const TicketHistory = ({ meta }) => {
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

export default TicketHistory
