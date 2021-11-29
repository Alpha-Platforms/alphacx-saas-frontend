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
import {getAgents} from '../../../reduxstore/actions/agentActions';
import {getSlas} from '../../../reduxstore/actions/slaActions';
// import {getConfigs} from '../../../../reduxstore/actions/configActions';
// 
import {
    CreateTicketIcon, 
    CreateTeamIcon, 
    CreateUsersIcon, 
    TicketChannelIcon, 
    AutoSlaIcon, 
    ArrowRightCircleIcon,
    CheckCircleFilledIcon } from "../../../assets/OnboardingIcons";

const OnboardingModal = ({ 
    open, hide, setOpen,
    user, isUserAuthenticated, 
    categories, isCategoriesLoaded, 
    groups, isGroupsLoaded, 
    slas, isSlasLoaded, getSlas,
    agents, isAgentsLoaded, getAgents,
    configs, isConfigsLoaded
    // getConfigs, 
}) => {
    // 
    const history = useHistory();
    // 
    useEffect(() => {
        if (isUserAuthenticated) {
            getAgents();
            getSlas();
        }
    }, [isUserAuthenticated]);
    // 
    useEffect(() => {
        setTimeout(()=>{
            if(isCategoriesLoaded && isGroupsLoaded && isSlasLoaded && isAgentsLoaded && isConfigsLoaded){
                if(categories?.length > 0 && groups?.length > 0 && slas?.length > 0 && !objectIsEmpty(configs)){
                    localStorage.setItem("onboardingSplash", "hide");
                    hide();
                    // setOpen();
                }else{
                    localStorage.removeItem("onboardingSplash");
                    setOpen();
                }
            }
        }, 8000)
    }, [categories, groups, slas, agents, configs]);
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
      <Modal show={open} onHide={hide} 
        backdrop={false} enforceFocus={false}
        aria-labelledby="example-modal-sizes-title-lg" 
        dialogClassName="acx-onboarding-modal">
        <Modal.Body>
            <div className="p-2 acx-bg-alpha-blue-100-alt mb-3 acx-rounded-5">
                <div className="d-flex justify-content-end">
                    <Button className="acx-btn-icon rounded-circle" onClick={hide}>
                        <i className="bi-x-circle text-secondary"></i>
                    </Button>
                </div>
                <div className="">
                    <div className="text-center">
                        <h4 className="acx-fw-500">Welcome!</h4>
                        <p className="px-3 mb-0">Thank you for choosing AlphaCX. To get the best experience, carry out the following steps.</p>
                    </div>
                </div>
            </div>
            <div className="">
                <ListGroup defaultActiveKey="#link1" className="acx-list-group acx-list-group-gapped">
                    <ListGroup.Item action onClick={()=> gotToPage("/settings/tickets", {historyTabKey: "new-category"})} disabled={isCategoriesLoaded? categories?.length > 0 : false}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-start align-items-center list-item-icon">
                                <CreateTicketIcon/>
                                <h6 className="mb-0 ms-3 text-secondary">Create ticket categories</h6>
                            </div>
                            <div className=""> 
                                {!isCategoriesLoaded ? <ArrowRightCircleIcon/> : categories?.length > 0? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                            </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=> gotToPage("/settings/teams", {historyAddGroupModalShow: true})}  disabled={isGroupsLoaded? groups?.length > 0 : false}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-start align-items-center list-item-icon">
                                <CreateTeamIcon/>
                                <h6 className="mb-0 ms-3 text-secondary">Create a Team</h6>
                            </div>
                            <div className=""> 
                                {!isGroupsLoaded? <ArrowRightCircleIcon/> : groups?.length > 0? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                            </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=> gotToPage("/settings/users", {historyCreateModalShow: true})} disabled={isAgentsLoaded? agents?.length > 0 : false}>
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-start align-items-center list-item-icon">
                                <CreateUsersIcon/>
                                <h6 className="mb-0 ms-3 text-secondary">Create Users</h6>
                            </div>
                            <div className=""> 
                                {!isAgentsLoaded? <ArrowRightCircleIcon/> : agents?.length > 0 ? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
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
                            
                                {!isConfigsLoaded? <ArrowRightCircleIcon/> : !objectIsEmpty(configs) ? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                            </div>
                        </div>
                    </ListGroup.Item>
                    <ListGroup.Item action onClick={()=> gotToPage("/settings/automation")} disabled={isSlasLoaded? slas?.length > 0 : false}>
                        {/* disabled */}
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex justify-content-start align-items-center list-item-icon">
                                <AutoSlaIcon/>
                                <h6 className="mb-0 ms-3 text-secondary">Automate SLAs and escalations</h6>
                            </div>
                            <div className="text-success"> 
                                {!isSlasLoaded? <ArrowRightCircleIcon/> : slas?.length > 0 ? <CheckCircleFilledIcon/> : <ArrowRightCircleIcon/>}
                            </div>
                        </div>
                    </ListGroup.Item>
                </ListGroup>
                <div className="text-center mt-4">
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check onChange={(e) => hideOnboardingScreen(e)} className="d-flex justify-content-center align-items-center gap-3" type="checkbox" label="Do not show this message again" />
                    </Form.Group>
                </div>
            </div>
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

export default connect(mapStateToProps, { getAgents, getSlas })(OnboardingModal);
// getConfigs
