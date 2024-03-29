/* eslint-disable */
import React, { useEffect, useState } from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';

import { connect, useDispatch } from 'react-redux';
import MaterialTable from 'material-table';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Dropdown } from 'react-bootstrap';
import RightArrow from '../../../../../assets/imgF/arrow_right.png';
import tableIcons from '../../../../../assets/materialicons/tableIcons';
import NewSupportEmail from './components/NewSupportEmail';
import { ReactComponent as DotSvg } from '../../../../../assets/icons/dots.svg';
import { ReactComponent as EditIcon } from '../../../../../assets/icons/Edit.svg';
import { ReactComponent as DeleteRedIcon } from '../../../../../assets/icons/Delete-red.svg';
import { setTenantInfo } from '../../../../../reduxstore/actions/tenantInfoActions';
import { getConfigs } from '../../../../../reduxstore/actions/configActions';
import './settingsEmail.scss';
import { brandKit, wordCapitalize } from 'helper';
import Swal from 'sweetalert2';
import { css } from '@emotion/css';
import { httpPatch, httpDeleteMain } from 'helpers/httpMethods';
import Modal from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';

function EmailSettings({ configs, isConfigsLoaded, tenantInfo, getConfigs }) {
    const history = useHistory();
    const { action } = useParams();
    const [pageAction, setPageAction] = useState(action);
    const [hasEmailConfig, setHasEmailConfig] = useState(false);
    const [showOnOffToggle, setShowOnOffToggle] = useState(false)
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [configToDelete, setConfigToDelete] = useState('');
    const [emailConfigData, setEmailConfigData] = useState({incoming: null, outgoing: null});

    const dispatch = useDispatch();

    useEffect(() => {
        setPageAction(action);
    }, [action]);

    useEffect(() => {
        if (isConfigsLoaded) {
            if (!configs?.email_config?.email && !configs?.outgoing_email_config) {
                history.push('/settings/integrations/email/email-form');
            }

            if (configs?.email_config) {
                setShowOnOffToggle(true);
            }
            
            setEmailConfigData((prev) => ({...prev, incoming: configs?.email_config, outgoing: configs?.outgoing_email_config}));
        }
    }, [isConfigsLoaded, configs]);

    useEffect(() => {
        setHasEmailConfig(tenantInfo?.tenantInfo?.has_email_config);
    }, [tenantInfo]);

    const patchHasEmailConfig = async () => {
        const res = await httpPatch(`auth/tenant-info/${tenantInfo?.tenantInfo?.domain}`, {hasEmailConfig: !hasEmailConfig});
        if (res.status === 'success') {
            dispatch(setTenantInfo(res?.data));
        }
    }

    const handleConfigDelete = async () => {
        // There's nothing else to differentiate incoming/outgoing, so for now...
        setDeleteConfirm(false)
        if (configToDelete) {
            const res = await httpDeleteMain(`settings/outgoing-email-config`);
            if (res.status === 'success') {
                getConfigs();
                return NotificationManager.success(res.message, 'Email Configuration');
            } else {
                return NotificationManager.error(res.er.message);
            }
        } else {
            const res = await httpDeleteMain(`settings/email-config`);
            if (res.status === 'success') {
                getConfigs();
                return NotificationManager.success(res.message, 'Email Configuration');
            } else {
                return NotificationManager.error(res.er.message);
            }
        }
    }

    async function handleActiveChange () {
        Swal.fire({
            title: '',
            text: `Do you want to turn ${hasEmailConfig? 'off' : 'on'} Email to Ticket?`,
            showCancelButton: true,
            confirmButtonColor: brandKit({ bgCol: 0 })?.backgroundColor,
            cancelButtonColor: '#ffffff',
            cancelButtonText: 'Cancel',
            confirmButtonText: 'Yes',
            customClass: {
                cancelButton: 'user-activation-cancel-btn',
                confirmButton: 'user-activation-confirm-btn',
                container: 'user-activation-container',
                popup: 'user-activation-popup',
                validationMessage: 'user-activation-validation-msg',
                htmlContainer: 'user-activation-html-container',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                patchHasEmailConfig()
                setHasEmailConfig(!hasEmailConfig);
                
            }
        });
    }

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

    const tableColumns = [
        {
            title: 'Name',
            // field: <span className='fbb'>{'name'}</span>,
            render: (rowData) => (<a href='#' type='button' onClick={() => history.push(
                `/settings/integrations/email/email-form${
                    rowData?.idx === 1 ? '?type=outgoing' : ''
                }`,
            )} className='fbb'>{rowData.name}</a>)
        },
        {
            title: 'Email',
            field: 'email',
        },
        {
            title: 'Host',
            field: 'host',
        },
        {
            title: 'Port',
            field: 'port',
        },
        {
            title: 'Action',
            field: 'dropdownAction',
            render: (rowData) => (
                <>
                    <button
                        onClick={() => history.push(
                        `/settings/integrations/email/email-form${
                            rowData?.idx === 1 ? '?type=outgoing' : ''
                        }`)}>
                        <EditIcon />
                    </button>
                    <button 
                        className="ms-3"
                        onClick={() => {setDeleteConfirm(true); setConfigToDelete(rowData?.type)}}>
                        <DeleteRedIcon />
                    </button>
                </>
                        
                            
            ),
        },
    ];

    return pageAction === 'email-form' ? (
        <NewSupportEmail />
    ) : (
        <div className=" settings-email">
            <div className="card card-body bg-white border-0 mt-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <Link to="/settings/integrations">
                            <span className="text-custom">Integrations</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />{' '}
                        <span>Email</span>
                    </h6>
                </div>
                <div className="d-flex justify-content-between flex-row align-items-center">
                    <h5 className="mt-3 mb-4 fs-6 fw-bold">Email Settings</h5>
                </div>

                {showOnOffToggle && <div className="form-check form-switch d-flex justify-content-end mb-2">
                    <label htmlFor="" className="fw-bold">Email to Ticket</label>
                    <input
                        className={`form-check-input form-check-input-lg ms-1 ${css({
                            '&:checked': { ...brandKit({ bgCol: 0 }) },
                        })}`}
                        checked={hasEmailConfig}
                        onChange={handleActiveChange}
                        readOnly
                        type="checkbox"
                    />
                </div>}

                <div id="result" />

                <div className="ticket-table-wrapper" style={{ paddingTop: 10 }}>
                    {(!emailConfigData?.incoming || !emailConfigData?.outgoing) && 
                        <Link to={`/settings/integrations/email/email-form${emailConfigData?.incoming?.email ? '?type=outgoing' : '?type=incoming'}`} className={`btn btn-sm me-2 float-end ${css({
                            ...brandKit({ bgCol: 0 }),
                            color: 'white',
                            '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                        })}`}>Add Config</Link>
                    }
                    <div
                        id="alphacxMTable"
                        className="pb-5 acx-ticket-cust-table acx-ticket-table acx-user-table-2 p-4 fit-content"
                    >
                        <MuiThemeProvider theme={tableTheme}>
                            {configs && (
                                <MaterialTable
                                    columns={tableColumns}
                                    title=""
                                    icons={tableIcons}
                                    data={
                                         Object.values(emailConfigData).filter(i => i !== null).map(
                                            (emailConfig, idx) => ({
                                                name:
                                                emailConfig?.type
                                                        ? 'Outgoing Mail Server'
                                                        : 'Incoming Mail Server',
                                                email: emailConfig?.email,
                                                host: emailConfig?.host,
                                                port: emailConfig?.port,
                                                idx,
                                                type: emailConfig?.type,
                                            })
                                        )
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
                    <h6 className="mb-5">Are you sure you want to delete this setting?</h6>
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
                            onClick={handleConfigDelete}
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
    configs: state.config.configs,
    isConfigsLoaded: state.config.isConfigsLoaded,
    tenantInfo: state.tenantInfo,
});

export default connect(mapStateToProps, {getConfigs})(EmailSettings);
