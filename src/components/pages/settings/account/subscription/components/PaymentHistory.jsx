/* eslint-disable */
// @ts-nocheck
import { Table } from 'react-bootstrap';
import moment from 'moment';
import MaterialTable from 'material-table';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { TablePagination } from '@material-ui/core';
import tableIcons from '../../../../../../assets/materialicons/tableIcons';

function PaymentHistory({ paymentHistory }) {
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

    function AlphacxMTPagination(props) {
        const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

        return (
            <TablePagination
                {...tablePaginationProps}
                // @ts-expect-error onChangePage was renamed to onPageChange
                onPageChange={onChangePage}
                onRowsPerPageChange={onChangeRowsPerPage}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        // @ts-expect-error ActionsComponent is provided by material-table
                        <ActionsComponent {...actionsComponentProps} onChangePage={onPageChange} />
                    );
                }}
            />
        );
    }

    return (
        <div className="paymnt-hist">
            <h5>Payment History</h5>

            <div className="tct-right position-relative">
                {/* <btn className="tr-delete-btn btn btn-sm bg-at-blue-light px-2"><span style={{ transform: 'scale(0.9)' }} className="d-inline-block"><DeleteWhiteSvg/></span> Delete</btn> */}
                <div id="alphacxMTable" className="mb-3 acx-user-table-2 acx-user-table acx-category-table">
                    {Array.isArray(paymentHistory) && (
                        <MuiThemeProvider theme={tableTheme}>
                            <MaterialTable
                                title=""
                                icons={tableIcons}
                                columns={[
                                    {
                                        title: 'Date',
                                        field: 'date',
                                    },
                                    {
                                        title: 'Plan',
                                        field: 'plan',
                                    },
                                    {
                                        title: 'User',
                                        field: 'user',
                                    },
                                    {
                                        title: 'Amount',
                                        field: 'amount',
                                    },
                                    {
                                        title: 'Status',
                                        field: 'status',
                                    },
                                ]}
                                data={paymentHistory.map((payment) => ({
                                    date: moment(payment?.created_at || '').format('DD MMM, YYYY') || '',
                                    plan: 'Alpha Plan',
                                    user: payment?.no_of_users,
                                    amount: `${payment?.amount} ${payment?.currency}`,
                                    status: payment?.status,
                                }))}
                                options={{
                                    search: false,
                                    selection: false,
                                    pageSize: 5,
                                    headerStyle: {
                                        backgroundColor: '#f8f9fa',
                                    },
                                    rowStyle: {},
                                }}
                                components={{
                                    Pagination: AlphacxMTPagination,
                                }}
                            />
                        </MuiThemeProvider>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PaymentHistory;
