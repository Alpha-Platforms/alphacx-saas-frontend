/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useState} from "react";
import Gmail from "../../../../../assets/imgF/gmail.png";
import OtherMail from "../../../../../assets/imgF/otherMail.png";
import MicrosoftOffice from "../../../../../assets/imgF/microsoftOffice.png";
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
                <div className="row">
                    <div className="col-md-3">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="radio"
                                id="incoming-only"
                                name="mail-server"
                                value="incoming-only"
                                checked={emailState.mailServer === "incoming-only"}
                                onChange={handleMailServerChange}/>
                            <label className="form-check-label f-14" for="incoming-only">
                                Incoming only
                            </label>
                        </div>
                    </div>
                    {/* <div className="col-md-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="outgoing-only"
                name="mail-server"
                value="outgoing-only"
                checked={emailState.mailServer === "outgoing-only"}
                onChange={handleMailServerChange}
              />
              <label className="form-check-label f-14" for="outgoing-only">
                Outgoing only
              </label>
            </div>
          </div>
          <div className="col-md-3">
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                id="both"
                name="mail-server"
                value="both"
                checked={emailState.mailServer === "both"}
                onChange={handleMailServerChange}
              />
              <label className="form-check-label f-14" for="both">
                Both
              </label>
            </div>
          </div> */}
                </div>
                {(emailState.mailServer === "both" || emailState.mailServer === "incoming-only") && (
                    <div className="incoming-mail">
                        <h5 className="fs-6 fw-bold mt-4 mb-3">Incoming Mail Settings</h5>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="incoming-mail" className="form-label">
                                        Incoming Mail Server
                                        <span className="text-danger">
                                            *</span>
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control form-control-sm"
                                        placeholder="imap.gmail.com"
                                        id="incoming-mail"
                                        name="host"
                                        value={emailState.emailConfig.host || ""}
                                        onChange={handleConfigChange}/>
                                    <p className="description-text f-12 text-muted mt-1">
                                        IMAP server name to fetch the details
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="port" className="form-label">
                                        IMAP Port<span className="text-danger">
                                            *</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="form-control form-control-sm"
                                        placeholder="997"
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
                                <label className="form-check-label" for="ssl">
                                    Use SSL
                                </label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"/>
                                <label className="form-check-label">
                                    Delete emails from server after fetching ?
                                </label>
                            </div>
                        </div>

                        <div>
                            <div className="form-group mt-3">
                                <label className="form-label">Authentication</label>
                                <select className="form-select w-75" disabled={true}>
                                    <option>plain</option>
                                    <option>plain</option>
                                    <option>plain</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center mt-4 mb-4">
                                <div className="vertical-line"></div>
                                <div className="ms-4 flex-grow-1">
                                    <div className="form-group mt-2">
                                        <label className="form-label">
                                            Username<span className="text-danger">
                                                *</span>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm w-75"
                                            name="email"
                                            value={emailState.emailConfig.email || ""}
                                            onChange={handleConfigChange}/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <label className="form-label">
                                            Password<span className="text-danger">
                                                *</span>
                                        </label>
                                        <input
                                            type="password"
                                            className="form-control form-control-sm w-75"
                                            name="password"
                                            value={emailState.emailConfig.password || ""}
                                            onChange={handleConfigChange}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                {(emailState.mailServer === "both" || emailState.mailServer === "outgoing-only") && (
                    <div className="outgoing-mail mt-2">
                        <h5 className="fs-6 fw-bold mt-5 mb-3">Outgoing Mail Settings</h5>
                        <div className="alert-danger text-dark mt-3 mb-5">
                            <p className="p-2">
                                Gmail limits the number of emails sent per day{" "}
                                <span>
                                    <a href="#" className="text-custom ms-2">
                                        Click here to learn more
                                    </a>
                                </span>
                            </p>
                        </div>
                        <div className="row mt-2">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label for="outgoing-mail" className="form-label">
                                        Outgoing Mail Server
                                        <span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control form-control-sm"
                                        placeholder="smtp.gmail.com"
                                        id="outgoing-mail"/>
                                    <p className="description-text f-12 text-muted mt-1">
                                        SMTP server name to fetch the details
                                    </p>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <label for="port" className="form-label">
                                        SMTP Port<span className="text-danger">*</span>
                                    </label>
                                    <input type="text" className="form-control form-control-sm" placeholder="997"/>
                                </div>
                            </div>
                            <div className="col-md-2 mt-5">
                                <div className="form-check">
                                    <input className="form-check-input" type="checkbox" id="ssl"/>
                                    <label className="form-check-label" for="ssl">
                                        Use SSL
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="row ms-1">
                            <div className="form-check">
                                <input className="form-check-input" type="checkbox"/>
                                <label className="form-check-label">
                                    Delete emails from server after fetching ?
                                </label>
                            </div>
                        </div>

                        <div>
                            <div className="form-group mt-3">
                                <label className="form-label">Authentication</label>
                                <select className="form-select w-75">
                                    <option>plain</option>
                                    <option>plain</option>
                                    <option>plain</option>
                                </select>
                            </div>
                            <div className="d-flex align-items-center mt-4">
                                <div className="vertical-line"></div>
                                <div className="ms-4 flex-grow-1">
                                    <div className="form-group mt-2">
                                        <label className="form-label">
                                            Username<span className="text-danger">*</span>
                                        </label>
                                        <input type="text" autoComplete="off" className="form-control form-control-sm w-75"/>
                                    </div>
                                    <div className="form-group mt-2 mb-4">
                                        <label className="form-label">
                                            Password<span className="text-danger">*</span>
                                        </label>
                                        <input type="password" autoComplete="new-password" className="form-control form-control-sm w-75"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default connect()(UseOwnEmail);
