// @ts-nocheck
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import RightArrow from "../../../../assets/imgF/arrow_right.png";
import './smsSettings.css';
import {NotificationManager} from 'react-notifications';
import {connect} from 'react-redux';
import {getSmsConfig, updateSmsConfig} from '../../../../reduxstore/actions/smsActions';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ClipLoader from "react-spinners/ClipLoader";
import {css} from "@emotion/react";


const SmsSettings = ({smsConfig, isConfigLoaded, isConfigLoading, getSmsConfig, updateSmsConfig, isUserAuthenticated}) => {


    const [settings, setSettings] = useState({
        apiKey: '',
        senderId: ''
    });

    const [loading, setLoading] = useState(false);
    
    const handleInputChange = e => {
        const {name, value} = e.target;
        
        setSettings(prev => ({
            ...prev,
            [name]: value
        }));
    }

    const override = css ``;
    const [color, setColor] = useState("#ffffff");
    
    useEffect(() => {    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    
        getSmsConfig((data) => {
            setSettings({
                apiKey: data.api_key,
                senderId: data.sender_id
            });

        })

        if (smsConfig) {
            setSettings({
                apiKey: smsConfig.api_key,
                senderId: smsConfig.sender_id
            });
        }

    }, [smsConfig])


    const handleConfigSave = () => {

        const {apiKey, senderId} = settings;

        if (!apiKey || !senderId) {
            return NotificationManager.error('Fill all fields', 'Error', 4000);
        }

        const newConfig = {
            api_key: apiKey,
            sender_id: senderId
        };

        setLoading(true);
        updateSmsConfig(newConfig, 
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
        {/* {loading && <div className="cust-table-loader"><ScaleLoader loading={true} color={"#006298"}/></div>} */}


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
                        <span>SMS</span>
                    </h6>
                </header>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-2 ">SMS Configuration</h5>
                </div>
                
                <div className="mt-1 lcsettingslayout">
                    <div>
                        <div className="w-75">
                            <form className="livechat-settings-form" onSubmit={e => e.preventDefault()}>
                             
                            <div className="form-group mt-3">
                                    <label className="f-14 mb-1">API Key</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        name="apiKey"
                                        value={settings.apiKey}
                                        placeholder=""
                                        required
                                        onChange={handleInputChange}/>
                                </div>

                                <div className="form-group mt-3">
                                    <label className="f-14 mb-1">Sender ID</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        name="senderId"
                                        value={settings.senderId}
                                        placeholder=""
                                        required
                                        onChange={handleInputChange}/>
                                </div>

                                <div className="d-flex justify-content-end my-3 mt-4">
                                    <button
                                        onClick={handleConfigSave}
                                        className="btn btn-sm bg-at-blue-light px-3"
                                        disabled={loading}>
                                        {loading
                                            ? (<><span>Saving changes...</span><ClipLoader color={color} loading={loading} css={override} size={15}/></>)
                                            : ("Save Changes")
                                        }
                                    </button>



                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const mapStateToProps = (state, ownProps) => ({
    smsConfig: state.config.configs.sms_config, // general config
    isConfigLoading: state.isConfigLoading,
    isConfigLoaded: state.isConfigLoaded,
    isUserAuthenticated: state.userAuth.isUserAuthenticated
});

export default connect(mapStateToProps, {getSmsConfig, updateSmsConfig})(SmsSettings);
