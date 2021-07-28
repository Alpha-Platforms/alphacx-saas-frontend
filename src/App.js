import React, { useEffect } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import DefaultLayoutRoute from "./components/DefaultLayout/DefaultLayoutRoute";
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
import Dashboard from "./components/pages/dashboard/dashboard";
import Conversation from "./components/pages/conersations/conversation";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./reduxstore/store";
import { loginTenant } from "./reduxstore/actions/tenantAuthActions";
import { loginUser } from "./reduxstore/actions/userAuthActions";
import { getCustomers, getPaginatedCustomers } from "./reduxstore/actions/customerActions";
import {
  getTickets,
  getPaginatedTickets,
} from "./reduxstore/actions/ticketActions";
import { getPriorities } from "./reduxstore/actions/priorityActions";
import { getCategories } from "./reduxstore/actions/categoryActions";
import { getStatuses } from "./reduxstore/actions/statusActions";
import { getGroups } from "./reduxstore/actions/groupActions";
import { getAgents } from "./reduxstore/actions/agentActions";
import CustomerList from "./components/pages/customers/CustomerList";
import CustomersNull from "./components/pages/customers/CustomersNull";
import Customer from "./components/pages/customers/Customer";
import OrganisationList from "./components/pages/customers/OrganisationList";
import TicketList from "./components/pages/tickets/TicketList";
import SettingsHome from './components/pages/settings';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { SocketDataProvider } from "./context/socket";
import ArticleList from "./components/pages/help_center/help_pages/articleList";
import Article from "./components/pages/help_center/help_pages/article";
import UserList from './components/pages/settings/users/UserList';

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
  getPaginatedCustomers
})(
  ({
    loginTenant,
    loginUser,
    isTenantAuthenticated,
    tenantToken,
    isUserAuthenticated,
    getCustomers,
    getPaginatedTickets,
    getPriorities,
    getCategories,
    getStatuses,
    getGroups,
    getAgents,
    getPaginatedCustomers
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
            getPriorities();
            getCategories();
            getStatuses();
            getGroups();
            getAgents();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Domain} />
          <Route exact path="/login/:domain" component={Login} />
          <Route exact path="/register" component={Register} />
          {/* help pages */}
          <Route exact path="/help" component={HelpCenter} />
          <Route exact path="/help/:topic" component={ArticleList} />
          <Route exact path="/help/:topic/:article" component={Article} />

          {/* help pages end */}
          <DefaultLayoutRoute exact path="/home" component={Dashboard} />
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
          <DefaultLayoutRoute exact path="/organisations" pageName="Organisations" component={OrganisationList} />
          <DefaultLayoutRoute exact path="/customers/:id" pageName="Customer" component={Customer} />
          <DefaultLayoutRoute exact path="/tickets" pageName="Tickets" component={TicketList} />
          <DefaultLayoutRoute exact path="/settings" component={SettingsHome} />
          <DefaultLayoutRoute exact path="/settings/users" pageName="Settings" component={UserList} />
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
        <LayoutProvider>
          <SocketDataProvider>
            <SiteRouter />
          </SocketDataProvider>
        </LayoutProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
