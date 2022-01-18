
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
import { httpPost, httpPostMain, httpGet } from "../../../helpers/httpMethods";
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

  const getTenantSubscription = async (tenantId) => {
    const res = await httpGet(`subscriptions/${tenantId}`);
    if (res
        ?.status === "success") {
          window.localStorage.setItem("tenantSubscription", JSON.stringify(res?.data));
    } else {
        setSubscription({})
    }
}


  useEffect(async () => {
    const hostLength = hostName.length;

    if(
      hostName[hostLength-2] === "alphacx" && hostName[0] !== "app" ||
      hostName[hostLength-2] === "qustomar" &&  hostLength === 3  || 
      hostName[hostLength-1] === "localhost" &&  hostLength !== 1 
    ){
      const hostn = hostName[0].toLowerCase();
      setDomain(hostn) 
      
      const res = await httpPost(`auth/login`, {domain: hostn});

      if (res?.status === "success") {
        window.localStorage.setItem("tenantId", res?.data?.id || "");
        window.localStorage.setItem("tenantToken", res?.data?.token);
        getTenantSubscription(res?.data?.id);
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
          email: userInput.email.trim().toLowerCase(),
          password: userInput.password,
        };
    
        setLoading(true);

        const res = await httpPostMain("auth/login", data);

        if (res.status === "success") {
          setLoading(false);
          window.localStorage.setItem("user", JSON.stringify(res.data));
          window.localStorage.setItem("token", res.data.token);
          window.localStorage.setItem("refreshToken", res.data.refreshToken);
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

      const domain = userInput.domain.toLowerCase();

      setLoading(true);
      const res = await httpPost(`auth/login`, {domain});

      if (res.status === "success") {
        setLoading(false)

        if(hostName[0] === "app"){
          window.location.href = `https://${res?.data?.domain}.alphacx.co`;
        
        } else if(hostName[0] === "qustomar" || hostName[0] === "localhost"){
          window.location.href = `${window.location.protocol}//${res?.data?.domain}.${window.location.hostname}:${window.location.port}`;

        } else {
          setDomain(domain)
          setTenantId(res?.data?.id)
          console.log('DOMAIN LOGIN RESPONSE => ', res?.data);
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
          <Link to="/forgot-password">Forgot password?</Link> 
            
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
              <Link to="/sign-up">Create an account</Link>
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