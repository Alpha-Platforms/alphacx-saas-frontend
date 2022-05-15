/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
// react-bootstrap component
import RSelect from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
//
import { NotificationManager } from 'react-notifications';
// resource
import { httpPost } from '../../../helpers/httpMethods';
import { Validate } from '../../../helpers/validateInput';
import { countries } from '../../shared/countries';
import './login.css';
// assets
import Logo from '../../../assets/imgF/logo.png';
import AlphaLogo from '../../../assets/imgF/alpha.png';
import Symbol1 from '../../../assets/imgF/symbolAuth.png';
import ThankYou from '../../../assets/imgF/thank-you.png';
import LogoColoured from '../../../assets/svgicons/LogoColoured.svg';
//
import ChartsImg from '../../../assets/images/charts.png';
import TicketsImg from '../../../assets/images/tickets.png';
import ConversationsImg from '../../../assets/images/conversations.png';

function Registration() {

    const {search} = useLocation()

    useEffect(() => {
        const qparams = new URLSearchParams(search) // update to useSearchParams() when RR is upgraded to v6

        const email = qparams.get('email')
        const firstName = qparams.get('firstName')
        const lastName = qparams.get('lastName')

        if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)){ // if email isn't valid just ignore everything
            setUserInput((prev) => ({...prev, email, firstName, lastName}))
        }
    }, [])

    //
    const [userInput, setUserInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        companyName: '',
        domain: '',
        country: 'Nigeria',
    });

    
    //
    const [passwordShown, setPasswordShown] = useState(false);
    const [validated, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [domainChecking, setDomainChecking] = useState(false);
    const [lockDomain, setLockDomain] = useState(false);
    const [defaultCountry, setDefaultCountry] = useState({});
    const [RSCountries, setRSCountries] = useState([]);

    useEffect(() => {
        setRSCountries(() =>
            countries?.map((item) => {
                return { value: item.name, label: item.name };
            }),
        );
    }, [countries]);

    useEffect(() => {
        setDefaultCountry(() => RSCountries.filter((item) => item.value === userInput.country));
    }, [RSCountries, userInput.country]);

    const togglePasswordVisibility = () => {
        setPasswordShown(!passwordShown);
    };

    const verifyDomain = async (e) => {
        if (!lockDomain && Validate.noSpecialChars(e, userInput, setUserInput)) {
            const domain = userInput.domain.toLowerCase();
            setDomainChecking(true);
            const res = await httpPost(`auth/login`, { domain });
            if (res.status === 'success') {
                setDomainChecking(false);
                setUserInput({
                    ...userInput,
                    [e.target.name]: '',
                });
                NotificationManager.error('This domain has been taken. Please choose another', 'Domain not available', 4000);
            } else {
                setDomainChecking(false);
                setLockDomain(true);
            }
        }
    };

    //
    const handleChange = (e) => {
        setUserInput((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));

        if (e.target.name === 'email') {
            localStorage.setItem('tenantEmail', e.target.value);
        }
    };
    //
    const handleRSChange = ({ value }, { name }) => {
        setUserInput({
            ...userInput,
            [name]: value,
        });
    };

    // ONBLUR VALIDATION
    const handleBlur = (e) => {
        if (e.target.name === 'email') {
            Validate.email(e, userInput, setUserInput);
        } else if (e.target.name === 'password') {
            Validate.password(e, userInput, setUserInput);
        } else if (e.target.name === 'firstName' || e.target.name === 'lastName' || e.target.name === 'companyName') {
            Validate.length(e, userInput, setUserInput);
        } else if (e.target.name === 'domain') {
            Validate.noSpecialChars(e, userInput, setUserInput);
        }
    };
    //
    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();
        event.stopPropagation();
        setValidated(true);
        const data = {
            domain: userInput.domain.toLowerCase(),
            firstname: userInput.firstName,
            lastname: userInput.lastName,
            companyName: userInput.companyName,
            email: userInput.email.toLowerCase(),
            password: userInput.password,
            country: userInput.country,
            currency: userInput.country.toLowerCase() === 'nigeria' ? 'NGN' : 'USD',
        };

        const requiredData = {
            ...data,
        };
        delete requiredData.companyName;
        const hasEmpty = Object.values(requiredData).some((x) => x == null || x == '');

        if (hasEmpty) {
            setLoading(false);
            return NotificationManager.error('Please fill all required field', 4000);
        }

        const res = await httpPost('auth/register', data);
        if (res.status === 'success') {
            setLoading(false);
            setIsVerified(true);
            NotificationManager.success('Verification mail has been to you', 'Account Created!', 4000);
        } else {
            setLoading(false);
            NotificationManager.error(res?.er?.message, 'Error', 4000);
        }
    };
    return (
        <main className="auth-bg-dark min-vh-100 auth-main">
            <Container fluid className="min-vh-100">
                <Row className="min-vh-100">
                    <Col
                        md={5}
                        className="bg-white vh-100 hide-scrollbar d-flex flex-column justify-content-center align-items-center"
                    >
                        <section className="px-lg-5 py-3 flex-grow-1 auth-form-container h-100">
                            <div className="px-3 min-vh-100 d-flex flex-column justify-content-between">
                                {!isVerified ? (
                                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                        <div className="mb-4">
                                            <div className="mb-3">
                                                <Image src={LogoColoured} height="40" />
                                            </div>
                                            <h1 className="acx-text-gray-700 fw-bold fs-4">Get Started</h1>
                                            <p className="text-muted mb-3">
                                                Already have an account?{' '}
                                                <Link to="/login" className="acx-link-primary">
                                                    Login
                                                </Link>
                                            </p>
                                        </div>
                                        <Form className="">
                                            <Row>
                                                <Col>
                                                    <Form.Group className="mb-4 form-group acx-form-group">
                                                        <Form.Label visuallyHidden className="mb-1">
                                                            First Name{' '}
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            autoComplete="off"
                                                            name="firstName"
                                                            value={userInput.firstName}
                                                            onChange={(e) => handleChange(e)}
                                                            onBlur={(e) => handleBlur(e)}
                                                            className="bg-light acx-form-control"
                                                            placeholder="First Name"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                                <Col>
                                                    <Form.Group className="mb-4 form-group acx-form-group">
                                                        <Form.Label visuallyHidden className="mb-1">
                                                            Last Name{' '}
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            autoComplete="off"
                                                            name="lastName"
                                                            value={userInput.lastName}
                                                            onChange={(e) => handleChange(e)}
                                                            onBlur={(e) => handleBlur(e)}
                                                            placeholder="Last Name"
                                                            className="bg-light acx-form-control"
                                                        />
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                            <Form.Group className="mb-4 form-group acx-form-group">
                                                <Form.Label visuallyHidden className="mb-1">
                                                    Your work email{' '}
                                                </Form.Label>
                                                <Form.Control
                                                    type="email"
                                                    required
                                                    autoComplete="off"
                                                    className="bg-light acx-form-control"
                                                    onChange={(e) => handleChange(e)}
                                                    onBlur={(e) => handleBlur(e)}
                                                    name="email"
                                                    value={userInput.email}
                                                    placeholder="Your work email"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-4 form-group acx-form-group">
                                                <Form.Label visuallyHidden className="mb-1">
                                                    Password{' '}
                                                </Form.Label>
                                                <div className="position-relative">
                                                    <Form.Control
                                                        type={passwordShown ? 'text' : 'password'}
                                                        autoComplete="off"
                                                        required
                                                        className="bg-light acx-form-control"
                                                        placeholder="Password"
                                                        onChange={(e) => handleChange(e)}
                                                        onBlur={(e) => handleBlur(e)}
                                                        name="password"
                                                        value={userInput.password}
                                                    />
                                                    <span className="position-absolute end-0 top-50 app-text-gray-500 translate-middle-y">
                                                        <Button
                                                            onClick={togglePasswordVisibility}
                                                            className="acx-btn-icon acx-btn-icon-lg bg-transparent shadow-none"
                                                            title={passwordShown ? 'hide password' : 'show password'}
                                                        >
                                                            <i className={passwordShown ? 'bi-eye' : 'bi-eye-slash'} />
                                                        </Button>
                                                    </span>
                                                </div>
                                            </Form.Group>
                                            <Form.Group className="mb-4 form-group acx-form-group">
                                                <Form.Label visuallyHidden className="mb-1">
                                                    Company Name{' '}
                                                </Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    required
                                                    autoComplete="off"
                                                    placeholder="Company Name"
                                                    name="companyName"
                                                    onChange={(e) => handleChange(e)}
                                                    onBlur={(e) => handleBlur(e)}
                                                    value={userInput.companyName}
                                                    className="bg-light acx-form-control"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-4 form-group acx-form-group">
                                                <Form.Label visuallyHidden className="mb-1">
                                                    Domain{' '}
                                                </Form.Label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        type="text"
                                                        required
                                                        autoComplete="off"
                                                        placeholder="Domain"
                                                        disabled={lockDomain}
                                                        onChange={(e) => handleChange(e)}
                                                        name="domain"
                                                        onMouseLeave={(e) => verifyDomain(e)}
                                                        onBlur={(e) => verifyDomain(e)}
                                                        value={userInput.domain}
                                                        className="bg-light acx-form-control"
                                                    />
                                                    <InputGroup.Text>
                                                        {domainChecking ? (
                                                            <span>
                                                                <span
                                                                    className="spinner-border spinner-border-sm"
                                                                    role="status"
                                                                    aria-hidden="true"
                                                                />{' '}
                                                                Processing...
                                                            </span>
                                                        ) : lockDomain ? (
                                                            <span className="">
                                                                <i className="bi-check2-circle text-success" />
                                                                <span> alphacx.co</span>
                                                            </span>
                                                        ) : (
                                                            '.alphacx.co'
                                                        )}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                                {userInput.domain && <small>Your URL will be <strong>{userInput.domain}.alphacx.co</strong></small>}
                                            </Form.Group>
                                            <Form.Group className="mb-3 form-group acx-form-group">
                                                <Form.Label visuallyHidden className="mb-1">
                                                    Country{' '}
                                                </Form.Label>
                                                <RSelect
                                                    className="rselectfield bg-light acx-form-control"
                                                    name="country"
                                                    placeholder="Country"
                                                    onChange={handleRSChange}
                                                    isClearable={false}
                                                    isMulti={false}
                                                    options={RSCountries}
                                                    value={defaultCountry}
                                                />
                                            </Form.Group>
                                            <div className="mb-2 submit-auth-btn">
                                                <p className="mt-4">
                                                    By creating an account, you agree to our{' '}
                                                    <a href="https://alphacx.co/privacy-policy/">Terms of Service</a>{' '}
                                                    and have read and understood the{' '}
                                                    <a href="https://alphacx.co/privacy-policy/">Privacy Policy</a>.
                                                </p>
                                                <Button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    disabled={loading || domainChecking}
                                                    className="w-100 mt-0"
                                                >
                                                    {loading ? (
                                                        <span>
                                                            <span
                                                                className="spinner-border spinner-border-sm"
                                                                role="status"
                                                                aria-hidden="true"
                                                            />{' '}
                                                            Processing...
                                                        </span>
                                                    ) : (
                                                        'Sign Up'
                                                    )}
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                ) : (
                                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                        <div className="d-flex justify-content-center my-4">
                                            <Image src={ThankYou} alt="" />
                                        </div>
                                        <div className="Auth-header mb-2">
                                            <h3 className="mb-3">Congratulations!</h3>
                                            <p className="text-center">
                                                Your account has been created successfully. <br />
                                                An activation mail has been sent to <strong>{userInput?.email}</strong>
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="text-center mb-3 pb-3">
                                    <p className="text-muted">
                                        © {new Date().getFullYear()} AlphaCX Intelligent Platforms. All rights reserved.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </Col>
                    <Col md={7} className="d-none h-100 min-vh-100 h-100 d-md-block position-relative">
                        <Row gap={0} className="h-100">
                            <Col md={12} className="px-0 h-100 auth-bg-gradient">
                                <section className="py-3 min-vh-100 d-flex flex-column justify-content-around">
                                    <div className="text-end pt-5">
                                        <Carousel controls={false} className="registeration-carousel ">
                                            <Carousel.Item>
                                                <Image
                                                    src={ConversationsImg}
                                                    className="acx-rounded-start-10"
                                                    width="75%"
                                                />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <Image src={TicketsImg} className="acx-rounded-start-10" width="75%" />
                                            </Carousel.Item>
                                            <Carousel.Item>
                                                <Image src={ChartsImg} className="acx-rounded-start-10" width="75%" />
                                            </Carousel.Item>
                                        </Carousel>
                                    </div>
                                    <div className="text-center mt-3">
                                        <h2 className="text-white fs-4 mb-2">
                                            Sign up to attend to your <br />
                                            customers your way
                                        </h2>
                                    </div>
                                </section>
                            </Col>
                        </Row>
                        <div className="symbol-wrap">
                            <img src={Symbol1} alt="" />
                        </div>
                    </Col>
                </Row>
            </Container>
        </main>
    );
}

export default Registration;
