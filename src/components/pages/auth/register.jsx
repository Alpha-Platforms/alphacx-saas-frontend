import React, { useState } from "react";
// import { NotificationManager } from "react-notifications";
import { Link } from "react-router-dom";
import {
  appLogo2,
  toggleIcon,
  homeIcon,
  clockIcon,
  cardIcon,
  moreIcon,
  logoutIcon,
} from "../../../assets/images/svgs";
import './login.css';

export default function Register(props) {
  return (
    <div className="login-wrapper">
      <div className="login-wrapper-item1 ">
        <div className="container">
          {appLogo2}
          <div className="title-container">
            <h1>Create a PaySync Account</h1>
          </div>

          <div className="form-container">
            <form className="">
              <div>
                <h2 className="input-label mb-3">Username</h2>
                <input type="text" name="username" placeholder="Enter your username" />
              </div>
              <div className="mt-4">
                <h2 className="input-label mb-3">Password</h2>
                <input type="password" name="password" placeholder="Enter your password" />
              </div>
              <Link to="/resetpassword">
                <p className="text-right mt-2 mb-2 forgotPass">Forgot password?</p>
              </Link>

              <p className="mt-2 mb-4" style={{ color: '#9BA4B4', fontSize: '14px' }}>By clicking on Continue, you agree to our Terms & Conditions</p>
              <div className="border cont-btn">
                <h2 className="text-center">Continue</h2>
              </div>
              <Link to="/">
                <p className="mt-3 mb-4 text-center" style={{ color: 'var(--appBlack)', fontSize: '14px' }}>Already have an account? <span style={{ color: '#EDB538' }}>Sign In</span></p>
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
    </div>
  );
}
