import React from "react";
import { useState, useEffect } from "react";
import "./newSupportEmail.scss";
import UseOwnEmail from "./UseOwnEmail";
import RightArrow from "../../../../../assets/imgF/arrow_right.png";
import { httpPatchMain } from "../../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { Modal } from "react-responsive-modal";
import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { getConfigs } from './../../../../../reduxstore/actions/configActions';

const NewSupportEmail = ({configs, getConfigs}) => {
  const [defaultServer, setDefaultServer] = useState(false);
  const [emailState, setEmailState] = useState({
    activeRadio: "own-server",
    // mailServer: "incoming",
    mailServer: "incoming-only",
    emailSystem: "imap",
    emailConfig: {
      tls: false
    },
  });
  
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    window.location.href = "/settings/email";
  };
  const handleShow = () => setShow(true);

  const handleServerChange = (e) => {
    if (e.target.checked) {
      setEmailState({ ...emailState, activeRadio: e.target.value });
    }
  };
  const handleSubmit = async () => {
    console.clear();
    const { email, port, tls, host, password } = emailState.emailConfig;
    const data = {
      email_config: {
        email,
        password,
        host,
        port,
        tls,
      }
    };

    const res = await httpPatchMain("settings/email-config", JSON.stringify(data));
    if (res?.status === "success") {
      console.clear();
      handleShow();
      getConfigs();
      // setDashInfo({
      //   ...dashInfo,
      //   totalTickets: parseInt(res?.data?.meta?.totalItems),
      // });
    } else {
      return NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  useEffect(() => {
    if (configs) {
      setEmailState(prev => ({
        ...prev,
        emailConfig: {
          ...prev.emailConfig,
          tls: configs?.email_config?.tls || false,
          host: configs?.email_config?.host || '',
          email: configs?.email_config?.email || '',
          port: configs?.email_config?.port || '',
          password: configs?.email_config?.password || '',
        }
      }));
    }
  }, [configs]);

  return (
    <div className="new-support-email">
      <div className="card card-body bg-white border-0 ">
        <div id="mainContentHeader">
          <h6 className="text-muted f-14">
            <Link to="/settings">
              <span className="text-custom">Settings</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <Link to="/settings/email">
              <span className="text-custom">Email</span>{" "}
            </Link>
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <span>New Email</span>
          </h6>
        </div>

        <div className="col-md-8">
          <h5 className="mt-3 mb-2 f-16 fw-bold">Email Settings</h5>
          <div className="form-group">
            <label for="name" className="form-label f-14">
              Name
            </label>
            <input
              type="tdiv.colext"
              className="form-control form-control-sm"
              id="name"
              disabled={true}
            />
            <p className="description-text f-12 text-muted mt-1">
              Name of the email to be used in the the ticket replies
            </p>
          </div>
          <div className="form-group mt-2">
            <label for="email" className="form-label f-14">
              Your Support email <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              className="form-control form-control-sm "
              id="email"
              disabled={true}
            />
            <p className="description-text f-12 text-muted mt-1">
              This serves as your Return-to address e.g bayo@yourcompany.com
            </p>
          </div>
          {/* <div className="form-group mt-2">
            <label for="group" className="form-label f-14">
              Assign to Group
            </label>
            <select id="group" className="form-select">
              <option>--</option>
              <option>--</option>
              <option>--</option>
            </select>
            <p className="description-text f-12 text-muted mt-1">
              New tickets in this email will be automaically assigned to a group
            </p>
          </div> */}
          {/* <div className="form-group mt-2">
            <label for="support" className="form-labedl f-14">
              Link support email with a product
            </label>
            <select id="support" className="form-select">
              <option>--</option>
              <option>--</option>
              <option>--</option>
            </select>
            <p className="description-text f-12 text-muted mt-1">
              if you want to link this email to a product first{" "}
              <span>
                <a href="#" className="text-custom">
                  add product
                </a>
              </span>
            </p>
          </div> */}
          <div className="card mt-4">
            <div className="card-header p-3">
              <p className="f-16 fw-bold mb-3">Mail Server</p>
              <div className="row">
                {/* <div className="col-md-5">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="radio"
                        id="radio-1"
                        name="mail-radio"
                        value="default-server"
                        checked={emailState.activeRadio === "default-server"}
                        onChange={handleServerChange}
                      />
                      <label className="form-check-label f-14" for="radio-1">
                        Default (Alphatickets)
                      </label>
                    </div>
                  </div> */}
                <div className="col-md-7">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      name="mail-radio"
                      type="radio"
                      id="radio-2"
                      value="own-server"
                      checked={emailState.activeRadio === "own-server"}
                      onChange={handleServerChange}
                    />
                    <label className="form-check-label f-14" for="radio-2">
                      Use your own mail server
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {emailState.activeRadio === "default-server" ? (
              // Default server form start
              // ...
              // ...
              // ...
              <div className="card-body d-block" id="default">
                <div className="form-group">
                  <label for="forward-mail" className="form-label f-14">
                    Forward Your Emails to
                  </label>
                  <input
                    type="text"
                    className="form-control form-control-sm w-75"
                    id="forward-mail"
                    placeholder="--"
                  />
                  <a className=" text-custom f-12 mt-1">
                    How to convert your emails into Alphaticket tickets ?
                  </a>
                </div>
              </div>
            ) : (
              // Use own server form start
              // ...
              // ...
              // ...
              <UseOwnEmail emailState={emailState} setEmailState={setEmailState} />
            )}
          </div>
          <div className="d-flex justify-content-end mb-1 mt-4 save-btn">
            <Link
              to="/settings/email"
              className="btn btn-sm px-4 bg-outline-custom cancel"
            >
              Cancel
            </Link>
            <a
              className="btn btn-sm px-4 bg-custom ms-3"
              id="save-changes"
              data-bs-toggle="modal"
              data-bs-target="#successModal"
              onClick={handleSubmit}
            >
              Save
            </a>
          </div>
        </div>
      </div>

      <Modal open={show} onClose={handleClose} center>
        <div
          // className="modal fade"
          id="successModal"
          tabindex="-1"
          aria-labelledby="successModal"
          aria-hidden="false"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content p-4 border-0">
              <div className="modal-body text-center">
                <div className="text-center">
                  {/* <object data="../assets/alphatickets/icons/sucess.svg" className="img-fluid"></object> */}
                  <h5 className="mt-4">Successful</h5>
                  <p className="text-center">Email has been edited successfully</p>
                  <Link
                    to="/settings/email"
                    className="btn btn-sm bg-at-blue text-white px-5 f-16"
                    id="continue"
                  >
                    Continue
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => ({
  configs: state.config.configs
});

export default connect(mapStateToProps, {getConfigs})(NewSupportEmail);
