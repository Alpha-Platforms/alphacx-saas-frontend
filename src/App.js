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

import Dashboard from "./components/pages/dashboard/dashboard";
import Conversation from "./components/pages/conersations/conversation";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store, { persistor } from "./reduxstore/store";
import { loginTenant } from "./reduxstore/actions/tenantAuthActions";
import { loginUser } from "./reduxstore/actions/userAuthActions";
import { getCustomers } from "./reduxstore/actions/customerActions";
import { getTickets } from "./reduxstore/actions/ticketActions";
import CustomerList from "./components/pages/customers/CustomerList";
import CustomersNull from "./components/pages/customers/CustomersNull";
import Customer from "./components/pages/customers/Customer";
import OrganisationList from "./components/pages/customers/OrganisationList";
import TicketList from "./components/pages/tickets/TicketList";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

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
})(
  ({
    loginTenant,
    loginUser,
    isTenantAuthenticated,
    tenantToken,
    isUserAuthenticated,
    getCustomers,
    getTickets,
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
        getCustomers(1);
        getTickets();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isUserAuthenticated]);
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Domain} />
          <Route exact path="/login/:domain" component={Login} />
          <Route exact path="/register" component={Register} />
          <DefaultLayoutRoute exact path="/home" component={Dashboard} />
          <DefaultLayoutRoute
            exact
            path="/conversation"
            component={Conversation}
          />
          <Route exact path="/customers-null" component={CustomersNull} />
          <Route exact path="/customers" component={CustomerList} />
          <Route exact path="/organisations" component={OrganisationList} />
          <Route exact path="/customers/customer" component={Customer} />
          <Route exact path="/tickets" component={TicketList} />
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
          <SiteRouter />
        </LayoutProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
