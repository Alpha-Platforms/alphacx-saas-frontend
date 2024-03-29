/* eslint-disable no-param-reassign */
/* eslint-disable no-shadow */
// @ts-nocheck
import React, { useEffect } from 'react';
import { Route, Switch, BrowserRouter, useLocation } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import CustomerSearch from './components/pages/customers/CustomerSearch';
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
import Conversation from './components/pages/conversations/conversation';
import store, { persistor } from './reduxstore/store';
import { loadUser } from './reduxstore/actions/userAuthActions';
import { getPriorities } from './reduxstore/actions/priorityActions';
import { getCategories } from './reduxstore/actions/categoryActions';
import { getStatuses } from './reduxstore/actions/statusActions';
import { getGroups } from './reduxstore/actions/groupActions';
import { getTags } from './reduxstore/actions/tagActions';
import { getConfigs } from './reduxstore/actions/configActions';
import { getCustomFields } from './reduxstore/actions/customFieldActions';
import { getSubscription } from './reduxstore/actions/subscriptionAction';
import { getTenantInfo } from './reduxstore/actions/tenantInfoActions';
import { resetSocketMessage, setAppSocket, setSocketMessage } from './reduxstore/actions/socketActions';
import { setAudioInstance } from './reduxstore/actions/audioActions';
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
import AccountVerified from './components/pages/auth/verified';
import LiveChatSettings from './components/pages/settings/livechatsettings/LiveChatSettings';
import SmsSettings from './components/pages/settings/smssettings/smsSettings';
import Reports from './components/pages/reports/Reports';
import FBIGIntegration from './components/pages/settings/social_integrations/fbig';
import AppsumoSignup from './components/pages/appsumo/signup';
import Instagram from './components/pages/settings/social_integrations/Instagram';
import AppsumoPlans from './components/pages/appsumo/AppsumoPlans';
import { hasFeatureAccess, isSubdomainApp } from './helper';
import useNavigatorOnLine from './hooks/useNavigatorOnline';
import NotFound from './components/pages/error/NotFound';
import CustomerDetails from './components/pages/customers/CustomerDetails';

const mapStateToProps = (state) => ({
    isUserAuthenticated: state.userAuth.isUserAuthenticated,
    tenantSubscription: state?.subscription?.subscription,
    appSocket: state?.socket?.appSocket,
});

