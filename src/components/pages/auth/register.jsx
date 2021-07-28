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
import { httpPost } from "../../../helpers/httpMethods";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css``;

const Login = ({ history }) => {
  const [userInput, setUserInput] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    domain: "",
    region: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  let [loading, setLoading] = useState(false);
  let [color, setColor] = useState("#ffffff");
  useEffect(() => {}, []);

  const handleChange = (e) => {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateEmail = ValidateEmail(userInput.email);
    if (validateEmail == false) {
      return NotificationManager.warning(
        "Invalid email address",
        "Validation Warning",
        4000
      );
    }

    if (userInput.firstName == "") {
      return NotificationManager.warning(
        "First name is required",
        "Validation Warning",
        4000
      );
    }

    if (userInput.lastName == "") {
      return NotificationManager.warning(
        "Last name is required",
        "Validation Warning",
        4000
      );
    }

    if (userInput.companyName == "") {
      return NotificationManager.warning(
        "Company name is required",
        "Validation Warning",
        4000
      );
    }

    if (userInput.domain == "") {
      return NotificationManager.warning(
        "Domain  is required",
        "Validation Warning",
        4000
      );
    }

    if (userInput.region == "") {
      return NotificationManager.warning(
        "Region  is required",
        "Validation Warning",
        4000
      );
    }
    const validatepassword = validatePassword(userInput.password);
    if (validatepassword != "Looks Good!") {
      return NotificationManager.warning(
        validatepassword,
        "Validation Warning",
        4000
      );
    }
    const data = {
      domain: userInput.domain,
      firstname: userInput.firstName,
      lastname: userInput.lastName,
      companyName: userInput.companyName,
      email: userInput.email,
      password: userInput.password,
      region: userInput.region,
      currency: "Naira",
    };
    setLoading(true);
    const res = await httpPost("auth/register", data);
    if (res.status == "success") {
      setLoading(false);
      console.log(res?.status);
      NotificationManager.success(
        "Account created successfully",
        "Success",
        4000
      );
      history.push("/");
    } else {
      console.log(res);
      setLoading(false);
      NotificationManager.error(res?.er?.message, "Error", 4000);
    }
  };

  return (
    <div className="auth-container codei-ui-andy-setDefaults">
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
                <input
                  type="text"
                  onChange={handleChange}
                  name="firstName"
                  value={userInput.firstName}
                />
              </div>

              <div className="inputWrapTwo">
                <label htmlFor="">Last Name </label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="lastName"
                  value={userInput.lastName}
                />
              </div>
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

            <div className="input-main-wrap">
              <div className="input-wrap">
                <label htmlFor="">Company Name</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="companyName"
                  value={userInput.companyName}
                />
              </div>
            </div>

            <div className="input-main-wrap">
              <div className="input-wrap">
                <label htmlFor="">Domain</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="domain"
                  value={userInput.domain}
                />
              </div>
            </div>

            <div className="input-main-wrap">
              <div className="input-wrap">
                <label htmlFor="">Region</label>
                <input
                  type="text"
                  onChange={handleChange}
                  name="region"
                  value={userInput.region}
                />
              </div>
            </div>
            <div className="haveAnAccou">
              <a href="/">Already have an account? Login</a>
            </div>

            <div className="submit-auth-btn">
              <button disabled={loading} onClick={handleSubmit}>
                {" "}
                {loading ? (
                  <ClipLoader
                    color={color}
                    loading={loading}
                    css={override}
                    size={30}
                  />
                ) : (
                  "Register"
                )}
              </button>
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
