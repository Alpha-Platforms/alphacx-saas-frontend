/* eslint-disable */
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/css';
import './newSupportEmail.scss';
import { NotificationManager } from 'react-notifications';
import { Modal } from 'react-responsive-modal';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { httpPatchMain, httpPostMain } from '../../../../../../helpers/httpMethods';
import RightArrow from '../../../../../../assets/imgF/arrow_right.png';
import UseOwnEmail from './UseOwnEmail';
import { getConfigs } from '../../../../../../reduxstore/actions/configActions';
import { ClipLoader } from 'react-spinners';
import { brandKit } from './../../../../../../helper';

function NewSupportEmail({ configs, getConfigs }) {
    const { search } = useLocation();
    const history = useHistory();
    const type = new URLSearchParams(search).get('type');

    const [defaultServer, setDefaultServer] = useState(false);
    const [activateSaveBtn, setActivateSaveBtn] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [checkingConnection, setCheckingConnection] = useState(false)
    const [emailState, setEmailState] = useState({
        activeRadio: 'own-server',
        mailServer: 'incoming-only',
        emailSystem: 'imap',
        emailConfig: {
            tls: false,
            host: '',
            email: '',
            port: '',
            password: '',
        },
        outgoingEmailConfig: {
            email: '',
            password: '',
            tls: false,
            from: '', // sender email
            host: '',
            port: '',
            apiKey: '',
            type: 'smtp',
        },
    });

    useEffect(() => {
        if (type === 'outgoing') {
            setEmailState((prev) => ({
                ...prev,
                activeRadio: 'outgoing',
                mailServer: 'outgoing-only',
            }));
        }
    }, [type]);

    useEffect(() => {        
        const { email, port, tls, host, password } = emailState.emailConfig;
        if(email && port && host && password){
            setActivateSaveBtn(true)
        } else if(activateSaveBtn) {
            setActivateSaveBtn(false)
        }
    }, [emailState.emailConfig])
    

    useEffect(() => {
        if (configs) {
            setEmailState((prev) => ({
                ...prev,
                emailConfig: {
                    ...prev.emailConfig,
                    tls: configs?.email_config?.tls || false,
                    host: configs?.email_config?.host || '',
                    email: configs?.email_config?.email || '',
                    port: configs?.email_config?.port || null,
                    password: configs?.email_config?.password || '',
                },
                outgoingEmailConfig: {
                    ...prev.outgoingEmailConfig,
                    tls: configs?.outgoing_email_config?.tls || false,
                    host: configs?.outgoing_email_config?.host || '',
                    port: configs?.outgoing_email_config?.port || '',
                    email: configs?.outgoing_email_config?.email || '',
                    password: configs?.outgoing_email_config?.password || '',
                    type: configs?.outgoing_email_config?.type || 'smtp',
                    apiKey: configs?.outgoing_email_config?.apiKey || '',
                    from: configs?.outgoing_email_config?.from || '',
                },
            }));
        }
    }, [configs]);

    const handleServerChange = (e) => {
        if (e.target.checked) {
            setEmailState({ ...emailState, activeRadio: e.target.value });
        }
    };

    const handleSubmit = async () => {
        if (emailState.mailServer === 'incoming-only') {
            const { email, port, tls, host, password } = emailState.emailConfig;

            const data = {
                email_config: {
                    email,
                    password,
                    host,
                    port: Number(port),
                    tls,
                },
            };

            setCheckingConnection(true)
            // const resp = await httpPostMain('settings/verify-incoming-config', JSON.stringify(data));

            // if(resp?.status === 'success'){
            if (true) {
                const res = await httpPatchMain('settings/email-config', JSON.stringify(data));

                if (res?.status === 'success') {
                    getConfigs();
                    NotificationManager.success('Settings successfull saved!', 'Error', 4000);
                    history.push('/settings/integrations/email');

                } else {
                    NotificationManager.error(res?.er?.message, 'Error', 4000);
                }
            } else {
                // connect invalid
                setActivateSaveBtn(false)
                NotificationManager.error('Your IMAP parameters are invalid', 'Invalid Parameters', 4000);
            }
            setCheckingConnection(false)

            
        } else {
            // executing outgoing only
            const { email, password, port, tls, host, from, apiKey, type } = emailState.outgoingEmailConfig;

            if (type === 'api') {
                if (!email || !apiKey) return NotificationManager.error('Fill up required fields', 'Error', 4000);
            } else if (!email && !password && !port && !host)
                return NotificationManager.error('Fill up required fields', 'Error', 4000);

            const data = {
                outgoingEmailConfig:
                    type === 'api'
                        ? {
                              email,
                              apiKey: apiKey || null,
                              type,
                          }
                        : {
                              email,
                              password,
                              from,
                              host,
                              port: Number(port),
                              tls,
                              apiKey: apiKey || null,
                              type,
                          },
            };

            const res = await httpPatchMain('settings/outgoing-email-config', JSON.stringify(data));

            if (res?.status === 'success') {
                getConfigs();
                NotificationManager.success('Settings successfull saved!', 'Email Configuration', 4000);
                history.push('/settings/integrations/email');

            } else {
                return NotificationManager.error(res?.er?.message, 'Error', 4000);
            }
        }
    };

    return (
        <div className="new-support-email">
            <div className="card card-body bg-white border-0 ">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <Link to="/settings/integrations">
                            <span className="text-custom">Integrations</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <Link to="/settings/integrations/email">
                            <span className="text-custom">Email</span>{' '}
                        </Link>
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <span>Email Settings</span>
                    </h6>
                </div>

                <div className="col-md-8">
                    <h5 className="mt-3 mb-2 f-16 fw-bold">Email Settings</h5>

                    <div className="card email-settings-card my-4">
                        <div className="card-header p-3 py-4">
                            {/* <p className="f-16 fw-bold mb-3">Mail Server</p> */}
                            <div className="row">
                                <div className="col-md-12 d-flex my-1">
                                    <h5 className="fs-6 fw-bold me-4">Use Mail Server for:</h5>
                                    <div className="form-check">
                                        <input
                                            className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                                            name="mail-radio-1"
                                            type="radio"
                                            id="radio-1"
                                            value="incoming"
                                            checked={!(emailState.activeRadio === 'outgoing')}
                                            // onChange={handleServerChange}
                                            onChange={(e) =>
                                                setEmailState({
                                                    ...emailState,
                                                    mailServer: 'incoming-only',
                                                    activeRadio: e.target.value
                                                })
                                            }
                                        />
                                        <label className="form-check-label f-14" htmlFor="radio-1">
                                            Incoming Mail Settings
                                        </label>
                                    </div>

                                  


                                    <div className="form-check ms-4">
                                        <input
                                            className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                                            name="mail-radio-1"
                                            type="radio"
                                            id="radio-2"
                                            value="outgoing"
                                            checked={emailState.activeRadio === 'outgoing'}
                                            onChange={(e) =>
                                                setEmailState({
                                                    ...emailState,
                                                    mailServer: 'outgoing-only',
                                                    activeRadio: e.target.value
                                                })
                                            }
                                        />
                                        <label className="form-check-label f-14" htmlFor="radio-2">
                                            Outgoing Mail Settings
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <UseOwnEmail emailState={emailState} setEmailState={setEmailState} setActivateSaveBtn={setActivateSaveBtn} />

                        <div className="d-flex justify-content-end my-4 mx-3 text-end">
                            <Link
                                to="/settings/integrations/email"
                                className="btn btn-sm px-3 me-2 border reset-btn-outline"
                            >
                                Cancel
                            </Link>
                            <button
                                className={`btn btn-sm px-4 ${css({
                                    ...brandKit({ bgCol: 0 }),
                                    color: 'white',
                                    '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                })}`}
                                id="save-changes"
                                data-bs-toggle="modal"
                                data-bs-target="#successModal"
                                onClick={handleSubmit}
                                disabled={!activateSaveBtn}
                                // disabled
                            >
                                {checkingConnection ? <span className="valign-middle-spinner"><ClipLoader size={18} color="#FFF" />{' Checking Connection'}</span> : 'Save'}
                                
                            </button>
                        </div>
                       
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    configs: state.config.configs,
});

export default connect(mapStateToProps, { getConfigs })(NewSupportEmail);
