import React from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import showPassword from "../../../assets/imgF/Show.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
const Login = ({ history }) => {
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
          <div className="Auth-header">
            <h3>Welcome Back</h3>
            <p>Sign in to get started</p>
          </div>

          <div className="input-main-wrap">
            <div className="input-wrap">
              <label htmlFor="">Email Address</label>
              <input type="text" />
            </div>

            <div className="input-wrap">
              <label htmlFor="">Password</label>
              <input type="password" type="password" />
              <div className="passworEye">
                <img src={showPassword} alt="" />
              </div>
            </div>
            <div className="haveAnAccou">
              <a href="/register">First time user? Create an account</a>
            </div>

            <div className="submit-auth-btn">
              <button onClick={() => history.push("/home")}>Login</button>
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
