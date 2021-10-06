
/* eslint-disable */

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
const override = css``;

const Login = ({match: {params}}) => {
  const [userInput, setUserInput] = useState({
    domain: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [domain, setDomain] = useState("")
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  const [hostName] = useState(() => {
    return window.location.hostname.split(".") 
  })


  useEffect(() => {         
    if(hostName.length === 3 && hostName[0] !== "dev" && hostName[0] !== "app" && hostName[1] !== "netlify"){ // CHANGE TO 3 ON LIVE SERVER 
      window.localStorage.setItem("domain", domain)
      setDomain(hostName[0]) // if sub-domain is available it is correct else you'd get a 404
    }
  }, [])

  useEffect(() => {
    if(domain){
      window.localStorage.setItem("domain", domain)
    }
  }, [domain])
  

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submit()
  }

  // ONBLUR VALIDATION
  const handleBlur = (e) => {   
    if (e.target.name === "email") {
        Validate.email(e, userInput, setUserInput)

    } else if (e.target.name === "password") {
        Validate.password(e, userInput, setUserInput)

    } else if (e.target.name === "firstName" || e.target.name === "lastName") {
        Validate.length(e, userInput, setUserInput)
    }
      
  }

  const submit = async () => {

    if(domain){// PASSWORD LOGIN

      if(userInput.email && userInput.password){

        // const validateEmail = ValidateEmail(userInput.email);
        // if (validateEmail == false) {
        //   return NotificationManager.warning(
        //     "Invalid email address",
        //     "Validation Warning",
        //     4000
        //   );
        // }
    
        // const validatepassword = validatePassword(userInput.password);
        // if (validatepassword != "Looks Good!") {
        //   return NotificationManager.warning(
        //     validatepassword,
        //     "Validation Warning",
        //     4000
        //   );
        // }
    
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
          // Login failed
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

        if(hostName.length === 3 && hostName[0] === "app"){
          window.location.href = `https://${res?.data?.domain}.alphacx.co`;

        } else {
          // window.location.href = "/";
          setDomain(domain)
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
              <input type="text" className="form-control" 
                  name="domain"
                  autoComplete="off"
                  onChange={handleChange}
                  value={userInput.domain}
              />
              <span className="input-group-text" id="basic-addon2">.alphacx.co</span>
          </div>          

          <div className="haveAnAccou">
            {
              (hostName[0] === "dev" || hostName[0] === "app" || hostName[1] === "netlify" || hostName.includes("localhost")) ?
               <a href="/register">First time user? Sign up</a>
               
              :

              <a href="https://app.alphacx.co/register">First time user? Sign up</a>
              
            }
            
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
                onBlur={handleBlur}
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
              onBlur={handleBlur}
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

          <div className="haveAnAccou">
            {
              (hostName[0] === "dev" || hostName[0] === "app" || hostName[1] === "netlify" || hostName.includes("localhost")) ?
               <a href="/register">First time user? Sign up</a>

              :

              <a href="https://app.alphacx.co/register">First time user? Sign up</a>
              
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
