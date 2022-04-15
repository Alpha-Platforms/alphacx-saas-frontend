/* eslint-disable */
// @ts-nocheck
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import { NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import ScaleLoader from 'react-spinners/ScaleLoader';
import ClipLoader from 'react-spinners/ClipLoader';
import { css } from '@emotion/react';
import { Settings } from '@material-ui/icons';
import { updateTwitterConfig } from '../../../../reduxstore/actions/configActions';
import RightArrow from '../../../../assets/imgF/arrow_right.png';

function TwitterSettings({ twitterConfig, isConfigLoaded, isConfigLoading, updateTwitterConfig, isUserAuthenticated }) {
    const [settings, setSettings] = useState({
        apiKey: '',
        apiSecretKey: '',
        accessToken: '',
        accessTokenSecretKey: '',
        bearerToken: '',
    });

    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setSettings((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const override = css``;
    const [color, setColor] = useState('#ffffff');

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps

        // getTwitterConfig((data) => {
        //     setSettings({
        //         apiKey: data.api_key,
        //         apiSecretKey: data.api_secret_key,
        //         accessToken: data.access_token,
        //         accessTokenSecretKey: data.access_token_secret_key,
        //         bearerToken: data.bearer_token
        //     });

        // })

        if (twitterConfig) {
            setSettings({
                apiKey: twitterConfig.api_key,
                apiSecretKey: twitterConfig.api_secret_key,
                accessToken: twitterConfig.access_token,
                accessTokenSecretKey: twitterConfig.access_token_secret_key,
                bearerToken: twitterConfig.bearer_token,
            });
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [twitterConfig]);

    const handleConfigSave = () => {
        const { apiKey, apiSecretKey, accessToken, accessTokenSecretKey, bearerToken } = settings;

        if (!apiKey || !apiSecretKey || !accessToken || !accessTokenSecretKey || !bearerToken) {
            return NotificationManager.error('Fill all fields', 'Error', 4000);
        }

        const newConfig = {
            api_key: apiKey,
            api_secret_key: apiSecretKey,
            access_token: accessToken,
            access_token_secret_key: accessTokenSecretKey,
            bearer_token: bearerToken,
            env: 'dev',
        };

        setLoading(true);
        updateTwitterConfig(
            newConfig,
            (data) => {
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
                        <span>Twitter</span>
                    </h6>
                </header>
                <div className="d-flex justify-content-between flex-row">
                    <h5 className="mt-3 mb-2 ">Twitter Configuration</h5>
                </div>

                <div className="mt-1 lcsettingslayout">
                    <div>
                        <div className="w-75">
                            <form className="livechat-settings-form" onSubmit={(e) => e.preventDefault()}>
                                <div className="form-group mt-3">
                                    <label className="f-14 mb-1">API Key</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        name="apiKey"
                                        value={settings.apiKey}
                                        placeholder=""
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group mt-3">
                                    <label className="f-14 mb-1">API Secret Key</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        name="apiSecretKey"
                                        value={settings.apiSecretKey}
                                        placeholder=""
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group mt-3">
                                    <label className="f-14 mb-1">Access Token</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        name="accessToken"
                                        value={settings.accessToken}
                                        placeholder=""
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group mt-3">
                                    <label className="f-14 mb-1">Access Token Secret Key</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        name="accessTokenSecretKey"
                                        value={settings.accessTokenSecretKey}
                                        placeholder=""
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="form-group mt-3">
                                    <label className="f-14 mb-1">Bearer Token</label>
                                    <input
                                        type="text"
                                        className="form-control form-control"
                                        name="bearerToken"
                                        value={settings.bearerToken}
                                        placeholder=""
                                        required
                                        onChange={handleInputChange}
                                    />
                                </div>

                                <div className="d-flex justify-content-end my-3 mt-4">
                                    <button
                                        onClick={handleConfigSave}
                                        className="btn btn-sm bg-at-blue-light px-3"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <>
                                                <span>Saving changes...</span>
                                                <ClipLoader color={color} loading={loading} css={override} size={15} />
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = (state, ownProps) => ({
    twitterConfig: state.config.configs.twitter_config, // general config
    isConfigLoading: state.isConfigLoading,
    isConfigLoaded: state.isConfigLoaded,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
});

export default connect(mapStateToProps, { updateTwitterConfig })(TwitterSettings);
