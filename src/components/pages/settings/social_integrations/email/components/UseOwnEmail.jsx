/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import Gmail from "../../../../../../assets/imgF/gmail.png";
import OtherMail from "../../../../../../assets/imgF/otherMail.png";
import MicrosoftOffice from "../../../../../../assets/imgF/microsoftOffice.png";
import {connect} from 'react-redux';

const UseOwnEmail = ({emailState, setEmailState}) => {

    const handleMailServerChange = (e) => {
        if (e.target.checked) {
            setEmailState({
                ...emailState,
                mailServer: e.target.value
            });
        }
    };

    const handleConfigChange = (e) => {
        let {name, value, type, checked} = e.target;
        // if the input type is text, use `value` else use `checked`
        value = type === "checkbox"
            ? checked
            : value;

        setEmailState({
            ...emailState,
            emailConfig: {
                ...emailState.emailConfig,
                [name]: value
            }
        });
    };

    const handleOutgoingConfig = (e) => {
        let {name, value, type, checked} = e.target;
        // if the input type is text, use `value` else use `checked`
        value = type === "checkbox"
            ? checked
            : value;

        setEmailState({
            ...emailState,
            outgoingEmailConfig: {
                ...emailState.outgoingEmailConfig,
                [name]: value
            }
        });
    }

    return (
        <div className="card-body " id="mail-server">
            <p>Email system</p>
            <div className="row gx-3">
                <div className="col-md-3 text-center">
                    <a
                        className={`py-3 px-5 p-sm-3 rounded bg-outline-mail d-inline-block ${emailState.emailSystem === "imap"
                        ? "mail-active"
                        : ""}`}
                        onClick={() => setEmailState({
                        ...emailState,
                        emailSystem: "imap"
                    })}>
                        <img src={OtherMail} alt="other" className="img-fluid"/>
                    </a>
                    <p className="mt-1 description-text f-12 text-muted">IMAP</p>
                </div>

                <div className="col-md-3 text-center">

                    <a
                        className={`py-3 px-4 rounded bg-outline-mail d-inline-block ${emailState.emailSystem === "microsoft"
                        ? "mail-active"
                        : ""}`}
                        id="microsoft"
                        onClick={() => setEmailState({
                        ...emailState,
                        emailSystem: "microsoft"
                    })}>
                        <img src={MicrosoftOffice} alt="microsoft" className="img-fluid"/>
                    </a>
                    <p className="mt-1 description-text f-12 text-muted">
                        Microsoft office
                        <br/>
                        365
                    </p>
                </div>

                <div className="col-md-3 text-center">
                    <a
                        className={`py-3 px-5 p-sm-3 rounded bg-outline-mail d-inline-block ${emailState.emailSystem === "gmail"
                        ? "mail-active"
                        : ""}`}
                        id="gmail"
                        onClick={() => setEmailState({
                        ...emailState,
                        emailSystem: "gmail"
                    })}>
                        <img src={Gmail} alt="gmail" className="img-fluid"/>
                    </a>
                    <p className="mt-1 description-text f-12 text-muted">Gmail</p>
                </div>
            </div>
            <div
                id="email-controller"
                className={emailState.emailSystem === "imap"
                ? ""
                : "d-none"}>
                <h5 className="fs-6 fw-bold mt-2 mb-3">Use Mail Server for</h5>


                <ul className="nav nav-pills" id="fieldTabsSelector" role="tablist">
                    <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link px-0 me-5 ${
                        emailState.mailServer === "incoming-only" && "active"
                        } text-muted`}
                        id="pills-customer-tab"
                        type="button"
                        role="tab"
                        onClick={() => setEmailState({
                        ...emailState,
                        mailServer: "incoming-only"
                    })}
                        aria-controls="customer-field-view"
                        aria-selected="true"
                    >
                        Incoming Mail Settings
                    </button>
                    </li>
                    <li className="nav-item" role="presentation">
                    <button
                        className={`nav-link px-0 me-5 ${
                        emailState.mailServer === "outgoing-only" && "active"
                        } text-muted`}
                        id="pills-ticket-tab"
                        onClick={() => setEmailState({
                        ...emailState,
                        mailServer: "outgoing-only"
                    })}
                        type="button"
                        role="tab"
                        aria-controls="ticket-categoriese-view"
                        aria-selected="false"
                    >
                        Outgoing Mail Settings
                    </button>
                    </li>
                </ul>

                {/* INCOMING EMAIL */}
                {(emailState.mailServer === "both" || emailState.mailServer === "incoming-only") && (
                    <div className="incoming-mail mt-4">
                        <div className="row">
                            <div className="form-group mt-2 col-6">
                                <label className="form-label">
                                    Your Support Email <span className="text-danger">
                                        *</span>
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    autoComplete="off"
                                    value={emailState.emailConfig.email || ""}
                                    onChange={handleConfigChange}/>
                                <p className="description-text f-12 text-muted mt-1">
                                <small>This serves as your Return-to address e.g bayo@yourcompany.com</small>
                                </p>
                            </div>
                            <div className="form-group mt-2 col-6">
                                <label className="form-label">
                                    Password <span className="text-danger">
                                        *</span>
                                </label>
                                <input
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    autoComplete="new-password"
                                    value={emailState.emailConfig.password || ""}
                                    onChange={handleConfigChange}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="incoming-mail" className="form-label">
                                        Incoming Mail Server
                                        <span className="text-danger">
                                            *</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="imap.gmail.com"
                                        id="incoming-mail"
                                        name="host"
                                        value={emailState.emailConfig.host || ""}
                                        onChange={handleConfigChange}/>
                                    <p className="description-text f-12 text-muted mt-1">
                                        <small>IMAP server name to fetch the details</small>
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="port" className="form-label">
                                        IMAP Port<span className="text-danger">
                                            *</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        placeholder="997"
                                        min={0}
                                        name="port"
                                        value={emailState.emailConfig.port || ""}
                                        onChange={handleConfigChange}/>
                                </div>
                            </div>
                        </div>


                        <div className="row ms-1">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    id="ssl"
                                    name="tls"
                                    checked={emailState.emailConfig.tls || false}
                                    onChange={handleConfigChange}/>
                                <label className="form-check-label" htmlFor="ssl">
                                    Use SSL
                                </label>
                            </div>
                        </div>

                        <div></div>
                    </div>
                )}



                {/* OUTGOING EMAIL */}
                {(emailState.mailServer === "both" || emailState.mailServer === "outgoing-only") && (
                    <div className="outgoing-mail mt-2">

                        <div className="row my-3">
                            <div className="col-md-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="incoming-only"
                                        name="mail-server"
                                        value="incoming-only"
                                        checked={emailState.outgoingEmailConfig?.type === "smtp"}
                                        onChange={() => setEmailState({
                                            ...emailState,
                                            outgoingEmailConfig: {
                                                ...emailState.outgoingEmailConfig,
                                                type: 'smtp'
                                            }
                                        })} 
                                        />
                                    <label className="form-check-label f-14" htmlFor="incoming-only">
                                        Use SMTP
                                    </label>
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="radio"
                                        id="outgoing-only"
                                        name="mail-server"
                                        value="outgoing-only"
                                        checked={emailState.outgoingEmailConfig?.type === "api"}
                                        onChange={() => setEmailState({
                                            ...emailState,
                                            outgoingEmailConfig: {
                                                ...emailState.outgoingEmailConfig,
                                                type: 'api'
                                            }
                                        })}
                                    />
                                    <label className="form-check-label f-14" htmlFor="outgoing-only">
                                        use SendGrid API
                                    </label>
                                </div>
                            </div>
                        </div>
                        


                        {emailState.outgoingEmailConfig.type === "smtp" ? <div>
                            <div className="alert-danger text-dark mt-3 mb-2">
                                <p className="p-2">
                                    Gmail limits the number of emails sent per day{" "}
                                    <span>
                                        <a href="#" className="text-custom ms-2">
                                            Click here to learn more
                                        </a>
                                    </span>
                                </p>
                            </div>


                            <div className="row">
                                <div className="form-group mt-2 col-6">
                                    <label className="form-label">
                                        Your Support Email <span className="text-danger">
                                            *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        autoComplete="off"
                                        value={emailState.outgoingEmailConfig.email || ""}
                                        onChange={handleOutgoingConfig}/>
                                    <p className="description-text f-12 text-muted mt-1">
                                    <small>This serves as your Return-to address e.g bayo@yourcompany.com</small>
                                    </p>
                                </div>
                                <div className="form-group mt-2 col-6">
                                    <label className="form-label">
                                        Password <span className="text-danger">
                                            *</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        autoComplete="new-password"
                                        value={emailState.outgoingEmailConfig.password || ""}
                                        onChange={handleOutgoingConfig}/>
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
                                            value={emailState.outgoingEmailConfig.host || ""}
                                            onChange={handleOutgoingConfig}
                                            id="outgoing-host"/>
                                        <p className="description-text f-12 text-muted mt-1">
                                            SMTP server name to fetch the details
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <label htmlFor="port" className="form-label">
                                            SMTP Port<span className="text-danger"> *</span>
                                        </label>
                                        <input type="text" className="form-control" name="port" value={emailState.outgoingEmailConfig.port || ""}
                                            onChange={handleOutgoingConfig} placeholder="997"/>
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
                                            value={emailState.outgoingEmailConfig.from || ""}
                                            onChange={handleOutgoingConfig}
                                            id="outgoing-from"/>
                                        <p className="description-text f-12 text-muted mt-1">
                                            {/* SMTP server name to fetch the details */}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-md-6 pt-4">
                                    <div className="form-check mt-2">
                                        <input className="form-check-input" type="checkbox" name="tls" checked={emailState.outgoingEmailConfig.tls || false}
                                                onChange={handleOutgoingConfig} id="outgoing-ssl"/>
                                        <label className="form-check-label" htmlFor="ssl">
                                            Use SSL
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div> : <div>

                            {/* SendGrid API */}
                            <div className="row">
                                <div className="form-group mt-2 col-6">
                                    <label className="form-label">
                                        SendGrid API Key <span className="text-danger">
                                            *</span>
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="apiKey"
                                        value={emailState.outgoingEmailConfig.apiKey || ""}
                                        onChange={handleOutgoingConfig}/>
                                </div>
                                <div className="form-group mt-2 col-6">
                                    <label className="form-label">
                                        Sender Email <span className="text-danger">
                                            *</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        autoComplete="off"
                                        value={emailState.outgoingEmailConfig.email || ""}
                                        onChange={handleOutgoingConfig}/>
                                    <p className="description-text f-12 text-muted mt-1">
                                    <small>This serves as your Return-to address e.g bayo@yourcompany.com</small>
                                    </p>
                                </div>
                                
                            </div>
                        
                        </div>}

                    </div>
                )}


            </div>
        </div>
    );
};

export default connect()(UseOwnEmail);
