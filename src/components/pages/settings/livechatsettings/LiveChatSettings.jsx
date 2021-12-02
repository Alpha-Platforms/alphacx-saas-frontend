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
import {getAgents} from '../../../../reduxstore/actions/agentActions';
import ScaleLoader from 'react-spinners/ScaleLoader';


const LiveChatSettings = ({livechatConfig, isConfigLoaded, isConfigLoading, getLivechatConfig, updateLivechatConfig, getAgents, isUserAuthenticated}) => {

    

    const [settings, setSettings] = useState({
        title: '',
        description: '',
        initialText: '',
        domains: '',
        theme: '#004882',
        tenantDomain: window.localStorage.getItem('domain')
    });

    const [loading, setLoading] = useState(true);
    const [shouldRender, setShouldRender] = useState(false);

    
    const [embedText, setEmbedText] = useState('Embed Script');
    
    const simpleCrypto = new SimpleCrypto("@alphacxcryptkey");


    
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
        if (isUserAuthenticated) {
            // get the first set of users
            // getPaginatedUsers(50, 1);
            setLoading(true);
            getAgents(data => {
                if (data?.users && data?.users?.length > 0) {
                    setShouldRender(true);
                    getLivechatConfig(config => {
                        setLoading(false);
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
                    }, () => {
                        setLoading(false);
                    });
                } else {
                    setLoading(false);
                }
            }, () => {
                console.log('No agents found')
                setLoading(false);
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);
    
    useEffect(() => {
        
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

        if (!title || !description || !initialText || !domains || !theme || !tenantDomain) {
            return NotificationManager.error('Fill all fields', 'Error', 4000);
        }

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
            msg => {
                NotificationManager.error(msg, 'Error', 4000);
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
                {!loading && <div>
                    {!shouldRender ? <div><br/>
                    You can't access the live chat widget until you have created at least one agent. Go to the <Link to="/settings/users">users settings page</Link> to create an agent.

                </div> : <div className="mt-1 lcsettingslayout">
                    <div>
                    <div>
                        <div className="w-75">
                            <form className="livechat-settings-form" onSubmit={e => e.preventDefault()}>
                                <div>
                                    <div className="form-group mt-3">
                                        <label className="f-14 mb-1">
                                            Title <br/><small>({`E.g. "Hello, we’re AlphaCX!"`})</small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="title"
                                            value={settings.title}
                                            // placeholder="Hello, we’re AlphaCX!"
                                            required
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Short Description <br/><small>({`E.g. "Here’ s a few quick ways you can connect with us"`})</small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="description"
                                            value={settings.description}
                                            // placeholder="Here’ s a few quick ways you can connect with us."
                                            required
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Initial chat <br/><small>({`E.g. "Hello {{customer}}, how can we serve you today?"`})</small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="initialText"
                                            value={settings.initialText}
                                            // placeholder="Hello {{customer}}, how can we serve you today?"
                                            required
                                            onChange={handleInputChange}/>
                                    </div>

                                    <div className="form-group mt-4">
                                        <label className="f-14 mb-1">
                                            Widget's Host Name <br/><small>({`E.g. "alphacx.co;sub.site.com;google.com"`})</small>
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control form-control"
                                            name="domains"
                                            value={settings.domains}
                                            // placeholder="alphacx.co;sub.site.com;google.com"
                                            style={{ fontFamily: 'monospace' }}
                                            required
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
                </div>}
                </div>}
            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    livechatConfig: state.livechat.livechatConfig,
    isConfigLoading: state.livechat.isConfigLoading,
    isConfigLoaded: state.livechat.isConfigLoaded,
    isUserAuthenticated: state.userAuth.isUserAuthenticated
});

export default connect(mapStateToProps, {getLivechatConfig, getAgents, updateLivechatConfig})(LiveChatSettings);
