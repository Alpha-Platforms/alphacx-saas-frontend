import React, { useContext } from "react";
import Layout from "../Layout/settings.jsx";
import { Route } from "react-router-dom";
import { LayoutContext } from "../../context/layoutContext";

const DefaultLayout = ({ children, routeType, pageName, ...rest }) => {
  let browserRouter = children.props.history.push;
  let fullProps = children.props;
  let currentRoute = children.props.location.pathname;

  const { appReduceSidebarWidth } = useContext(LayoutContext);

  return (
    <Layout
      routeType={routeType}
      currentRoute={currentRoute}
      browserRouter={browserRouter}
      fullProps={fullProps}
      pageName={pageName}
    >
      <div className="mt-4">
        {children}
      </div>
    </Layout>
  );
};

const DefaultLayoutRoute = ({
  component: Component,
  routeType,
  fullProps,
  pageName,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => {
        return (
          <DefaultLayout
            routeType={routeType}
            page={rest.page}
            fullProps={fullProps}
            pageName={pageName}
          >
            <Component {...matchProps} />
          </DefaultLayout>
        );
      }}
    />
  );
};
export default DefaultLayoutRoute;
