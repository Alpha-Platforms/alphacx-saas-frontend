
/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import showPasswordImg from "../../../assets/imgF/Show.png";
import ThankYou from "../../../assets/imgF/thank-you.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
import { NotificationManager } from "react-notifications";
import {Validate} from "../../../helpers/validateInput";
import { httpPost, httpPostMain, httpPostTenantAuth } from "../../../helpers/httpMethods";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { useHistory } from 'react-router-dom';

const ResetPassword = ({match: {params}}) => {

  const [userInput, setUserInput] = useState({
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const history = useHistory();
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [message, setMessage] = useState()


  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });

  };

    
  const login = (e) => {
    e.preventDefault()

    if(isSuccessful){
        window.location.href = `/`
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if(userInput.password && userInput.password.length >= 8){
    
      const data = {
        ...params,
        newPassword: userInput.password
      };

  
      setLoading(true);

      const res = await httpPostTenantAuth("auth/reset-password", data);     

      setLoading(false);

      if (res.status === "success") {
        NotificationManager.success(res.message, "New Password", 4000);
        setIsSuccessful(true)
        setMessage(res.message)
  
      } else {
        // Password recovery fails
        NotificationManager.error(res?.er?.message, "Password Error", 4000);
      }

    }
  }

  return (
    <div className="auth-container d-flex justify-content-center">
      <div className="symbol-wrap2">
        <img src={Symbol2} alt="" />
      </div>
      <div className="login-logo">
        <img src={AlphaLogo} alt="" /> <img src={Logo} alt="" />
      </div>

      <div className="login-container">
        
      

        <form>
          {isSuccessful ?
            <>
            <div className="d-flex justify-content-center my-4">
              <img src={ThankYou} alt="" />
            </div>
            <div className="Auth-header mb-2">
              <h3>Thank you!</h3>
              <p>{message}<br />Click the button below to log in.</p>
            </div>

            <div className="submit-auth-btn">
              <button onClick={login}>
                  Continue to Login
              </button>
            </div>
            </>


          :

          <>
          <div className="Auth-header" style={{ marginBottom: "30px" }}>
            <h3>New Password</h3>
            <p className="forgot-info">Please enter a new password for your account</p>
          </div>

          <div className="input-wrap">
            <label htmlFor="">Password</label>
            <input
              type={`${showPassword ? "text" : "password"}`}
              onChange={handleChange}              
              name="password"
              value={userInput.password}
            />
            <div className="passworEye">
              <img
                src={showPasswordImg}
                alt=""
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </div>         

          <div className="submit-auth-btn">
            <button  disabled={loading || (userInput.password === "")} onClick={handleSubmit}>
              {" "}
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  // css={override}
                  size={30}
                />
              ) : (
                "Send"
              )}
            </button>
          </div>
          </>
          
          }

     
        </form>
        
      </div>
      
      <div className="symbol-wrap">
        <img src={Symbol1} alt="" />
      </div>
    </div>
  );
};

export default ResetPassword;