const SiteRouter = connect(mapStateToProps, {
    loadUser,
    getPriorities,
    getCategories,
    getStatuses,
    getGroups,
    getTags,
    getConfigs,
    getCustomFields,
    getSubscription,
    getTenantInfo,
    setAppSocket,
    setSocketMessage,
    setAudioInstance,
    resetSocketMessage,
})(
    ({
        loadUser,
        isUserAuthenticated,
        getPriorities,
        getCategories,
        getStatuses,
        getGroups,
        getTags,
        getConfigs,
        getCustomFields,
        getSubscription,
        getTenantInfo,
        tenantSubscription,
        appSocket,
        setAppSocket,
        setSocketMessage,
        setAudioInstance,
        resetSocketMessage,
    }) => {
        const isOnline = useNavigatorOnLine();

        const location = useLocation();

        const siteUser = JSON.parse(localStorage.getItem('user'));

        useEffect(() => {
            siteUser && loadUser(siteUser);
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [siteUser]);
        useEffect(() => {
            const pathsToAvoid = [
                '/knowledge-base',
                '/login',
                '/sign-up',
                '/forgot-password',
                '/reset-password',
                '/feedback',
                '/account-verified',
                '/twitter-auth',
                '/customer-portal',
                '/no-customers',
                '/instagram',
                '/integrations',
                '/appsumo',
            ];
            const shouldAvoidPage = pathsToAvoid.some((item) => location.pathname.startsWith(item));
            const isKbPublicRoute = location.pathname.indexOf('knowledgebase') !== -1;
            /* these should not be called in routes like onboarding, kb, etc and when the user is not authenticated */
            if (isUserAuthenticated && !shouldAvoidPage && !isKbPublicRoute) {
                getPriorities();
                getCategories();
                getStatuses();
                getGroups();

                getTags();
                getConfigs();
                getCustomFields();
                getSubscription();
                getTenantInfo();
                setAppSocket();
                setAudioInstance();
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [isUserAuthenticated]);

        useEffect(() => {
            /* create a socket connection */
            if (appSocket && isOnline) {
                appSocket?.createConnection();
            }

            return () => appSocket?.closeConnection();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [appSocket, isOnline]);

        useEffect(() => {
            if (appSocket?.socket) {
                appSocket.socket.onmessage = (event) => {
                    const eventData = JSON.parse(event.data);
                    setSocketMessage(eventData);
                    setTimeout(() => resetSocketMessage(), 1000);
                };
            }
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [appSocket]);

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
                                <Route exact path="/forgot-password" component={ForgotPassword} />{' '}
                                {/* forgot password */}
                                <Route exact path="/reset-password/:resetToken" component={ResetPassword} />{' '}
                                {/* reset password */}
                                <Route exact path="/feedback" component={RatingsForm} />
                                <Route exact path="/feedback/:ticketId/:customerId" component={RatingsForm} />
                                {/* help pages end */}
                                <Route exact path="/account-verified" component={AccountVerified} />{' '}
                                {/* Customer Portal */}
                                <Route exact path="/twitter-auth" component={TwitterAuth} /> {/* Customer Portal */}
                                <Route exact path="/customer-portal/tickets" component={CustomerPortal} />
                                <Route exact path="/no-customers" component={CustomersNull} />
                                <DefaultLayoutRoute exact path="/" component={Conversation} pageName="Conversations" />
                                {tenantSubscription?.plan?.plan_type === 'appsumo' && (
                                    <DefaultLayoutRoute
                                        exact
                                        path="/appsumo-plans"
                                        pageName="AppSumo Plans and Features"
                                        component={AppsumoPlans}
                                    />
                                )}
                                <DefaultLayoutRoute
                                    exact
                                    path="/customers"
                                    component={CustomerList}
                                    pageName="Customers"
                                />
                                <DefaultLayoutRoute
                                    exact
                                    path="/tenants/remove"
                                    component={CustomerList}
                                    pageName="Customers"
                                />
                                <DefaultLayoutRoute
                                    exact
                                    path="/organisations"
                                    pageName="Organisations"
                                    component={OrganisationList}
                                />
                                <SettingsLayoutRoute
                                    exact
                                    path="/customer"
                                    component={CustomerSearch}
                                    pageName="Customer Search"
                                />
                                <SettingsLayoutRoute
                                    exact
                                    path="/customer/:accountNumber/:registerID"
                                    pageName="Customer Details"
                                    component={CustomerDetails}
                                />
                                <DefaultLayoutRoute
                                    exact
                                    path="/customers/:id"
                                    pageName="Customer"
                                    component={Customer}
                                />{' '}
                                {/* tickets routes */}
                                <DefaultLayoutRoute exact path="/tickets" pageName="Tickets" component={TicketList} />
                                <DefaultLayoutRoute
                                    exact
                                    path="/tickets/:id"
                                    pageName="Ticket"
                                    component={Ticket}
                                />{' '}
                                {/* settings route start */}
                                <SettingsLayoutRoute
                                    exact
                                    path="/settings"
                                    pageName="Settings Menu"
                                    component={SettingsHome}
                                />
                                {hasFeatureAccess('reports') && (
                                    <SettingsLayoutRoute exact path="/reports" pageName="Reports" component={Reports} />
                                )}
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
                                {hasFeatureAccess('sla') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/automations"
                                        pageName="Automation Settings"
                                        component={AutomationSettings}
                                    />
                                )}
                                {hasFeatureAccess('sla') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/automation"
                                        pageName="Automation Settings"
                                        component={NewAutomationPolicy}
                                    />
                                )}
                                {hasFeatureAccess('sla') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/automation/:automationId"
                                        pageName="Automation Settings"
                                        component={NewAutomationPolicy}
                                    />
                                )}
                                <SettingsLayoutRoute
                                    exact
                                    path="/settings/users"
                                    pageName="User Settings"
                                    component={UserList}
                                />
                                {hasFeatureAccess('teams') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/teams"
                                        pageName="Team Settings"
                                        component={GroupList}
                                    />
                                )}
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
                                <SettingsLayoutRoute
                                    exact
                                    path="/settings/forms"
                                    pageName="Settings"
                                    component={Form}
                                />
                                {hasFeatureAccess('fields') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/fields"
                                        pageName="Fields Settings"
                                        component={Fields}
                                    />
                                )}
                                {hasFeatureAccess('knowledgebase') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/knowledge-base"
                                        pageName="Knowledge Base"
                                        component={HelpCenterSettings}
                                    />
                                )}
                                {hasFeatureAccess('knowledgebase') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/knowledge-base/categories"
                                        pageName="Knowledge Base"
                                        component={ArticleCategories}
                                    />
                                )}
                                {hasFeatureAccess('knowledgebase') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/knowledge-base/article"
                                        pageName="Knowledge Base"
                                        component={NewArticle}
                                    />
                                )}
                                {hasFeatureAccess('knowledgebase') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/knowledge-base/edit/:articleId"
                                        pageName="Knowledge Base"
                                        component={NewArticle}
                                    />
                                )}
                                {/* KNOWLEDGEBASE PUBLIC ROUTES */}
                                <Route
                                    exact
                                    path={isSubdomainApp() ? '/:tenantdomain/knowledgebase' : '/knowledgebase'}
                                    component={HelpCenter}
                                />
                                <Route
                                    exact
                                    path={
                                        isSubdomainApp()
                                            ? '/:tenantdomain/knowledgebase/categories'
                                            : '/knowledgebase/categories'
                                    }
                                    component={ArticleCategoryList}
                                />
                                <Route
                                    exact
                                    path={
                                        isSubdomainApp()
                                            ? '/:tenantdomain/knowledgebase/:category'
                                            : '/knowledgebase/:category'
                                    }
                                    component={ArticleList}
                                />
                                <Route
                                    exact
                                    path={
                                        isSubdomainApp()
                                            ? '/:tenantdomain/knowledgebase/:category/:slug'
                                            : '/knowledgebase/:category/:slug'
                                    }
                                    component={Article}
                                />
                                {/* END: KNOWLEDGEBASE PUBLIC ROUTES */}
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
                                {hasFeatureAccess('livechat') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/integrations/livechat"
                                        pageName="Livechat Settings"
                                        component={LiveChatSettings}
                                    />
                                )}
                                {hasFeatureAccess('sms') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/integrations/sms"
                                        pageName="SMS Integration"
                                        component={SmsSettings}
                                    />
                                )}
                                {hasFeatureAccess('email-to-ticket') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/integrations/email"
                                        pageName="Email Integration"
                                        component={SettingsEmail}
                                    />
                                )}
                                {hasFeatureAccess('email-to-ticket') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/integrations/email/:action"
                                        pageName="Email Integration"
                                        component={SettingsEmail}
                                    />
                                )}
                                {hasFeatureAccess('facebook') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/integrations/facebook"
                                        pageName="Facebook Integration"
                                        component={FacebookIntegration}
                                    />
                                )}
                                {/* <SettingsLayoutRoute
                                exact
                                path="/settings/integrations/twitter"
                                pageName="Twitter Integration"
                                component={TwitterIntegration}/> */}
                                {hasFeatureAccess('twitter') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/integrations/twitter"
                                        pageName="Twitter Integration"
                                        component={TwitterSignup}
                                    />
                                )}
                                {hasFeatureAccess('whatsapp') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/integrations/whatsapp"
                                        pageName="Whatsapp Integration"
                                        component={WhatsappIntegration}
                                    />
                                )}
                                {hasFeatureAccess('rating') && (
                                    <SettingsLayoutRoute
                                        exact
                                        path="/settings/ratings"
                                        pageName="Ratings and Feedback"
                                        component={RatingsSettings}
                                    />
                                )}
                                <Route exact path="/instagram" pageName="Ratings and Feedback" component={Instagram} />
                                <Route
                                    exact
                                    path="/integrations"
                                    pageName="Ratings and Feedback"
                                    component={FBIGIntegration}
                                />
                                <Route
                                    exact
                                    path="/appsumo"
                                    pageName="Ratings and Feedback"
                                    component={AppsumoSignup}
                                />{' '}
                                {/* ......settings pages end */}
                                <Route>
                                    <NotFound showCta />
                                </Route>
                            </Switch>
                        </SocketDataProvider>
                    </LayoutProvider>
                </UserDataProvider>
            </BrowserRouter>
        );
    },
);

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
