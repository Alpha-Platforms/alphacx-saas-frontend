/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './NotificationSettings.scss';
import { Dropdown } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import MoonLoader from 'react-spinners/MoonLoader';
import { css } from '@emotion/css';
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
import { brandKit } from './../../../../helper';
import { templateTypes } from './components/placeholders';
import { NotificationManager } from 'react-notifications';
import { httpDeleteMain } from 'helpers/httpMethods';
import Modal from 'react-responsive-modal';

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
    const [isAllTemplatesSet, setIsAllTemplatesSet] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false)
    const [templateId, setTemplateId] = useState()
    

    useEffect(() => {
        if (isEmailTemplatesLoaded) {
            setCustLoading(false);
            setIsAllTemplatesSet(emailTemplates.length === templateTypes.length)
        } else {
            setCustLoading(true);
        }
    }, [isEmailTemplatesLoaded]);

    useEffect(() => {
        setCustLoading(true);
        getEmailTemplates();
    }, []);

    const handleDelete = async () => {
        setDeleteConfirm(false)
        const res = await httpDeleteMain(`settings/email-template/${templateId}`);
        if (res.status === 'success') {
            getEmailTemplates()
        } else {
            NotificationManager.error('Template could not be deleted', 'Delete Failed', 4000);
        }
    }

    const tableColumns = [
        {
            title: 'Title',
            field: 'name',
            render: (rowData) => (
                <button
                    className="btn-link text-decoration-none text-capitalize"
                    onClick={() => 
                        history.push(`/settings/notifications/email-template/${rowData?.dropdownAction}`)
                    }
                >{rowData.name}
                </button>
            ),
        },
        {
            title: 'Subject',
            field: 'subject',
            width: '40%',
        },
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
                        onClick={() => {setDeleteConfirm(true); setTemplateId(rowData?.dropdownAction)}}
                    >
                        <DeleteRedIcon />
                    </button>
                </div>
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
                    <MoonLoader loading={custLoading} color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
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
                        {!isAllTemplatesSet && <Link className={`btn btn-sm px-3 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`} to="/settings/notifications/email-template">
                            Add Notification
                        </Link>}
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
            </div>
            {/* confirm modal */}
            <Modal open={deleteConfirm} onClose={() => setDeleteConfirm(false)} center>
                <div className="p-5 w-100">
                    <h6 className="mb-5">Are you sure you want to delete this template?</h6>
                    <div className="d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-sm border cancel px-3"
                            onClick={() => setDeleteConfirm(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm ms-2 px-3 ${css({
                                ...brandKit({ bgCol: 0 }),
                                color: 'white',
                                '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                            })}`}
                            onClick={handleDelete}
                        >
                            Yes
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    isEmailTemplatesLoaded: state.emailTemplate.isEmailTemplatesLoaded,
    emailTemplates: state.emailTemplate.emailTemplates,
});

export default connect(mapStateToProps, { getEmailTemplates })(NotificationSettings);
