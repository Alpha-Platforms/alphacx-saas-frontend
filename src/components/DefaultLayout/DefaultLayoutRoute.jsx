/* eslint-disable */
// @ts-nocheck
import React, { useContext, useState, useEffect } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Layout from '../Layout/index.jsx';
import { LayoutContext } from '../../context/layoutContext';
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
            <div
                className={`${
                    appReduceSidebarWidth === true ? 'section-wrap mt-2' : 'section-wrap mt-2 reduceAppPadding'
                }`}
            >
                {children}
            </div>
        </Layout>
    );
}

function DefaultLayoutRoute({ component: Component, routeType, fullProps, pageName, ...rest }) {
    const [valid, setValid] = useState('loading');
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
    //     return setValid(false);
    //   }
    //   if (jwtDecode(token).exp < Date.now() / 1000) {
    //     localStorage.clear();
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
                    (window.location.href = '/login')
                ) : (
                    <DefaultLayout routeType={routeType} page={rest.page} fullProps={fullProps} pageName={pageName}>
                        <Component {...matchProps} />
                    </DefaultLayout>
                );
            }}
        />
    );
}
export default DefaultLayoutRoute;
