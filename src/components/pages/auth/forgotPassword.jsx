
/* eslint-disable */
// @ts-nocheck

import React, { useEffect, useState } from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import showPasswordImg from "../../../assets/imgF/Show.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
import { NotificationManager } from "react-notifications";
import {Validate} from "../../../helpers/validateInput";
import { httpPost, httpPostMain, httpPostTenantAuth } from "../../../helpers/httpMethods";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { wordCapitalize } from "helper";
import { useHistory } from 'react-router-dom';

const ForgotPassword = ({match: {params}}) => {
  const [userInput, setUserInput] = useState({
    email: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [domain, setDomain] = useState("")
  const [tenantId, setTenantId] = useState("");
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [hostName] = useState(() => {
    return window.location.hostname.split(".") 
  })
  const [environment] = useState(process.env.NODE_ENV);
  const history = useHistory();


  useEffect(async () => {         
    if(hostName[0] !== "app" && hostName[0] !== "qustomar" && hostName[0] !== "localhost" && hostName[1] !== "netlify"){ // CHANGE TO 3 ON LIVE SERVER 
      window.localStorage.setItem("domain", domain);
      
      setDomain(hostName[0]) // if sub-domain is available it is correct else you'd get a 404
      
      const res = await httpPost(`auth/login`, {domain: hostName[0]});
      if (res?.status === "success") {
        window.localStorage.setItem("tenantId", res?.data?.id || "");
      }

    } else {
      history.push('/login');
    }
  }, [])


  useEffect(() => {
    if(domain){
      window.localStorage.setItem("domain", domain)
    }
    if(tenantId) {
      window.localStorage.setItem("tenantId", tenantId);
    }
  }, [domain, tenantId])
  

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
        NotificationManager.success(res.data.message, "Success", 4000);

        // window.location.href = `/`;
  
      } else {
        // Login fails
        NotificationManager.error(res?.er?.message, "Error", 4000);
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
        
        {domain &&

        <form>
          <div className="Auth-header" style={{ marginBottom: "30px" }}>
            <h3>Forgot Password</h3>
            <p className="forgot-info">Please enter the email address associated with your account</p>
          </div>

          <div className="input-main-wrap">
            <div className="input-wrap">
              <label htmlFor="">Your work email</label>
              <input
                type="email"
                onChange={handleChange}                
                name="email"
                value={userInput.email}
                required={true}
              />
            </div>
          </div>          

          <div className="submit-auth-btn">
            <button  disabled={loading || (userInput.email === "")} onClick={handleSubmit}>
              {" "}
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  // css={override}
                  size={30}
                />
              ) : (
                "Continue"
              )}
            </button>
          </div>

          <div className="haveAnAccou">
            <span className="f-11 d-block text-center mb-1"><small>Not yet registered?</small></span>
            {
              (hostName[0] === "dev" || hostName[0] === "app" || hostName[1] === "netlify" || hostName.includes("localhost")) ?
               <a href="/sign-up">Sign up</a>

              :
              
              hostName[1] === "qustomar"?
              <a href="https://qustomar.com/sign-up">Sign up</a>
              :
              <a href="https://app.alphacx.co/sign-up">Sign up</a>
              
            }            
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
