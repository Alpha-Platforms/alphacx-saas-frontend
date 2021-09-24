import React, { useEffect, useState } from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import ThankYou from "../../../assets/imgF/thank-you.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
import { NotificationManager } from "react-notifications";
import { css } from "@emotion/react";
import { httpPost } from "helpers/httpMethods";
import { wordCapitalize } from "helper";


const AccountVerified = () => {

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isDomainVerified, setIsDomainVerified] = useState(false)
  const [domain, setDomain] = useState("")

  useEffect(() => {
    setMessage("Your account has been verified.")
  }, [message])

  useEffect(() => {
    if(window.location.hostname.split(".").length === 2){ // CHANGE TO 3 ON LIVE SERVER
      setDomain(() => window.location.hostname.split(".")[0])
    }
    localStorage.clear()
  }, [])

  useEffect(() => {
    console.log(domain)
    if(domain){
      domainLogin(domain)
    }
  }, [domain])

  
  const handleChange = (e) => {
    e.preventDefault()

    if(isDomainVerified){
        setLoading(false)
        window.location.href = `/login`
    }

  }

  // DOMAIN LOGIN
  const domainLogin = async (domain) => {
  
      const data = {domain}
      
      const res = await httpPost(`auth/login`, data);

      if (res.status === "success") {
        setIsDomainVerified(true)
        localStorage.clear()
        localStorage.setItem("domain", domain)
        localStorage.setItem("token", res.data.token);
        NotificationManager.success("Verification successful", "Your account has been verified.", 4000);
      } else {
        console.log(res);
        setLoading(false);
        NotificationManager.error("Verification failed", "Domain not verified", 4000);
        // wordCapitalize(res?.er?.message)
      }
    
  }

  return (

    <>
    {isDomainVerified ?

      <div className="auth-container d-flex justify-content-center">

          <div className="symbol-wrap2">
            <img src={Symbol2} alt="" />
          </div>
          <div className="login-logo">
            <img src={AlphaLogo} alt="" /> <img src={Logo} alt="" />
          </div>
          <div className="login-container">

            <form>
              <div className="d-flex justify-content-center my-4">
                <img src={ThankYou} alt="" />
              </div>
              <div className="Auth-header mb-2">
                <h3>Thank you!</h3>
                <p>{message}<br />Click the button below to log in.</p>
              </div>

              <div className="submit-auth-btn">
                <button onClick={handleChange}>
                    Continue to Login
                </button>
              </div>
            </form>
            
          </div>
        
        <div className="symbol-wrap">
          <img src={Symbol1} alt="" />
        </div>
      </div>
        
      :
        
      <div className="auth-container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <h3 style={{color: "#FFF"}}>Domain not verified</h3>
      </div>
        
      }

    </>

  );
};

export default AccountVerified;
