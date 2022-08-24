/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
// @ts-nocheck
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { css } from '@emotion/css';
import SimpleCrypto from 'simple-crypto-js';
import './LiveChatSettings.css';
// import ChatPreview from '../../../../assets/images/ChatWidget.png';
import copy from 'copy-to-clipboard';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import MoonLoader from 'react-spinners/MoonLoader';
import { getLivechatConfig, updateLivechatConfig } from '../../../../reduxstore/actions/livechatActions';
import { getAgents } from '../../../../reduxstore/actions/agentActions';
import RightArrow from '../../../../assets/imgF/arrow_right.png';
import { getHostnamesFromString, brandKit } from '../../../../helper';

// eslint-disable-next-line no-shadow
function LiveChatSettings({ getLivechatConfig, updateLivechatConfig, isUserAuthenticated }) {
    const [settings, setSettings] = useState({
        title: '',
        description: '',
        initialText: '',
        domains: '',
        theme: '#004882',
        tenantDomain: window.localStorage.getItem('domain'),
        tenantDomainId: window.localStorage.getItem('tenantId'),
        footerBranding: true,
    });

    const [loading, setLoading] = useState(true);
    // const [shouldRender, setShouldRender] = useState(false);

    const [embedText, setEmbedText] = useState('Embed Script');

    const simpleCrypto = new SimpleCrypto('@alphacxcryptkey');

    const handleInputChange = (e) => {
        const { name, value, checked } = e.target;

        if (name === 'footerBranding') {
            setSettings((prev) => ({
                ...prev,
                [name]: checked,
            }));
        } else {
            setSettings((prev) => ({
                ...prev,
                [name]: value,
            }));
        }
        const settingsToEmbed = {
            ...JSON.parse(JSON.stringify(settings)),
            domains: getHostnamesFromString(value),
        };
        setEmbedText(`<script src="https://acxlivechat.s3.amazonaws.com/acx-livechat-widget.min.js"></script>
        <script defer>ACX.createLiveChatWidget({payload: '${simpleCrypto.encrypt(
            JSON.stringify(settingsToEmbed),
        )}'});</script>`);
    };

    // useEffect(() => {
    //     console.clear();
    //     console.log(settings);
    // }, [settings]);

    useEffect(() => {
        if (isUserAuthenticated) {
            // get the first set of users
            // getPaginatedUsers(50, 1);
            setLoading(true);
            getLivechatConfig(
                (config) => {
                    setLoading(false);
                    // console.log('config => ', config);
                    const settingsFromConfig = {
                        title: config?.title || '',
                        description: config?.description || '',
                        initialText: config?.initialChat || '',
                        domains: config?.hostName || '',
                        theme: config?.color || '',
                        footerBranding: config?.footerBranding !== false,
                    };
                    setSettings((prev) => ({
                        ...prev,
                        ...settingsFromConfig,
                    }));
                    const settingsToEmbed = {
                        ...JSON.parse(JSON.stringify(settingsFromConfig)),
                        domains: getHostnamesFromString(settingsFromConfig?.domains),
                    };
                    // console.log('settings to embed => ', settingsToEmbed);
                    setEmbedText(`<script src="https://acxlivechat.s3.amazonaws.com/acx-livechat-widget.min.js"></script>
<script defer>ACX.createLiveChatWidget({payload: '${simpleCrypto.encrypt(
                        JSON.stringify(settingsToEmbed),
                    )}'});</script>`);
                },
                () => {
                    setLoading(false);
                },
            );
            // getAgents(
            //     (data) => {
            //         if (data?.users && data?.users?.length > 0) {
            //             setShouldRender(true);
            //             getLivechatConfig(
            //                 (config) => {
            //                     setLoading(false);
            //                     console.log('config => ', config);
            //                     const settingsFromConfig = {
            //                         title: config?.title || '',
            //                         description: config?.description || '',
            //                         initialText: config?.initialChat || '',
            //                         domains: config?.hostName || '',
            //                         theme: config?.color || '',
            //                         footerBranding: config?.footerBranding === false ? false : true,
            //                     };
            //                     setSettings((prev) => ({
            //                         ...prev,
            //                         ...settingsFromConfig,
            //                     }));
            //                     const settingsToEmbed = {
            //                         ...JSON.parse(JSON.stringify(settingsFromConfig)),
            //                         domains: getHostnamesFromString(settingsFromConfig?.domains),
            //                     }
            //                     console.log('settings to embed => ', settingsToEmbed);
            //                     setEmbedText(`<script src="https://acxlivechat.s3.amazonaws.com/acx-livechat-widget.min.js"></script>
            // <script defer>ACX.createLiveChatWidget({payload: '${simpleCrypto.encrypt(
            //     JSON.stringify(settingsToEmbed),
            // )}'});</script>`);
            //                 },
            //                 () => {
            //                     setLoading(false);
            //                 },
            //             );
            //         } else {
            //             setLoading(false);
            //         }
            //     },
            //     () => {
            //         // No agent found
            //         setLoading(false);
            //     },
            // );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);

    const handleScriptCopy = () => {
        const { title, description, initialText, domains, theme, tenantDomain } = settings;

        if (!title || !description || !initialText || !domains || !theme || !tenantDomain) {
            NotificationManager.error('Please, fill all fields', 'Opps');
        } else {
            const settingsToEmbed = {
                ...settings,
                domains: getHostnamesFromString(settings.domains),
            };
            const encryptedSettings = simpleCrypto.encrypt(JSON.stringify(settingsToEmbed));
            copy(`<script src="https://acxlivechat.s3.amazonaws.com/acx-livechat-widget.min.js"></script>
            <script defer>ACX.createLiveChatWidget({payload: '${encryptedSettings}'});</script>`);
            NotificationManager.success('', 'Copied', 3000);
        }
    };

    // eslint-disable-next-line consistent-return
    const handleConfigSave = () => {
        const { title, description, initialText, domains, theme, tenantDomain, footerBranding } = settings;

        if (!title || !description || !initialText || !domains || !theme || !tenantDomain) {
            return NotificationManager.error('Fill all fields', 'Error', 4000);
        }

        const newConfig = {
            title,
            description,
            initialChat: initialText,
            hostName: domains,
            color: theme,
            domain: tenantDomain,
            footerBranding,
        };

        setLoading(true);
        updateLivechatConfig(
            newConfig,
            () => {
                NotificationManager.success('Updated successfully', 'Success', 4000);
                setLoading(false);
            },
            (msg) => {
                NotificationManager.error(msg, 'Error', 4000);
                setLoading(false);
            },
        );
    };

    return (
        <div>
            {loading && (
                <div className="cust-table-loader">
                    <MoonLoader loading color={brandKit({ bgCol: 0 })?.backgroundColor} size={30} />
                </div>
            )}
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <header id="mainContentHeader" className="breadcrumb">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <Link to="/settings/integrations">
                            <span className="text-custom">Integrations</span>
                        </Link>{' '}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <span>Live Chat</span>
                    </h6>
                </header>
                <div className="">
                    <h5 className="mt-3 mb-0 ">Live Chat Widget</h5>
                    <small>
                        <a
                            href="https://docs.alphacx.co/getting-started/channel-integration/setup-live-chat-widget"
                            target="_blank"
                            className="text-custom"
                            rel="noreferrer"
                        >
                            See How to Setup Livechat
                        </a>
                    </small>
                </div>
                {!loading && (
                    <div>
                        {
                            <div className="mt-1 lcsettingslayout">
                                <div className="livechat-column">
                                    <div>
                                        <div className="">
                                            <form
                                                className="livechat-settings-form"
                                                onSubmit={(e) => e.preventDefault()}
                                            >
                                                <div>
                                                    <div className="form-group mt-3">
                                                        <label className="f-14 mb-1">
                                                            Title <br />
                                                            <small>({`E.g. "Hello, we’re AlphaCX!"`})</small>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control"
                                                            name="title"
                                                            value={settings.title}
                                                            // placeholder="Hello, we’re AlphaCX!"
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="form-group mt-4">
                                                        <label className="f-14 mb-1">
                                                            Short Description <br />
                                                            <small>
                                                                (
                                                                {`E.g. "Here’ s a few quick ways you can connect with us"`}
                                                                )
                                                            </small>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control"
                                                            name="description"
                                                            value={settings.description}
                                                            // placeholder="Here’ s a few quick ways you can connect with us."
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="form-group mt-4">
                                                        <label className="f-14 mb-1">
                                                            Initial chat <br />
                                                            <small>
                                                                (
                                                                {`E.g. "Hello {{customer}}, how can we serve you today?"`}
                                                                )
                                                            </small>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control"
                                                            name="initialText"
                                                            value={settings.initialText}
                                                            // placeholder="Hello {{customer}}, how can we serve you today?"
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    <div className="form-group mt-4">
                                                        <label className="f-14 mb-1">
                                                            Host Website <br />
                                                            <small>({`E.g. "example.com or sub.example.com"`})</small>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            className="form-control form-control"
                                                            name="domains"
                                                            value={settings.domains}
                                                            // placeholder="alphacx.co; sub.example.com"
                                                            style={{ fontFamily: 'monospace' }}
                                                            required
                                                            onChange={handleInputChange}
                                                        />
                                                    </div>

                                                    {/* <div className="form-group mt-4">
                                                <label className="f-14 mb-1">
                                                    Tenant Domain <small>({`Your AlphaCX tenant domain.`})</small>
                                                </label>
                                                <input
                                                    type="text"
                                                    className="form-control form-control"
                                                    name="tenantDomain"
                                                    value={settings.tenantDomain}
                                                    placeholder="support"
                                                    onChange={handleInputChange}/>
                                            </div> */}

                                                    <div className="form-group mt-4">
                                                        <label className="f-14 mb-1">Color</label>
                                                        <div>
                                                            <small>Select your Widget color.</small>
                                                        </div>
                                                        <div className="d-flex my-2 mb-1 widgetcolor-wrapper">
                                                            <input
                                                                value={settings.theme}
                                                                name="theme"
                                                                onChange={handleInputChange}
                                                                className="border form-control-plaintext me-1 px-1 rounded"
                                                            />
                                                            <input
                                                                type="color"
                                                                value={settings.theme}
                                                                name="theme"
                                                                onChange={handleInputChange}
                                                                className="colorThemeInput"
                                                                id="colorThemeInput"
                                                            />
                                                        </div>
                                                        <div>
                                                            <small>
                                                                Enter common colors (blue) or paste hex value (#036198)
                                                            </small>
                                                        </div>
                                                    </div>

                                                    <div className="form-check mt-4">
                                                        <input
                                                            id="footerBranding"
                                                            type="checkbox"
                                                            className={`form-check-input ${css({
                                                                '&:checked': { ...brandKit({ bgCol: 0 }) },
                                                            })}`}
                                                            name="footerBranding"
                                                            checked={settings.footerBranding}
                                                            onChange={handleInputChange}
                                                        />
                                                        <label className="f-14 mb-1" htmlFor="footerBranding">
                                                            Footer Branding
                                                        </label>
                                                    </div>

                                                    <div className="form-group mt-4">
                                                        <label className="f-14 mb-1">Link</label>
                                                        <div className="link-copy-box mb-1">
                                                            <span>{embedText}</span>{' '}
                                                            <button
                                                                type="button"
                                                                className={`link-copy-btn btn btn-sm px-3 ${css({
                                                                    ...brandKit({ bgCol: 0 }),
                                                                    color: 'white',
                                                                    '&:hover': {
                                                                        ...brandKit({ bgCol: 30 }),
                                                                        color: 'white',
                                                                    },
                                                                })}`}
                                                                onClick={handleScriptCopy}
                                                            >
                                                                Copy
                                                            </button>
                                                        </div>
                                                        <div>
                                                            <small>Copy and paste on your website body.</small>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="my-3 mt-4">
                                                    <button
                                                        type="button"
                                                        onClick={handleConfigSave}
                                                        className={`btn btn-sm px-3 ${css({
                                                            ...brandKit({ bgCol: 0 }),
                                                            color: 'white',
                                                            '&:hover': { ...brandKit({ bgCol: 30 }), color: 'white' },
                                                        })}`}
                                                        disabled={false}
                                                    >
                                                        Save Changes
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="livechat-preview">
                                            <div
                                                className="preview-wrapper"
                                                style={{ backgroundColor: settings.theme || 'rgb(25, 117, 188)' }}
                                            >
                                                <div className="preview-container">
                                                    <div className="preview-header">
                                                        <div className="preview-header-heading">{settings.title}</div>
                                                        <div className=" preview-header-subheading">
                                                            {settings.description}
                                                        </div>
                                                    </div>
                                                    <div className="preview-body">
                                                        <div className="p-4">
                                                            <form className="preview-form">
                                                                <div>
                                                                    <label htmlFor="fullname">
                                                                        Full Name{' '}
                                                                        <span className="important-asterisk">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        name="fullname"
                                                                        id="fullname"
                                                                        required=""
                                                                        value=""
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="email">
                                                                        Email{' '}
                                                                        <span className="important-asterisk">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="email"
                                                                        id="email"
                                                                        name="email"
                                                                        required=""
                                                                        value=""
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label htmlFor="chatsubject">
                                                                        Chat Subject{' '}
                                                                        <span className="important-asterisk">*</span>
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        id="chatsubject"
                                                                        name="chatsubject"
                                                                        required=""
                                                                        value=""
                                                                        readOnly
                                                                    />
                                                                </div>
                                                                <div className="submit-btn-wrapper">
                                                                    <button
                                                                        style={{
                                                                            backgroundColor:
                                                                                settings.theme || 'rgb(25, 117, 188)',
                                                                        }}
                                                                        type="submit"
                                                                    >
                                                                        Start Chat
                                                                    </button>
                                                                </div>
                                                            </form>
                                                        </div>
                                                        {settings.footerBranding && (
                                                            <div
                                                                style={{
                                                                    backgroundColor:
                                                                        `${settings.theme}1a` ||
                                                                        'rgba(25, 117, 188, 0.1)',
                                                                    borderTopColor:
                                                                        `${settings.theme}3b` ||
                                                                        'rgba(25, 117, 188, 0.23)',
                                                                }}
                                                            >
                                                                <span>
                                                                    <svg
                                                                        width="17"
                                                                        height="12"
                                                                        viewBox="0 0 17 12"
                                                                        fill="none"
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                    >
                                                                        <path
                                                                            d="M2.57376 6.09584C2.57376 7.91997 4.01114 9.40329 5.77715 9.40329C6.31813 9.40491 6.85059 9.26408 7.32423 8.99409C7.79786 8.72409 8.19705 8.33385 8.48407 7.86023L9.3116 6.55488L9.31973 6.54299L11.1123 8.3944L11.11 8.39804L10.7849 8.93949C10.7698 8.96579 10.7548 8.99335 10.7396 9.01966L10.6089 9.23722C9.53268 10.9284 7.72725 11.9337 5.77715 11.9337C2.5911 11.9337 0 9.25624 0 5.96684C0 2.67744 2.5907 2.41603e-07 5.77715 2.41603e-07C6.73216 -0.000280476 7.67233 0.244066 8.51347 0.711158L8.55045 0.731585L10.8164 3.07072L16 8.42574L15.9973 12L8.25731 4.00308C8.12146 3.83178 7.9695 3.67483 7.80365 3.53452C7.79444 3.52613 7.78509 3.51899 7.77656 3.51186L7.74527 3.48667C7.18459 3.03103 6.49125 2.7845 5.77783 2.78713C4.01114 2.78741 2.57376 4.27198 2.57376 6.09584Z"
                                                                            fill="#004882"
                                                                        />
                                                                        <path
                                                                            d="M13.936 5L13.9398 4.99483L17 0H13.8453L12.0075 3.00079L12 3.01387L13.936 5Z"
                                                                            fill="#C20C38"
                                                                        />
                                                                    </svg>
                                                                </span>
                                                                <span>
                                                                    <a
                                                                        href="https://alphacx.co"
                                                                        target="_blank"
                                                                        rel="noreferrer noopener"
                                                                    >
                                                                        We care with AlphaCX
                                                                    </a>
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (state) => ({
    livechatConfig: state.livechat.livechatConfig,
    isConfigLoading: state.livechat.isConfigLoading,
    isConfigLoaded: state.livechat.isConfigLoaded,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
});

export default connect(mapStateToProps, { getLivechatConfig, getAgents, updateLivechatConfig })(LiveChatSettings);
