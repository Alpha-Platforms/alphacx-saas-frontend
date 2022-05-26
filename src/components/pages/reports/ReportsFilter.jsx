/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prop-types */
/* eslint-disabled */
// @ts-nocheck
import React, { useState, useEffect, memo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MaterialTable from 'material-table';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { TablePagination } from '@material-ui/core';
import MoonLoader from 'react-spinners/MoonLoader';
import { NotificationManager } from 'react-notifications';
import { httpGetMain } from '../../../helpers/httpMethods';
import { ReactComponent as StarYellowSvg } from '../../../assets/icons/Star-yellow.svg';
import { ReactComponent as StarUnactiveSvg } from '../../../assets/icons/Star-unactive.svg';
import FilterDropdown from './components/FilterDropdown';
import '../../../styles/ReportsFilter.scss';
import tableIcons from '../../../assets/materialicons/tableIcons';
import { PlusIcon } from '../../../assets/SvgIconsSet';
import { ExportDropdown } from '../tickets/TicketList';
import { exportTable, textCapitalize } from '../../../helper';

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

const getStatusColor = (status, id) => {
    /* switch (status) {
    case "Pending":
      return "orange";
    case "Resolved":
      return "green";
    case "In Review":
      return "yellow";
    case "Awaiting User Reply":
      return "awaiting";
    case "Closed":
      return "red";
    default:
      return "";
  } */

    if (id) {
        switch (id.slice(0, 13)) {
            case '23838da6-0566':
                return 'orange';
            case 'dafcab89-2b7f':
                return 'green';
            case '23838ae4-1223':
                return 'yellow';
            case '23838da6-1223':
                return 'awaiting';
            case '23838ec5-0566':
                return 'red';
            default:
                return '';
        }
    }
};

// ticket tables
function Tickets({ tickets, meta, handleFilterApply, tableColumns, handleSelectionChange }) {
    const AlphacxMTPagination = memo((props) => {
        const { ActionsComponent, onChangePage, onChangeRowsPerPage, ...tablePaginationProps } = props;

        return (
            <TablePagination
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...tablePaginationProps}
                rowsPerPageOptions={[10, 20, 30, 50, 100, 150, 200]}
                rowsPerPage={meta?.itemsPerPage || 50}
                count={Number(meta?.totalItems || 20)}
                page={(meta?.currentPage || 1) - 1}
                onPageChange={onChangePage}
                // when the number of rows per page changes
                onRowsPerPageChange={(event) => {
                    // setChangingRow(true);
                    handleFilterApply(event.target.value, 1);
                }}
                ActionsComponent={memo((subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        <ActionsComponent
                            // eslint-disable-next-line react/jsx-props-no-spreading
                            {...actionsComponentProps}
                            onChangePage={(event, newPage) => {
                                // fetch tickets with new current page
                                handleFilterApply(meta.itemsPerPage, newPage + 1);
                            }}
                            onRowsPerPageChange={(event) => {
                                // fetch tickets with new rows per page
                                handleFilterApply(event.target.value, meta.currentPage);
                            }}
                        />
                    );
                })}
            />
        );
    });

    return (
        <div id="alphacxMTable" className="pb-5 acx-ticket-cust-table acx-ticket-table fit-content">
            {tickets && (
                <MuiThemeProvider theme={tableTheme}>
                    <MaterialTable
                        title=""
                        icons={tableIcons}
                        columns={tableColumns}
                        data={tickets.map(
                            ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id }) => ({
                                key: ticket_id,
                                name: `${customer?.firstname} ${
                                    customer?.lastname === 'default' ? '' : customer?.lastname || ''
                                }`,
                                customerId: customer?.id,
                                ticketId: ticket_id,
                                ticketUid: id,
                                email: customer?.email,
                                subject: `${subject?.substr(0, 25)}...`,
                                category: category?.name,
                                created: dayjs(created_at).format('DD MMM, YYYY'),
                                status: status?.status,
                                assignedTo: `${assignee?.firstname || ''} ${assignee?.lastname || ''}`,
                                rating,
                                assigneeId: assignee?.id,
                                statusId: status?.id,
                                createdTime: new Date(created_at || Date.now()).getTime(),
                            }),
                        )}
                        options={{
                            search: false,
                            selection: true,
                            // exportButton: true,
                            tableLayout: 'auto',
                            paging: true,
                            pageSize: tickets?.length === 0 ? 10 : meta?.itemsPerPage || 50,
                            headerStyle: {
                                // backgroundColor: '#f8f9fa'
                                backgroundColor: '#fefdfd',
                            },
                        }}
                        components={{
                            Pagination: AlphacxMTPagination,
                        }}
                        localization={{
                            body: {
                                emptyDataSourceMessage: 'No tickets to display',
                            },
                        }}
                        onSelectionChange={handleSelectionChange}
                    />
                </MuiThemeProvider>
            )}
        </div>
    );
}

