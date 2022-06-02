/* eslint-disable */
// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

import store from 'reduxstore/store.js';
import { LayoutContext } from '../../context/layoutContext';
import Layout from '../Layout/settings.jsx';
import accessControlList from '../../config/accessControlList.js';
import { redirectToSub, refreshUserTokens } from '../../helper';

function DefaultLayout({ children, routeType, pageName, ...rest }) {
    const browserRouter = children.props.history.push;
    const fullProps = children.props;
    const currentRoute = children.props.location.pathname;

    const { appReduceSidebarWidth } = useContext(LayoutContext);

    return (
        <Layout
            routeType={routeType}
            currentRoute={currentRoute}
            browserRouter={browserRouter}
            fullProps={fullProps}
            pageName={pageName}
        >
            <div className={`settings-wrpr ${appReduceSidebarWidth? 'expanded' : ''}`}>{children}</div>
        </Layout>
    );
}

function DefaultLayoutRoute({ component: Component, routeType, fullProps, pageName, ...rest }) {
    const [valid, setValid] = useState('loading');
    const userRole = store.getState().userAuth?.user?.role;

    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        redirectToSub(history, location);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.parse(window.localStorage.getItem('tenantSubscription'))]);

    useEffect(() => {
        setValid(true);
        (async () => {
            await refreshUserTokens(true);
        })();
    }, []);

    // useEffect(() => {
    //   ValidateToken();
    // }, [valid]);

    // const ValidateToken = () => {
    //   let token = localStorage.getItem("token");

    //   if (token == undefined || token == null || token == "") {
    //     localStorage.clear();
    //     console.log(null)
    //     return setValid(false);
    //   }

    //   if (jwtDecode(token).exp < Date.now() / 1000) {
    //     localStorage.clear();
    //     console.log("expired")
    //     return setValid(false);
    //   }
    //   setValid(true);

    // };

    return (
        <Route
            {...rest}
            render={(matchProps) => {
                return valid == 'loading' ? (
                    ''
                ) : valid == false ? (
                    (window.location.href = '/')
                ) : // if your role have access
                accessControlList[userRole]?.includes(pageName) ? (
                    <DefaultLayout routeType={routeType} page={rest.page} fullProps={fullProps} pageName={pageName}>
                        <Component {...matchProps} />
                    </DefaultLayout>
                ) : (
                    // if your role doesn't have access
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100vh',
                            flexDirection: 'column',
                        }}
                    >
                        <h5>Sorry you do not have authorisation to access this page.</h5>
                        <div>
                            {/* <Link to="/">Go back to home page</Link> */}
                            <button onClick={() => history.goBack()}>Go back to previous page</button>
                        </div>
                    </div>
                );
            }}
        />
    );
}
export default DefaultLayoutRoute;
