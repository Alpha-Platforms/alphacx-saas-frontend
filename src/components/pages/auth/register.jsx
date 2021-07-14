import React from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import showPassword from "../../../assets/imgF/Show.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
const Login = () => {
  return (
    <div className="auth-container">
      <div className="symbol-wrap2">
        <img src={Symbol2} alt="" />
      </div>
      <div className="login-logo">
        <img src={AlphaLogo} alt="" /> <img src={Logo} alt="" />
      </div>

      <div className="login-container">
        <form>
          <div className="Auth-header" style={{ marginBottom: "30px" }}>
            <h3>Welcome Back</h3>
            <p>Create an account for your business</p>
          </div>

          <div className="input-main-wrap">
            <div className="input-wrap-with-two-inputes">
              <div className="inputWrapTwo">
                <label htmlFor="">First Name</label>
                <input type="text" />
              </div>

              <div className="inputWrapTwo">
                <label htmlFor="">Last Name </label>
                <input type="text" />
              </div>
            </div>

            <div className="input-main-wrap">
              <div className="input-wrap">
                <label htmlFor="">Email Address</label>
                <input type="text" />
              </div>
            </div>

            <div className="input-wrap">
              <label htmlFor="">Password</label>
              <input type="password" type="password" />
              <div className="passworEye">
                <img src={showPassword} alt="" />
              </div>
            </div>

            <div className="input-main-wrap">
              <div className="input-wrap">
                <label htmlFor="">Company Name</label>
                <input type="text" />
              </div>
            </div>

            <div className="input-main-wrap">
              <div className="input-wrap">
                <label htmlFor="">Domain</label>
                <input type="text" />
              </div>
            </div>

            <div className="input-main-wrap">
              <div className="input-wrap">
                <label htmlFor="">Region</label>
                <input type="text" />
              </div>
            </div>
            <div className="haveAnAccou">
              <a href="/">Already have an account? Login</a>
            </div>

            <div className="submit-auth-btn">
              <button>Register</button>
            </div>
          </div>
        </form>
      </div>
      <div className="symbol-wrap">
        <img src={Symbol1} alt="" />
      </div>
    </div>
  );
};

export default Login;
