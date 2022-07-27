/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import '../conversations/conversation.css';
import '../../../styles/Setting.css';
import { Link, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import AgentLightIcon from '../../../assets/icons/agent_light.svg';
import AutomationIcon from '../../../assets/icons/Automation.svg';
import ShieldIcon from '../../../assets/icons/Shield-Done.svg';
import FieldsLightIcon from '../../../assets/icons/fields_light.svg';
import FolderBlueIcon from '../../../assets/icons/Folder-blue.svg';
import SendBlueIcon from '../../../assets/icons/Send-blue.svg';
import SearchBlueIcon from '../../../assets/icons/Database-blue.svg';
import AccountLightIcon from '../../../assets/icons/Social-blurb.svg';
import SocialBlurbIcon from '../../../assets/icons/Chart-blue.svg';
import ChartBlueIcon from '../../../assets/icons/Star-BW.svg';
import UserBWIcon from '../../../assets/icons/Discount-blue.svg';
import LivechatIcon from '../../../assets/icons/chat-blue.svg';
import AccessControl from '../auth/accessControl';
import ContactAlphcxModal from './ContactAlphcxModal2';
import { hasFeatureAccess } from '../../../helper';

function SettingsHome({ signedUser }) {
    const [contactSupportModalShow, setContactSupportModalShow] = useState(false);
    const { search } = useLocation();

    useEffect(() => {
        const qp = new URLSearchParams(search);
        const contactModalAction = qp.get('opencontactmodal');

        if (contactModalAction === 'open') {
            setContactSupportModalShow(true);
        }
    }, []);

    return (
        <Container fluid>
            <Row className="g-3">
                <AccessControl>
                    <Col sm={6} md={4} className="settings-menu-item">
                        <div className="border rounded bg-light">
                            <Link to="/settings/users" className="d-block cursor text-decoration-none">
                                <div className="d-flex p-md-4">
                                    <div className="">
                                        <img src={AgentLightIcon} alt="" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="text-dark mb-0">Users</h6>
                                        <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                            Create users, and assign roles.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </AccessControl>

                <Col sm={6} md={4} className="settings-menu-item">
                    <div className="border rounded bg-light">
                        <Link to={`/settings/profile/${signedUser.id}`} className="d-block cursor text-decoration-none">
                            <div className="d-flex p-md-4">
                                <div className="">
                                    <img src={UserBWIcon} alt="" />
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-dark mb-0">Profile Settings</h6>
                                    <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">Update your user profile.</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>

                {hasFeatureAccess('teams') && (
                    <AccessControl>
                        <Col sm={6} md={4} className="settings-menu-item">
                            <div className="border rounded bg-light">
                                <Link to="/settings/teams" className="d-block cursor text-decoration-none">
                                    <div className="d-flex p-md-4">
                                        <div className="">
                                            <img src={FolderBlueIcon} alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <h6 className="text-dark mb-0">Teams</h6>
                                            <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                                Manage the users in your organisation.
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </AccessControl>
                )}

                <AccessControl>
                    <Col sm={6} md={4} className="settings-menu-item">
                        <div className="border rounded bg-light">
                            <Link to="/settings/account" className="d-block cursor text-decoration-none">
                                <div className="d-flex p-md-4">
                                    <div className="">
                                        <img src={ShieldIcon} alt="" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="text-dark mb-0">Account</h6>
                                        <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                            Access and edit your organization&apos;s profile.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </AccessControl>

                {hasFeatureAccess('sla') && (
                    <AccessControl>
                        <Col sm={6} md={4} className="settings-menu-item">
                            <div className="border rounded bg-light">
                                <Link to="settings/automations" className="d-block cursor text-decoration-none">
                                    <div className="d-flex p-md-4">
                                        <div className="">
                                            <img src={AutomationIcon} alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <h6 className="text-dark mb-0">Automation</h6>
                                            <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                                Set notifications, responses, and their durations.
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </AccessControl>
                )}

                <AccessControl>
                    <Col sm={6} md={4} className="settings-menu-item">
                        <div className="border rounded bg-light">
                            <Link to="/settings/tickets" className="d-block cursor text-decoration-none">
                                <div className="d-flex p-md-4">
                                    <div className="">
                                        <img src={AccountLightIcon} alt="" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="text-dark mb-0">Ticket Settings</h6>
                                        <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                            Manage ticket types and distribution.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </AccessControl>

                <AccessControl>
                    <Col sm={6} md={4} className="settings-menu-item">
                        <div className="border rounded bg-light">
                            <Link to="/settings/integrations" className="d-block cursor text-decoration-none">
                                <div className="d-flex p-md-4">
                                    <div className="">
                                        <img src={SocialBlurbIcon} alt="" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="text-dark mb-0">Integrations</h6>
                                        <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                            Connect social channels to your app.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </AccessControl>

                <AccessControl>
                    <Col sm={6} md={4} className="settings-menu-item">
                        <div className="border rounded bg-light">
                            <Link to="/settings/notifications" className="d-block cursor text-decoration-none">
                                <div className="d-flex p-md-4">
                                    <div className="">
                                        <img src={SendBlueIcon} alt="" />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="text-dark mb-0">Notifications</h6>
                                        <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                            Assign notifications roles to users.
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </Col>
                </AccessControl>

                {hasFeatureAccess('knowledgebase') && (
                    <AccessControl>
                        <Col sm={6} md={4} className="settings-menu-item">
                            <div className="border rounded bg-light">
                                <Link to="/settings/knowledge-base" className="d-block cursor text-decoration-none">
                                    <div className="d-flex p-md-4">
                                        <div className="">
                                            <img src={SearchBlueIcon} alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <h6 className="text-dark mb-0">Knowledge Base</h6>
                                            <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                                Create and manage information on your knowledge base.
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </AccessControl>
                )}

                {hasFeatureAccess('rating') && (
                    <AccessControl>
                        <Col sm={6} md={4} className="settings-menu-item">
                            <div className="border rounded bg-light">
                                <Link to="settings/ratings" className="d-block cursor text-decoration-none">
                                    <div className="d-flex p-md-4">
                                        <div className="">
                                            <img src={ChartBlueIcon} alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <h6 className="text-dark mb-0">Ratings and Review</h6>
                                            <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                                Setup ratings for customer feedback.
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </AccessControl>
                )}

                {hasFeatureAccess('fields') && (
                    <AccessControl>
                        <Col sm={6} md={4} className="settings-menu-item">
                            <div className="border rounded bg-light">
                                <Link to="settings/fields" className="d-block cursor text-decoration-none">
                                    <div className="d-flex p-md-4">
                                        <div className="">
                                            <img src={FieldsLightIcon} alt="" />
                                        </div>
                                        <div className="ms-3">
                                            <h6 className="text-dark mb-0">Fields</h6>
                                            <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                                Setup fields for users, tickets and customers forms.
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        </Col>
                    </AccessControl>
                )}

                <Col sm={6} md={4} className="settings-menu-item">
                    <div className="border rounded bg-light">
                        <Link
                            to="#"
                            onClick={() => setContactSupportModalShow(true)}
                            className="d-block cursor text-decoration-none"
                            role="button"
                        >
                            <div className="d-flex p-md-4">
                                <div className="">
                                    <img src={LivechatIcon} alt="" />
                                </div>
                                <div className="ms-3">
                                    <h6 className="text-dark mb-0">Contact AlphaCX</h6>
                                    <p className="acx-fs-8 mb-0 lh-base mt-1 text-muted">
                                        Send a message to AlphaCX Support team.
                                    </p>
                                </div>
                            </div>
                        </Link>
                    </div>
                </Col>
            </Row>

            <ContactAlphcxModal
                contactSupportModalShow={contactSupportModalShow}
                setContactSupportModalShow={setContactSupportModalShow}
            />
        </Container>
    );
}

const mapStateToProps = (state) => ({
    signedUser: state.userAuth.user,
});

export default connect(mapStateToProps, null)(SettingsHome);
