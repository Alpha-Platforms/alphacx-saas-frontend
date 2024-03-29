// @ts-nocheck
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import RSelect from 'react-select';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import InputGroup from 'react-bootstrap/InputGroup';
import SimpleReactValidator from 'simple-react-validator';
import { NotificationManager } from 'react-notifications';
import { httpPost } from '../../../helpers/httpMethods';
import { countries } from '../../shared/countries';
import './login.css';
import Symbol1 from '../../../assets/imgF/symbolAuth.png';
import ThankYou from '../../../assets/imgF/thank-you.png';
import LogoColoured from '../../../assets/svgicons/LogoColoured.svg';
//
import ChartsImg from '../../../assets/images/charts.png';
import TicketsImg from '../../../assets/images/tickets.png';
import ConversationsImg from '../../../assets/images/conversations.png';

let verifyDomainTimer;

function Registration() {
    const { search } = useLocation();
    const [userInput, setUserInput] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        companyName: '',
        domain: '',
        country: 'United States',
        // country: 'Nigeria',
    });

    const [acceptTerms, setAcceptTerms] = useState(false);

    //
    const [passwordShown, setPasswordShown] = useState(false);
    const [, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [domainChecking, setDomainChecking] = useState(false);
    const [lockDomain, setLockDomain] = useState(false);
    const [defaultCountry, setDefaultCountry] = useState({});
    const [RSCountries, setRSCountries] = useState([]);
    const [, forceUpdate] = useState();
    const [domainAvail, setDomainAvail] = useState(false);

    const simpleValidator = useRef(
        new SimpleReactValidator({
            element: (message) => <div className="formErrorMsg">{message.replace(/(The|field)/gi, '').trim()}</div>,
            validators: {
                domain_available: {
                    message: 'The :attribute taken. Choose a new one.',
                    rule: (val) => {
                        return Boolean(val?.domainAvail);
                    },
                },
                domain_alpha_numeric: {
                    message: 'The :attribute may only contain letters and numbers.',
                    rule: (val, _, validator) => {
                        return validator.helpers.testRegex(`${val?.val ? val?.val : ''}`, /^[A-Z0-9]*$/i);
                    },
                },
                domain_required: {
                    message: 'The :attribute field is required.',
                    rule: (val) => {
                        return Boolean(val?.val);
                    },
                },
                domain_min_length: {
                    message: 'The :attribute must have more than 3 characters.',
                    rule: (val) => {
                        return val?.val && val?.val?.length > 3;
                    },
                },
            },
        }),
    );

    useEffect(() => {
        const qparams = new URLSearchParams(search); // update to useSearchParams() when RR is upgraded to v6

        const email = qparams.get('email');
        const firstName = qparams.get('firstName');
        const lastName = qparams.get('lastName');

        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            // if email isn't valid just ignore everything
            setUserInput((prev) => ({ ...prev, email, firstName, lastName }));
        }
    }, []);

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

    const verifyDomain = async (domain) => {
        if (domain.length > 2) {
            try {
                const res = await httpPost(`auth/login`, { domain });
                if (res.status === 'success') {
                    setDomainChecking(false);
                    simpleValidator.current.showMessageFor('Domain');
                    setLockDomain(false);
                    setDomainAvail(false);
                } else {
                    setDomainChecking(false);
                    setLockDomain(true);
                    setDomainAvail(true);
                }
            } catch (e) {
                setDomainChecking(false);
                setLockDomain(true);
                setDomainAvail(true);
            }
        } else {
            setDomainAvail(false);
        }
    };

    //
    const handleChange = (e) => {
        if (e.target.name === 'acceptTerms') {
            setAcceptTerms(e.target.checked);
        } else {
            setUserInput((prev) => ({
                ...prev,
                [e.target.name]: e.target?.name === 'domain' ? e.target.value?.toLowerCase() : e.target.value,
            }));

            if (e.target.name === 'email') {
                localStorage.setItem('tenantEmail', e.target.value);
            } else if (e.target.name === 'domain') {
                clearTimeout(verifyDomainTimer);
                if (e.target.value?.length > 2) {
                    setDomainChecking(true);
                    verifyDomainTimer = setTimeout(async () => {
                        verifyDomain(e.target.value);
                    }, 2000);
                } else {
                    setDomainChecking(false);
                }
            }
        }
    };
    //
    const handleRSChange = ({ value }, { name }) => {
        setUserInput({
            ...userInput,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        if (simpleValidator.current.allValid()) {
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
            const hasEmpty = Object.values(requiredData).some((x) => x == null || x === '');

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
        } else {
            // show all errors if exist
            simpleValidator.current.showMessages();
            // force update component to display error
            forceUpdate(1);
        }
        return null;
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
                                                            className="bg-light acx-form-control"
                                                            placeholder="First Name"
                                                        />
                                                        {
                                                            /* simple validation */
                                                            simpleValidator.current.message(
                                                                'First name',
                                                                userInput.firstName,
                                                                'required',
                                                            )
                                                        }
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
                                                            placeholder="Last Name"
                                                            className="bg-light acx-form-control"
                                                        />
                                                        {
                                                            /* simple validation */
                                                            simpleValidator.current.message(
                                                                'Last name',
                                                                userInput.lastName,
                                                                'required',
                                                            )
                                                        }
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
                                                    name="email"
                                                    value={userInput.email}
                                                    placeholder="Your work email"
                                                />
                                                {
                                                    /* simple validation */
                                                    simpleValidator.current.message(
                                                        'Email',
                                                        userInput.email,
                                                        'required|email',
                                                    )
                                                }
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
                                                {
                                                    /* simple validation */
                                                    simpleValidator.current.message(
                                                        'Password',
                                                        userInput.password,
                                                        'required',
                                                    )
                                                }
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
                                                    value={userInput.companyName}
                                                    className="bg-light acx-form-control"
                                                />
                                                {
                                                    /* simple validation */
                                                    simpleValidator.current.message(
                                                        'Company name',
                                                        userInput.companyName,
                                                        'required',
                                                    )
                                                }
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
                                                        // disabled={lockDomain}
                                                        onChange={(e) => handleChange(e)}
                                                        name="domain"
                                                        // onBlur={(e) => verifyDomain(e)}
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
                                                            </span>
                                                        ) : userInput.domain.length > 2 && !lockDomain ? (
                                                            <span className="">
                                                                <i className="bi-x-circle text-danger" />
                                                            </span>
                                                        ) : (
                                                            ''
                                                        )}
                                                    </InputGroup.Text>
                                                </InputGroup>
                                                {userInput.domain && (
                                                    <small>
                                                        {/* Your URL will be <strong>{userInput.domain}.alphacx.co</strong> */}
                                                        Your domain may be used as your unique subdomain URL per your
                                                        plan.
                                                    </small>
                                                )}
                                                {
                                                    /* simple validation */
                                                    simpleValidator.current.message(
                                                        'Domain',
                                                        {
                                                            val: userInput.domain,
                                                            domainAvail,
                                                        },
                                                        'domain_required|domain_min_length|domain_alpha_numeric|domain_available',
                                                    )
                                                }
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

                                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                                <Form.Check
                                                    type="checkbox"
                                                    name="acceptTerms"
                                                    label=""
                                                    className="d-inline-block"
                                                    onChange={(e) => handleChange(e)}
                                                />
                                                By creating an account, you agree to our{' '}
                                                <a href="https://alphacx.co/privacy-policy/" style={{ zIndex: 0 }}>
                                                    Terms of Service
                                                </a>{' '}
                                                and have read and understood the{' '}
                                                <a href="https://alphacx.co/privacy-policy/" style={{ zIndex: 0 }}>
                                                    Privacy Policy
                                                </a>
                                                .
                                            </Form.Group>

                                            <div className="mb-2 submit-auth-btn">
                                                {/* <p className="mt-4">
                                                    By creating an account, you agree to our{' '}
                                                    <a href="https://alphacx.co/privacy-policy/" style={{ zIndex: 0 }}>
                                                        Terms of Service
                                                    </a>{' '}
                                                    and have read and understood the{' '}
                                                    <a href="https://alphacx.co/privacy-policy/" style={{ zIndex: 0 }}>
                                                        Privacy Policy
                                                    </a>
                                                    .
                                            </p> */}
                                                <Button
                                                    type="submit"
                                                    onClick={handleSubmit}
                                                    disabled={loading || domainChecking || !acceptTerms}
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
