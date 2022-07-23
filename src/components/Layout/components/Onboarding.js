/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
//
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
//
import { getAgents } from '../../../reduxstore/actions/agentActions';
import { getSlas } from '../../../reduxstore/actions/slaActions';
// import {getConfigs} from '../../../../reduxstore/actions/configActions';
//
import {
    CreateTicketIcon,
    CreateTeamIcon,
    CreateUsersIcon,
    TicketChannelIcon,
    AutoSlaIcon,
    ArrowRightCircleIcon,
    CheckCircleFilledIcon,
} from '../../../assets/OnboardingIcons';

function OnboardingModal({
    user,
    isUserAuthenticated,
    categories,
    isCategoriesLoaded,
    groups,
    isGroupsLoaded,
    slas,
    isSlasLoaded,
    getSlas,
    agents,
    isAgentsLoaded,
    getAgents,
    configs,
    isConfigsLoaded,
    // getConfigs,
}) {
    //
    const history = useHistory();

    const [showOnboarding, setShowOnboarding] = useState(false)

    const [facebookConnectPage, setFacebookConnectPage] = useState('');
    const [instagramConnectPage, setInstagramConnectPage] = useState('');


    useEffect(() => {      
        const subdomain = 'app';
        const path = 'integrations';
        const params = `${window.localStorage.getItem('domain')}&id=${window.localStorage.getItem('token')}&uid=${window.localStorage.getItem('refreshToken')}`;
        const { protocol } = window.location;        
        const hostname = window.location.hostname.split('.').slice(1).join('.');
        const { port } = window.location;
        const url = `${protocol}//${subdomain}.${hostname}:${port}/${path}`;

        setFacebookConnectPage(`${url}?channel=facebook&domain=${params}`)
        setInstagramConnectPage(`${url}?channel=instagram&domain=${params}`)

        console.log('isConfigsLoaded:', isConfigsLoaded)
    }, []);


    const gotoFbIgIntegration = ( channel) => window.location.href = channel;

    useEffect(() => {
        if (isUserAuthenticated) {
            // getAgents();
            // getSlas();
        }
    }, [isUserAuthenticated]);

    useEffect(() => {
        // if (isAgentsLoaded && isSlasLoaded && isConfigsLoaded) {
            if (agents?.length == 0 || Object.entries(configs?.facebook_config || {}).length == 0 || Object.entries(configs?.instagram_config || {}).length == 0 || Object.entries(configs?.livechat_config || {}).length == 0) {
                setShowOnboarding(true)
            }
        // }

    }, [categories, groups, slas, agents, configs]);
    
    const gotToPage = (page, state = {}) => {
        history.push({
            pathname: `${page}`,
            from: '/',
            state,            
        });
    };

    return (
        showOnboarding &&
            (<div className='my-5 mx-3'>
                <div>
                    <div className="">
                        <ListGroup defaultActiveKey="#link1" className="acx-list-group acx-list-group-gapped">
                            <ListGroup.Item
                                action
                                onClick={() => gotToPage('/settings/users', { historyCreateModalShow: true })}
                                disabled={isAgentsLoaded ? agents?.length > 0 : false}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <CreateUsersIcon />
                                        <p className="small mb-0 ms-3 text-secondary">Create Users</p>
                                    </div>
                                    <div className="">
                                        {!isAgentsLoaded ? (
                                            <ArrowRightCircleIcon />
                                        ) : agents?.length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon />
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                onClick={() => gotoFbIgIntegration(facebookConnectPage)}
                                disabled={isConfigsLoaded ? Object.entries(configs?.facebook_config || {}).length > 0 : false}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <CreateUsersIcon />
                                        <p className="small mb-0 ms-3 text-secondary">Connect Facebook</p>
                                    </div>
                                    <div className="">
                                        {!isConfigsLoaded ? (
                                            <ArrowRightCircleIcon />
                                        ) : Object.entries(configs?.facebook_config || {}).length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon />
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                onClick={() => gotoFbIgIntegration(instagramConnectPage)}
                                disabled={isConfigsLoaded ? Object.entries(configs?.instagram_config || {}).length > 0 : false}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <CreateUsersIcon />
                                        <p className="small mb-0 ms-3 text-secondary">Connect Instagram</p>
                                    </div>
                                    <div className="">
                                        {!isConfigsLoaded ? (
                                            <ArrowRightCircleIcon />
                                        ) : Object.entries(configs?.instagram_config || {}).length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon />
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item
                                action
                                onClick={() => gotToPage('/settings/integrations/livechat')}
                                disabled={isConfigsLoaded ? Object.entries(configs?.livechat_config || {}).length > 0 : false}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <TicketChannelIcon />
                                        <p className="small mb-0 ms-3 text-secondary">Setup Livechat</p>
                                    </div>
                                    <div className="">
                                        {!isConfigsLoaded ? (
                                            <ArrowRightCircleIcon />
                                            ) : Object.entries(configs?.livechat_config || {}).length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon />
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>
                        </ListGroup>
                    </div>
                </div>
            </div>)
        
    );
}

const mapStateToProps = (state, ownProps) => ({
    user: state.userAuth.user,
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
    categories: state.category.categories,
    isCategoriesLoaded: state.category.isCategoriesLoaded,
    groups: state.group.groups,
    isGroupsLoaded: state.group.isGroupsLoaded,
    agents: state.agent.agents,
    isAgentsLoaded: state.agent.isAgentsLoaded,
    slas: state.sla.slas,
    isSlasLoaded: state.sla.isSlasLoaded,
    configs: state.config.configs,
    isConfigsLoaded: state.config.isConfigsLoaded,
});

export default connect(mapStateToProps, { getAgents, getSlas })(OnboardingModal);
// getConfigs
