/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Badge from 'react-bootstrap/Badge';
import '../settings.css';
import Modal from 'react-responsive-modal';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { Capitalize } from '../../../helpers/helpers';
import whatsappImg from '../../../../assets/imgF/WhatsApp.png';
import facebookImg from '../../../../assets/imgF/Facebook.png';
import instagramImg from '../../../../assets/imgF/instagram.png';
import twitterImg from '../../../../assets/imgF/twitter.png';
import termiiImg from '../../../../assets/imgF/termii.png';
import { httpDeleteMain } from '../../../../helpers/httpMethods';
import RightArrow from '../../../../assets/imgF/arrow_right.png';
import AccountLightIcon from '../../../../assets/icons/Social-blurb.svg';
import MailLightIcon from '../../../../assets/icons/mail_light.svg';
import { hasFeatureAccess, getSubdomainUrl } from '../../../../helper';
// import { hideLoader, showLoader } from '../../../helpers/loader';
// import Breadcrumb from 'react-bootstrap/Breadcrumb';
// import { hostname } from 'os';
// import smsImg from '../../../../assets/imgF/TwilioSms.svg';

function SocialIntegrations({ configs }) {
    // const [configData, setConfigData] = useState([]);
    // const [loadingConfig, setLoadingConfig] = useState(true);

    const [smsConnected, setSmsConnected] = useState(false);
    const [emailConnected, setEmailConnected] = useState(false);
    const [facebookConnected, setFacebookConnected] = useState(false);
    const [instagramConnected, setInstagramConnected] = useState(false);
    const [whatsappConnected, setWhatsappConnected] = useState(false);
    const [livechatConnected, setLivechatConnected] = useState(false);
    const [isDeleteConfirmed, setIsDeleteConfirmed] = useState(false);
    const [platform, setPlatform] = useState('');

    useEffect(() => {
        if (configs.sms_config) {
            setSmsConnected(true);
        }
        if (configs.email_config?.email) {
            setEmailConnected(true);
        }
        if (configs.facebook_config?.id) {
            setFacebookConnected(true);
        }
        if (configs.instagram_config?.id) {
            setInstagramConnected(true);
        }
        if (configs.livechat_config) {
            setLivechatConnected(true);
        }
        if (configs.whatsapp_config?.twillo_account_sid) {
            setWhatsappConnected(true);
        }

        // console.log(configs);

        // console.log(Math.random());
    }, [configs]);

    // useEffect(() => {
    //     // getConfig();
    // }, []);

    // const getConfig = async () => {
    //     const res = await httpGetMain(`settings/config`);
    //     if (res.status === 'success') {
    //         setLoadingConfig(true);
    //         setConfigData(res?.data);
    //         setLoadingConfig(false);
    //     } else {
    //         setLoadingConfig(false);
    //         return NotificationManager.error(res.er.message, 'Error', 4000);
    //     }
    // };

    // const goToFB = (e) => {
    //     e.preventDefault();
    //     const subdomain = 'app';
    //     const path = 'integrations';
    //     const params = `domain=${window.localStorage.getItem('domain')}&id=${window.localStorage.getItem(
    //         'token',
    //     )}&uid=${window.localStorage.getItem('refreshToken')}`;
    //     const { protocol } = window.location;
    //     const hostname = window.location.hostname.split('.').slice(1).join('.');
    //     const { port } = window.location;
    //     window.location.href = `${protocol}//${subdomain}.${hostname}:${port}/${path}?${params}`;
    // };

    const disconnectFBIG = async () => {
        setIsDeleteConfirmed(false);
        const res = await httpDeleteMain(`settings/${platform}/disconnect`);
        if (res.status === 'success') {
            platform === 'facebook' ? setFacebookConnected(false) : setInstagramConnected(false);
            return NotificationManager.success(`${Capitalize(platform)} integration disconnected`, 'Successful', 4000);
        }
        return NotificationManager.error(res.error, 'Error', 4000);
    };

    const goToConnector = (e, channel) => {
        e.preventDefault();
        const subdomain = 'app';
        const path = 'integrations';
        const breadcrumb = window.location.href;
        const params = `channel=${channel}&domain=${window.localStorage.getItem(
            'domain',
        )}&id=${window.localStorage.getItem('token')}&uid=${window.localStorage.getItem(
            'refreshToken',
        )}}&breadcrumb=${breadcrumb}`;
        // eslint-disable-next-line no-shadow
        window.location.href = `${getSubdomainUrl(subdomain)}/${path}?${params}`;
    };

    return (
        <div className="social-integration-page">
            <div id="mainContentHeader" className="breadcrumb">
                <h6 className="text-muted f-14">
                    <Link to="/settings">
                        <span className="text-custom">Settings</span>
                    </Link>{' '}
                    <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                    <span>Integrations </span>
                </h6>
            </div>
            <div className="row g-3 mt-4 mb-5">
                {/* integration columns starts */}
                {hasFeatureAccess('whatsapp') && (
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
                            <Link to="/settings/integrations/whatsapp" className="d-block cursor text-decoration-none">
                                <div className="d-flex align-items-start p-md-4 p-3">
                                    <div className="w">
                                        <img src={whatsappImg} alt="" width="38" />
                                    </div>
                                    <div className="ms-3 d-flex w-100 justify-content-between align-items-start">
                                        <div className="me-2">
                                            <h6 className="text-dark mb-0">WhatsApp by Twilio</h6>
                                            <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                                                Connect your users via WhatsApp
                                            </p>
                                        </div>
                                        <div className="">
                                            <Badge
                                                className={`${
                                                    !whatsappConnected
                                                        ? 'acx-bg-primary  text-white'
                                                        : 'acx-bg-gray-100 text-muted fw-light'
                                                } px-3 py-2`}
                                            >
                                                {!whatsappConnected ? 'Connect' : 'Disconnect'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}

                {hasFeatureAccess('facebook') && (
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
                            {/* <Link to="/settings/integrations/facebook" className="d-block cursor text-decoration-none"> */}

                            <a
                                href="#"
                                className="d-block cursor text-decoration-none"
                                role="button"
                                onClick={(e) => {
                                    setPlatform('facebook');
                                    facebookConnected ? setIsDeleteConfirmed(true) : goToConnector(e, 'facebook');
                                }}
                            >
                                <div className="d-flex align-items-start p-md-4 p-3">
                                    <div className="w">
                                        <img src={facebookImg} alt="" width="38" />
                                    </div>
                                    <div className="ms-3 d-flex w-100 justify-content-between align-items-start">
                                        <div className="me-2">
                                            <h6 className="text-dark mb-0">Facebook</h6>
                                            <p
                                                className={`acx-fs-8 lh-base mt-1 mb-2  text-muted ${
                                                    facebookConnected && 'fw-bold'
                                                }`}
                                            >
                                                {!facebookConnected
                                                    ? 'Connect your Business Facebook Page'
                                                    : configs.facebook_config?.page_name || 'Page not available'}
                                            </p>
                                        </div>
                                        <div className="">
                                            <Badge
                                                className={`${
                                                    !facebookConnected
                                                        ? 'acx-bg-primary  text-white'
                                                        : 'acx-bg-gray-100 text-muted fw-light'
                                                } px-3 py-2`}
                                            >
                                                {!facebookConnected ? 'Connect' : 'Disconnect'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                )}

                {hasFeatureAccess('instagram') && (
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
                            {/* <Link to="/settings/integrations/facebook" className="d-block cursor text-decoration-none"> */}

                            <a
                                href="#"
                                className="d-block cursor text-decoration-none"
                                role="button"
                                onClick={(e) => {
                                    setPlatform('instagram');
                                    instagramConnected ? setIsDeleteConfirmed(true) : goToConnector(e, 'instagram');
                                }}
                            >
                                <div className="d-flex align-items-start p-md-4 p-3">
                                    <div className="w">
                                        <img src={instagramImg} alt="" width="38" />
                                    </div>
                                    <div className="ms-3 d-flex w-100 justify-content-between align-items-start">
                                        <div className="me-2">
                                            <h6 className="text-dark mb-0">Instagram</h6>
                                            <p
                                                className={`acx-fs-8 lh-base mt-1 mb-2  text-muted ${
                                                    instagramConnected && 'fw-bold'
                                                }`}
                                            >
                                                {!instagramConnected
                                                    ? 'Connect your Business Instagram Page'
                                                    : configs.instagram_config?.page_name}
                                            </p>
                                        </div>
                                        <div className="">
                                            <Badge
                                                className={`${
                                                    !instagramConnected
                                                        ? 'acx-bg-primary  text-white'
                                                        : 'acx-bg-gray-100 text-muted fw-light'
                                                } px-3 py-2`}
                                            >
                                                {!instagramConnected ? 'Connect' : 'Disconnect'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </div>
                    </div>
                )}

                {hasFeatureAccess('twitter') && (
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
                            <Link to="/settings/integrations/twitter" className="d-block cursor text-decoration-none">
                                <div className="d-flex align-items-start p-md-4 p-3">
                                    <div className="w">
                                        <img src={twitterImg} alt="" width="38" />
                                    </div>
                                    <div className="ms-3 d-flex w-100 justify-content-between align-items-start">
                                        <div className="me-2">
                                            <h6 className="text-dark mb-0">
                                                Twitter
                                                <span
                                                    className="ms-1 text-white"
                                                    style={{
                                                        fontSize: '0.6rem',
                                                        padding: '2px 4px',
                                                        background: '#1da1f1',
                                                        borderRadius: '2px',
                                                        verticalAlign: 'middle',
                                                    }}
                                                >
                                                    Beta
                                                </span>
                                            </h6>
                                            <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                                                Receive and respond to Twitter direct messages as tickets
                                            </p>
                                        </div>
                                        <div className="">
                                            <Badge
                                                className={`${
                                                    !smsConnected
                                                        ? 'acx-bg-primary  text-white'
                                                        : 'acx-bg-gray-100 text-muted fw-light'
                                                } px-3 py-2`}
                                            >
                                                {!smsConnected ? 'Connect' : 'Disconnect'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}

                {hasFeatureAccess('sms') && (
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
                            <Link to="/settings/integrations/sms" className="d-block cursor text-decoration-none">
                                <div className="d-flex align-items-start p-md-4 p-3">
                                    <div className="w">
                                        <img src={termiiImg} alt="" width="38" />
                                    </div>
                                    <div className="ms-3 d-flex w-100 justify-content-between align-items-start">
                                        <div className="me-2">
                                            <h6 className="text-dark mb-0">SMS by Termii</h6>
                                            <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                                                Connect your users via SMS
                                            </p>
                                        </div>
                                        <div className="">
                                            <Badge
                                                className={`${
                                                    !smsConnected
                                                        ? 'acx-bg-primary  text-white'
                                                        : 'acx-bg-gray-100 text-muted fw-light'
                                                } px-3 py-2`}
                                            >
                                                {!smsConnected ? 'Connect' : 'Disconnect'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}

                {hasFeatureAccess('email-to-ticket') && (
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
                            <Link to="/settings/integrations/email" className="d-block cursor text-decoration-none">
                                <div className="d-flex align-items-start p-md-4 p-3">
                                    <div className="w">
                                        <img src={MailLightIcon} alt="" width="38" />
                                    </div>
                                    <div className="ms-3 d-flex w-100 justify-content-between align-items-start">
                                        <div className="me-2">
                                            <h6 className="text-dark mb-0">Email to Ticket</h6>
                                            <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                                                Set up email to receive mails as tickets
                                            </p>
                                        </div>
                                        <div className="">
                                            <Badge
                                                className={`${
                                                    !emailConnected
                                                        ? 'acx-bg-primary  text-white'
                                                        : 'acx-bg-gray-100 text-muted fw-light'
                                                } px-3 py-2`}
                                            >
                                                {!emailConnected ? 'Connect' : 'Disconnect'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}

                {hasFeatureAccess('livechat') && (
                    <div className="col-md-4 col-sm-6 col-12">
                        <div className="setting-link-item border rounded bg-light h-100 app-hover-shadow">
                            <Link to="/settings/integrations/livechat" className="d-block cursor text-decoration-none">
                                <div className="d-flex align-items-start p-md-4 p-3">
                                    <div className="w">
                                        <img src={AccountLightIcon} alt="" width="34" />
                                    </div>
                                    <div className="ms-3 d-flex w-100 justify-content-between align-items-start">
                                        <div className="me-2">
                                            <h6 className="text-dark mb-0"> Live Chat</h6>
                                            <p className="acx-fs-8 lh-base mt-1 mb-2 text-muted">
                                                Configure livechat widget for your website and app
                                            </p>
                                        </div>
                                        <div className="">
                                            <Badge
                                                className={`${
                                                    !livechatConnected
                                                        ? 'acx-bg-primary  text-white'
                                                        : 'acx-bg-gray-100 text-muted fw-light'
                                                } px-3 py-2`}
                                            >
                                                {!livechatConnected ? 'Connect' : 'Disconnect'}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )}
                {/* integrations column ends */}
            </div>
            {/* confirm modal */}
            <Modal open={isDeleteConfirmed} onClose={() => setIsDeleteConfirmed(false)} center>
                <div className="p-5 w-100">
                    <h6 className="mb-5">Are you sure you want to disconnect {Capitalize(platform)}?</h6>
                    <div className="d-flex justify-content-center">
                        <button
                            type="button"
                            className="btn btn-sm f-12 border cancel px-4"
                            onClick={() => setIsDeleteConfirmed(false)}
                        >
                            Cancel
                        </button>
                        <button type="button" className="btn btn-sm ms-2 f-12 bg-custom px-4" onClick={disconnectFBIG}>
                            Yes, disconnect
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

const mapStateToProps = (state) => ({
    configs: state.config.configs, // general config
});

export default connect(mapStateToProps)(SocialIntegrations);
