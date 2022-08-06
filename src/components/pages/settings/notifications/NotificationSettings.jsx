/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './NotificationSettings.scss';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MoonLoader from 'react-spinners/MoonLoader';
import axios from 'axios';
import { connect } from 'react-redux';
import tableIcons from '../../../../assets/materialicons/tableIcons';
import { ReactComponent as DotSvg } from '../../../../assets/icons/dots.svg';
import '../../../../styles/Ticket.css';
import { userTokenConfig } from '../../../../helper';
import store from '../../../../reduxstore/store';
import { config } from '../../../../config/keys';

import RightArrow from '../../../../assets/imgF/arrow_right.png';
import TripleDot from '../../../../assets/imgF/triple_dot.png';
import { getEmailTemplates } from '../../../../reduxstore/actions/emailTemplateActions';
import { ReactComponent as DeleteRedIcon } from '../../../../assets/icons/Delete-red.svg';
import { ReactComponent as EditIcon } from '../../../../assets/icons/Edit.svg';

function NotificationSettings({ getEmailTemplates, isEmailTemplatesLoaded, emailTemplates }) {
    const history = useHistory();
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

    const [changingRow, setChangingRow] = useState(false);
    const [custLoading, setCustLoading] = useState(false);

    const [notifications, setNotifications] = useState(null);

    useEffect(() => {
        if (isEmailTemplatesLoaded) {
            setCustLoading(false);
        } else {
            setCustLoading(true);
        }
    }, [isEmailTemplatesLoaded]);

    //
    useEffect(() => {
        setCustLoading(true);
        getEmailTemplates();
    }, []);

    const tableColumns = [
        {
            title: 'Title',
            field: 'name',
            // render: (rowData) => (
            //   <Link to="#" style={{ textTransform: "capitalize" }}>
            //     {rowData.name}
            //   </Link>
            // ),
        },
        // {
        //   title: "Notification Category",
        //   field: "category",
        //   width: "20px",
        //   // render: (rowData) => (
        //   //   <Link
        //   //     to={`/tickets/${rowData.ticketId}`}
        //   //     style={{ textTransform: "uppercase" }}
        //   //   >
        //   //     {rowData.ticketId.slice(-8)}
        //   //   </Link>

        //   // ),
        // },
        {
            title: 'Subject',
            field: 'subject',
            width: '40%',
        },
        // {
        //   title: "Description",
        //   field: "description",
        //   width: "20%",
        // },
        {
            title: 'Action',
            field: 'dropdownAction',
            render: (rowData) => (
                <div className="form-check form-switch">
                    <button
                        type="submit"
                        className="user-delete-btn me-2 d-inline-block"
                        onClick={() => 
                            history.push(`/settings/notifications/email-template/${rowData?.dropdownAction}`)
                        }
                    >
                        <EditIcon />
                    </button>
                    <button
                        type="submit"
                        className="user-delete-btn ms-3 d-inline-block"
                    >
                        <DeleteRedIcon />
                    </button>
                </div>
                // <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown">
                //     <Dropdown.Toggle variant="transparent" size="sm">
                //         <span className="cust-table-dots">
                //             <DotSvg />
                //         </span>
                //     </Dropdown.Toggle>
                //     <Dropdown.Menu>
                //         <Dropdown.Item eventKey="1">
                //             <Link to={`/settings/notifications/email-template/${rowData?.dropdownAction}`}>
                //                 <span className="black-text">Edit</span>
                //             </Link>
                //         </Dropdown.Item>
                //         <Dropdown.Item eventKey="2">
                //             <span className="black-text">Delete</span>
                //         </Dropdown.Item>
                //     </Dropdown.Menu>
                // </Dropdown>
            ),
        },
    ];

    function AlphacxMTPagination(props) {
        const { ActionsComponent, onPageChange, onRowsPerPageChange, ...tablePaginationProps } = props;

        return (
            <TablePagination
                {...tablePaginationProps}
                rowsPerPageOptions={[10, 20, 30]}
                rowsPerPage={5}
                count={20}
                page={1 - 1}
                onPageChange={onPageChange}
                // when the number of rows per page changes
                onRowsPerPageChange={(event) => {
                    setChangingRow(true);
                    // getPaginatedTickets(event.target.value, 1);
                }}
                ActionsComponent={(subprops) => {
                    const { onPageChange, ...actionsComponentProps } = subprops;
                    return (
                        <ActionsComponent
                            {...actionsComponentProps}
                            onPageChange={(event, newPage) => {
                                // fetch tickets with new current page
                                // getPaginatedTickets(meta.itemsPerPage, newPage + 1);
                            }}
                            onRowsPerPageChange={(event) => {
                                // fetch tickets with new rows per page
                                // getPaginatedTickets(event.target.value, meta.currentPage);
                            }}
                        />
                    );
                }}
            />
        );
    }
    return (
        <div className="notification-settings">
            {custLoading && (
                <div className="cust-table-loader">
                    <MoonLoader loading={custLoading} color="#006298" size={30} />
                </div>
            )}
            <div className="card card-body bg-white border-0 ">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <span>Notification Settings</span>
                    </h6>
                </div>
                <div className="d-flex justify-content-between align-baseline">
                    <h5 className="mt-3 mb-4 f-16 fw-bold">Notification Management</h5>
                    <div>
                        <Link className="btn btn-sm acx-btn-primary px-4" to="/settings/notifications/email-template">
                            Add Notification
                        </Link>
                    </div>
                </div>
                <div className="ticket-table-wrapper" style={{ paddingTop: 70 }}>
                    <div
                        id="alphacxMTable"
                        className="pb-5 acx-ticket-cust-table acx-ticket-table acx-user-table-2 p-4 fit-content"
                    >
                        <MuiThemeProvider theme={tableTheme}>
                            {emailTemplates && (
                                <MaterialTable
                                    columns={tableColumns}
                                    title=""
                                    icons={tableIcons}
                                    data={
                                        emailTemplates
                                            ? emailTemplates.map(({ title, subject, id }) => ({
                                                  name: title,
                                                  subject,
                                                  dropdownAction: id,
                                              }))
                                            : []
                                    }
                                    options={{
                                        search: true,
                                        selection: false,
                                        // exportButton: true,
                                        tableLayout: 'auto',
                                        paging: true,
                                        pageSize: 5,
                                        headerStyle: {
                                            // backgroundColor: '#f8f9fa'
                                            backgroundColor: '#fefdfd',
                                        },
                                    }}
                                    components={
                                        {
                                            // Pagination: AlphacxMTPagination,
                                        }
                                    }
                                />
                            )}
                        </MuiThemeProvider>
                    </div>
                </div>
                {/* <div className="articleList">
          <div className="header">
            <p>Name</p>
            <p>Notification Category</p>
            <p>Subject</p>
            <p>Description </p>
          </div>
          {notifications?.map((not, i) => (
            <TableItem key={i} not={not} />
          ))}
        </div> */}
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    isEmailTemplatesLoaded: state.emailTemplate.isEmailTemplatesLoaded,
    emailTemplates: state.emailTemplate.emailTemplates,
});

export default connect(mapStateToProps, { getEmailTemplates })(NotificationSettings);
