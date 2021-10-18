// @ts-nocheck
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import SimpleCrypto from 'simple-crypto-js';
import './LiveChatSettings.css';
// import ChatPreview from '../../../../assets/images/ChatWidget.png';
import copy from 'copy-to-clipboard';
import {NotificationManager} from 'react-notifications';
import {connect} from 'react-redux';
import {getLivechatConfig, updateLivechatConfig} from '../../../../reduxstore/actions/livechatActions';
import ScaleLoader from 'react-spinners/ScaleLoader';


const LiveChatSettings = ({livechatConfig, isConfigLoaded, isConfigLoading, getLivechatConfig, updateLivechatConfig}) => {

    const [settings, setSettings] = useState({
        title: '',
        description: '',
        initialText: '',
        domains: '',
        theme: '#004882',
        tenantDomain: window.localStorage.getItem('domain')
    });

    const [loading, setLoading] = useState(false);

    
    const [embedText, setEmbedText] = useState('Loading...');
    
    const simpleCrypto = new SimpleCrypto("@alphacxcryptkey")
    
    const handleInputChange = e => {
        const {name, value} = e.target;
        
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
        setEmbedText(`<script src="https://acxlivechat.s3.amazonaws.com/acx-livechat-widget.min.js"></script>
        <script>ACX.createLiveChatWidget({payload: '${simpleCrypto.encrypt(JSON.stringify(settings))}'});</script>`);
    }
    
    useEffect(() => {
        setLoading(true);
        getLivechatConfig(config => {
            setSettings(prev => ({
                ...prev,
                title: config?.title || '',
                description: config?.description || '',
                initialText: config?.initialChat || '',
                domains: config?.hostName || '',
                theme: config?.color || ''
            }));
            setEmbedText(`<script src="https://acxlivechat.s3.amazonaws.com/acx-livechat-widget.min.js"></script>
<script>ACX.createLiveChatWidget({payload: '${simpleCrypto.encrypt(JSON.stringify(settings))}'});</script>`);
        });
            setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // console.log('Settings => ', settings);

    const handleScriptCopy = () => {
        const {title, description, initialText, domains, theme, tenantDomain} = settings;

        if (!title || !description || !initialText || !domains || !theme || !tenantDomain) {
            NotificationManager.error('Please, fill all fields', 'Opps')
        } else {
            copy(`${embedText}`);
            NotificationManager.success('', 'Copied', 4000);
        }
    }

    const handleConfigSave = () => {
        const {title, description, initialText, domains, theme, tenantDomain} = settings;

        const newConfig = {
            title,
            description,
            initialChat: initialText,
            hostName: domains,
            color: theme,
            domain: tenantDomain
        };

        setLoading(true);
        updateLivechatConfig(newConfig, 
            () => {
                NotificationManager.success('Updated successfully', 'Success', 4000);
                setLoading(false);
            }, 
            () => {
                NotificationManager.error('Something went wrong', 'Error', 4000);
                setLoading(false);
            });

    }

    return (
        <div>
        {loading && <div className="cust-table-loader"><ScaleLoader loading={true} color={"#006298"}/></div>}
            <div className="card card-body bg-white border-0 p-0 mb-4">
                <header id="mainContentHeader" className="breadcrumb">
                    <h6 className="text-muted f-14">
                        <Link to="/settings">
                            <span className="text-custom">Settings</span>
                        </Link>{" "}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <Link to="/settings/integrations">
                            <span className="text-custom">Integrations</span>
                        </Link>{" "}
                        <img src={RightArrow} alt="" className="img-fluid mx-2 me-3" />
                        <span>Live Chat</span>
                    </h6>
                </header>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-2 ">Live Chat Widget</h5>
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
                                            Widget's Host Name <small>({`Hostname of sites where widget will be embedded (Semi-colon seperated list)`})</small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="domains"
                                            value={settings.domains}
                                            placeholder="alphacx.co;sub.site.com;google.com"
                                            style={{ fontFamily: 'monospace' }}
                                            onChange={handleInputChange}/>
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
                                            <span>{embedText}</span> <button className="link-copy-btn" onClick={handleScriptCopy}>Copy</button>
                                        </div>
                                        <div><small>Copy and paste on your website body.</small></div>
                                    </div>
                                </div>
                                <div className="my-3 mt-4">
                                    <button
                                        onClick={handleConfigSave}
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

const mapStateToProps = (state, ownProps) => ({
    livechatConfig: state.livechat.livechatConfig,
    isConfigLoading: state.livechat.isConfigLoading,
    isConfigLoaded: state.livechat.isConfigLoaded
});

export default connect(mapStateToProps, {getLivechatConfig, updateLivechatConfig})(LiveChatSettings);
