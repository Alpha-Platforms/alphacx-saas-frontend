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

    useEffect(() => {
        if (isUserAuthenticated) {
            // getAgents();
            // getSlas();
        }
    }, [isUserAuthenticated]);

    useEffect(() => {
        if (isCategoriesLoaded && isGroupsLoaded && isSlasLoaded && isConfigsLoaded) {
            if (categories?.length == 0 || groups?.length == 0 || slas?.length == 0 || objectIsEmpty(configs)) {
                setShowOnboarding(true)
                console.log("lagos lagos");
            }
        }
        // isAgentsLoaded removed

    }, [categories, groups, slas, agents, configs]);
    
    const gotToPage = (page, state = {}) => {
        history.push({
            pathname: `${page}`,
            from: '/',
            state,
        });
    };
    //
    const objectIsEmpty = (obj) => {
        return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
    };

    return (
        showOnboarding &&
            (<div className='my-5 mx-3'>
                <div>
                    <div className="">
                        <ListGroup defaultActiveKey="#link1" className="acx-list-group acx-list-group-gapped">
                            <ListGroup.Item
                                action
                                onClick={() => gotToPage('/settings/tickets', { historyTabKey: 'new-category' })}
                                disabled={isCategoriesLoaded ? categories?.length > 0 : false}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <CreateTicketIcon />
                                        <p className="small mb-0 ms-3 text-secondary">Create ticket categories</p>
                                    </div>
                                    <div className="">
                                        {!isCategoriesLoaded ? (
                                            <ArrowRightCircleIcon />
                                        ) : categories?.length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon />
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                onClick={() => gotToPage('/settings/teams', { historyAddGroupModalShow: true })}
                                disabled={isGroupsLoaded ? groups?.length > 0 : false}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <CreateTeamIcon />
                                        <p className="small mb-0 ms-3 text-secondary">Create a Team</p>
                                    </div>
                                    <div className="">
                                        {!isGroupsLoaded ? (
                                            <ArrowRightCircleIcon />
                                        ) : groups?.length > 0 ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon />
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>
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
                                onClick={() => gotToPage('/settings/integrations')}
                                disabled={!objectIsEmpty(configs)}
                            >
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <TicketChannelIcon />
                                        <p className="small mb-0 ms-3 text-secondary">Connect Ticket Channels</p>
                                    </div>
                                    <div className="">
                                        {!isConfigsLoaded ? (
                                            <ArrowRightCircleIcon />
                                        ) : !objectIsEmpty(configs) ? (
                                            <CheckCircleFilledIcon />
                                        ) : (
                                            <ArrowRightCircleIcon />
                                        )}
                                    </div>
                                </div>
                            </ListGroup.Item>
                            <ListGroup.Item
                                action
                                onClick={() => gotToPage('/settings/automation')}
                                disabled={isSlasLoaded ? slas?.length > 0 : false}
                            >
                                {/* disabled */}
                                <div className="d-flex justify-content-between align-items-center">
                                    <div className="d-flex justify-content-start align-items-center list-item-icon">
                                        <AutoSlaIcon />
                                        <p className="small mb-0 ms-3 text-secondary">Automate SLAs and escalations</p>
                                    </div>
                                    <div className="text-success">
                                        {!isSlasLoaded ? (
                                            <ArrowRightCircleIcon />
                                        ) : slas?.length > 0 ? (
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
