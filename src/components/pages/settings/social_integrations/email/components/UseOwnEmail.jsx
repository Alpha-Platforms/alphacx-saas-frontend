/* eslint-disable */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { css } from '@emotion/css';
import Gmail from '../../../../../../assets/imgF/gmail.png';
import OtherMail from '../../../../../../assets/imgF/otherMail.png';
import MicrosoftOffice from '../../../../../../assets/imgF/microsoftOffice.png';
import { brandKit } from './../../../../../../helper';

function UseOwnEmail({ emailState, setEmailState, setActivateSaveBtn }) {

    const handleMailServerChange = (e) => {
        if (e.target.checked) {
            setEmailState({
                ...emailState,
                mailServer: e.target.value,
            });
        }
    };

    const handleConfigChange = (e) => {
        let { name, value, type, checked } = e.target;
        // if the input type is text, use `value` else use `checked`
        value = type === 'checkbox' ? checked : value;

        if(
            emailState.emailConfig.email 
            && emailState.emailConfig.host 
            && emailState.emailConfig.password 
            && emailState.emailConfig.port
        ) {setActivateSaveBtn(true)}

        setEmailState({
            ...emailState,
            emailConfig: {
                ...emailState.emailConfig,
                [name]: value,
            },
        });
    };

    const handleOutgoingConfig = (e) => {
        let { name, value, type, checked } = e.target;
        // if the input type is text, use `value` else use `checked`
        value = type === 'checkbox' ? checked : value;

        if(
            emailState.outgoingEmailConfig.type === 'smtp' 
            && emailState.outgoingEmailConfig.email 
            && emailState.outgoingEmailConfig.host 
            && emailState.outgoingEmailConfig.password 
            && emailState.outgoingEmailConfig.port
        ){
            setActivateSaveBtn(true)
        } else if(emailState.outgoingEmailConfig.email && emailState.outgoingEmailConfig.apiKey) {
            setActivateSaveBtn(true)
        }



        setEmailState({
            ...emailState,
            outgoingEmailConfig: {
                ...emailState.outgoingEmailConfig,
                [name]: value,
            },
        });
    };

    return (
        <div className="card-body p-0" id="mail-server">           
           
            {/* emailState.emailSystem === 'imap' ? 'mail-active' : '' */}                    
            {/* onClick={() => setEmailState({...emailState, emailSystem: 'imap', }) } */}                    

            <div id="email-controller" className={emailState.emailSystem === 'imap' ? '' : 'd-none'}>               

                {/* INCOMING EMAIL */}
                {(emailState.mailServer === 'both' || emailState.mailServer === 'incoming-only') && (
                    <div className="incoming-mail mt-4 px-3">
                        <div className="row">
                            <div className="form-group mt-2 col-6">
                                <label className="form-label">
                                    Your Support Email <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    autoComplete="off"
                                    value={emailState.emailConfig.email || ''}
                                    onChange={handleConfigChange}
                                />
                                <p className="description-text f-12 text-muted mt-1">
                                    <small>This serves as your Return-to address e.g bayo@yourcompany.com</small>
                                </p>
                            </div>
                            <div className="form-group mt-2 col-6">
                                <label className="form-label">
                                    Password <span className="text-danger">*</span>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    autoComplete="new-password"
                                    value={emailState.emailConfig.password || ''}
                                    onChange={handleConfigChange}
                                />
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="incoming-mail" className="form-label">
                                        Incoming Mail Server
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="imap.gmail.com"
                                        id="incoming-mail"
                                        name="host"
                                        value={emailState.emailConfig.host || ''}
                                        onChange={handleConfigChange}
                                    />
                                    <p className="description-text f-12 text-muted mt-1">
                                        <small>IMAP server name to fetch the details</small>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="port" className="form-label">
                                        IMAP Port<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="993"
                                        min={0}
                                        name="port"
                                        value={emailState.emailConfig.port || ''}
                                        onChange={handleConfigChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row ms-1">
                            <div className="form-check">
                                <input
                                    className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                                    type="checkbox"
                                    id="ssl"
                                    name="tls"
                                    checked={emailState.emailConfig.tls || false}
                                    onChange={handleConfigChange}
                                />
                                <label className="form-check-label" htmlFor="ssl">
                                    Use SSL
                                </label>
                            </div>
                        </div>

                        <div />
                    </div>
                )}

                {/* OUTGOING EMAIL */}
                {(emailState.mailServer === 'both' || emailState.mailServer === 'outgoing-only') && (
                    <div className="outgoing-mail">
                        <div className="row py-3 m-0 bg-light">
                            <div className="col-md-3">
                                <div className="form-check">
                                    <input
                                        className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                                        type="radio"
                                        id="incoming-only"
                                        name="mail-server"
                                        value="incoming-only"
                                        checked={emailState.outgoingEmailConfig?.type === 'smtp'}
                                        onChange={() =>
                                            setEmailState({
                                                ...emailState,
                                                outgoingEmailConfig: {
                                                    ...emailState.outgoingEmailConfig,
                                                    type: 'smtp',
                                                },
                                            })
                                        }
                                    />
                                    <label className="form-check-label f-14" htmlFor="incoming-only">
                                        Use SMTP
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-check">
                                    <input
                                        className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                                        type="radio"
                                        id="outgoing-only"
                                        name="mail-server"
                                        value="outgoing-only"
                                        checked={emailState.outgoingEmailConfig?.type === 'api'}
                                        onChange={() =>
                                            setEmailState({
                                                ...emailState,
                                                outgoingEmailConfig: {
                                                    ...emailState.outgoingEmailConfig,
                                                    type: 'api',
                                                },
                                            })
                                        }
                                    />
                                    <label className="form-check-label f-14" htmlFor="outgoing-only">
                                        Use SendGrid API
                                    </label>
                                </div>
                            </div>
                        </div>

                        {emailState.outgoingEmailConfig.type === 'smtp' ? (
                            <div className='px-3'>
                                {/* <div className="alert-danger text-dark mt-3 mb-2">
                                    <p className="p-2">
                                        Gmail limits the number of emails sent per day{' '}
                                        <span>
                                            <a href="#" className="text-custom ms-2">
                                                Click here to learn more
                                            </a>
                                        </span>
                                    </p>
                                </div> */}

                                <div className="row">
                                    <div className="form-group mt-2 col-6">
                                        <label className="form-label">
                                            Your Support Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            autoComplete="off"
                                            value={emailState.outgoingEmailConfig.email || ''}
                                            onChange={handleOutgoingConfig}
                                        />
                                        <p className="description-text f-12 text-muted mt-1">
                                            <small>
                                                This serves as your Return-to Address
                                            </small>
                                        </p>
                                    </div>
                                    <div className="form-group mt-2 col-6">
                                        <label className="form-label">
                                            Your Password <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="password"
                                            autoComplete="new-password"
                                            value={emailState.outgoingEmailConfig.password || ''}
                                            onChange={handleOutgoingConfig}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="outgoing-mail" className="form-label">
                                                Outgoing Mail Server
                                                <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="smtp.gmail.com"
                                                name="host"
                                                value={emailState.outgoingEmailConfig.host || ''}
                                                onChange={handleOutgoingConfig}
                                                id="outgoing-host"
                                            />
                                            <p className="description-text f-12 text-muted mt-1">
                                                SMTP server URL to fetch the details
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="port" className="form-label">
                                                SMTP Port<span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="port"
                                                value={emailState.outgoingEmailConfig.port || ''}
                                                onChange={handleOutgoingConfig}
                                                placeholder="993"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mt-2">
                                    <div className="col-md-6">
                                        <div className="form-group">
                                            <label htmlFor="outgoing-mail" className="form-label">
                                                Sender Name
                                                <span className="text-danger"> *</span>
                                            </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="John Doe"
                                                name="from"
                                                value={emailState.outgoingEmailConfig.from || ''}
                                                onChange={handleOutgoingConfig}
                                                id="outgoing-from"
                                            />
                                            <p className="description-text f-12 text-muted mt-1">
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-md-6 pt-4">
                                        <div className="form-check mt-2">
                                            <input
                                                className={`form-check-input ${css({ '&:checked': { ...brandKit({ bgCol: 0 }) } })}`}
                                                type="checkbox"
                                                name="tls"
                                                checked={emailState.outgoingEmailConfig.tls || false}
                                                onChange={handleOutgoingConfig}
                                                id="outgoing-ssl"
                                            />
                                            <label className="form-check-label" htmlFor="ssl">
                                                Use SSL
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='px-3'>
                                {/* SendGrid API */}
                                <div className="row">
                                    <div className="form-group mt-2 col-6">
                                        <label className="form-label">
                                            SendGrid API Key <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control"
                                            name="apiKey"
                                            value={emailState.outgoingEmailConfig.apiKey || ''}
                                            onChange={handleOutgoingConfig}
                                        />
                                    </div>
                                    <div className="form-group mt-2 col-6">
                                        <label className="form-label">
                                            Sender Email <span className="text-danger">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name="email"
                                            autoComplete="off"
                                            value={emailState.outgoingEmailConfig.email || ''}
                                            onChange={handleOutgoingConfig}
                                        />
                                        <p className="description-text f-12 text-muted mt-1">
                                            <small>
                                                This serves as your Return-to address e.g bayo@yourcompany.com
                                            </small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default connect()(UseOwnEmail);
