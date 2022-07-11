/* eslint-disable */
// @ts-nocheck
import React, { useContext, useEffect, useState } from 'react';
import { Route, useHistory, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
    const userRole = useSelector((state) => state?.userAuth?.user?.role);
    const tenantSubscription = useSelector((state) => state?.subscription?.subscription);

    const history = useHistory();
    const location = useLocation();
    useEffect(() => {
        redirectToSub(history, location, tenantSubscription);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [tenantSubscription]);

    useEffect(() => {
        setValid(true);
        (async () => {
            await refreshUserTokens(true);
        })();
    }, []);

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
