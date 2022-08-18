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
import { ReactComponent as AgentLightIcon2 } from '../../../assets/icons/agent_light.svg';

import { ReactComponent as AutomationIcon } from '../../../assets/icons/Automation.svg';
import { ReactComponent as ShieldIcon } from '../../../assets/icons/Shield-Done.svg';
import { ReactComponent as FieldsLightIcon } from '../../../assets/icons/fields_light.svg';
import { ReactComponent as FolderBlueIcon } from '../../../assets/icons/Folder-blue.svg';
import { ReactComponent as SendBlueIcon } from '../../../assets/icons/Send-blue.svg';
import { ReactComponent as SearchBlueIcon } from '../../../assets/icons/Database-blue.svg';
import { ReactComponent as AccountLightIcon } from '../../../assets/icons/Social-blurb.svg';
import { ReactComponent as SocialBlurbIcon } from '../../../assets/icons/Chart-blue.svg';
import { ReactComponent as ChartBlueIcon } from '../../../assets/icons/Star-BW.svg';
import { ReactComponent as UserBWIcon } from '../../../assets/icons/Discount-blue.svg';
import { ReactComponent as LivechatIcon } from '../../../assets/icons/chat-blue.svg';
import AccessControl from '../auth/accessControl';
import ContactAlphcxModal from './ContactAlphcxModal2';
import { hasFeatureAccess, brandKit } from '../../../helper';

function SettingsHome({ signedUser }) {
    const [contactSupportModalShow, setContactSupportModalShow] = useState(false);
    const { search } = useLocation();

    useEffect(() => {
        const qp = new URLSearchParams(search);
        const contactModalAction = qp.get('opencontactmodal');

        if (contactModalAction === 'open') {
            setContactSupportModalShow(true);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
                                        {/* <img src={AgentLightIcon} alt="" /> */}
                                        <AgentLightIcon2 fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                    <UserBWIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                            <FolderBlueIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                        <ShieldIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                            <AutomationIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                        <AccountLightIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
                                    </div>
                                    <div className="ms-3">
                                        <h6 className="text-dark mb-0">Conversation Settings</h6>
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
                                        <SocialBlurbIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                        <SendBlueIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                            <SearchBlueIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                            <ChartBlueIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                            <FieldsLightIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
                                    <LivechatIcon fill={brandKit({ bgCol: 0 })?.backgroundColor} />
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
