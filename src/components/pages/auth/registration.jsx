import React, {useEffect, useState} from "react";
import {Link} from 'react-router-dom';
// react-bootstrap component
import RSelect from 'react-select';
import Row from "react-bootstrap/Row";      
import Col from "react-bootstrap/Col";      
import Card from "react-bootstrap/Card";         
import Form from "react-bootstrap/Form";
import Badge from "react-bootstrap/Badge";    
import Image from "react-bootstrap/Image";    
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import InputGroup from "react-bootstrap/InputGroup";    
// 
import ClipLoader from "react-spinners/ClipLoader";
import {NotificationManager} from "react-notifications";
// 
import {httpPost} from "../../../helpers/httpMethods";
import {ValidateEmail, validatePassword, Validate} from "../../../helpers/validateInput";
// resource and assets
import "./login.css";
import {countries} from '../../../components/shared/countries';
import Logo from "../../../assets/imgF/logo.png";
import AlphaLogo from "../../../assets/imgF/alpha.png";
import ConversationsImg from "../../../assets/images/conversations.png";
import Symbol1 from "../../../assets/imgF/symbolAuth.png";
import {ReactComponent as ApproveIcon} from "../../../assets/icons/check-green.svg";

const Registration = () => {
     // 
    const [userInput, setUserInput] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        companyName: "",
        domain: "",
        country: ""
    });
    // 
    const [passwordShown, setPasswordShown] = useState(false);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false)
    const [domainChecking, setDomainChecking] = useState(false)
    const [lockDomain, setLockDomain] = useState(false)
    // 
    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };
    // 
    const verifyDomain = async (e) => {
        const domain = userInput.domain;
        setDomainChecking(true);
        const res = await httpPost(`auth/login`, {domain});
        if (res.status === "success") {
            setDomainChecking(false)
            setUserInput({
                ...userInput,
                [e.target.name]: ""
            });
            NotificationManager.error(res?.er?.message, "This domain already exists", 4000);
        } else {
            setDomainChecking(false);
            setLockDomain(true)
        }
    }
    // 
    const handleChange = (e) => {
        setUserInput({
            ...userInput,
            [e.target.name]: e.target.value
        });
        if(e.target.name === "email"){
            localStorage.setItem("tenantEmail", e.target.value)
        }
    };
    // 
    const handleRSChange = ({value}, {name}) => {
        setUserInput({
            ...userInput,
            [name]: value
        });
    }
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
    // 
    const handleSubmit = async(event) => {
        setLoading(true);
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const data = {
            domain: userInput.domain,
            firstname: userInput.firstName,
            lastname: userInput.lastName,
            companyName: userInput.companyName,
            email: userInput.email,
            password: userInput.password,
            country: userInput.country,
            currency: "Naira"
        };
        const requiredData = {
            ...data
        }
        delete requiredData.companyName;
        const hasEmpty = Object.values(requiredData).some(x => x == null || x == "");

        if(hasEmpty) {
            setLoading(false);
            return NotificationManager.error("Please fill all required field", 4000);
        }

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
    return(
        <main className="auth-bg-dark min-vh-100 auth-main">
            <Container fluid className="min-vh-100">
                <Row className="min-vh-100">
                    <Col md={5} className="bg-white vh-100 hide-scrollbar d-flex justify-content-center align-items-center">
                        <section className="px-md-5 py-3 flex-grow-1 auth-form-container h-100">
                            <div className="px-3">
                                <div className="">
                                    <h1 className="acx-text-gray-700 fw-bold fs-3">Get Started</h1>
                                    <p className="text-muted mb-3">Already have an account? <Link to="/login" className="acx-link-primary">Login</Link></p>
                                </div>
                                <Form className="">
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3 form-group acx-form-group">
                                                <Form.Label className="mb-1">First Name </Form.Label>
                                                <Form.Control type="text" required
                                                    autoComplete="off" 
                                                    name="firstName"
                                                    onChange={(e) => handleChange(e)}
                                                    onBlur={(e) => handleBlur(e)}
                                                    className="bg-light acx-form-control" 
                                                    placeholder="Enter first name" />   
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3 form-group acx-form-group">
                                                <Form.Label className="mb-1">Last Name </Form.Label>
                                                <Form.Control type="text" required 
                                                    autoComplete="off" 
                                                    name="lastName"
                                                    onChange={(e) => handleChange(e)}
                                                    onBlur={(e) => handleBlur(e)}
                                                    placeholder="Enter last name"   
                                                    className="bg-light acx-form-control"/> 
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Form.Group className="mb-3 form-group acx-form-group">
                                        <Form.Label className="mb-1">Your work email </Form.Label>
                                        <Form.Control type="email" required
                                            autoComplete="off" 
                                            className="bg-light acx-form-control" 
                                            onChange={(e) => handleChange(e)}
                                            onBlur={(e) => handleBlur(e)}
                                            name="email"
                                            value={userInput.email}
                                            placeholder="Enter work email" />   
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group acx-form-group">
                                        <Form.Label className="mb-1">Password </Form.Label>
                                        <div className="position-relative">
                                            <Form.Control type={passwordShown ? "text" : "password"} 
                                                autoComplete="off" required
                                                className="bg-light acx-form-control" 
                                                placeholder="Enter password"
                                                onChange={(e) => handleChange(e)}
                                                onBlur={(e) => handleBlur(e)}
                                                name="password"
                                                autoComplete="off"
                                                value={userInput.password} /> 
                                            <span className="position-absolute end-0 top-50 app-text-gray-500 translate-middle-y">
                                                <Button onClick={togglePasswordVisibility} 
                                                        className="acx-btn-icon acx-btn-icon-lg bg-transparent shadow-none" 
                                                        title={passwordShown ? "hide password" : "show password"}>
                                                    <i className={passwordShown ? "bi-eye" : "bi-eye-slash"}></i>
                                                </Button>
                                            </span>  
                                        </div>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group acx-form-group">
                                        <Form.Label className="mb-1">Company Name </Form.Label>
                                        <Form.Control type="text" required 
                                            autoComplete="off" 
                                            placeholder="Enter company name"  
                                            name="companyName"
                                            onChange={(e) => handleChange(e)}
                                            value={userInput.companyName} 
                                            className="bg-light acx-form-control"/> 
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group acx-form-group">
                                        <Form.Label className="mb-1">Domain </Form.Label>
                                        <InputGroup className="">
                                            <Form.Control type="text" required 
                                                autoComplete="off" 
                                                placeholder="Enter domain"   
                                                disabled={lockDomain}
                                                onChange={(e) => handleChange(e)}
                                                name="domain"
                                                onBlur={(e) => verifyDomain(e)}
                                                value={userInput.domain}
                                                className="bg-light acx-form-control"/> 
                                            <InputGroup.Text>
                                                { domainChecking ? 
                                                    <span>
                                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...
                                                    </span>
                                                :lockDomain?
                                                    <span className="">
                                                        <i className="bi-check2-circle text-success"></i><span> alphacx.co</span>
                                                    </span>
                                                :
                                                    (".alphacx.co")
                                                }
                                            </InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Group className="mb-3 form-group acx-form-group">
                                        <Form.Label className="mb-1">Country </Form.Label>
                                        <RSelect className="rselectfield bg-light acx-form-control"
                                            name="country"
                                            placeholder="Search or select country"
                                            onChange={handleRSChange}
                                            isClearable={false}
                                            isMulti={false}
                                            options={
                                                countries?.map(item => {
                                                    return {value: item.name, label: item.name}
                                                })
                                            }
                                        />
                                    </Form.Group>
                                    <div className="mb-2 submit-auth-btn">
                                        <Button type="submit" onClick={handleSubmit}  disabled={loading}
                                                className="w-100 mt-3">
                                            {loading ?
                                                <span>
                                                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Processing...
                                                </span> : "Sign Up" } 
                                        </Button>
                                    </div>
                                </Form>
                                <div className="text-center mb-3 pb-3">
                                    <p className="text-muted">
                                        © {new Date().getFullYear()} AlphaCX. All rights reserved
                                    </p>
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col md={7} className="d-none h-100 min-vh-100 h-100 d-md-block position-relative">
                        <Row gap={0} className="h-100">
                            <Col md={10} className="pe-0 h-100 auth-bg-gradient">
                                <section className="py-3 min-vh-100 d-flex flex-column justify-content-between">
                                    <div className="text-end mb-4 pe-5">
                                        <img src={AlphaLogo} height="40" alt=""/>{' '}
                                        <img src={Logo} height="25" alt=""/>
                                    </div>
                                    <div className="text-end">
                                        <Image src={ConversationsImg} className="acx-rounded-start-10" height="430"/>
                                    </div>
                                    <div className="text-center mt-3">
                                        <h2 className="text-white fs-3 mb-2">
                                            Turn complaints to <br/> 
                                            happiness
                                        </h2>
                                        <p className="acx-text-white-75 mb-0">
                                            We empower you to deliver consistent <br/>
                                            alpha customer service
                                        </p>
                                    </div>
                                </section>
                            </Col>
                            <Col md={2}></Col>
                        </Row>
                        <div className="symbol-wrap">
                            <img src={Symbol1} alt=""/>
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
} 

export default Registration;