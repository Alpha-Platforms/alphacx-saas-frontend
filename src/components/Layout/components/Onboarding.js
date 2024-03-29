/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { css } from '@emotion/css';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
//
import { getAgents } from '../../../reduxstore/actions/agentActions';
import {getConfigs} from '../../../reduxstore/actions/configActions';
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
import UserGroup from '../../../assets/imgF/user-group.png'
import Facebook from '../../../assets/imgF/facebook-outline.png'
import Instagram from '../../../assets/imgF/instagram-outline.png'
import Livechat from '../../../assets/imgF/livechat.png'
import Email from '../../../assets/imgF/email-outline.png'
import { brandKit } from '../../../helper';

function OnboardingModal({
    user,
    isUserAuthenticated,
    agents,
    configs,
    isAgentsLoaded,
    isConfigsLoaded,
    getAgents,
    getConfigs,
    showOnboarding
}) {
    //
    const history = useHistory();

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

        console.log("configs", configs)
    }, []);


    const gotoFbIgIntegration = ( channel) => window.location.href = channel;

    useEffect(() => {
        if (isUserAuthenticated) {
            getAgents();
            getConfigs();
        }
    }, [isUserAuthenticated]);
    
    const gotToPage = (page, state = {}) => {
        history.push({
            pathname: `${page}`,
            from: '/',
            state,
        });
    };


    return (
        showOnboarding &&
            (<div className="border mt-3 rounded onboarding">
                <p className="bg-light border-bottom px-3 py-2">Onboarding Checklist</p>
                <div className="p-3">
                    <div className="">
                        <ListGroup defaultActiveKey="#link1" className="acx-list-group acx-list-group-gapped">
                            <ListGroup.Item
                                action
                                onClick={() => gotToPage('/settings/users', { historyCreateModalShow: true })}
                                disabled={isAgentsLoaded ? agents?.length > 0 : false}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <img src={UserGroup} alt="user group icon" />
                                        <p className="small mb-0 ms-3 text-secondary">Create Users</p>
                                    </div>
                                    <div className="">
                                        {!isAgentsLoaded ? (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
                                        ) : agents?.length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                        <img src={Facebook} alt="Facebook icon" />
                                        <p className="small mb-0 ms-3 text-secondary">Connect Facebook</p>
                                    </div>
                                    <div className="">
                                        {!isConfigsLoaded ? (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
                                        ) : Object.entries(configs?.facebook_config || {}).length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                        <img src={Instagram} alt="Instagram icon" />
                                        <p className="small mb-0 ms-3 text-secondary">Connect Instagram</p>
                                    </div>
                                    <div className="">
                                        {!isConfigsLoaded ? (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
                                        ) : Object.entries(configs?.instagram_config || {}).length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                        <img src={Livechat} alt="Livechat icon" />
                                        <p className="small mb-0 ms-3 text-secondary">Create Livechat Widget</p>
                                    </div>
                                    <div className="">
                                        {!isConfigsLoaded ? (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
                                            ) : Object.entries(configs?.livechat_config || {}).length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>

                            <ListGroup.Item
                                action
                                onClick={() => gotToPage('/settings/integrations/email/email-form')}
                                disabled={isConfigsLoaded ? Object.entries(configs?.email_config || {}).length > 0 : false}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <img src={Email} alt="Email icon" />
                                        <p className="small mb-0 ms-3 text-secondary">Connect Email Servers</p>
                                    </div>
                                    <div className="">
                                        {!isConfigsLoaded ? (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
                                            ) : Object.entries(configs?.email_config || {}).length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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

export default connect(mapStateToProps, { getAgents, getConfigs })(OnboardingModal);
// getConfigs
