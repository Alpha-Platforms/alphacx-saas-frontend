import React, {useState} from "react";
// import { NotificationManager } from "react-notifications";
import {Link} from "react-router-dom";
import {appLogo2, toggleIcon, homeIcon, clockIcon, cardIcon, moreIcon, logoutIcon, cancel} from "../../../assets/images/svgs";
import "./login.css";
import swal from "sweetalert";
import {axiosCalls, axiosCallsNoToken} from "../../helpers/httpMethods";
import {Modal} from "react-responsive-modal";
import {NotificationManager} from "react-notifications";

export default function ForgotPassword(props) {
  const [username, setUsername] = useState("");
  const [emailToken, setEmailToken] = useState(false);
  const [token, setToken] = useState("");
  const [newPassModal, setNewPassModal] = useState(false);
  const [newPass, setNewPass] = useState("");
  const [passTokenModal, setPassTokenModal] = useState(false);

  const submit = async () => {
    if (username === "") {
      return swal("iBank", "Enter your username to continue", "warining");
    }
    let res = await axiosCallsNoToken(`/auth/external_request_reset_password`, "POST", {user_name: username});
    if (res) {
      if (res.er) {
        console.log(res.er);
        return;
      }

      setEmailToken(true);
    }
  };

  const completePassReeset = async () => {
    if (newPass === "") {
      return NotificationManager.info("Please enter your new password to continue");
    }

    let res = await axiosCallsNoToken(`/auth/external_reset_password`, "POST", {user_name: username, token, newpassword: newPass});
    if (res) {
      if (res.er) {
        return swal("iBank", res.er.responseMessage, "error");
      }
      swal("iBank", "Password reset successful, proceed to login", "success").then(() => {
        props.history.push("/");
      });
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper-item1 ">
        <div className="container">
          {appLogo2}
          <div className="title-container">
            <h1>Forgot Password?</h1>
            <p>Enter your recovery phone number or email on which you will receive an OTP</p>
          </div>

          <div className="form-container">
            <form className="">
              <div>
                <h2 className="input-label mb-3">Username</h2>
                <input type="text" name="username" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter your username" />
              </div>
              <div className="border cont-btn mt-5" onClick={submit}>
                <h2 className="text-center">Send OTP</h2>
              </div>
              <Link to="/">
                <p className="mt-3 mb-4 text-center" style={{color: "var(--appBlack)", fontSize: "14px"}}>
                  Remeber Password? <span style={{color: "#EDB538"}}>Back to Login</span>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="login-wrapper-item2">
        <div className="img-bg-container">
          <div className="img-bg"></div>
        </div>
      </div>

      {emailToken && (
        <Modal
          open={emailToken}
          onClose={() => {
            setEmailToken(false);
          }}
          center
          animationDuration={400}
          closeOnOverlayClick={true}
          focusTrapped={true}
          showCloseIcon={true}
          styles={{
            overlay: {
              background: "none",
            },
          }}
        >
          <div className="modal-body-rs p-3">
            <div
              className="cancel-btn"
              onClick={() => {
                setEmailToken(false);
                setToken("");
              }}
            >
              {cancel}
            </div>
            <div className="container">
              <div className="mt-4">
                <h2 className="modal-col-h3 mt-1">Enter the token sent to your mail</h2>

                <div className="d-flex justify-content-between align-items-center" style={{width: "100%"}}>
                  <div className=" mt-4 vtt flex-fill flex">
                    <input
                      type="text"
                      name="token"
                      placeholder={"Enter Your Token"}
                      value={token}
                      onChange={e => setToken(e.target.value)}
                      style={{
                        height: "40px",
                        borderRadius: "5px",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div
                  className="mt-5"
                  onClick={() => {
                    setEmailToken(false);
                    setNewPassModal(true);
                  }}
                >
                  <div className="btn--container3 mb-5">
                    <h2>Continue</h2>
                  </div>
                </div>
                <div className="py-2"></div>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {newPassModal && (
        <Modal
          open={newPassModal}
          onClose={() => {
            setNewPassModal(false);
            setToken("");
            setNewPass("");
          }}
          center
          animationDuration={400}
          closeOnOverlayClick={true}
          focusTrapped={true}
          showCloseIcon={true}
          styles={{
            overlay: {
              background: "none",
            },
          }}
        >
          <div className="modal-body-rs p-3">
            <div
              className="cancel-btn"
              onClick={() => {
                setNewPassModal(false);
                setToken("");
                setNewPass("");
              }}
            >
              {cancel}
            </div>
            <div className="container">
              <div className="mt-4">
                <h2 className="modal-col-h3 mt-1">Enter your new password</h2>

                <div className="d-flex justify-content-between align-items-center" style={{width: "100%"}}>
                  <div className=" mt-4 vtt flex-fill flex">
                    <input
                      type="password"
                      name="oldPass"
                      placeholder={"Enter Your new password"}
                      value={newPass}
                      onChange={e => setNewPass(e.target.value)}
                      style={{
                        height: "40px",
                        borderRadius: "5px",
                        width: "100%",
                      }}
                    />
                  </div>
                </div>
                <div className="mt-5" onClick={completePassReeset}>
                  <div className="btn--container3 mb-5">
                    <h2>Continue</h2>
                  </div>
                </div>
                {/* <div className="py-2"></div> */}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
