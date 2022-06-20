/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/prop-types */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import moment from 'moment';
import MaterialTable from 'material-table';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { TablePagination } from '@material-ui/core';
import tableIcons from '../../../../../../assets/materialicons/tableIcons';
import { httpGet } from '../../../../../../helpers/httpMethods';

function PaymentHistory({ tenantId }) {
    const [paymentHistory, setPaymentHistory] = useState(null);

    const getPaymentHistory = async (itemsPerPage, currentPage) => {
        const res = await httpGet(
            `subscriptions/payment/history/${tenantId}?per_page=${itemsPerPage}&page=${currentPage}`,
        );
        if (res?.status === 'success') {
            setPaymentHistory(res?.data);
        } else {
            setPaymentHistory({});
        }
    };

    useEffect(() => {
        getPaymentHistory(5, 1);
    }, []);

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

    // function AlphacxMTPagination(props) {
    //     const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

    //     return (
    //         <TablePagination
    //             {...tablePaginationProps}
    //             // @ts-expect-error onChangePage was renamed to onPageChange
    //             onPageChange={onChangePage}
    //             onRowsPerPageChange={onChangeRowsPerPage}
    //             ActionsComponent={(subprops) => {
    //                 const { onPageChange, ...actionsComponentProps } = subprops;
    //                 return (
    //                     // @ts-expect-error ActionsComponent is provided by material-table
    //                     <ActionsComponent {...actionsComponentProps} onChangePage={onPageChange} />
    //                 );
    //             }}
    //         />
    //     );
    // }

    function AlphacxMTPagination(props) {
        const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

        return (
            <TablePagination
                {...tablePaginationProps}
                rowsPerPageOptions={[5, 10, 20, 30, 50, 100, 150, 200]}
                rowsPerPage={paymentHistory?.meta?.per_page || 5}
                count={Number(paymentHistory?.meta?.total || 20)}
                page={(paymentHistory?.meta?.current_page || 1) - 1}
                onPageChange={onChangePage}
                // when the number of rows per page changes
                onRowsPerPageChange={(event) => {
                    // setChangingRow(true);
                    getPaymentHistory(event.target.value, 1);
                }}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        <ActionsComponent
                            {...actionsComponentProps}
                            onChangePage={(event, newPage) => {
                                // fetch tickets with new current page
                                getPaymentHistory(paymentHistory?.meta.per_page, newPage + 1);
                            }}
                            onRowsPerPageChange={(event) => {
                                // fetch tickets with new rows per page
                                getPaymentHistory(event.target.value, paymentHistory?.meta.current_page);
                            }}
                        />
                    );
                }}
            />
        );
    }

    if (!paymentHistory) return <></>;

    return (
        <div className="paymnt-hist">
            <h5>Payment History</h5>

            <div className="tct-right position-relative">
                {/* <btn className="tr-delete-btn btn btn-sm bg-at-blue-light px-2"><span style={{ transform: 'scale(0.9)' }} className="d-inline-block"><DeleteWhiteSvg/></span> Delete</btn> */}
                <div id="alphacxMTable" className="mb-3 acx-user-table-2 acx-user-table acx-category-table">
                    {Array.isArray(paymentHistory?.data) && (
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
                                data={paymentHistory?.data?.map((payment) => ({
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
