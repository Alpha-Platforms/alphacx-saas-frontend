
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
import { httpPost, httpPostMain } from "../../../helpers/httpMethods";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { wordCapitalize } from "helper";
import {Link} from 'react-router-dom';
const override = css``;

const Login = ({match: {params}}) => {
  const [userInput, setUserInput] = useState({
    domain: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [domain, setDomain] = useState("")
  const [tenantId, setTenantId] = useState("");
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [hostName] = useState(() => {
    return window.location.hostname.split(".") 
  })
  const [environment] = useState(process.env.NODE_ENV)


  useEffect(async () => {         
    if(hostName[0] !== "app" && hostName[0] !== "qustomar" && hostName[0] !== "localhost" && hostName[1] !== "netlify"){ // CHANGE TO 3 ON LIVE SERVER 
      window.localStorage.setItem("domain", domain)
      
      setDomain(hostName[0]) // if sub-domain is available it is correct else you'd get a 404
      
      const res = await httpPost(`auth/login`, {domain: hostName[0]});
      if (res?.status === "success") {
        window.localStorage.setItem("tenantId", res?.data?.id || "");
        window.localStorage.setItem("tenantToken", res?.data?.token);
      }

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

  const handleSubmit = (e) => {
    e.preventDefault();
    submit()
  }

  const submit = async () => {

    if(domain){// PASSWORD LOGIN

      if(userInput.email && userInput.password){
    
        const data = {
          email: userInput.email,
          password: userInput.password,
        };
    
        setLoading(true);

        const res = await httpPostMain("auth/login", data);

        if (res.status === "success") {
          setLoading(false);
          window.localStorage.setItem("user", JSON.stringify(res.data));
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
    
          NotificationManager.success(res.data.message, "Success", 4000);

          window.location.href = `/`;
    
        } else {
          // Login fails
          setLoading(false);
          NotificationManager.error(res?.er?.message, "Error", 4000);
        }

      } 
      else {
        // empty fields already handled by button disable attr
      }

    } else {// DOMAIN LOGIN

      const domain = userInput.domain;

      setLoading(true);
      const res = await httpPost(`auth/login`, {domain});

      if (res.status === "success") {
        setLoading(false)

        if(hostName[0] === "app"){
          window.location.href = `https://${res?.data?.domain}.alphacx.co`;
        
        } else if(hostName[0] === "qustomar" || hostName[0] === "localhost"){
          window.location.href = `${window.location.protocol}//${res?.data?.domain}.${window.location.hostname}:${window.location.port}`;

        } else {
          // window.location.href = "/";
          setDomain(domain)
          setTenantId(res?.data?.id)
        }
        
      } else {
        setLoading(false);
        NotificationManager.error(wordCapitalize(res?.er?.message), "Invalid Domain Name", 4000);
      }


    }
      

  };

  return (
    <div className="auth-container d-flex justify-content-center">
      <div className="symbol-wrap2">
        <img src={Symbol2} alt="" />
      </div>
      <div className="login-logo">
        <img src={AlphaLogo} alt="" /> <img src={Logo} alt="" />
      </div>

      <div className="login-container">
        {(domain === "") &&
        <form>
          <div className="Auth-header" style={{ marginBottom: "10px" }}>
            <h3>Welcome Back</h3>
            <p>Please, enter your domain name</p>
          </div>

          <label htmlFor="" className="form-label">Domain</label>
          <div className="input-group">
              <input type="text" 
                  className="form-control" 
                  name="domain"
                  autoComplete="off"
                  onChange={handleChange}
                  value={userInput.domain}
              />
              <span className="input-group-text text-muted" id="basic-addon2">
                
                { environment === 'production'? ".alphacx.co" : ".qustomar.com"}
                </span>
          </div>          

          <div className="haveAnAcco">
            <a href="/sign-up">First time user? Sign up</a>
          </div>

          <div className="submit-auth-btn">
            <button disabled={loading || (userInput.domain === "")} onClick={handleSubmit}>
              {" "}
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  css={override}
                  size={30}
                />
              ) : (
                "Continue"
              )}
            </button>
          </div>
        </form>
        }

        {domain &&

        <form>
          <div className="Auth-header" style={{ marginBottom: "30px" }}>
            <h3>Welcome Back</h3>
            <p>Enter login details</p>
          </div>

          <div className="input-main-wrap">
            <div className="input-wrap">
              <label htmlFor="">Email Address</label>
              <input
                type="text"
                onChange={handleChange}                
                name="email"
                value={userInput.email}
              />
            </div>
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
          <div className="text-end forgetPassword">
          {/* <a href="https://qustomar.com/forgot-password">Forgot password?</a> */}

          {
              (hostName[0] === "dev" || hostName[0] === "app" || hostName[1] === "netlify" || hostName.includes("localhost")) ?
               <Link to="/forgot-password">Forgot password?</Link>

              :
              
              hostName[1] === "qustomar"?
              <a href="https://qustomar.com/forgot-password">Forgot password?</a>
              :
              <a href="https://app.alphacx.co/forgot-password">Forgot password?</a>
              
            }   
            
          </div>

          

          <div className="submit-auth-btn">
            <button  disabled={loading || (userInput.email === "" || userInput.password === "")} onClick={handleSubmit}>
              {" "}
              {loading ? (
                <ClipLoader
                  color={color}
                  loading={loading}
                  css={override}
                  size={30}
                />
              ) : (
                "Login"
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

export default Login;
