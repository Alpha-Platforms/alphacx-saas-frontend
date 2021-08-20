import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DefaultLayoutRoute from "./components/DefaultLayout/DefaultLayoutRoute";
import SettingsLayoutRoute from "./components/DefaultLayout/SettingsLayoutRoute";
import { NotificationContainer } from "react-notifications";
import { LayoutProvider } from "./context/layoutContext";
import { UserDataProvider } from "./context/userContext";
import { AuthProvider } from "./context/authContext";
import Login from "./components/pages/auth/login.jsx";
import Domain from "./components/pages/auth/domain";
import Register from "./components/pages/auth/register.jsx";
import Reset from "./components/pages/auth/forgotPassword";
import Home from "./home";
import "react-responsive-modal/styles.css";

import HelpCenter from "./components/pages/help_center/helpCenter";
import DashboardOld from "./components/pages/dashboard/dashboardOld";
import Conversation from "./components/pages/conersations/conversation";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./reduxstore/store";
import { loginTenant } from "./reduxstore/actions/tenantAuthActions";
import { loginUser } from "./reduxstore/actions/userAuthActions";
import {
  getCustomers,
  getPaginatedCustomers,
} from "./reduxstore/actions/customerActions";
import {
  getTickets,
  getPaginatedTickets,
} from "./reduxstore/actions/ticketActions";
import { getPaginatedUsers } from "./reduxstore/actions/userActions";
import { getPriorities } from "./reduxstore/actions/priorityActions";
import { getCategories } from "./reduxstore/actions/categoryActions";
import { getSubCategories } from "./reduxstore/actions/subCategoryActions";
import { getStatuses } from "./reduxstore/actions/statusActions";
import { getGroups } from "./reduxstore/actions/groupActions";
import { getTags } from "./reduxstore/actions/tagActions";
import { getAgents } from "./reduxstore/actions/agentActions";
import CustomerList from "./components/pages/customers/CustomerList";
import CustomersNull from "./components/pages/customers/CustomersNull";
import Customer from "./components/pages/customers/Customer";
import OrganisationList from "./components/pages/customers/OrganisationList";
import TicketList from "./components/pages/tickets/TicketList";
import Ticket from "./components/pages/tickets/Ticket";
import SettingsHome from "./components/pages/settings";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { SocketDataProvider } from "./context/socket";
import ArticleList from "./components/pages/help_center/help_pages/articleList";
import Article from "./components/pages/help_center/help_pages/article";
import EmailSettings from "./components/pages/settings/email/emailSettings";
import SettingsEmail from "./components/pages/settings/email/emailSettings";
import UserList from "./components/pages/settings/users/UserList";
import UserPersonal from "./components/pages/settings/users/UserPersonal";
import Fields from "./components/pages/settings/fields/Fields";
import SocialIntegrations from "./components/pages/settings/socialIntegrations";

import ScrollToTop from "./components/helpers/ScrollToTop";
import GroupList from "./components/pages/settings/groups/GroupList";
import RoleList from "./components/pages/settings/roles/RoleList";
import NewRole from "./components/pages/settings/roles/NewRole";
import Form from "./components/pages/settings/forms/Form";
import HelpCenterSettings from "./components/pages/settings/help_center/helpCenterSettings";
import NewArticle from "./components/pages/settings/help_center/components/newArticle";
import TicketSettings from "./components/pages/settings/ticketsettings/TicketSettings";
import AutomationSettings from "./components/pages/settings/automation/automationSettings.jsx";
import NewAutomationPolicy from "./components/pages/settings/automation/components/NewAutomationPolicy";
import AccountSettings from "./components/pages/settings/account/AccountSettings";
import UserProfile from "./components/pages/settings/account/UserProfile";
import UserProfileTwo from "./components/pages/settings/account/UserProfileTwo";
import NotificationSettings from "./components/pages/settings/notifications/NotificationSettings";
import NewEmailTemplate from "./components/pages/settings/notifications/components/NewEmailTemplate";
import CannedResponsesSettings from "./components/pages/settings/canned_responses/CannedResponsesSettings";
import NewCannedResponse from "./components/pages/settings/canned_responses/components/NewCannedResponse";
import CustomerPortal from "./components/pages/help_center/customer_portal/CustomerPortal";
import Dashboard from "./components/pages/dashboard/Dashboard";

const mapStateToProps = (state, ownProps) => ({
  tenantToken: state.tenantAuth.tenantToken,
  isTenantAuthenticated: state.tenantAuth.isTenantAuthenticated,
  isUserAuthenticated: state.userAuth.isUserAuthenticated,
});

