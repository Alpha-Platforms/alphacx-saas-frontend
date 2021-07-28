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
import { httpPostMain } from "../../../helpers/httpMethods";
import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
const override = css``;

const Login = ({ match, history }) => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
    domain: "",
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

    const validatepassword = validatePassword(userInput.password);
    if (validatepassword != "Looks Good!") {
      return NotificationManager.warning(
        validatepassword,
        "Validation Warning",
        4000
      );
    }
    const data = {
      email: userInput.email,
      password: userInput.password,
      domain: match.params.domain,
    };

    setLoading(true);
    const res = await httpPostMain("auth/login", data);
    if (res.status == "success") {
      setLoading(false);
      console.log(res?.status);
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("token", res.data.token);

      NotificationManager.success(res.data.message, "Success", 4000);

      window.location.href = `/home`;
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
            <p>Sign in to get started</p>
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
                "Login"
              )}
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

export default Login;
