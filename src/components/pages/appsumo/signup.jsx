/* eslint-disable */
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

    



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
import { httpPost, httpGet } from '../../../helpers/httpMethods';
import { Validate } from '../../../helpers/validateInput';
import { countries } from '../../shared/countries';
import '../auth/login.css';
import Symbol1 from '../../../assets/imgF/symbolAuth.png';
import ThankYou from '../../../assets/imgF/thank-you.png';
import LogoColoured from '../../../assets/svgicons/LogoColoured.svg';
import AppsumoLogo from '../../../assets/images/appsumo-logo.png';

import { Modal } from 'react-responsive-modal';
// import BarLoader from "react-spinners/BarLoader";
import {BarLoader, PulseLoader} from "react-spinners";
//
import ChartsImg from '../../../assets/images/charts.png';
import TicketsImg from '../../../assets/images/tickets.png';
import ConversationsImg from '../../../assets/images/conversations.png';
import { Capitalize } from 'components/helpers/helpers';
import Login from '../auth/login';
import { getSubdomainOrUrl } from 'helper';
import { getSubscription } from 'reduxstore/actions/subscriptionAction';
import { useDispatch } from 'react-redux';

const override = {
    display: "block",
    margin: "0 auto",
    borderRadiius: "2px",
  };

let verifyDomainTimer;