const SiteRouter = connect(mapStateToProps, {
  loginTenant,
  loginUser,
  getCustomers,
  getTickets,
  getPaginatedTickets,
  getPriorities,
  getCategories,
  getStatuses,
  getGroups,
  getAgents,
  getPaginatedCustomers,
  getPaginatedUsers,
  getTags,
  getSubCategories,
})(
  ({
    loginTenant,
    loginUser,
    isTenantAuthenticated,
    tenantToken,
    isUserAuthenticated,
    // getCustomers,
    getPaginatedTickets,
    getPriorities,
    getCategories,
    getStatuses,
    getGroups,
    getAgents,
    getPaginatedCustomers,
    getPaginatedUsers,
    getTags,
    getSubCategories,
  }) => {
    useEffect(() => {
      loginTenant({ domain: "techpoint" });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isTenantAuthenticated) {
        // if the user's domain has been authenticated
        loginUser({
          email: "owen@etela.com",
          password: "Kustormar",
          tenantToken,
        });
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isTenantAuthenticated]);

    useEffect(() => {
      if (isUserAuthenticated) {
        // getCustomers();
        getPaginatedCustomers(10, 1);
        // getTickets();
        getPaginatedTickets(10, 1);
        getPaginatedUsers(10, 1);
        getPriorities();
        getCategories();
        getStatuses();
        getGroups();
        getAgents();
        getTags();
        getSubCategories();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);
    return (
      <BrowserRouter>
        {/* Scroll Restoration */}
        <ScrollToTop />
        <Switch>
          <Route exact path="/" component={Domain} />
          <Route exact path="/login/:domain" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* help pages */}
          <Route exact path="/help" component={HelpCenter} />
          <Route exact path="/help/tickets" component={CustomerPortal} />
          <Route exact path="/help/:topic" component={ArticleList} />
          <Route exact path="/help/:topic/:article" component={Article} />

          {/* help pages end */}
          <UserDataProvider>
            <LayoutProvider>
              <SocketDataProvider>
                <DefaultLayoutRoute
                  exact
                  path="/home"
                  pageName="Dashboard"
                  component={Dashboard}
                />
                <DefaultLayoutRoute
                  exact
                  path="/dashboard"
                  pageName="Dashboard"
                  component={DashboardOld}
                />
                <DefaultLayoutRoute
                  exact
                  path="/conversation"
                  component={Conversation}
                  pageName="Conversations"
                />
                <Route exact path="/customers-null" component={CustomersNull} />
                <DefaultLayoutRoute
                  exact
                  path="/customers"
                  component={CustomerList}
                  pageName="Customers"
                />
                <DefaultLayoutRoute
                  exact
                  path="/organisations"
                  pageName="Organisations"
                  component={OrganisationList}
                />
                <DefaultLayoutRoute
                  exact
                  path="/customers/:id"
                  pageName="Customer"
                  component={Customer}
                />
                <DefaultLayoutRoute
                  exact
                  path="/tickets"
                  pageName="Tickets"
                  component={TicketList}
                />
                {/* settings route start */}
                <DefaultLayoutRoute
                  exact
                  path="/tickets/:id"
                  pageName="Ticket"
                  component={Ticket}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings"
                  pageName="Settings"
                  component={SettingsHome}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/profile"
                  pageName="User"
                  component={UserProfile}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/profile/:id"
                  pageName="User"
                  component={UserProfileTwo}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/account"
                  pageName="Account"
                  component={AccountSettings}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/automation"
                  pageName="Settings"
                  component={AutomationSettings}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/automation/new-policy"
                  pageName="Settings"
                  component={NewAutomationPolicy}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/automation/edit/:policyID"
                  pageName="Settings"
                  component={NewAutomationPolicy}
                />

                <SettingsLayoutRoute
                  exact
                  path="/settings/users"
                  pageName="Settings"
                  component={UserList}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/teams"
                  pageName="Settings"
                  component={GroupList}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/roles"
                  pageName="Settings"
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
                <SettingsLayoutRoute
                  exact
                  path="/settings/users/personal-info-settings"
                  pageName="Settings"
                  component={UserPersonal}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/fields"
                  pageName="Settings"
                  component={Fields}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/help-center"
                  pageName="Settings"
                  component={HelpCenterSettings}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/help-center/article"
                  pageName="Settings"
                  component={NewArticle}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/help-center/edit/:articleId"
                  pageName="Settings"
                  component={NewArticle}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/tickets"
                  pageName="Settings"
                  component={TicketSettings}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/email"
                  pageName="Settings"
                  component={SettingsEmail}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/email/:action"
                  pageName="Settings"
                  component={SettingsEmail}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/integrations"
                  pageName="Integration Settings"
                  component={SocialIntegrations}
                />

                <SettingsLayoutRoute
                  exact
                  path="/settings/notifications"
                  pageName="Settings"
                  component={NotificationSettings}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/notifications/email-template"
                  pageName="Settings"
                  component={NewEmailTemplate}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/canned-responses"
                  pageName="Settings"
                  component={CannedResponsesSettings}
                />
                <SettingsLayoutRoute
                  exact
                  path="/settings/canned-response/new-response"
                  pageName="Settings"
                  component={NewCannedResponse}
                />
              </SocketDataProvider>
            </LayoutProvider>
          </UserDataProvider>

          {/* 
          ...
          ..
          .
          settings pages end */}

          <Route>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
              }}
            >
              <h1>404 - Not Found</h1>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
);

function App(props) {
  //DisableInspect()
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NotificationContainer />

        <SiteRouter />
      </PersistGate>
    </Provider>
  );
}

export default App;
