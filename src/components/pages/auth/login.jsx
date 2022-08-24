/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/css';
import { useDispatch } from 'react-redux';
import './login.css';
import { NotificationManager } from 'react-notifications';
import { Link, useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader';
import { wordCapitalize, getSubdomainOrUrl, brandKit } from '../../../helper';

import showPasswordImg from '../../../assets/imgF/Show.png';
import Symbol1 from '../../../assets/imgF/symbolAuth.png';
import Symbol2 from '../../../assets/imgF/symbolAuth2.png';
import { httpPost, httpPostMain } from '../../../helpers/httpMethods';
import { getSubscription } from '../../../reduxstore/actions/subscriptionAction';
import { getTenantInfo, setTenantInfo } from '../../../reduxstore/actions/tenantInfoActions';

function Login() {
    const location = useLocation();
    const dispatch = useDispatch();
    const params = new URLSearchParams(location.search);
    const email = params.get('email');
    // eslint-disable-next-line radix
    // const activation = parseInt(params.get('activation'));

    const [userInput, setUserInput] = useState({
        domain: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);
    const [domain, setDomain] = useState(window.localStorage.getItem('domain') || '');
    const [tenantId, setTenantId] = useState('');
    const [loading, setLoading] = useState(false);
    const [color] = useState('#ffffff');
    const [hasSubdomain, setHasSubdomain] = useState('');

    const hostname = window.location.hostname.split('.');
    const subdomain = hostname[0].toLowerCase();

    useEffect(() => {
        const token = window.localStorage.getItem('token');
        const refreshToken = window.localStorage.getItem('refreshToken');
        if (token && refreshToken) {
            window.location.href = '/';
        }

        if (email) {
            setUserInput((prev) => {
                return { ...prev, email };
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        (async () => {
            if (getSubdomainOrUrl()) {
                // handle netlify case later
                /* only login domain when domain is valid */
                if (subdomain !== 'app' && subdomain !== 'dev') {
                    const res = await httpPost(`auth/login`, { domain: subdomain });
                    if (res?.status === 'success') {
                        setDomain(res?.data?.domain);
                        setTenantId(res?.data?.id);
                        setHasSubdomain(res.data?.has_subdomain);
                        dispatch(getSubscription(res?.data?.id));
                        dispatch(getTenantInfo(subdomain));
                    }
                }
            } else {
                window.location.href = `${getSubdomainOrUrl(
                    process.env.NODE_ENV === 'development' ? 'dev' : 'app',
                )}/login`;
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        (async () => {
            if ((subdomain === 'app' || subdomain === 'dev') && !domain) {
                // reset tenantinfo
                dispatch(setTenantInfo(null, true));
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [domain]);

    useEffect(() => {
        if (domain || tenantId) {
            window.localStorage.setItem('domain', domain);
            window.localStorage.setItem('tenantId', tenantId);
        }
    }, [domain, tenantId]);

    const handleChange = (e) => {
        setUserInput({ ...userInput, [e.target.name]: e.target.value });
    };

    const gotoLandingPage = () => {
        // if (activation) { // CAUSING ERROR SO... FIX LATER (App.jsx152 - setAppSocket())
        if (false) {
            window.location.href = `/appsumo-plans`;
        } else {
            window.location.href = `/`;
        }
    };

    const submit = async () => {
        if (domain) {
            // DO PASSWORD LOGIN

            if (userInput.email && userInput.password) {
                const data = {
                    email: userInput.email.trim().toLowerCase(),
                    password: userInput.password,
                };

                setLoading(true);
                const res = await httpPostMain('auth/login', data);
                setLoading(false);

                if (res.status === 'success') {
                    window.localStorage.setItem('user', JSON.stringify(res.data));
                    window.localStorage.setItem('token', res.data.token);
                    window.localStorage.setItem('refreshToken', res.data.refreshToken);
                    gotoLandingPage();
                } else {
                    // Login fails
                    NotificationManager.error(res?.er?.message, 'Error', 4000);
                }
            }
        } else {
            // DO DOMAIN LOGIN

            // eslint-disable-next-line no-shadow
            const domain = userInput.domain.trim().toLowerCase();

            setLoading(true);
            const res = await httpPost(`auth/login`, { domain });

            if (res.status === 'success') {
                setTenantId(res?.data?.id);
                dispatch(getSubscription(res?.data?.id));
                dispatch(getTenantInfo(domain));
                setLoading(false);
                setHasSubdomain(res.data?.has_subdomain);

                if (res.data?.has_subdomain) {
                    window.location.href = `${getSubdomainOrUrl(domain)}/login`;
                } else {
                    setDomain(res?.data?.domain);
                }
            } else {
                setLoading(false);
                NotificationManager.error(wordCapitalize(res?.er?.message), 'Invalid Domain Name', 4000);
            }
        }
    };

    const logoutDomain = (e) => {
        e.preventDefault();
        window.localStorage.removeItem('domain');
        dispatch(setTenantInfo(null, true));
        if (hasSubdomain)
            window.location.href = `${getSubdomainOrUrl(process.env.NODE_ENV === 'development' ? 'dev' : 'app')}/login`;
        if (subdomain === 'app' || subdomain === 'dev') setDomain('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        submit();
    };

    return (
        <div
            className={`auth-container d-flex justify-content-center ${css({
                ...brandKit({ bgCol: -20, default: true }),
            })}`}
        >
            {/* {!hasSubdomain && ( */}
            {true && (
                <div className="symbol-wrap2">
                    <img src={Symbol2} alt="" />
                </div>
            )}
            <div className="login-logo-main">
                <img src={brandKit(['default'])[0]} alt="" />
            </div>

            <div className="login-container">
                {domain === '' && (
                    <form>
                        <div className="Auth-header" style={{ marginBottom: '10px' }}>
                            <h3>Welcome Back</h3>
                            <p>Please, enter your domain name</p>
                        </div>

                        <label htmlFor="domain-tenant-field" className="form-label">
                            Domain
                        </label>
                        <div className="input-group">
                            <input
                                type="text"
                                className="form-control"
                                name="domain"
                                autoComplete="off"
                                onChange={handleChange}
                                value={userInput.domain}
                                id="domain-tenant-field"
                                placeholder="Enter Domain"
                            />
                        </div>

                        <div className="haveAnAcco">
                            <a href="/sign-up">First time user? Sign up</a>
                        </div>

                        <div className="submit-auth-btn">
                            <button
                                type="submit"
                                disabled={loading || userInput.domain === ''}
                                onClick={handleSubmit}
                                className={css({
                                    ...brandKit({ bgCol: -20, default: true }),
                                })}
                            >
                                {' '}
                                {loading ? <ClipLoader color={color} loading={loading} size={30} /> : 'Continue'}
                            </button>
                        </div>
                    </form>
                )}

                {domain && (
                    <form>
                        <div className="Auth-header" style={{ marginBottom: '20px' }}>
                            <h3>Welcome Back</h3>
                            <p>Enter login details</p>
                        </div>

                        <div className="input-main-wrap">
                            <div className="input-wrap">
                                <label htmlFor="domain-email">Email Address</label>
                                <input
                                    type="text"
                                    onChange={handleChange}
                                    id="domain-email"
                                    name="email"
                                    value={userInput.email}
                                />
                            </div>
                        </div>

                        <div className="input-wrap">
                            <label htmlFor="domain-password">Password</label>
                            <input
                                type={`${showPassword ? 'text' : 'password'}`}
                                onChange={handleChange}
                                name="password"
                                value={userInput.password}
                                id="domain-password"
                            />
                            <div className="passworEye">
                                <img src={showPasswordImg} alt="" onClick={() => setShowPassword(!showPassword)} />
                            </div>
                        </div>
                        <div className="d-flex justify-content-between forgetPassword">
                            <div className="mt-2">
                                <span>
                                    <strong>{wordCapitalize(domain)}</strong>
                                </span>
                                <button
                                    type="button"
                                    onClick={logoutDomain}
                                    className="border btn-light ms-2 px-1 rounded small"
                                >
                                    Change
                                </button>
                            </div>
                            <Link to="/forgot-password" className="ms-auto mt-2">
                                Forgot Password?
                            </Link>
                        </div>

                        <div className="submit-auth-btn">
                            <button
                                type="submit"
                                disabled={loading || userInput.email === '' || userInput.password === ''}
                                onClick={handleSubmit}
                                className={css({
                                    ...brandKit({ bgCol: 10, default: true }),
                                    '&:hover, &:focus': {
                                        ...brandKit({ bgCol: -20, default: true }),
                                    },
                                })}
                            >
                                {' '}
                                {loading ? <ClipLoader color={color} loading={loading} size={30} /> : 'Login'}
                            </button>
                        </div>

                        <div className="haveAnAccou">
                            <span className="f-11 d-block text-center mb-1">
                                <small>Not yet registered?</small>
                            </span>
                            <Link to="/sign-up">Create an account</Link>
                        </div>
                    </form>
                )}
            </div>

            {/* {!hasSubdomain && ( */}
            {true && (
                <div className="symbol-wrap">
                    <img src={Symbol1} alt="" />
                </div>
            )}
        </div>
    );
}

export default Login;
