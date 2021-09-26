import React, { useEffect, useState } from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import ThankYou from "../../../assets/imgF/thank-you.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
import { NotificationManager } from "react-notifications";
import { css } from "@emotion/react";
import { httpGet } from "helpers/httpMethods";
import { wordCapitalize } from "helper";


const AccountVerified = ({match, ...props}) => {

  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [isTenantVerified, setIsTenantVerified] = useState(false)
  const [token, setToken] = useState("")
  const [isChecked, setIsChecked] = useState(false)

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get("token"))
  }, [])

  useEffect(() => {
    if(token){
      verify(token)
    }
  }, [token])

  
  const handleChange = (e) => {
    e.preventDefault()

    if(isTenantVerified){
        setLoading(false)
        window.location.href = `/`
    }
  }

  // VERFICATION
  const verify = async (token) => {

    setLoading(true);
    setIsChecked(true)
      
    const res = await httpGet(`auth/verify?token=${token}`);

    if (res.status === "success") {
      setIsTenantVerified(true)
      setLoading(false);
      setMessage("Your account has been verified")
      NotificationManager.success("Verification successful", message, 4000);
    } else {
      console.clear()
      console.log(res);
      setLoading(false);
      NotificationManager.error(wordCapitalize(res?.er?.message), "Domain not verified", 4000);
      
    }
  }

  return (

    <>
    {isTenantVerified &&

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
        
      }
      { ( !isTenantVerified && isChecked) &&
        
      <div className="auth-container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <h3 style={{color: "#FFF"}}>Domain not verified</h3>
      </div>
        
      }
      {
        // loading
      }

    </>

  );
};

export default AccountVerified;