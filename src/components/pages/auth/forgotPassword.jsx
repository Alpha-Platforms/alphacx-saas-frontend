/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
import {ReactComponent as MessageIcon} from '../../../assets/icons/Message.svg';
import { NotificationManager } from "react-notifications";
import { httpPostTenantAuth } from "../../../helpers/httpMethods";
import ClipLoader from "react-spinners/ClipLoader";
import { Link, useHistory } from 'react-router-dom';
import { brandKit } from "helper";
import { css } from "@emotion/css";

const ForgotPassword = ({match: {params}}) => {

  const [userInput, setUserInput] = useState({email: ""});
  const [isSuccessful, setIsSuccessful] = useState(false)
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const history = useHistory();
  

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(userInput.email){
    
      const data = {
        email: userInput.email
      };
  
      setLoading(true);

      const res = await httpPostTenantAuth("auth/forget-password", data);
      setLoading(false);

      if (res.status === "success") {
        NotificationManager.success(res.message, "Password Recovery", 4000);
        setIsSuccessful(true)
  
      } else {
        // Password recovery fails
        NotificationManager.error(res?.er?.errors?.email, "Validation Error", 4000);
      }

    }
  }

  return (
    <div className={`auth-container d-flex justify-content-center ${css({
          ...brandKit({ bgCol: -20, default: true }),
      })}`}
    >
      <div className="symbol-wrap2">
        <img src={Symbol2} alt="" />
      </div>
      <div className="login-logo">
        <img src={AlphaLogo} alt="" /> <img src={Logo} alt="" />
      </div>

      <div className="login-container">
        
        {isSuccessful ?
        <>
          <div className="d-flex justify-content-center">
            <MessageIcon />
          </div>
          <div className="Auth-header mb-2">
            <h3>Check your email</h3>
            <p className="text-center">We have sent a password recovery link to your email.</p>
          </div>
        </>

        :


        <form>
          <div className="Auth-header" style={{ marginBottom: "30px" }}>
            <h3>Forgot Password</h3>
            <p className="forgot-info">Please enter the email address associated with your account</p>
          </div>

          <div className="input-main-wrap">
            <div className="input-wrap">
              <label htmlFor="">Account Email</label>
              <input
                type="email"
                onChange={handleChange}                
                name="email"
                value={userInput.email}
                required={true}
              />
            </div>
          </div>          



          <div className="submit-auth-btn pb-0">
            <button
              disabled={loading || (userInput.email === "")} 
              onClick={handleSubmit}
              className={`mt-2 ${css({
                ...brandKit({ bgCol: 0, default: true }),
            })}`}>
              {" "}
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  size={30}
                />
              ) : (
                "Send"
              )}
            </button>
          </div>

          <div className="text-end forgetPassword">    
              <Link to="/login">Back to Login</Link>
          </div>

        </form>


        }
      </div>
      
      <div className="symbol-wrap">
        <img src={Symbol1} alt="" />
      </div>
    </div>
  );
};

export default ForgotPassword;
