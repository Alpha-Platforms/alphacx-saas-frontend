import React from "react";
import { useState, useEffect } from "react";
import "./newSupportEmail.scss";
import UseOwnEmail from "./UseOwnEmail";
import RightArrow from "../../../../../../assets/imgF/arrow_right.png";
import { httpPatchMain } from "../../../../../../helpers/httpMethods";
import { NotificationManager } from "react-notifications";
import { Modal } from "react-responsive-modal";
import { Link, useLocation } from "react-router-dom";
import {connect} from 'react-redux';
import { getConfigs } from '../../../../../../reduxstore/actions/configActions';

const NewSupportEmail = ({configs, getConfigs}) => {
  const [defaultServer, setDefaultServer] = useState(false);
  const [emailState, setEmailState] = useState({
    activeRadio: "own-server",
    mailServer: "incoming-only",
    emailSystem: "imap",
    emailConfig: {
      tls: false,
      host: '',
      email: '',
      port: '',
      password: ''
    },
    outgoingEmailConfig: {
      email: '',
      password: '',
      tls: false,
      from: '', // sender email
      host: '',
      port: '',
      apiKey: '',
      type: 'smtp'
    }
  });
  const {search} = useLocation();
  const type = new URLSearchParams(search).get('type');

  useEffect(() => {
    if (type === 'outgoing') {
      setEmailState(prev => ({
        ...prev,
        activeRadio: 'own-server',
        mailServer: 'outgoing-only'
      }));
    }
  }, [type]);



  console.log('type => ', type);

  // console.log('EMAIL STATE => ', emailState);
  
  const [show, setShow] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false)

  const handleClose = () => {
    setShow(false);
    window.location.href = "/settings/integrations/email";
  };
  const handleShow = () => setShow(true);

  const handleServerChange = (e) => {
    if (e.target.checked) {
      setEmailState({ ...emailState, activeRadio: e.target.value });
    }
  };
  
  const handleSubmit = async () => {
    if (emailState.mailServer === "incoming-only") {
      // console.log('Executing incoming only');
      const { email, port, tls, host, password } = emailState.emailConfig;

      if (email && port && host && password) {
        const data = {
          email_config: {
            email,
            password,
            host,
            port: Number(port),
            tls,
          } 
        };
  
        const res = await httpPatchMain("settings/email-config", JSON.stringify(data));
  
        if (res?.status === "success") {
          handleShow();
          getConfigs();
        } else {
          return NotificationManager.error(res?.er?.message, "Error", 4000);
        }
      } else {
        NotificationManager.error('Fill up required fields', 'Error', 4000);
      }
    } else {
      // console.log('executing outgoing only');
      const {email, password, port, tls, host, from, apiKey, type} = emailState.outgoingEmailConfig;


      if (email && password && port && host) {
        const data = {
          outgoingEmailConfig: {
            email,
            password,
            from,
            host,
            port: Number(port),
            tls,
            apiKey: apiKey || null,
            type
          }
        };
  
        const res = await httpPatchMain("settings/outgoing-email-config", JSON.stringify(data));
  
        if (res?.status === "success") {
          handleShow();
          getConfigs();
        } else {
          return NotificationManager.error(res?.er?.message, "Error", 4000);
        }

      } else {
        NotificationManager.error('Fill up required fields', 'Error', 4000);
      }
      
    }

  };


  // const handleConfigChange = (e) => {
  //   let {name, value, type, checked} = e.target;
  //   value = type === "checkbox" ? checked : value;
  //   if(type === "password"){setPasswordChanged(true)}
    
  //   setEmailState({
  //       ...emailState,
  //       emailConfig: {
  //           ...emailState.emailConfig,
  //           [name]: value
  //       }
  //   });
    
  // };

  useEffect(() => {
    if (configs) {
      setEmailState(prev => ({
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
          from: configs?.outgoing_email_config?.from || ''
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
            <Link to="/settings/integrations">
                <span className="text-custom">Integrations</span>
            </Link>{" "}
            <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
            <Link to="/settings/integrations/email">
              <span className="text-custom">Email</span>{" "}
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
                <div className="form-check">
                    <input
                      className="form-check-input"
                      name="mail-radio-1"
                      type="radio"
                      id="radio-1"
                      value="acx-server"
                      checked={emailState.activeRadio === "acx-server"}
                      onChange={handleServerChange}
                    />
                    <label className="form-check-label f-14" htmlFor="radio-1">
                      Use AlphaCX Mail Server
                    </label>
                  </div>
                  <div className="form-check ms-5">
                    <input
                      className="form-check-input"
                      name="mail-radio-1"
                      type="radio"
                      id="radio-2"
                      value="own-server"
                      checked={emailState.activeRadio === "own-server"}
                      onChange={handleServerChange}
                    />
                    <label className="form-check-label f-14" htmlFor="radio-2">
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
                  <label htmlFor="forward-mail" className="form-label f-14">
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
            ) : emailState.activeRadio === "acx-server" ? (<div>
            

            </div>) : (
              // Use own server form start
              // ...
              // ...
              // ...
              <UseOwnEmail emailState={emailState} setEmailState={setEmailState} />
            )}


            {(emailState.activeRadio === "own-server" && emailState.emailSystem === "imap") && <div className="d-flex justify-content-end my-4 mx-3 text-end">
              <Link
                to="/settings/integrations/email"
                className="btn btn-sm px-4 bg-outline-custom cancel"
              >
                Cancel
              </Link>
              <button
                className="btn btn-sm px-4 bg-custom ms-3"
                id="save-changes"
                data-bs-toggle="modal"
                data-bs-target="#successModal"
                onClick={handleSubmit}
              >
                Save
              </button>
            </div>}




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
                    to="/settings/integrations/email"
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
