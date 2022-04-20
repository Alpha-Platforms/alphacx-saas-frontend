/* eslint-disable no-shadow */
// @ts-nocheck
import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { LayoutProvider } from './context/layoutContext';
import { UserDataProvider } from './context/userContext';
import DefaultLayoutRoute from './components/DefaultLayout/DefaultLayoutRoute';
import SettingsLayoutRoute from './components/DefaultLayout/SettingsLayoutRoute';
import Login from './components/pages/auth/login';
import signUp from './components/pages/auth/signUp';
import ForgotPassword from './components/pages/auth/forgotPassword';
import ResetPassword from './components/pages/auth/resetPassword';
import 'react-responsive-modal/styles.css';

import HelpCenter from './components/pages/help_center/helpCenter';
import Conversation from './components/pages/conersations/conversation';
import store, { persistor } from './reduxstore/store';
import { loadUser } from './reduxstore/actions/userAuthActions';
import { getPriorities } from './reduxstore/actions/priorityActions';
import { getCategories } from './reduxstore/actions/categoryActions';
import { getStatuses } from './reduxstore/actions/statusActions';
import { getGroups } from './reduxstore/actions/groupActions';
import { getTags } from './reduxstore/actions/tagActions';
import { getConfigs } from './reduxstore/actions/configActions';
import CustomerList from './components/pages/customers/CustomerList';
import CustomersNull from './components/pages/customers/CustomersNull';
import Customer from './components/pages/customers/Customer';
import OrganisationList from './components/pages/customers/OrganisationList';
import TicketList from './components/pages/tickets/TicketList';
import Ticket from './components/pages/tickets/Ticket';
// import Reports from './components/pages/reports/index';
import SettingsHome from './components/pages/settings';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './styles/Custom.css';
import { SocketDataProvider } from './context/socket';
import ArticleList from './components/pages/help_center/help_pages/articleList';
import ArticleCategoryList from './components/pages/help_center/help_pages/categoryList';
import Article from './components/pages/help_center/help_pages/article';
// import EmailSettings from "./components/pages/settings/social_integrations/email";
import SettingsEmail from './components/pages/settings/social_integrations/email';
import UserList from './components/pages/settings/users/UserList';
import Fields from './components/pages/settings/fields/Fields';
//
import SocialIntegrations from './components/pages/settings/social_integrations/index';
import FacebookIntegration from './components/pages/settings/social_integrations/FacebookIntegration';
// import TwitterIntegration from "./components/pages/settings/twitter_settings/TwitterSettings";
import TwitterSignup from './components/pages/settings/twitter_settings/index';
import TwitterAuth from './components/pages/settings/twitter_settings/TwitterAuth';
import WhatsappIntegration from './components/pages/settings/social_integrations/WhatsappIntegration';
//
import RatingsForm from './components/pages/ratings/RatingsForm';
import RatingsSettings from './components/pages/settings/ratings/RatingsSettings';

import ScrollToTop from './components/helpers/ScrollToTop';
import GroupList from './components/pages/settings/groups/GroupList';
import RoleList from './components/pages/settings/roles/RoleList';
import NewRole from './components/pages/settings/roles/NewRole';
import Form from './components/pages/settings/forms/Form';
import HelpCenterSettings from './components/pages/settings/help_center/helpCenterSettings';
import NewArticle from './components/pages/settings/help_center/components/newArticle';
import ArticleCategories from './components/pages/settings/help_center/components/ArticleCategories';
import TicketSettings from './components/pages/settings/ticketsettings/TicketSettings';
import AutomationSettings from './components/pages/settings/automation/automationSettings';
import NewAutomationPolicy from './components/pages/settings/automation/components/NewAutomationPolicy';
import AccountSettingsMain from './components/pages/settings/account/AccountSettingsMain';
import UserProfileTwo from './components/pages/settings/account/UserProfileTwo';
import NotificationSettings from './components/pages/settings/notifications/NotificationSettings';
import NewEmailTemplate from './components/pages/settings/notifications/components/NewEmailTemplate';
import EditEmailTemplate from './components/pages/settings/notifications/components/EditEmailTemplate';
import CannedResponsesSettings from './components/pages/settings/canned_responses/CannedResponsesSettings';
import NewCannedResponse from './components/pages/settings/canned_responses/components/NewCannedResponse';
import CustomerPortal from './components/pages/help_center/customer_portal/CustomerPortal';
import Dashboard from './components/pages/dashboard/Dashboard';
import AccountVerified from './components/pages/auth/verified';
import LiveChatSettings from './components/pages/settings/livechatsettings/LiveChatSettings';
import SmsSettings from './components/pages/settings/smssettings/smsSettings';
import ReportsFilter from './components/pages/reports/ReportsFilter';
import FBIntegration from './components/pages/settings/social_integrations/fb';

