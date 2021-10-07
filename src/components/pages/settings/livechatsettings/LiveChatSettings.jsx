// @ts-nocheck
import {useState} from "react";
import {Link} from "react-router-dom";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import SimpleCrypto from 'simple-crypto-js';
// import './LiveChatSettings.css';
// import ChatPreview from '../../../../assets/images/ChatWidget.png';
import copy from 'copy-to-clipboard';
import {NotificationManager} from 'react-notifications';


const LiveChatSettings = () => {

    const [settings, setSettings] = useState({
        title: '',
        description: '',
        initialText: '',
        domains: '',
        theme: '#004882',
        tenantDomain: ''
    });

    const secretKey = "@alphacxcryptkey";
    const simpleCrypto = new SimpleCrypto(secretKey)

    const encryptedData = simpleCrypto.encrypt(JSON.stringify(settings));

    const handleInputChange = e => {
        const {name, value} = e.target;

        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const embedText = `<script src='https://acxlivechat.s3.amazonaws.com/acx-livechat-widget.js'>ACX.createLiveChatWidget({payload: "${encryptedData}"})</script>`;

    console.log('Settings => ', settings);


    return (
        <div>
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <div id="mainContentHeader">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{" "}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3"/> {/* <object data="../assets/alphatickets/icons/right-arrow.svg"
                            className="img-fluid mx-2 me-3"></object> */}
                        <span>Live Chat</span>
                    </h6>
                </div>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-2 fs-6 fw-bold">Widget Settings</h5>
                </div>
                <div className="mt-1 lcsettingslayout">
                    <div>
                    <div>
                        <div className="w-75">
                            <form className="livechat-settings-form" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <div className="form-group mt-3">
                                        <label className="f-14 mb-1">
                                            Title
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="title"
                                            value={settings.title}
                                            placeholder="Hello, we’re AlphaCX!"
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Short Description:
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="description"
                                            value={settings.description}
                                            placeholder="Here’ s a few quick ways you can connect with us."
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Initial chat <small>({`NB: {{customer}} is replaced with customer's name`})</small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="initialText"
                                            value={settings.initialText}
                                            placeholder="Hello {{customer}}, how can we serve you today?"
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Domain of Widget Host <small>({`Semi-colon seperated list`})</small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="domains"
                                            value={settings.domains}
                                            placeholder="alphacx.co;google.com"
                                            style={{ fontFamily: 'monospace' }}
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
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
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Color
                                        </label>
                                        <div><small>Select your widget color.</small></div>
                                        <div className="d-flex my-2 mb-1 widgetcolor-wrapper">
                                            <span>{settings.theme || '#004882'}</span>
                                            <input type="color" value={settings.theme} name="theme" onChange={handleInputChange} className="colorThemeInput" id="colorThemeInput" />
                                        </div>
                                        <div><small>This is the primary color of your widget.</small></div>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Link
                                        </label>
                                        <div className="link-copy-box mb-1">
                                            <span>{embedText}</span> <button className="link-copy-btn" onClick={() => copy(embedText, {onCopy: () => NotificationManager.success('', 'Copied')})}>Copy</button>
                                        </div>
                                        <div><small>Copy and paste on your website body.</small></div>
                                    </div>
                                </div>
                                <div className="my-3 mt-4">
                                    <button
                                        className="btn btn-sm bg-at-blue-light px-3"
                                        disabled={false}>Save Changes</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div>
                        <div>
                            {/* <img src={ChatPreview} alt="" /> */}
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LiveChatSettings;
