/* eslint-disable */
import React, { useEffect, useState } from 'react';

import { useParams, Link, useHistory } from 'react-router-dom';

import { connect } from 'react-redux';
import MaterialTable from 'material-table';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import { Dropdown } from 'react-bootstrap';
import RightArrow from '../../../../../assets/imgF/arrow_right.png';
import tableIcons from '../../../../../assets/materialicons/tableIcons';
import NewSupportEmail from './components/NewSupportEmail';
import { ReactComponent as DotSvg } from '../../../../../assets/icons/dots.svg';

import './settingsEmail.scss';

function EmailSettings({ configs, isConfigsLoaded }) {
    const history = useHistory();
    const { action } = useParams();
    const [pageAction, setPageAction] = useState(action);

    useEffect(() => {
        setPageAction(action);
        console.clear();
        // console.log(action);
    }, [action]);

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
            field: 'name',
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
            title: '',
            field: 'dropdownAction',
            render: (rowData) => (
                <Dropdown id="cust-table-dropdown" className="ticket-status-dropdown email-dropdown">
                    <Dropdown.Toggle variant="transparent" size="sm">
                        <span className="cust-table-dots">
                            <DotSvg />
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item
                            to
                            eventKey="1"
                            onClick={() =>
                                history.push(
                                    `/settings/integrations/email/email-form${
                                        rowData?.idx === 1 ? '?type=outgoing' : ''
                                    }`,
                                )
                            }
                        >
                            {/* <Link to="/settings/integrations/email/email-form"> */}
                            <span className="black-text">Edit</span>
                            {/* </Link> */}
                        </Dropdown.Item>
                        <Dropdown.Item eventKey="2">
                            <span className="black-text">Delete</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            ),
        },
    ];

    useEffect(() => {
        if (isConfigsLoaded) {
            if (!configs?.email_config?.email && !configs?.email_config?.host && !configs?.email_config?.port) {
                history.push('/settings/integrations/email/email-form');
            }

            // console.log('EMAIL CONFIGS => ', configs);
        }
    }, [isConfigsLoaded]);

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
                        {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <span>Email</span>
                    </h6>
                </div>
                <div className="d-flex justify-content-between flex-row align-items-center">
                    <h5 className="mt-3 mb-4 fs-6 fw-bold">Email Settings</h5>
                    <div>
                        {/* <a className="btn btn-outline-gray btn-sm">
              <span className="d-flex justify-content-center align-items-center">
                <span>Advanced Settings</span>
              </span>
            </a> */}
                        <button
                            disabled
                            className="btn btn-primary btn-sm ms-2"
                            to="/settings/email/integrations/email-form"
                        >
                            <span>New support email</span>
                        </button>
                    </div>
                </div>

                {/* <div className="text-center empty-state">
                        <div className="my-5 mb-4">
                          <EmailEmptySvg />
                        </div>

                        <p className="text-center">
                            You currently have no Email record at
                            <br/>
                            the moment
                        </p>
                        <Link className="btn btn-sm btn-primary" to="/settings/email/email-form">
                            New support email
                        </Link>
                    </div> */}
                <div id="result" />

                <div className="ticket-table-wrapper" style={{ paddingTop: 70 }}>
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
                                        configs?.email_config
                                            ? [configs?.email_config, configs?.outgoing_email_config].map(
                                                  (emailConfig, idx) => ({
                                                      name:
                                                          idx === 0
                                                              ? 'Incoming Mail Server'
                                                              : idx === 1
                                                              ? 'Outgoing Mail Server'
                                                              : '',
                                                      email: emailConfig?.email,
                                                      host: emailConfig?.host,
                                                      port: emailConfig?.port,
                                                      idx,
                                                  }),
                                              )
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
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    configs: state.config.configs,
    isConfigsLoaded: state.config.isConfigsLoaded,
});

export default connect(mapStateToProps, null)(EmailSettings);