function Appsumo() {
    const dispatch = useDispatch();
    const { search } = useLocation();

    const [userInput, setUserInput] = useState({
        fullname: '',
        email: '',
        password: '',
        domain: '',
        // country: 'United States'
    });

    const [activationEmail, setActivationEmail] = useState('');
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [passwordShown, setPasswordShown] = useState(false);
    const [, setValidated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isVerified, setIsVerified] = useState(false);
    const [domainChecking, setDomainChecking] = useState(false);
    const [lockDomain, setLockDomain] = useState(false);
    const [, forceUpdate] = useState();
    const [domainAvail, setDomainAvail] = useState(false);
    const [showModal, setShowModal] = useState(false)
    const [showRirecting, setShowRirecting] = useState(false)
    const [userData, setUserData] = useState({email: '', domain: ''})
    const [tenantExists, setTenantExists] = useState(false)
    const [openTenantExistsModal, setOpenTenantExistsModal] = useState(false)
    const [planName, setPlanName] = useState('')


    useEffect(async () => {
        const params = new URLSearchParams(search);
        const tenantId = params.get('tenant');

        if (tenantId) {
            try {
                const res = await httpGet(`appsumo/sumoling?tenant=${tenantId}`, {});
                if (res.status === 'success') {
                    // setActivationEmail(res.data.email);

                    if(res.data?.email && res.data?.name && res.data?.domain){
                        setTenantExists(true)
                        setOpenTenantExistsModal(true)
                        setLockDomain(true)
                        setPlanName(res.data?.planName)
                        setPasswordShown(true)
                        setUserInput((prev) => ({
                            ...prev,
                            email: res.data?.email,
                            fullname: res.data?.name,
                            domain: res.data?.domain,
                            password: 'Your old password remains valid'
                        }));
                    } else {
                        setUserInput((prev) => ({
                            ...prev,
                            email: res.data.email
                        }));
                    }


                } else {
                    // setDomainChecking(false);
                }
            } catch (e) {
                console.log(e);
            }
        }

    }, []);

    const redirectToLogin = async () => {
        setShowRirecting(true)
        const res = await httpPost(`auth/login`, { domain: userData.domain });

        if (res.status === 'success') {
            dispatch(getSubscription(res?.data?.id));
            // return null;
            if (res.data?.has_subdomain) {
                window.location.href = `${getSubdomainOrUrl(res.data?.domain)}/login?activation=1&email=${userData.email}`;
            } else {
                window.localStorage.setItem('domain', res.data?.domain);
                window.location.href = `/login?activation=1&email=${userData.email}`;
            }
        } else {
            window.location.href = '/';
        }
    }

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (showModal) {

            tryLogin(isLoggedIn);
        }
    }, [showModal]);

    const tryLogin = (isLogged) => {
        let intv = 0;
        if (isLogged){
            clearInterval(intv);
            return `interval ${intv} clear`;
        }
            
        console.log("Nope!!!");
        let logged = null;

        let itnv = setTimeout( async () => {
            const res = await httpPost(`auth/login`, {domain: userData.domain});
            logged = res.status === 'success';
            setIsLoggedIn(logged)
            tryLogin(logged);
        
        }, 10000);
        
    };

    useEffect(() => {
      if (isLoggedIn) {
        redirectToLogin();
      }
    }, [isLoggedIn]);
    

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
                    message: 'The :attribute must have more than 2 characters.',
                    rule: (val) => {
                        return val?.val && val?.val?.length > 2;
                    },
                },
            },
        }),
    );


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

    const handleSubmit = async (event) => {
        event.preventDefault()

        if (simpleValidator.current.allValid()) {
            setLoading(true);
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
            const data = {
                domain: userInput.domain.toLowerCase(),
                name: userInput.fullname,
                email: userInput.email.toLowerCase(),
                password: userInput.password,
                tenantExists
            };

            const res = await httpPost('appsumo/activate', data);

            if (res.status === 'success') {
                setUserData(res.data)
                tenantExists? setIsLoggedIn(true) : setShowModal(true)
                setLoading(false);
                setIsVerified(true);
            } else {
                setLoading(false);
                NotificationManager.error(res?.er?.message, 'Activation failed, try again', 4000);
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
        <>
        <main className="auth-bg-dark min-vh-100 auth-main">
            <Container fluid className="min-vh-100">
                <Row className="min-vh-100">
                    <Col
                        md={5}
                        className="bg-white vh-100 hide-scrollbar d-flex flex-column justify-content-center align-items-center"
                    >
                        <section className="px-lg-5 py-3 flex-grow-1 auth-form-container h-100">
                            <div className="px-3 min-vh-100 d-flex flex-column justify-content-between">
                                
                                {!isVerified && !showModal ? (
                                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                        <div className="mb-4">
                                            <div className="mb-3"  style={{height: '40px', display: 'flex', alignItems: 'center'}}>
                                                <Image src={LogoColoured} style={{height: '100%'}} />
                                                <span style={{
                                                    width: '1px',
                                                    height: '100%',
                                                    background: '#004882',
                                                    margin: '0 12px',
                                                }}></span>
                                                <Image src={AppsumoLogo} style={{height: '68%'}} />
                                            </div>
                                            <h1 className="acx-text-gray-700 fs-4">Welcome Sumo-ling,</h1>
                                            <h1 className="acx-text-gray-700 fw-bold fs-4">Complete your account Activation</h1>
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
                                                            Full Name{' '}
                                                        </Form.Label>
                                                        <Form.Control
                                                            type="text"
                                                            required
                                                            autoComplete="off"
                                                            name="fullname"
                                                            value={userInput.fullname}
                                                            onChange={(e) => handleChange(e)}
                                                            disabled={tenantExists}
                                                            className="bg-light acx-form-control"
                                                            placeholder="Your Full Name"
                                                        />
                                                        {
                                                            /* simple validation */
                                                            simpleValidator.current.message(
                                                                'Full Name',
                                                                userInput.fullname,
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
                                                    disabled={userInput.email !== ''}
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
                                                        className="bg-light acx-form-control"
                                                        placeholder="Password"
                                                        onChange={(e) => handleChange(e)}
                                                        disabled={tenantExists}
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
                                                    Domain{' '}
                                                </Form.Label>
                                                <InputGroup className="">
                                                    <Form.Control
                                                        type="text"
                                                        required
                                                        autoComplete="off"
                                                        placeholder="Domain"
                                                        onChange={(e) => handleChange(e)}
                                                        disabled={lockDomain}
                                                        name="domain"
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
                                                        ) : userInput.domain.length > 3 && !lockDomain ? (
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
                                                        {/* Your unique URL will be <strong>{userInput.domain}.alphacx.co</strong> */}
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
                                                            domainAvail: domainAvail || tenantExists,
                                                        },
                                                        'domain_required|domain_min_length|domain_alpha_numeric|domain_available',
                                                    )
                                                }
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
                                                <a href="https://alphacx.co/privacy-policy/" target="_blank" style={{ zIndex: 0 }}>
                                                    Terms of Service
                                                </a>{' '}
                                                and have read and understood the{' '}
                                                <a href="https://alphacx.co/privacy-policy/" target="_blank" style={{ zIndex: 0 }}>
                                                    Privacy Policy
                                                </a>
                                                .
                                            </Form.Group>

                                            <div className="mb-2 submit-auth-btn">                                                
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
                                                        'Activate Account'
                                                    )}
                                                </Button>
                                            </div>
                                        </Form>
                                    </div>
                                    
                                ) : showModal?
                                (
                                    <>                                    

                                        <div className="flex-grow-1 d-flex flex-column justify-content-center">

                                            

                                            <div className="Auth-header mb-2">                                               

                                                {
                                                    showRirecting?
                                                    (
                                                    <>
                                                        <div className="d-flex justify-content-center my-4">
                                                            <Image src={ThankYou} alt="" />
                                                        </div>
                                                        <h5 className="mb-2 fw-light">Congratulations!</h5>
                                                        <p className="text-center">Account setup is complete</p>
                                                        <small className='text-at-blue-light'>You're now being redirected to login</small>
                                                    </>
                                                    ) 
                                                    : 
                                                    (
                                                    <>
                                                        <h5 className="mb-2 fw-bold text-at-blue-light">New Account Setup</h5>
                                                        <p className="text-center text-dark">Your <span className='fw-bold'>AlphaCX Account</span> is being setup.</p>
                                                        <small className='text-dark'>You will be redirected when setup is complete</small>                                                        
                                                    </>
                                                    )
                                                }

                                                <PulseLoader
                                                    color="#103e65"
                                                    cssOverride={override}
                                                    loading={true}
                                                    size={6}
                                                    margin={2}
                                                    onClick={() => console.log("clicked")}                                                    
                                                />
                                            </div>
                                        </div>
                
                                    </>
                                ) : (
                                    <div className="flex-grow-1 d-flex flex-column justify-content-center">
                                        <div className="d-flex justify-content-center my-4">
                                            <Image src={ThankYou} alt="" />
                                        </div>
                                        <div className="Auth-header mb-2">
                                            {
                                                tenantExists? (
                                                    <>
                                                        <h3 className="mb-3 text-center">Subscription updated successfully!</h3>
                                                        <p className="text-center">You're now being redirected to Login.</p>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h3 className="mb-3 text-center">Congratulations!</h3>
                                                        <p className="text-center">Your account has been created successfully. <br />You're now being redirected to Login.</p>
                                                    </>
                                                )                                                
                                            }
                                        </div>
                                    </div>
                                )
                                }

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
                            <Col md={12} className="px-0 h-100 auth-bg-gradient-2">
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



        <Modal
            open={openTenantExistsModal}
            onClose={() => {}}
            aria-labelledby="contained-modal-title-vcenter"
            size="lg"
            centered
        >
            {/* <Modal.Body> */}
            <div className="rounded-3">
                <div className="text-center"> {/* DISPLAY CLOSE X BTN */}
                    <div className=""> 
                        <div className="bg-at-blue-light p-4 pb-2 rounded-top-04">
                            <h5 className="">Account Already Exists</h5>
                        </div>
                        <p className="text-center px-5 py-4">
                            An Account already exists with <strong>{userInput.email}</strong><br />
                            Your subscription will be updated to <strong>{planName} License</strong>
                        </p>
                        <div className="mb-4">
                            <Button as="button" onClick={() => setOpenTenantExistsModal(false)} variant="" className="bg-at-blue-light">
                                Yes, Continue
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            {/* </Modal.Body> */}
        </Modal>



        {false &&
            <Modal
                // show={createModalShow}
                // onHide={() => setCreateModalShow(false)}
                open={true}
                onClose={ () => {}}
                aria-labelledby="contained-modal-title-vcenter"
                size="lg"
                centered
            >
                <div className='bg-at-blue rounded-top text-white p-3'>
                    <p className='fw-bold mb-0'>New Account Setup</p>
                </div>

                <div className="m-5 mb-4 px-3" >
                    {/* <p>Hi Candice,</p> */}
                    <p className="">Your <strong>AlphaCX Account</strong> is being setup. <br /> It will only take about 95 seconds.</p>
                    
                  </div>

                  <div className='border-top rounded-bottom text-white p-3' style={{backgroudColor: 'rgba(16, 62, 101, .11)'}}>

                    {
                        showRirecting? 
                        (<small className='text-at-blue me-3'>You're now being redirected to login</small>) 
                        : 
                        (<small className='text-at-blue me-3'>You will be redirected when setup is complete</small>)
                    }

                    <PulseLoader
                            color="#103e65"
                            cssOverride={override}
                            loading={true}
                            size={6}
                            margin={2}
                            onClick={() => console.log("clicked")}
                            
                        />
                </div>
                
            </Modal>
            }
        </>
    );
}

export default Appsumo;
