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
import {getAgents} from '../../../../reduxstore/actions/agentActions';
import {getSlas} from '../../../../reduxstore/actions/slaActions';
import {getConfigs} from '../../../../reduxstore/actions/configActions';
// 
/* 
    ticket categories
    team/group
    users
    connect ticket channels
    sla escalations
*/

import {
    CreateTicketIcon, 
    CreateTeamIcon, 
    CreateUsersIcon, 
    TicketChannelIcon, 
    AutoSlaIcon, 
    ArrowRightCircleIcon,
    CheckCircleFilledIcon } from "../../../../assets/OnboardingIcons";

const OnboardingModal = ({ 
    open, hide, setOpen,
    user, isUserAuthenticated, 
    categories, isCategoriesLoaded, 
    groups, isGroupsLoaded, 
    slas, isSlasLoaded, getSlas, 
    agents, isAgentsLoaded, getAgents,
    configs, isConfigsLoaded, getConfigs
}) => {
    // 
    const history = useHistory();
    // 
    const [categoriesLoaded, setCategoriesLoaded] = useState(false)
    const [groupsLoaded, setGroupsLoaded] = useState(false)
    const [agentsLoaded, setAgentsLoaded] = useState(false)
    const [slasLoaded, setSlasLoaded] = useState(false)
    const [configsLoaded, setConfigsLoaded] = useState(false)
    // 
    useEffect(() => {
        setCategoriesLoaded(true);
    }, [isCategoriesLoaded]);
    useEffect(() => {
        setGroupsLoaded(true);
    }, [isGroupsLoaded]);
    useEffect(() => {
        setAgentsLoaded(true);
    }, [isAgentsLoaded]);
    useEffect(() => {
        setSlasLoaded(true);
    }, [isSlasLoaded]);
    useEffect(() => {
        setConfigsLoaded(true);
    }, [isConfigsLoaded]);
    useEffect(() => {
        if (isUserAuthenticated) {
            getAgents();
            getSlas();
            getConfigs()
        }
    }, [isUserAuthenticated]);
    // 
    useEffect(() => {
        if(categoriesLoaded && groupsLoaded && agentsLoaded && slasLoaded && configsLoaded){
            if(categories?.length > 0 && groups?.length > 0 && slas?.length > 0 && !objectIsEmpty(configs)){
                // agents?.length > 0 &&
                localStorage.setItem("onboardingSplash", "hide");
                hide();
            }else{
                localStorage.removeItem("onboardingSplash");
                setOpen();
            }
        }
    }, [categoriesLoaded, groupsLoaded, agentsLoaded, slasLoaded, configsLoaded]);
    // 
    const gotToPage = (page, state={}) =>{
        history.push({
          pathname:  `${page}`,
          from: "/",
          state: state
      });
    }
    // 
    const objectIsEmpty = (obj) => {
        return  obj  && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype
    }
    // 
    const hideOnboardingScreen = (e) => {
        if(e.target.checked){
            localStorage.setItem("onboardingSplash", "hide");
            hide();
        }
    }

    return(
      <Modal size="lg" show={open} onHide={hide} fullscreen={true} aria-labelledby="example-modal-sizes-title-lg" scrollable>
        <Modal.Body>
            <div className="d-flex justify-content-end">
                <Button className="acx-btn-icon rounded-circle" onClick={hide}>
                    <i className="bi-x-circle text-secondary"></i>
                </Button>
            </div>
            <div className="py-3">
                <div className="text-center">
                    <h2 className="">Welcome!</h2>
                    <p className="">Thank you for choosing AlphaCX. To get the best experience, carry out the following steps.</p>
                </div>
            </div>
            <Row className="">
                <Col className="mx-auto" sm={8} md={6} lg={4}>
                    <ListGroup defaultActiveKey="#link1" className="acx-list-group acx-list-group-gapped">
                        <ListGroup.Item action onClick={()=> gotToPage("/settings/tickets", {historyTabKey: "new-category"})} disabled={categoriesLoaded? categories?.length > 0 : false}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-start align-items-center list-item-icon">
                                    <CreateTicketIcon/>
                                    <h6 className="mb-0 ms-3 text-secondary">Create ticket categories</h6>
                                </div>
                                <div className=""> 
                                    {!categoriesLoaded? <ArrowRightCircleIcon/> : categories?.length > 0? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={()=> gotToPage("/settings/teams", {historyAddGroupModalShow: true})}  disabled={groupsLoaded? groups?.length > 0 : false}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-start align-items-center list-item-icon">
                                    <CreateTeamIcon/>
                                    <h6 className="mb-0 ms-3 text-secondary">Create a Team</h6>
                                </div>
                                <div className=""> 
                                    {!groupsLoaded? <ArrowRightCircleIcon/> : groups?.length > 0? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={()=> gotToPage("/settings/users", {historyCreateModalShow: true})} disabled={agentsLoaded? agents?.length > 0 : false}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-start align-items-center list-item-icon">
                                    <CreateUsersIcon/>
                                    <h6 className="mb-0 ms-3 text-secondary">Create Users</h6>
                                </div>
                                <div className=""> 
                                    {!agentsLoaded? <ArrowRightCircleIcon/> : agents?.length > 0 ? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={()=> gotToPage("/settings/integrations")} disabled={!objectIsEmpty(configs)}>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-start align-items-center list-item-icon">
                                    <TicketChannelIcon/>
                                    <h6 className="mb-0 ms-3 text-secondary">Connect Ticket Channels</h6>
                                </div>
                                <div className=""> 
                                    {!configsLoaded? <ArrowRightCircleIcon/> : !objectIsEmpty(configs) ? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                                </div>
                            </div>
                        </ListGroup.Item>
                        <ListGroup.Item action onClick={()=> gotToPage("/settings/automation")} disabled={slasLoaded? slas?.length > 0 : false}>
                            {/* disabled */}
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="d-flex justify-content-start align-items-center list-item-icon">
                                    <AutoSlaIcon/>
                                    <h6 className="mb-0 ms-3 text-secondary">Automate SLAs and escalations</h6>
                                </div>
                                <div className="text-success"> 
                                    {!slasLoaded? <ArrowRightCircleIcon/> : slas?.length > 0 ? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                                </div>
                            </div>
                        </ListGroup.Item>
                    </ListGroup>
                    <div className="text-center mt-4">
                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Check onChange={(e) => hideOnboardingScreen(e)} className="d-flex justify-content-center align-items-center gap-3" type="checkbox" label="Do not show this message again" />
                        </Form.Group>
                    </div>
                </Col>
            </Row>
        </Modal.Body>
      </Modal>
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
    isConfigsLoaded: state.config.isConfigsLoaded
});

export default connect(mapStateToProps, {getAgents, getSlas, getConfigs})(OnboardingModal);
