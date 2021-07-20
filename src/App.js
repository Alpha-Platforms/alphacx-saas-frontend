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

import Conversation from "./components/pages/conersations/conversation";
import Dashboard from "./components/pages/dashboard/dashboard";

function App(props) {
  //DisableInspect()
  return (
    <React.Fragment>
      <NotificationContainer />
      <LayoutProvider>
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
          </Switch>
        </BrowserRouter>
      </LayoutProvider>
    </React.Fragment>
  );
}

export default App;
