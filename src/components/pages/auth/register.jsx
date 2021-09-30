import React, {useEffect, useState} from "react";
import "./login.css";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import Logo from "../../../assets/imgF/logo.png";
import showPasswordImg from "../../../assets/imgF/Show.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import Symbol2 from "../../../assets/imgF/symbolAuth2.png";
import {NotificationManager} from "react-notifications";
import swal from "sweetalert";
import {ValidateEmail, validatePassword, Validate} from "../../../helpers/validateInput";
import {httpPost} from "../../../helpers/httpMethods";
import {css} from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import {CSSTransition} from 'react-transition-group';
import {countries} from '../../../components/shared/countries';
import RSelect from 'react-select';
import ThankYou from "../../../assets/imgF/thank-you.png";

const override = css ``;

const Login = ({history}) => {
    const [userInput,
        setUserInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        domain: "",
        region: ""
    });

    const [showPassword,
        setShowPassword] = useState(false);
    const [loading,
        setLoading] = useState(false);
    const [color,
        setColor] = useState("#ffffff");

    const [activeForm,
        setActiveForm] = useState('form-one');
    const [menuHeight,
        setMenuHeight] = useState(null);

    const calcHeight = el => {
        const height = el.offsetHeight;
        console.log("height => ", height);
        setMenuHeight(height);
    }

    const [isVerified, setIsVerified] = useState(false)


    const handleChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        });
        if(e.target.name === "email"){
            localStorage.setItem("tenantEmail", e.target.value)
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const validateEmail = ValidateEmail (userInput.email);

        const data = {
            domain: userInput.domain,
            firstname: userInput.firstName,
            lastname: userInput.lastName,
            companyName: userInput.companyName,
            email: userInput.email,
            password: userInput.password,
            region: userInput.region || "",
            currency: "Naira"
        };

        setLoading(true);

        const res = await httpPost("auth/register", data);

        if (res.status === "success") {
            setLoading(false);
            setIsVerified(true)
            NotificationManager.success("Verification mail has been to you", "Acount Created!", 4000);
        } else {
            setLoading(false);
            NotificationManager.error(res?.er?.message, "Error", 4000);
        }

    };

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

    const checkContinue = () => {
        const {firstName, lastName, email, password} = userInput;
        if (!firstName || !lastName || !email || !password) 
            return true;
        return false
    }

    return (
        <div className="auth-container  d-flex justify-content-center codei-ui-andy-setDefaults">
            <div className="symbol-wrap2">
                <img src={Symbol2} alt=""/>
            </div>
            <div className="login-logo mb-3">
                <img src={AlphaLogo} alt=""/>
                <img src={Logo} alt=""/>
            </div>

            <div className="login-container pb-5">
                
                { !isVerified ?
                <form>
                    <div
                        className="Auth-header"
                        style={{
                        marginBottom: "30px"
                    }}>
                        <h3>Welcome Back</h3>
                        <p>Create an account for your business</p>
                    </div>

                    <div
                        className="input-main-wrap regform-wrapper"
                        style={{
                        minHeight: `${menuHeight}px`
                    }}>
                        <CSSTransition
                            in={activeForm === "form-one"}
                            unmountOnExit
                            timeout={500}
                            classNames="regform-primary"
                            onEnter={calcHeight}>
                            <div className="regform">
                                <div className="input-wrap-with-two-inputes">
                                    <div className="inputWrapTwo">
                                        <label htmlFor="" className="form-label">First Name</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="firstName"
                                            autoComplete="off"
                                            value={userInput.firstName}/>
                                    </div>

                                    <div className="inputWrapTwo">
                                        <label htmlFor="" className="form-label">Last Name</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="lastName"
                                            autoComplete="off"
                                            className="d-inline-block me-0 w-100"
                                            value={userInput.lastName}/>
                                    </div>
                                </div>

                                <div className="input-main-wrap mt-2">
                                    <div className="input-wrap">
                                        <label htmlFor="" className="form-label">Email Address</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            name="email"
                                            autoComplete="off"
                                            value={userInput.email}/>
                                    </div>
                                </div>

                                <div className="input-wrap">
                                    <label htmlFor="" className="form-label">Password</label>
                                    <input
                                        type={`${showPassword
                                        ? "text"
                                        : "password"}`}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        name="password"
                                        autoComplete="new-password"
                                        value={userInput.password}/>
                                    <div className="passworEye">
                                        <img
                                            src={showPasswordImg}
                                            alt=""
                                            onClick={() => setShowPassword(!showPassword)}/>
                                    </div>
                                </div>
                                <div className="haveAnAccou">
                                    <span></span>
                                    <a href="/login">Already have an account? Login</a>
                                </div>

                                <div className="submit-auth-btn">
                                    <button
                                        type="button"
                                        disabled={checkContinue()}
                                        onClick={() => setActiveForm('form-two')}>Continue
                                    </button>
                                </div>
                            </div>
                        </CSSTransition>

                        <CSSTransition
                            in={activeForm === "form-two"}
                            unmountOnExit
                            timeout={500}
                            onEnter={calcHeight}
                            classNames="regform-secondary">
                            <div className='regform mt-0'>
                                <div className="input-main-wrap">
                                    <div className="input-wrap">
                                        <label htmlFor="" className="form-label">Company Name</label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="companyName"
                                            autoComplete="off"
                                            value={userInput.companyName}/>
                                    </div>
                                </div>

                                <div className="input-wrap">

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

                                </div>

                                <div className="input-wrap">
                                    <div className="">
                                        <label htmlFor="status" className="form-label">Country</label>
                                        <RSelect className="rselectfield bg-light"
                                            style={{ fontSize: "12px" }}
                                            name="country"
                                            placeholder="Search or select country"
                                            onChange={(inputValue, meta) => {
                                                console.log(inputValue.value)
                                            }}
                                            isClearable={false}
                                            isMulti={false}
                                            options={
                                                countries?.map(item => {
                                                    return {value: item.name, label: item.name}
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                                <div className="haveAnAccou">
                                    <button type="button" onClick={() => setActiveForm('form-one')}>Back</button>
                                    <a href="/login">Already have an account? Login</a>
                                </div>

                                <div className="submit-auth-btn">
                                    <button disabled={loading} onClick={handleSubmit}>
                                        {" "}
                                        {loading
                                            ? (<ClipLoader color={color} loading={loading} css={override} size={30}/>)
                                            : ("Register")}
                                    </button>
                                </div>
                            </div>
                        </CSSTransition>

                    </div>
                </form>
                :
                <form>
                    <div className="d-flex justify-content-center my-4">
                    <img src={ThankYou } alt="" />
                    </div>
                    <div className="Auth-header mb-2">
                    <h3 className="mb-3">Congratulations!</h3>
                    <p className="text-center">Your account has been created successfully. <br />An activation mail has been sent to <strong>{userInput?.email}</strong></p>
                    </div>
        
                    <div className="submit-auth-btn text-center mt-4">
                        <a className="fs-6" href="https://app.alphacx.co/help">
                            See Quick Setup Steps
                        </a>
                    </div>
                </form>
                }
            </div>
            <div className="symbol-wrap">
                <img src={Symbol1} alt=""/>
            </div>
        </div>
    );
};

export default Login;