const mapStateToProps = (state) => ({ isUserAuthenticated: state.userAuth.isUserAuthenticated });

const SiteRouter = connect(mapStateToProps, {
    loadUser,
    getPriorities,
    getCategories,
    getStatuses,
    getGroups,
    getTags,
    getConfigs,
})(({ loadUser, isUserAuthenticated, getPriorities, getCategories, getStatuses, getGroups, getTags, getConfigs }) => {
    const siteUser = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        siteUser && loadUser(siteUser);
    }, [JSON.parse(localStorage.getItem('user'))]);

    useEffect(() => {
        if (isUserAuthenticated) {
            getPriorities();
            getCategories();
            getStatuses();
            getGroups();
            getTags();
            getConfigs();
        }
    }, [isUserAuthenticated]);

    // PLEASE, IF YOU UPDATE any 'pageName' reflect it in src/config/accessControlList.js

    return (
        <BrowserRouter>
            {/* Scroll Restoration */}
            <ScrollToTop />
            <UserDataProvider>
                <LayoutProvider>
                    <SocketDataProvider>
                        <Switch>
                            <Route exact path="/login" component={Login} />{' '}
                            {/* <Route exact path="/login/:domain" component={Login}/> */}
                            <Route exact path="/sign-up" component={signUp} /> {/* help pages */}
                            <Route exact path="/forgot-password" component={ForgotPassword} /> {/* forgot password */}
                            <Route exact path="/reset-password/:resetToken" component={ResetPassword} />{' '}
                            {/* reset password */}
                            <Route exact path="/knowledge-base" component={HelpCenter} />
                            <Route exact path="/knowledge-base/categories" component={ArticleCategoryList} />
                            <Route exact path="/knowledge-base/:category" component={ArticleList} />
                            <Route exact path="/knowledge-base/:category/:slug" component={Article} />{' '}
                            {/* help pages end */}
                            <Route exact path="/feedback/:domain/:ticketId/:customerId" component={RatingsForm} />{' '}
                            {/* help pages end */}
                            <Route exact path="/account-verified" component={AccountVerified} /> {/* Customer Portal */}
                            <Route exact path="/twitter-auth" component={TwitterAuth} /> {/* Customer Portal */}
                            <Route exact path="/customer-portal/tickets" component={CustomerPortal} />
                            <Route exact path="/no-customers" component={CustomersNull} />
                            <DefaultLayoutRoute exact path="/" pageName="Dashboard" component={Dashboard} />
                            <DefaultLayoutRoute
                                exact
                                path="/conversation"
                                component={Conversation}
                                pageName="Conversations"
                            />
                            <DefaultLayoutRoute exact path="/customers" component={CustomerList} pageName="Customers" />
                            <DefaultLayoutRoute
                                exact
                                path="/organisations"
                                pageName="Organisations"
                                component={OrganisationList}
                            />
                            <DefaultLayoutRoute exact path="/customers/:id" pageName="Customer" component={Customer} />{' '}
                            {/* tickets routes */}
                            <DefaultLayoutRoute exact path="/tickets" pageName="Tickets" component={TicketList} />
                            <DefaultLayoutRoute exact path="/tickets/:id" pageName="Ticket" component={Ticket} />{' '}
                            {/* settings route start */}
                            <SettingsLayoutRoute
                                exact
                                path="/settings"
                                pageName="Settings Menu"
                                component={SettingsHome}
                            />
                            <SettingsLayoutRoute exact path="/reports" pageName="Reports" component={ReportsFilter} />
                            {/* <SettingsLayoutRoute
                                exact
                                path="/reports/filter"
                                pageName="Reports"
                                component={ReportsFilter}
                            /> */}
                            {/* <SettingsLayoutRoute
                                exact
                                path="/settings/profile"
                                pageName="User Settings"
                                component={UserProfile}/> */}
                            <SettingsLayoutRoute
                                exact
                                path="/settings/profile/:id"
                                pageName="Personal Information"
                                component={UserProfileTwo}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/account"
                                pageName="Account"
                                component={AccountSettingsMain}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/automations"
                                pageName="Automation Settings"
                                component={AutomationSettings}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/automation"
                                pageName="Automation Settings"
                                component={NewAutomationPolicy}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/automation/:automationId"
                                pageName="Automation Settings"
                                component={NewAutomationPolicy}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/users"
                                pageName="User Settings"
                                component={UserList}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/teams"
                                pageName="Team Settings"
                                component={GroupList}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/roles"
                                pageName="Role Settings"
                                component={RoleList}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/roles/new"
                                pageName="Settings"
                                component={NewRole}
                            />
                            <SettingsLayoutRoute exact path="/settings/forms" pageName="Settings" component={Form} />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/fields"
                                pageName="Fields Settings"
                                component={Fields}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/knowledge-base"
                                pageName="Knowledge Base"
                                component={HelpCenterSettings}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/knowledge-base/categories"
                                pageName="Knowledge Base"
                                component={ArticleCategories}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/knowledge-base/article"
                                pageName="Knowledge Base"
                                component={NewArticle}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/knowledge-base/edit/:articleId"
                                pageName="Knowledge Base"
                                component={NewArticle}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/tickets"
                                pageName="Ticket Settings"
                                component={TicketSettings}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/notifications"
                                pageName="Notification Management"
                                component={NotificationSettings}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/notifications/email-template"
                                pageName="Notification Management"
                                component={NewEmailTemplate}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/notifications/email-template/:id"
                                pageName="Notification Management"
                                component={EditEmailTemplate}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/canned-responses"
                                pageName="Canned Responses"
                                component={CannedResponsesSettings}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/canned-response/new-response"
                                pageName="Canned Responses"
                                component={NewCannedResponse}
                            />{' '}
                            {/* Social integration routes starts */}
                            <SettingsLayoutRoute
                                exact
                                path="/settings/integrations"
                                pageName="Integration Settings"
                                component={SocialIntegrations}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/livechat"
                                pageName="Livechat Settings"
                                component={LiveChatSettings}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/sms"
                                pageName="SMS Integration"
                                component={SmsSettings}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/email"
                                pageName="Email Integration"
                                component={SettingsEmail}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/email/:action"
                                pageName="Email Integration"
                                component={SettingsEmail}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/facebook"
                                pageName="Facebook Integration"
                                component={FacebookIntegration}
                            />
                            {/* <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/twitter"
                                pageName="Twitter Integration"
                                component={TwitterIntegration}/> */}
                            <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/twitter"
                                pageName="Twitter Integration"
                                component={TwitterSignup}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/whatsapp"
                                pageName="Whatsapp Integration"
                                component={WhatsappIntegration}
                            />
                            <SettingsLayoutRoute
                                exact
                                path="/settings/ratings"
                                pageName="Ratings and Feedback"
                                component={RatingsSettings}
                            />
                            <Route
                                exact
                                path="/integrations"
                                pageName="Ratings and Feedback"
                                component={FBIntegration}
                            />{' '}
                            {/* ......settings pages end */}
                            <Route>
                                <div
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '100vh',
                                    }}
                                >
                                    <h1>404 - Not Found</h1>
                                </div>
                            </Route>
                        </Switch>
                    </SocketDataProvider>
                </LayoutProvider>
            </UserDataProvider>
        </BrowserRouter>
    );
});

function App() {
    // DisableInspect()
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NotificationContainer />
                <SiteRouter />
            </PersistGate>
        </Provider>
    );
}

export default App;
