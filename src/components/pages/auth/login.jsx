import React, { useEffect, useState } from "react";
import { ValidateInput } from "../../helpers/validateInput";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { httpLogin } from "../../helpers/httpMethods";
import { hideLoader, showLoader } from "../../helpers/loader";
import { Link } from "react-router-dom";
import {
  appLogo2,
  toggleIcon,
  homeIcon,
  clockIcon,
  cardIcon,
  moreIcon,
  logoutIcon,
} from "../../../assets/images/svgs";
import "./login.css";
import { setLocalItem } from "../../helpers/authService";

// const OneSignal = (window.OneSignal = window.OneSignal || []);
export default function Login(props) {
  useEffect(() => {
    let checkTokenExp = localStorage.getItem("checkTokenExp");

    if (checkTokenExp === "true") {
      NotificationManager.error(
        "Your session has expired, please login again."
      );
    }
    // setUpNotification();
  }, []);

  // const setUpNotification = () => {
  //   OneSignal.push(function () {
  //     OneSignal.init({
  //       appId: "4fae1962-9625-4f00-afd5-e7c67106b56f",
  //       notifyButton: {
  //         enable: true,
  //       },
  //       subdomainName: "paysync",
  //     });
  //   });
  // };

  const [userAccount, setUserAccount] = useState({
    // userName: "08081486194",
    // password: "Ola@shiku1",
    userName: "08081486194",
    password: "",
    pushid: "",
    webpushid: "",
    appVersion: "1.2",
    //3710064137
  });

  const [setValidatedForm, setValidated] = useState(false);

  const [errorInput, setErrorInput] = useState({
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    if (e.target.name === "userName") {
      setUserAccount({
        ...userAccount,
        [e.target.name]: e.target.value,
      });
      let testValid = ValidateInput(e.target.value);
      setErrorInput({ ...errorInput, userName: testValid });
    }

    if (e.target.name === "password") {
      setUserAccount({
        ...userAccount,
        [e.target.name]: e.target.value,
      });
      let testValid = ValidateInput(e.target.value);
      setErrorInput({ ...errorInput, password: testValid });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      errorInput.password === "Looks Good!" &&
      errorInput.userName === "Looks Good!"
    ) {
      showLoader();
      const data = {
        username: userAccount.userName,
        password: userAccount.password,
        pushid: "",
        webpushid: "",
        appVersion: "1.2",
      };
      let res = await httpLogin(`auth/login`, data);
      console.log(res !== null);
      if (res !== null) {
        setUserAccount({
          userName: "",
          password: "",
        });
        console.log("====================================");
        console.log("token", res.data.data.authorization);
        console.log("====================================");
        localStorage.setItem("token", res.data.data.authorization);
        console.log("UserLogin>>", res.data.data);
        setLocalItem("user", res.data.data);
        hideLoader();
        window.location.href = "/home";
      } else {
        hideLoader();
        console.log(res);
      }
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-wrapper-item1 ">
        <div className="container">
          {appLogo2}
          <div className="title-container">
            <h1>Login to PaySync</h1>
            <p>
              To sign in, please type in the username linked to your PaySync
              account and your PaySync password
            </p>
          </div>

          <div className="form-container">
            <form className="">
              <div>
                <h2 className="input-label mb-3">Username</h2>
                <input
                  type="text"
                  name="userName"
                  placeholder="Enter your user name"
                  onChange={handleChange}
                  value={userAccount.userName}
                />
                <div className="error-container">
                  <span
                    style={
                      errorInput.userName === "Looks Good!"
                        ? { color: "green" }
                        : {}
                    }
                    className="AppError"
                  >
                    {errorInput.userName}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <h2 className="input-label mb-3">Password</h2>
                <input
                  name="password"
                  onChange={handleChange}
                  placeholder="Enter password"
                  type="password"
                  value={userAccount.password}
                />
                <div className="error-container">
                  <span
                    style={
                      errorInput.password === "Looks Good!"
                        ? { color: "green" }
                        : {}
                    }
                    className="AppError"
                  >
                    {errorInput.password}
                  </span>
                </div>
              </div>
              <Link to="/resetpassword">
                <p className="text-right mt-2 mb-2 forgotPass">
                  Forgot password?
                </p>
              </Link>

              <p
                className="mt-2 mb-4"
                style={{ color: "#9BA4B4", fontSize: "14px" }}
              >
                By clicking on Continue, you agree to our Terms & Conditions
              </p>
              <div onClick={handleSubmit} className="border cont-btn">
                <h2 className="text-center">Continue</h2>
              </div>
              <Link to="/register">
                <p
                  className="mt-3 mb-4 text-center"
                  style={{ color: "var(--appBlack)", fontSize: "14px" }}
                >
                  New to PaySync?{" "}
                  <span style={{ color: "#EDB538" }}>Sign Up</span>
                </p>
              </Link>
            </form>
          </div>
        </div>
      </div>
      <div className="login-wrapper-item2">
        <div className="img-bg-container">
          <div className="img-bg"></div>
        </div>
      </div>
    </div>
  );
}