// const get

function ReportsFilter() {
    const [dropdownActive, setDropdownActive] = useState(false);
    const [filters, setFilters] = useState([]);
    const [ticketData, setTicketData] = useState({ tickets: null, meta: null });
    const [loading, setLoading] = useState(false);
    let selectedRows = [];

    const handleSelectionChange = (rows) => {
        // if (!multiIncludes(accessControlFunctions[user?.role], ["delete_ticket"])) return

        selectedRows = rows;

        // const deleteBtnWrapper = window.document.querySelector('#delete-btn-wrapper');
        // const selectedRowCount = window.document.querySelector('#selected-row-count');
        // const ticketDeleteBtn = window.document.querySelector('#ticket-delete-btn');

        // setTimeout(() => setRowsSelected(rows), 2000);
        // selectedRowCount.innerHTML = rows.length;

        // // show or hide button base on selected row count
        // if (rows.length > 0) {
        //   deleteBtnWrapper?.classList.remove('d-none');
        // } else {
        //   deleteBtnWrapper?.classList.add('d-none');
        // }

        // if (rows.length === 1) {
        //   ticketDeleteBtn.disabled = false;
        // } else {
        //   ticketDeleteBtn.disabled = false;
        // }
    };

    const getRatingStar = (rating = 0) => {
        if (!rating) {
            rating = 0;
        } else if (typeof rating?.value !== 'number') {
            rating = 0;
        } else {
            rating = rating?.value;
        }

        const ratingArr = [];

        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                ratingArr.push(true);
            } else {
                ratingArr.push(false);
            }
        }

        return (
            <div className="table-ratings">
                {ratingArr.map((x, index) => (
                    <span key={index} className="table-ratings-span">
                        {x ? <StarYellowSvg /> : <StarUnactiveSvg />}
                    </span>
                ))}
            </div>
        );
    };

    const tableColumns = [
        {
            title: 'Name',
            field: 'contact',
            render: (rowData) => (
                <Link to={`/customers/${rowData.customerId}`} style={{ textTransform: 'capitalize' }}>
                    {rowData.name}
                </Link>
            ),
        },
        {
            title: 'Ticket ID',
            field: 'ticketId',
            width: '40%',
            render: (rowData) => (
                <Link to={`/tickets/${rowData.ticketUid}`} style={{ textTransform: 'uppercase' }}>
                    {rowData.ticketId}
                </Link>
            ),
        },
        {
            title: 'Subject',
            field: 'subject',
            width: '40%',
        },
        {
            title: 'Category',
            field: 'category',
        },
        {
            title: 'Stage',
            field: 'status',
            render: (rowData) => (
                <div className={`ticket-state ${getStatusColor(rowData.status, rowData.statusId)}`}>
                    <Link to="#" className="btn btn-sm">
                        {rowData.status}
                    </Link>
                </div>
            ),
        },
        {
            title: 'Assigned to',
            field: 'assignedTo',
            render: (rowData) =>
                rowData.assignedTo.trim() ? (
                    <Link to={`/settings/profile/${rowData.assigneeId}`} style={{ textTransform: 'capitalize' }}>
                        {rowData.assignedTo}
                    </Link>
                ) : (
                    <span className="text-muted acx-fs-8">Unassigned</span>
                ),
        },
        {
            title: 'Ratings',
            field: 'rating',
            render: (rowData) => getRatingStar(rowData.rating),
        },
        {
            title: 'Created',
            field: 'createdTime',
            render: (rowData) => rowData.created,
        },
    ];

    const handleCSVExport = async (type) => {
        if (ticketData.tickets) {
            if (type === 'selected') {
                if (selectedRows.length === 0) return;
                const data =
                    selectedRows.length !== 0
                        ? selectedRows
                        : ticketData.tickets.map(
                              ({
                                  customer,
                                  subject,
                                  id,
                                  category,
                                  created_at,
                                  status,
                                  assignee,
                                  rating,
                                  ticket_id,
                              }) => ({
                                  name: `${customer.firstname} ${
                                      customer.lastname == 'default' ? '' : customer.lastname || ''
                                  }`,
                                  email: customer.email,
                                  subject,
                                  ticketUid: id,
                                  ticketId: ticket_id,
                                  category: category.name,
                                  created: dayjs(created_at).format('DD MMM, YYYY'),
                                  state: status,
                                  assignedTo: textCapitalize(
                                      `${assignee?.firstname || ''} ${assignee?.lastname || ''}`,
                                  ),
                                  rating,
                              }),
                          );
                exportTable(tableColumns, data, 'csv', 'TicketExport');
            } else if (type === 'all') {
                setLoading(true);
                // fetch all filtered result
                const res = await httpGetMain(
                    `tickets?${filters.map((item) => item?.value).join('&')}&per_page=${
                        ticketData.meta?.totalItems
                    }&page=${1}`,
                );
                setLoading(false);
                if (res?.status === 'success') {
                    const data = res?.data?.tickets?.map(
                        ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id }) => ({
                            name: `${textCapitalize(customer?.firstname || '')} ${textCapitalize(
                                customer.lastname === 'default' ? '' : customer.lastname ? customer?.lastname : '',
                            )}`,
                            email: customer.email,
                            subject,
                            // ticketId: id.slice(-8),
                            ticketId: ticket_id,
                            category: category.name,
                            created: dayjs(created_at).format('DD MMM, YYYY'),
                            state: status,
                            assignedTo: textCapitalize(`${assignee?.firstname || ''} ${assignee?.lastname || ''}`),
                            rating,
                        }),
                    );
                    exportTable(tableColumns, data, 'csv', 'TicketExport');
                } else {
                    NotificationManager.error('Tickets could not be retrieved', 'Error');
                }
            }
        }
    };

    const handlePDFExport = async (type) => {
        if (ticketData.tickets) {
            if (type === 'selected') {
                if (selectedRows.length === 0) return;
                const data =
                    selectedRows.length !== 0
                        ? selectedRows
                        : ticketData.tickets.map(
                              ({
                                  customer,
                                  subject,
                                  id,
                                  category,
                                  created_at,
                                  status,
                                  assignee,
                                  rating,
                                  ticket_id,
                              }) => ({
                                  name: textCapitalize(
                                      `${customer.firstname} ${
                                          customer.lastname === 'default' ? '' : customer.lastname || ''
                                      }`,
                                  ),
                                  email: customer.email,
                                  subject,
                                  // ticketId: id.slice(-8),
                                  ticketId: ticket_id,
                                  category: category.name,
                                  created: dayjs(created_at).format('DD MMM, YYYY'),
                                  state: status,
                                  assignedTo: textCapitalize(
                                      `${assignee?.firstname || ''} ${assignee?.lastname || ''}`,
                                  ),
                                  rating,
                              }),
                          );
                exportTable(tableColumns, data, 'pdf', 'TicketExport');
            } else if (type === 'all') {
                setLoading(true);
                // fetch all filter result
                const res = await httpGetMain(
                    `tickets?${filters.map((item) => item?.value).join('&')}&per_page=${
                        ticketData.meta?.totalItems
                    }&page=${1}`,
                );
                setLoading(false);
                if (res?.status === 'success') {
                    const data = res?.data?.tickets?.map(
                        ({ customer, subject, id, category, created_at, status, assignee, rating, ticket_id }) => ({
                            name: `${textCapitalize(customer?.firstname || 'Firstname')} ${textCapitalize(
                                customer.lastname === 'default' ? '' : customer.lastname ? customer?.lastname : '',
                            )}`,
                            email: customer.email,
                            subject,
                            // ticketId: id.slice(-8),
                            ticketId: ticket_id,
                            category: category.name,
                            created: dayjs(created_at).format('DD MMM, YYYY'),
                            state: status,
                            assignedTo: textCapitalize(`${assignee?.firstname || ''} ${assignee?.lastname || ''}`),
                            rating,
                        }),
                    );
                    exportTable(tableColumns, data, 'pdf', 'TicketExport');
                } else {
                    NotificationManager.error('Tickets could not be retrieved', 'Error');
                }
            }
        }
    };

    useEffect(() => {
        const filterDropdown = window.document.querySelector('.filter-dropdown');
        const handleDocClick = (e) => {
            if (filterDropdown) {
                if (!filterDropdown.contains(e.target)) {
                    dropdownActive && setDropdownActive(false);
                }
            }
        };

        window.document.addEventListener('click', handleDocClick, true);

        return () => window.document.removeEventListener('click', handleDocClick, true);
    }, [dropdownActive]);

    const handleFilterApply = async (itemsPerPage, currentPage) => {
        const filterQuery = Object.entries(
            filters.reduce((prev, curr) => {
                // get a deep copy of previous object
                const prevRef = JSON.parse(JSON.stringify(prev));
                if (prevRef[curr.id]) {
                    // a filter key exists as key in object
                    // add new value to existing array
                    prevRef[curr.id] = [...prevRef[curr.id], curr.value];
                } else {
                    prevRef[curr.id] = [curr.value];
                }
                return prevRef;
            }, {}),
        )
            .map(([key, value]) => (key === 'Interval' ? value : `${key.toLowerCase()}=${value.join(',')}`))
            .join('&');

        setLoading(true);
        const res = await httpGetMain(`tickets?${filterQuery}&per_page=${itemsPerPage}&page=${currentPage}`);
        setLoading(false);
        if (res?.status === 'success' && res?.data) {
            setTicketData((prev) => ({ ...prev, ...res?.data }));
        } else {
            NotificationManager.error(`Could not fetch tickets`, 'Error');
        }
    };

    return (
        <div className="reports-filter-wrapper">
            <h2>Filter Options</h2>
            <p>Select the Add Filter button to filter and generate your reports</p>
            <div>
                <button type="button" onClick={() => !dropdownActive && setDropdownActive(true)}>
                    <PlusIcon /> Add Filter
                </button>
                {filters.map((item) => (
                    <span
                        key={item?.uuid}
                        onClick={() => setFilters((prev) => prev.filter((x) => x?.uuid !== item?.uuid))}
                        style={{ color: item?.color, background: `${item?.color}10` }}
                    >
                        {item?.label} &nbsp;&nbsp;&nbsp;×
                    </span>
                ))}
                {filters.length > 0 && (
                    <button type="button" onClick={() => handleFilterApply(50, 1)}>
                        Apply Filter
                    </button>
                )}
            </div>

            <FilterDropdown active={dropdownActive} setFilters={setFilters} />

            <div className={`reports-filter-body ${ticketData.tickets ? 'active' : ''}`}>
                {ticketData?.tickets && (
                    <>
                        <div style={{ background: '#fefdfd' }} className="">
                            <div className="btn-toolbar mb-md-0">
                                <ExportDropdown
                                    handlePDFExport={handlePDFExport}
                                    handleCSVExport={handleCSVExport}
                                    exportAll
                                />
                            </div>

                            {/* <div id="delete-btn-wrapper" className="delete-btn-wrapper d-none">
                  <div>
                    <button onClick={openTicketDeleteModal} id="ticket-delete-btn" className="btn" type="button"><i className="bi bi-trash"></i></button>
                  </div>
                  <div>
                    <span><span id="selected-row-count">0</span> ticket(s) selected</span>
                  </div>
              </div> */}
                        </div>
                        <div className="ticket-table-wrapper">
                            <Tickets
                                handleFilterApply={handleFilterApply}
                                tickets={ticketData.tickets}
                                meta={ticketData.meta}
                                tableColumns={tableColumns}
                                handleSelectionChange={handleSelectionChange}
                            />
                        </div>
                    </>
                )}
            </div>
            {loading && (
                <div className={`cust-table-loader ${true && 'add-loader-opacity'}`}>
                    <MoonLoader loading color="#006298" size={30} />
                </div>
            )}
        </div>
    );
}

export default ReportsFilter;
