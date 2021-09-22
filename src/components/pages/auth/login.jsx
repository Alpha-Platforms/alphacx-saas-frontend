import React, { useEffect, useState } from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import showPasswordImg from "../../../assets/imgF/Show.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
import { NotificationManager } from "react-notifications";
import swal from "sweetalert";
import {
  ValidateEmail,
  validatePassword,
} from "../../../helpers/validateInput";
import { httpPost, httpPostMain } from "../../../helpers/httpMethods";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import { wordCapitalize } from "helper";
import axios from "axios";
const override = css``;

const Login = ({match: {params}}) => {
  const [userInput, setUserInput] = useState({
    domain: "",
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);
  const [domainAuthenticated, setDomainAuthenticated] = useState(false)

  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if(params.tenantDomain && localStorage.getItem("domain")){
      console.log(`Your domain is ${params.tenantDomain}`)
      submit()
    }
    
  }, [params.tenantDomain])


  const handleSubmit = (e) => {
    e.preventDefault();
    submit()
  }

  const submit = async () => {

    if(!domainAuthenticated){// DOMAIN LOGIN

        const domain = userInput.domain ? userInput.domain : params.tenantDomain;

        setLoading(true);
        const res = await httpPost(`auth/login`, {domain});

        if (res.status === "success") {
          setLoading(false)
          localStorage.clear()
          localStorage.setItem("domain", domain)
          localStorage.setItem("token", res.data.token);

          setDomainAuthenticated(true)

        } else {
          console.log(res);
          setLoading(false);
          NotificationManager.error(wordCapitalize(res?.er?.message), "Invalid Domain Name", 4000);
        }
        

      } else {  // PASSWORD LOGIN

        if(userInput.email && userInput.password ){
          console.clear()
          console.log(userInput);


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
            // domain: userInput.domain
          };
      
          setLoading(true);

          const res = await httpPostMain("auth/login", data);

          if (res.status === "success") {
            setLoading(false);
            console.log(res?.status);
            localStorage.setItem("user", JSON.stringify(res.data));
            localStorage.setItem("token", res.data.token);
      
            NotificationManager.success(res.data.message, "Success", 4000);
      
            // Redirect to home page - dashboard
            window.location.href = `/`;
      
          } else {
            // Login failed
            setLoading(false);
            NotificationManager.error(res?.er?.message, "Error", 4000);

            console.clear()
            console.log(res);
          }

        } 
        else {
          // empty fields already handled by button disable attr

          // return NotificationManager.warning(
          //   "Enter username and password",
          //   "Login failed",
          //   4000
          // );
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
        {!domainAuthenticated &&
        <form>
          <div className="Auth-header" style={{ marginBottom: "10px" }}>
            <h3>Welcome Back</h3>
            <p>Please, enter your domain name</p>
          </div>

          <div className="input-wrap">
            <label htmlFor="">Domain Name</label>
            <input
              type="text"
              onChange={handleChange}
              name="domain"
              value={userInput.domain}
            />
          </div>

          <div className="haveAnAccou">
            <a href="/register">First time user? Sign up</a>
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

        {(domainAuthenticated && localStorage.getItem("domain")) &&

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

          <div className="haveAnAccou">
            <a href="/register">First time user? Sign up</a>
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
