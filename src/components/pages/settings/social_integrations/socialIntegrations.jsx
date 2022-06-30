/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import './settings.css';
import { NotificationManager } from 'react-notifications';
import whatsappImg from '../../../assets/imgF/WhatsApp.png';
import facebookImg from '../../../assets/imgF/Facebook.png';
import { httpGet } from '../../../helpers/httpMethods';
import { httpPatchMain, httpPostMain } from '../../../../helpers/httpMethods';
import { hideLoader, showLoader } from '../../../helpers/loader';
import RightArrow from '../../../assets/imgF/arrow_right.png';
// console.log(window);
const { FB } = window;

export default function SocialIntegrations() {
    const [activeSocail, setActiveSocial] = useState('Whatsapp');
    const [FBData, setFBData] = useState({});
    const [pageConnected, setpageConnected] = useState(false);
    const [whatsappConfig, setwhatsappConfig] = useState({
        twillo_account_sid: '',
        twillo_auth_token: '',
        twillo_no: '',
    });
    const authFb = () => {
        FB.login(
            function (response) {
                if (
                    response.authResponse &&
                    response.authResponse !== 'undefined.' &&
                    response.authResponse !== undefined
                ) {
                    // console.log("Welcome!  Fetching your information.... ", response);

                    setFBData(response?.authResponse);

                    handleConnectFBPage(response?.authResponse);

                    setpageConnected(true);
                    FB.api('/me', function (response) {
                        console.log(`Good to see you, ${response.name}.`);
                    });
                } else {
                    console.log('User cancelled login or did not fully authorize.');
                }
            },
            {
                scope: 'pages_messaging,pages_manage_metadata,pages_read_engagement,pages_show_list',
            },
        );
    };

    useEffect(() => {
        FB.init({
            appId: '244578957291734',
            // appId: "265267201741571",
            autoLogAppEvents: true,
            xfbml: true,
            version: 'v14.0',
        });

        const CheckpageConnected = localStorage.getItem('pageConnected');
        if (CheckpageConnected == undefined || CheckpageConnected == null || CheckpageConnected == '') {
            return setpageConnected(false);
        }
        setpageConnected(true);
    }, []);
    const handleWhatsappChange = (e) => {
        setwhatsappConfig({ ...whatsappConfig, [e.target.name]: e.target.value });
    };
    const handleConnectFBPage = async (response) => {
        console.log(response, typeof response);
        if (response && response !== 'undefined.' && response !== undefined) return;
        showLoader();
        const data = {
            facebook_config: {
                page_token: `${response?.accessToken}`,
                access_token: `${response?.accessToken}`,
                connected: true,
            },
        };
        // let sstringFyData = JSON.stringify(data);
        const res = await httpPatchMain('settings/facebook-config', data);
        if (res) {
            hideLoader();
            if (res.er) {
                hideLoader();
                return NotificationManager.error(res.er);
            }
            console.log(res);
            localStorage.setItem('pageConnected', 'true');
            NotificationManager.success('Page successfully connected');
        }
        // hideLoader();
    };

    const handleConnectWhatsApp = async () => {
        if (whatsappConfig.twillo_account_sid == '') {
            return NotificationManager.error('Account SID Is required!');
        }

        if (whatsappConfig.twillo_auth_token == '') {
            return NotificationManager.error('Auth Token Is required!');
        }

        if (whatsappConfig.twillo_no == '') {
            return NotificationManager.error('Account number Is required!');
        }
        showLoader();
        const data = {
            whatsapp_config: {
                ...whatsappConfig,
            },
        };
        const res = await httpPatchMain('settings/whatsapp-config', data);
        if (res) {
            hideLoader();
            if (res.er) {
                hideLoader();
                return NotificationManager.error(res.er);
            }
            // NotificationManager.success("Page successfully connected");
            NotificationManager.success('WhatsApp account successfully connected');
            setwhatsappConfig({
                twillo_account_sid: '',
                twillo_auth_token: '',
                twillo_no: '',
            });
        }
        // hideLoader();
    };
    return (
        <div className="socialIntergratingPage">
            <div id="mainContentHeader" className="breadcrumb">
                <h6 className="text-muted f-14">
                    <Link to="/settings">
                        <span className="text-custom">Settings</span>
                    </Link>{' '}
                    <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                    {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                    <span>Integration Settings</span>
                </h6>
            </div>{' '}
            <div className="pageHeaderInter">
                <p>Integrate Social Accounts</p>
            </div>
            <div className="interSocialAccountsTab">
                <p
                    className={activeSocail == 'Whatsapp' ? 'activeSocial' : ''}
                    onClick={() => setActiveSocial('Whatsapp')}
                >
                    {' '}
                    Whatsapp
                </p>
                <p
                    onClick={() => setActiveSocial('Facebook')}
                    className={activeSocail == 'Facebook' ? 'activeSocial' : ''}
                >
                    Facebook
                </p>
                <p onClick={() => setActiveSocial('sms')} className={activeSocail == 'sms' ? 'activeSocial' : ''}>
                    SMS
                </p>
            </div>
            {activeSocail == 'Whatsapp' ? (
                <div className="connectViaWhatsWrap">
                    <div className="connectViaWhatsappInstr">
                        <img src={whatsappImg} alt="" />
                        <div className="connectViaInstText">
                            <p>Connect Whatsapp to your Open Channel</p>
                            <p>
                                Use the following <span style={{ color: '#006298' }}>instruction</span> to connect a
                                Whatsapp Account
                            </p>
                        </div>
                    </div>

                    <p className="connectViaTwilSoInbt">
                        Connect via <span style={{ color: '#006298' }}>Twillio</span>{' '}
                    </p>

                    <div className="mt-4 mb-5 col-md-8">
                        {/* <div className="inputContainInter">
              <label htmlFor="">
                Specify this address in the Webhook field in console:
              </label>
              <input type="text" name="" />
            </div> */}

                        <div className="mb-3">
                            <div className="mb-3">
                                <label htmlFor="organisation-name" className="form-label">
                                    Account SID:
                                </label>
                                <input
                                    type="text"
                                    name="twillo_account_sid"
                                    onChange={handleWhatsappChange}
                                    value={whatsappConfig.twillo_account_sid}
                                    className="form-control"
                                    id="organisation-name"
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="organisation-name" className="form-label">
                                    Auth Token:
                                </label>
                                <input
                                    type="text"
                                    name="twillo_auth_token"
                                    onChange={handleWhatsappChange}
                                    value={whatsappConfig.twillo_auth_token}
                                    className="form-control"
                                    id="organisation-name"
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="organisation-name" className="form-label">
                                    Account phone number:
                                </label>
                                <input
                                    type="text"
                                    name="twillo_no"
                                    onChange={handleWhatsappChange}
                                    value={whatsappConfig.twillo_no}
                                    className="form-control"
                                    id="organisation-name"
                                />
                            </div>
                        </div>

                        <div className="buttonSubSocialInt">
                            <button onClick={handleConnectWhatsApp}>Connect</button>
                        </div>
                    </div>
                </div>
            ) : (
                ''
            )}
            {activeSocail == 'Facebook' ? (
                <div className="connectViaWhatsWrap">
                    <div className="connectViaWhatsappInstr">
                        <img src={facebookImg} alt="" />
                        <div className="connectViaInstText">
                            <p>Communicate with Facebook users via AlphaCX</p>
                            <p>
                                Connect your company’s Facebook page to Conversational Inbox and start chatting with
                                Facebook users.
                                <br /> Incoming message allocation is based ticket disribution rules. Chats can be
                                converted to tickets.
                            </p>
                        </div>
                    </div>

                    <p className="connectViaTwilSoInbt">
                        You need to create your company Facebook page or use an existing one.
                        <br /> You need to be the Administration of that page.
                    </p>

                    <div className="buttonSubSocialInt" style={{ marginBottom: '20px', marginTop: '-11px' }}>
                        <button style={{ width: '120px' }} onClick={authFb} disabled={pageConnected}>
                            {pageConnected ? 'Page Connected' : 'Connect Page'}
                        </button>
                    </div>
                </div>
            ) : (
                ''
            )}
            <div className="mt-4 mb-5 col-md-8" />
        </div>
    );
}
