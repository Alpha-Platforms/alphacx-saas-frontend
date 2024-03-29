/* eslint-disable */
import React, { useEffect, useState } from 'react';
import './login.css';
import { NotificationManager } from 'react-notifications';
import { httpPost } from 'helpers/httpMethods';
import { brandKit, wordCapitalize } from 'helper';
import { ClipLoader } from 'react-spinners';
import AlphaLogo from '../../../assets/imgF/alpha.png';
import Logo from '../../../assets/imgF/logo.png';
import ThankYou from '../../../assets/imgF/thank-you.png';
import Error from '../../../assets/icons/error-circle.png';
import Symbol1 from '../../../assets/imgF/symbolAuth.png';
import Symbol2 from '../../../assets/imgF/symbolAuth2.png';
import { css } from '@emotion/css';

function AccountVerified({ match, ...props }) {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const [isTenantVerified, setIsTenantVerified] = useState(false);
    const [token, setToken] = useState('');
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        setToken(new URLSearchParams(window.location.search).get('token'));
    }, []);

    useEffect(() => {
        if (token) {
            verify(token);
        }
    }, [token]);

    const handleChange = (e) => {
        e.preventDefault();

        if (isTenantVerified) {
            setLoading(false);
            window.location.href = `/`;
        }
    };

    // VERFICATION
    const verify = async (token) => {
        const res = await httpPost('auth/verify', { token });

        if (res.status === 'success') {
            setIsTenantVerified(true);
            setIsChecked(true);
            setLoading(false);
            setMessage(res.message);
            NotificationManager.success('Verification successful', message, 4000);
        } else {
            setLoading(false);
            setIsChecked(true);
            // wordCapitalize(res?.er?.message) #raw sql, ask BE to fix
            NotificationManager.error('Account verification failed', 'Account Verification', 4000);
        }
    };

    return (
        <>
            {loading && !isChecked && (
                <div
                    style={{
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        height: '100vh',
                    }}
                >
                    <ClipLoader color="#0796f7" loading size={75} />
                </div>
            )}
            {isChecked ? (
                <div
                    className={`auth-container d-flex justify-content-center ${css({
                        ...brandKit({ bgCol: -20, default: true }),
                    })}`}
                >
                    <div className="symbol-wrap2">
                        <img src={Symbol2} alt="" />
                    </div>
                    <div className="login-logo">
                        <img src={AlphaLogo} alt="" /> <img src={Logo} alt="" />
                    </div>
                    <div className="login-container">
                        {isTenantVerified ? (
                            <form>
                                <div className="d-flex justify-content-center my-4">
                                    <img src={ThankYou} alt="" />
                                </div>
                                <div className="Auth-header mb-2">
                                    <h3>Thank you!</h3>
                                    <p>
                                        {message}
                                        <br />
                                        Click the button below to log in.
                                    </p>
                                </div>

                                <div className="submit-auth-btn">
                                    <button 
                                        onClick={handleChange}
                                        className={css({
                                            ...brandKit({ bgCol: -20, default: true }),
                                        })}
                                    >
                                        Continue to Login
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <form>
                                <div className="d-flex justify-content-center my-4">
                                    <img src={Error} alt="" />
                                </div>
                                <div className="Auth-header mb-3">
                                    <h3 className="mb-3">Verification Error!</h3>
                                    <h5>Your domain was not verified.</h5>
                                </div>
                            </form>
                        )}
                    </div>

                    <div className="symbol-wrap">
                        <img src={Symbol1} alt="" />
                    </div>
                </div>
            ) : (
                ''
            )}
        </>
    );
}

export default AccountVerified;
