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

const AccountVerified = ({match: {params}}) => {

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    e.preventDefault()
    // props.history.push("/login")
    // console.clear()
    // console.log(params)

    domainLogin(params.tenantDomain)

  }

  // DOMAIN LOGIN
  const domainLogin = async (domain) => {
  
      const data = {domain}
      
      const res = await httpPost(`auth/login`, data);

      if (res.status === "success") {
        setLoading(false)
        localStorage.clear()
        localStorage.setItem("domain", domain)
        localStorage.setItem("token", res.data.token);
        window.location.href = `/login/${domain}`
      } else {
        console.log(res);
        setLoading(false);
        NotificationManager.error(wordCapitalize(res?.er?.message), "Invalid Domain Name", 4000);
      }
    
  }

  useEffect(() => {
    setMessage("Your account has been verified.")
  }, [message])

  useEffect(() => {
    localStorage.clear()
  }, [])

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
          <div className="d-flex justify-content-center my-4">
            <img src={ThankYou} alt="" />
          </div>
          <div className="Auth-header mb-2">
            <h3>Thank you!</h3>
            <p>{message}<br />Click the button below to log in.</p>
          </div>

      

          <div className="submit-auth-btn">
            <button onClick={handleChange}>
                Login
            </button>
          </div>
        </form>
        
      </div>
      
      <div className="symbol-wrap">
        <img src={Symbol1} alt="" />
      </div>
    </div>
  );
};

export default AccountVerified;
